import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import './directive'
import Antd from 'ant-design-vue'

import './icons' // icon
import '@/styles/index.scss'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false // permission control

Vue.use(ElementUI)
Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
