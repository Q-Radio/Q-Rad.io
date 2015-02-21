/**
 * @jsx React.DOM
 */
var React = require('react');
var mui = require('material-ui');
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var Router = require('react-router');
var Link = Router.Link;

var Signup = React.createClass({
  handleClick: function (e) {
    //get input from refs
  },


  render: function() {
    return (
        <div className="signup-form">
          <div className="mui-font-style-display-3">
          Contribute
          </div>
          <form>
            <TextField floatingLabelText="Mood" />
            <TextField floatingLabelText="Feel" />
            <TextField floatingLabelText="Other Stuff" />
            <RaisedButton onClick={this.handleClick}  label="Submit" secondary={true} />
          </form>
        </div>
    )
  }
})

module.exports = Signup;
