/**
 * @jsx React.DOM
 */

var React = require('react');

var Quentin = require('./quentin.jsx');

var Loading = React.createClass({

  render: function() {

    var cx = React.addons.classSet;
    
    var classes = cx({
      'fa': true,
      'fa-spinner': true,
      'fa-pulse': true,
      'fa-5x': true
    });

    return (
      <div className="loading">
        <h1>Just a sec as Quentin finds you awesome music!</h1>
        <br />
        <span className={classes}></span>
        <h5> "True stength comes from Shmoosh" </h5>
        <h6> Gaia </h6>
      </div>
    )
  }
});

module.exports = Loading;