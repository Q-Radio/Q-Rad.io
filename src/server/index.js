(function() {
	'use strict';
  var express  = require('express');
  var reloader = require('connect-livereload');
  var mongoose = require('mongoose');
  var Kitten = require(__dirname + '/../../node-server/database.js');
  var ENV = require('../../.ENV');
  var spotify = require('./playerTest.js');

  module.exports = function(){
    console.log('in server');

    var app = express();

    app.use(reloader());
    app.use(express.static('./build'));

    mongoose.connect(ENV.mongo);

    app.get('/test',function(req, res){
      console.log(Kitten.find({title:'Break Free'}));
    })

    app.get('/spotify',function(req, res){
      console.log('yeah');
      spotify.mytest();
      //spotify.play();
      //res.send(spotify);
      
    })

    app.get('/win',function(req, res){
     var data = Kitten.find({});
     console.log(data);
     res.send(data);
      
    })

    app.listen(8000, function() {
      console.log('listening on port 8000');
    });
  }
})();