module.exports = function($, gulp, paths){

  return {
    dev: function(){

      var testFiles = paths.tests.testFiles;

      return gulp.src(testFiles)
        .pipe($.karma({
          configFile: paths.tests.karma,
          action: 'run'
        }))
        .on('error', function(err) {
          // Make sure failed tests cause gulp to exit non-zero 
          throw err;
        })
        .on('end', function(){
          process.exit();
        })
    },
    stage: function(){

      var testFiles = paths.tests.testFiles;

      return gulp.src(testFiles)
        .pipe($.karma({
          configFile: paths.tests.karma,
          action: 'run'
        }))
        .on('error', function(err) {
          // Make sure failed tests cause gulp to exit non-zero 
          throw err;
        });
    }
  };
};

