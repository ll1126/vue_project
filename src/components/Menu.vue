<template>
  <div id="Menu">
    <!-- 侧边导航 -->
    <aside class="el-aside" style="width: 300px">
      <el-row class="tac" >
        <el-col :span="24">
          <el-menu
          default-active="2"
          unique-opened
          class="el-menu-vertical-demo"
          background-color="#FFF"
          text-color="#000"
          active-text-color="#000">
            <template  v-for="(item) in navList" >
              <el-submenu v-bind:key="item.menuUrl" :index="item.menuUrl" v-if="item.hasChild > 0">
                <!-- 一级导航 -->
                <template slot="title">
                  {{item.menuName}}
                </template>
                <!-- 二级导航 -->
                <el-menu-item v-bind:key="itemChild.menuUrl" :index="itemChild.menuUrl" :href="itemChild.menuUrl" v-for="(itemChild) in item.child" @click="handelMenu(itemChild)">
                  {{itemChild.menuName}}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-bind:key="item.menuUrl" :index="item.menuUrl" v-else>
                {{item.menuName}}
              </el-menu-item>
            </template>
          </el-menu>
        </el-col>
      </el-row>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      /* 侧边导航数组 */
      navList: []
    }
  },
  // 页面加载完成调用
  mounted () {
    // 加载左侧导航
    this.loadMenu()
  },
  methods: {
    // 点击二级导航时
    handelMenu (item) {
      // 调用store里的 add_tab 增加标签页
      // 第一个参数是方法名，第二个参数是你要传过去的参数(json格式)
      this.$store.commit('add_tab', {onclickName: item.menuName, onclickPath: item.menuUrl})
      // 路由跳转
      this.$router.push({path: item.menuUrl})
    },
    // 加载左侧导航
    loadMenu () {
      let params = {
      }
      var $this = this
      this.$ajax.loadMenu(params).then(res => {
        $this.navList = res.content
      })
    }
  }
}
</script>

<style scoped>

</style>
