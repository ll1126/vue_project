export default {
  /* 用户添加页 */
  state: {
    /* 弹出框状态 */
    roleDialogFormVisible: false,
    /* 弹出框数据 */
    form: {
      id: '',
      rolename: '',
      state: true,
      value: '',
      menudata: [],
      checkmenudata: [],
      isUpdate: 0
    }
  },
  mutations: {
    /* 修改弹出框显示状态 */
    update_roleDialogFormVisible (state, formState) {
      state.roleDialogFormVisible = formState
    },
    /* 编辑框给默认值 */
    update_role_form (state, form) {
      state.form.id = form.id
      state.form.rolename = form.cname
      state.form.state = form.fstate === 0
      state.form.value = form.roleName
      state.form.checkmenudata = form.menuData.split(",")
      /* isUpdate:0 新增  1： 修改 */
      state.form.isUpdate = 1
    },
    /* 清空默认值 */
    empty (state) {
      state.form.id = ''
      state.form.rolename = ''
      state.form.state = true
      state.form.value = ''
      state.form.checkmenudata = []
    },
    /* 加载菜单节点 */
    loadMenu (state, menudata) {
      state.form.menudata = menudata
    },
  },
  actions: {
    updateRole (context, form) {
      /* 编辑框给默认值 */
      context.commit('update_role_form', form)
      /* 显示弹出框 */
      context.commit('update_roleDialogFormVisible', true)
    },
    cancel (context) {
      /* 关闭弹出框 */
      context.commit('update_roleDialogFormVisible', false)
      /* 清空默认值 */
      context.commit('empty')
    },
    /* 保存 */
    onSubmit (context) {
      /* 关闭弹出框 */
      context.commit('update_roleDialogFormVisible', false)
      /* 清空默认值 */
      context.commit('empty')
    },
    /* 加载菜单节点 */
    loadMenu (context,menudata) {
      context.commit('loadMenu', menudata)
    }
  }
}
