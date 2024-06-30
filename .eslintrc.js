module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ['eslint-plugin-prettier', 'unicorn'],
  env: {
    node: true,
    es6: true,
    mocha: true,
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'prefer-const': 2,
    'no-var': 2,
    'no-unused-vars': 'error',
    quotes: [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
    'class-methods-use-this': 0,
    'object-curly-spacing': [2, 'always'],
    semi: 2,
    'no-restricted-syntax': 0,
    'space-before-function-paren': 0,
    'quote-props': ['error', 'as-needed'],
    'require-atomic-updates': 0,
    'one-var': ['error', 'never'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['if', 'while', 'for'], next: '*' },
      { blankLine: 'always', prev: '*', next: 'function' },
    ],
    'unicorn/prefer-date-now': 'error',
  },
};
