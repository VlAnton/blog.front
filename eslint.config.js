import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: {
      overrides: {
        'vue/max-attributes-per-line': [
          'error',
          {
            singleline: {
              max: 1,
            },
            multiline: {
              max: 1,
            },
          },
        ],
      },
    },
    typescript: true,
    stylistic: {
      quotes: 'single',
      overrides: {
        'style/space-before-function-paren': ['error', 'always'],
        curly: ['error', 'multi-line'],
        'style/max-statements-per-line': 'off',
        'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      },
    },
  },
  {
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          internalPattern: ['^@/.+'],
          newlinesBetween: 'always',
        },
      ],
      'vue/no-irregular-whitespace': 'off',
      'no-irregular-whitespace': 'off',
    },
    languageOptions: {
      globals: {
        APP_VERSION: true,
      },
    },
  },
  {
    ignores: ['public/'],
  },
)
