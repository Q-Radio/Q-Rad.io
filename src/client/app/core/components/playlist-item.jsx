/**
 * @jsx React.DOM
 */

var React = require('react');
var mui = require('material-ui');
var FloatingActionButton = mui.FloatingActionButton;

var PlaylistItem = React.createClass({
  temp: function(){
    // console.log('you clicked a button');
  },

  render: function() {
    return (
      <div className="playlist-item">
        <span> {this.props.title} by {this.props.artist} </span>
        <FloatingActionButton iconClassName="muidocs-icon-action-grade" mini={true} onClick={this.temp()}/>
        <FloatingActionButton iconClassName="muidocs-icon-action-grade" secondary={true} mini={true} onClick={this.temp()} />
      </div>
    )
  }
})

module.exports = PlaylistItem;