/**
 * @jsx React.DOM
 */

var React = require('react');
var mui = require('material-ui');
var Snackbar = mui.Snackbar;
var CurrentSong = require('./currentSong.jsx');
var PlayerControls = require('./player-controls.jsx');
var Playlist = require('./playlist.jsx');
var Stars = require('./stars.jsx');
var Quentin = require('./quentin.jsx');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


var Player = React.createClass({
  handleClick: function (e) {
    //get input from refs
  },

  render: function() {
    return (
      <span>
        <div className="flex">
          <Playlist className="playlist" header="Played Songs" playlist={this.props.playlist}/>
          <div className="current-song centered">
            <CurrentSong className="current-song" albumArt={this.props.albumArt} 
                                                  currentSong={this.props.currentSong} 
                                                  currentArtist={this.props.currentArtist} 
                                                  fullSong={this.props.fullSong} 
                                                  spotifyID={this.props.spotifyID}/>
            <PlayerControls songAudio={this.props.songAudio} />
            <Quentin url="../assets/quentinMedium.png" dance="false"/>
            <Stars currentSong={this.props.currentSong} />
          </div>
          <Playlist transitionName="example" className="futureList" header="Upcoming Songs" playlist={this.props.upcomingSongs}/>
        </div>
      </span>
    )
  }
})

module.exports = Player;