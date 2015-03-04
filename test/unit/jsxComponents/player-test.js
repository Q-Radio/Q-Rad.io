// jsx-test
var chai = require('chai');
var jsx = require('jsx-test');
var expect = chai.expect;
var should = chai.should;
var assert = chai.assert;


describe('Player component', function() {
  var Player = require('../../../src/client/app/core/components/player.jsx');

  it('should render with given data', function() {
    var state = {};

     state= {
      currentSong: 'currentSong',
      currentArtist: '_currentArtist',
      songAudio: '_songAudio',
      albumArt: '_albumArt',
      playlist: ['_playlist', 'alsfljdsf'],
      upcomingSongs: ['_upcomingSongs'],
      fullSong: '_fullSong',
      spotifyID: '_spotifyID',
      paused: '_paused'
    }

    jsx.assertRender(Player, state, '<span><div class="flex"><span class="playlist"><h4 class="playlist-header"><span> </span><span>Played Songs</span><span> </span></h4><span class="Transition-Group"><div><span><div class="playlist-item"><div><span> </span><span> </span></div><div></div></div></span></div><div><span><div class="playlist-item"><div><span> </span><span> </span></div><div></div></div></span></div></span></span><div class="current-song centered"><div class="song-info"><img src="_albumArt" class="sp-album-art"><div class="sp-info"><a href="_fullSong" target="_blank"><div class="sp-title">currentSong</div></a><div class="sp-artist">_currentArtist</div><div class="sp-artist" type="button">Add to your Rad Playlist!</div></div></div><div class="centered btn-group sp-controls&#x27;"><span class="fa fa-step-backward fa-2x controls"> </span><span><audio class="audio" src="_songAudio" autoplay></audio><span class="fa fa-play fa-2x controls controls-play"> </span></span><span class="fa fa-step-forward fa-2x controls"> </span><input class="slider" type="range"></div><input id="stars" class="rating" data-show-caption="false" data-show-clear="false" data-step="1" data-size="sm"></div><span class="futureList"><h4 class="playlist-header"><span> </span><span>Upcoming Songs</span><span> </span></h4><span class="Transition-Group"><div><span><div class="playlist-item"><div><span> </span><span> </span></div><div></div></div></span></div></span></span></div></span>');

  });
});