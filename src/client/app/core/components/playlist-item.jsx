/**
 * @jsx React.DOM
 */

var React = require('react');
var mui = require('material-ui');
var FloatingActionButton = mui.FloatingActionButton;
var AppActions = require('./../actions/AppActions.jsx');


var PlaylistItem = React.createClass({
  temp: function(song){
    AppActions.selectAny(song);
  },

  render: function() {
    return (
      <div className="playlist-item">
        <span> {this.props.title} by {this.props.artist} </span>
        <FloatingActionButton iconClassName="muidocs-icon-action-grade" mini={true} onClick={this.temp.bind(this,this.props.title)}/>
      </div>
    )
  }
})

module.exports = PlaylistItem;