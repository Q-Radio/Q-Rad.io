var Promise = require ('bluebird'); 

module.exports= function(trackID){
  return new Promise(function(resolve){
    $.ajax({
      type: 'POST',
      url: '/addToPlaylist',
      data: JSON.stringify({trackID:trackID}),
      dataType: 'json',
      contentType: 'application/json',

      success: function(data){
        resolve(data);
      }
    });
  })
};