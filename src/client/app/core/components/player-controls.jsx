/**
 * @jsx React.DOM
 */

var React = require('react');
var mui = require('material-ui');
var FloatingActionButton = mui.FloatingActionButton;

var PlayerControls = React.createClass({

  render: function() {
    return (
      <div className="centered btn-group sp-controls'">
        <FloatingActionButton iconClassName="muidocs-icon-action-grade" mini={true} />
        <FloatingActionButton iconClassName="muidocs-icon-action-grade" secondary={true} mini={true} />
        <FloatingActionButton iconClassName="muidocs-icon-action-grade" mini={true} />
      </div>
    )
  }
})

module.exports = PlayerControls;