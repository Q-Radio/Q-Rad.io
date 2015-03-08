var Promise = require ('bluebird'); 

module.exports = function(songs, url){   
  return new Promise(function(resolve){
    $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify(songs),
      dataType: 'json',
      contentType: 'application/json',
      success: function(songs){
        resolve(songs);
      }
    });
  })
};