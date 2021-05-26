<template>
	<Layout style="height: 100%" class="main">
		<Sider
			v-model="collapsed"
			hide-trigger
			collapsible
			:width="256"
			:collapsed-width="64"
			class="left-sider"
			:style="{ overflow: 'hidden' }"
		>
			<side-menu
				ref="sideMenu"
				accordion
				:active-name="$route.name"
				:collapsed="collapsed"
				:menu-list="menuList"
				@on-select="turnToPage"
			>
				<!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
				<div class="logo-con">
					<img v-show="!collapsed" key="max-logo" :src="maxLogo" />
					<img v-show="collapsed" key="min-logo" :src="minLogo" />
				</div>
			</side-menu>
		</Sider>
		<Layout>
			<Header class="header-con">
				<header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
					<user :message-unread-count="unreadCount" :user-avatar="userAvatar" />
					<language
						v-if="$_config.useI18n"
						style="margin-right: 10px"
						:lang="local"
						@on-lang-change="setLocal"
					/>
					<error-store
						v-if="$_config.plugin['error-store'] && $_config.plugin['error-store'].showInHeader"
						:has-read="hasReadErrorPage"
						:count="errorCount"
					></error-store>
					<fullscreen v-model="isFullscreen" style="margin-right: 10px; margin-top: 3px" />
				</header-bar>
			</Header>
			<Content class="main-content-con">
				<Layout class="main-layout-con">
					<div class="tag-nav-wrapper">
						<tags-nav :value="$route" :list="tagNavList" @input="handleClick" @on-close="handleCloseTag" />
					</div>
					<Content class="content-wrapper">
						<keep-alive :include="cacheList">
							<router-view />
						</keep-alive>
						<a-back-top :height="100" :bottom="80" :right="50" container=".content-wrapper"></a-back-top>
					</Content>
				</Layout>
			</Content>
		</Layout>
	</Layout>
</template>

<script>
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
import User from './components/user'
import ABackTop from './components/a-back-top'
import Fullscreen from './components/fullscreen'
import Language from './components/language'
import ErrorStore from './components/error-store'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { getNewTagList, routeEqual } from '@/libs/util'
import routers from '@/router/routers'
import minLogo from '@/assets/images/logo-min.jpg'
import maxLogo from '@/assets/images/logo.jpg'
import './main.styl'
export default {
	// eslint-disable-next-line vue/no-reserved-component-names
	name: 'Main',
	components: {
		SideMenu,
		HeaderBar,
		Language,
		TagsNav,
		Fullscreen,
		ErrorStore,
		User,
		ABackTop
	},
	data() {
		return {
			collapsed: false,
			minLogo,
			maxLogo,
			isFullscreen: false
		}
	},
	computed: {
		...mapGetters(['errorCount']),
		tagNavList() {
			return this.$store.state.app.tagNavList
		},
		tagRouter() {
			return this.$store.state.app.tagRouter
		},
		userAvatar() {
			return this.$store.state.user.avatarImgPath
		},
		cacheList() {
			const list = [
				'ParentView',
				...(this.tagNavList.length
					? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name)
					: [])
			]
			return list
		},
		menuList() {
			return this.$store.getters.menuList
		},
		local() {
			return this.$store.state.app.local
		},
		hasReadErrorPage() {
			return this.$store.state.app.hasReadErrorPage
		},
		unreadCount() {
			return this.$store.state.user.unreadCount
		}
	},
	watch: {
		$route(newRoute) {
			const { name, query, params, meta } = newRoute
			this.addTag({
				route: { name, query, params, meta },
				type: 'push'
			})
			this.setBreadCrumb(newRoute)
			this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
			this.$refs.sideMenu.updateOpenName(newRoute.name)
		}
	},
	mounted() {
		/**
		 * @description 初始化设置面包屑导航和标签导航
		 */
		this.setTagNavList()
		this.setHomeRoute(routers)
		const { name, params, query, meta } = this.$route
		this.addTag({
			route: { name, params, query, meta }
		})
		this.setBreadCrumb(this.$route)
		// 设置初始语言
		this.setLocal(this.$i18n.locale)
		// 如果当前打开页面不在标签栏中，跳到homeName页
		if (!this.tagNavList.find(item => item.name === this.$route.name)) {
			this.$router.push({
				name: this.$_config.homeName
			})
		}
		// 获取未读消息数
		this.getUnreadMessageCount()
	},
	methods: {
		...mapMutations(['setBreadCrumb', 'setTagNavList', 'addTag', 'setLocal', 'setHomeRoute', 'closeTag']),
		...mapActions(['handleLogin', 'getUnreadMessageCount']),
		turnToPage(route) {
			let { name, params, query } = {}
			if (typeof route === 'string') name = route
			else {
				name = route.name
				params = route.params
				query = route.query
			}
			if (name.indexOf('isTurnByHref_') > -1) {
				window.open(name.split('_')[1])
				return
			}
			this.$router.push({
				name,
				params,
				query
			})
		},
		handleCollapsedChange(state) {
			this.collapsed = state
		},
		handleCloseTag(res, type, route) {
			if (type !== 'others') {
				if (type === 'all') {
					this.turnToPage(this.$_config.homeName)
				} else {
					if (routeEqual(this.$route, route)) {
						this.closeTag(route)
					}
				}
			}
			this.setTagNavList(res)
		},
		handleClick(item) {
			this.turnToPage(item)
		}
	}
}
</script>
