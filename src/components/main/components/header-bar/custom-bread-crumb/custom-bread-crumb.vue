<template>
	<div class="custom-bread-crumb">
		<Breadcrumb :style="{ fontSize: `${fontSize}px` }">
			<BreadcrumbItem v-for="item in list" :key="`bread-crumb-${item.name}`" :to="item.to">
				<common-icon style="margin-right: 4px" :type="item.icon || ''" />
				{{ showTitle(item) }}
			</BreadcrumbItem>
		</Breadcrumb>
	</div>
</template>

<script>
import { showTitle } from '@/libs/util'
import CommonIcon from '@c/common-icon'
import './custom-bread-crumb.styl'
export default {
	name: 'customBreadCrumb',
	components: {
		CommonIcon
	},
	props: {
		list: {
			type: Array,
			default: () => []
		},
		fontSize: {
			type: Number,
			default: 14
		},
		showIcon: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		showTitle(item) {
			return showTitle(item, this)
		},
		isCustomIcon(iconName) {
			return iconName.indexOf('_') === 0
		},
		getCustomIconName(iconName) {
			return iconName.slice(1)
		}
	}
}
</script>
