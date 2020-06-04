/*!
 * 全局过滤器插件
 */
import getDescLabel from './get-desc-label.js'
import formatPrice from './format-price.js'
import formatDate from './format-date.js'

const install = function(Vue) {
	Vue.filter('getDescLabel', getDescLabel)
	Vue.filter('formatPrice', formatPrice)
	Vue.filter('formatDate', formatDate)
}

if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue)
}

export default {
	version: '1.0.0',
	install,
	getDescLabel,
	formatPrice,
	formatDate
}
