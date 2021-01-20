const path = require('path')

const resolve = dir => {
	return path.join(__dirname, dir)
}

// const CompressionPlugin = require('compression-webpack-plugin')

const { name, version } = require('./package.json')

module.exports = {
	// 静态资源引用路径
	publicPath: './',

	// 打包目录
	outputDir: `dist/${name}_${version}`,

	// webpack文件处理目录
	assetsDir: 'pack',

	// 如果你不需要使用eslint，把lintOnSave设为false即可
	lintOnSave: 'default',

	// 开发服务配置
	devServer: {
		open: false, // 自动打开页面
		// host: 'localhost', // 主机名，也可以127.0.0.0 || 做真机测试时候 0.0.0.0
		port: 9700, // 端口号，默认8080
		https: false, // 协议
		hotOnly: false, // 没啥效果，热模块，webpack已经做好了
		overlay: {
			warnings: true,
			errors: true
		}
		// 代理相关
		/*proxy: {
	        '/': {
	            target: 'https://58.144.147.140:443',
	            ws: true,
	            changOrigin: true,
	            secure: false,
	        }
	    }*/
	},

	// 打包时不生成.map文件
	productionSourceMap: false,

	// 处理依赖包的兼容性
	transpileDependencies: ['echarts', 'tree-table-vue', 'debug'],

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
			.set('@', resolve('src'))
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
