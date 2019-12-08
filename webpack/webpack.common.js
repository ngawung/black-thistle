const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const paths = require('./paths');

module.exports = {
  context: paths.src,
  entry: {
    app: `./scripts/index.js`,
    less: `./stylesheets/main.less`
  },
  output: {
    filename: `scripts/[name].[hash:8].js`,
    path: paths.build,
    chunkFilename: '[name].[hash:8].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'stylesheets/[name].[hash:8].css',
    }),
    new CopyWebpackPlugin([{ from: paths.static }]),
  ],
  
};
