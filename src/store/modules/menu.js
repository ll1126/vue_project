export default {
  /* 菜单添加页 */
  state: {
    menu: {
      id: '',
      menuName: '',
      menuUrl: '',
      clconpic: '',
      fsort: '',
      fstate: true,
      fparentid: 0
    },
    dialogFormVisible: false,
    fparentid: 0,
    type: '添加菜单',
    isUpdate: false
  },
  mutations: {
    update_dialogTableVisible_State (state, tableState) {
      state.dialogFormVisible = tableState
    },
    // 点击添加菜单按钮时 显示添加界面
    update_dialogFormVisible (state, params) {
      state.fpartentid = params.parentId
      state.dialogFormVisible = params.state
      state.type = '添加菜单'
      state.isUpdate = false
    },
    // 编辑框给默认值
    update_menu (state, menu) {
      state.menu.id = menu.id
      state.menu.menuName = menu.menuName
      state.menu.menuUrl = menu.menuUrl
      state.menu.clconpic = menu.clconpic
      state.menu.fsort = menu.fsort
      state.menu.fstate = menu.fstate === 0
      state.menu.fparentid = menu.fparentid
      state.type = '编辑菜单'
      state.isUpdate = true
    },
    /* 清空默认值 */
    empty (state) {
      state.menu.id = ''
      state.menu.menuName = ''
      state.menu.menuUrl = ''
      state.menu.clconpic = ''
      state.menu.fsort = ''
      state.menu.fstate = true
      state.isUpdate = false
      state.menu.fparentid = 0
    }
  },
  actions: {
    updateMenu (context, menu) {
      /* 编辑框给默认值 */
      context.commit('update_menu', menu)
      /* 显示弹出框 */
      context.commit('update_dialogTableVisible_State', true)
    }
  }
}
