/**
 * @jsx React.DOM
 */

var React = require('react');
var mui = require('material-ui');
var Item = require('./playlist-item.jsx');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Actions = require('./../actions/AppActions.jsx');


var Playlist = React.createClass({

  render: function() {
     var items = this.props.playlist.map(function(item, i) {
       return (
         <div>
           <span key={item.title}>
             <Item title={item.title} artist={item.artist_name} rating={item.rating}/>
           </span>
         </div>
       );
     }.bind(this));
     if(this.props.transitionName){
       return (
         <span className={this.props.className}>
           <h4 className="playlist-header"> {this.props.header} </h4>
           <ReactCSSTransitionGroup className='Transition-Group' transitionName={this.props.transitionName}>
             {items}
           </ReactCSSTransitionGroup>
         </span>
       )  
     } else {
         return (
           <span className={this.props.className}>
             <h4 className="playlist-header"> {this.props.header} </h4>
               {items}
           </span>
       )  
     }
   }

module.exports = Playlist;
