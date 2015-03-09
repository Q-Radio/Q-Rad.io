module.exports = function($, gulp, paths){

  return {
    dev: function(){
      var source = gulp.src(paths.client.html);
      var dest   = gulp.dest(paths.build.dir.templates);

      return source
        .pipe( dest );
    },
    stage: function(){
      var source = gulp.src(paths.client.css);
      var dest   = gulp.dest(paths.build.dir.templates);

      return source
        .pipe( dest );
    }
  };
};