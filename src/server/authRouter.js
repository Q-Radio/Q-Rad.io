var express = require('express');
var auth = require('./auth.js');
var requestHandler = require('./requestHandler.js');
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

authRouter.post('/song', ensureAuthenticated,requestHandler.getRelatedSong);

authRouter.post('/random', ensureAuthenticated, requestHandler.getRandomSong);

authRouter.get('/getHistory', ensureAuthenticated, requestHandler.getHistory);

authRouter.post('/saveRecord', ensureAuthenticated, requestHandler.saveRecord);

authRouter.get('/auth/spotify',
  auth.authenticate('spotify', {scope: 'user-read-private'}),
  function(req, res){
    
// The request will be redirected to spotify for authentication, so this
// function will not be called.
});

authRouter.get('/login', function(req, res){
  res.render('login.html', { user: req.user });
});

authRouter.get('/callback',
  auth.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

authRouter.use(express.static(build));

authRouter.get('/logout', function(req, res){
  console.log('I am logging out');
  req.logout();
  res.redirect('/');
});

module.exports = authRouter;