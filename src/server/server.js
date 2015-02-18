(function() {
	'use strict';
  var express  = require('express');
  var reloader = require('connect-livereload');
  var mongoose = require('mongoose');
  var bodyParser = require('body-parser');

  var Song = require(__dirname + '/../seedDBServer/database.js');
  var ENV = require('../../.ENV');

  module.exports = function(){

    var app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(reloader());
    app.use(express.static('./build'));

    mongoose.connect(ENV.mongo);

    app.post('/song',function(req, res){
      console.log('testing', req.body);

      var playedSongs = req.body;
      if(playedSongs.length > 0){
        var currentSong = playedSongs[playedSongs.length-1];
        var currentScore = currentSong[2]; 
      }

      if(currentSong === undefined){
        Song.find(function(err,songs){
          var index = Math.floor(Math.random()*songs.length);         
          var song = songs[index];
          res.status(200).send(song);
        });
      } else {
        var closestSong = function(distance){
          distance = distance || 5;
          var query = Song.find()
                      .where('score').gt(currentScore - distance).lt(currentScore + distance)
                      .where('title').ne(currentSong[0])
                      .select('title score artist_name tracks.foreign_id');
          query.exec(function(err,songs){
            if(err) return console.error(err);
            if(songs.length===0){
              closestSong(distance*2);
            } else {
              var index = Math.floor(Math.random()*songs.length);
              //checkt to make sure the new song is not the same as the last song
              var song = songs[index];          
              res.status(200).send(song);
            }
          });
        }
        closestSong();
      }
    })

    app.get('/win',function(req, res){
     var data = Song.find();
     //console.log(data);
     res.send(data);
      
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