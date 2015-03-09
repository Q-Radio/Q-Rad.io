module.exports = function($, gulp, paths){

  return {
    dev: function(){
      return gulp.src(paths.tests.server, {read: false})
        .pipe($.mocha({reporter: 'nyan'}));
    },
    jsx: function(){
      return gulp.src(paths.tests.jsx, {read: false})
        .pipe($.mocha({reporter: 'nyan'}));
    },
    stage: function(){
      return gulp.src(paths.tests.server, {read: false})
        .pipe($.mocha({reporter: 'nyan'}));
    }
  };
};