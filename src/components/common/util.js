export const showTitle = (item, vm) => {
	return vm.$_config.useI18n ? vm.$t(item.name) : (item.meta && item.meta.title) || item.name
}
