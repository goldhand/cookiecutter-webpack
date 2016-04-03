const path = require("path")
const webpack = require('webpack')

module.exports = {
  context: __dirname,

  entry: {
    'main': '{{ cookiecutter.static_root }}/index',
  },

  output: {
      path: path.resolve('{{ cookiecutter.local_output_path }}'),
      filename: "[name]-[hash].js"
  },

  plugins: [
  ], // add all common plugins here

  module: {
    loaders: [
      {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.(png|jpg|gif)$/, loader: 'url-loader', query: {limit: 8192}},  // inline base64 URLs <=8k
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader'},
    ] // add all common loaders here
  },
}
