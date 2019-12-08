'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');

const production = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          filename: '[name].[hash:8].bundle.js'
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
      },
    })
  ]
};

module.exports = production;
