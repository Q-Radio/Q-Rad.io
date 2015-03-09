var Promise = require('bluebird');
var request = require('request'); 

var getRefreshToken = require('./getRefreshToken.js');

module.exports = function(url, access_token, refresh_token, track){
  return new Promise(function(resolve){
    request.post({
        headers: {'Authorization': 'Bearer '+access_token, 'content-type' : 'application/json'},
        url:     url,
        body:    JSON.stringify({'uris': ['spotify:track:'+track]})
      }, function(error, response, body){
        var saved = JSON.parse(body).snapshot_id;
        if(saved === 'undefined'){
          resolve(getRefreshToken(refresh_token))
        } else{
          resolve(false);
        }
      });
  });
};