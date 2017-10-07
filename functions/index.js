const path = require('path');
const functions = require('firebase-functions');
const fetch = require('node-fetch');
const express = require('express');
const serialize = require('serialize-javascript');

const app = express();
const render = require('./server.bundle').default;

global.fetch = fetch;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('*', (req, res) => {
  const staticContext = {};

  render(req.path, staticContext)
    .then(({ markup, state }) =>
      res.render('index', { markup, state: serialize(state) }));
});

exports.app = functions.https.onRequest(app);
