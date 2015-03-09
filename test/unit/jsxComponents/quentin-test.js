// jsx-test
var chai = require('chai');
var jsx = require('jsx-test');
var expect = chai.expect;
var should = chai.should;
var assert = chai.assert;


describe('Quentin component', function() {
  var Quentin = require('../../../src/client/app/core/components/quentin.jsx');

  it('should render with given data', function() {

    jsx.assertRender(Quentin, {
    }, '<div class="quentin turn-right"><img></div>');

  });
});