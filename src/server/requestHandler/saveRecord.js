var saveToDB = require('./../utils/saveToDB.js');

module.exports = function(req, res){
  var user = req.user.id;
  var record = req.body;  

  saveToDB(user,record);

  res.status(200).send();
};