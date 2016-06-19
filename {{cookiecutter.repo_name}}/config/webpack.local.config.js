import webpack from 'webpack';
import ForceCaseSensitivityPlugin from 'force-case-sensitivity-webpack-plugin';
{% if cookiecutter.existing_project == 'y' -%}
import BundleTracker from 'webpack-bundle-tracker';
{% endif -%}

import baseConfig from './webpack.base.config.js';


module.exports = (opts) => {

  const config = baseConfig(opts);

  return {
    ...config,
    {% if cookiecutter.existing_project == 'y' -%}
    output: {
      ...config.output,
      publicPath: 'http://localhost:8080/bundles/',
    },
    {% endif -%}
    plugins: [
      ...config.plugins,
      {% if cookiecutter.existing_project == 'y' -%}
      // local bundle stats file
      new BundleTracker({filename: './webpack-stats.json'}),
      {% endif -%}
      new ForceCaseSensitivityPlugin(),  // OSX wont check but other unix os will
      new webpack.NoErrorsPlugin(),
    ],
  };
};
