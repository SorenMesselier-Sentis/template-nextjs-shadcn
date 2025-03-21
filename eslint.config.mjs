import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { FlatCompat } from '@eslint/eslintrc';

import eslintParserTypescript from '@typescript-eslint/parser';
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginNext from '@next/eslint-plugin-next';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['components/ui/'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: eslintParserTypescript,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
      import: eslintPluginImport,
      '@typescript-eslint': eslintPluginTypescript,
      next: eslintPluginNext,
    },
    rules: {
      'prettier/prettier': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          pathGroups: [
            {
              pattern: '@/locales/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-unresolved': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^ignored',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  },
  {
    files: ['**/*.json'],
    rules: {
      'no-empty': 'off',
    },
  },
];

export default eslintConfig;
