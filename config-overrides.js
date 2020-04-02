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
);
