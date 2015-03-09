var Promise = require ('bluebird'); 

//need to send info about user and their song prefernces
module.exports = function(songData){   
  return new Promise(function(resolve){
    $.ajax({
      type: 'POST',
      url: '/saveRecord',
      data: JSON.stringify(songData),
      dataType: 'json',
      contentType: 'application/json',
      
      //may not need success at all
      success: function(songs){
        resolve(songs);
      }
    });
  })
};