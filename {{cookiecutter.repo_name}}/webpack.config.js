/**
 * The main webpack configuration.
 *
 * By default webpack commands will look for this file unless the --config [path] argument is used.
 * This config routes to other configs using, process.env.NODE_ENV to determine which config is being requested.
 *
 * Adding more configs:
 *  Just add the NODE_ENV=<config> prefix to your command or export to the environment.
 *  Add a case for your <config> value that returns the path to your config file.
 *
 * @returns {object} - returns a webpack config object
 */
const OPTIONS = {
  projectRoot: __dirname,
  nodeEnv: JSON.stringify(process.env.NODE_ENV),
  cdnPath: JSON.stringify(process.env.CDN_PATH),
  htmlWebpackOptions: {
    main: {
      title: '{{ cookiecutter.project_name }}',
      template: '{{ cookiecutter.static_root }}/templates/default.ejs',
      inject: false,
      appMountId: 'main',
    },
  },
};

module.exports = (() => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return require('./config/webpack.production.config.js');
    case 'local':
      return require('./config/webpack.local.config.js');
    default:
      return require('./config/webpack.local.config.js');
  }
})()(OPTIONS);
