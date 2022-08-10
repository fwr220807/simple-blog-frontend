import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home/index.vue'
import About from '@/views/About/index.vue'
// const Home = () => import('../views/Home/index.vue')
// const About = () => import('../views/About/index.vue')

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{ path: '/', component: Home },
		{ path: '/about', component: About },
	],
})

export default router
