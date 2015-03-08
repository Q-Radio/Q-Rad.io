var Promise = require('bluebird');
var http = require('http');
var DBUtils = require('./../../../seedDBServer/utils.js');

var stateSettings = require('./stateSettings.js');

module.exports = function(song, checkForSong){
  return new Promise(function(resolve){

    song = song.replace(/ /gi,'+');
    var searchQuery = '&results=1&title='+song;

    var url = stateSettings.echonestArtist + searchQuery;

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