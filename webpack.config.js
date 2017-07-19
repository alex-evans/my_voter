const webpack = require('webpack')
const path = require('path')
const bootstrapEntryPoints = require('./webpack.bootstrap.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

const cssDev = [
  'style-loader',
  'css-loader?sourceMap',
  'sass-loader',
]

const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [
    'css-loader',
    'sass-loader',
  ],
  publicPath: '/dist'
})

const cssConfig = isProd ? cssProd : cssDev
const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev

const config = {
  entry: {
    app: './src/app.js',
    bootstrap: bootstrapConfig
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: cssConfig
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { modules: false }]
            ]
          }
        }]
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { modules: false }]
            ]
          }
        }]
      },
      { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery' },
      { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
      { test: /\.(ttf|eot)$/, loader: 'file-loader' }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    stats: 'errors-only',
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new ExtractTextPlugin({
      filename: '/css/[name].css',
      disable: !isProd,
      allChunks: true
    })
  ]
}

module.exports = config
