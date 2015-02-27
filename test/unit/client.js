var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

describe('testing', function() {

it("testing", function () {
      assert.equal(true, true);
    });
});




// var song = {
//       "album" : {
//         "album_type" : "album",
//         "available_markets" : [ "FR" ],
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/album/2kagtqzz8V0v3pgDrJnYuW"
//         },
//         "href" : "https://api.spotify.com/v1/albums/2kagtqzz8V0v3pgDrJnYuW",
//         "id" : "2kagtqzz8V0v3pgDrJnYuW",
//         "images" : [ {
//           "height" : 640,
//           "url" : "https://i.scdn.co/image/3c3cb52c60fc62a65d3e7da9a3594a53fc34da77",
//           "width" : 640
//         }, {
//           "height" : 300,
//           "url" : "https://i.scdn.co/image/34b6b34e462146deae5336f775bdd8fb6f91b215",
//           "width" : 300
//         }, {
//           "height" : 64,
//           "url" : "https://i.scdn.co/image/adef7015827966e45e101ded0e52384c11a1967e",
//           "width" : 64
//         } ],
//         "name" : "NRJ 200% Hits 2012",
//         "type" : "album",
//         "uri" : "spotify:album:2kagtqzz8V0v3pgDrJnYuW"
//       },
//       "artists" : [ {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/1Cs0zKBU1kc0i8ypK3B9ai"
//         },
//         "href" : "https://api.spotify.com/v1/artists/1Cs0zKBU1kc0i8ypK3B9ai",
//         "id" : "1Cs0zKBU1kc0i8ypK3B9ai",
//         "name" : "David Guetta",
//         "type" : "artist",
//         "uri" : "spotify:artist:1Cs0zKBU1kc0i8ypK3B9ai"
//       }, {
//         "external_urls" : {
//           "spotify" : "https://open.spotify.com/artist/5WUlDfRSoLAfcVSX1WnrxN"
//         },
//         "href" : "https://api.spotify.com/v1/artists/5WUlDfRSoLAfcVSX1WnrxN",
//         "id" : "5WUlDfRSoLAfcVSX1WnrxN",
//         "name" : "Sia",
//         "type" : "artist",
//         "uri" : "spotify:artist:5WUlDfRSoLAfcVSX1WnrxN"
//       } ],
//       "available_markets" : [ ],
//       "disc_number" : 1,
//       "duration_ms" : 243480,
//       "explicit" : false,
//       "external_ids" : {
//         "isrc" : "GB28K1100036"
//       },
//       "external_urls" : {
//         "spotify" : "https://open.spotify.com/track/6bykzgQMSKaBg9p40RzKHU"
//       },
//       "href" : "https://api.spotify.com/v1/tracks/6bykzgQMSKaBg9p40RzKHU",
//       "id" : "6bykzgQMSKaBg9p40RzKHU",
//       "name" : "Titanium",
//       "popularity" : 5,
//       "preview_url" : null,
//       "track_number" : 2,
//       "type" : "track",
//       "uri" : "spotify:track:6bykzgQMSKaBg9p40RzKHU"};

// var songs = [];
// songs.push(song);
// songs.push(song);


// describe('testing', function() {

//     it('testing', function(){
//     	expect('test').to.be.a('string');
//     });
// });

// describe('player unit tests', function(){
//   var player = new Player();


//   it('player should have a main property', function(){
//     expect(player).to.have.property('main');
//   })

//   it('player should have a playlist property', function(){
//     expect(player).to.have.property('playlist');
//   })

//   it('playlist should have a length of 1', function(){    
//     player.addSong(songs);
//     expect(player.playlist.length).to.equal(2);
//   })

//   it('player.nextSong should move the current song forward', function(){
//     player.nextSong();
//     expect(player.currentSong).to.be.equal(1);
//   })

//   it('player.prevSong should move the current song backwards', function(){
//     expect(player.currentSong).to.be.equal(1);
//     player.prevSong();
//     expect(player.currentSong).to.be.equal(0);
//     expect(player.songsLeft()).to.be.equal(1);
//   })
// });

