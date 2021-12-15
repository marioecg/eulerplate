const path = require('path')

const webpack = require('webpack')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

const IS_DEVELOPMENT = process.env.NODE_ENV === 'dev'

const app = path.resolve('app')
const assets = path.resolve('assets')
const styles = path.resolve('styles')
const shared = path.resolve('shared')

module.exports = {
  entry: [path.join(app, 'index.js'), path.join(styles, 'index.scss')],

  resolve: {
    alias: {
      '@': app
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          },

          {
            loader: 'css-loader'
          },

          {
            loader: 'postcss-loader'
          },

          {
            loader: 'sass-loader'
          }
        ]
      },

      {
        test: /\.(jpe?g|png|gif|svg|webp)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
          name(file) {
            return '[hash].[ext]'
          }
        }
      },

      {
        test: /\.(woff2?|fnt)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
          name(file) {
            return '[name].[ext]'
          }
        }
      },

      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'raw-loader',
        exclude: /node_modules/
      },

      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'glslify-loader',
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      IS_DEVELOPMENT
    }),

    new CopyWebpackPlugin({
      patterns: [{ from: './shared', to: '' }]
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),

    new CleanWebpackPlugin()
  ],

  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }]
            ]
          }
        }
      })
    ]
  }
}
