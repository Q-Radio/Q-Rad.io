/**
 * @jsx React.DOM
 */

var React = require('react');
var mui = require('material-ui');
var Item = require('./playlist-item');


var Upcoming = React.createClass({

  render: function() {
    return (
      <div>
        {this.props.playlist.map(function(item){
          return <Item> {item.title} by {item.artist} </Item>  
        })}
      </div>
    )
  }
})

module.exports = Upcoming;