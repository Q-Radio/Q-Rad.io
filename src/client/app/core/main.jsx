/**
 * @jsx React.DOM
 */
$(document).ready(function() {

  var React = require('react');
  var Router = require('react-router');
  var mui = require('material-ui');
  var Signup = require('./components/signup.jsx');
  var Route = Router.Route;
  var RouteHandler = Router.RouteHandler;
  var TextField = mui.TextField;
   var RaisedButton = mui.RaisedButton;

  var Link = Router.Link;
  var App = React.createClass({




    render: function () {
      return (
        <div>
          <li><Link to="signup">Sign up</Link></li>
          <li><Link to="contribute">Contribute</Link></li>
          <li><Link to="radio">Radio</Link></li>
          <h1> hi </h1>
          <RaisedButton className="login-button" label="Log In" secondary={true} />
            <RouteHandler />
        </div>
      )
    }
  });

  var routes = (
    <Route name="root" path="/" handler={App}>
      <Route name="signup" handler={Signup}/>
    </Route>
  );

  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('App'));
  });
});
