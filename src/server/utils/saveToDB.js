var Record = require('./../songHistory.js');

module.exports = function(id, trainingData){
  var record = {userID: id, 
                toTrain: trainingData};

  var trainingRecord = new Record(record);
  trainingRecord.save(); 

};