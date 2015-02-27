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
      <div className="centered btn-group sp-controls'">
        <FloatingActionButton iconClassName="muidocs-icon-action-grade" mini={true} onClick={this.prev}/>
        <PlayButton songAudio={this.props.songAudio}/>
        <FloatingActionButton iconClassName="muidocs-icon-action-grade" mini={true} onClick={this.next}/>
      </div>
    )
  }
})

module.exports = PlayerControls;