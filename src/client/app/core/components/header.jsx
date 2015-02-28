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
  },

  render: function() {
    return (
      <div className="header-container">
        <h1>Q-Rad.io</h1>
        <form className="header-form">
          <span> Choose the song: 
            <input type="text" size="34" placeholder='select your song brotha!'></input>
          </span>
          <RaisedButton className="header-btn" value="go" id="go" name="go" label="Go" primary={true} />
          <RaisedButton className="header-btn" label="Random" primary={true} onClick={this.getRandomSong} />
        </form>
      </div>
    )
  }
})

module.exports = Header;