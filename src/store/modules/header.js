export default {
  /* 头部页 */
  state: {
    /** 修改密码弹出框状态 */
    updatePwdDialogFormVisible: false
  },
  mutations: {
    // update_dialogTableVisible (state, tableState) {
    //   state.dialogTableVisible = tableState
    // },
    // 点击添加菜单按钮时 显示添加界面
    updatePwd_dialogFormVisible (state, params) {
      state.updatePwdDialogFormVisible = params
    }
  },
  actions: {
  }
}
