import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from '@/locale'

// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

/**
 * @description 挂载全局api
 */
import api from './api'
Vue.prototype.$_api = api

/**
 * @description 当前框架所需的iview基础组件
 */
import {
	Layout,
	Sider,
	MenuItem,
	Submenu,
	Tooltip,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Breadcrumb,
	BreadcrumbItem,
	Badge,
	Tag,
	Avatar,
	Row,
	Col,
	Card,
	Icon,
	Button,
	Menu,
	Tree as iTree,
	Drawer,
	Switch,
	Upload,
	Modal,
	Spin,
	Select,
	Option,
	OptionGroup,
	Message,
	Input,
	Table as iTable,
	Poptip,
	Header,
	DatePicker,
	TimePicker,
	Form,
	FormItem
} from 'view-design'
import '@/assets/style/iview/index.less'
const iView = {
	Layout,
	Sider,
	MenuItem,
	Submenu,
	Tooltip,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Breadcrumb,
	BreadcrumbItem,
	Badge,
	Tag,
	Avatar,
	Row,
	Col,
	Card,
	Icon,
	Button,
	Menu,
	Tree: iTree,
	Drawer,
	Upload,
	Modal,
	Spin,
	Select,
	Option,
	OptionGroup,
	Message,
	Input,
	Table: iTable,
	Poptip,
	Header,
	DatePicker,
	TimePicker,
	Form,
	FormItem
}
const iViewMap = {
	...iView,
	iButton: Button,
	iCol: Col,
	iHeader: Header,
	iInput: Input,
	iMenu: Menu,
	iOption: Option,
	iSelect: Select,
	iSwitch: Switch,
	iTable: iTable
}
import locale from 'view-design/src/locale/index'
locale.i18n((key, value) => i18n.t(key, value))
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal
Object.keys(iViewMap).forEach(name => {
	Vue.component(name, iViewMap[name])
})

/**
 * @description ElementUI 部分组件
 */
import { Tree, Table, TableColumn, Loading, Scrollbar } from 'element-ui'
const ElementUI = [Tree, Table, TableColumn, Loading, Scrollbar]

// Antd 按需导入，需要修改 babel.config.js 文件，释放ant-design-vue相关注释
/*import { Input as aInput, Popconfirm, Table as aTable, Icon as aIcon, ConfigProvider } from 'ant-design-vue'
const Antd = [aInput, Popconfirm, aTable, aIcon, ConfigProvider]*/

/**
 * @description Antd主库
 */
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

// 捆绑注册
function* register(name) {
	Vue.use(name)
}
;[...ElementUI].forEach(component => register(component).next())

/**
 * 注册全局指令
 */
import importDirective from '@/directive'
importDirective(Vue)

/**
 * @description 全局注册应用配置
 */
import config from '@/config'
Vue.prototype.$_config = config

/**
 * @description 注册拓展插件，目前只有未启用的 errorHandler
 */
import installPlugin from '@/plugin'
installPlugin(Vue)

/**
 * @description 动态设置rem
 */
import '@/libs/rem'

/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	router,
	store,
	i18n,
	render: h => h(App)
}).$mount('#app')
