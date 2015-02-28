/**
 * @jsx React.DOM
 */

var React = require('react');
var mui = require('material-ui');
var CurrentSong = require('./currentSong.jsx');
var PlayerControls = require('./player-controls.jsx');
var Playlist = require('./playlist.jsx');
var Stars = require('./stars.jsx');

//var actions = require('./../actions/AppActions.jsx');

var Player = React.createClass({
  handleClick: function (e) {
    //get input from refs
  },

  render: function() {
    return (
      <span>
        <CurrentSong albumArt={this.props.albumArt} currentSong={this.props.currentSong} currentArtist={this.props.currentArtist} fullSong={this.props.fullSong} />
        <PlayerControls songAudio={this.props.songAudio} />
        <Stars />
        <Playlist className="playlist" playlist={this.props.playlist}/>
        <Playlist className="futureList" playlist={this.props.upcomingSongs}/>
      </span>
    )
  }
})

module.exports = Player;