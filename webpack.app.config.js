const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'development',
  target: 'web',
  entry: [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    './src/app.tsx',
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
}
