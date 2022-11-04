<template>
	<!-- 利用动态样式控制 Header 的进入动画 -->
	<Header :title="title" :describe="describe" :key="title" :class="{ slideRToL: true }"></Header>
	<!-- 文章信息卡片，transition-group 控制列表动画 -->
	<div :class="{ slideDToU: controlAnimation }">
		<ArticleCard
			v-for="(article, index) in ArticlesList"
			:key="article.id"
			:articleRouteName="article.routeName"
			:title="article.title"
			:describe="article.content"
			:createDate="article.createdAt"
			:category="article.category.title"
			:categoryRouteName="article.category.routeName"
			:numOfViews="article.viewCount"
			:numOfDiscuss="article.commentCount"
			:data-index="index"
		></ArticleCard>
	</div>
	<!-- 分页器 -->
	<div class="pagination" v-if="pageInfo.total_page" :class="{ slideDToU: controlAnimation }">
		<el-pagination
			class="custom-class"
			layout="prev, pager, next"
			@current-change="handleCurrentChange"
			:page-count="pageInfo.total_page || 0"
			:total="pageInfo.total || 0"
			:hide-on-single-page="true"
			v-model:current-page="data.currentPage"
		/>
	</div>
</template>

<script setup>
import Header from '@/components/ArticlesList/ArticleListHeader/index.vue'
import ArticleCard from '@/components/ArticlesList/ArticleCard/index.vue'
import { onMounted, reactive, ref, toRefs, watch } from 'vue'
import { useNavbarStore } from '@/store/navbar'

const props = defineProps({
	title: String,
	describe: String,
	request: Function,
})

const controlAnimation = ref(true)

const data = reactive({
	ArticlesList: [],
	pageInfo: {},
	// 用于绑定分页器，用于修改当前的页数，默认不需要修改，因为可以通过 @current-change 触发页码的修改显示，这个属性适用于非通过 @current-change 触发页码的修改
	currentPage: 1,
})

// 获取文章请求
const getList = async (page) => {
	try {
		let result = await props.request(page)

		data.ArticlesList = result.data
		data.pageInfo = result.meta

		window.scrollTo({
			top: 0,
			left: 0,
		})
		controlAnimation.value = true
	} catch (error) {
		console.log(error)
	}
}

// 挂载时获取第一页文章数据
onMounted(() => {
	getList(1)
})

// 分页器点击页数时发起获取文章请求
const handleCurrentChange = function (page) {
	// 如果该函数在 navbar 触发的，则会出现 data.currentPage !== page 的情况，这时候需要赋值处理
	if (data.currentPage !== page) data.currentPage = page

	controlAnimation.value = false
	getList(page)
}

// navbarStore 仓库获取文章请求列表，用于导航栏页面转跳自身时发起请求
const navbarStore = useNavbarStore()
navbarStore.getListFunc(handleCurrentChange)

// 解构赋值
let { ArticlesList, pageInfo } = toRefs(data)
</script>

<style lang="less" scoped>
.pagination {
	display: flex;
	justify-content: center;

	.custom-class {
		--el-pagination-button-color: var(--font);
		--el-pagination-button-disabled-bg-color: var(--background);
		--el-pagination-bg-color: var(--background);
		--el-pagination-hover-color: var(--pagination-hover);
		--el-pagination-text-color: var(--pagination-font);
		--el-pagination-font-size: 16px;
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
