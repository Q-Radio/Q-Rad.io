var loginStateSettings = require('./loginStateSettings.js');


var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};


module.exports = function(req, res){
  var state = generateRandomString(16);
  res.cookie(loginStateSettings.stateKey, state);

  res.render('login.html', { user: req.user });
}
