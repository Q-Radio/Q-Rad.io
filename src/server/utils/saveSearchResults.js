var Promise = require('bluebird');
var http = require('http');

var DBUtils = require('./../../seedDBServer/utils.js');
var stateSettings =require('./saveSearchResultsHelpers/stateSettings.js');
var checkForSong = require('./saveSearchResultsHelpers/checkForSong.js');
var artistSearch = require('./saveSearchResultsHelpers/artistSearch.js');

module.exports = function(artist, playedSongs, results){
  return new Promise(function(resolve){
    results = results || 5;
    var searchQuery = '&results='+results+'&artist='+artist;

    var url = stateSettings.echonestArtist + searchQuery;

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
          artist = songsArray[0].artist_name;
          for( var i = 0; i < songsArray.length; i++ ){
              var songData = songsArray[i];
              DBUtils.isUnique(songData);
          }
          resolve(artistSearch(artist,playedSongs, results, module.exports));
        }
      })
    });
  });
};