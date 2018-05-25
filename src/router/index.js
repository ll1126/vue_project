import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import MenuList from '@/components/menuManage/MenuList'
import PeopleList from '@/components/peopleManage/PeopleList'
import RoleList from '@/components/roleManage/RoleList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/MenuManage',
      name: 'MenuList',
      component: MenuList
    },
    {
      path: '/PeopleManage',
      name: 'PeopleList',
      component: PeopleList
    },
    {
      path: '/RoleManage',
      name: 'RoleList',
      component: RoleList
    },
    { /* 放在最后防止空白或404 */
      path: '*',
      redirect: '/'
    }

  ]
})