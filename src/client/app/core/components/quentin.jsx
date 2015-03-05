/**
 * @jsx React.DOM
 */

var React = require('react');

var Quentin = React.createClass({

  render: function() {

    var url = "../assets/quentin.png"

    return (
      <div className="quentin">
        <img src={this.url}></img> 
      </div>
    )
  }
});

module.exports = Quentin;