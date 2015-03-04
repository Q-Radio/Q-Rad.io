// jsx-test
var chai = require('chai');
var jsx = require('jsx-test');
var expect = chai.expect;
var should = chai.should;
var assert = chai.assert;


describe('Player Controls component', function() {
  var PlayerControls = require('../../../src/client/app/core/components/player-controls.jsx');

  it('should render with given data', function() {

    jsx.assertRender(PlayerControls, {
      songAudio: "testing"
    }, '<div class="centered btn-group sp-controls&#x27;"><span class="fa fa-step-backward fa-2x controls"> </span><span><audio class="audio" src="testing" autoplay></audio><span class="fa fa-play fa-2x controls controls-play"> </span></span><span class="fa fa-step-forward fa-2x controls"> </span><input class="slider" type="range"></div>');

  });
});