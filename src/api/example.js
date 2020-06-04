/*!
 * api案例模块
 */

import axios from '@/libs/api.request'

export default {
	getDataByPostService(params) {
		return axios.request({
			url: 'service/post',
			data: JSON.stringify(params),
			method: 'post'
		})
	},
	getDataByGetService(params) {
		return axios.request({
			url: 'service/get',
			params: params,
			method: 'get'
		})
	}
}