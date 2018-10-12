import Vue from 'vue'
import vuex from 'vuex'

/* 引入某个store对象 */
import tabList from './modules/tabList.js'
import menu from './modules/menu.js'
import people from './modules/people.js'
import role from './modules/role.js'
import header from './modules/header.js'

Vue.use(vuex)
export default new vuex.Store({
  modules: {
    tabList: tabList,
    menu: menu,
    people: people,
    role: role,
    header: header
  }
})
