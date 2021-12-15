const path = require('path')

const { merge } = require('webpack-merge')

const config = require('./config')

module.exports = merge(config, {
  mode: 'production',

  output: {
    path: path.resolve('public')
  }
})
