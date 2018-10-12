// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import './ui.js'
/* vuex */
import store from './store'
/* 接口管理 */
import api from './api/api.js'

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$ajax = api

/* eslint-disable no-new */
window.$$vm = new Vue({
  el: '#app',
  router, /* 路由 */
  api,
  store, /* 使用store */
  components: { App },
  template: '<App/>'
})
