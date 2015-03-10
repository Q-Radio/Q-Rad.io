/**
 * @jsx React.DOM
 */

var React = require('react');
var AppActions = require('../actions/AppActions.jsx');

var Stars = React.createClass({

  currentSong: false,

  clearStars: function(){
    return false;
  },

  sendScore: function(score){
    AppActions.star(score);
  },

  componentDidMount: function(){
    var context = this;
    var el = this.getDOMNode();
    $(el).rating();
    $(el).on('rating.change', function(event, value) {
      var expectedValue = value - 1;
      context.sendScore(expectedValue);
    });
    this.clearStars = function(){
        $(el).rating('clear');
        console.log('this has been cleared');
    }
  },

  render: function() {
    if(this.props.currentSong !==this.currentSong){
      console.log('clearing');
      this.clearStars();
      this.currentSong=this.props.currentSong;
    }
      return (
          <input id="stars" className="rating" data-show-caption="false" data-show-clear="false" data-step="1" data-size="sm" />
      )
      
    }
  });

module.exports = Stars;
