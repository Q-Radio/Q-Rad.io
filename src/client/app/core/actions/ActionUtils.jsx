var Promise = require ('bluebird'); 


 module.exports.onError = function(event) {
   // $("#training-message").text("error training network: " + event.message);
   console.log("error training network:" + event.message);
 };

 module.exports.showProgress = function(progress) {
   var completed = progress.iterations / 12000 * 100;
   // $("#progress-completed").css("width", completed + "%");
   console.log('training is ' + completed + "% complete");
};

module.exports.getSong = function(songs){   
  return new Promise(function(resolve){
    var song;
    $.ajax({
      type: 'POST',
      url: '/10songs',
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
    var audioDetails = module.exports.formatData(song.audio_summary);
    var score = net.run(audioDetails);  
    song.likability = score.rating;
  }
  return song;   
};


 module.exports.reorder = function(futureSongs, net, retrained){
  if(net){
    for(var i = 0; i < futureSongs.length; i++){
      if(!futureSongs[i].likability || retrained){
        futureSongs[i] = module.exports.likability(futureSongs[i],net);
      }  
    }
    console.log('sorting');
    console.log(futureSongs[0].likability, futureSongs[1].likability);
    futureSongs.sort(function(a,b){
      return a.likability - b.likability;
    });
  }
    return futureSongs;
};

module.exports.dropSongs = function(futureSongs){
  futureSongs = futureSongs.slice(0,7);
  return futureSongs;
}

module.exports.addSongs = function(url, retrained, futureSongs, fetchedSongs, net){
  return new Promise(function(resolve){
    getSongs(fetchedSongs, url).then(function(songs){
      songs.forEach(function(song){
        fetchedSongs.push([song.title,song.artist_name,song.score]);
        futureSongs.push(song);
        song = module.exports.likability(song, net);
        resolve({futureSongs:futureSongs, fetchedSongs:fetchedSongs});
      });
    })
  });
};

var getSongs = function(songs, url){   
  return new Promise(function(resolve){
    $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify(songs),
      dataType: 'json',
      contentType: 'application/json',
      success: function(songs){
        resolve(songs);
      }
    });
  })
};

module.exports.modifyPlaylist = function(currentSong, playedSongs){
    var playlist;
    if(playedSongs.length - currentSong < 5 && playedSongs.length >10){
      console.log('first');
      playlist = playedSongs.slice(playedSongs.length-10, playedSongs.length);
    }else if( currentSong > 4 && playedSongs.length > 10){
      console.log('second');

      playlist = playedSongs.slice(currentSong-5, currentSong+5);
    }else {
      console.log('third');

      playlist = playedSongs.slice(0,10);       
    }
    console.log('playlist',playlist);
  return playlist;
}

module.exports.getBrain = function(){
  return new Promise(function(resolve){
    $.ajax({
      type: 'POST',
      url: '/sendTrainingData',
      data: JSON.stringify(songData),
      dataType: 'json',
      contentType: 'application/json',
      
      //may not need success at all
      success: function(songs){
        resolve(songs);
      }
    });
  });
}


//need to send info about user and their song prefernces
module.exports.sendTrainingData = function(user, songData){   
  return new Promise(function(resolve){
    $.ajax({
      type: 'POST',
      url: '/sendTrainingData',
      data: JSON.stringify(songData),
      dataType: 'json',
      contentType: 'application/json',
      
      //may not need success at all
      success: function(songs){
        resolve(songs);
      }
    });
  })
};

