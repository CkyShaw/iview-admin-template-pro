/*!
 * 辅助函数
 */

// 管道组合
export function pipeline(...fns) {
	return function (x) {
		return fns.reduce(function (arg, fn) {
			return fn(arg)
		}, x)
	}
}

// 根据节点id查找更新后的节点pid
export const getTreeNodeParentIdByTreeNodeId = (tree, nodeId) => {
	let parentId = ''
	let recursion = (tree, nodeId) => {
		tree.map(item => {
			if (item.id == nodeId) {
				parentId = item.pId
			}
			if (item.children && item.children.length > 0) {
				recursion(item.children, nodeId)
			}
		})
	}
	recursion(tree, nodeId)
	return parentId
}

// 设置当前树节点的所有父节点展开
export const setAllParentNodesExpand = (tree, parentId) => {
	let origin = tree
	let recursion = (tree, parentId) => {
		tree.forEach(item => {
			if (item.children && item.children.length > 0) {
				recursion(item.children, parentId)
			}
			if (item.id == parentId) {
				item.expand = true
				recursion(origin, item.pId)
			}
		})
	}
	recursion(tree, parentId)
}

// 选中并展开某个节点
export const handleSelectedExpandTreeNode = (tree, nodeId) => {
	tree.forEach(item => {
		if (item.id == nodeId) {
			item.selected = true
			item.expand = true
		}
		if (item.children && item.children.length > 0) {
			handleSelectedExpandTreeNode(item.children, nodeId)
		}
	})
}

// 树组件手动重置
export const componentReset = (_this, vif) => {
	_this[vif] = false
	_this.$nextTick(() => {
		_this[vif] = true
	})
}

/**
 * Tree组件数据更新后的选中展开状态保持(iview)
 * @param {Object} _this		当前组件this
 * @param {Array} tree			树组件数据
 * @param {String} nodeId		树节点ID
 * @param {String} parentId		树节点父ID
 * @param {String} parentIdKey	树节点父idKey字符
 * @param {String} vif			v-ifKey字符
 */
/*
	params = {
		_this: this,
		tree: this.treeData,
		nodeId: this.nodeId,
		parentId: this.pid,
		parentIdKey: 'pid',
		vif: 'treeReset'
	}
 */
export const treeKeepAlive = json => {
	let params = json || {}
	params._this[params.parentIdKey] = getTreeNodeParentIdByTreeNodeId(params.tree, params.nodeId)
	setAllParentNodesExpand(params.tree, params._this[params.parentIdKey])
	handleSelectedExpandTreeNode(params.tree, params.nodeId)
	componentReset(params._this, params.vif)
}

// 判断参数是否是其中之一
export function oneOf(value, validList) {
	for (let i = 0; i < validList.length; i++) {
		if (value === validList[i]) {
			return true
		}
	}
	return false
}

// 简单的深拷贝
export function exchange(jsonObject) {
	return JSON.parse(JSON.stringify(jsonObject))
}

// 获取数据类型
export function getDataType(data) {
	return Object.prototype.toString.call(data).match(/^\[object\s(.*)\]$/)[1]
}

// 复杂深拷贝
function dataDeepCopy(current, target, filter) {
	for (let key in current) {
		if (filter && target[key]) {
			continue
		}
		if (getDataType(current[key]) === 'Array') {
			target[key] = []
			dataDeepCopy(current[key], target[key], filter)
		} else if (getDataType(current[key]) === 'Object') {
			target[key] = {}
			dataDeepCopy(current[key], target[key], filter)
		} else {
			target[key] = current[key]
		}
	}
}

export { dataDeepCopy }

// Find components upward 通过组件名称从目标源向父链查找单个组件
function findComponentUpward(context, componentName, componentNames) {
	if (typeof componentName === 'string') {
		componentNames = [componentName]
	} else {
		componentNames = componentName
	}

	let parent = context.$parent
	let name = parent.$options.name
	while (parent && (!name || componentNames.indexOf(name) < 0)) {
		parent = parent.$parent
		if (parent) name = parent.$options.name
	}
	return parent
}
export { findComponentUpward }

// Find component downward 通过组件名称从目标源向子链查找单个组件
export function findComponentDownward(context, componentName) {
	const childrens = context.$children
	let children = null

	if (childrens.length) {
		for (const child of childrens) {
			const name = child.$options.name
			if (name === componentName) {
				children = child
				break
			} else {
				children = findComponentDownward(child, componentName)
				if (children) break
			}
		}
	}
	return children
}

// Find components downward 通过组件名称从目标源向子链查找多个组件
export function findComponentsDownward(context, componentName) {
	return context.$children.reduce((components, child) => {
		if (child.$options.name === componentName) components.push(child)
		const foundChilds = findComponentsDownward(child, componentName)
		return components.concat(foundChilds)
	}, [])
}

// Find components upward 通过组件名称从目标源向父链查找单个组件
export function findComponentsUpward(context, componentName) {
	let parents = []
	const parent = context.$parent
	if (parent) {
		if (parent.$options.name === componentName) parents.push(parent)
		return parents.concat(findComponentsUpward(parent, componentName))
	} else {
		return []
	}
}

// Find brothers components 通过组件名称找到目标源的兄弟组件，默认包含自身
export function findBrothersComponents(context, componentName, exceptMe = true) {
	let res = context.$parent.$children.filter(item => {
		return item.$options.name === componentName
	})
	let index = res.findIndex(item => item._uid === context._uid)
	if (exceptMe) res.splice(index, 1)
	return res
}

// 模块懒加载 ==> Vue推荐 ES6
// export const getComponent = (path) => () => import(/* webpackChunkName: "ES6Chunk" */ `@/views/${path}`)

// 模块懒加载 ==> WebPack推荐 CommonJS
// export const getComponent = (path) => r => require.ensure([], () => r(require(`@/views/${path}`)), 'CommonJsChunk');

// 模块懒加载 ==> 参数化
// export function getComponent(path) {
// 	let chunkName = path.split('/')[path.split('/').length-1] || 'chunkIsUndefined';
// 	return r => require.ensure([], () => r(require('@/views/dongshanqiao/Inspection/InspectionReport')), 'chunkName');
// 	return r => require.ensure([], () => r(require(`@/views/${path}`)), 'CommonJsChunk');
// }
// export { getComponent }
