export default {
  /* 用户添加页 */
  state: {
    /* 弹出框状态 */
    peopleDialogFormVisible: false,
    /* 弹出框数据 */
    form: {
      name: '',
      phone: '',
      state: true,
      value: ''
    }
  },
  mutations: {
    /* 修改弹出框显示状态 */
    update_peopleDialogFormVisible (state, formState) {
      state.peopleDialogFormVisible = formState
    },
    /* 编辑框给默认值 */
    update_form (state, form) {
      state.form.name = form.userName
      state.form.phone = form.phoneNum
      state.form.state = form.peopleState === 0
      state.form.value = form.roleName
    },
    /* 清空默认值 */
    empty (state) {
      state.form.name = ''
      state.form.phone = ''
      state.form.state = true
      state.form.value = ''
    }
  },
  actions: {
    /* 点击修改按钮 */
    updatePeople (context, form) {
      /* 编辑框给默认值 */
      context.commit('update_form', form)
      /* 显示弹出框 */
      context.commit('update_peopleDialogFormVisible', true)
    },
    /* 点击取消按钮 */
    cancel (context) {
      /* 关闭弹出框 */
      context.commit('update_peopleDialogFormVisible', false)
      /* 清空默认值 */
      context.commit('empty')
    },
    /* 点击保存按钮 */
    onSubmit (context) {
      /* 保存数据还没写 */
      /* 关闭弹出框 */
      context.commit('update_peopleDialogFormVisible', false)
      /* 清空默认值 */
      context.commit('empty')
    }
  }
}
