var chai   = require('chai');
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

var http   = require("http");
var server = require("../../src/server/server.js");
var utils = require('../../src/server/utils.js')

describe('testing', function() {

  it("should return redirect a user that is not logged in", function (done) {
	    http.get("http://localhost:8000", function (res) {
	        assert.equal(res.statusCode, 302);
	        done();
	    });

    });

  it("should log in the user", function(done){
    http.get("http://localhost:8000/auth/spotify", function(res){
      assert.equal(res.statusCode, 302);
      res.headers['location'].should.include('authorize')
      done();
    })
  });





});

