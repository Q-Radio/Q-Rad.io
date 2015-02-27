// Player = require('./PlayerClass.js').Player;
var songs = [];

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

function getSong(callback){   
  console.log('getSong is firing');
  $.ajax({
    type: 'POST',
    url: '/song',
    data: JSON.stringify(songs),
    dataType: 'json',
    contentType: 'application/json',
    success: function(data){
      songs.push([data.title,data.artist_name,data.score,data.audio_summary]);
      spotifyCall([data.tracks.foreign_id],data.audio_summary, callback);

    }
  });
};

function spotifyCall(songs,audio, callback){
  var results = songs.map(function(song){
    return song.split(':')[2];
  });
  $.getJSON("https://api.spotify.com/v1/tracks/", {'ids': results.join(',')}) 
    .done(function(data) {
      console.log(data.tracks);
      cleanPlaylist(data.tracks,audio, callback);
    })
    .error( function() {
    }) ;

}

//to remove songs without a url and request a new one in that case
function cleanPlaylist(list,audio, callback){
  var result = [];
  list.forEach(function(song){
    if (song.preview_url === null){
      console.log('in clean playlist null preview');
      getSong(callback);
    } else {
      song.audio = audio;
      result.push(song);
    }
  })
  callback(result);
}


// function ready(cb){
//   $(document).ready(function() {
//     player = new Player();

//     initUI();
//     // $("#all_results").append(player.main);
//     player.addListeners();

//     //listeners to load in next song
//     player.next.on('click', function(){
//       console.log(player.songsLeft());
//       if (player.songsLeft() < 1){
//         getSong(player.addSong.bind(player));
        
//       }
//     })
//     player.audio.on('ended', function() {
//         //console.log('ended');
//       if (player.songsLeft() < 1){
//         getSong(player.addSong.bind(player));
//       }
//     });

//     //seed with two
//     getSong(player.addSong.bind(player));

//     for(var i = 0; i<10; i++){
//       getSong(player.addFutureSong.bind(player));
//       console.log(i);
//     }

//     cb(player);
//   });  
// };

// module.exports.ready = ready;

