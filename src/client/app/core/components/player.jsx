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
        <div className="flex">
          <Playlist className="playlist" playlist={this.props.playlist}/>
          <div className="current-song centered">
            <CurrentSong className="current-song" albumArt={this.props.albumArt} currentSong={this.props.currentSong} currentArtist={this.props.currentArtist} fullSong={this.props.fullSong} />
            <PlayerControls songAudio={this.props.songAudio} />
            <Stars />
          </div>
          <Playlist className="futureList" playlist={this.props.upcomingSongs}/>
        </div>

      </span>
    )
  }
})

module.exports = Player;