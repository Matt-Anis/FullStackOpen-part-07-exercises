import globals from 'globals'
import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
      ecmaVersion: 'latest',
    },
    rules: {
      eqeqeq: 'error',
    },
  },
  {
    ignores: ['dist/**'],
  },
  prettierConfig,
]
