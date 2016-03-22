var path = require("path")
var webpack = require('webpack')

var config = require('./webpack.base.config.js')
// uncomment these lines to use webpack dev server and hot module reloading
// config.entry = [
//   'webpack-dev-server/client?http://localhost:8080',
//   'webpack/hot/only-dev-server',
//   './assets/js/index'
// ]
// config.output.publicPath = 'http://localhost:8080/assets/bundles/' // override django's STATIC_URL for webpack bundles
config.output.filename = '[name].[ext]';  // prevent to many bundles from being made

// Add HotModuleReplacementPlugin and BundleTracker plugins
config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
])

// Add a loader for JSX files with react-hot enabled
// config.module.loaders.push(
  // { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel-loader'] }
// )

module.exports = config;
