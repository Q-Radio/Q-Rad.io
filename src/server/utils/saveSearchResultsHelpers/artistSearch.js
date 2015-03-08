var Promise = require('bluebird');
var Song = require('./../../../seedDBServer/database.js');

var randomSong = require('../randomSong.js');

module.exports = function(artist, playedSongs, results, saveSearchResults){
  return new Promise(function(resolve){
    var query = Song.find();
    var queryItems = 'title score artist_name tracks.foreign_id audio_summary preview_url spotify_url image';
    query.select(queryItems);
    var titles = [];
    query.limit(5);
    for(var i = 0; i<playedSongs.length; i++){
      titles.push(playedSongs[i][0]);
    }
    query.where('artist_name').equals(artist);
    query.where('title').nin(titles);

    query.exec(function(err,songs){
      if(err) return console.error(err);
      if(songs.length===0){
        resolve(saveSearchResults(artist,playedSongs, results+5));
        // resolve('No Artist Found');
      } else {
        var song = randomSong(songs); 
        resolve(song);        
      }
    });
  });  
};