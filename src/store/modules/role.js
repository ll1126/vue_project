export default {
  /* 用户添加页 */
  state: {
    /* 弹出框状态 */
    roleDialogFormVisible: false,
    /* 弹出框数据 */
    form: {
      rolename: '',
      state: true,
      value: '',
      menudata: []
    }
  },
  mutations: {
    /* 修改弹出框显示状态 */
    update_roleDialogFormVisible (state, formState) {
      state.roleDialogFormVisible = formState
    },
    /* 编辑框给默认值 */
    update_form (state, form) {
      state.form.state = form.peopleState === 0
      state.form.value = form.roleName
    },
    /* 清空默认值 */
    empty (state) {
      state.form.rolename = ''
      state.form.state = true
    },
    /* 加载菜单节点 */
    loadMenu (state, menudata) {
      state.form.menudata = menudata
    },
  },
  actions: {
    updateRole (context, form) {
      /* 编辑框给默认值 */
      context.commit('update_form', form)
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
