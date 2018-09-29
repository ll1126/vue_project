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
          prop="cname"
          label="角色名称"
          width="auto">
        </el-table-column>
        <el-table-column
          fixed="left"
          prop="cdesc"
          label="角色描述"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="fstate"
          label="状态"
          :formatter="formatterState"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="tdate"
          label="最后修改时间"
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
          :total="total">
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
      tableData: [],
      page: 1,
      total: 0,
      pageSize: 10,
    }
  },
  // 页面加载完成调用
  mounted () {
    // 加载表格数据
    this.loadTableRole()
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
    // 加载表格数据（所有角色）
    loadTableRole(){
      let params={
        pageNum: this.page,
        pageSize: this.pageSize
      }
      var $this = this
      this.$ajax.loadTableRole(params).then(res => {
        //表格数据
        $this.tableData = res.content.pageList
        //总条数
        $this.total = res.content.totalRows
        // console.log(res.content.pageList)
      })
    },
    //删除
    delRole(index, row){
      let params={
        id: row.id
      }
      var $this = this
      this.$ajax.delRole(params).then(res => {
        if(res.code==0){
          this.$message({
            message: res.message,
            type: 'success'
          });
          //重新加载表格数据
          $this.loadTableRole()
        }
      })
    },
    //编辑
    updateRole(index, row){
      this.$store.dispatch('updateRole',row)

    },
    //类型转换成字
    formatterState(row, column, cellValue) {
      if(cellValue == 0){
        return '启用'
      }else{
        return <span style="color: #F56C6C">禁用</span>
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
