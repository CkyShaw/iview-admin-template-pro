export default function getDescLabel(descInfo, id) {
	let fValueList = []
	if (descInfo) {
		let arr = descInfo.split('|') || []
		for (var i = 0; i < arr.length; i++) {
			let key = arr[i].split(' ')[0]
			let label = arr[i].split(' ')[1]
			fValueList.push({
				id: key,
				label: label
			})
		}
	}
	let label = ''
	fValueList.forEach(item => {
		if (item.id == id) {
			label = item.label
		}
	})
	return label
}
