var http = require('http');
var https = require('https');
var ENV = require('../../.ENV');
var Song = require('./database.js');

var isUnique = function(songData){
  var query = Song.find();
  query.where('title').equals(songData.title);
  query.where('artist_name').equals(songData.artist_name);

  query.exec(function(err,songs){
    if(err) return console.error(err);
    if(songs.length===0){
      var song = songData.audio_summary;
      var score = song.key*10 + song.energy*10 + song.liveness*10 + song.tempo/50 + song.speechiness*10 + song.acousticness*10 + song.instrumentalness*10 
        + song.mode*10 + song.time_signature*10 + song.loudness/10 + song.valence*10 + song.danceability*10;

      var spotifyID = (songData.tracks[0].foreign_id).split(':')[2];
      var url = 'https://api.spotify.com/v1/tracks?ids='+spotifyID;

      https.get(url, function(APIResponse){
        var data = '';
        APIResponse.on('data', function(chunk){
          data+=chunk;
        });
        APIResponse.on('end', function(){
          var spotifyInfo = JSON.parse(data);

          var spotifyTrack = spotifyInfo.tracks[0];

          if(spotifyTrack.preview_url !== null){
            songData.score = score;
            songData.tracks = songData.tracks[0];
            songData.preview_url = spotifyTrack.preview_url;
            songData.spotify_url = spotifyTrack.external_urls.spotify;
            songData.image = spotifyTrack.album.images[0].url;

            var songEntry = new Song(songData);
            console.log('saved');
            songEntry.save();  
          }           

        });
      });
    }
  });
};


module.exports.getSongData = function(maxSongs, currentSongs){
  currentSongs = currentSongs || 0;
  var results = 100;
  var remaining = maxSongs - currentSongs;

  if(results > remaining){
    results = remaining;
  }

  var searchQuery = '&start='+currentSongs+'&results='+results;

  var url = ENV.echonest + searchQuery;

	http.get(url, function(APIresponse){
    console.log('seed');
    var data = '';
    APIresponse.on('data', function(chunk){
      data+=chunk;
    });
    APIresponse.on('end', function(){
      var songsArray = JSON.parse(data).response.songs;
      for( var i = 0; i < songsArray.length; i++ ){
          var songData = songsArray[i];
          isUnique(songData);

          currentSongs++;
      }
      if(currentSongs < maxSongs){
        console.log(currentSongs, songsArray.length, results, remaining);
        module.exports.getSongData(maxSongs, currentSongs);
      }
    })
  });
};


