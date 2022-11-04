<template>
	<!-- 展示栏目筛选页 -->
	<ArticlesList :title="title" :describe="describe" :request="decorateRequest"></ArticlesList>
</template>

<script setup>
import API from '@/api/index'
import { useRoute, useRouter } from 'vue-router'
import { useCategoriesStore } from '@/store/categories'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()
const store = useCategoriesStore()

// 由于 ArticlesList 内部的请求方法直接收 page 一个属性，但是这个请求还需要 categoryRouteName ，直接传方法进去会出错，所以需要包装下
let category = store.$state.categoriesList.find((item) => item.routeName === route.params.categoryRouteName)
let title = null
let describe = null
let decorateRequest = null
if (!category) {
	router.push('/404')
} else {
	title = ref(category.title)
	describe = ref(category.describe)
	decorateRequest = (page) => API.blog.reqCategoryArticlesList(page, category.routeName)
}
</script>

<style lang="less" scoped></style>
