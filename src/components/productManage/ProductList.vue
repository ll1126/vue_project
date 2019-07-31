<template>
  <div id="roleList">
    <el-button type="primary"  @click="update_productDialogFormVisible(true)">添加产品</el-button>
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
          prop="productModel"
          label="产品型号"
          width="auto">
        </el-table-column>
        <el-table-column
          fixed="left"
          prop="productNumber"
          label="库存"
          width="auto">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="auto">
          <template slot-scope="scope">
            <el-button type="danger" size="small"  @click="delProduct(scope.$index, scope.row)">删除</el-button>
            <el-button type="primary" size="small" @click="updateProduct(scope.$index, scope.row)">编辑</el-button>
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
    <addProduct></addProduct>
  </div>
</template>

<script>
// 引入组件
import addProduct from './AddProduct'

export default {
  name: 'productList',
  // 注册组件
  components: {
    addProduct
  },
  data () {
    return {
      tableData: [],
      page: 1,
      total: 0,
      pageSize: 10
    }
  },
  // 页面加载完成调用
  mounted () {
    // 加载表格数据
    this.loadTableProduct()
  },
  methods: {
    // 每页多少条发生改变时触发
    handleSizeChange (val) {
      this.loadTableProduct()
    },
    // 第几页发生改变时触发
    handleCurrentChange (val) {
      this.loadTableProduct()
    },
    // 点击添加菜单(修改状态位true)
    update_productDialogFormVisible (state) {
      this.$store.commit('update_productDialogFormVisible', state)
    },
    // 加载表格数据（所有产品）
    loadTableProduct () {
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize
      }
      var $this = this
      this.$ajax.loadTableProduct(params).then(res => {
        // 表格数据
        $this.tableData = res.content.pageList
        // 总条数
        $this.total = res.content.totalRows
      })
    },
    // 删除
    delRole (index, row) {
      let params = {
        id: row.id
      }
      var $this = this
      this.$ajax.delProduct(params).then(res => {
        this.$message({
          message: res.message,
          type: res.code === 0 ? 'success' : 'error'
        })
        if (res.code === 0) {
          // 重新加载表格数据
          $this.loadTableRole()
        }
      })
    },
    // 编辑
    updateProduct (index, row) {
      this.$store.dispatch('updateProduct', row)
    }
  }
}
</script>

<style scoped>
  .block {
    margin-top:20px;
  }
</style>
