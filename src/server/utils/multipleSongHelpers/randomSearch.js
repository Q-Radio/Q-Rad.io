var Promise = require('bluebird');
var Song = require('./../../../seedDBServer/database.js');


module.exports = function(){
  return new Promise(function(resolve){
      Song.count(function(err, count){
        if(err) console.err(err); 
        var rand = Math.floor(Math.random()*count);
        var query = Song.findOne().skip(rand);
        var queryItems = 'title score artist_name tracks.foreign_id audio_summary preview_url spotify_url image';
        query.select(queryItems);        
        query.exec(function(err,song){
          resolve(song);
        });
      });
   });  
};