const
  path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin');


const HTML_WEBPACK_OPTIONS = {
  main: {
    title: '{{ cookiecutter.project_name }}',
    template: '{{ cookiecutter.static_root }}/templates/default.ejs',
    inject: false,
    appMountId: 'main',
  },
};

module.exports = (opts) => {

  return {
    context: opts.projectRoot,

    entry: {
      main: path.resolve(opts.projectRoot, '{{ cookiecutter.static_root }}/index'),
    },

    output: {
      path: path.resolve(opts.projectRoot, '{{ cookiecutter.local_output_path }}'),
      filename: '[name]-[hash].js',
    },

    plugins: [
      new HtmlWebpackPlugin(HTML_WEBPACK_OPTIONS.main),
      // shared stuff between chuncks
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: 'vendor-[hash].js',
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: opts.nodeEnv,
          PUBLIC_PATH: opts.publicPath,
        },
      }),
    ], // add all common plugins here

    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loaders: ['babel-loader'],
        },
        {
          test: /\.ejs$/,
          loader: 'ejs',
          query: {
            includePaths: [
              path.resolve(opts.projectRoot, '{{ cookiecutter.static_root }}/templates/'),
            ],
          },
        },
        {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
        {test: /\.css$/, loader: 'style-loader!css-loader'},
        {test: /\.(png|jpg|gif)$/, loader: 'url-loader', query: {limit: 8192}},  // inline base64 URLs <=8k
        {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader'},
      ], // add all common loaders here
    },

    resolve: {
      extensions: ['', '.js', '.jsx'],
      modules: [
        path.resolve(opts.projectRoot, '{{ cookiecutter.static_root }}'),
        'node_modules',
      ],
    },
  };
};
