const
  path = require('path'),
  webpack = require('webpack'),{% if cookiecutter.existing_project == 'y' %}
  BundleTracker = require('webpack-bundle-tracker'),{% endif %}

  baseConfig = require('./webpack.base.config.js');


module.exports = (opts) => {

  const config = baseConfig(opts);

  if (opts.cdnPath) {
    // set CDN_PATH to your cdn static file directory
    config.output.publicPath = `${opts.cdnPath}/{{ cookiecutter.production_output_path }}`;

  }

  config.output.path = path.resolve(__dirname, '{{ cookiecutter.production_output_path }}');

  config.plugins = config.plugins.concat([
{% if cookiecutter.existing_project == 'y' -%}
    // production bundle stats file
    new BundleTracker({filename: './webpack-stats-production.json'}),
{%- endif %}
    // pass options to uglify
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    // minifies your code
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: false,
    }),
  ]);

  return config;
};
