const path = require('path');

const { optimize, HotModuleReplacementPlugin } = require('webpack');
const {
  CommonsChunkPlugin,
} = optimize;

const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');
const webpackBaseConfig = require('./webpack.base.config');

module.exports = () => {
  return webpackMerge(webpackBaseConfig, {
    cache: true,
    entry: {
      app: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://0.0.0.0:8080',
        'webpack/hot/only-dev-server',
        path.resolve(paths.app, 'client.jsx'),
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
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|cur)$/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
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
      new HotModuleReplacementPlugin(),
      new CopyWebpackPlugin([
        {
          context: paths.public,
          from: '*.*',
        },
      ]),
      new HtmlWebpackPlugin({
        template: path.join(paths.app, 'index.ejs'),
        markup: '<div id="root"></div>',
        inject: false,
      }),
      new CommonsChunkPlugin({
        name: 'vendor',
        filename: '[name].bundle.js',
        minChunks: module => module.resource && (/node_modules/).test(module.resource),
      }),
    ],
  });
};
