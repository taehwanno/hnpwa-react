const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const paths = require('./paths');

module.exports = {
  entry: path.resolve(paths.app, 'server.jsx'),
  target: 'node',
  output: {
    path: paths.functions,
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs2',
  },
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
  module: {
    strictExportPresence: true,
    rules: [
      {
        exclude: /\.(jsx?|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|cur)$/,
        loader: 'ignore-loader',
      },
      {
        test: /\.jsx?$/,
        include: paths.app,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|cur)$/,
        loader: 'file-loader',
        options: {
          emitFile: false,
          name: 'assets/[hash].[ext]',
        },
      },
    ]
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      '__DEV__': process.env.NODE_ENV === 'development',
      '__PROD__': process.env.NODE_ENV === 'production',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]
};
