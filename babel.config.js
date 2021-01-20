module.exports = {
	presets: [
		[
			'@vue/cli-plugin-babel/preset',
			{
				useBuiltIns: 'entry'
			}
		]
	],
	plugins: [
		[
			'import',
			{
				libraryName: 'ant-design-vue',
				libraryDirectory: 'es',
				style: true
			}
		],
		[
			'component',
			{
				libraryName: 'element-ui',
				styleLibraryName: 'theme-chalk'
			}
		],
		[
			'import',
			{
				libraryName: 'view-design',
				libraryDirectory: 'src/components',
				style: false
			},
			'view-design'
		]
	]
}
