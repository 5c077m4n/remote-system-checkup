module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	rules: {
		indent: ['warn', 'tab'],
		'no-unused-vars': 'warn',
		indent: ['warn', 'tab'],
		'@typescript-eslint/indent': [
			'warn',
			4,
			{ ignoredNodes: ['TSTypeParameterInstantiation'] },
		],
	},
};