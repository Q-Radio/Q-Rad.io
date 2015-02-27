/**
 * @jsx React.DOM
 */

var React = require('react');

var CurrentSong = React.createClass({

  render: function() {
    return (
      <div>
        <img src={this.props.albumArt} className="sp-album-art"></img>
        <div className='sp-info'>
          <div className='sp-title'>{this.props.currentSong}</div>
          <div className='sp-artist'>{this.props.currentArtist}</div>
        </div>
      </div>
    )
  }
})

module.exports = CurrentSong;