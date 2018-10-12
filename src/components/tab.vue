<template>
  <div id="tab">
    <!-- 展示Tab标签 -->
    <div>
        <el-tabs v-model="activeName" type="card" closable @tab-remove="removeTab" @tab-click="handleClick">
            <el-tab-pane
                :key="tab.name"
                v-for="(tab) in tabList"
                :label="tab.name"
                :name="tab.name"
            >
            </el-tab-pane>
        </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab',
  data () {
    return {

    }
  },
  // 检测到数据发生变动时就会执行对相应数据有引用的函数
  computed: {
    tabList () {
      return this.$store.state.tabList.tabList
    },
    activeName: {
      // return this.$store.state.tabList.activeName
      get () {
        return this.$store.state.tabList.activeName
      },
      // setter
      set: function (newValue) {
        this.$store.state.tabList.activeName = newValue
      }
    }
  },
  methods: {
    // 切换Tab页
    handleClick (tab, event) {
      this.routerPush(tab.name)
    },
    // 删除tab
    removeTab (name) {
      // 调用store里的 remove_tab 删除标签页
      this.$store.commit('remove_tab', name)
      this.routerPush(this.activeName)
    },
    // 切换路由
    routerPush (name) {
      var tabList = this.$store.state.tabList.tabList
      var tabLength = tabList.length
      while (tabLength--) {
        if (tabList[tabLength].name === name) {
          // 改变路由
          // console.log('改变路由后的路径↓')
          // console.log(tabList[tabLength].path)
          this.$router.push({path: tabList[tabLength].path})
          return
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
