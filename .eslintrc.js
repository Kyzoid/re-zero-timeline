module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': ['error', 140],
    'object-curly-newline': 'off',
    'vue/max-attributes-per-line': [2, {
      'singleline': 20,
      'multiline': {
         'max': 1,
         'allowFirstLine': true
       }
    }],
  },
};
