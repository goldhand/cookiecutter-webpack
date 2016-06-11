/**
 * Testing configuration
 *
 * Setup:
 *  - test runner: karma
 *  - assertions: expect (https://github.com/mjackson/expect)
 */

const
  baseConfig = require('./config/webpack.base.config')(
    {PROJECT_ROOT: __dirname}
  );

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      '{{ cookiecutter.static_root }}/**/__tests__/**/*.js',
    ],

    preprocessors: {
      // add webpack as a preprocessor
      '{{ cookiecutter.static_root }}/**/*.js': ['webpack', 'sourcemap'],
      '{{ cookiecutter.static_root }}/**/__tests__/**/*.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      devtool: 'inline-source-map',
      module: baseConfig.module,
    },

    webpackMiddleware: {
      noInfo: true,
    },

    plugins: [
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-mocha',
    ],

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
  });
};
