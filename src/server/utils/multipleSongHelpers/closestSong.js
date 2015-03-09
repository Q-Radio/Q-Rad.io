var Promise = require('bluebird');

var randomSong = require('./../randomSong.js');
var queryNoRepeats = require('./queryNoRepeats.js');

module.exports = function(playedSongs, currentScore, distance){
  return new Promise(function(resolve){
    distance = distance || 5;
    var query = queryNoRepeats(playedSongs);
    query.where('score').gt(currentScore - distance).lt(currentScore + distance);
    query.exec(function(err,songs){
      
      if(err) return console.error(err);
      if(songs.length===0){
        resolve(module.exports(playedSongs, currentScore, distance*2));
      } else {
        var song = randomSong(songs); 
        resolve(song);        
      }
    });
  });
};