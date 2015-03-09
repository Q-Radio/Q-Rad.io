var express = require('express');
var utils = require('./utils.js');
var mongoose = require('mongoose');

var app = express();
var port = process.env.PORT || 3000;
app.use(express.static(__dirname))

var mongo = process.env.mongo || require('../../.ENV').mongo;

mongoose.connect(mongo);

app.get('/seed', function(req, res){
  console.log('seed');

    //seed DB with TOP 1000 songs by default. To change, edit API post to echonest. See .ENV file
    var maxSongs = 1000;

    utils.getSongData(maxSongs);
    res.sendStatus(200);
  }); 

app.listen(port);
