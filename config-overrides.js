const path = require('path');

/* eslint-disable import/no-extraneous-dependencies */
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addWebpackExternals,
  addWebpackModuleRule,
  // addBundleVisualizer,
} = require('customize-cra');

const theme = require('./antd.theme');

const eslintConfig = require('./.eslintrc.js');

const useEslintConfig = (configRules) => (config) => {
  config.module.rules = config.module.rules.map((rule) => {
    if (rule.use && rule.use.some((use) => use.options && use.options.useEslintrc !== 0)) {
      const ruleUse = rule.use[0];
      const baseOptions = ruleUse.options;
      const baseConfig = baseOptions.baseConfig || {};
      ruleUse.options = {
        useEslintrc: false,
        ignore: true,
        baseConfig: { ...baseConfig, ...configRules },
      };
      return rule;
    }
    return rule;
  });
  return config;
};

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addWebpackExternals(), // cdn
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: theme(),
    },
  }),
  //  addBundleVisualizer(),
  addWebpackAlias({
    '@': path.resolve(__dirname, './src/'),
  }),
  useEslintConfig(eslintConfig),
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
