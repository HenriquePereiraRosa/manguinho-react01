
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')
const Dotenv = require('dotenv-webpack')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      use: [{ loader: 'style-loader' },
      { loader: 'css-loader', options: { modules: true } },
      { loader: 'sass-loader' }],
      exclude: /node_modules/
    }]
  },
  devtool: 'inline-source-map',
  devServer: {
    devMiddleware: { writeToDisk: true },
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    liveReload: true,
    historyApiFallback: true,
    port: 8080
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './template.dev.html' }),
    new Dotenv({ path: './.env', }),
  ]
})
