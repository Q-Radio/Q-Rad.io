var retrieveRecords = require('./../utils/retrieveRecords.js');

module.exports = function(req, res){
  var user = req.user.id;

  var query = retrieveRecords(user);

  query.exec(function(err,records){
    if(err) return console.error(err);      
    res.status(200).send(records);
  });
};