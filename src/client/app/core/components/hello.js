/** @jsx React.DOM */

var track_id = '4th1RQAelzqgY7wL53UGQt'
var track_url = 'https://embed.spotify.com/?uri=spotify:track:'



var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var ContribForm = require('./splash.js');

var React = require('react'),
  mui = require('material-ui'),
  RaisedButton = mui.RaisedButton;


var SomeAwesomeComponent = React.createClass({

  render: function() {
    return (
        <RaisedButton label="Default" />
    );
  }

});


// var Lol = React.createClass({

//   render: function() {
//     return (

//         <AppBar />
//     );
//   }

// }); 





var AndyBox = React.createClass({
  
  playNextTrack: function(){
    console.log('lol')
    var next_track_id = '2RgkULYzilN6HQiqPlnJMj';

    this.props.changeTrack(next_track_id);
  },

  render: function(){
    return (
    <div>
      <iframe src={this.props.track_url + this.props.track_id} width="300" height="80" frameborder="0" allowtransparency="true"></iframe>
      <button onClick={this.playNextTrack}>Andyyyyyyyyy</button>
    </div>
    ); 
  }
})

var App = React.createClass({

  getInitialState: function () {
    return {
      track_url: track_url,
      track_id: track_id
    };
  },

  componentDidMount: function () {
    console.log('HI! im here');
    console.log(this.state);
  },

  changeTrack: function (track_id) {
    this.setState({
      track_id: track_id
    });
  },

  render: function () {
    return (
      <div>
        <AndyBox {...this.state} changeTrack={this.changeTrack}/>
        <div>
          <button>Previous</button>
          <button>DownVote</button>
          <button>Next</button>
          <button>UpVote</button>
        </div>
        <div>
          <button>Contribute!</button>
        </div>
        <div>Yaya!</div>
       <ContribForm />
      </div>
    )
  }
});


React.render(
  <App />,
  document.getElementById('example')
);
