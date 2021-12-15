const path = require('path')

const { merge } = require('webpack-merge')

const config = require('./config')

module.exports = merge(config, {
  mode: 'development',

  devtool: 'inline-source-map',

  devServer: {
    devMiddleware: { writeToDisk: true }
  },

  output: {
    path: path.resolve('public')
  }
})