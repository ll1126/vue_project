import { post, get } from '@/axiosconfig/axiosConfig.js'

export default {
  // 登陆接口
  login (params) {
    return post('/api/login/login', params)
  },
  // 首页 -- 左边导航接口
  loadMenu (params) {
    return get('/menu/selMenu', params)
  },
  // 首页 -- 修改密码接口
  updatePwd (params) {
    return post('/user/updatePwd', params)
  },
  // 菜单页 -- 加载表格数据接口
  loadTableMenu (params) {
    return get('/menu/selAllMenu', params)
  },
  // 菜单页 -- 添加菜单接口 / 修改菜单接口
  insertMenu (params) {
    return post('/menu/insertMenu', params)
  },
  // 菜单页 -- 删除菜单接口
  delMenu (params) {
    return get('/menu/delMenu', params)
  },
  // 菜单页 -- 修改菜单接口
  updateMenuState (params) {
    return post('/menu/updateMenu', params)
  },
  // 角色页 -- 加载表格和数据接口
  loadTableRole (params) {
    return get('/role/selAllRole', params)
  },
  // 角色页 -- 删除角色
  delRole (params) {
    return get('/role/delRole', params)
  },
  // 添加角色页 -- 加载所有菜单节点
  loadRoleMenu (params) {
    return post('/menu/selectMenuForRole', params)
  },
  // 添加角色页 -- 添加角色 / 修改角色
  insertRole (params) {
    return post('/role/insertRole', params)
  },
  // 用户页 -- 加载表格
  loadTableUser (params) {
    return get('/user/selUserList', params)
  },
  // 用户页 -- 删除用户
  delUser (params) {
    return get('/user/delUser', params)
  },
  // 添加用户页 -- 添加用户
  insertUser (params) {
    return post('/user/insertUser', params)
  },
  // 添加用户页 -- 加载可选角色
  loadRolel (params) {
    return get('/role/loadRole', params)
  },
  // 产品页 -- 加载产品列表
  loadTableProduct (params) {
    return get('/product/selAllProduct', params)
  },
  // 添加产品页 -- 保存产品
  insertProduct (params) {
    return post('/product/insertProduct', params)
  },
  // 库存页 -- 加载库存列表
  loadTableStock (params) {
    return get('/stock/selAllStock', params)
  },
  // 添加库存记录页 -- 加载可选产品型号
  getAllProductModel (params) {
    return get('/product/selAllProductNotPaging', params)
  },
  // 添加库存记录页 -- 添加库存记录
  insertStock (params) {
    return post('/stock/saveStock', params)
  },
  // 库存页 -- 导出库存记录
  exportStock (params) {
    return get('/stock/exportStock', params)
  }
}
