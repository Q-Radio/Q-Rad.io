/** @jsx React.DOM */

var React = require('react');
 var mui = require('material-ui');
 var TextField = mui.TextField;


var ContribForm = React.createClass({
  render: function(){
    return (
    <div>
      <TextField hintText="Hint Text" />
    </div>
    );
  }
});


module.exports = ContribForm;