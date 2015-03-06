var utils = require('./utils.js');
var path = require('path');
var Promise = require('bluebird');
var seedDBUtils = require('../seedDBServer/utils.js');
var request = require('request'); 
var querystring = require('querystring');


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
      distance = distance || 3;
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

module.exports.get11Songs = function(req, res){
  var playedSongs = req.body;
  utils.multipleSongs(11,playedSongs, [], function(songs){
    console.log('ready to send');
    res.status(200).send(songs);
  });
};


module.exports.get3Songs = function(req, res){
  var playedSongs = req.body;
  console.log('getting song');
  utils.multipleSongs(3,playedSongs,[],function(songs){
    console.log('got song');
    res.status(200).send(songs);
  });
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

module.exports.discoverArtist = function(req, res){
  var artist = req.body;
}

module.exports.trainingWorker = function(req, res){
  res.status(200).sendFile(path.resolve(__dirname +'/../../build/js/core/trainingWorker.js'));
}

module.exports.getHistory = function(req, res){
  var user = req.user.id;

  var query = utils.retrieveRecords(user);

  query.exec(function(err,records){
    if(err) return console.error(err);      
    res.status(200).send(records);
  });
};

module.exports.saveRecord = function(req, res){
  var user = req.user.id;
  var record = req.body;  

  utils.saveToDB(user,record);

  res.status(200).send();
};

module.exports.search = function(req, res){
  var artist = req.body.artist;
  var playedSongs = req.body.playedSongs;

  utils.saveSearchResults(artist, playedSongs).then(function(song){
    utils.multipleSongs(10,playedSongs,[],function(songs){
      songs.unshift(song);
      res.status(200).send(songs);
    });
  });
};

module.exports.createPlaylist = function(req, res){

  console.log('cookies', req.cookies);


  var url = 'https://api.spotify.com/v1/users/'+req.user.id+'/playlists';
  var access_token = req.cookies.access_token;

  utils.checkForPlaylist(url, access_token).then(function(playlistID){
    res.cookie('playlist_ID',playlistID);
    res.status(200).send();
  });

};

module.exports.addToPlaylist = function(req, res){

  var playlist_ID = req.cookies.playlist_ID;


  var track_ID = req.body.trackID;

  var url = 'https://api.spotify.com/v1/users/'+req.user.id+'/playlists/'+playlist_ID+'/tracks';

  var access_token = req.cookies.access_token;

  utils.addTrackToPlaylist(url, access_token,track_ID).then(function(playlistID){

    console.log('success!!!!');
    res.status(200).send();
  });

};
