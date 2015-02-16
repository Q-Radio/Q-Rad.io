var mongoose = require('mongoose');

//good querying resource
//http://blog.modulus.io/getting-started-with-mongoose

var Kitten = mongoose.Schema({
   Song_Data: {
    SuperMusic_id: Number,
    Spotify_track_id: Number,
    song_name: String,
    live_performance: Boolean,
    live_data: {
      location_of_performance: String,
      date_of_performance: Date,
    },
    genre: String,
    artist: String,
    tempo: Number,
    meter: String,
    key: String,
    track_length: Number,
    range: {
      highest_pitch: String,
      lowest_pitch: String
    },
    number_of_instruments: Number,
    language: String,
    instrumental: Boolean,
    publication_date: Date,
    producers: Array,
    engineers: Array,
    musicians: Array,
    vocalist_gender: String,
    gender_ratio: Number
  }, 
  Artist_Data: {
    name: String,
    band_members: Array, 
    guest_artists: Array, 
    age: {
      date_of_birth: Date,
      date_of_death: Date
    },
    prolificness: {
      number_of_albums: Number,
      number_of_tracks: Number
    },
    country_of_origin: String,
    popularity: Number,
    social_media_metrics: {
      facebook: {
        likes: Number,
        mentions: Number,
        talking_about: Number
      },
      twitter: {
        retweets: Number,
        favorites: Number
      },
      klout_score: Number
    }
  },
  User_Input: {//this section is where the users add data to our songs
    song_liked: Boolean,
    predominant_instrument: String,
    subject_matter: String,
    mood: String
  }
});

module.exports = mongoose.model('Kitten', Kitten);
