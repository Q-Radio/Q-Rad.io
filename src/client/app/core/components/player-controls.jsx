/**
 * @jsx React.DOM
 */

var React = require('react');
var mui = require('material-ui');
var FloatingActionButton = mui.FloatingActionButton;
var AppActions = require('./../actions/AppActions.jsx');

var PlayerControls = React.createClass({

  play: function(){
  	AppActions.play();
  }, 

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
        <FloatingActionButton iconClassName="muidocs-icon-action-grade" secondary={true} mini={true} onClick={this.play} />
        <FloatingActionButton iconClassName="muidocs-icon-action-grade" mini={true} onClick={this.next}/>
      </div>
    )
  }
})

module.exports = PlayerControls;