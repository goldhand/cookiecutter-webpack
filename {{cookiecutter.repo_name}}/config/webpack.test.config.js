import webpack from 'webpack';
import baseConfig from './webpack.base.config.js';

// Karma webpack config
module.exports = (opts) => {

  const
    {NODE_ENV} = opts,
    config = baseConfig(opts);

  return {
    devtool: 'inline-source-map',
    module: config.module,
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV,
        },
      }),
    ],
  };
};
