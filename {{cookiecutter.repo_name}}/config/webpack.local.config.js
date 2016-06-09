import webpack from 'webpack';
import ForceCaseSensitivityPlugin from 'force-case-sensitivity-webpack-plugin';{% if cookiecutter.existing_project == 'y' %}
import BundleTracker from 'webpack-bundle-tracker';{% endif %}

import baseConfig from './webpack.base.config.js';


module.exports = (opts) => {

  const config = baseConfig(opts);

  return {
    ...config,{% if cookiecutter.existing_project == 'y' %}
    output: {
      ...config.output,
      publicPath: 'http://localhost:8080/bundles/',
    },{% endif %}
    module: {
      ...config.module,
      loaders: [
        ...config.module.loaders,
        // local loaders
        {test: /(\.jsx|\.js)$/, loader: 'eslint-loader', exclude: /node_modules/},
      ],
    },
    plugins: [
      ...config.plugins,
      // local plugins
      new ForceCaseSensitivityPlugin(),  // OSX wont check but other unix os will
      new webpack.NoErrorsPlugin(),{% if cookiecutter.existing_project == 'y' %}
      // local bundle stats file
      new BundleTracker({filename: './webpack-stats.json'}),{% endif %}
    ],
  };
};
