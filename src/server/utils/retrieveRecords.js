var Record = require('./../songHistory.js');

module.exports = function(id){
  var query = Record.find();
  var queryItems = 'toTrain';
  query.select(queryItems);
  query.where('userID').equals(id);
  return query;
};