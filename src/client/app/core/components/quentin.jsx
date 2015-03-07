/**
 * @jsx React.DOM
 */

var React = require('react');

var Quentin = React.createClass({

  componentDidMount: function(){
    this.dancing = setInterval(this.dance, 500);
  },

  dance: function(){
    var context = this;
    var el = context.getDOMNode();
    $(el).toggleClass('turn-left');
    $(el).toggleClass('turn-right');
  },

  componentWillUnmount: function(){
    clearInterval(this.dancing);
  },

  render: function() {

    return (
      <div className="quentin turn-right">
        <img src={this.props.url}></img> 
      </div>
    )
  }
});

module.exports = Quentin;