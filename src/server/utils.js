var Song = require('./../seedDBServer/database.js');
var DBUtils = require('./../seedDBServer/utils.js');

var Record = require('./songHistory.js');
var Promise = require('bluebird');
var http = require('http');
var request = require('request'); 



var echonestArtist = process.env.echonestArtist || require('../../.ENV').echonestArtist;


var randomSong = function(songs){
  var index = Math.floor(Math.random()*songs.length);         
  var song = songs[index];
  return song;
};

var queryNoRepeats = function(playedSongs){
  var titles = [];
  var query = Song.find();
  var queryItems = 'title score artist_name tracks.foreign_id audio_summary preview_url spotify_url image';
  query.select(queryItems);
  query.limit(5);
  for(var i = 0; i<playedSongs.length; i++){
    titles.push(playedSongs[i][0]);
  }
  query.where('title').nin(titles);
  return query;
};

var closestSong = function(playedSongs, currentScore, distance){
  return new Promise(function(resolve){
    distance = distance || 5;
    var query = queryNoRepeats(playedSongs);
    query.where('score').gt(currentScore - distance).lt(currentScore + distance);
    query.exec(function(err,songs){
      
      if(err) return console.error(err);
      if(songs.length===0){
        resolve(closestSong(playedSongs, currentScore, distance*2));
      } else {
        var song = randomSong(songs); 
        resolve(song);        
      }
    });
  });
};

var randomSearch = function(){
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

var getSong = function(playedSongs, rand){
  return new Promise(function(resolve){
    if(playedSongs.length > 0){
      var currentSong = playedSongs[playedSongs.length-1];
      var currentScore = currentSong[2]; 
    }

    //send a random song if it is the first call
    if(currentSong === undefined || rand){
      randomSearch().then(function(song){
        resolve(song);
      })
    } else {
      resolve(closestSong(playedSongs, currentScore));
    }
  });
}

module.exports.multipleSongs = function(numberOfSongs, playedSongs, songs, callback){
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
        // callback(songs);

        module.exports.multipleSongs(numberOfSongs-1, playedSongs, songs, callback);
      });
  }
};

module.exports.retrieveRecords = function(id){
  var query = Record.find();
  var queryItems = 'toTrain';
  query.select(queryItems);
  query.where('userID').equals(id);
  return query;
};

module.exports.saveToDB = function(id, trainingData){
  var record = {userID: id, 
                toTrain: trainingData};

  var trainingRecord = new Record(record);
  console.log('saved');
  trainingRecord.save(); 

};

module.exports.saveSearchResults = function(artist, playedSongs, results){
  return new Promise(function(resolve){
    results = results || 5;
    var searchQuery = '&results='+results+'&artist='+artist;

    var url = echonestArtist + searchQuery;

    http.get(url, function(APIresponse){
      var data = '';
      APIresponse.on('data', function(chunk){
        data+=chunk;
      });
      APIresponse.on('end', function(){
        var songsArray = JSON.parse(data).response.songs || [];
        if(songsArray.length===0){
          resolve(checkForSong(artist));
        } else {
          console.log('artist',artist);
          artist = songsArray[0].artist_name;
          console.log(songsArray[0]);
          for( var i = 0; i < songsArray.length; i++ ){
              var songData = songsArray[i];
              DBUtils.isUnique(songData);
          }
          resolve(module.exports.artistSearch(artist,playedSongs, results));
        }
      })
    });
  });
};

module.exports.artistSearch = function(artist, playedSongs, results){
  return new Promise(function(resolve){
    var query = Song.find();
    var queryItems = 'title score artist_name tracks.foreign_id audio_summary preview_url spotify_url image';
    query.select(queryItems);
    var titles = [];
    query.limit(5);
    for(var i = 0; i<playedSongs.length; i++){
      titles.push(playedSongs[i][0]);
    }
    query.where('artist_name').equals(artist);
    query.where('title').nin(titles);

    query.exec(function(err,songs){
      if(err) return console.error(err);
      if(songs.length===0){
        resolve(module.exports.saveSearchResults(artist,playedSongs, results+5));
        // resolve('No Artist Found');
      } else {
        var song = randomSong(songs); 
        resolve(song);        
      }
    });
  });  
};

var checkForSong = function(artist){
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
        resolve(retrieveSong(songTitle));
      }
    }); 

  });
};

var retrieveSong = function(song){
  return new Promise(function(resolve){

    song = song.replace(/ /gi,'+');
    var searchQuery = '&results=1&title='+song;

    var url = echonestArtist + searchQuery;

    http.get(url, function(APIresponse){
      var data = '';
      APIresponse.on('data', function(chunk){
        data+=chunk;
      });
      APIresponse.on('end', function(){
        var songsArray = JSON.parse(data).response.songs || [];
        if(songsArray.length===0){
          resolve('No Artist Found');
        } else {

          title = songsArray[0].title;

          DBUtils.isUnique(songsArray[0]);

          resolve(checkForSong(title));
        }
      })
    });
  });
};

module.exports.checkForPlaylist = function(url, access_token){
  return new Promise(function(resolve){
    var playlistFound = false;

    request.get({
        headers: {'Authorization': 'Bearer '+access_token},
        url:     url+'?limit=50'
        // body:    JSON.stringify({'name':'A New Playlist'})
      }, function(error, response, body){
        console.log('check playlist?');
        var playlists = JSON.parse(body).items;
        for(var i = 0; i<playlists.length; i++){
          if(playlists[i].name === "Quentin's Rad Tracks"){
            playlistFound = true;
            var playlistID = playlists[i].id;
            resolve(playlistID);
            console.log('Playlist Id', playlistID);
          }
        }
        if(!playlistFound){
          createPlaylist(url, access_token).then(function(playlistID){
            resolve(playlistID);
          })
        }
      });
  });
};

var createPlaylist = function(url, access_token){
  return new Promise(function(resolve){
    request.post({
        headers: {'Authorization': 'Bearer '+access_token, 'content-type' : 'application/json'},
        url:     url,
        body:    JSON.stringify({'name': "Quentin's Rad Tracks"})
      }, function(error, response, body){
        console.log('created playlist?');
        var playlist = JSON.parse(body);

        resolve(playlist.id);

        console.log(playlist.id);
      });
  });
};

module.exports.addTrackToPlaylist = function(url, access_token, track){
  return new Promise(function(resolve){
    request.post({
        headers: {'Authorization': 'Bearer '+access_token, 'content-type' : 'application/json'},
        url:     url,
        body:    JSON.stringify({'uris': ['spotify:track:'+track]})
      }, function(error, response, body){
        console.log('added to playlist?');
        console.log(body);
        resolve(true);
      });
  });
};