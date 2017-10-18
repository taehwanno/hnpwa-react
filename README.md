# HNPWA with React [![Build Status](https://circleci.com/gh/taehwanno/hnpwa-react/tree/master.svg?style=shield&circle-token=3f589df40a8f9d6303dee73907fbf91f9c09cc38)](https://circleci.com/gh/taehwanno/hnpwa-react/tree/master)

> Hacker News readers as Progressive Web Apps with React, react-router, redux, Immutable.js

Live Demo: https://hnpwa-react.firebaseapp.com/

<div align="center">
  <img width="190" height="388" src="https://user-images.githubusercontent.com/7760903/31730158-0792a2c8-b46c-11e7-908c-1e0a3ad7e5bf.png">
</div>

# Features

- Framework/UI libraries: React, react-router, redux, Immutable.js
- Module Bundling: Webpack
- Service Worker
  - Application Shell
  - Data caching with [Workbox](https://workboxjs.org/)
  - Offline Google Analytics with [`workbox-google-analytics`](https://workboxjs.org/reference-docs/latest/module-workbox-google-analytics.html)
- Performance Patterns
  - Server-side data pre-fetching
  - Route-based chunking
  - Preload / Prefetch resources
- Hosting: Firebase
- Server Side Rendering with Google Cloud Functions

# Prerequisites

- node `v8.5.0`
- [yarn](https://yarnpkg.com/lang/en/)
- [bundler](http://bundler.io/)

```bash
$ git clone https://github.com/taehwanno/hnpwa-react.git
$ cd hnpwa-react
$ yarn install
$ bundle install
$ cd functions && yarn install && cd ..
```

# Scripts

```bash
# Run webpack-dev-server at 8080 port
$ yarn start

# Analyze bundle with webpack-bundle-analyzer
$ yarn analyze

# Lint with `eslint`, `scss-lint`
$ yarn lint
$ yarn lint:js
$ yarn lint:scss

# Test
$ yarn test
$ yarn test:watch
$ yarn test:coverage

# Build for client, server bundle
$ yarn build
$ yarn build:client
$ yarn build:server

# Run storybook at 9001 port
$ yarn storybook
```

# License

MIT © [Taehwan, No](https://github.com/taehwanno)
