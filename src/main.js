// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'

import '@/assets/icons/iconfont.css'

// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

/*import iView from 'view-design'
import '@/assets/style/iview/index.less'
Vue.use(iView, {
	i18n: (key, value) => i18n.t(key, value)
})*/

import TreeTable from 'tree-table-vue'
Vue.use(TreeTable)

import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
Vue.use(VOrgTree)

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
	TimePicker
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
	TimePicker
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

// Antd 按需
import { Input as aInput, Popconfirm, Table as aTable, Icon as aIcon, ConfigProvider } from 'ant-design-vue'
const Antd = [aInput, Popconfirm, aTable, aIcon, ConfigProvider]

// 捆绑注册
function* register(name) {
	Vue.use(name)
}
;[...ElementUI, ...Antd].forEach(component => register(component).next())

/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$_config = config
/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

/**
 * @description 动态设置rem
 */
import '@/libs/rem'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	i18n,
	store,
	render: h => h(App)
})
