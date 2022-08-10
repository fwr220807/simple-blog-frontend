<template>
	<Navbar></Navbar>
	<Header></Header>
	<Content></Content>
	<Footer></Footer>
</template>

<script>
import Navbar from './components/Navbar/index.vue'
import Header from './components/Header/index.vue'
import Content from './components/Content/index.vue'
import Footer from './components/Footer/index.vue'

export default {
	name: 'App',
	components: {
		Navbar,
		Header,
		Content,
		Footer,
	},
}
</script>
