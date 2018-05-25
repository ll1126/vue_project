import Vue from 'vue'
import vuex from 'vuex'

/* 引入某个store对象 */
import tabList from './modules/tabList.js'
import menu from '../components/menuManage/menu.js'
import people from '../components/peopleManage/people.js'
import role from '../components/roleManage/role.js'
import createLogger from 'vuex/dist/logger' // 修改日志

Vue.use(vuex)
export default new vuex.Store({
  modules: {
    tabList: tabList,
    menu: menu,
    people: people,
    role: role
  },
  plugin: createLogger()
})
