<template>
	<div class="main">
		<ArticleHeader
			:title="data.title"
			:createdAt="data.createdAt"
			:category="data.category"
			:viewCount="data.viewCount"
			:commentCount="data.commentCount"
			:class="{ slideRToL: true }"
		></ArticleHeader>
		<!-- 文章目录导航，用了 eleUI，后期考虑重构 -->
		<div class="headers-tree" v-if="data.treeData.length">
			<el-tree
				class="tree"
				node-key="uuid"
				ref="tree"
				:data="data.treeData"
				:props="data.defaultProps"
				:expand-on-click-node="false"
				:show-checkbox="false"
				:class="{ slideDToU: true }"
			>
				<template #default="{ node, data }">
					<div class="custom-tree-node">
						<div @click="toDiv(data.uuid)">{{ data.text }}</div>
					</div>
				</template>
			</el-tree>
		</div>
		<Markdown :content="data.content" @emitHeader="getHeaders" :class="{ slideDToU: true }"></Markdown>
		<Comment :articleRouteName="route.params.articleRouteName" :class="{ slideDToU: true }"></Comment>
	</div>
</template>

<script setup>
import ArticleHeader from './ArticleHeader/index.vue'
import Comment from './Comment/index.vue'
import Markdown from './Markdown/index.vue'
import { reactive } from 'vue'
import API from '@/api'
import { useRoute } from 'vue-router'

const data = reactive({
	commentCount: 0,
	content: '',
	createdAt: '',
	updatedAt: '',
	id: 0,
	title: '',
	viewCount: 0,
	category: {},
	treeData: [],
	defaultProps: {
		label: 'text',
		children: 'children',
	},
})

const route = useRoute()
const getArticle = async function () {
	try {
		let result = await API.blog.reqArticle(route.params.articleRouteName)
		data.commentCount = result.data.commentCount
		data.content = result.data.content
		data.createdAt = result.data.createdAt
		data.updatedAt = result.data.updatedAt
		data.id = result.data.id
		data.title = result.data.title
		data.viewCount = result.data.viewCount
		data.category = result.data.category
	} catch (error) {
		// 评论的请求并不暴露在地址栏上，所以不用重定向至404
		console.log(error)
	}
}
getArticle()
// 自定义事件，获取子组件 Markdown 中处理好的目录数据
const getHeaders = function (treeData) {
	data.treeData = treeData
}
// 点击目录导航转跳至对应的文章位置
const toDiv = function (uuid) {
	let top = document.getElementById(uuid).offsetTop

	window.scrollTo({
		top: top - 30,
		left: 0,
		behavior: 'smooth',
	})
}
</script>

<style scoped lang="less">
.main {
	position: relative;
	.headers-tree {
		position: absolute;
		top: 200px;
		right: -25px;
		transform: translateX(100%);
		height: 100%;
		.tree {
			--el-tree-text-color: var(--font);
			--el-tree-node-hover-bg-color: transparent;
			position: sticky;
			top: 6rem;
			overflow-y: auto;
			width: 100%;
			background-color: transparent;
			border-left: 2px solid var(--header-tree-left-border);
		}
	}
}

.slideRToL {
	animation: slideRToL 0.4s ease-out 1;
	transform-origin: right;
}

@keyframes slideRToL {
	0% {
		transform: translateX(30px);
		opacity: 0;
	}

	100% {
		transform: translateX(0px);
		opacity: 1;
	}
}

.slideDToU {
	animation: slideDToU 0.4s ease-out 1;
	transform-origin: right;
}

@keyframes slideDToU {
	0% {
		transform: translateY(30px);
		opacity: 0;
	}

	100% {
		transform: translateY(0px);
		opacity: 1;
	}
}
</style>
