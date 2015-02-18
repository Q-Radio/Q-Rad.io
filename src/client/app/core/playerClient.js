function fetchArtistPlaylist(artist,  wandering, variety) {
  $("#all_results").empty();

  var title = "Artist radio for " + artist;

  //pass an array of spotify:track:ids
  //getSong();
  getSpotifyPlayer(['spotify:track:6bLDDvzZUi4v4ORd35Gcgs', "spotify:track:0z5RVVGeSp4ddoZsZLsVWH"], function(player) {
      console.log('got the player');
      $("#all_results").append(player);
  });

}

function newArtist() {
  var artist = $("#artist").val();
  fetchArtistPlaylist(artist, false, .2);
}

function info(txt) {
  $("#info").text(txt);
}

function initUI() {
  $("#artist").on('keydown', function(evt) {
      if (evt.keyCode == 13) {
          newArtist();
      }
  });
  $("#go").on("click", function() {
      newArtist();
  });
  $("#random").on("click", function() {
      seedSong();
      function seedSong (){   
        $.ajax({
          type: 'POST',
          url: '/song',
          data: JSON.stringify(songs),
          dataType: 'json',
          contentType: 'application/json',
          success: function(data){
            songs.push([data.title,data.artist_name,data.score]);
            console.log(data.tracks.foreign_id);
            // $(player).addSpotifyInfoToPlaylist([data.track.foreign_id]);
            //addSpotifyInfoToPlaylist([data.tracks.foreign_id]);
            getSpotifyPlayer([data.tracks.foreign_id], function(player) {
                console.log('got the player');
                $("#all_results").append(player);
            });
          }
        });
      };
  });
}

$(document).ready(function() {
  initUI();
});


function fidToSpid(fid) {
  console.log('is this happening');
  var fields = fid.split(':');
  return fields[fields.length - 1];
}

function getSpotifyPlayer(inPlaylist, callback) {
  var curSong = 0;
  var audio = null;
  var player = createPlayer();
  var playlist = [];


  function getSong(){   
    $.ajax({
      type: 'POST',
      url: '/song',
      data: JSON.stringify(songs),
      dataType: 'json',
      contentType: 'application/json',
      success: function(data){
        songs.push([data.title,data.artist_name,data.score]);
        console.log(data.tracks.foreign_id);
        // $(player).addSpotifyInfoToPlaylist([data.track.foreign_id]);
        addSpotifyInfoToPlaylist([data.tracks.foreign_id]);
      }
    });
  };

  function addSpotifyInfoToPlaylist(additions) {
    var tids = [];
    additions.forEach(function(song) {
        var tid = fidToSpid(song);
        console.log(tid);
        tids.push(tid);
    });

    $.getJSON("https://api.spotify.com/v1/tracks/", { 'ids': tids.join(',')}) 
        .done(function(data) {

            playlist = playlist.concat(filterSongs(data.tracks));//filterSongs(additions);
            showCurSong(true);
            callback(player);
        })
        .error( function() {
            info("Whoops, had some trouble getting that playlist");
        }) ;
  }

  function filterSongs(songs) {
    var out = [];

    function isGoodSong(song) {
        return song.preview_url != null;
    }

    songs.forEach(function(song) {
        if (isGoodSong(song)) {
            out.push(song);
        } else {
          getSong();
        }
    });

    return out;
  }

  function showSong(song, autoplay) {
    //console.log('song is  in showSong', song);
    $(player).find(".sp-album-art").attr('src', song.album.images[0].url);
    $(player).find(".sp-title").text(song.title);
    $(player).find(".sp-artist").text(song.artist_name);
    console.log("song preview is ", song.preview_url);
    audio.attr('src', song.preview_url);
    if (autoplay) { 
        audio.get(0).play();
    }
  }

  function getBestImage(images, maxWidth) {
    var best = images[0];
    images.reverse().forEach(
        function(image) {
            if (image.width <= maxWidth) {
                best = image;
            }
        }
    );
    return best;
  }

  function showCurSong(autoplay) {
    console.log('in showCurSong and playlist is', playlist);
    showSong(playlist[curSong], autoplay);
  }

  function nextSong() {
    getSong();
    //console.log('in nextSong and song is ', newSong);
    //addSpotifyInfoToPlaylist([newSong]);
    if (curSong < playlist.length - 1) {
        curSong++;
        showCurSong(true);
    } else {
    }
  }

  function prevSong() {
    if (curSong > 0) {
        curSong--;
        showCurSong(true);
    }
  }

  function togglePausePlay() {
    console.log('tpp', audio.get(0).paused);
    if (audio.get(0).paused) {
        audio.get(0).play();
    } else {
        audio.get(0).pause();
    }
  }

  function createPlayer() {
    var main = $("<div class='sp-player'>");
    var img = $("<img class='sp-album-art'>");
    var info  = $("<div class='sp-info'>");
    var title = $("<div class='sp-title'>");
    var artist = $("<div class='sp-artist'>");
    var controls = $("<div class='btn-group sp-controls'>");

    var next = $('<button class="btn btn-primary btn-sm" type="button"><span class="glyphicon glyphicon-forward"></span></button>');
    var prev = $('<button class="btn btn-primary btn-sm" type="button"><span class="glyphicon glyphicon-backward"></span></button>');
    var pausePlay = $('<button class="btn btn-primary btn-sm" type="button"><span class="glyphicon glyphicon-play"></span></button>');


    audio = $("<audio>");
    audio.on('pause', function() {
        var pp = pausePlay.find("span");
        pp.removeClass('glyphicon-pause');
        pp.addClass('glyphicon-play');
    });

    audio.on('play', function() {
        var pp = pausePlay.find("span");
        pp.addClass('glyphicon-pause');
        pp.removeClass('glyphicon-play');
    });

    audio.on('ended', function() {
        console.log('ended');
        nextSong();
    });

    next.on('click', function() {
        nextSong();
    });

    pausePlay.on('click', function() {
        togglePausePlay();
    });

    prev.on('click', function() {
        prevSong();
    });


    info.append(title);
    info.append(artist);

    controls.append(prev);
    controls.append(pausePlay);
    controls.append(next);

    main.append(img);
    main.append(info);
    main.append(controls);

    main.bind('destroyed', function() {
        console.log('player destroyed');
        audio.pause();
    });
    return main;
  }

  addSpotifyInfoToPlaylist(inPlaylist);
  return player;
}

(function($){
  $.event.special.destroyed = {
    remove: function(o) {
      if (o.handler) {
        o.handler()
      }
    }
  }
})(jQuery);
