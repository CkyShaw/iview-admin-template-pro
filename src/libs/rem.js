// 反向计算基准大小，保证在1024分辨率下根字体大小为12px（因为chrome最低支持12px，即最小适应分辨率为1024）
const rootFontSize = moduleWidth / (1024 / 12)
// 设置 rem 函数
function setRem() {
	// (勿删除)当前页面宽度相对于 1920 宽的缩放比例，可根据自己需要修改。
	// const scale = document.documentElement.clientWidth / 1920
	// (勿删除)设置页面根节点字体大小
	// document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'

	// 改良版 ——————————————————————————————————————————————————————————————————————————————————

	// 动态根字体
	let currentRootFontSize = document.documentElement.clientWidth / (moduleWidth / rootFontSize)
	// 因为项目是嵌入到父级容器中的一块区域，这块区域如果不是父级容器的宽度，那么子项目还会继续缩放一次
	// 为了保持缩放一致性需要按照父子模块的宽度比例进行调整
	let finalRootFontSize = currentRootFontSize * (containerWidth / moduleWidth)
	document.documentElement.style.fontSize = finalRootFontSize + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
let tid = null
window.addEventListener(
	'resize',
	function () {
		clearTimeout(tid) //防止执行两次
		tid = setTimeout(setRem, 300)
	},
	false
)

/*window.onload = window.onresize = document.onresize = function() {
	setTimeout(() => {
		setRem()
	}, 300)
}*/

/** 这个文件用来动态的给根目录html设置fontSize
 * 在main的js内引入这个文件
 * 然后再npm安装postcss-pxtorem这个插件
 * 接着到.postcssrc.js内添加配置
 * plugins对象内添加
 *    "postcss-pxtorem":{
      "rootValue": 100,
      "propList": ["*"],
      "selectorBlackList": ["iview-"]
      }
      其中selectorBlackList数组是用来过滤掉第三方UI库的类名的或者不打算用rem的元素的类名
 * 然后可以直接写px 自动转换成rem了
 */
