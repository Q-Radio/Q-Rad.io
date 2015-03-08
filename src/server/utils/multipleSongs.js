var getSong = require('./multipleSongHelpers/getSong.js');

module.exports = function(numberOfSongs, playedSongs, songs, callback){
    if(numberOfSongs === 0){
      callback(songs);
    } else {
      var rand = false; 
      if(numberOfSongs === 11){
        rand = true;
      }
      getSong(playedSongs, rand).then(function(song){
        playedSongs.push([song.title,song.artist_name,song.score]);
        songs.push(song);

        module.exports(numberOfSongs-1, playedSongs, songs, callback);
      });
  }
};








