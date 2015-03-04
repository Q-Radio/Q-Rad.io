// jsx-test
var chai = require('chai');
var jsx = require('jsx-test');
var expect = chai.expect;
var should = chai.should;
var assert = chai.assert;


describe('Playlist component', function() {
  var Playlist = require('../../../src/client/app/core/components/playlist.jsx');

  it('should render with given data', function() {

    jsx.assertRender(Playlist, {
      className: "futureList",
      playlist: ['test song']
    }, '<span class="futureList"><h4 class="playlist-header"><span> </span><span> </span></h4><span class="Transition-Group"><div><span><div class="playlist-item"><div><span> </span><span> </span></div><div></div></div></span></div></span></span>');

  });
});