<template>
  <div id="menuList">
    <el-button type="primary"  @click="update_dialogFormVisible(true)" v-text="button_state ? '添加按钮':'添加菜单'">添加菜单</el-button>
    <el-button type="primary"  :disabled="return_lastMune_state" @click="return_lastMenu()">返回上一级菜单</el-button>
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
            <el-button type="text" size="small" @click="submenu(scope.$index, scope.row)" v-if="!button_state">查看子菜单</el-button>
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
            <el-button type="primary" size="small" @click="updateMenu(scope.$index, scope.row)"> 编辑</el-button>
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
// 引入组件
import addMenu from './AddMenu'

export default {
  name: 'menuList',
  // 注册组件
  components: {
    addMenu
  },
  data () {
    return {
      tableData: [],
      page: 1,
      total: 0,
      pageSize: 10,
      parentId: 0,
      // 每次的parentId记录（【返回上一级菜单】用）
      history_parentId: '',
      // 【返回上一级菜单】 是否显示  false 显示  true 不显示
      return_lastMune_state: true,
      // true：显示【按钮】  false：显示【菜单】
      button_state: false
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
    },
    // 第几页发生改变时触发
    handleCurrentChange (val) {
      // 请求接口
      this.page = val
      this.loadTableMenu(this.parentId)
    },
    // 点击添加菜单(修改状态为true)
    update_dialogFormVisible (state) {
      var $this = this
      let params = {
        state: state,
        parentId: $this.parentId,
        isButton: $this.button_state === false ? 0 : 1
      }
      this.$store.commit('update_dialogFormVisible', params)
    },
    // 删除
    delMenu (index, row) {
      var $this = this
      this.$confirm('确认删除该菜单吗', '提示', {
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
          if (res.code === 0) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            // 重新加载表格数据
            this.loadTableMenu($this.parentId)
          } else {
            this.$message.error('系统错误')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 查看子菜单
    submenu (index, row) {
      // 替换父节点id
      this.parentId = row.id
      var history = this.history_parentId
      this.history_parentId = history + (history === '' ? '' : ',') + row.fparentid
      // 更新表格数据
      this.loadTableMenu(row.id)
      // 开启 返回上一级菜单 按钮
      this.return_lastMune_state = false
      // 进入二级菜单后 显示按钮
      if (this.history_parentId.indexOf(',') !== -1) {
        this.button_state = true
      }
      // 修改store parentid 的值  添加页面用
      this.$store.state.menu.fparentid = row.id
    },
    // 返回上一级菜单
    return_lastMenu () {
      // 从 history_parentId 中找到上一级id
      var parentIds = this.history_parentId.split(',')
      // 更新表格数据
      this.parentId = parentIds[parentIds.length - 1]
      this.loadTableMenu(parentIds[parentIds.length - 1])
      // 删除最后个parentId
      parentIds.splice(parentIds[parentIds.length - 1], 1)
      this.history_parentId = parentIds.join(',')
      // 如果已经在最顶级的菜单了  禁用 返回上一级菜单 按钮
      if (this.history_parentId === '') {
        this.return_lastMune_state = true
      }
      this.button_state = false
      this.$store.state.menu.fparentid = this.parentId
    },
    // 类型转换成字
    formatterState (row, column, cellValue) {
      if (cellValue === 0) {
        return '启用'
      } else {
        return <span style="color: #F56C6C">禁用</span>
      }
    },
    // 加载表格数据
    loadTableMenu (parentId) {
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
      })
    },
    // 修改菜单状态 （启用 / 禁用）
    updateMenuState (index, row) {
      // 弹窗提示是否禁用启用
      this.$confirm('此操作将禁用该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        let params = {
          id: row.id,
          fstate: row.fstate === 0 ? 1 : 0
        }
        this.$ajax.updateMenuState(params).then(res => {
          this.$message({
            type: 'success',
            message: res.message
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    // 编辑菜单
    updateMenu (index, row) {
      this.$store.dispatch('updateMenu', row)
    }
  }
}
</script>

<style scoped>
  .block {
    margin-top:20px;
  }
</style>
