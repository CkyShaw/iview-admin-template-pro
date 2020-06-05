module.exports = {
	presets: [
		[
			'@vue/cli-plugin-babel/preset',
			{
				// useBuiltIns: 'usage'
				useBuiltIns: 'entry'
			}
		]
	],
	plugins: [
		[
			'component',
			{
				libraryName: 'element-ui',
				styleLibraryName: 'theme-chalk'
			}
		],
		/*[
			'component',
			{
				libraryName: '@/components/native-ui',
				libDir: 'components',
				styleLibraryName: 'theme-default',
				ext: '.styl'
			},
			'@/components/native-ui'
		],*/
		/*[
			'component',
			{
				libraryName: '@/components/business',
				libDir: './',
				style: false
			},
			'@/components/business'
		],*/
		/*[
			'component',
			{
				libraryName: '@/components/singletons',
				libDir: './',
				style: false
			},
			'@/components/singletons'
		],*/
		/*[
			'component',
			{
				libraryName: '@/components/stateless',
				libDir: './',
				style: false
			},
			'@/components/stateless'
		],*/
		[
			'component',
			{
				libraryName: '@/components/iview-dev',
				libDir: 'components',
				style: false
			},
			'@/components/iview-dev'
		],
		/*[
			'component',
			{
				libraryName: '@/components/element-dev',
				libDir: './',
				style: false
			},
			'@/components/element-dev'
		],*/
		// import 暂时不支持本地按需引入
		[
			'import',
			{
				libraryName: 'ant-design-vue',
				libraryDirectory: 'es',
				style: true
			}
		]
		// iview 按需引入接入体积优化有问题
		/*[
			'import',
			{
				libraryName: 'view-design',
				libraryDirectory: 'src/components',
				style: false
			},
			'view-design'
		]*/
	]
}
