const path = require('path');

const root = __dirname;
const app = path.resolve(root, 'app');
const build = path.resolve(root, 'build');
const publicDir = path.resolve(root, 'public');

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
  public: publicDir,

  assets,
  components,
  containers,
  pages,
  store,
  test,
};
