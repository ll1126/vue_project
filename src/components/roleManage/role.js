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
      menudata: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }]
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
      state.form.name = ''
      state.form.phone = ''
      state.form.state = true
      state.form.value = ''
    }
  },
  actions: {
    updateRole (context, form) {
      console.log(form)
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
      /* 保存数据还没写 */
      /* 关闭弹出框 */
      context.commit('update_roleDialogFormVisible', false)
      /* 清空默认值 */
      context.commit('empty')
    }
  }
}
