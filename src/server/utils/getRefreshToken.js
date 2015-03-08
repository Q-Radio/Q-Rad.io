var Promise = require('bluebird');
var request = require('request'); 

module.exports = function(refresh_token){
  return new Promise(function(resolve){
    request.post({
        headers: {'Authorization': 'Basic '+ (new Buffer(client_id + ':' + client_secret).toString('base64'))},
        url:     'https://accounts.spotify.com/api/token',
        body:    JSON.stringify({'grant_type': 'refresh_token', 'refresh_token':refresh_token})
      }, function(error, response, body){
        var token = JSON.parse(body).access_token;
        resolve(token);
      });
  });  
};