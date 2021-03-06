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
    react: {
      version: '16.9',
    },
  },
  plugins: ['react', 'react-hooks'],
  parser: 'babel-eslint',
  // https://cloud.tencent.com/developer/chapter/12618
  // https://eslint.org/
  rules: {
    'no-console': [2, { allow: ['warn', 'error', 'log'] }],
    'react/jsx-props-no-spreading': 0,
    'no-param-reassign': 0,
    'react/jsx-wrap-multilines': ['error', { declaration: false, assignment: false }],
    'import/prefer-default-export': [0],
    'no-restricted-globals': ['error', 'event'],
    'react/prop-types': [0],
  },
};
