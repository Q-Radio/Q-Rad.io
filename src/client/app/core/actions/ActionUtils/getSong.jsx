var Promise = require ('bluebird'); 

module.exports = function(songs){   
  return new Promise(function(resolve){
    var song;
    $.ajax({
      type: 'POST',
      url: '/10songs',
      data: JSON.stringify(songs),
      dataType: 'json',
      contentType: 'application/json',
      success: function(data){
        resolve(data);
      }
    });
  })
};