module.exports = {
  extends: ['airbnb', 'prettier'],
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  plugins: ['react', 'react-hooks'],
  parser: 'babel-eslint',
  rules: {
    'no-console': [2, { allow: ['warn', 'error'] }],
  },
};
