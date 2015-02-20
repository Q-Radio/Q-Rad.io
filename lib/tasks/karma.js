module.exports = function($, gulp, paths){
// [
//       'src/client/app/core/*.js',
//       'test/unit/client.js'
//     ]


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
        });
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

