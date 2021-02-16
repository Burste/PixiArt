module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true,
    es6: true
  },
  extends: [
    'standard',
    'standard-react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/react-in-jsx-scope': 'off',
    'comma-dangle': 'off',
    'generator-star-spacing': 'off',
    'no-underscore-dangle': 'off',
    'array-callback-return': 'off',
    'space-before-function-paren': 'off',
    camelcase: 'off',
    semi: [2, 'never'],
    'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'padded-blocks': 'off',
    'no-console': 'off',
    'object-property-newline': 'off',
    'no-use-before-define': ['error', { functions: true, classes: true }],
    'max-len': ['error', { code: 200, tabWidth: 2 }],
    'react/prop-types': 0,
  },
}
