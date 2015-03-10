var paths = require('../../paths.json');
var gulp  = require('gulp');
var $     = require('gulp-load-plugins')({lazy:false});

module.exports = {
	js    : require('./js'    )($, gulp, paths),
	css   : require('./css'   )($, gulp, paths),
  	less  : require('./less'  )($, gulp, paths),
	html  : require('./html'  )($, gulp, paths),
	server: require('./server')($, gulp, paths),
	watch : require('./watch' )($, gulp, paths),
	vendor: require('./vendor')($, gulp, paths),
	inject: require('./inject')($, gulp, paths),
	casper: require('./casper')($, gulp, paths),
	mocha : require('./mocha' )($, gulp, paths),
	karma : require('./karma' )($, gulp, paths),
	compile : require('./compile')($, gulp, paths),
	assets : require('./assets')($, gulp, paths)
}