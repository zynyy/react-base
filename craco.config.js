const path = require('path');

/* eslint-disable import/no-extraneous-dependencies */
const CracoLessPlugin = require('craco-less');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const theme = require('./antd.theme');

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  babel: {
    plugins: [
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true,
        },
      ],
    ],
  },
  webpack: {
    alias: {
      '@/': resolve('src'),
    },
    plugins: [new BundleAnalyzerPlugin(), new CompressionWebpackPlugin()],
    configure: {
      optimization: {
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true,
              },
            },
          }),
        ],
      },
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          modifyVars: theme(),
          javascriptEnabled: true,
        },
      },
    },
  ],
};
