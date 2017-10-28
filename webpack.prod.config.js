const path = require('path');

const { optimize, LoaderOptionsPlugin } = require('webpack');
const {
  ModuleConcatenationPlugin,
} = optimize;

const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CSSOWebpackPlugin = require('csso-webpack-plugin').default;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const paths = require('./paths');
const webpackBaseConfig = require('./webpack.base.config');

module.exports = webpackMerge(webpackBaseConfig, {
  entry: {
    app: path.resolve(paths.app, 'client.jsx'),
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
        exclude: /node_modules\/(?!(autotrack|dom-utils))/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|cur)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[hash].[ext]',
        },
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
  plugins: [
    new CleanWebpackPlugin(['build/*'], {
      dry: false,
      verbose: true,
    }),
    new CopyWebpackPlugin([
      {
        context: paths.public,
        from: '*.*',
        ignore: ['service-worker.js'],
      },
    ]),
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
    new ExtractTextPlugin({
      allChunks: true,
      filename: 'app.bundle-[chunkhash].css',
    }),
    new CSSOWebpackPlugin(),
    new LoaderOptionsPlugin({ minimize: true, debug: false }),
    new ModuleConcatenationPlugin(),
    new UglifyJsPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      minRatio: 0.8,
    }),
    new WorkboxWebpackPlugin({
      swSrc: 'public/service-worker.js',
      swDest: 'build/service-worker.js',
      globPatterns: ['**/*.{html,js,css,png,jpg,json}'],
      globIgnores: ['**/service-worker.js', 'index.html', 'workbox-sw.js'],
    }),
  ],
});
