const
  webpack = require('webpack'),
  ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin'),{% if cookiecutter.existing_project == 'y' %}
  BundleTracker = require('webpack-bundle-tracker'),{% endif %}

  baseConfig = require('./webpack.base.config.js');

module.exports = (opts) => {

  const config = baseConfig(opts);
{% if cookiecutter.existing_project == 'y' %}
  config.output.publicPath = 'http://localhost:8080/bundles/';
{% endif %}
  // local plugins
  config.plugins = config.plugins.concat([
    new ForceCaseSensitivityPlugin(),  // OSX wont check but other unix os will
    new webpack.NoErrorsPlugin(),{% if cookiecutter.existing_project == 'y' %}
    // local bundle stats file
    new BundleTracker({filename: './webpack-stats.json'}),
{%- endif %}
  ]);
  // local loaders
  config.module.loaders.push(
    // lint in our local server
    {test: /(\.jsx|\.js)$/, loader: 'eslint-loader', exclude: /node_modules/}
  );

  return config;
};
