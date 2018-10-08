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
          width="100px">
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
            <el-button type="text" size="small" @click="submenu(scope.$index, scope.row)">查看子菜单</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="menuUrl"
          label="链接地址"
          width="180px">
        </el-table-column>
        <el-table-column
          prop="clconpic"
          label="图标"
          width="150px">
        </el-table-column>
        <el-table-column
          prop="tdate"
          label="创建时间"
          width="200px">
        </el-table-column>
        <el-table-column
          prop="fstate"
          label="状态"
          :formatter="formatterState"
          width="150px">
        </el-table-column>
        <el-table-column
          prop="fsort"
          label="排序"
          width="150px">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="300px">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="updateMenuState(scope.$index, scope.row)" v-if="scope.row.fstate == 1">启用</el-button>
            <el-button type="warning" size="small" @click="updateMenuState(scope.$index, scope.row)" v-if="scope.row.fstate == 0">禁用</el-button>
            <el-button type="danger" size="small" @click="delMenu(scope.$index, scope.row)">删除</el-button>
            <el-button type="primary" size="small">编辑</el-button>
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
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 点添加菜单出现的 -->
    <addMenu></addMenu>
  </div>
</template>

<script>
import addMenu from './AddMenu'  // 引入组件

export default {
  name: 'menuList',
  components: {   // 注册组件
    addMenu
  },
  data () {
    return {
      tableData: [],
      page: 1,
      total: 0,
      pageSize: 10,
      parentId: 0,
    }
  },
  // 页面加载完成调用
  mounted () {
    // 加载表格数据
    this.loadTableMenu(this.parentId)
  },
  methods: {
    // 每页多少条发生改变时触发
    handleSizeChange (val) {
      // 请求接口
      this.pageSize = val
      this.loadTableMenu(this.parentId)
      console.log(`每页 ${val} 条`)
    },
    // 第几页发生改变时触发
    handleCurrentChange (val) {
      // 请求接口
      this.page = val
      this.loadTableMenu(this.parentId)
      console.log(`当前页: ${val}`)
    },
    // 点击添加菜单(修改状态位true)
    update_dialogFormVisible(state) {
      var $this = this
      let params = {
        state: state,
        parentId: $this.parentId
      }
      this.$store.commit('update_dialogFormVisible', params)
    },
    // 删除
    delMenu (index, row) {
      var $this = this
      this.$confirm("确认删除该菜单吗", '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
      }).then(() => {
        let params = {
        id: row.id
        }
        // 访问接口删除菜单
        this.$ajax.delMenu(params).then(res => {
          if(res.code == 0) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            // 重新加载表格数据
            this.loadTableMenu($this.parentId)
          }else{
            this.$message.error('系统错误');
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
      
      
    },
    // 查看子菜单
    submenu(index, row) {
      // 替换父节点id
      this.parentId = row.id
      // 更新表格数据
      this.loadTableMenu(row.id);
    },
     // 类型转换成字
    formatterState(row, column, cellValue) {
      if (cellValue == 0) {
        return '启用'
      } else {
        return <span style="color: #F56C6C">禁用</span>
      }
    },
    // 加载表格数据
    loadTableMenu(parentId) {
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize,
        parentId: parentId
      }
      var $this = this
      this.$ajax.loadTableMenu(params).then(res => {
        // 表格数据
        $this.tableData = res.content.pageList
        // 总条数
        $this.total = res.content.totalRows
        // console.log(res.content.pageList)
      })
    },
    // 修改菜单状态 （启用 / 禁用）
    updateMenuState(index, row) {
      // 弹窗提示是否禁用启用
      this.$confirm('此操作将禁用该菜单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
      }).then(() => {
        let params = {
          id: row.id,
          fstate: row.fstate==0?1:0,
        }
        this.$ajax.updateMenuState(params).then(res => {
          
          this.$message({
            type: 'success',
            message: res.message
          });
        })
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
      
     
    }
  }
}
</script>

<style scoped>
  .block {
    margin-top:20px;
  }
</style>
