import { createApp } from 'vue'
import App from './App.vue'

// 清除默认样式
import './style/reset.css'
// 导入样式
import './style/style.css'

// 导入 fontawesome 字体库
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faWeibo, faQq, faGithub, faSteam } from '@fortawesome/free-brands-svg-icons'
import { faHouse, faCircle as faSolidCircle, faChevronUp, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import {
	faCircle,
	faEye,
	faComment,
	faFolder,
	faClock,
	faCircleUser,
	faEnvelope,
	faMap,
	faCircleQuestion,
	faLightbulb,
} from '@fortawesome/free-regular-svg-icons'
library.add(
	faWeibo,
	faQq,
	faGithub,
	faSteam,
	faHouse,
	faClock,
	faCircle,
	faSolidCircle,
	faChevronUp,
	faEye,
	faComment,
	faFolder,
	faCircleUser,
	faEnvelope,
	faMap,
	faCircleQuestion,
	faLightbulb,
	faMagnifyingGlass
)

const app = createApp(App)

// 引入 pinia 状态管理插件
import { createPinia } from 'pinia'
app.use(createPinia())
// 引入 vue-router 路由
import router from './router/index.js'
app.use(router)
// 注册 fontawesome 全局组件
app.component('font-awesome-icon', FontAwesomeIcon)
// 注册 ArticlesList 全局组件
import ArticlesList from '@/components/ArticlesList/index.vue'
app.component('ArticlesList', ArticlesList)

app.mount('#app')
