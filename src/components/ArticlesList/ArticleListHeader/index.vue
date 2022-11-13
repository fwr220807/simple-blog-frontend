<template>
	<div class="header" v-if="title">
		<div class="header-main">
			<h1>{{ isHome() ? '只是一个博客' : `“${title}”` }}</h1>
			<hr class="small" v-if="isHome()" />
			<div class="icons" v-if="isHome()">
				<a title="新浪微博" href="#" target="_blank">
					<font-awesome-icon icon="fa-brands fa-weibo" size="1x" />
				</a>
				<a title="企鹅">
					<font-awesome-icon icon="fa-brands fa-qq" size="1x" />
				</a>
				<a title="Github" href="https://github.com/fwr220807" target="_blank">
					<font-awesome-icon icon="fa-brands fa-github" size="1x" />
				</a>
				<a title="Steam">
					<font-awesome-icon icon="fa-brands fa-steam" size="1x" />
				</a>
				<a title="Home">
					<font-awesome-icon icon="fa-solid fa-house" size="1x" />
				</a>
			</div>
			<div class="category" v-else-if="isCategory()">
				<p>{{ describe }}</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps({
	title: String,
	describe: String,
})

const isHome = function () {
	return route.meta.title === 'home'
}

const isCategory = function () {
	return route.meta.title === 'categories'
}
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
			font-size: 50px;
			font-weight: normal;
			text-align: center;
			line-height: 1;
			color: var(--title);
			// color: #4f989d;
		}

		// 中间一横杠
		.small {
			max-width: 100px;
			margin: 16px auto 8px;
			border: 0;
			border-top: 4px solid var(--border);
		}

		.icons {
			text-align: center;

			a {
				display: inline-block;
				margin: 0 10px;
				color: var(--font);
			}
		}

		.category {
			margin-top: 8px;
			font-style: italic;
			font-weight: 300;
		}
	}
}

@media screen and (max-width: 768px) {
	.header {
		height: 25vh;

		.header-main {
			h1 {
				font-size: 40px;
			}
		}
	}
}
</style>
