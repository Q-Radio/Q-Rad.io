var Promise = require('bluebird');

var randomSearch = require('./randomSearch.js');
var closestSong = require('./closestSong.js');

module.exports = function(playedSongs, rand){
  return new Promise(function(resolve){
    if(playedSongs.length > 0){
      var currentSong = playedSongs[playedSongs.length-1];
      var currentScore = currentSong[2]; 
    }

    //send a random song if it is the first call
    if(currentSong === undefined || rand){
      randomSearch().then(function(song){
        resolve(song);
      })
    } else {
      resolve(closestSong(playedSongs, currentScore));
    }
  });
};