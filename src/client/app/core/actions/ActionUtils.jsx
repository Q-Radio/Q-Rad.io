var Promise = require ('bluebird'); 


 module.exports.onError = function(event) {
   $("#training-message").text("error training network: " + event.message);
   console.log("error training network:" + event.message);
 };

 module.exports.showProgress = function(progress) {
   var completed = progress.iterations / trainer.iterations * 100;
   $("#progress-completed").css("width", completed + "%");
   console.log('training is ' + completed + "% complete");
};

module.exports.getSong = function(songs){   
  return new Promise(function(resolve){
    var song;
    $.ajax({
      type: 'POST',
      url: '/song',
      data: JSON.stringify(songs),
      dataType: 'json',
      contentType: 'application/json',
      success: function(data){
        resolve(data);
      }
    });
  })
};

module.exports.formatData = function(songData){
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
}

module.exports.prepareTraining = function(songData, rating){
  var train = {input:{}, output: {rating: rating}};

     train.input = module.exports.formatData(songData);
     return train;
};

module.exports.likability = function(song, net){
  if(net !== undefined){
    var audioDetails = ActionUtils.formatData(song.audio_summary);
    var score = net.run(audioDetails);  
    song.likability = score;
  }
  return song;   
};


 module.exports.reorder = function(futureSongs, net, retrained){
  for(var i = 0; i < futureSongs.length; i++){
    if(!futureSongs[i].likability || retrained){
      futureSongs[i] = module.exports.likability(futureSongs[i]);
    }  
  }
  futureSongs.sort(function(a,b){
    return a.likability - b.likability;
  });
  return futureSongs;
};

module.exports.dropSongs = function(futureSongs){
  futureSongs = futureSongs.slice(0,8);
  return futureSongs;
}




