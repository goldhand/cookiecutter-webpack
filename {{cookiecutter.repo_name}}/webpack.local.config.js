const path = require("path")
const webpack = require('webpack')

const config = require('./webpack.base.config.js');


config.output.filename = '[name].js';

config.plugins = config.plugins.concat([
  new webpack.NoErrorsPlugin(),
])

config.module.loaders.push(
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: ['babel-loader']
  }
)

module.exports = config;