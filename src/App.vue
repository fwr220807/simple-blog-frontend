<template>
	<div @click="notShowTagsAndBurger">
		<Navbar></Navbar>
		<router-view></router-view>
		<!-- 回到顶部 -->
		<el-backtop :bottom="100">
			<div
				style="
					height: 100%;
					width: 100%;
					background-color: var(--light-background);
					box-shadow: var(--el-box-shadow-lighter);
					text-align: center;
					line-height: 40px;
					color: var(--backtop-font);
					border-radius: 5px;
				"
			>
				<font-awesome-icon icon="fa-solid fa-chevron-up" />
			</div>
		</el-backtop>
		<Footer></Footer>
	</div>
</template>

<script setup>
import Footer from './layout/Footer/index.vue'
import Navbar from './layout/Navbar/index.vue'
import { useNavbarStore } from '@/store/navbar'
import { useThemesStore } from '@/store/themes'
import { onMounted, onBeforeUnmount } from 'vue'
import { throttle } from 'lodash'

const NavbarStore = useNavbarStore()
// 给 scroll 事件的行为函数加个节流
const notShowTagsAndBurger = throttle(function () {
	if (NavbarStore.$state.isShowTags) {
		NavbarStore.changeIsShowTags()
	}
	if (NavbarStore.$state.isShowBurger) {
		NavbarStore.changeIsShowBurger()
	}
}, 300)

// 监听滚动事件来隐藏 tags 和 侧边栏
onMounted(() => {
	window.addEventListener('scroll', notShowTagsAndBurger)
})
onBeforeUnmount(() => {
	window.removeEventListener('scroll', notShowTagsAndBurger)
})
//--------------------------------------------------------------------------
// 主题切换
const ThemesStore = useThemesStore()
// 初始添加主题
ThemesStore.initCurrentTheme()
// 如果初始化回调函数有值，才添加监听器
ThemesStore.$state.callback && ThemesStore.addListener()
// 初始添加主题样式
ThemesStore.initThemeCSS(document.documentElement)
// 监听仓库中的 currentTheme 值，通过它改变总主题
ThemesStore.$subscribe(({ events }) => {
	document.documentElement.classList.remove(events.oldValue)
	document.documentElement.classList.add(events.newValue)
})
</script>

<style lang="less"></style>
