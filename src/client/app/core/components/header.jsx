/**
 * @jsx React.DOM
 */

var React = require('react');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;

var Header = React.createClass({

  render: function() {
    return (
      <div className="header-container">
        <h1>Temporary Zebra - SuperMusic</h1>
        <form className="header-form">
          <span> Choose the song: 
            <input type="text" size="34" placeholder='select your song brotha!'></input>
          </span>
          <button className="header-btn"></button>
          <RaisedButton className="header-btn" value="go" id="go" name="go" label="Go" primary={true} />
          <RaisedButton className="header-btn" label="Random" primary={true} />
        </form>
      </div>
    )
  }
})

module.exports = Header;