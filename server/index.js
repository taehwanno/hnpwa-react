const path = require('path');
const fetch = require('node-fetch');
const express = require('express');

const app = express();
const render = require('./render').default;
const paths = require('../paths');

global.fetch = fetch;

app.set('view engine', 'ejs');
app.set('views', path.resolve(paths.build, 'views'));
app.use(express.static(paths.build));

app.get('*', (req, res) => {
  const markup = render(req.path);
  res.render('index', { markup });
});

app.listen(3000);
