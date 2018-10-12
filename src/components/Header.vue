<template>
  <div id="MyHeader">
    <!-- 头部 -->
    <header class="el-header"  style="height: 80px; background-color: #F5DEB3">
        <span class="header-lang is-active left">
          后台管理LOGO
        </span>
        <div class="right">
           <img src="../assets/xm.jpg" class="hearder-img">
          <el-dropdown class="right">
            <span class="el-dropdown-link">
              <span v-text="username" style="font-size:20px">你的名字</span>
              <i class="el-dropdown-link el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="updatePwd(true)">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="logout()">退出登陆</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
    </header>
    <updatePwd></updatePwd>
  </div>
</template>

<script>
// 引入组件
import updatePwd from './UpdatePwd'

export default {
  name: 'MyHeader',
  // 注册组件
  components: {
    updatePwd
  },
  data () {
    return {
      username: window.localStorage.getItem('userName')
    }
  },
  methods: {
    updatePwd (boolean) {
      this.$store.commit('updatePwd_dialogFormVisible', boolean)
    },
    logout () {
      // window.localStorage.setItem('token', token)
      // 清除token缓存
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('userName')
      this.$router.push({path: '/Login'})
    }
  }
}
</script>

<style scoped>
  .hearder-img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 10px;
  }
  /* css注释：对divcss5-right设置float:right即可让对象靠右浮动 */
  .right {
    width: auto;
    height:auto;
    float: right;
    margin-top: 13px;
    margin-right: 20px
  }
  .left {
    width: auto;
    height: auto;
    float: left;
    margin-top: 25px;
    margin-left: 50px;
  }
</style>
