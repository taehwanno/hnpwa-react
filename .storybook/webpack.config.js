const path = require('path');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

const paths = require('../paths');

module.exports = {
  module: {
    rules: [
      {
        test: /\.stories.jsx?$/,
        include: [paths.app],
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
      },
      {
        test: /\.stories.tsx?$/,
        include: [paths.app],
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'tslint-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|cur)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.tsx?$/,
        include: [paths.app],
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          useCache: true,
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?sourceMap',
          'postcss-loader?sourceMap',
          'resolve-url-loader',
          'sass-loader?sourceMap',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                './app/scss/base/**/_*.scss',
              ],
            },
          },
        ]
      },
    ],
  },
  plugins: [
    new TsConfigPathsPlugin(),
  ],
  resolve: {
    alias: {
      assets: paths.assets,
      components: paths.components,
      containers: paths.containers,
      pages: paths.pages,
      store: paths.store,
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
