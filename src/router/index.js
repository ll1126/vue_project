import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Home from '@/components/Home'
import MenuList from '@/components/menuManage/MenuList'
import PeopleList from '@/components/peopleManage/PeopleList'
import RoleList from '@/components/roleManage/RoleList'
import ProductList from '@/components/productManage/ProductList'
import StockList from '@/components/stockManage/StockList'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: 'Home',
          name: 'Home',
          component: Home
        },
        {
          path: 'MenuManage',
          name: 'MenuList',
          component: MenuList
        },
        {
          path: 'PeopleManage',
          name: 'PeopleList',
          component: PeopleList
        },
        {
          path: 'RoleManage',
          name: 'RoleList',
          component: RoleList
        },
        {
          path: 'ProductManage',
          name: 'ProductList',
          component: ProductList
        },
        {
          path: 'StockManage',
          name: 'StockList',
          component: StockList
        }
      ]
    },
    { /* 放在最后防止空白或404 */
      path: '*',
      redirect: '/Login'
    }

  ]
})
