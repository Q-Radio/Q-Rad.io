var multipleSongs = require('../utils/multipleSongs.js');

module.exports = function(req, res){
  var playedSongs = req.body;
  multipleSongs(11,playedSongs, [], function(songs){
    res.status(200).send(songs);
  });
};