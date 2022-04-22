const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.config.common')
const path = require('path')
const root = path.resolve(__dirname, '../')

const config = {
  mode: 'production',
  entry: `${root}/src/main.tsx`,
  output: {
    path: `${root}/dist`,
    publicPath: '/react-editor/dist',
    filename: '[name]_[chunkhash].bundle.js'
  },
  module: {
    rules: [

      { //Styles
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: /\.module\.\w+$/i,
                exportLocalsConvention: 'camelCase'
              }
            }
          },
          'sass-loader'
        ]
      },

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/static/pages.html',
      filename: '../index.html'
    })
  ]
}

module.exports = merge(common, config)