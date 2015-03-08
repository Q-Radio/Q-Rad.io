var loginStateSettings = require('./loginStateSettings.js');

var request = require('request'); 

module.exports = function(req, res){
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[loginStateSettings.stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/login');
  } else {
    res.clearCookie(loginStateSettings.stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: loginStateSettings.redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(loginStateSettings.client_id + ':' + loginStateSettings.client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          
        });

        // we can also pass the token to the browser to make requests from there
        res.cookie('access_token', access_token);
        res.cookie('refresh_token', refresh_token);
        res.redirect('/');
      } else {
        res.redirect('/login'); 
      }
    });
  }  
};