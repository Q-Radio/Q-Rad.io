// var player = require('./playerClient.js');
// var brain = require('brain');


var playerInstance;
var cb = function(player){
	playerInstance=player;
}
// player.ready(cb);


var trainingData = [];
var net;
var downVoteCount = 0;

var getSong = function(){		
	$.ajax({
		type: 'POST',
		url: '/song',
		data: JSON.stringify(playerInstance),
		dataType: 'json',
		contentType: 'application/json',
		success: function(data){
			songs.push([data.title,data.artist_name,data.score]);
			console.log(data.tracks.foreign_id);
			console.log(data);
			// $(player).addSpotifyInfoToPlaylist([data.track.foreign_id]);
			return data.tracks.foreign_id;
		}
	});
};

var getRandomSong = function(){
	$.ajax({
		type: 'POST',
		url: '/random',
		data: JSON.stringify(songs),
		dataType: 'json',
		contentType: 'application/json',
		success: function(data){
			songs.push([data.title,data.artist_name,data.score]);
			console.log(data.tracks.foreign_id);
		}
	});
};

var upvote = function(){
	console.log('upvote');
	var vote = prepareTraining(playerInstance.playlist[playerInstance.currentSong].audio,1);
	trainingData.push(vote);
};

var downvote = function(){
	console.log('downvote');
	var vote = prepareTraining(playerInstance.playlist[playerInstance.currentSong].audio,0);
	trainingData.push(vote);
	downVoteCount++;
	if(downVoteCount>=3){
		downVoteCount=0;
		train();
	}
};

var train = function(){
	 if(window.Worker) {
	 	$(function(){
		    var worker = new Worker("training-worker.js");
		    worker.onmessage = onMessage;
		    worker.onerror = onError;
		    worker.postMessage(JSON.stringify(trainingData));
		    console.log('using webworker');
	 	})
	  }
	  else {
		  net = new brain.NeuralNetwork();
	      net.train(trainingData, {
	        iterations: 9000
	      });
		}
}

var check = function(){
	// var song = playerInstance.playlist[playerInstance.currentSong].audio;
	// var songData = formatData(song);
	// var output = net.run(songData);
	// console.log(output);
	playerInstance.playlist = [playerInstance.playlist[1],playerInstance.playlist[0]];

};

var prepareTraining = function(songData, rating){
	var train = {input:{}, output: {rating: rating}};

     train.input = formatData(songData);
     return train;
};

var formatData = function(songData){
	return {
	     key:songData.key/11,
	     energy:songData.energy,
	     liveness:songData.liveness,
	     tempo:songData.tempo/500,
	     speechiness:songData.speechiness,
	     acousticness:songData.acousticness,
	     instrumentalness:songData.instrumentalness,
	     mode:songData.mode,
	     duration:songData.duration/3600,
	     loudness:songData.loudness,
	     valence:songData.valence,
	     danceability:songData.danceability
     }
};


  var onMessage = function(event) {
    var data = JSON.parse(event.data);
    if(data.type === 'progress') {
      console.log(data);
    }
    else if(data.type === 'result') {
      net = new brain.NeuralNetwork().fromJSON(data.net);
    }
  };

  var onError = function(event) {
    $("#training-message").text("error training network: " + event.message);
  };

  var showProgress = function(progress) {
    var completed = progress.iterations / trainer.iterations * 100;
    $("#progress-completed").css("width", completed + "%");
};


//actions for buttons
  $(function(){
    $('.getSong').click(function(){
      getSong();
    })
    $('.randomSong').click(function(){
      getRandomSong();
    })
    $('.upvote').click(function(){
      upvote();
    })
    $('.downvote').click(function(){
      downvote();
    })
    $('.train').click(function(){
      train();
    })
    $('.check').click(function(){
      check();
    })
  });