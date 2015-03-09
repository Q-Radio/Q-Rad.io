var multipleSongs = require('../utils/multipleSongs.js');
var saveSearchResults = require('../utils/saveSearchResults.js');


module.exports = function(req, res){
  var artist = req.body.artist;
  var playedSongs = req.body.playedSongs;

  saveSearchResults(artist, playedSongs).then(function(song){
    multipleSongs(10,playedSongs,[],function(songs){
      songs.unshift(song);
      res.status(200).send(songs);
    });
  });
};