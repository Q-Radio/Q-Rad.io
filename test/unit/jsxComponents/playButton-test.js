// jsx-test
var chai = require('chai');
var jsx = require('jsx-test');
var expect = chai.expect;
var should = chai.should;
var assert = chai.assert;


describe('PlayButton', function() {
    var PlayButton = require('../../../src/client/app/core/components/playButton.jsx');
    

    it('should render with audio data', function() {

        jsx.assertRender(PlayButton, {
            songAudio: "testing"
        }, "testing");

        jsx.assertRender(PlayButton, {
            songAudio: "more audio tests"
        }, "more audio tests");
    });

    it('should have a listener for song end', function(){
        var playButton = jsx.renderComponent(PlayButton, {
            songAudio: "tester"
        });

        expect(playButton.player._listeners.ended).to.exist;
    });

    it('should have a listener for song playing', function(){
         var playButton = jsx.renderComponent(PlayButton, {
            songAudio: "tester"
        });

        expect(playButton.player._listeners.playing).to.exist;
    })

});