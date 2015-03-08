 module.exports = function(progress) {
   var completed = progress.iterations / 12000 * 100;
   console.log('training is ' + completed + "% complete");
};