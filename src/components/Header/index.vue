<template>
	<div class="header">
		<div class="w header-main">
			<h1 class="custom">论论的精神乐园</h1>
			<hr class="small" />
			<span class="name">范文润</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Header',
}
</script>

<style scoped>
.header {
	height: 340px;
	color: white;
	background-color: #148395;
}

.header-main {
	padding-top: 100px;
}

h1 {
	margin: 0px auto;
	font-size: 65px;
	font-weight: bold;
	text-align: center;
	line-height: 1.1;
}

.small {
	max-width: 100px;
	margin: 10px auto;
	border: 0;
	border-top: 4px solid #eee;
}

.name {
	display: block;
	text-align: center;
	font-size: 20px;
}
</style>
