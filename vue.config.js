const path = require('path')

const resolve = dir => {
	return path.join(__dirname, dir)
}

// const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
	// 打包目录
	outputDir: 'dist/iview-admin-template-pro',

	// webpack文件处理目录
	assetsDir: 'pack',

	// 静态资源引用路径
	publicPath: './',

	//默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
	filenameHashing: true,

	// 开发服务配置
	devServer: {
		open: false, // 自动打开页面
		// host: 'localhost', // 主机名，也可以127.0.0.0 || 做真机测试时候 0.0.0.0
		port: 9700, // 端口号，默认8080
		https: false, // 协议
		hotOnly: false // 没啥效果，热模块，webpack已经做好了
		// 代理相关
		/*proxy: {
	    	'/api': 'http://localhost:3000'
	    }*/
	},

	// 打包时不生成.map文件
	productionSourceMap: false,

	// 如果你不需要使用eslint，把lintOnSave设为false即可
	lintOnSave: false,

	// 处理依赖包的兼容性
	transpileDependencies: ['webpack-dev-server/client', 'echarts', 'tree-table-vue', 'debug'],

	// css相关
	css: {
		loaderOptions: {
			less: {
				lessOptions: {
					javascriptEnabled: true
				}
			},
			stylus: {
				// 导入全局 styl
				import: '~@/assets/style/global.styl'
			}
		},
		extract: false
	},

	// 可视化优化检查
	pluginOptions: {
		webpackBundleAnalyzer: {
			openAnalyzer: false,
			analyzerPort: 9701
		}
	},

	chainWebpack: config => {
		config.resolve.alias
			.set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
			.set('@@', resolve('public'))
			.set('_c', resolve('src/components'))
			.set('@c', resolve('src/components'))
			.set('@v', resolve('src/views'))
	}

	// GZ压缩
	/*configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			return {
				plugins: [
					new CompressionPlugin({
						filename: '[path].br[query]',
						algorithm: 'brotliCompress',
						test: /\.(js|css|html|svg)$/,
						compressionOptions: { level: 11 },
						threshold: 10240,
						minRatio: 0.8,
						deleteOriginalAssets: false,
					}),
				]
			}
		}
	}*/
}
