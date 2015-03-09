var Promise = require ('bluebird'); 

module.exports = function(){   
  return new Promise(function(resolve){
    $.ajax({
      type: 'POST',
      url: '/createPlaylist',
      data: JSON.stringify(['songData']),
      dataType: 'json',
      contentType: 'application/json',

      success: function(data){
        resolve(data);
      }
    });
  })
};