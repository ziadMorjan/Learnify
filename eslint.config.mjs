import js from '@eslint/js';
import next from 'eslint-config-next';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import unusedImports from 'eslint-plugin-unused-imports';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default [
  {
    ignores: ['.next/', 'node_modules/', 'dist/', 'build/'],
  },

  js.configs.recommended,
  ...next,
  {
    plugins: {
      prettier: pluginPrettier,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',

      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      'no-console': ['warn', { allow: ['warn', 'error'] }],

      'prettier/prettier': ['error'],
    },
  },

  prettier,
];
