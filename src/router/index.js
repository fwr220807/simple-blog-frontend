import { createRouter, createWebHashHistory } from 'vue-router'
import Content from '@/layout/Content/index.vue'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useCategoriesStore } from '@/store/categories'
const Home = () => import('../views/Home/index.vue')
const Category = () => import('../views/Category/index.vue')
const Works = () => import('@/views/Works/index.vue')
const Article = () => import('@/components/Article/index.vue')

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: Content,
			redirect: '/home',
			children: [
				// 首页
				{
					path: 'home',
					name: 'Home',
					component: Home,
					meta: { title: 'home', describe: '' },
				},
				// 栏目
				{
					path: 'categories/:categoryRouteName',
					name: 'Categories',
					component: Category,
					meta: { title: 'categories', describe: '栏目描述' },
				},
				// 文章页
				{
					path: 'article/:articleRouteName',
					name: 'Article',
					component: Article,
					meta: { title: 'article', message: '文章' },
				},
				// 项目
				{
					path: 'works',
					name: 'Works',
					component: Works,
					meta: { title: 'works', message: '' },
				},
				// 关于我
				{
					path: 'about',
					name: 'About',
					// 重定向到自述的文章
					redirect: '/article/about',
					// component: Content,
					// component: () => import('@/components/Article/index.vue'),
					meta: { title: 'article', message: 'about' },
				},
				// 匹配不到任何路由时重定向至404
				{
					path: '/:pathMatch(.*)*',
					name: '404',
					component: () => import('@/views/404.vue'),
				},
			],
		},
	],
	scrollBehavior(to, from, savedPosition) {
		return { top: 0 }
	},
})
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
	nProgress.start()

	const categories = useCategoriesStore()
	// 此处保证 categories 动态路由的加载，才进行转跳，防止直接访问 categories 的相关地址会报错
	if (categories.$state.categoriesList.length === 0) {
		await categories.getCategoriesList()
	}

	next()
	nProgress.done()
})

export default router
