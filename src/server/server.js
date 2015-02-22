	'use strict';
  var express  = require('express');
  var reloader = require('connect-livereload');
  var mongoose = require('mongoose');
  var bodyParser = require('body-parser');
  var requestHandler = require('./requestHandler.js');

  var ENV = process.env.mongo || require('../../.ENV');

    var app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(reloader());
    app.use(express.static('./build'));

    mongoose.connect(ENV.mongo);

    app.post('/song',requestHandler.getRelatedSong);

    app.post('/random',requestHandler.getRandomSong);


    var port = process.env.PORT || 8000;

    app.listen(port, function() {
      console.log('listening on port 8000');
    });

module.exports = app;



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