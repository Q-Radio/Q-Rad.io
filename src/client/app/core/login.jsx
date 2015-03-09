  var React = require('react');

  var mui = require('material-ui');
  var RaisedButton = mui.RaisedButton;

  var Login = React.createClass({

          // <img src="../../../../assets/quentin.png" alt="Quentin" height="50" width="50" />
          // <H1> Q-Rad.io </H1>
          // <H3> Quentin, will be your guide on the endless journey of music discovery</H3>
    render: function() {
      return (
        <div>
          <div className="Q-Rad.io-login"> Q-Rad.io </div>
          <div className="Quentin-login"> Let Quentin be your guide on the endless journey of music discovery! </div>
          <img src="../assets/quentin.png" className="QuentinImage-login"></img>

          <a href="/auth/spotify" className="login">
            <span> Login With Spotify </span>
          </a>
        </div>
      )
    }
  });


  React.render(< Login />, document.body);
