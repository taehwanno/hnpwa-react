# HNPWA with React [![Build Status](https://circleci.com/gh/taehwanno/hnpwa-react/tree/master.svg?style=shield&circle-token=3f589df40a8f9d6303dee73907fbf91f9c09cc38)](https://circleci.com/gh/taehwanno/hnpwa-react/tree/master)

> Hacker News readers as Progressive Web Apps with React, React Router, Redux

Live Demo: https://hnpwa-react.firebaseapp.com/

<div align="center">
  <img width="190" height="388" src="https://user-images.githubusercontent.com/7760903/35339511-25858120-0164-11e8-997a-47902e4e8d8d.png">
</div>

# Features

- Framework / UI libraries: React, React Router
- State Management: Redux
- Module Bundling: Webpack
- Service Worker
  - Application Shell
  - Data caching with [Workbox](https://workboxjs.org/)
  - Offline Google Analytics with [workbox-google-analytics](https://workboxjs.org/reference-docs/latest/module-workbox-google-analytics.html)
- Performance Patterns
  - Client-side state & DOM hydration
  - Server-side data pre-fetching
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
# Run dev server at 8080 port
$ yarn start

# Analyze bundle with webpack-bundle-analyzer
$ yarn analyze
$ yarn analyze:cache

# Lint with eslint, scss-lint
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

# Storybook

https://taehwanno.github.io/hnpwa-react/

# License

MIT © [Taehwan, No](https://github.com/taehwanno)
