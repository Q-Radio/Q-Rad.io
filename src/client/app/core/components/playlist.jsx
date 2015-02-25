/**
 * @jsx React.DOM
 */

var React = require('react');
var mui = require('material-ui');
var Item = require('./playlist-item.jsx');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


var obj = {title:'shmoosh', artist:'gaia'};


var Playlist = React.createClass({
  getInitialState: function() {
    return {list: [obj, obj, obj, obj, obj]};
  },

  handleAdd: function() {
    var newList = this.state.list.concat([obj]);
    this.setState({list: newList})
  },

  handleRemove: function(i) {
    var newList = this.state.list;
    newList.splice(i, 1);
    this.setState({list: newList});
  },

  render: function() {
    var items = this.state.list.map(function(item, i) {
      return (
        <div key={item} onClick={this.handleRemove.bind(this, i)}>
          {item}
        </div>
      );
    }.bind(this));
    return (
      <div className="playlist">
        <button onClick={this.handleAdd}> Add! </button>
        <ReactCSSTransitionGroup transitionName="example">
          {items}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
})

var TodoList = React.createClass({
  getInitialState: function() {
    return {items: ['hello', 'world', 'click', 'me']};
  },
  handleAdd: function() {
    var newItems =
    this.state.items.concat([prompt('Enter some text')]);
    this.setState({items: newItems});
  },
  handleRemove: function(i) {
    var newItems = this.state.items;
    newItems.splice(i, 1);
    this.setState({items: newItems});
  },
  render: function() {
    var items = this.state.items.map(function(item, i) {
      return (
        <div key={item} onClick={this.handleRemove.bind(this, i)}>
          {item}
        </div>
      );
    }.bind(this));
    return (
      <div>
        <button onClick={this.handleAdd}>Add Item</button>
        <ReactCSSTransitionGroup transitionName="example">
          {items}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

module.exports = Playlist;
