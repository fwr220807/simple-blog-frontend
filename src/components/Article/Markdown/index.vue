<template>
	<div v-html="md" class="markdown-body" ref="markdown"></div>
</template>

<script setup>
// 先把样式放前面导入，否则可能会出现 prism 渲染不成功的bug
import { onUpdated, computed, nextTick, watch, ref, onMounted } from 'vue'
// 用于转化 markdown 语法为 html 语句
import { marked } from 'marked'
// 语法高亮
import prism from 'prismjs'
// 引入 jquery
import $ from 'jquery'
import { toTree } from '@/utils/cate'
// 引入主题仓库
import { useThemesStore } from '@/store/themes'

const props = defineProps({
	content: String,
})

const emits = defineEmits(['emitHeader'])

// 用于给代码添加行数，所需要的添加 class="line-numbers" 的类名
let reg = new RegExp('<pre', 'g')
// 计算属性，将传入的 markdown 语法转换成 html 语法
const md = computed(() => marked(props.content).replace(reg, `<pre class="line-numbers padding-top-mac"`))
// 由于初始没有数据，需要在更新之后把高亮重新跑一次
onUpdated(() => {
	prism.highlightAll()
})
// 给代码块添加 mac 风格窗口样式,相关样式在 @/style/style.css 中
onUpdated(() => {
	const codeBlocks = markdown.value.getElementsByTagName('pre')
	Array.from(codeBlocks).forEach((item) => {
		// 设置代码块代码自动换行
		item.style.whiteSpace = 'pre-wrap'

		// Add pre-mac element for Mac Style UI
		const preMac = document.createElement('div')
		preMac.innerHTML = '<span></span><span></span><span></span>'
		preMac.classList.add('pre-mac', 'clearfix')
		item.parentElement.insertBefore(preMac, item)
		// 给 item 添加样式预留出样式的高度
		item.classList.add('padding-top-mac')
	})
})

watch(
	() => props.content,
	() => {
		nextTick(() => {
			getCatalog()
		})
	}
)
// 获取标题并加工
const getCatalog = function () {
	const h = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
	let elements = $(':header')
	// console.log(elements)
	let hElements = []
	for (const key of elements) {
		if (h.indexOf(key.localName) > -1) {
			let text = key.innerHTML

			hElements.push({
				level: parseInt(key.localName[1]),
				text,
				id: key.localName,
				uuid: key.id,
			})
		}
	}
	// console.log('hElements:', hElements)
	// hElements 包含了大标题，去掉，再进行树形结构的演绎
	let result = toTree(hElements.splice(1))
	emits('emitHeader', result)

	// console.log('result:', result)
}

// 获取 dom
const markdown = ref(null)
// 仓库
const ThemesStore = useThemesStore()
// 挂载后才能获取 dom
onMounted(() => {
	// 初始添加主题样式
	ThemesStore.initThemeCSS(markdown.value)
	// 监听仓库中的 currentTheme 值，通过它改变 markdown 主题
	ThemesStore.$subscribe(({ events }) => {
		markdown.value.classList.remove(events.oldValue)
		markdown.value.classList.add(events.newValue)
	})
})
</script>

<style scoped lang="less">
.markdown-body {
	background-color: transparent;

	h2 {
		background-color: pink;
		position: relative;

		&:before {
			content: 'h2';
			display: block;
			position: absolute;
		}
	}
}
</style>
