var React = require('react');

var Header = require('./header.jsx');
var Player = require('./player.jsx'); 
var AppStore = require('./../stores/AppStore.jsx');
var AppActions = require('./../actions/AppActions.jsx');
var Loading = require('./loading.jsx')


function getAppState() {
  return AppStore.getState();
}


var App = React.createClass({

  getInitialState: function() {
    AppActions.generateFuturePlaylist();
    AppActions.getPriorHistory();
    return getAppState();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },


  render: function () {
    if(this.state.upcomingSongs.length > 0){
      return (
        <div className="centered">
          <Header />
          <Player {...this.state} />
        </div>
      )
    } else {
      return (
        <div className="centered">
          <Loading />
        </div>
      )
    }
  },

  _onChange: function() {
    this.setState(getAppState());
  }

});

module.exports = App;


