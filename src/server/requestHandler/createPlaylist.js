var checkForPlaylist = require('./../utils/checkForPlaylist.js');

module.exports = function(req, res){

  var url = 'https://api.spotify.com/v1/users/'+req.user.id+'/playlists';
  var access_token = req.cookies.access_token;

  checkForPlaylist(url, access_token).then(function(playlistID){
    res.cookie('playlist_ID',playlistID);
    res.status(200).send();
  });

};