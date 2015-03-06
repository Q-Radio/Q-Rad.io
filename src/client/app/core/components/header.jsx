/**
 * @jsx React.DOM
 */

var React = require('react');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var AppActions = require('./../actions/AppActions.jsx');


var Header = React.createClass({

  getRandomSong: function(){
    AppActions.generateFuturePlaylist();
    console.log('getting future playlist');
    
  },

  search: function(){
    console.log(this.refs.textInput.getDOMNode().value.trim());
    var artist = this.refs.textInput.getDOMNode().value.trim();
    AppActions.search(artist);
  },

  testing: function(){
    AppActions.testing();
  },

  render: function() {
    return (
      <div className="header-container">
        <form className="header-form">
        <h1>Q-Rad.io</h1>
          <div> What should Quentin look up? </div>
          <button className="header-btn" primary={true} onClick={this.search}> Search </button>
          <input ref="textInput" className="search-box" type="text" size="34" placeholder="find your next Rad-Slice!"></input>
          <button className="header-btn" onClick={this.getRandomSong}> Random </button>
        
          <button className="header-btn" onClick={this.testing}> testing </button>      
        </form>
      </div>
    )
  }
})

module.exports = Header;