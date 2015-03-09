var Promise = require ('bluebird'); 

module.exports = function(){   
  return new Promise(function(resolve){
    $.ajax({
      type: 'GET',
      url: '/getHistory',
      dataType: 'json',
      
      success: function(data){
        resolve(data);
      }
    });
  })
};