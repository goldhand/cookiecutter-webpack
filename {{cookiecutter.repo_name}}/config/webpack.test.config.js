import baseConfig from './webpack.base.config.js';

// Karma webpack config
module.exports = (opts) => {

  const config = baseConfig(opts);

  return {
    ...config,
    devtool: 'inline-source-map',
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {test: /(\.jsx|\.js)$/, loader: 'eslint-loader', exclude: /node_modules/},
      ],
    },
  };
};
