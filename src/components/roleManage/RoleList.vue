<template>
  <div id="roleList">
    <el-button type="primary"  @click="update_roleDialogFormVisible(true)">添加角色</el-button>
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
          width="auto">
        </el-table-column>
        <el-table-column
          fixed="left"
          prop="roleName"
          label="角色名称"
          width="auto">
        </el-table-column>
        <el-table-column
          fixed="left"
          prop="createName"
          label="创建人"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="peopleState"
          label="状态"
          :formatter="formatterState"
          width="auto">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200px">
          <template slot-scope="scope">
            <el-button type="text" @click="delRole(scope.$index, scope.row)">删除</el-button>
            <el-button type="text" size="small" @click="updateRole(scope.$index, scope.row)">编辑</el-button>
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
    <addRole></addRole>
  </div>
</template>

<script>
import addRole from './addRole'  //引入组件

export default {
  name: 'roleList',
  components: {   //注册组件
    addRole
  },
  data () {
    return {
      tableData: [{
        id: 1,
        roleName: '超级管理员',
        createName: '创建人',
        phoneNum: '16666666666',
        createTime: '2018-07-01',
        peopleState: 0
      }, {
        id: 2,
        roleName: '管理员',
        createName: '创建人',
        phoneNum: '16666666666',
        createTime: '2018-07-01',
        peopleState: 1
      }, {
        id: 3,
        roleName: '超级管理员',
        createName: '创建人',
        phoneNum: '16666666666',
        createTime: '2018-07-01',
        peopleState: 1
      }, {
        id: 4,
        roleName: '超级管理员',
        createName: '创建人',
        phoneNum: '16666666666',
        createTime: '2018-07-01',
        peopleState: 1
      }, {
        id: 5,
        roleName: '超级管理员',
        createName: '创建人',
        phoneNum: '16666666666',
        createTime: '2018-07-01',
        peopleState: 1
      }, {
        id: 6,
        roleName: '超级管理员',
        createName: '创建人',
        phoneNum: '16666666666',
        createTime: '2018-07-01',
        peopleState: 1
      }, {
        id: 7,
        roleName: '超级管理员',
        createName: '创建人',
        phoneNum: '16666666666',
        createTime: '2018-07-01',
        peopleState: 1
      }, {
        id: 8,
        roleName: '超级管理员',
        createName: '创建人',
        phoneNum: '16666666666',
        createTime: '2018-07-01',
        peopleState: 1
      }, {
        id: 9,
        roleName: '超级管理员',
        createName: '创建人',
        phoneNum: '16666666666',
        createTime: '2018-07-01',
        peopleState: 1
      }, {
        id: 10,
        roleName: '超级管理员',
        createName: '创建人',
        phoneNum: '16666666666',
        createTime: '2018-07-01',
        peopleState: 1
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
    update_roleDialogFormVisible(state){
      this.$store.commit('update_roleDialogFormVisible',state)
    },
    //删除
    delRole(index, row){
      console.log(index);
      console.log(row);
    },
    //编辑
    updateRole(index, row){
      this.$store.dispatch('updateRole',row)

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
