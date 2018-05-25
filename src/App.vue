<template>
  <div id="app">
    <!-- 头部 -->
    <MyHeader></MyHeader>
    <section class="el-container">
      <!-- 左侧导航 -->
      <MyMenu></MyMenu>
      <section class="el-container is-vertical" style="min-width: 1000px;">
        <!-- 标签页 -->
        <MyTab></MyTab>
        <main class="el-main">
          <!-- 展示子页面 -->
          <div>
              <!-- 根据路由展示 -->
             <router-view/>
          </div>
        </main>
      </section>
    </section>
  </div>
</template>

<script>
import MyHeader from './components/Header'  //引入头部组件
import MyMenu from './components/Menu'  //引入左侧导航组件
import MyTab from './components/tab'  //引入标签页组件


export default {
  //注册组件
  components: {
    MyHeader,
    MyMenu,
    MyTab
  },
  name: 'App',
  data () {
    return {

    }
  },
  methods: {

  }

}
</script>

<style>

</style>
