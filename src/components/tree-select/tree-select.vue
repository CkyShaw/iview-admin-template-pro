<template>
	<Select ref="select" class="tree-select" v-bind="$attrs" multiple @on-change="handleChange">
		<tree-select-tree-item
			:selected-array="value"
			:data="data"
			:load-data="loadData"
			@on-clear="handleClear"
			@on-check="handleTreeCheck"
		></tree-select-tree-item>
	</Select>
</template>

<script>
import Emitter from 'view-design/src/mixins/emitter'
import TreeSelectTreeItem from './tree-select-tree.vue'
export default {
	name: 'TreeSelect',
	components: {
		TreeSelectTreeItem
	},
	mixins: [Emitter],
	provide() {
		return {
			parent: this
		}
	},
	inheritAttrs: false,
	props: {
		value: {
			type: Array,
			default: () => []
		},
		data: {
			type: Array,
			default: () => []
		},
		loadData: Function
	},
	data() {
		return {
			isChangedByTree: true,
			isInit: true
		}
	},
	methods: {
		handleChange(selected) {
			if (!this.isChangedByTree) this.$emit('input', selected)
			this.isChangedByTree = false
		},
		handleTreeCheck(selectedArray) {
			this.isChangedByTree = true
			this.$emit(
				'input',
				selectedArray.map(item => item.id)
			)
		},
		handleClear() {
			this.$refs.select.reset()
		}
	}
}
</script>

<style lang="stylus">
.tree-select {
	.ivu-select-dropdown {
		padding: 0 6px;
	}
}
</style>
