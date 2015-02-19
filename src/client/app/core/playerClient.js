
  //getSpotifyPlayer(['spotify:track:6bLDDvzZUi4v4ORd35Gcgs', "spotify:track:0z5RVVGeSp4ddoZsZLsVWH"], function(player) 

function initUI() {
  $("#artist").on('keydown', function(evt) {
      if (evt.keyCode == 13) {
          //newArtist();
      }
  });
  $("#go").on("click", function() {
      //newArtist();
  });
  $("#random").on("click", function() {
          
  });
}
player = new Player();

function getSong(){   
  console.log('getSong is firing');
  $.ajax({
    type: 'POST',
    url: '/song',
    data: JSON.stringify(songs),
    dataType: 'json',
    contentType: 'application/json',
    success: function(data){
      spotifyCall([data.tracks.foreign_id]);

    }
  });
};

function spotifyCall(songs){
  var results = songs.map(function(song){
    return song.split(':')[2];
  });
  $.getJSON("https://api.spotify.com/v1/tracks/", {'ids': results.join(',')}) 
    .done(function(data) {
      cleanPlaylist(data.tracks);
    })
    .error( function() {
    }) ;

}

//to remove songs without a url and request a new one in that case
function cleanPlaylist(list){
  var result = [];
  list.forEach(function(song){
    if (song.preview_url === null){
      console.log('in clean playlist null preview');
      getSong();
    } else {
      result.push(song);
    }
  })
  player.addSong(result);
}

$(document).ready(function() {
  initUI();
  $("#all_results").append(player.main);
  player.addListeners();

  //listeners to load in next song
  player.next.on('click', function(){
    console.log(player.songsLeft());
    if (player.songsLeft() < 1){
      getSong();
      
    }
  })
  player.audio.on('ended', function() {
      //console.log('ended');
      getSong();
  });

  //seed with two
  getSong();
  getSong();

});


