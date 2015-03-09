// jsx-test
var chai = require('chai');
var jsx = require('jsx-test');
var expect = chai.expect;
var should = chai.should;
var assert = chai.assert;


describe('Stars component', function() {
  var Stars = require('../../../src/client/app/core/components/stars.jsx');

  it('should render with given data', function() {

    jsx.assertRender(Stars, {
    }, '<input id="stars" class="rating" data-show-caption="false" data-show-clear="false" data-step="1" data-size="sm">');

  });
});