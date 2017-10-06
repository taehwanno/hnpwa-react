const path = require('path');

const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

const paths = require('./paths');

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
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|cur)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[path][name].[ext]',
        },
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
