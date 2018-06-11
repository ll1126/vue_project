export default {
  /* 菜单添加页 */
  state: {
    dialogTableVisible: false,
    dialogFormVisible: false
  },
  mutations: {
    update_dialogTableVisible (state, tableState) {
      state.dialogTableVisible = tableState
    },
    update_dialogFormVisible (state, formState) {
      state.dialogFormVisible = formState
    }
  },
  actions: {
  }
}
