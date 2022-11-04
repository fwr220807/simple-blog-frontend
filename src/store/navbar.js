import { defineStore } from 'pinia'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useNavbarStore = defineStore('navbar', {
	state: () => {
		return {
			// 栏目列表
			isShowTags: false,
			// 定义侧边栏的默认显示为 false
			isShowBurger: false,
			// 获取文章列表页切换页面的请求函数
			getListFunction: null,
		}
	},
	actions: {
		// 切换 Tags 的现实状态
		async changeIsShowTags() {
			this.isShowTags = !this.isShowTags

			// 使得响应式屏幕显示正常
			if (this.isShowTags === false) {
				this.isShowBurger = false
			}
		},

		async changeIsShowBurger() {
			this.isShowBurger = !this.isShowBurger

			// 使得响应式屏幕显示正常
			if (this.isShowBurger === true) {
				this.isShowTags = true
			}
		},
		// 获取文章列表的请求方法，用于导航栏页面转跳自身时发起请求
		getListFunc(func) {
			this.getListFunction = func
		},
	},
})
