// 主题切换逻辑：1.首先在 localStorage 中检测是否key ’darkMode‘ 是否等于 'true',
// 2.如果是，则打开页面就不需要自动切换了，直接是黑暗模式并实现手动切换，
// 3.如果不是，则实现自动根据系统切换明亮黑暗模式；
// 4.点击导航栏后取消自动切换，变为手动切换

import { defineStore } from 'pinia'

export const useThemesStore = defineStore('themes', {
	state: () => {
		return {
			// 当前模式：明亮 light 或深色 dark
			currentTheme: '',
			// 获取媒体匹配对象
			themeMedia: window.matchMedia('(prefers-color-scheme: light)'),
			// 监听系统媒体匹配对象切换主题，并且用于检测是否取消监听器
			callback: null,
		}
	},
	actions: {
		// 用于初始化添加主题
		initCurrentTheme() {
			// 如果本地存储已经 darkMode 值为 false ，才初始化
			if (localStorage.getItem('darkMode') === 'true') {
				this.currentTheme = 'dark'
			} else {
				// 自动切换，并且回调函数值控制自动的实现
				if (this.themeMedia.matches) {
					// 初始化打开时的默认主题
					// 切换明亮模式
					this.currentTheme = 'light'
				} else {
					// 切换深色模式
					this.currentTheme = 'dark'
				}
				// 初始化回调函数
				this.callback = (event) => {
					if (event.matches) {
						this.currentTheme = 'light'
					} else {
						this.currentTheme = 'dark'
					}
				}
			}
		},
		// 用于初始化添加主题样式
		initThemeCSS(dom) {
			dom.classList.toggle(this.currentTheme)
		},
		// 更换主题
		changeTheme() {
			document.documentElement.classList.remove(this.currentTheme)
			if (this.currentTheme === 'light') {
				// 切换深色模式
				localStorage.setItem('darkMode', true)
				this.currentTheme = 'dark'
			} else {
				// 切换明亮模式
				localStorage.setItem('darkMode', false)
				this.currentTheme = 'light'
			}
		},
		// 添加监听器,用于监听系统的深色模式
		addListener() {
			this.themeMedia.addEventListener('change', this.callback)
		},
		// 去除监听器
		removeListener() {
			this.themeMedia.removeEventListener('change', this.callback)
			this.callback = null
		},
	},
})
