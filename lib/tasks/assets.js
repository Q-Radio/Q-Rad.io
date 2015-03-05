module.exports = function($, gulp, paths){

  return {
    dev: function(){
      var source = gulp.src(paths.client.assets);
      var dest   = gulp.dest(paths.build.dir.assets);

      return source
        .pipe( dest );
    },
    stage: function(){
      var source = gulp.src(paths.client.assets);
      var dest   = gulp.dest(paths.build.dir.assets);

      return source
        .pipe( dest );
    }
  }
};