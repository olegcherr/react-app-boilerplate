const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  entry: './src/server.tsx',
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
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
