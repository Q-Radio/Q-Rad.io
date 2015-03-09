var formatData = require('./formatData.jsx');

module.exports = function(songData, rating){
  var train = {input:{}, output: {rating: rating}};

     train.input = formatData(songData);
     return train;
};