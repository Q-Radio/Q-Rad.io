/**
 * @jsx React.DOM
 */

var React = require('react');
var AppActions = require('../actions/AppActions.jsx');

var Stars = React.createClass({

  changed: false,

  clearStars: function(){
    if(this.changed){
      $(el).rating('clear');
    }
  },

  sendScore: function(score){
    AppActions.star(score);
  },

  componentDidMount: function(){
    var context = this;
    var el = this.getDOMNode();
    $(el).rating();
    $(el).on('rating.change', function(event, value) {
      console.log(value);
      var expectedValue = value - 1;
      context.sendScore(expectedValue);
    });
  },

  render: function() {
    return (
        <input id="stars" className="rating" data-show-caption="false" data-show-clear="false" data-step="1" data-size="sm" />
    )
  }
})

module.exports = Stars;
