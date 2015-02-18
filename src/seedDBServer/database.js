var mongoose = require('mongoose');

//good querying resource
//http://blog.modulus.io/getting-started-with-mongoose

var Song = mongoose.Schema({
      "score":Number,
      "artist_id":String,
      "artist_name":String,
      "title":String,
      "id":String,
      "tracks": {  
         "album_type":String,
         "album_date":Date,
         "foreign_release_id":String,
         "catalog":String,
         "foreign_id":String,
         "album_name":String,
         "id":String
      },
      "audio_summary":{  
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

});

module.exports = mongoose.model('Song', Song);
