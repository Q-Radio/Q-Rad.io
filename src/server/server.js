'use strict';
var express  = require('express');
var reloader = require('connect-livereload');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var swig = require('swig');
var consolidate = require('consolidate');
var Path = require('path');
var auth = require('./auth.js');
var authRouter = require('./authRouter.js');

var mongo = process.env.mongo || require('../../.ENV').mongo;
var port = process.env.PORT || 8000;
var host = process.env.HOST || 'localhost'

var app = express();
var build = Path.resolve(__dirname,'../../build');

app.engine('html', consolidate.swig);
app.set('views', build + '/templates');
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(session({ secret: 'supermusic' }));
app.use(auth.initialize());
app.use(auth.session());

app.use(reloader());

mongoose.connect(mongo);

app.use(authRouter);

app.listen(port, function() {
  console.log('listening on port ', port);
});

module.exports = app;
