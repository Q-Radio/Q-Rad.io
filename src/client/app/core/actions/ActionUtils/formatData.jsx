module.exports = function(songData){
  return {
       key:songData.key/11,
       energy:songData.energy,
       liveness:songData.liveness,
       tempo:songData.tempo/500,
       speechiness:songData.speechiness,
       acousticness:songData.acousticness,
       instrumentalness:songData.instrumentalness,
       mode:songData.mode,
       duration:songData.duration/3600,
       loudness:songData.loudness,
       valence:songData.valence,
       danceability:songData.danceability
     }
}