const nodeExternals = require('webpack-node-externals')
const path = require('path')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ReactRefreshTypeScript = require('react-refresh-typescript')
const BrowserHmrPlugin = require('./dev_tools/browserHmrPlugin')
const ServerStartPlugin = require('./dev_tools/serverStartPlugin')

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = [
  {
    mode: isDevelopment ? 'development' : 'production',
    target: 'web',
    entry: './src/app.tsx',
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, 'dist'),
    },
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
                  before: [isDevelopment && ReactRefreshTypeScript()].filter(
                    Boolean,
                  ),
                }),
                transpileOnly: isDevelopment,
              },
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]@[local]--[hash:base64:5]',
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|webp)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/i,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                svgoConfig: {
                  plugins: ['removeXMLNS', 'removeDimensions', 'sortAttrs'],
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      isDevelopment && new BrowserHmrPlugin(),
      isDevelopment && new ReactRefreshPlugin(),
    ].filter(Boolean),
  },
  {
    mode: isDevelopment ? 'development' : 'production',
    target: 'node',
    entry: './src/server.tsx',
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    externals: [nodeExternals()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [isDevelopment && new ServerStartPlugin()].filter(Boolean),
  },
]
