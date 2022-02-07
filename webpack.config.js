const nodeExternals = require('webpack-node-externals')
const path = require('path')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ReactRefreshTypeScript = require('react-refresh-typescript')
const BrowserHmrPlugin = require('./dev-utils/browserHmrPlugin')
const ServerStartPlugin = require('./dev-utils/serverStartPlugin')

module.exports = [
  {
    mode: 'development',
    target: 'web',
    entry: './src/app.tsx',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('ts-loader'),
              options: {
                getCustomTransformers: () => ({
                  before: [ReactRefreshTypeScript()],
                }),
                transpileOnly: true,
              },
            },
          ],
        },
      ],
    },
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [new BrowserHmrPlugin(), new ReactRefreshPlugin()],
  },
  {
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
      clean: true,
    },
    plugins: [new ServerStartPlugin()],
  },
]
