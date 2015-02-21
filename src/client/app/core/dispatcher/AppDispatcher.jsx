var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var AppDispatcher = assign(new Dispatcher(), {

	handleViewAction:function(action){
		this.dispatch({
			source: 'VIEW_ACTION',
			action: action
		});
	}, 
	waitFor: function(promiseIndexes, callback){
		var selectedPromises = promiseIndexes.map(function(index){
			return _promises[index];
		});
		return Promise.all(selectedPromises).then(callback);
	}
});



module.exports = AppDispatcher;