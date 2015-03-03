var Song = require('./../seedDBServer/database.js');
var Record = require('./songHistory.js');
var Promise = require('bluebird');

var randomSong = function(songs){
  var index = Math.floor(Math.random()*songs.length);         
  var song = songs[index];
  return song;
};

var queryNoRepeats = function(playedSongs){
  var titles = [];
  var query = Song.find();
  var queryItems = 'title score artist_name tracks.foreign_id audio_summary preview_url spotify_url image';
  query.select(queryItems);
  for(var i = 0; i<playedSongs.length; i++){
    titles.push(playedSongs[i][0]);
  }
  query.where('title').nin(titles);
  return query;
};

var closestSong = function(playedSongs, currentScore, distance){
  return new Promise(function(resolve){
    distance = distance || 3;
    var query = queryNoRepeats(playedSongs);
    query.where('score').gt(currentScore - distance).lt(currentScore + distance);

    query.exec(function(err,songs){
      if(err) return console.error(err);
      if(songs.length===0){
        resolve(closestSong(playedSongs, distance*2));
      } else {
        var song = randomSong(songs); 
        resolve(song);        
      }
    });
  });
};

var getSong = function(playedSongs){
  return new Promise(function(resolve){
    if(playedSongs.length > 0){
      var currentSong = playedSongs[playedSongs.length-1];
      var currentScore = currentSong[2]; 
    }

    //send a random song if it is the first call
    if(currentSong === undefined){
      var query = queryNoRepeats(playedSongs);

      query.exec(function(err,songs){
        if(err) return console.error(err);
        var song = randomSong(songs);       
        resolve(song);
      });
    } else {
      resolve(closestSong(playedSongs, currentScore));
    }
  });
}

module.exports.multipleSongs = function(numberOfSongs, playedSongs, songs){
  return new Promise(function(resolve){
    songs = songs || [];
    if(numberOfSongs === 0){
      resolve(songs);
    } else {
      //immediately invoked resolve function
      resolve((function(){
        return new Promise(function(resolve){
          getSong(playedSongs).then(function(song){
            songs.push(song);
            playedSongs.push([song.title,song.artist_name,song.score]);
            resolve(module.exports.multipleSongs(numberOfSongs-1, playedSongs, songs));
          });
        });   
      })());
    }
  });
};

module.exports.retrieveRecords = function(id){
  var query = Record.find();
  var queryItems = 'toTrain';
  query.select(queryItems);
  query.where('userID').equals(id);
  return query;
};

module.exports.saveToDB = function(id, trainingData){
  var record = {userID: id, 
                toTrain: trainingData};

  var trainingRecord = new Record(record);
  console.log('saved');
  trainingRecord.save(); 

};
