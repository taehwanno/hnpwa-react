const path = require('path');

const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

const paths = require('./paths');

const workboxSWFilename = () => {
  const pkgPath = path.resolve(__dirname, 'node_modules/workbox-sw/package.json');
  const pkgVersion = require(pkgPath).version;
  const environment = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
  return `workbox-sw.${environment}.v${pkgVersion}.js`;
};

module.exports = {
  entry: {
    vendor: [
      'classnames',
      'immutable',
      'normalize.css',
      'react',
      'prop-types',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'react-router-redux',
      'redux',
      'redux-immutable',
      'redux-thunk',
      'reselect',
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          paths.app,
        ],
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
      },
    ],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new CopyWebpackPlugin([
      {
        from: `node_modules/workbox-sw/build/importScripts/${workboxSWFilename()}`,
        to: 'workbox-sw.js',
      },
    ]),
    new PreloadWebpackPlugin({
      rel: 'preload',
      fileBlacklist: [/\.map/, /\.hot-update\.js$/],
      include: ['app', 'vendor'],
    }),
    new PreloadWebpackPlugin(({
      rel: 'prefetch',
      include: ['feed', 'item', 'user'],
    })),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      '__DEV__': process.env.NODE_ENV === 'development',
      '__PROD__': process.env.NODE_ENV === 'production',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    alias: {
      assets: paths.assets,
      components: paths.components,
      containers: paths.containers,
      pages: paths.pages,
      store: paths.store,
    },
    extensions: ['.js', '.jsx'],
  },
  stats: {
    colors: true,
    reasons: true,
  },
};
