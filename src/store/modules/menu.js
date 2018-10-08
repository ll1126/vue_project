export default {
  /* 菜单添加页 */
  state: {
    // dialogTableVisible: false,
    dialogFormVisible: false,
    fpartentid: 0
  },
  mutations: {
    // update_dialogTableVisible (state, tableState) {
    //   state.dialogTableVisible = tableState
    // },
    // 点击添加菜单按钮时 显示添加界面
    update_dialogFormVisible (state, params) {
      state.fpartentid = params.parentId
      state.dialogFormVisible = params.state
    }
  },
  actions: {
  }
}
