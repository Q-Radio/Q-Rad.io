// jsx-test
var chai = require('chai');
var jsx = require('jsx-test');
var expect = chai.expect;
var should = chai.should;
var assert = chai.assert;


describe('currentSong component', function() {
  var Header = require('../../../src/client/app/core/components/header.jsx');
  
  it('should render with given data', function() {  
    jsx.assertRender(Header, {
      }, '<div class="header-container"><form class="header-form"><h1>Q-Rad.io</h1><div> What should Quentin look up? </div><button class="header-btn"> Search </button><input class="search-box" type="text" size="34" placeholder="find your next Rad-Slice!"><button class="header-btn"> Random </button></form></div>');
  });

});