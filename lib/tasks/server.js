module.exports = function($, gulp, paths){

	return{
		dev: function(){
			process.env.NODE_ENV = 'development';
			$.nodemon({ script: paths.server.root, ext: 'js', env:{'NODE_ENV':'development'} })
			  .on('restart', function () {
			    console.log('restarted!')
			  });
		}, 
		stage: function(){
      		process.env.NODE_ENV = 'stage';
			$.nodemon({ script: paths.server.root, ext: 'js', env:{'NODE_ENV':'stage'} })
			  .on('restart', function () {
			   console.log('restarted!')
		  	  });
		}
	}
};