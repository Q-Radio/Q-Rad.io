(function() {
	'use strict';
  var express  = require('express');
  var reloader = require('connect-livereload');

  module.exports = function(){
    console.log('in server');

    var app = express();

    app.use(reloader());
    app.use(express.static('./build'));
    app.listen(8000, function() {
      console.log('listening on port 8000');
    });
  }
})();