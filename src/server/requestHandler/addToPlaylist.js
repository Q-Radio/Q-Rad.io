var addTrackToPlaylist  = require('./../utils/addTrackToPlaylist.js');

module.exports = function(req, res){
  var playlist_ID = req.cookies.playlist_ID;
  var track_ID = req.body.trackID;

  var url = 'https://api.spotify.com/v1/users/'+req.user.id+'/playlists/'+playlist_ID+'/tracks';

  var access_token = req.cookies.access_token;
  var refresh_token = req.cookies.refresh_token;


  addTrackToPlaylist(url, access_token, refresh_token, track_ID).then(function(newToken){

    if(!newToken){
      res.status(200).send();
    } else {
      res.cookie('access_token', token);
      req.cookies.access_token = token;
      modue.exports(req, res);
    }

  });

};