/**
 * @jsx React.DOM
 */

var React = require('react');

var Quentin = React.createClass({

  componentDidMount: function(){
    var context = this;
    var el = context.getDOMNode();
    if(this.props.dance === "true"){
      this.dancing = setInterval(this.dance, 500);
    } else{
      clearInterval(this.dancing);
      $(el).removeClass('turn-right');
    }
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