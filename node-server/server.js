var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var Kitten = require(__dirname + '/database.js');
var morgan = require('morgan');

morgan('dev', {
  //skip: function (req, res) { return res.statusCode < 400 }
})

mongoose.connect('mongodb://localhost/shmoosh');

app.use(morgan())
app.use(express.static(__dirname))

app.get('/', function(req, res){
  //our landing page
  //this saves a new document to the DB
// var kitten = new Kitten({genre: 'rock'})
// kitten.save();

//   var kitten = Kitten.findOne({genre: 'rock'}, function(err, doc){
//     if (err) {
//       return console.log(err);
//     } else {

//       console.log('lololool', doc);
//     }
//   })

  //kitten.save();
  var path = __dirname + '/index.html';
  res.sendFile(path);
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
