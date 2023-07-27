/*
 * @Author: bamboo
 * @Description: eslint
 * @Date: 2023-04-07 18:42:57
 * @LastEditors: Do not Edit
 * @LastEditTime: 2023-04-11 10:35:31
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
  settings: {
    react: {
      version: '18.2.0',
    },
  },
};
