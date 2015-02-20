var utils = require('./utils.js');

module.exports.getRelatedSong = function(req, res){

  var playedSongs = req.body;
  if(playedSongs.length > 0){
    var currentSong = playedSongs[playedSongs.length-1];
    var currentScore = currentSong[2]; 
  }

  if(currentSong === undefined){
    var query = utils.queryNoRepeats(playedSongs);

    query.exec(function(err,songs){
      if(err) return console.error(err);
      var song = utils.randomSong(songs);       
      res.status(200).send(song);
    });

  } else {
    var closestSong = function(distance){
      distance = distance || 5;
      var query = utils.queryNoRepeats(playedSongs);
      query.where('score').gt(currentScore - distance).lt(currentScore + distance);

      query.exec(function(err,songs){
        if(err) return console.error(err);
        if(songs.length===0){
          closestSong(distance*2);
        } else {
          var song = utils.randomSong(songs);         
          res.status(200).send(song);
        }
      });
    }
    closestSong();
  }
}

module.exports.getRandomSong = function(req, res){
  var playedSongs = req.body;

  var query = utils.queryNoRepeats(playedSongs);

  query.exec(function(err,songs){
    if(err) return console.error(err);
    var song = utils.randomSong(songs);       
    res.status(200).send(song);
  });
}


