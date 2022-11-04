<template>
	<div class="error">
		<div class="message">
			<h1>404</h1>
			<h2>Oops，页面走丢了</h2>
		</div>
		<div>
			<button class="btn red" @click="backToHome">回到首页</button>
			<button class="btn yellow" @click="refresh">刷新</button>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router'

// 编程式路由导航
const router = useRouter()
// 回到首页
const backToHome = function () {
	router.push('/home')
}
// 刷新页面
const refresh = function () {
	router.go(-1)
}
</script>

<style scoped lang="less">
.error {
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.message {
		h1 {
			display: inline-block;
			font-size: 24px;
			line-height: 24px;
			padding: 10px 23px 10px 0;
			margin: 0 20px 0 0;
			border-right: 1px solid var(--border);
		}

		h2 {
			display: inline-block;
			font-size: 18px;
		}
	}

	div {
		button {
			&:first-child {
				margin-right: 10px;
			}
		}
	}
}
</style>
