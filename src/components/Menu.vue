<template>
  <div id="Menu">
    <!-- 侧边导航 -->
    <aside class="el-aside" style="width: 300px">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
            default-active="2"
            unique-opened
            class="el-menu-vertical-demo"
            background-color="#FFF"
            text-color="#000"
            active-text-color="#000">
                <template  v-for="(item) in navList" >
                　　<el-submenu :index="item.path" v-if="item.hasChild">
                        <!-- 一级导航 -->
                        <template slot="title">
                            {{item.name}}
                        </template>
                        <!-- 二级导航 -->
                    　　<el-menu-item :index="itemChild.path" :href="item.path" v-for="(itemChild , index) in item.children" @click="handelMenu(itemChild)">
                        　　{{itemChild.name}}
                    　　</el-menu-item>
                    </el-submenu>
            　　　 <el-menu-item :index="item.path" v-else>
                        {{item.name}}
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
      //侧边导航
      navList: [{name: '系统管理',hasChild: true,path: "/a",children:[{name: '菜单管理',path: '/MenuManage'},{name: '人员管理',path: '/PeopleManage'},{name: '角色管理',path: '/RoleManage'}]}
                  ,{name: '导航2',hasChild: true,path: "/b",children:[{name: '选项1',path: '/ab'},{name: '选项2',path: '/abb'},{name: '选项3',path: '/abbb'}]}],
    }
  },
  mounted () {
    // //加载左侧导航
    // this.loadMenu();
  },
  methods: {
    //点击二级导航时
    handelMenu(item){
      //调用store里的 add_tab 增加标签页
      //第一个参数是方法名，第二个参数是你要传过去的参数(json格式)
      this.$store.commit('add_tab',{onclickName: item.name,onclickPath: item.path})

      this.$router.push({path: item.path});
    },
  }
}
</script>

<style scoped>

</style>
