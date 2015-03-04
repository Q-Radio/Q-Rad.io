/**
 * @jsx React.DOM
 */

var React = require('react');

var StarRating = React.createClass({



  render: function() {

    return (
      <div className="fa-stack fa-2x">
        <i className="fa fa-star-o fa-stack-2x"></i>
        <strong className="fa-stack-1x fa-stack-text rating-number">{this.props.rating}</strong>
      </div>
    )
  }
});

module.exports = StarRating;