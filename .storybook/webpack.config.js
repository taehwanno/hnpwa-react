const path = require('path');

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
  resolve: {
    alias: {
      assets: paths.assets,
      components: paths.components,
      containers: paths.containers,
      store: paths.store,
    },
  },
};
