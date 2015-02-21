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

function addSong(retrained){
  console.log(fetchedSongs);
  ActionUtils.getSong().then(function(song){
    console.log('adding Songssss');
    fetchedSongs.push([song.title,song.artist_name,song.score]);
    song = ActionUtils.likability(song, net);
    futureSongs.push(song);
    futureSongs = ActionUtils.reorder(futureSongs, net, retrained);
    AppActions.updateFutureList();
  })
};

function fillFutureSongs(retrained){
  for(var i = futureSongs.length-1; i < 10; i++){
    addSong(retrained);
  }
}

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
    for(var i = 0; i < 10; i++){
      addSong(retrained);
    }
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
    if(currentSong === playedSongs.length -1 || playedSongs.length ===0){
      playedSongs.push(futureSongs.shift());
      futureSongs = ActionUtils.dropSongs(futureSongs);
      fillFutureSongs(retrained);
      retrained = false; 
    }
    var current = playedSongs[++currentSong];
    console.log(futureSongs);
    AppDispatcher.dispatch({
      actionType: AppConstants.NEXT,
      played: playedSongs.slice(playedSongs.length-10),
      current: current, 
      future: futureSongs
    });
  }, 

  prev: function(){
    if(currentSong !== 0){
      currentSong--;
    } 
    var current = playedSongs[currentSong];

    AppDispatcher.dispatch({
      actionType: AppConstants.PREV,
      played: playedSongs.slice(playedSongs.length-10),
      current: current,
      future: futureSongs
    });
  },

  upvote: function(){
    var audioDetails = playedSongs[currentSong].audio_summary;
    trainingData.push(ActionUtils.prepareTraining(song),1);

    AppDispatcher.dispatch({
      actionType: AppConstants.UPVOTE,
      text: 'upvoted'
    });
  },

  downvote: function(){
    var audioDetails = playedSongs[currentSong].audio_summary;
    trainingData.push(ActionUtils.prepareTraining(song),1); 
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
