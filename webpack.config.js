var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3333',
    'webpack/hot/only-dev-server',
    './app/index.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Simply Social',
      template: './index.html',
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('styles/styles.css'),
    new webpack.NoErrorsPlugin()
  ],
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css?sourceMap!autoprefixer-loader?browsers=last 5 version!sass?sourceMap')
      },
      {
        test: /\.html$/,
        loader: 'html'
      }
    ]
  }
};
