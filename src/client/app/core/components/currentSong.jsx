/**
 * @jsx React.DOM
 */

var React = require('react');
var AppActions = require('./../actions/AppActions.jsx');
var mui = require('material-ui');
var Snackbar = mui.Snackbar;

var CurrentSong = React.createClass({

  sendStars: function(stars){
    AppActions.star(stars);
  },

  pause: function(){
    $('audio').get(0).pause();
  },

  addToSpotify: function(spotifyID){
    console.log('spotifyID',spotifyID);
    this.refs.Snackbar.show();
    AppActions.addTrackToSpotify(spotifyID);
    setTimeout(function(){
      this.refs.Snackbar.dismiss()
    }.bind(this), 3000);
  },

  hideSnackbar: function(){
    console.log('heyyyyyy')
    console.log(this);
    
  },

  render: function() {
    return (
      <div className="song-info">
        <img src={this.props.albumArt} className="sp-album-art"></img>
        <div className='sp-info'>
          <a href={this.props.fullSong} target='_blank' onClick={this.pause}> 
            <div className='sp-title'>{this.props.currentSong}</div>
          </a>
          <div className='sp-artist'>{this.props.currentArtist}</div>
          <div className='sp-artist' type='button' onClick={this.addToSpotify.bind(this,this.props.spotifyID)}>
            Add to your Rad Playlist!
          </div>
        </div>
        <Snackbar
          ref="Snackbar"
          message="Song added to your Spotify playlist!"
          action="Woohoo!"/>
      </div>
    )
  }
})

module.exports = CurrentSong;