/**
 * @jsx React.DOM
 */

var React = require('react');
var mui = require('material-ui');
var FloatingActionButton = mui.FloatingActionButton;
var StarRating = require('./star-rating.jsx')
var AppActions = require('./../actions/AppActions.jsx');

var PlaylistItem = React.createClass({



  temp: function(song){
    AppActions.selectAny(song);
  },

  not_highlighted: true,
  highlighted: false,

  toggleClick: function(){
    console.log(this.not_highlighted);
    this.not_highlighted = false;
    console.log(this.not_highlighted);
    this.highlighted = true;
  },

  render: function() {

    var cx = React.addons.classSet;
    
    var down = cx({
      'playlist-item-button': true,
      'fa fa-thumbs-down': this.not_highlighted,
      'fa fa-thumbs-o-down': this.highlighted,
      'fa-2x': true
    });
    var up = cx({
      'playlist-item-button': true,
      'fa fa-thumbs-up': this.not_highlighted,
      'fa fa-thumbs-o-up': this.highlighted,
      'fa-2x': true
    });

    if(this.props.rating){
      return (
        <div className="playlist-item">
          <span onClick={this.temp.bind(this,this.props.title)}> {this.props.title} by {this.props.artist} </span>
          <div className="rated-star">
            <StarRating rating={this.props.rating} />
          </div>
        </div>
        )
    } else {

      return (
        <div className="playlist-item">
          <span onClick={this.temp.bind(this,this.props.title)}> {this.props.title} by {this.props.artist} </span>
        </div>
      )
    }
  }
})

module.exports = PlaylistItem;