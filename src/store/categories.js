import { defineStore } from 'pinia'
import API from '@/api/index'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useCategoriesStore = defineStore('categories', {
	state: () => {
		return {
			// 栏目列表
			categoriesList: [],
		}
	},
	actions: {
		// 获取 CategoriesList 列表,在 Navbar.vue 使用了
		async getCategoriesList() {
			let result = await API.blog.reqCategoriesList()
			result.data.forEach((item) => this.categoriesList.push(item))
		},
	},
})
