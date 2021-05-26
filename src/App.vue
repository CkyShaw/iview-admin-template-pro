<template>
	<div id="app">
		<a-config-provider :locale="locale">
			<router-view />
		</a-config-provider>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import zh_TW from 'ant-design-vue/lib/locale-provider/zh_TW'
import en_US from 'ant-design-vue/lib/locale-provider/en_US'
import moment from 'moment'
import 'moment/locale/zh-cn'
import 'moment/locale/zh-tw'
import 'moment/locale/es-us'
import Vue from 'vue'
export default {
	name: 'App',
	data() {
		return {
			localeMap: {
				'zh-CN': {
					locale: zh_CN,
					moment: 'zh-cn'
				},
				'zh-TW': {
					locale: zh_TW,
					moment: 'zh-tw'
				},
				'en-US': {
					locale: en_US,
					moment: 'es-us'
				}
			}
		}
	},
	computed: {
		...mapState({ local: state => state.app.local }),
		locale: {
			get() {
				moment.locale(this.localeMap[this.local || Vue.config.lang].moment)
				return this.localeMap[this.local || Vue.config.lang].locale
			}
		}
	}
}
</script>

<style lang="stylus">
.full {
	width: 100%;
	height: 100%;
}
html,
body {
	@extend .full;
	overflow: hidden;
	margin: 0;
	padding: 0;
}
#app {
	@extend .full;
}
</style>
