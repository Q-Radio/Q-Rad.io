var bower = require('main-bower-files');

module.exports = function($, gulp, paths){

  return {
    dev: function(){
      var js        = gulp.src(paths.build.js ,          {read: false});
      var css       = gulp.src(paths.build.css,          {read: false});
      var templates = gulp.src(paths.build.templates,    {read: false});
      var vendor    = gulp.src(bower({paths:{bowerDirectory: paths.vendor.root}}));

      var target = gulp.src(paths.client.index);
      var dest   = gulp.dest(paths.build.root);

      return target
        .pipe($.inject(js ,        {name:'app',    ignorePath:'build'}))
        .pipe($.inject(css ,       {name:'app',    ignorePath:'build'}))
        .pipe($.inject(vendor ,    {name:'vendor', ignorePath:'build'}))
        .pipe($.inject(templates , {name:'templates'}))
        .pipe( dest );
    },
    stage: function(){
      var js        = gulp.src(paths.build.js , {read: false});
      var css       = gulp.src(paths.build.css, {read: false});
      var templates = gulp.src(paths.build.templates, {read: false});
      var vendor    = gulp.src(bower({paths:{bowerDirectory: paths.vendor.root}}));

      var target = gulp.src(paths.client.index);
      var dest   = gulp.dest(paths.build.root);

      return target
        .pipe($.inject(js ,        {name:'app',    ignorePath:'build'}))
        .pipe($.inject(css ,       {name:'app',    ignorePath:'build'}))
        .pipe($.inject(vendor ,    {name:'vendor', ignorePath:'build'}))
        .pipe($.inject(templates , {name:'templates'}))
        .pipe( dest );
    }
  };
};