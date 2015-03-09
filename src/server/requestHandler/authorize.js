var querystring = require('querystring');

var loginStateSettings = require('./loginStateSettings.js');


module.exports = function(req, res){
    var state = req.cookies[loginStateSettings.stateKey];

    // your application requests authorization
    var scope = 'user-read-private user-read-email playlist-modify-public';
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: loginStateSettings.client_id,
        scope: scope,
        redirect_uri: loginStateSettings.redirect_uri,
        state: state
      }));
};