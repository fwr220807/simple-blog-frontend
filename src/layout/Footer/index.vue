<template>
	<hr />
	<div class="footer" :class="{ animation: true }">
		<p>© 2022 范文润 ❖ Powered by VUE3+VITE.</p>
	</div>
</template>

<script>
export default {
	name: 'Footer',
}
</script>

<style scoped>
hr {
	/* margin-top: 20px; */
	margin-bottom: 20px;
	border: 0;
	border-top: 1px solid var(--light-border);
}
.footer {
	height: 40px;
	line-height: 140px;
	text-align: center;
}

.footer p {
	font-size: 14px;
}

.animation {
	animation: animation 0.4s ease-out 1;
	transform-origin: right;
}

@keyframes animation {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}
</style>
