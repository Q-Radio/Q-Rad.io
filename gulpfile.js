(function() {
  'use strict';

  /*Dependencies */
  var lib  = require('./lib');
  var gulp = require('gulp');
  var $    = require('gulp-load-plugins')({lazy:false});
  var del  = require('del');

  //for React
  var browserify = require('browserify');
  var reactify = require('reactify');
  var source = require('vinyl-source-stream');
  var livereload = require('gulp-livereload');
  var less = require('gulp-less');  
  var path = require('path');

  /* Tasks */

  var tasks = lib.tasks;

  //================DEV

  gulp
    .task('default',
      $.sequence( 'clean'
                , 'build:dev'
                , 'start:dev'
                ))

  //===============TEST 
  gulp
  //.task('casper:dev', tasks.casper.dev)
  .task('mocha:dev' , tasks.mocha.dev)
  .task('mocha:jsx', tasks.mocha.jsx)
  .task('karma:dev' , tasks.karma.dev)
  .task('test', 
    $.sequence( 'mocha:dev'
              , 'mocha:jsx'
              , 'karma:dev'));
             // , 'casper:dev'));

  //================BUILD
  gulp
    .task( 'js:dev'       , tasks.js.dev)
    .task( 'less:dev'     , tasks.less.dev)
    .task( 'css:dev'      , tasks.css.dev)
    .task( 'html:dev'     , tasks.html.dev)
    .task( 'assets:dev'   , tasks.assets.dev)
    .task( 'compile:dev'  , tasks.compile.dev)
    .task( 'build:dev',
      $.sequence( 'js:dev'
                , 'less:dev'
                , 'css:dev'
                , 'html:dev'
                , 'assets:dev'
                , 'compile:dev'
                ));

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
                ));

  //==================CLEAN

  gulp
    .task('clean', del.bind(null, ['build']))


})();