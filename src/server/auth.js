var express = require('express');
var passport = require('passport');
var session = require('express-session');
var Path = require('path');
var SpotifyStrategy = require('../../node_modules/passport-spotify/lib/passport-spotify/index').Strategy;
var appKey = process.env.spotifykey || require('../../.ENV').spotifykey;
var appSecret = process.env.spotifysecret || require('../../.ENV').spotifysecret;
var host = process.env.HOST || 'localhost';

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SpotifyStrategy({
  clientID: appKey,
  clientSecret: appSecret,
  callbackURL: 'http://'+ host + ':8000/authorize'
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's spotify profile is returned to
      // represent the logged-in user. In a typical application, you would want
      // to associate the spotify account with a user record in your database,
      // and return that user instead.

      // console.log('my profile is ', profile);
      return done(null, profile);
    });
  }));
 

module.exports = passport;
