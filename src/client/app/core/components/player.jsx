/**
 * @jsx React.DOM
 */

var React = require('react');
var mui = require('material-ui');
var PlayerControls = require('./player-controls.jsx');


var Player = React.createClass({
  handleClick: function (e) {
    //get input from refs
  },

  nextSong: function() {
    console.log('in this.nextSong');
    if (this.currentSong < this.playlist.length - 1) {
        this.currentSong++;
        this.showSong(true);
        // this.displayList();
    } 
  },


  prevSong: function() {
    if (this.currentSong > 0) {
        this.currentSong--;
        this.showSong(true);
    }
  },

  togglePausePlay: function() {
    console.log('tpp');//, audio.get(0).paused);
    if (this.audio.get(0).paused) {
        this.audio.get(0).play();
    } else {
        this.audio.get(0).pause();
    }
  },

  addListeners: function(){
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
  },

  displayList: function(){
    this.list.find('ul').remove();
    var ul = $('<ul></ul>')
    for (var i = 0; i < this.playlist.length -1; i++){
      ul.append($('<li>' + this.playlist[i].name + ' ' + this.playlist[i].artists[0].name + '</li>'));
    }
    this.list.append(ul);
  },

  addSong: function(song){
    this.playlist = this.playlist.concat(song);
      //this.displayList();

    if (this.playlist.length === 1){
      this.displayList();
      this.showSong(false);
    } else {
      //this.nextSong();
      this.displayList();
    }
  },

  showSong: function(autoplay) {
    var song = this.playlist[this.currentSong];
    this.img.attr('src', song.album.images[0].url);
    this.title.text(song.name);
    this.artist.text(song.artists[0].name);
    console.log("song preview is ", song.preview_url);
    this.audio.attr('src', song.preview_url);
    if (autoplay) { 
        this.audio.get(0).play();
    }
  },

  songsLeft: function(){
    return this.playlist.length - 1 - this.currentSong;
  },

  playlist: [0],

  currentSong: 0,

  render: function() {
    return (
      <div>
        <img onClick={this.handleClick} className="sp-album-art"></img>
        <div className='sp-info'>
          <div className='sp-title'></div>
          <div className='sp-artist'></div>
        </div>
        <PlayerControls />
        <audio src={this.playlist[this.currentSong]}>{this.props.src}</audio>
      </div>
    )
  }
})

module.exports = Player;