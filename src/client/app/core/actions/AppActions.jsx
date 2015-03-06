var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var AppConstants = require('../constants/AppConstants.jsx');
var Promise = require ('bluebird');
var brain = require('brain');
var ActionUtils = require('./ActionUtils.jsx');

var fetchedSongs = [];
var trainingData = [];
var playedSongs = [];
var futureSongs = [];
var net;
var retrained = false; 
var downvotes = 0; 
var currentSong = 0;
var rating=false;

function onMessage(event) {
  var data = JSON.parse(event.data);
  if(data.type === 'progress') {
    ActionUtils.showProgress(data);
  }
  else if(data.type === 'result') {
    net = new brain.NeuralNetwork().fromJSON(data.net);
    retrained = true;
  }
}

function train (){
  console.log('training');

 if(window.Worker){
    $(function(){
      var worker = new Worker("training-worker.js");
      worker.onmessage = onMessage;
      worker.onerror = ActionUtils.onError;
      worker.postMessage(JSON.stringify(trainingData));
      console.log('using webworker');
    })
    } else {
      net = new brain.NeuralNetwork();
        net.train(trainingData, {
          iterations: 9000
        });
    }
}

function getSongsAndUpdate(url, artist){
  //use url to hit the corresponding route on the serve to get 3 or 10 songs
  ActionUtils.addSongs(url,retrained, futureSongs, fetchedSongs, net, artist)
  .then(function(updates){

    if(updates ==='No Artist Found'){
      AppActions.noSearchResults();
    } else {
      //if first time fetching and length 11
      if(updates.futureSongs.length===21){
        updates.futureSongs = updates.futureSongs.slice(10);
      }

      if(updates.futureSongs.length === 11){
        playedSongs.unshift(updates.futureSongs.shift());
        futureSongs = updates.futureSongs;
        fetchedSongs = updates.fetchedSongs;
        console.log(futureSongs);
        AppActions.play();

      } else { 
        futureSongs = ActionUtils.reorder(updates.futureSongs, net, retrained);
        fetchedSongs = updates.fetchedSongs;

        AppActions.updateFutureList();
      }  
    }

  })
};

function addTrainingData(){
  if(rating){
    playedSongs[currentSong].rating = rating+1;
    var audioDetails = playedSongs[currentSong].audio_summary;   

    var userPreference=ActionUtils.prepareTraining(audioDetails,rating/4)

    trainingData.push(userPreference);

    ActionUtils.sendTrainingData(userPreference);

    if(rating < 3){
      downvotes++;
      if(downvotes >= 3){
        train();
        downvotes = 0;
      }     
    }
    rating=false;    
  }
}

var AppActions = {

  addTrackToSpotify: function(trackID){
    ActionUtils.addTrackToSpotifyPlaylist(trackID);
  },

  createSpotifyPlaylist: function(){
    ActionUtils.createSpotifyPlaylist();
  },

  updateFutureList: function(){
    AppDispatcher.dispatch({
      actionType: AppConstants.UPDATE_FUTURE,
      future: futureSongs
    });
  },     

  updatePlaylist: function(){
    AppDispatcher.dispatch({
      actionType: AppConstants.UPDATE_PLAYED,
      text: 'testing'
    });
  },    

  generateFuturePlaylist: function(){
    getSongsAndUpdate('/11songs');
  },

  search: function(artist){
    getSongsAndUpdate('/search',artist);
  },

  noSearchResults: function(){
    var current = {};
    current.title = 'Song not found';
    current.artist_name = 'Artist not found';
    current.image = 'http://immo.krips.com/images/hata.png';
    current.spotify_url = null;

    AppDispatcher.dispatch({
      actionType: AppConstants.NO_SEARCH_RESULTS,
      current: current
    });    
  },

  getPriorHistory: function(){
    ActionUtils.getBrainData().then(function(records){
      for(var i = 0; i<records.length; i++){
        trainingData.push(records[i].toTrain);
      } 
      if(records.length>0){
        train();
      }

    });
  },

  play: function(){
    AppDispatcher.dispatch({
      actionType: AppConstants.PLAY,
      played: playedSongs,
      current: playedSongs[0], 
      future: futureSongs
    });
  },

  selectAny: function(title){
    addTrainingData();
    var inPlayedSongs = false;
    for(var i = 0; i< playedSongs.length; i++){
      if(playedSongs[i].title === title){
        currentSong = i;
        inPlayedSongs=true;
        break;
      }
    }
    if(!inPlayedSongs){
      currentSong=0;
      var index;
      for(var i = 0; i< futureSongs.length; i++){
        if(futureSongs[i].title === title){
          index = i;
          break;
        }
      }
      playedSongs.unshift(futureSongs[index]);
      futureSongs.splice(index,1);
      futureSongs = ActionUtils.dropSongs(futureSongs);
      getSongsAndUpdate('/3songs');
      retrained = false;      
    }
    var playlist = ActionUtils.modifyPlaylist(currentSong, playedSongs);      

    AppDispatcher.dispatch({
      actionType: AppConstants.SELECT_ANY,
      played: playlist,
      current: playedSongs[currentSong], 
      future: futureSongs
    });

  },

  next: function(){
    var current;

    addTrainingData();

    if(currentSong <=0 ){
      playedSongs.unshift(futureSongs.shift());
      futureSongs = ActionUtils.dropSongs(futureSongs);
      getSongsAndUpdate('/3songs');
      retrained = false;
      currentSong = 0; 
      current = playedSongs[0];
    } else {
      current = playedSongs[--currentSong];
    }

    var playlist = ActionUtils.modifyPlaylist(currentSong, playedSongs);
    AppDispatcher.dispatch({
      actionType: AppConstants.NEXT,
      played: playlist,
      current: current, 
      future: futureSongs
    });
  }, 

  prev: function(){

    addTrainingData();

    if(currentSong !== playedSongs.length-1){
      currentSong++;
    } 
    var current = playedSongs[currentSong];
    var playlist = ActionUtils.modifyPlaylist(currentSong, playedSongs);

    AppDispatcher.dispatch({
      actionType: AppConstants.PREV,
      played: playlist,
      current: current,
      future: futureSongs
    });
  },

  star: function(stars){
    rating = stars;

    AppDispatcher.dispatch({
      actionType: AppConstants.STAR,
      text: 'STARRED'
    });

  },


  upvote: function(song){
    var audioDetails = song.audio_summary;
    trainingData.push(ActionUtils.prepareTraining(audioDetails,1));

    AppDispatcher.dispatch({
      actionType: AppConstants.UPVOTE,
      text: 'upvoted'
    });
  },

  downvote: function(song){
    var audioDetails = song.audio_summary;
    trainingData.push(ActionUtils.prepareTraining(audioDetails,1)); 
    downvotes++;
    if(downvotes >= 3){
      train();
    }

    AppDispatcher.dispatch({
      actionType: AppConstants.DOWNVOTE,
      text: 'downvoted'
    });
  }

};

module.exports = AppActions;
