<template>
  <div id="peopleList">
      <label style="margin-left: 20px">名字：</label>
      <el-input class="queryConditions"
        size="medium"
        placeholder="请输入名字"
        v-model="queryConditions.managerNameLike">
      </el-input>
      <lable style="margin-left: 50px">手机号：</lable>
      <el-input class="queryConditions"
        size="medium"
        placeholder="请输入手机号"
        v-model="queryConditions.managerPhone">
      </el-input>
      <el-button type="primary" style="margin-left: 20px;" @click="inquire()">查询</el-button>
    <div style="margin: 30px 20px">
      <el-button type="primary" @click="update_peopleDialogFormVisible(true)">添加人员</el-button>
    </div>
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
          prop="managerName"
          label="姓名"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="managerPhone"
          label="手机号"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="managerSex"
          label="性别"
          :formatter="formatterSex"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="auto">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          :formatter="formatterState"
          width="auto">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="300px">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="updateUserState(scope.$index, scope.row)" v-if="scope.row.state == 1">启用</el-button>
            <el-button type="warning" size="small" @click="updateUserState(scope.$index, scope.row)" v-if="scope.row.state == 0">禁用</el-button>
            <el-button type="danger" size="small" @click="delPeople(scope.$index, scope.row)">删除</el-button>
            <el-button type="primary" size="small" @click="updatePeople(scope.$index, scope.row)">编辑</el-button>
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
    <addPeople></addPeople>
  </div>
</template>

<script>
// 引入组件
import addPeople from './AddPeople'

export default {
  name: 'peopleList',
  // 注册组件
  components: {
    addPeople
  },
  data () {
    return {
      tableData: [],
      page: 1,
      total: 0,
      pageSize: 10,
      // 全部按钮状态
      buttonState: {
        disableButton: false
      },
      // 查询条件
      queryConditions: {
        managerNameLike: '',
        managerPhone: ''
      }
    }
  },
  // 页面加载完成调用
  mounted () {
    // 加载按钮状态
    this.loadButtonState()
    // 加载表格数据
    this.loadTableRole()
  },
  methods: {
    // 每页多少条发生改变时触发
    handleSizeChange (val) {
      this.loadTableRole()
    },
    // 第几页发生改变时触发
    handleCurrentChange (val) {
      this.loadTableRole()
    },
    // 点击添加菜单(修改状态位true)
    update_peopleDialogFormVisible (state) {
      this.$store.commit('update_peopleDialogFormVisible', state)
    },
    // 加载表格数据（所有角色）
    loadTableRole () {
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize
      }
      var $this = this
      this.$ajax.loadTableUser(params).then(res => {
        // 表格数据
        $this.tableData = res.content.pageList
        // 总条数
        $this.total = res.content.totalRows
      })
    },
    /** 查询 */
    inquire () {
      var $this = this
      $this.page = 1
      $this.pagesize = 10
      let params = {
        pageNum: $this.page,
        pageSize: $this.pageSize,
        managerNameLike: $this.queryConditions.managerNameLike,
        managerPhone: $this.queryConditions.managerPhone
      }
      $this.$ajax.loadTableUser(params).then(res => {
        // 表格数据
        $this.tableData = res.content.pageList
        // 总条数
        $this.total = res.content.totalRows
      })
    },
    // 删除
    delPeople (index, row) {
      let params = {
        id: row.id
      }
      this.$ajax.delUser(params).then(res => {
        this.$message({
          type: res.code === 0 ? 'success' : 'error',
          message: res.message
        })
        if (res.code === 0) {
          // 重新加载表格数据
          this.loadTableRole()
        }
      })
    },
    // 编辑
    updatePeople (index, row) {
      this.$store.dispatch('updatePeople', row)
    },
    // 修改用户状态
    updateUserState (index, row) {
      // 弹窗提示是否禁用启用
      var $this = this
      var mes = row.state === 0 ? '此操作将禁用该用户, 是否继续?' : '此操作将启用该用户, 是否继续?'
      this.$confirm(mes, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        let params = {
          id: row.id,
          state: row.state === 0 ? 1 : 0,
          isUpdate: 1
        }
        this.$ajax.insertUser(params).then(res => {
          $this.loadTableRole()
          this.$message({
            type: 'success',
            message: row.state === 0 ? '禁用成功' : '启用成功'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    // 加载按钮状态
    loadButtonState () {
      this.buttonState.disableButton = this.$store.state.buttonState.peopleManage.disable
    },
    // 类型转换成字
    formatterState (row, column, cellValue) {
      if (cellValue === 0) {
        return '启用'
      } else {
        return <span style="color: #F56C6C">禁用</span>
      }
    },
    formatterSex (row, column, cellValue) {
      if (cellValue === 0) {
        return '男'
      } else {
        return '女'
      }
    }

  }
}

</script>

<style scoped>
  .block {
    margin-top:20px;
  }
  .queryConditions {
    width: 200px;
  }
</style>
