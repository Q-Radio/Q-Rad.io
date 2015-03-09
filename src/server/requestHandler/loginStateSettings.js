module.exports.client_id = process.env.spotifykey || require('../../../.ENV').spotifykey; // Your client id
module.exports.client_secret = process.env.spotifysecret || require('../../../.ENV').spotifysecret; // Your client secret
module.exports.redirect_uri = 'http://localhost:8000/callback'; // Your redirect uri

module.exports.stateKey = 'spotify_auth_state';