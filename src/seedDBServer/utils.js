var http = require('http');
var https = require('https');
var ENV = require('../../.ENV');
var Song = require('./database.js');

var echonest = process.env.echonest || require('../../.ENV').echonest;

module.exports.isUnique = function(songData){
  var query = Song.find();
  query.where('title').equals(songData.title);
  query.where('artist_name').equals(songData.artist_name);

  query.exec(function(err,songs){
    if(err) return console.error(err);
    if(songs.length===0){
      var song = songData.audio_summary;
      var score = song.key*1 + song.energy*100 + song.tempo/5  + song.mode*1000 + song.instrumentalness * 100 + 
      song.valence*200 + song.danceability*10;

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

  var url = echonest + searchQuery;

	http.get(url, function(APIresponse){
    console.log('seed');
    var data = '';
    APIresponse.on('data', function(chunk){
      data+=chunk;
    });
    APIresponse.on('end', function(){
      var songsArray = JSON.parse(data).response.songs || [];
      for( var i = 0; i < songsArray.length; i++ ){
          var songData = songsArray[i];
          module.exports.isUnique(songData);

          currentSongs++;
      }
      if(currentSongs < maxSongs){
        console.log(currentSongs, songsArray.length, results, remaining);
        module.exports.getSongData(maxSongs, currentSongs);
      }
    })
  });
};


