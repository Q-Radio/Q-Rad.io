var mongoose = require('mongoose');

//good querying resource
//http://blog.modulus.io/getting-started-with-mongoose

var Record = mongoose.Schema({
   "userID":String,

   "toTrain":{         
      "input":{  
         "key":Number,
         "analysis_url":String,
         "energy":Number,
         "liveness":Number,
         "tempo":Number,
         "speechiness":Number,
         "acousticness":Number,
         "instrumentalness":Number,
         "mode":Number,
         "time_signature":Number,
         "duration":Number,
         "loudness":Number,
         "audio_md5":String,
         "valence":Number,
         "danceability":Number
      },
      "output":{
         "rating":Number
      }
   }

});

module.exports = mongoose.model('Record', Record);
