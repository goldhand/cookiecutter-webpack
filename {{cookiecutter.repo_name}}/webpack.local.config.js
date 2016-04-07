const
  path = require('path'),
  webpack = require('webpack'),
  {% if cookiecutter.existing_project == 'y' -%}
  BundleTracker = require('webpack-bundle-tracker'),
  {%- endif %}

  config = require('./webpack.base.config.js');

{% if cookiecutter.existing_project -%}
config.output.publicPath = 'http://localhost:8080/assets/bundles';
{% endif -%}
config.output.filename = '[name].js';

config.plugins = config.plugins.concat([
  new webpack.NoErrorsPlugin(),
  {% if cookiecutter.existing_project == 'y' -%}
  new BundleTracker({filename: './webpack-stats.json'}),
  {%- endif %}
]);

config.module.loaders.push(
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: ['babel-loader'],
  }
);

module.exports = config;
