var Promise = require('bluebird');
var request = require('request'); 


module.exports = function(url, access_token){
  return new Promise(function(resolve){
    request.post({
        headers: {'Authorization': 'Bearer '+access_token, 'content-type' : 'application/json'},
        url:     url,
        body:    JSON.stringify({'name': "Quentin's Rad Tracks"})
      }, function(error, response, body){
        var playlist = JSON.parse(body);
        resolve(playlist.id);
      });
  });
};