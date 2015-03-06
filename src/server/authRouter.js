
var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var auth = require('./auth.js');
var requestHandler = require('./requestHandler.js');
var Path = require('path');

var client_id = process.env.spotifykey || require('../../.ENV').spotifykey; // Your client id
var client_secret = process.env.spotifysecret || require('../../.ENV').spotifysecret; // Your client secret
var redirect_uri = 'http://localhost:8000/callback'; // Your redirect uri


var authRouter = express.Router();

var build = Path.resolve(__dirname,'../../build');


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

authRouter.get('/', ensureAuthenticated,
  function(req, res) {
    res.sendFile(build + '/index.html');
});

authRouter.get('/training-worker.js', ensureAuthenticated, requestHandler.trainingWorker);

authRouter.post('/11songs',ensureAuthenticated, requestHandler.get11Songs);

authRouter.post('/3songs',ensureAuthenticated, requestHandler.get3Songs);

authRouter.post('/song', ensureAuthenticated,requestHandler.getRelatedSong);

authRouter.post('/random', ensureAuthenticated, requestHandler.getRandomSong);

authRouter.get('/getHistory', ensureAuthenticated, requestHandler.getHistory);

authRouter.post('/saveRecord', ensureAuthenticated, requestHandler.saveRecord);

authRouter.post('/search', ensureAuthenticated, requestHandler.search);

authRouter.post('/createPlaylist',ensureAuthenticated,requestHandler.createPlaylist);

authRouter.post('/addToPlaylist',ensureAuthenticated,requestHandler.addToPlaylist);


authRouter.get('/auth/spotify',
  auth.authenticate('spotify', {scope: 'user-read-private'}),
  function(req, res){
    
// The request will be redirected to spotify for authentication, so this
// function will not be called.
});

authRouter.get('/login', function(req, res){
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  res.render('login.html', { user: req.user });
});



var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';


authRouter.get('/authorize',
  auth.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('authentication for playlisting');

    var state = req.cookies[stateKey];

    // your application requests authorization
    var scope = 'user-read-private user-read-email playlist-modify-public';
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));

    // res.redirect('/');
  });

authRouter.get('/callback', ensureAuthenticated, function(req, res) {
  
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
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
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.cookie('access_token', access_token);
        res.cookie('refresh_token', refresh_token);
        res.redirect('/');
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

authRouter.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

authRouter.use(express.static(build));

authRouter.get('/logout', function(req, res){
  console.log('I am logging out');
  req.logout();
  res.redirect('/');
});

module.exports = authRouter;