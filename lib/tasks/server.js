module.exports = function($, gulp, paths){

	return{
		dev: function(){
			process.env.NODE_ENV = 'development';
      		require(paths.server.root)();
		}, 
		stage: function(){
      		process.env.NODE_ENV = 'stage';
      		require(paths.server.root)();
		}
	}
};