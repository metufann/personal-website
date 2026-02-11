import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: (() => {
        // Work around a known `globals` data typo: "AudioWorkletGlobalScope " (trailing space)
        const g = { ...globals.browser }
        delete g['AudioWorkletGlobalScope ']
        g.AudioWorkletGlobalScope = false
        return g
      })(),
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // `motion` is commonly used only in JSX as `<motion.div />` which ESLint core can
      // incorrectly flag as unused in some setups; ignore it while keeping the rule strict.
      'no-unused-vars': ['error', { varsIgnorePattern: '^(motion|[A-Z_])' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
