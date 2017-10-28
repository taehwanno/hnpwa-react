const path = require('path');

const {
  DefinePlugin,
  NamedModulesPlugin,
  NoEmitOnErrorsPlugin,
} = require('webpack');

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

const paths = require('./paths');

module.exports = {
  entry: {
    vendor: [
      'classnames',
      'immutable',
      'react',
      'prop-types',
      'react-dom',
      'react-redux',
      'redux',
      'redux-immutable',
      'redux-thunk',
      'reselect',
      'transit-immutable-js',
      'whatwg-fetch',
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
    new PreloadWebpackPlugin({
      rel: 'preload',
      fileBlacklist: [/\.map/, /\.hot-update\.js$/],
      include: ['app', 'runtime', 'vendor'],
    }),
    new PreloadWebpackPlugin(({
      rel: 'prefetch',
      include: ['feed', 'item', 'user'],
    })),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      '__DEV__': process.env.NODE_ENV === 'development',
      '__PROD__': process.env.NODE_ENV === 'production',
    }),
    new NamedModulesPlugin(),
    new NoEmitOnErrorsPlugin(),
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
