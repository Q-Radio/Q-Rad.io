
var AppDispatcher = require('./../dispatcher/AppDispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('./../constants/AppConstants.jsx');
var assign = require('object-assign');


var AppActions = require('./../actions/AppActions.jsx');

var CHANGE_EVENT = 'change';

var _playlist;
var _upcomingSongs=[];
var _currentSong;
var _currentArtist;
var _songAudio;
var _albumArt; 
var _fullSong;
var _spotifyID;
var _paused;

var AppStore = assign({}, EventEmitter.prototype, {

  update: function(played, current, future) {
    _playlist = played;
    _upcomingSongs = future;
    _currentSong = current.title;
    _currentArtist = current.artist_name;
    _songAudio = current.preview_url;
    _albumArt = current.image;
    _fullSong = current.spotify_url;
    var spotifyID = current.spotify_url.split('/');
    spotifyID = spotifyID[spotifyID.length-1];
    _spotifyID = spotifyID;
  },

  updateFuture: function(future){
    _upcomingSongs = future;
  },


  getState: function() {
    return {
      currentSong: _currentSong,
      currentArtist: _currentArtist,
      songAudio: _songAudio,
      albumArt: _albumArt,
      playlist: _playlist,
      upcomingSongs: _upcomingSongs,
      fullSong: _fullSong,
      spotifyID: _spotifyID,
      paused: _paused
    }
  },

  getPlaylist: function() {
    return _playlist;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var played, current, future;


  switch(action.actionType) {
    case AppConstants.PLAY:
      played = action.played;
      current = action.current;
      future = action.future;
      AppStore.update(played, current, future);
      AppStore.emitChange();
      break;

    case AppConstants.UPDATE_FUTURE:
      future = action.future;
      AppStore.updateFuture(future);
      AppStore.emitChange();
      break;

    case AppConstants.UPDATE_PLAYED:
      _playlist.push(action.text);
      AppStore.emitChange();
      break;

    case AppConstants.NEXT:
      played = action.played;
      current = action.current;
      future = action.future;
      AppStore.update(played, current, future);
      AppStore.emitChange();
      break;

    case AppConstants.PREV:
      played = action.played;
      current = action.current;
      future = action.future;

      AppStore.update(played, current, future);
      
      AppStore.emitChange();
      break;

    case AppConstants.UPVOTE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
      }
      AppStore.emitChange();
      break;      

    case AppConstants.DOWNVOTE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
      }
      AppStore.emitChange();
      break;

    case AppConstants.SELECT_ANY:
      played = action.played;
      current = action.current;
      future = action.future;
      AppStore.update(played, current, future);
      AppStore.emitChange();      
      break;

    case AppConstants.NO_SEARCH_RESULTS:
      var current = action.current;

      _currentSong = current.title;
      _currentArtist = current.artist_name;
      _songAudio = current.preview_url;
      _albumArt = current.image;
      _fullSong = current.spotify_url;

      AppStore.emitChange();      
      break;

    default:
      // no op
  }
});

module.exports = AppStore;
