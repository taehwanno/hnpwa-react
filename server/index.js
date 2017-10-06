const path = require('path');
const fetch = require('node-fetch');
const express = require('express');
const serialize = require('serialize-javascript');

const app = express();
const render = require('./render').default;
const paths = require('../paths');

global.fetch = fetch;

app.set('view engine', 'ejs');
app.set('views', path.resolve(paths.build, 'views'));
app.use(express.static(paths.build));

app.get('*', (req, res) => {
  const staticContext = {};
  const { markup, state } = render(req.path, staticContext);
  res.render('index', { markup, state: serialize(state) });
});

app.listen(3000);
