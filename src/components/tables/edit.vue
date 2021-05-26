<template>
	<div class="tables-edit-outer">
		<div v-if="!isEditting" class="tables-edit-con">
			<span class="value-con">{{ value }}</span>
			<Button v-if="editable" class="tables-edit-btn" style="padding: 2px 4px" type="text" @click="startEdit"
				><Icon type="md-create"></Icon
			></Button>
		</div>
		<div v-else class="tables-editting-con">
			<Input :value="value" class="tables-edit-input" @input="handleInput" />
			<Button style="padding: 6px 4px" type="text" @click="saveEdit"><Icon type="md-checkmark"></Icon></Button>
			<Button style="padding: 6px 4px" type="text" @click="canceltEdit"><Icon type="md-close"></Icon></Button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TablesEdit',
	props: {
		value: [String, Number],
		edittingCellId: String,
		params: Object,
		editable: Boolean
	},
	computed: {
		isEditting() {
			return this.edittingCellId === `editting-${this.params.index}-${this.params.column.key}`
		}
	},
	methods: {
		handleInput(val) {
			this.$emit('input', val)
		},
		startEdit() {
			this.$emit('on-start-edit', this.params)
		},
		saveEdit() {
			this.$emit('on-save-edit', this.params)
		},
		canceltEdit() {
			this.$emit('on-cancel-edit', this.params)
		}
	}
}
</script>

<style lang="stylus">
.tables-edit-outer {
	height: 100%;
	.tables-edit-con {
		position: relative;
		height: 100%;
		.value-con {
			vertical-align: middle;
		}
		.tables-edit-btn {
			position: absolute;
			right: 10px;
			top: 0;
			display: none;
		}
		&:hover {
			.tables-edit-btn {
				display: inline-block;
			}
		}
	}
	.tables-editting-con {
		.tables-edit-input {
			width: calc(100% - 60px);
		}
	}
}
</style>
