export default function formatDate(dateString, parameter = '') {
	let date = new Date(dateString)

	let year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate(),
		hour = date.getHours(),
		minute = date.getMinutes(),
		second = date.getSeconds()

	if (parameter.toLowerCase() == 'yyyy-mm-dd hh:mm:ss' || parameter.toLowerCase() == '') {
		return `${year}-${month}-${day} ${hour}:${minute}:${second}`
	} else if (parameter.toLowerCase() == 'yyyy-mm-dd') {
		return `${year}-${month}-${day}`
	}
}
/*export default function formatDate(value, fmts = 'yyyy-MM-dd HH.mm.ss') {
	var fmt = fmts
	if (value === null || value === '' || value === undefined) {
		return
	}
	var date = new Date(value)
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'H+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	}
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + ''
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
		}
	}
	return fmt
}*/
