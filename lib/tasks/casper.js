module.exports = function($, gulp, paths){

  return {
    dev: function(){
      gulp.src(paths.tests.integration)
        .pipe($.casperjs());
    },
    stage: function(){
      gulp.src(paths.tests.integration)
        .pipe($.casperjs());
    }
  };
};