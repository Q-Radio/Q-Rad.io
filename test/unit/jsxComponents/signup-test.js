// jsx-test
var chai = require('chai');
var jsx = require('jsx-test');
var expect = chai.expect;
var should = chai.should;
var assert = chai.assert;


describe('Signup component', function() {
  var Signup = require('../../../src/client/app/core/components/signup.jsx');

  it('should render with given data', function() {

    jsx.assertRender(Signup, {
    }, '<div class="signup-form"><div class="mui-font-style-display-3">Sign Up</div><form><div class="signup-input mui-text-field mui-has-floating-labels"><label class="mui-text-field-floating-label" for="dom_id_c_1_0">Username</label><input class="mui-text-field-input" id="dom_id_c_1_0" type="text"><hr class="mui-text-field-underline"><hr class="mui-text-field-focus-underline"></div><div class="signup-input mui-text-field mui-has-floating-labels"><label class="mui-text-field-floating-label" for="dom_id_c_1_1">Email</label><input class="mui-text-field-input" id="dom_id_c_1_1" type="text"><hr class="mui-text-field-underline"><hr class="mui-text-field-focus-underline"></div><div class="signup-input mui-text-field mui-has-floating-labels"><label class="mui-text-field-floating-label" for="dom_id_c_1_2">Password</label><input class="mui-text-field-input" id="dom_id_c_1_2" type="text"><hr class="mui-text-field-underline"><hr class="mui-text-field-focus-underline"></div><div class="signup-button mui-raised-button mui-is-secondary mui-paper mui-z-depth-1 mui-rounded"><div class=" mui-paper-container mui-z-depth-bottom"><button class="mui-raised-button-container mui-enhanced-button"><div><div class="mui-touch-ripple"><div class="mui-ripple-circle"><div class="mui-ripple-circle-inner"></div></div></div><span class="mui-raised-button-label">Sign Up</span></div><div class="mui-focus-ripple"><div class="mui-focus-ripple-inner"></div></div></button></div></div></form></div>');

  });
});