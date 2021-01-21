// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
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

// iView 基础组件
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
Vue.prototype.$Message = Message

Object.keys(iViewMap).forEach(name => {
	Vue.component(name, iViewMap[name])
})

// ElementUI 部分组件
import { Tree, Table, TableColumn, Loading, Scrollbar } from 'element-ui'
const ElementUI = [Tree, Table, TableColumn, Loading, Scrollbar]

// Antd 按需导入，需要修改 babel.config.js 文件，释放ant-design-vue相关注释
/*import { Input as aInput, Popconfirm, Table as aTable, Icon as aIcon, ConfigProvider } from 'ant-design-vue'
const Antd = [aInput, Popconfirm, aTable, aIcon, ConfigProvider]*/

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

// 捆绑注册
function* register(name) {
	Vue.use(name)
}
;[...ElementUI].forEach(component => register(component).next())

/**
 * @description 注册admin内置插件
 */
import installPlugin from '@/plugin'
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
import config from '@/config'
Vue.prototype.$_config = config
/**
 * 注册指令
 */
import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

/**
 * @description 动态设置rem
 */
import '@/libs/rem'

/**
 * @description 字体图标
 */
import '@/assets/icons/iconfont.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	router,
	store,
    i18n,
	render: h => h(App)
}).$mount('#app')
