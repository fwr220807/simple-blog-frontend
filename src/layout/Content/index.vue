<template>
	<div class="content">
		<router-view :key="route.fullPath"></router-view>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style lang="less" scoped>
.content {
	max-width: 860px;
	min-height: 100vh;
	margin: 0 auto;
	padding: 0 15px 0;
}
</style>
