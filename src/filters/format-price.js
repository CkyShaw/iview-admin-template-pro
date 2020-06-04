export default function formatPrice(value) {
	if (!value) return ''
	return Number(value)
		.toFixed(2)
		.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
}
