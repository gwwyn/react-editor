const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        //Typescript
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },

      {
        //SVG-icons
        test: /\.svg$/i,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
  },
}
