var Promise = require ('bluebird'); 

module.exports = {

onError : require('./onError.jsx'),

  showProgress : require('./showProgress.jsx'),

  getSong : require('./getSong.jsx'),

  formatData : require('./formatData.jsx'),

  prepareTraining : require('./prepareTraining.jsx'),

  likability : require('./likability.jsx'),

  reorder : require('./reorder.jsx'),

  dropSongs : require('./dropSongs.jsx'),

  addSongs : require('./addSongs.jsx'),

  getSongs : require('./getSongs.jsx'),

  modifyPlaylist : require('./modifyPlaylist.jsx'),

  sendTrainingData : require('./sendTrainingData.jsx'),

  getBrainData : require('./getBrainData.jsx'),

  createSpotifyPlaylist : require('./createSpotifyPlaylist.jsx'),

  addTrackToSpotifyPlaylist: require('./addTrackToSpotifyPlaylist.jsx')

}

