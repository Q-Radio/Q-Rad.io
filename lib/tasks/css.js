module.exports = function($, gulp, paths){

  return {
    dev: function(){
      var source = gulp.src(paths.client.css);
      var dest   = gulp.dest(paths.build.dir.css);

      return source
        .pipe($.concat('app.css'))
        .pipe( dest );
    },
    stage: function(){
      var source = gulp.src(paths.client.css);
      var dest   = gulp.dest(paths.build.dir.css);

      return source
        .pipe($.concat('app.min.css'))
        .pipe($.minifyCss())
        .pipe( dest );
    }
  };
};