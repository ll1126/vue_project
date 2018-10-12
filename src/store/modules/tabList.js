export default {
  /* 顶上标签页 */
  state: {
    tabList: [{name: '主页', path: '/Main/Home'}],
    activeName: '主页'
  },
  getters: {
    not_show (tabList) { /* 这里的tabList对应着上面这个tabList */
      return tabList
    }
  },
  mutations: {
    /* 添加标签 */
    add_tab (state, obj) {
      /* 往标签页数组添加对象 */
      var tab = {}
      tab.name = obj.onclickName
      tab.path = obj.onclickPath
      /* tab标签页没存在时添加一个 */
      // console.log('选中的标签名字↓')
      // console.log(tab)
      if (!contains(state.tabList, tab)) {
        state.tabList.push(tab)
      }
      // console.log('已打开的标签↓')
      // console.log(state.tabList)
      /* 默认选中 */
      state.activeName = obj.onclickName
    },
    /* 删除标签 */
    remove_tab (state, onclickName) {
      var i = state.tabList.length
      while (i--) {
        if (state.tabList[i].name === onclickName) {
          var index = state.tabList.indexOf(state.tabList[i])
          if (index > -1) {
            state.tabList.splice(index, 1)
            if (index === i) {
              // 删除的tab页是最后个 ，选中最后个
              state.activeName = state.tabList[i - 1].name
            }
          }
          return
        }
      }
    }
  },
  actions: {
    switch_dialog (context) { /* 这里的context和我们使用的$store拥有相同的对象和方法 */
      context.commit('add_tab')
      /* 你还可以在这里触发其他的mutations方法 */
    }
  }
}

/* 判断该标签页是不是在数组里了 */
function contains (arr, obj) {
  var i = arr.length
  while (i--) {
    if (arr[i].name === obj.name) {
      return true
    }
  }
  return false
}
