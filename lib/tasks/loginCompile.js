var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

module.exports = function($, gulp, paths){
  return {
    dev: function(){
      var b = browserify();
      b.transform(reactify);
      b.add(paths.client.loginCompile); // selects the file that should be browserified
      return b.bundle()
        .pipe(source('login.js')) 
        .pipe(gulp.dest(paths.build.dir.js)) // link this file to html to run require() statements
        .pipe($.livereload());
    },
    stage: function(){
    }
  };
};
