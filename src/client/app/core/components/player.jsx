/**
 * @jsx React.DOM
 */

var React = require('react');
var mui = require('material-ui');
var PlayerControls = require('./player-controls.jsx');
var Playlist = require('./playlist.jsx')

//var actions = require('./../actions/AppActions.jsx');

var Player = React.createClass({
  handleClick: function (e) {
    //get input from refs
  },

  render: function() {
    return (
      <div>
        <img src={this.props.albumArt} className="sp-album-art"></img>
        <div className='sp-info'>
          <div className='sp-title'>{this.props.currentSong}</div>
          <div className='sp-artist'>{this.props.currentArtist}</div>
        </div>
        <PlayerControls />
        <audio ref="audio" src={this.props.songAudio}></audio>
        <Playlist />
      </div>
    )
  }
})

module.exports = Player;