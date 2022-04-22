const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.config.common')
const path = require('path')
const root = path.resolve(__dirname, '../')

const config = {
  mode: 'development',
    entry: `${root}/src/main.tsx`,
  output: {
    path: `${root}/dist`,
    filename: '[name]_[chunkhash].bundle.js',
    publicPath: '/'
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
              sourceMap: true,
              modules: {
                auto: /\.module\.\w+$/i,
                exportLocalsConvention: 'camelCase'
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/static/index.html',
    })
  ],
  devServer: {
    port: 3000
  },
}

module.exports = merge(common, config)