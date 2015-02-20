var Player = function(){
  this.playlist = [];
  this.currentSong = 0;

  //builds the hmtl for the player, append main to the dom
  this.main = $("<div class='main'></div>");
  this.list = $('<div class="list">Playlist</div>')
  this.divPlayer = $("<div class='sp-player'></div>");
  this.img = $("<img class='sp-album-art'>");
  this.info  = $("<div class='sp-info'>");
  this.title = $("<div class='sp-title'>");
  this.artist = $("<div class='sp-artist'>");
  this.controls = $("<div class='btn-group sp-controls'>");
  this.next = $('<button class="btn btn-primary btn-sm" type="button"><span class="glyphicon glyphicon-forward"></span></button>');
  this.prev = $('<button class="btn btn-primary btn-sm" type="button"><span class="glyphicon glyphicon-backward"></span></button>');
  this.pausePlay = $('<button class="btn btn-primary btn-sm" type="button"><span class="glyphicon glyphicon-play"></span></button>');
  this.audio = $("<audio>");

  this.info.append(this.title);
  this.info.append(this.artist);

  this.controls.append(this.prev);
  this.controls.append(this.pausePlay);
  this.controls.append(this.next);

  this.divPlayer.append(this.img);
  this.divPlayer.append(this.info);
  this.divPlayer.append(this.controls);

  this.main.append(this.divPlayer);
  this.main.append(this.list);

}

Player.prototype.nextSong = function() {
  console.log('in this.nextSong');
  if (this.currentSong < this.playlist.length - 1) {
      this.currentSong++;
      this.showSong(true);
      // this.displayList();
  } 
}

Player.prototype.prevSong = function() {
  if (this.currentSong > 0) {
      this.currentSong--;
      this.showSong(true);
  }
}

Player.prototype.togglePausePlay = function() {
  console.log('tpp');//, audio.get(0).paused);
  if (this.audio.get(0).paused) {
      this.audio.get(0).play();
  } else {
      this.audio.get(0).pause();
  }
}

Player.prototype.addListeners = function(){
  //need to use that to bind this as the player within the listeners.  
  //inside of the listener, this is bound to the button that was clicked.
  var that = this;

  this.audio.on('pause', function() {
      var pp = that.pausePlay.find("span");
      pp.removeClass('glyphicon-pause');
      pp.addClass('glyphicon-play');
  });

  this.audio.on('play', function() {
      var pp = that.pausePlay.find("span");
      pp.addClass('glyphicon-pause');
      pp.removeClass('glyphicon-play');
  });

  this.audio.on('ended', function() {
      console.log('ended');
      that.nextSong();
  });

  this.next.on('click', function() {
      that.nextSong();
  });

  this.pausePlay.on('click', function() {
      that.togglePausePlay();
  });

  this.prev.on('click', function() {
      that.prevSong();
  });

  this.main.bind('destroyed', function() {
      console.log('player destroyed');
      that.audio.pause();
  });
}

Player.prototype.displayList = function(){
  this.list.find('ul').remove();
  var ul = $('<ul></ul>')
  for (var i = 0; i < this.playlist.length -1; i++){
    ul.append($('<li>' + this.playlist[i].name + ' ' + this.playlist[i].artists[0].name + '</li>'));
  }
  this.list.append(ul);
}

Player.prototype.addSong = function(song){
  this.playlist = this.playlist.concat(song);
    //this.displayList();

  if (this.playlist.length === 1){
    this.displayList();
    this.showSong(false);
  } else {
    //this.nextSong();
    this.displayList();
  }
}

Player.prototype.showSong = function(autoplay) {
  var song = this.playlist[this.currentSong];
  this.img.attr('src', song.album.images[0].url);
  this.title.text(song.name);
  this.artist.text(song.artists[0].name);
  console.log("song preview is ", song.preview_url);
  this.audio.attr('src', song.preview_url);
  if (autoplay) { 
      this.audio.get(0).play();
  }
}

Player.prototype.songsLeft = function(){
  return this.playlist.length - 1 - this.currentSong;
}


