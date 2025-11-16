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
			// Indentación con tabs en lugar de espacios
			indent: [
				'error',
				'tab',
				{
					SwitchCase: 1,
					VariableDeclarator: { var: 1, let: 1, const: 1 },
					outerIIFEBody: 1,
					MemberExpression: 1,
					flatTernaryExpressions: true,
					// No ignorar comentarios para mantener coherencia
					ignoreComments: false,
				},
			],
			// No mezclar espacios y tabs en la indentación
			'no-mixed-spaces-and-tabs': 'error',
			// Remover 'no-tabs' ya que ahora permitimos tabs
			// No permitir más de 1 línea en blanco consecutiva
			'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
			// No permitir espacios en blanco al final de las líneas, excepto en líneas vacías
			'no-trailing-spaces': ['error', { skipBlankLines: true }],
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
