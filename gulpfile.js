(function() {
  'use strict';

  /*Dependencies */
  var lib  = require('./lib');
  var gulp = require('gulp');
  var $    = require('gulp-load-plugins')({lazy:false});
  var del  = require('del');
  var browserify = require('browserify');
  var reactify = require('reactify');
  var source = require('vinyl-source-stream');
  var livereload = require('gulp-livereload');
  var less = require('gulp-less');  
  var path = require('path');

  /* Tasks */

  var tasks = lib.tasks;

  //================COMPILE
  //this section will be refactored to comform to the rest of the gulpfile structure

  gulp.task('compile', function () {
    var b = browserify();
    b.transform(reactify);
    b.add('./hello.js'); // selects the file that should be browserified
    return b.bundle()
      .pipe(source('hello.js')) 
      .pipe(gulp.dest('./src/dist/bundle.js')) // link this file to html to run require() statements
      .pipe(livereload());
  });

  //================DEV

  gulp
    .task('default',
      $.sequence( 'clean'
                , 'build:dev'
                , 'start:dev'
                ))

  //================BUILD
  gulp
    .task( 'js:dev'  , tasks.js.dev)
    .task( 'less:dev', tasks.less.dev)
    .task( 'css:dev' , tasks.css.dev)
    .task( 'html:dev', tasks.html.dev)
    .task( 'build:dev',
      $.sequence( 'js:dev'
                , 'less:dev'
                , 'css:dev'
                , 'html:dev'
                ))

  //=================START
  gulp
    .task( 'vendor:dev', tasks.vendor.dev)
    .task( 'inject:dev', tasks.inject.dev)
    .task( 'server:dev', tasks.server.dev)
    .task( 'watch:dev' , tasks.watch.dev)
    .task( 'start:dev' ,  
      $.sequence( 'vendor:dev'
                , 'inject:dev'
                , 'server:dev'
                , 'watch:dev'
                ))

  //==================CLEAN

  gulp
    .task('clean', del.bind(null, ['build']))


})();