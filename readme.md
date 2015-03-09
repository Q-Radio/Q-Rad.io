# Q-Rad.io

Rapid music discovery engine powered by machine learning. 

## Team

  - __Scrum Master__: [Sasha Bayan](https://github.com/SashaBayan)
  - __Engineering Lead__: [Eric Benson](https://github.com/ericbenson)
  - __Project Manager__: [Zachary Lopez](https://github.com/zdlopez)

## Context

We all love music, but sometimes its hard to find new songs we enjoy. 

Existing music players play full songs and focus on genre as a major criterion for recommendations,  making it difficult to quickly discover music. 

Our app uses cutting-edge Javascript frameworks as well as Echonest and Spotify APIs to address this market need. 

We named our project Q-Rad.io: Q representing the queue of future songs to be played; Rad.io since its a Rad radio.

## How it works

var RadSlice = FullSong.slice(30seconds);

After users log in, a queue of upcoming songs is generated based on the users’ prior interaction with the app. 

Users are presented with a RadSlice of a song and can rate the radness of the song to continually re-calibrate the machine learning algorithm. 

Based on user feedback, the upcoming songs are dynamically reloaded to reflect the user’s preferences. 

If at any moment the user really likes a song they may listen to the full version on Spotify. 

## Tech Stack

Javascript, Node.js, Express, MongoDB, Mongoose.js, React, Flux, Passport.js, Brain.js, Web Workers, Bluebird, HTML, CSS, Less, Gulp, Karma, Mocha, Chai, Casper.js, Jest, Travis.CI, AWS

## Installing Dependencies & Build Process

Running the following commands installs the dependencies and fires up the server at http://localhost:8000

```bash
npm install
bower install
gulp
```

## Contributing

See [contributing.md](contributing.md) for contribution guidelines.
