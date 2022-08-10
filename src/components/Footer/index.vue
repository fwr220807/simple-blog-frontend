<template>
	<hr />
	<div class="w footer">
		<p>© 2022 范文润 ❖ Powered by VUE3.</p>
	</div>
</template>

<script>
export default {
	name: 'Footer',
}
</script>

<style scoped>
hr {
	margin-top: 20px;
	margin-bottom: 20px;
	border: 0;
	border-top: 1px solid #eee;
}
.footer {
	height: 140px;
	line-height: 140px;
	text-align: center;
}

.footer p {
	font-size: 14px;
}
</style>
