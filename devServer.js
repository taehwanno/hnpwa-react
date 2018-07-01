const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const MemoryFileSystem = require('memory-fs');
const fetch = require('node-fetch');
const express = require('express');
const ejs = require('ejs');
const serialize = require('serialize-javascript');
const requireFromString = require('require-from-string');

const paths = require('./paths.js');
const app = express();
const clientConfig = require('./webpack.dev.config')();
const serverConfig = require('./webpack.server.config');
const clientCompiler = webpack(clientConfig);
const serverCompiler = webpack(serverConfig);

global.fetch = fetch;

let clientReady;
let serverReady;
const serverPromise = new Promise((resolve) => { serverReady = resolve; });
const clientPromise = new Promise((resolve) => { clientReady = resolve; });
const allEnvironmentReady = Promise
  .all([clientPromise, serverPromise])
  .then(() => console.info('All bundling process complete'));

let render;
let indexView;

const clientMfs = new MemoryFileSystem();
clientCompiler.outputFileSystem = clientMfs;
clientCompiler.plugin('done', (stats) => {
  stats = stats.toJson();
  if (stats.errors.length) return;

  indexView = clientMfs.readFileSync(path.join(paths.functions, 'views/index.ejs'), 'utf-8');
  clientReady();
});

const serverMfs = new MemoryFileSystem();
serverCompiler.outputFileSystem = serverMfs;
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err;
  stats = stats.toJson();
  if (stats.errors.length) return;

  const bundle = serverMfs.readFileSync(path.join(serverConfig.output.path, 'server.bundle.js'), 'utf-8');
  render = requireFromString(bundle).default;
  serverReady();
});

app.use(webpackDevMiddleware(clientCompiler, { noInfo: true, publicPath: clientConfig.output.publicPath }));
app.use(webpackHotMiddleware(clientCompiler, { heartbeat: 5000 }));

app.get('/', (req, res) => {
  res.redirect(301, '/news/1');
});

app.get('*', (req, res) => {
  allEnvironmentReady.then(() => {
    render(req.url)
      .then(({ markup, state }) =>
        res.send(ejs.render(indexView, { markup, state: serialize(state) })))
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.info(`server started at localhost:${port}`);
});
