<template>
	<!-- v-if 控制数据没加载进入时，不显示，防止动画过渡时出现突变内容 -->
	<div class="header" v-if="title">
		<div class="header-main">
			<h1>{{ title }}</h1>
			<div class="article">
				<span class="createDate"
					><font-awesome-icon icon="fa-regular fa-clock" /><span>{{ createdAt }}</span></span
				>
				<span class="tags"
					><router-link :to="`/categories/${category.routeName}`"
						><font-awesome-icon icon="fa-regular fa-folder" /><span>{{ category.title }}</span></router-link
					></span
				>
				<span class="numOfViews"
					><font-awesome-icon icon="fa-regular fa-eye" /><span>{{ viewCount }}</span></span
				>
				<span class="numOfDiscuss"
					><font-awesome-icon icon="fa-regular fa-comment" /><span>{{ commentCount }}</span></span
				>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	title: String,
	createdAt: String,
	category: Object,
	viewCount: Number,
	commentCount: Number,
})
</script>

<style scoped lang="less">
.header {
	margin-top: 50px;
	height: 28vmin;
	display: flex;
	justify-content: center;
	align-items: center;

	.header-main {
		h1 {
			margin: 0px auto;
			font-size: 28px;
			font-weight: normal;
			text-align: center;
			line-height: 1.2;
			color: var(--article-title);
		}

		.article {
			margin-top: 10px;
			font-weight: 300;
			text-align: center;

			span {
				margin-right: 6px;
				line-height: 1;

				span {
					margin-left: 3px;
				}
			}
		}
	}
}

@media screen and (max-width: 768px) {
	.header {
		height: 25vh;

		.header-main {
			h1 {
				font-size: 24px;
			}
		}
	}
}
</style>
