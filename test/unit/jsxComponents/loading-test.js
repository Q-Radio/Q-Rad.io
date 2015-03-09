// jsx-test
var chai = require('chai');
var jsx = require('jsx-test');
var expect = chai.expect;
var should = chai.should;
var assert = chai.assert;


describe('loading component', function() {
  var Loading = require('../../../src/client/app/core/components/loading.jsx');

  it('should render with given data', function() {

    jsx.assertRender(Loading, {
    }, '<div class="loading"><div class="quentin turn-right"><img src="../assets/quentinMedium.png"></div><h1>Just a sec as Quentin finds you awesome music!</h1><br><span class="fa fa-spinner fa-pulse fa-5x"></span><h5> &quot;True stength comes from Shmoosh&quot; </h5><h6> Gaia </h6></div>');

  });
});