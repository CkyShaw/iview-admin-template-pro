module.exports = {
	root: true,
	env: {
		node: true
	},
	plugins: ['prettier'],
	extends: ['plugin:vue/recommended', '@qif/eslint-config/vue', 'prettier'],
	parserOptions: {
		parser: '@babel/eslint-parser'
	},
	rules: {
		'prettier/prettier': 'warn',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
	}
}
