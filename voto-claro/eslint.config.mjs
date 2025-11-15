import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  // Project specific rules and resolver settings
  {
    rules: {
      // Forzar comillas simples y punto y coma obligatorio
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
    },
    settings: {
      // Hacer que eslint entienda el alias @ basado en `tsconfig.json`
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.mts'],
      },
    }
  }
]);

export default eslintConfig;
