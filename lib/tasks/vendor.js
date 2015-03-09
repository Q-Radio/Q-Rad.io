module.exports = function($, gulp, paths){

  return {
    dev: function(){
      return $.bower()
        .pipe(gulp.dest(paths.build.dir.vendor));
    },
    stage: function(){
      return $.bower()
        .pipe(gulp.dest(paths.build.dir.vendor));
        // .pipe($.concat('vendor.min.js'))
        // .pipe($.uglify())
        // .pipe(gulp.dest(paths.build.dir.vendor));
    }
  }	
};