export default {
  /* 用户添加页 */
  state: {
    /* 弹出框状态 */
    peopleDialogFormVisible: false,
    /* 弹出框数据 */
    form: {
      id: '',
      managerName: '',
      managerPhone: '',
      managerSex: 0,
      state: true,
      value: '',
      isUpdate: false
    }
  },
  mutations: {
    /* 修改弹出框显示状态 */
    update_peopleDialogFormVisible (state, formState) {
      state.peopleDialogFormVisible = formState
    },
    /* 编辑框给默认值 */
    update_people_form (state, form) {
      state.form.id = form.id
      state.form.managerName = form.managerName
      state.form.managerPhone = form.managerPhone
      state.form.managerSex = form.managerSex
      state.form.state = form.state === 0
      state.form.value = form.roleId
      /* isUpdate:true 修改  false：新增  */
      state.form.isUpdate = true
    },
    /* 清空默认值 */
    empty (state) {
      state.form.id = ''
      state.form.managerName = ''
      state.form.managerPhone = ''
      state.form.managerSex = 0
      state.form.state = true
      state.form.value = ''
      state.form.isUpdate = false
    }
  },
  actions: {
    /* 点击修改按钮 */
    updatePeople (context, form) {
      /* 编辑框给默认值 */
      context.commit('update_people_form', form)
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
      /* 关闭弹出框 */
      context.commit('update_peopleDialogFormVisible', false)
      /* 清空默认值 */
      context.commit('empty')
    }
  }
}
