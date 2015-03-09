// jsx-test
var chai = require('chai');
var jsx = require('jsx-test');
var expect = chai.expect;
var should = chai.should;
var assert = chai.assert;


describe('Playlist Item component', function() {
  var PlaylistItem = require('../../../src/client/app/core/components/playlist-item.jsx');

  it('should render with given data', function() {

    jsx.assertRender(PlaylistItem, {
      title: "fake title",
      artist: "fake artist", 
      rating: "fake rating"
    }, '<div class="centered playlist-item"><div class="rated-star"><div class="fa-stack fa-2x"><i class="fa fa-star-o fa-stack-2x"></i><strong class="fa-stack-1x fa-stack-text rating-number">fake rating</strong></div></div><div><span> </span><span>fake title</span><span> </span></div><div>fake artist</div></div>');

  });
});