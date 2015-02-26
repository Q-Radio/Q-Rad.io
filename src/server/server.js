'use strict';
var express  = require('express');
var reloader = require('connect-livereload');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');

var swig = require('swig');
var consolidate = require('consolidate');
var Path = require('path');
var auth = require('./auth.js');
var authRouter = require('./authRouter.js');

var mongo = process.env.mongo || require('../../.ENV').mongo;
var port = process.env.PORT || 8000;
var host = process.env.HOST || 'localhost'

var app = express();
var build = Path.resolve(__dirname,'../../build');

app.engine('html', consolidate.swig);
app.set('views', build + '/templates/core/views');
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: 'supermusic' }));
app.use(auth.initialize());
app.use(auth.session());

app.use(reloader());

mongoose.connect(mongo);

app.use(authRouter);

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