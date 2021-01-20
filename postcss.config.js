module.exports = {
	plugins: {
		// 默认开启了 autoprefixer
		'postcss-pxtorem': {
			rootValue: 1920 / (1024 / 12),
			propList: ['*'],
			selectorBlackList: ['*']
		}
	}
}
