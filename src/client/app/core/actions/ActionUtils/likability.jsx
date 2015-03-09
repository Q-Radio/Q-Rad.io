var formatData = require('./formatData.jsx');

module.exports = function(song, net){
  if(net !== undefined){
    var audioDetails = formatData(song.audio_summary);
    var score = net.run(audioDetails);  
    song.likability = score.rating;
  }
  return song;   
};