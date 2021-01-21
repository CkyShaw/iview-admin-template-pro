import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { localRead } from '@/libs/util'
import customZhCn from './lang/zh-CN'
import customZhTw from './lang/zh-TW'
import customEnUs from './lang/en-US'
import i_zhCnLocale from 'view-design/src/locale/lang/zh-CN'
import i_enUsLocale from 'view-design/src/locale/lang/en-US'
import i_zhTwLocale from 'view-design/src/locale/lang/zh-TW'

// element
import e_zhCnLocale from 'element-ui/lib/locale/lang/zh-CN'
import e_enUsLocale from 'element-ui/lib/locale/lang/en'
import e_zhTwLocale from 'element-ui/lib/locale/lang/zh-TW'

Vue.use(VueI18n)

// 自动根据浏览器系统语言设置语言
const navLang = navigator.language
const localLang = navLang === 'zh-CN' || navLang === 'en-US' ? navLang : false
let lang = localLang || localRead('local') || 'zh-CN'

Vue.config.lang = lang

// vue-i18n 6.x+写法
Vue.locale = () => {}
const messages = {
	'zh-CN': Object.assign(i_zhCnLocale, e_zhCnLocale, customZhCn),
	'zh-TW': Object.assign(i_zhTwLocale, e_zhTwLocale, customZhTw),
	'en-US': Object.assign(i_enUsLocale, e_enUsLocale, customEnUs)
}

const i18n = new VueI18n({
	locale: lang,
	messages
})

export default i18n

// vue-i18n 5.x写法
// Vue.locale('zh-CN', Object.assign(i_zhCnLocale, e_zhCnLocale, customZhCn))
// Vue.locale('en-US', Object.assign(i_zhTwLocale, e_enUsLocale, customZhTw))
// Vue.locale('zh-TW', Object.assign(i_enUsLocale, e_zhTwLocale, customEnUs))
