module.exports = function($, gulp, paths){

  return {
    dev: function(){
      require(paths.server.forCasper);

      return gulp.src(paths.tests.integration)
        .pipe($.casperjs())
        .once('end', function () {
            process.exit();
        });
    },
    stage: function(){
      require(paths.server.forCasper);
      
      return gulp.src(paths.tests.integration)
        .pipe($.casperjs())
        .once('end', function () {
            process.exit();
        });
    }
  };
};