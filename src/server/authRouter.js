
var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var auth = require('./auth.js');
var requestHandler = require('./requestHandler');
var Path = require('path');

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

authRouter.get('/login', requestHandler.login);

authRouter.get('/authorize',
  auth.authenticate('spotify', { failureRedirect: '/login' }),
  requestHandler.authorize);

authRouter.get('/callback', ensureAuthenticated, requestHandler.callback);


authRouter.use(express.static(build));

authRouter.get('/logout', function(req, res){
  console.log('I am logging out');
  req.logout();
  res.redirect('/');
});

module.exports = authRouter;