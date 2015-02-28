/**
 * @jsx React.DOM
 */

var React = require('react');
var mui = require('material-ui');
var FloatingActionButton = mui.FloatingActionButton;
var AppActions = require('./../actions/AppActions.jsx');
var PlayButton = require('./playButton.jsx');

var PlayerControls = React.createClass({

  next: function(){
  	AppActions.next();
  }, 

  prev: function(){
  	AppActions.prev();
  },


  render: function() {
    return (
      <span className="centered btn-group sp-controls'">
        <span className="fa fa-step-backward fa-2x controls" onClick={this.prev}> </span>
        <PlayButton songAudio={this.props.songAudio} />
        <span className="fa fa-step-forward fa-2x controls" onClick={this.next}> </span>
      </span>
    )
  }
})

module.exports = PlayerControls;