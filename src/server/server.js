'use strict';
var express  = require('express');
var reloader = require('connect-livereload');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Path = require('path');
var requestHandler = require('./requestHandler.js');

var mongo = process.env.mongo || require('../../.ENV').mongo;
var port = process.env.PORT || 8000;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(reloader());
var mypath = Path.resolve(__dirname,'../../build');
console.log('path is ', mypath);
app.use(express.static(mypath));

mongoose.connect(mongo);

app.get('/training-worker.js',requestHandler.trainingWorker);


app.post('/10songs',requestHandler.get10Songs);

app.post('/3songs',requestHandler.get3Songs);


app.post('/random',requestHandler.getRandomSong);

var port = process.env.PORT || 8000;


app.listen(port, function() {
  console.log('listening on port ', port);
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