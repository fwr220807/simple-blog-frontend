<template>
	<div class="w content">
		我是内容
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'Content',
}
</script>

<style scoped>
.content {
	height: 300px;
	background-color: pink;
}
</style>
