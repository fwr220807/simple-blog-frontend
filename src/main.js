import { createApp } from 'vue'
import App from './App.vue'

// 清除默认样式
import './style/reset.css'
// 导入样式
import './style/style.css'

// 引入 vue-router 路由
import router from './router/index.js'

const app = createApp(App)

app.use(router)

app.mount('#app')
