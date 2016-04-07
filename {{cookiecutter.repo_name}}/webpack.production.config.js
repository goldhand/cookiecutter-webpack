const
  path = require('path'),
  webpack = require('webpack'),
  {% if cookiecutter.existing_project == 'y' -%}
  BundleTracker = require('webpack-bundle-tracker'),
  {%- endif %}

  config = require('./webpack.base.config.js');


config.output.path = path.resolve('{{ cookiecutter.production_output_path }}')
config.output.publicPath = 'https://s3.amazonaws.com/';

config.plugins = config.plugins.concat([

  // removes a lot of debugging code in React
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
  }}),
  {% if cookiecutter.existing_project == 'y' %}
  // production bundle
  new BundleTracker({filename: './webpack-stats-production.json'}),
  {% endif %}
  // minifies your code
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  })
])


module.exports = config;
