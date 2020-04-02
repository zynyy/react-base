module.exports = {
  extends: ['airbnb', 'prettier'],
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  settings: {
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: {
          '@': './src',
        },
        extensions: ['.js', '.jsx', '.json', '.svg'],
      },
    },
  },
  plugins: ['react', 'react-hooks'],
  parser: 'babel-eslint',
  rules: {
    'no-console': [2, { allow: ['warn', 'error'] }],
  },
};
