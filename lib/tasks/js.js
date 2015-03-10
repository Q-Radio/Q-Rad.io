

module.exports = function($, gulp, paths){

	return {
		dev: function(){
			var source = gulp.src(paths.client.js);
      var dest   = gulp.dest(paths.build.dir.js);

      return source
        .pipe($.browserify({
            insertGlobals: true
          }))
        .pipe( dest );
		},
    stage: function(){
      var source = gulp.src(paths.client.js);
      var dest   = gulp.dest(paths.build.dir.js);

      return source
        .pipe($.browserify({
            insertGlobals: true
          }))
        .pipe($.concat('app.min.js'))
        .pipe($.uglify())
        .pipe( dest );
    }
	}
};