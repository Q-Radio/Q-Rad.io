var path = require('path');

module.exports = function(req, res){
  res.status(200).sendFile(path.resolve(__dirname +'/../../../build/js/core/trainingWorker.js'));
}