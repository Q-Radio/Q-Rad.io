module.exports = function(songs){
  var index = Math.floor(Math.random()*songs.length);         
  var song = songs[index];
  return song;
};