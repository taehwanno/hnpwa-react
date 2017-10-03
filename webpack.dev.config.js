const path = require('path');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const paths = require('./paths');
const webpackBaseConfig = require('./webpack.base.config');

module.exports = () => {
  return webpackMerge(webpackBaseConfig, {
    cache: true,
    entry: {
      app: [
        'babel-polyfill',
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://0.0.0.0:8080',
        'webpack/hot/only-dev-server',
        './app/index.jsx',
      ],
    },
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      path: paths.build,
      pathinfo: true,
      publicPath: '/',
    },
    devServer: {
      contentBase: paths.public,
      historyApiFallback: true,
      hot: true,
      port: 8080,
    },
    devtool: 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
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
              },
            }
          ],
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor'],
        filename: '[name].bundle.js',
        minChunks: Infinity,
      }),
    ],
  });
};
