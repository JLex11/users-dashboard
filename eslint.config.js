import { fixupConfigRules } from '@eslint/compat'
import pluginJs from '@eslint/js'
import tanstack from '@tanstack/eslint-plugin-query'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import tailwind from 'eslint-plugin-tailwindcss'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  ...tailwind.configs['flat/recommended'],
  ...tanstack.configs['recommended'],
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      quotes: ['error', 'single'],
      semi: ['error', 'never']
    }
  }
]
