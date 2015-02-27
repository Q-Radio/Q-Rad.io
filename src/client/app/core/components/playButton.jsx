/**
 * @jsx React.DOM
 */

var React = require('react');
var mui = require('material-ui');
var FloatingActionButton = mui.FloatingActionButton;
var AppActions = require('./../actions/AppActions.jsx');

var PlayButton  = React.createClass({
  player: false,

  togglePlay: function(){
    if(this.player.paused){
      this.player.play();
    } else {
      this.player.pause();
    }
  },



  componentDidMount: function() {
    this.player = this.refs.audio.getDOMNode();
    this.player.addEventListener('ended', function(){
      console.log('ended');
      AppActions.next();
    });
  },



  render: function() {
    return (
      <span>
        <audio ref="audio" className="audio" src={this.props.songAudio} autoPlay='true' />
        <FloatingActionButton iconClassName="muidocs-icon-action-grade" secondary={true} mini={true} onClick={this.togglePlay} />
      </span>
    )
  }
})

module.exports = PlayButton;