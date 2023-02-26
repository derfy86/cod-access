const scss = require('sass');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const port = 8080;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(s?css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: scss,
            },
          },
        ],
      },
    ],
  },

  devServer: {
    historyApiFallback: true,
    compress: true,
    hot: true,
    port,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
  },
});
