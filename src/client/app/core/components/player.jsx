/**
 * @jsx React.DOM
 */

var React = require('react');
var mui = require('material-ui');
var CurrentSong = require('./currentSong.jsx');
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
        <CurrentSong albumArt={this.props.albumArt} 
                     currentSong={this.props.currentSong} 
                    currentArtist={this.props.currentArtist}
                    fullSong={this.props.fullSong} />
        <PlayerControls songAudio={this.props.songAudio} />
        <Playlist className="playlist" playlist={this.props.playlist}/>
        <Playlist className="futureList" playlist={this.props.upcomingSongs}/>
      </div>
    )
  }
})

module.exports = Player;