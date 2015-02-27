module.exports = function($, gulp, paths){

	return{
		dev: function(){
			process.env.NODE_ENV = 'development';
			return $.nodemon({ script: paths.server.root, ext: 'js', env:{'NODE_ENV':'development'} })
			  .on('restart', function () {
			    console.log('restarted!')
			  });
		}, 
		stage: function(){
      		process.env.NODE_ENV = 'stage';
			return $.nodemon({ script: paths.server.root, ext: 'js', env:{'NODE_ENV':'stage'} })
			  .on('restart', function () {
			   console.log('restarted!')
		  	  });
		}
	}
};