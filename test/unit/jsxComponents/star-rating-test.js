// jsx-test
var chai = require('chai');
var jsx = require('jsx-test');
var expect = chai.expect;
var should = chai.should;
var assert = chai.assert;


describe('Star Rating component', function() {
  var StarRating = require('../../../src/client/app/core/components/star-rating.jsx');

  it('should render with given data', function() {

    jsx.assertRender(StarRating, {
    }, '<div class="fa-stack fa-2x"><i class="fa fa-star-o fa-stack-2x"></i><strong class="fa-stack-1x fa-stack-text rating-number"></strong></div>');

  });
});