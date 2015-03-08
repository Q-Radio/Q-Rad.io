var Promise = require('bluebird');
var request = require('request'); 

var createPlaylist = require('./createPlaylist.js');

module.exports = function(url, access_token){
  return new Promise(function(resolve){
    var playlistFound = false;

    request.get({
        headers: {'Authorization': 'Bearer '+access_token},
        url:     url+'?limit=50'
        // body:    JSON.stringify({'name':'A New Playlist'})
      }, function(error, response, body){
        var playlists = JSON.parse(body).items;
        for(var i = 0; i<playlists.length; i++){
          if(playlists[i].name === "Quentin's Rad Tracks"){
            playlistFound = true;
            var playlistID = playlists[i].id;
            resolve(playlistID);
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