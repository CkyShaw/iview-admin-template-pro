/*!
 * api公共模块
 */

import axios from 'axios'

/*!
 * @param {String} filePath
 * @description 全局公共axios本地静态数据请求方法
 */
const loadDataByFile = file => {
	return axios(`assets/data/${file}`)
}

export default {
	loadDataByFile
}
