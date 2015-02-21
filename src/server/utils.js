var Song = require('./../seedDBServer/database.js');


module.exports.randomSong = function(songs){
  var index = Math.floor(Math.random()*songs.length);         
  var song = songs[index];
  return song;
}

module.exports.queryNoRepeats = function(playedSongs){
  var titles = []
  var query = Song.find();
  var queryItems = 'title score artist_name tracks.foreign_id audio_summary preview_url spotify_url image';
  query.select(queryItems);
  for(var i = 0; i<playedSongs.length; i++){
    titles.push(playedSongs[i][0]);
  }
  query.where('title').nin(titles);
  return query;
}
