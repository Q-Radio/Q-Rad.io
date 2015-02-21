var chai   = require('chai');
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

var http   = require("http");
var server = require("../../src/server/server.js");

describe('testing', function() {

it("should return a 200 response", function (done) {
	    http.get("http://localhost:8000", function (res) {
	        assert.equal(res.statusCode, 200);
	        done();
	    });

    });
});

