var Song = require('./../seedDBServer/database.js');


module.exports.randomSong = function(songs){
  var index = Math.floor(Math.random()*songs.length);         
  var song = songs[index];
  return song;
}

module.exports.queryNoRepeats = function(playedSongs){
  var query = Song.find();
  query.select('title score artist_name tracks.foreign_id');
  for(var i = 0; i<playedSongs.length; i++){
    query.where('title').ne(playedSongs[i][0]);
  }
  return query;
}
