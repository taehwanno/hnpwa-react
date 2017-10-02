const path = require('path');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const paths = require('./paths');
const webpackBaseConfig = require('./webpack.base.config');

module.exports = webpackMerge(webpackBaseConfig, {
  entry: {
    app: [
      'babel-polyfill',
      './app/index.jsx',
    ],
  },
  output: {
    filename: '[name].bundle-[chunkhash].js',
    chunkFilename: '[name].bundle-[chunkhash].js',
    path: paths.build,
    publicPath: '/',
    sourceMapFilename: '[name].bundle-[chunkhash].map',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  './app/scss/base/**/_*.scss',
                ],
              }
            }
          ],
        }),
      }
    ],
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new CleanWebpackPlugin(['build/*'], {
      dry: false,
      verbose: true,
    }),
    new ExtractTextPlugin({
      allChunks: true,
      filename: 'app.bundle-[chunkhash].css',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      filename: '[name].bundle-[chunkhash].js',
      minChunks: Infinity,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new UglifyJsPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      minRatio: 0.8,
    }),
  ],
});
