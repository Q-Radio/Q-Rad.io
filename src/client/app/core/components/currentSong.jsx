/**
 * @jsx React.DOM
 */

var React = require('react');
var AppActions = require('./../actions/AppActions.jsx');

var CurrentSong = React.createClass({

  sendStars: function(stars){
    AppActions.star(stars);
  },

  render: function() {
    return (
      <div>
        <img src={this.props.albumArt} className="sp-album-art"></img>
        <div className='sp-info'>
          <div className='sp-title'>{this.props.currentSong}</div>
          <div className='sp-artist'>{this.props.currentArtist}</div>
          <a href={this.props.fullSong} target='_blank'> Full Song </a>
        </div>
        <button onClick={this.sendStars.bind(this,0)}>1 star</button>
        <button onClick={this.sendStars.bind(this,1)}>2 stars</button>
        <button onClick={this.sendStars.bind(this,2)}>3 stars</button>
        <button onClick={this.sendStars.bind(this,3)}>4 stars</button>
        <button onClick={this.sendStars.bind(this,4)}>5 stars</button>

      </div>
    )
  }
})

module.exports = CurrentSong;