<template>
	<div class="navbar custom">
		<a class="navbar-brand">个人博客</a>
		<ul class="navbar-right clearfix">
			<li><a>Home</a></li>
			<li><a>About</a></li>
			<li><a>Archive</a></li>
			<li><a>Tags</a></li>
			<li><a>Works</a></li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'Navbar',
}
</script>

<style scoped>
.navbar {
	/* position: relative; */
	height: 60px;
	padding-left: 20px;
	line-height: 60px;
	font-size: 12px;
	font-weight: bold;
	color: white;
	background-color: #148395;
}

.navbar-brand {
	font-size: 18px;
}

.navbar-right {
	float: right;
}

.navbar-right li {
	float: left;
	padding: 0 20px;
}

.navbar .navbar-right li a {
	display: block;
	text-align: center;
}
</style>
