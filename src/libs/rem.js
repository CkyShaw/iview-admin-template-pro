/*!
 * 根据当前窗口大小 设置根字体大小
 */

import { debounce } from 'throttle-debounce'

let updateRootFontSize = () => {
	let { containerWidth, moduleWidth } = global
	// 反向计算基准大小 确保在1024分辨率下 1rem=12px chrome最低支持12px
	let rootFontSize = moduleWidth / (1024 / 12)
	// 动态根字体
	let currentRootFontSize = document.documentElement.clientWidth / (moduleWidth / rootFontSize)
	// 因为项目是嵌入到父级容器中的一块区域，这块区域如果不是父级容器的宽度，那么子项目还会继续缩放一次。为了保持缩放一致性需要按照父子模块的宽度比例进行调整。
	let finalRootFontSize = currentRootFontSize * (containerWidth / moduleWidth)
	document.documentElement.style.fontSize = finalRootFontSize + 'px'
}

updateRootFontSize()

let debounceUpdateRootFontSize = debounce(300, () => updateRootFontSize())

window.addEventListener('resize', debounceUpdateRootFontSize, false)
