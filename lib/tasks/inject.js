var bower = require('main-bower-files');

module.exports = function($, gulp, paths){

  return {
    dev: function(){
      var js        = gulp.src(paths.build.js ,          {read: false});
      var main      = gulp.src(paths.build.main ,        {read: false});
      var css       = gulp.src(paths.build.css,          {read: false});
      var vendor    = gulp.src(bower({paths:{bowerDirectory: paths.vendor.root}}));

      var target = gulp.src(paths.client.index);
      var dest   = gulp.dest(paths.build.root);

      return target
        .pipe($.inject(js ,        {name:'app',    ignorePath:'build'}))
        .pipe($.inject(main ,      {name:'main',   ignorePath:'build'}))
        .pipe($.inject(css ,       {name:'app',    ignorePath:'build'}))
        .pipe($.inject(vendor ,    {name:'vendor', ignorePath:'build'}))
        .pipe( dest );
    },
    stage: function(){
      var js        = gulp.src(paths.build.js ,          {read: false});
      var main      = gulp.src(paths.build.main ,        {read: false});
      var css       = gulp.src(paths.stage.css,          {read: false});
      var vendor    = gulp.src(bower({paths:{bowerDirectory: paths.vendor.root}}));

      var target = gulp.src(paths.client.index);
      var dest   = gulp.dest(paths.build.root);

      return target
        .pipe($.inject(js ,        {name:'app',    ignorePath:'build'}))
        .pipe($.inject(main ,      {name:'main',   ignorePath:'build'}))
        .pipe($.inject(css ,       {name:'app',    ignorePath:'build'}))
        .pipe($.inject(vendor ,    {name:'vendor', ignorePath:'build'}))
        .pipe( dest );
    }
  };
};