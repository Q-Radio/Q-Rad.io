var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var ENV = require('../../.ENV');
var Song = require(__dirname + '/database.js');


var app = express();
var port = process.env.PORT || 3000;
app.use(express.static(__dirname))


mongoose.connect(ENV.mongo);


app.get('/seed', function(req, res){
  console.log('seed');

  //seed DB with TOP 100 songs by default. To change, edit API post to echonest. See .ENV file
  http.get(ENV.echonest, function(APIresponse){
      var data = '';
      APIresponse.on('data', function(chunk){
        data+=chunk;
      });
      APIresponse.on('end', function(){
        var songsArray = JSON.parse(data).response.songs;
        // console.log(songsArray);

        for( var i = 0; i < songsArray.length; i++ ){
          var song = songsArray[i].audio_summary;
          var score = song.key*10 + song.energy*10 + song.liveness*10 + song.tempo/50 + song.speechiness*10 + song.acousticness*10 + song.instrumentalness*10 
            + song.mode*10 + song.time_signature*10 + song.loudness/10 + song.valence*10 + song.danceability*10;

            var songData = songsArray[i];
            songData.score = score;

            songData.tracks = songData.tracks[0];

            var songEntry = new Song(songData);
            songEntry.save();
        }
        res.sendStatus(200);
      })
    });
}); 

app.listen(port);
