import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  { ignores: ['dist/**', 'storybook-static/**', 'node_modules/**'] },
  {
    files: ['src/**/*.{js,jsx}', 'browser-tests/**/*.mjs', '.storybook/**/*.js', 'vite.config.js'],
    languageOptions: {
      ecmaVersion: 'latest', sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'no-undef': 'error', 'no-unused-vars': ['error', { varsIgnorePattern: '^React$' }],
      complexity: ['error', { max: 10 }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
];
