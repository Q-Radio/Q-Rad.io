var React = require('react');

var Header = require('./header.jsx');
var Player = require('./player.jsx'); 
var AppStore = require('./../stores/AppStore.jsx');
var AppActions = require('./../actions/AppActions.jsx');




function getAppState() {
  return AppStore.getState();
}


var App = React.createClass({

  getInitialState: function() {
    AppActions.generateFuturePlaylist();
    return getAppState();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },


  render: function () {
    return (
      <div className="centered">
        <Header />
        <Player {...this.state} />
      </div>
    )
  },

  _onChange: function() {
    this.setState(getAppState());
  }

});

module.exports = App;
