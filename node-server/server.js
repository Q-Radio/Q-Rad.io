var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var Kitten = require(__dirname + '/database.js');
var http = require('http');
var ENV = require('../.ENV');


mongoose.connect(ENV.mongo);

app.use(express.static(__dirname))

app.get('/test', function(req, res){
  console.log('test');
  http.get(ENV.echonest, function(APIresponse){
      var data = '';
      APIresponse.on('data', function(chunk){
        data+=chunk;
      });
      APIresponse.on('end', function(){
        var songsArray = JSON.parse(data).response.songs;
        console.log(songsArray);

        for( var i = 0; i < songsArray.length; i++ ){
          var song = songsArray[i].audio_summary;
          var score = song.key*10 + song.energy*10 + song.liveness*10 + song.tempo/50 + song.speechiness*10 + song.acousticness*10 + song.instrumentalness*10 
            + song.mode*10 + song.time_signature*10 + song.loudness/10 + song.valence*10 + song.danceability*10;

            var songData = songsArray[i];
            songData.score = score;
            var songEntry = new Kitten(songData);
            songEntry.save();

        }

        // var path = __dirname + '/index.html';
        // res.sendFile(path);
      })

    });


}); 

app.get('/splash', function(req, res){
  //our landing page
  console.log(req.url);
  //var path = __dirname + '/splash.html';
  res.send('lol');
}); 

app.get('/login', function(req, res){
  //we will likely want our login setup on our splash page
  var path = __dirname + '/login.html';
  res.send('tool');
}); 

app.get('/signup', function(req, res){
  //use spotify or fb authentication
  var path = __dirname + '/signup.html';
  res.send('tool');
}); 

app.get('/player', function(req, res){
  //Serve up Spotify player
  var path = __dirname + '/player.html';
  res.sendFile(path)
});

app.get('/contribute', function(req, res){
  //serve up form for users to contribute through
});

app.post('/', function(req, res){
  console.log('oisadjfpiuasdhgpiuashdgpiuashdfpiuh')
})


app.listen(port);
