var Promise = require('bluebird');
var Song = require('./../../../seedDBServer/database.js');

var retrieveSong = require('./retrieveSong.js');

module.exports = function(artist){
  return new Promise(function(resolve){
    var songTitle = artist;

    var query = Song.findOne();
    var queryItems = 'title score artist_name tracks.foreign_id audio_summary preview_url spotify_url image';
    query.select(queryItems);
    query.where('title').equals(songTitle);

    query.exec(function(err,song){
      if(song){
        resolve(song);
      } else {
        resolve(retrieveSong(songTitle, module.exports));
      }
    }); 

  });
};