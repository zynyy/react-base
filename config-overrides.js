const path = require('path');

/* eslint-disable import/no-extraneous-dependencies */
const {
  override,
  fixBabelImports,
  addLessLoader,
  useEslintRc,
  addWebpackAlias,
  addWebpackExternals,
  addDecoratorsLegacy,
  addWebpackModuleRule,
} = require('customize-cra');

const theme = require('./antd.theme');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addDecoratorsLegacy(),
  addWebpackExternals(), // cdn
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: theme(),
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, './src/'),
  }),
  useEslintRc('.eslintrc.js'),
  addWebpackModuleRule({
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'babel-loader',
      },
      {
        loader: 'url-loader',
      },
      {
        loader: '@svgr/webpack',
        options: {
          babel: false,
          icon: true,
        },
      },
    ],
  }),
);
