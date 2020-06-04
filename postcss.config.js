module.exports = {
	plugins: {
		autoprefixer: {},
		'postcss-pxtorem': {
			rootValue: 1920 / (1024 / 12),
			propList: ['*'],
			selectorBlackList: ['*']
		}
	}
}
