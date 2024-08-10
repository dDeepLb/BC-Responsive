import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['dist/**/*', 'node_modules/**/*'],
    plugins: { 'style': stylistic },
    rules: {
      'style/indent': ['warn', 2],
      'style/quotes': ['warn', 'single'],
      'style/semi': ['error', 'always'],
      'style/linebreak-style': ['warn', 'unix'],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
    },
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
);
