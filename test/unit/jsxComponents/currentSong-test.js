// jsx-test
var chai = require('chai');
var jsx = require('jsx-test');
var expect = chai.expect;
var should = chai.should;
var assert = chai.assert;


describe('currentSong component', function() {
  var CurrentSong = require('../../../src/client/app/core/components/currentSong.jsx');
  
  it('should render with given data', function() {

    jsx.assertRender(CurrentSong, {
        albumArt: "fakeArt", 
        currentSong: "fakeSong", 
        currentArtist:"fakeArtist", 
        fullSong: "fakeFullSong", 
        spotifyID: "fakeSpotifyID"
    }, '<div class="song-info"><img src="fakeArt" class="sp-album-art"><div class="sp-info"><a href="fakeFullSong" target="_blank"><div class="sp-title">fakeSong</div></a><div class="sp-artist">fakeArtist</div><div class="sp-artist" type="button">Add to your Rad Playlist!</div></div></div>');

  });

});