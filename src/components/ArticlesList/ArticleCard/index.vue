<template>
	<div class="card">
		<h2 class="title">
			<router-link :to="`/article/${articleRouteName}`">{{ title }}</router-link>
		</h2>
		<div class="content">
			<p>{{ describe }}</p>
		</div>
		<div class="status">
			<span class="createDate"
				><font-awesome-icon icon="fa-regular fa-clock" /><span>{{ createDate }}</span></span
			>
			<span class="tags"
				><router-link :to="`/categories/${categoryRouteName}`" @click="check(`/categories/${categoryRouteName}`)"
					><font-awesome-icon icon="fa-regular fa-folder" /><span>{{ category }}</span></router-link
				></span
			>
			<span class="numOfViews"
				><font-awesome-icon icon="fa-regular fa-eye" /><span>{{ numOfViews }}</span></span
			>
			<span class="numOfDiscuss"
				><font-awesome-icon icon="fa-regular fa-comment" /><span>{{ numOfDiscuss }}</span></span
			>
		</div>
	</div>
</template>

<script setup>
import { useNavbarStore } from '@/store/navbar'
import { useRoute } from 'vue-router'
// 获取父节点传进来的 props 数据
const props = defineProps({
	articleRouteName: String,
	title: String,
	describe: String,
	createDate: String,
	category: String,
	categoryRouteName: String,
	numOfViews: Number,
	numOfDiscuss: Number,
})
// 文章卡片的栏目时默认切换到第一页
const navbarStore = useNavbarStore()
const route = useRoute()
const check = function (value) {
	if (value == route.path) {
		navbarStore.$state.getListFunction(1)
	}
}
</script>

<style scoped lang="less">
.card {
	padding: 0 0 54px;

	.title {
		a {
			border-bottom: 2px solid var(--light-border);
			padding-bottom: 6px;
			border-radius: 2px;
			// transition: 0.2s ease-in-out;
			color: var(--header);

			&:hover {
				color: var(--header-hover);
			}
		}
	}

	.content {
		margin: 14px auto;
	}

	.status {
		display: flex;

		span {
			margin-right: 6px;
			line-height: 1;

			span {
				margin-left: 3px;
			}
		}
	}
}
</style>
