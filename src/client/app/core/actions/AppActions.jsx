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
var currentSong = -1;


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

 if(window.Worker){
    $(function(){
      var worker = new Worker("training-worker.jsx");
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

function getSongsAndUpdate(url){
  //use url to hit the corresponding route on the serve to get 3 or 10 songs
  ActionUtils.addSongs(url,retrained, futureSongs, fetchedSongs, net)
  .then(function(updates){
    futureSongs = updates.futureSongs;
    fetchedSongs = updates.fetchedSongs;

    //reorder futureSongs
    AppActions.updateFutureList();
  })
};


var AppActions = {

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
    getSongsAndUpdate('/10songs');
  },

  play: function(){
    AppDispatcher.dispatch({
      actionType: AppConstants.PLAY,
      played: playedSongs.slice(playedSongs.length-10),
      current: current, 
      future: futureSongs
    });
  },

  next: function(){
    var current;

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
    var audioDetails = playedSongs[currentSong].audio_summary;
    var rating = stars/4;
    trainingData.push(ActionUtils.prepareTraining(audioDetails),rating);

    AppDispatcher.dispatch({
      actionType: AppConstants.STAR,
      text: 'STARRED'
    });

  },


  upvote: function(song){
    var audioDetails = song.audio_summary;
    trainingData.push(ActionUtils.prepareTraining(audioDetails),1);

    AppDispatcher.dispatch({
      actionType: AppConstants.UPVOTE,
      text: 'upvoted'
    });
  },

  downvote: function(song){
    var audioDetails = song.audio_summary;
    trainingData.push(ActionUtils.prepareTraining(audioDetails),1); 
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
