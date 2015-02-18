var Spotify = require('node-libspotify');
var Path = require('path');
var appKeyPath = Path.resolve(__dirname,'../../spotify_appkey.key');
var ENV = require('../../.ENV');
var spotify = new Spotify({appkeyFile: appKeyPath});
spotify.login(ENV.spotifyuser, ENV.spotifypass)
  .then(function () {
    //logged in
    console.log("i did it");
    spotify.search("Mr. Brightside")
      .then(function(songData){
        console.log("my data", songData.tracks.items);
      })
  })
  .catch(function (err) {
    //wrong username and/or password
  });


spotify.play = function(){
  var track = {
    uri: 'spotify:track:7gss5MqLM5sHlHOl2EAbrp'
  };  
    
  spotify.player.play(track);
}

spotify.mytest = function(){
  console.log("i am passing around the obj");
}

module.exports = spotify;