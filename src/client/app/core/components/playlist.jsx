/**
 * @jsx React.DOM
 */

var React = require('react');
var mui = require('material-ui');
var Item = require('./playlist-item.jsx');
// var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Actions = require('./../actions/AppActions.jsx');


var obj = {title:'shmoosh', artist:'gaia'};


var Playlist = React.createClass({

  handleAdd: function() {
    // var newList = this.state.list.concat([obj]);
    Actions.updatePlaylist();
    // this.setState({list: newList})
  },

  handleRemove: function(i) {
    // var newList = this.state.list;
    // newList.splice(i, 1);
    // this.setState({list: newList});
  },

  render: function() {
    console.log('in this render function',this.props.playlist);
    var items = this.props.playlist.map(function(item, i) {
      return (
        <div key={item.title} onClick={this.handleRemove.bind(this, i)}>
          <Item title={item.title} artist={item.artist_name} />
        </div>
      );
    }.bind(this));
    return (
      <div className={this.props.className}>
          {items}
      </div>
    )
  }
})
        // <button onClick={this.handleAdd}> Add! </button>
        // <ReactCSSTransitionGroup transitionName="example">
        // </ReactCSSTransitionGroup>

// var TodoList = React.createClass({
//   getInitialState: function() {
//     return {items: ['hello', 'world', 'click', 'me']};
//   },
//   handleAdd: function() {
//     var newItems =
//     this.state.items.concat([prompt('Enter some text')]);
//     this.setState({items: newItems});
//   },
//   handleRemove: function(i) {
//     var newItems = this.state.items;
//     newItems.splice(i, 1);
//     this.setState({items: newItems});
//   },
//   render: function() {
//     var items = this.state.items.map(function(item, i) {
//       return (
//         <div key={item} onClick={this.handleRemove.bind(this, i)}>
//           {item}
//         </div>
//       );
//     }.bind(this));
//     return (
//       <div>
//         <button onClick={this.handleAdd}>Add Item</button>
//         <ReactCSSTransitionGroup transitionName="example">
//           {items}
//         </ReactCSSTransitionGroup>
//       </div>
//     );
//   }
// });

module.exports = Playlist;
