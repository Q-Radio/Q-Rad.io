(function() {
	'use strict';
  var express  = require('express');
  var reloader = require('connect-livereload');
  var mongoose = require('mongoose');
  
  var Song = require(__dirname + '/../seedDBServer/database.js');
  var ENV = require('../../.ENV');

  module.exports = function(){
    console.log('in server');

    var app = express();

    app.use(reloader());
    app.use(express.static('./build'));

    mongoose.connect(ENV.mongo);

    app.get('/test',function(req, res){

      // console.log(req.body);
      var currentSong = undefined;//get current song from req
      var currentScore = 73; //get current score of song currently playing

      if(currentSong = undefined){
        Song.find(function(err,songs){
          var index = Math.floor(Math.random()*songs.length);
          
          var song = songs[index];
          console.log(song);
          res.status(200).send(song);
        })
      } else {
        var query = Song.find()
                    .where('score').gt(currentScore-5).lt(currentScore+5)
                    // .where('title').ne(currentSong.title)
                    .sort('-score')
                    .select('title score artist tracks.foreign_id');
        query.exec(function(err,songs){
          var index = Math.floor(Math.random()*songs.length);
          //checkt to make sure the new song is not the same as the last song
          var song = songs[index];
          console.log(song);

          res.status(200).send(song);
        });

      }


    })

    app.listen(8000, function() {
      console.log('listening on port 8000');
    });
  }
})();



// app.get('/splash', function(req, res){
//   //our landing page
//   console.log(req.url);
//   //var path = __dirname + '/splash.html';
//   res.send('lol');
// }); 

// app.get('/login', function(req, res){
//   //we will likely want our login setup on our splash page
//   var path = __dirname + '/login.html';
//   res.send('tool');
// }); 

// app.get('/signup', function(req, res){
//   //use spotify or fb authentication
//   var path = __dirname + '/signup.html';
//   res.send('tool');
// }); 

// app.get('/player', function(req, res){
//   //Serve up Spotify player
//   var path = __dirname + '/player.html';
//   res.sendFile(path)
// });

// app.get('/contribute', function(req, res){
//   //serve up form for users to contribute through
// });

// app.post('/', function(req, res){
//   console.log('oisadjfpiuasdhgpiuashdgpiuashdfpiuh')
// })