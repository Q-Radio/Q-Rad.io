/**
 * @jsx React.DOM
 */
$(document).ready(function() {

  var React = require('react');
  var Router = require('react-router');
  var mui = require('material-ui');
  var Signup = require('./components/signup.jsx');
  var Header = require('./components/header.jsx');
  var Player = require('./components/player.jsx');
  var Contribute = require('./components/contribute.jsx');
  var Route = Router.Route;
  var RouteHandler = Router.RouteHandler;
  var TextField = mui.TextField;
  var RaisedButton = mui.RaisedButton;

  var Link = Router.Link;
  var App = React.createClass({

    render: function () {
      return (
        <div className="centered">
          <Header />
          <Player />
          <RouteHandler />
        </div>
      )
    }
  });

  var routes = (
    <Route name="root" path="/" handler={App}>
      <Route name="signup" handler={Signup}/>
      <Route name="contribute" handler={Contribute}/>
    </Route>
  );

  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
  });
});
