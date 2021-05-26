<template>
	<a type="text" :class="['sider-trigger-a', collapsed ? 'collapsed' : '']" @click="handleChange"
		><Icon :type="icon" :size="size"
	/></a>
</template>

<script>
export default {
	name: 'siderTrigger',
	props: {
		collapsed: Boolean,
		icon: {
			type: String,
			default: 'navicon-round'
		},
		size: {
			type: Number,
			default: 26
		}
	},
	methods: {
		handleChange() {
			this.$emit('on-change', !this.collapsed)
		}
	}
}
</script>

<style lang="stylus">
@import './sider-trigger.styl';
</style>
