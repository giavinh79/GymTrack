/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:i18n-json/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'simple-import-sort', '@typescript-eslint', 'import', 'jsx-a11y', 'react-hooks', 'prettier'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
        singleQuote: true,
      },
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'i18n-json/identical-keys': [
      2,
      {
        filePath: (function getFilePath() {
          const pathToLocales = './public/locales/en-US';
          const filesArray = fs.readdirSync(pathToLocales);
          return filesArray.reduce((acc, file) => {
            acc[file] = path.resolve(`${pathToLocales}/${file}`);
            return acc;
          }, {});
        })(),
      },
    ],
    'i18n-json/valid-message-syntax': 0,
  },
  settings: {
    react: {
      version: '17',
    },
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^react', '^@?\\w'],
              ['^src(/.*|$)'],
              ['^\\u0000'],
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              ['^.+\\.?(css)$'],
            ],
          },
        ],
      },
    },
  ],
};
