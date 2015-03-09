
module.exports = function(currentSong, playedSongs){
    var playlist;
    if(playedSongs.length - currentSong < 5 && playedSongs.length >10){
      playlist = playedSongs.slice(playedSongs.length-10, playedSongs.length);
    }else if( currentSong > 4 && playedSongs.length > 10){
      playlist = playedSongs.slice(currentSong-5, currentSong+5);
    }else {
      playlist = playedSongs.slice(0,10);       
    }
  return playlist;
}