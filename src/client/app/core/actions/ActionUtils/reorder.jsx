var likability = require('./likability.jsx');

 module.exports = function(futureSongs, net, retrained){
  if(net){
    for(var i = 0; i < futureSongs.length; i++){
      if(!futureSongs[i].likability || retrained){
        futureSongs[i] = likability(futureSongs[i],net);
      }  
    }
    futureSongs.sort(function(a,b){
      return b.likability - a.likability;
    });
  }
    return futureSongs;
};