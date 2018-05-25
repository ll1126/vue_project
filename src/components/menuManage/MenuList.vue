<template>
  <div id="menuList">
    <el-button type="primary"  @click="update_dialogFormVisible(true)">添加菜单</el-button>
    <div>
      <el-table
      :data="tableData"
      align="center"
      style="width: 100%"
      max-height="600">
        <el-table-column
          fixed="left"
          label="序号"
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          fixed="left"
          prop="menuType"
          label="菜单类别"
          width="180px">
        </el-table-column>
        <el-table-column
          fixed="left"
          prop="menuName"
          label="菜单名称"
          width="180px">
        </el-table-column>
        <el-table-column
          prop="menuChildren"
          label="子菜单"
          width="180px">
           <template slot-scope="scope">
            <el-button type="text" size="small">查看子菜单</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="menuUrl"
          label="链接地址"
          width="180px">
        </el-table-column>
        <el-table-column
          prop="menuLcon"
          label="图标"
          width="150px">
        </el-table-column>
        <el-table-column
          prop="menuCreateTime"
          label="创建时间"
          width="200px">
        </el-table-column>
        <el-table-column
          prop="menuState"
          label="状态"
          :formatter="formatterState"
          width="150px">
        </el-table-column>
        <el-table-column
          prop="menuNum"
          label="排序"
          width="150px">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200px">
          <template slot-scope="scope">
            <el-button type="text" @click="delMenu(scope.$index, scope.row)">删除</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="35">
        </el-pagination>
      </div>
    </div>
    <!-- 点添加菜单出现的 -->
    <addMenu></addMenu>
  </div>
</template>

<script>
import addMenu from './AddMenu'  //引入组件

export default {
  name: 'menuList',
  components: {   //注册组件
    addMenu
  },
  data () {
    return {
      tableData: [{
        menuid: 1,
        menuType: '一级菜单',
        menuName: '系统管理',
        menuChildren: '子菜单',
        menuUrl: 'www.baidu.com',
        menuLcon: '图标',
        menuCreateTime: '2018-08-08',
        menuState: 1,
        menuNum: 1
      }, {
        menuid: 2,
        menuType: '一级菜单',
        menuName: '系统管理',
        menuChildren: '子菜单',
        menuUrl: 'www.baidu.com',
        menuLcon: '图标',
        menuCreateTime: '2018-08-08',
        menuState: 1,
        menuNum: 1
      }, {
        menuid: 3,
        menuType: '一级菜单',
        menuName: '系统管理',
        menuChildren: '子菜单',
        menuUrl: 'www.baidu.com',
        menuLcon: '图标',
        menuCreateTime: '2018-08-08',
        menuState: 1,
        menuNum: 1
      }, {
        menuid: 4,
        menuType: '一级菜单',
        menuName: '系统管理',
        menuChildren: '子菜单',
        menuUrl: 'www.baidu.com',
        menuLcon: '图标',
        menuCreateTime: '2018-08-08',
        menuState: 1,
        menuNum: 1
      }, {
        menuid: 5,
        menuType: '一级菜单',
        menuName: '系统管理',
        menuChildren: '子菜单',
        menuUrl: 'www.baidu.com',
        menuLcon: '图标',
        menuCreateTime: '2018-08-08',
        menuState: 1,
        menuNum: 1
      }, {
        menuid: 6,
        menuType: '一级菜单',
        menuName: '系统管理',
        menuChildren: '子菜单',
        menuUrl: 'www.baidu.com',
        menuLcon: '图标',
        menuCreateTime: '2018-08-08',
        menuState: 1,
        menuNum: 1
      }, {
        menuid: 7,
        menuType: '一级菜单',
        menuName: '系统管理',
        menuChildren: '子菜单',
        menuUrl: 'www.baidu.com',
        menuLcon: '图标',
        menuCreateTime: '2018-08-08',
        menuState: 1,
        menuNum: 1
      }, {
        menuid: 8,
        menuType: '一级菜单',
        menuName: '系统管理',
        menuChildren: '子菜单',
        menuUrl: 'www.baidu.com',
        menuLcon: '图标',
        menuCreateTime: '2018-08-08',
        menuState: 1,
        menuNum: 1
      }, {
        menuid: 9,
        menuType: '一级菜单',
        menuName: '系统管理',
        menuChildren: '子菜单',
        menuUrl: 'www.baidu.com',
        menuLcon: '图标',
        menuCreateTime: '2018-08-08',
        menuState: 1,
        menuNum: 1
      }, {
        menuid: 10,
        menuType: '一级菜单',
        menuName: '系统管理',
        menuChildren: '子菜单',
        menuUrl: 'www.baidu.com',
        menuLcon: '图标',
        menuCreateTime: '2018-08-08',
        menuState: 1,
        menuNum: 1
      }],
      page: 2,
    }
  },
  methods: {
    //每页多少条发生改变时触发
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //第几页发生改变时触发
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //点击添加菜单(修改状态位true)
    update_dialogFormVisible(state){
      this.$store.commit('update_dialogFormVisible',state)
    },
    //删除
    delMenu(index, row){
      console.log(index);
      console.log(row);
    },
     //类型转换成字
    formatterState(row, column, cellValue) {
      if(cellValue==0){
        return '启用'
      }else{
        return '禁用'
      }
    }

  }
}
</script>

<style scoped>
  .block {
    margin-top:20px;
  }
</style>
