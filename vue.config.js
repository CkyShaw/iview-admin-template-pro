const path = require('path')

const resolve = dir => {
	return path.join(__dirname, dir)
}

const CompressionPlugin = require('compression-webpack-plugin')

const ESLintPlugin = require('eslint-webpack-plugin')

const StylelintPlugin = require('stylelint-webpack-plugin')

const { name, version } = require('./package.json')

module.exports = {
	// 静态资源引用路径
	publicPath: './',

	// 打包目录
	outputDir: `dist/${name}_${version}`,

	// webpack文件处理目录
	assetsDir: 'pack',

	/**
	 * 因为启用了 eslint-webpack-plugin 不必开启此项
	 */
	lintOnSave: false,

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
				use: [require('nib')(), require('stylus-bem-mixins')()],
				// 导入全局 styl
				import: ['~@/assets/style/global.styl', '~nib/index.styl', 'stylus-bem-mixins']
			}
		},
		extract: false
	},

	// 可视化优化检查
	pluginOptions: {
		webpackBundleAnalyzer: {
			openAnalyzer: false,
			analyzerHost: '0.0.0.0',
			analyzerPort: 9701
		}
	},

	chainWebpack: config => {
		config.resolve.alias
			.set('@', resolve('src'))
			.set('@@', resolve('public'))
			.set('@c', resolve('src/components'))
			.set('@v', resolve('src/view'))

		// 已弃用 转移至 eslint-webpack-plugin
		/*config.module.rule('eslint').use('eslint-loader').options({
			fix: true
		})*/
	},

	configureWebpack: config => {
		// fixOnSave
		if (process.env.NODE_ENV !== 'production') {
			return {
				plugins: [
					new ESLintPlugin({
						extensions: ['js', 'jsx', 'ts', 'vue'],
						cache: true,
						fix: true
					}),
					new StylelintPlugin({
						configFile: './stylelint.config.js',
						customSyntax: 'stylelint-plugin-stylus/custom-syntax',
						files: ['**/*.styl', '**/*.vue'],
						cache: true,
						fix: true
					}),
					new StylelintPlugin({
						configFile: './stylelint.config.normal.js',
						files: ['**/*.css', '**/*.less'],
						cache: true,
						fix: true
					})
				]
			}
		}
		// GZ压缩 nginx配置参考 https://blog.csdn.net/nidynie/article/details/86693780
		if (process.env.NODE_ENV === 'production') {
			return {
				plugins: [
					new CompressionPlugin({
						exclude: /\/iconfont/,
						test: /\.(js|css|json|txt|html|ico|svg|png|jpg|ttf|woff|woff2)(\?.*)?$/i,
						algorithm: 'gzip',
						compressionOptions: { level: 9 },
						threshold: 10240,
						minRatio: 0.8,
						deleteOriginalAssets: false
					})
				]
			}
		}
	}
}
