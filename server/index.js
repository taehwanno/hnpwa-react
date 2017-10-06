const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const express = require('express');

const app = express();
const render = require('./render').default;
const paths = require('../paths');

const template = fs.readFileSync(path.join(paths.build, 'index.html'), { encoding: 'utf-8' });

global.fetch = fetch;

app.use(express.static(paths.build));

app.get('*', (req, res) => {
  const rendered = render(req.path);

  res.send(template.replace(
    '<div id="root"></div>',
    `<div id="root">${rendered}</div>`,
  ));
});

app.listen(3000);
