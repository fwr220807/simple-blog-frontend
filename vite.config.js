// 引入文件
import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入 element-plus 组件和自动导入组件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { prismjsPlugin } from 'vite-plugin-prismjs'

// import('prism-themes/themes/prism-one-dark.css')

// https://vitejs.dev/config/
export default defineConfig({
	// 添加 @
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
		prismjsPlugin({
			languages: [
				'html',
				'css',
				'typescript',
				'javascript',
				'php',
				'dart',
				'bash',
				'nginx',
				'sql',
				'c',
				'cpp',
				'python',
				'go',
				'java',
				'json',
			],
			//  languages: 'all',
			// languages: allLanguages,
			plugins: ['line-numbers', 'show-language', 'copy-to-clipboard'],
			// 引入 one-dark 主题，由于 one-dark 不是官方主题，所以需要先下载 prism-themes ，然后把 one-dark 的 css 文件复制粘贴到 prism 包的 themes 即可
			theme: 'tomorrow',
			css: true,
		}),
	],
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				changeOrigin: true,
			},
		},
	},
})
