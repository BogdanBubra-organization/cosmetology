module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:json/recommended',
    'airbnb',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['~components', './src/components'],
          ['~containers', './src/containers'],
          ['~contexts', './src/contexts'],
          ['~pages', './src/pages'],
          ['~hooks', './src/hooks'],
          ['~styles', './src/styles'],
          ['~img', './src/assets/img'],
          ['~fonts', './src/assets/fonts'],
          ['~images', './src/images'],
          ['~utils', './src/utils'],
          ['~routes', './src/routes.js'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'arrow-body-style': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'warn',
    'react/forbid-prop-types': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'id-match': [
      'error',
      '^[a-zA-Z0-9_$]*$',
      {
        properties: true,
        onlyDeclarations: false,
      },
    ],
  },
}
