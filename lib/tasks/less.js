module.exports = function($, gulp, paths){

  return {
    dev: function(){
      var source = gulp.src(paths.client.less);
      var dest   = gulp.dest(paths.build.dir.css);

      return source
        .pipe($.plumber())
        .pipe($.less())
        //.pipe($.autoprefixer())
        //.pipe($.rename('less.css'))
        .pipe($.plumber.stop())
        .pipe( dest );
    },
    stage: function(){
      var source = gulp.src(paths.client.less);
      var dest   = gulp.dest(paths.build.dir.css);

      return source
        .pipe($.plumber())
        .pipe($.less())
        //.pipe($.autoprefixer())
        //.pipe($.rename('less.css'))
        .pipe($.plumber.stop())
        .pipe( dest );

    }
  };
};