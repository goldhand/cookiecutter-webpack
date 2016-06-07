const
  webpack = require('webpack'),
  ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin'),{% if cookiecutter.existing_project == 'y' %}
  BundleTracker = require('webpack-bundle-tracker'),{% endif %}

  config = require('./webpack.base.config.js');


{% if cookiecutter.existing_project == 'y' -%}config.output.publicPath = 'http://localhost:8080/bundles/';
{% endif -%}

config.plugins = config.plugins.concat([
  new ForceCaseSensitivityPlugin(),  // OSX wont check but other unix os will
  new webpack.NoErrorsPlugin(),{% if cookiecutter.existing_project == 'y' %}
  // local bundle stats file
  new BundleTracker({filename: './webpack-stats.json'}),
{% endif %}
]);
// local plugins here
config.module.loaders.push(
  // lint in our local server
  {test: /(\.jsx|\.js)$/, loader: 'eslint-loader', exclude: /node_modules/}
);

module.exports = config;
