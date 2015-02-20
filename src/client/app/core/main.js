/**
 * @jsx React.DOM
 */

$(document).ready(function() {

  var React = require('react');
  var App = require('./App.js');

  // React.render(
  //   <App />,
  //   document.getElementById('App')
  // );

  var Main = React.createClass({
    render: function() {
      return (
        <RouteHandler/>
      );
    }
  })

  var routes = (
    <Route handler={Main}>
      <DefaultRoute handler={App}/>
      <Route name="code" path="code/:id" handler={App}/>
      <NotFoundRoute handler={App}/>
    </Route>
  );

  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('App'));
  });

  
});
