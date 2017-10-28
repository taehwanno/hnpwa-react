const path = require('path');

const {
  optimize,
  DefinePlugin,
  NamedModulesPlugin,
  NoEmitOnErrorsPlugin,
} = require('webpack');
const {
  CommonsChunkPlugin,
} = optimize;

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    new HtmlWebpackPlugin({
      template: path.join(paths.app, 'index.ejs'),
      markup: '<div id="root"></div>',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(paths.app, 'index.ejs'),
      filename: path.resolve(paths.functions, 'views/index.ejs'),
      markup: `
        <div id="root"><%- markup %></div>
        <% if (state) { %>
        <script>window.__PRELOADED_STATE__ = <%- state %></script>
        <% } %>
      `,
      inject: false,
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      fileBlacklist: [/\.map/, /\.hot-update\.js$/],
      include: ['app', 'runtime', 'vendor'],
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      '__DEV__': process.env.NODE_ENV === 'development',
      '__PROD__': process.env.NODE_ENV === 'production',
      '__SERVER__': false,
    }),
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => module.resource && (/node_modules/).test(module.resource),
    }),
    new CommonsChunkPlugin({
      chunks: ['analytics'],
      async: 'async-analytics',
      minChunks: module => module.resource && (/node_modules/).test(module.resource),
    }),
    new CommonsChunkPlugin({ name: 'runtime' }),
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
