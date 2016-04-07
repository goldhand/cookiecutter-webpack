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

module.exports = {
  context: __dirname,

  entry: {
    main: path.resolve(__dirname, '{{ cookiecutter.static_root }}/index'),
  },

  output: {
    path: path.resolve(__dirname, '{{ cookiecutter.local_output_path }}'),
    filename: '[name]-[hash].js',
  },

  plugins: [
    new HtmlWebpackPlugin(HTML_WEBPACK_OPTIONS.main),
  ], // add all common plugins here

  module: {
    loaders: [
      {
        test: /\.ejs$/,
        loader: 'ejs',
        query: {
          includePaths: [
            path.resolve(__dirname, '{{ cookiecutter.static_root }}/templates/'),
          ],
        },
      },
      {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.(png|jpg|gif)$/, loader: 'url-loader', query: {limit: 8192}},  // inline base64 URLs <=8k
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader'},
    ], // add all common loaders here
  },
}
