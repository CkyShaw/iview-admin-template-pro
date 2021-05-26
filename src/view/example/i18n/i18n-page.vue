<template>
	<div>
		<Row :gutter="10">
			<i-col span="6">
				<Card>
					<div class="i18n-card-box">
						<DatePicker type="date" placeholder="Select date"></DatePicker>
						<TimePicker
							type="timerange"
							placement="bottom-end"
							placeholder="Select time"
							style="display: block; margin-top: 10px"
						></TimePicker>
						<Button type="primary" style="margin-top: 10px" @click="modalVisible = true">{{
							$t('buttonText')
						}}</Button>
						<Modal v-model="modalVisible" :title="$t('modalTitle')">
							<p>{{ content }}</p>
							<p>{{ content }}</p>
							<p>{{ content }}</p>
						</Modal>
						<i class="tip">{{ $t('i18n-tip') }}</i>
					</div>
				</Card>
			</i-col>
			<i-col span="10">
				<div v-click-outside="onClickOutside" class="click-outside">click outside</div>
			</i-col>
		</Row>
		<Row>
			<Table :columns="columns1" :data="[]"></Table>
		</Row>
		<Row>
			<el-table :data="[]" style="width: 100%">
				<el-table-column prop="date" label="element"> </el-table-column>
				<el-table-column prop="age" label="age"> </el-table-column>
				<el-table-column prop="address" label="address"> </el-table-column>
			</el-table>
		</Row>
		<Row>
			<a-table :columns="columns2" :data-source="[]">
				<span slot="customTitle"><a-icon type="smile-o" /> antd</span>
			</a-table>
		</Row>
	</div>
</template>

<script>
export default {
	name: 'i18n_page',
	data() {
		return {
			modalVisible: false,
			columns1: [
				{
					title: 'iview',
					key: 'name'
				},
				{
					title: 'Age',
					key: 'age'
				},
				{
					title: 'Address',
					key: 'address'
				}
			],
			columns2: [
				{
					dataIndex: 'name',
					key: 'name',
					slots: { title: 'customTitle' }
				},
				{
					title: 'Age',
					dataIndex: 'age',
					key: 'age'
				},
				{
					title: 'Address',
					dataIndex: 'address',
					key: 'address'
				}
			]
		}
	},
	computed: {
		content() {
			return this.$t('content')
		}
	},
	methods: {
		onClickOutside(event) {
			console.log('Clicked outside. Event: ', event)
		}
	}
}
</script>

<style lang="stylus">
.i18n-card-box {
	height: 200px;
	.tip {
		color: gray;
		display: block;
		margin-top: 20px;
	}
}
.click-outside {
	width: 100%;
	height: 200px;
	background: #0af;
	cursor: pointer;
	color: #333;
	font-size: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	user-select: none;
}
</style>
