const path = require('path');

const root = __dirname;
const app = path.resolve(root, 'app');
const build = path.resolve(root, 'build');
const functions = path.resolve(root, 'functions');
const publicDir = path.resolve(root, 'public');
const server = path.resolve(root, 'server');

const assets = path.resolve(app, 'assets');
const components = path.resolve(app, 'components');
const containers = path.resolve(app, 'containers');
const pages = path.resolve(app, 'pages');
const store = path.resolve(app, 'store');
const test = path.resolve(app, 'test');

module.exports = {
  root,
  app,
  build,
  functions,
  public: publicDir,
  server,

  assets,
  components,
  containers,
  pages,
  store,
  test,
};
