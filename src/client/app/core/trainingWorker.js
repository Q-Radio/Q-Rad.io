var brain = require("brain");

onmessage = function(event) {
  var data = JSON.parse(event.data);
  var net = new brain.NeuralNetwork();

  net.train(data, {
    iterations: 12000,
    callback: postProgress,
    callbackPeriod: 500,
    learningrate: 0.2
  });

  postMessage(JSON.stringify({type: 'result', net: net.toJSON()}));
}

function postProgress(progress) {
  progress.type = 'progress'
  postMessage(JSON.stringify(progress));
}