/**
 * @jsx React.DOM
 */

var React = require('react');
var mui = require('material-ui');
var FloatingActionButton = mui.FloatingActionButton;
var AppActions = require('./../actions/AppActions.jsx');

var PlayButton  = React.createClass({
  player: false,
  starting: true,

  togglePlay: function(){
    if(this.player.paused){
      this.player.play();
    } else {
      this.player.pause();
    }
  },

  componentDidMount: function() {
    this.player = this.refs.audio.getDOMNode();
    this.starting = true;
    var el = this.getDOMNode();
    this.player.addEventListener('ended', function(){
      AppActions.next();
    });
    this.player.addEventListener('playing', (function(){
      $(el).find('span').removeClass('fa-play');
      $(el).find('span').addClass('fa-pause');
      if(this.starting){
        this.player.pause();
        this.starting = false;
      }
    }).bind(this));

    this.player.addEventListener('pause', function(){
      $(el).find('span').addClass('fa-play');
      $(el).find('span').removeClass('fa-pause');
    });

  },
  
  render: function() {
    return (
      <span>
        <audio ref="audio" className="audio" src={this.props.songAudio} autoPlay='true' />
        <span className="fa fa-play fa-2x controls controls-play" onClick={this.togglePlay}> </span>
      </span>
    )
  }
})

module.exports = PlayButton;