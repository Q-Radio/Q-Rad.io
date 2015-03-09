var Promise = require ('bluebird'); 

var getSongs = require('./getSongs.jsx');
var likability = require('./likability.jsx');

module.exports = function(url, retrained, futureSongs, fetchedSongs, net, artist){
  return new Promise(function(resolve){
    //make fetchedSongs an object if there is an artist to allow searching
    var data = (artist ? {artist: artist, playedSongs: fetchedSongs} : fetchedSongs);
    getSongs(data, url).then(function(songs){
      if(songs[0] ==='No Artist Found'){
        resolve(songs[0]);
      } else {
        songs.forEach(function(song){
          fetchedSongs.push([song.title,song.artist_name,song.score]);
          futureSongs.push(song);
          song = likability(song, net);
          resolve({futureSongs:futureSongs, fetchedSongs:fetchedSongs});        
        });
      };
    })
  });
};