const
  path = require('path'),
  webpack = require('webpack'),
  {% if cookiecutter.existing_project == 'y' -%}
  BundleTracker = require('webpack-bundle-tracker'),
  {%- endif %}

  config = require('./webpack.base.config.js');


{% if cookiecutter.existing_project == 'y' -%}config.output.publicPath = 'http://localhost:8080/bundles/';
{% endif -%}

config.plugins = config.plugins.concat([
  new webpack.NoErrorsPlugin(),
  {% if cookiecutter.existing_project == 'y' -%}
  new BundleTracker({filename: './webpack-stats.json'}),
  {%- endif %}
]);
// local plugins here
config.module.loaders.push(
);

module.exports = config;
