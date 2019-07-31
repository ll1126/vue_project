<template>
  <div id="roleList">
    <label style="margin-left: 20px">产品型号：</label>
      <el-input class="queryConditions"
        size="medium"
        placeholder="请输入名字"
        v-model="queryConditions.productModel">
      </el-input>
      <lable style="margin-left: 50px">操作类型：</lable>
      <el-input class="queryConditions"
        size="medium"
        placeholder="请输入手机号"
        v-model="queryConditions.operationsType">
      </el-input>
      <lable style="margin-left: 50px">操作时间：</lable>
      <el-input class="queryConditions"
        size="medium"
        placeholder="请输入手机号"
        v-model="queryConditions.managerPhone">
      </el-input>
    <el-button type="primary" style="margin-left: 20px;" @click="inquire()">查询</el-button>
    <br>
    <br>
    <br>
    <el-button type="success" @click="update_stockDialogFormVisible(true,1)">添加入库记录</el-button>
    <el-button type="warning" @click="update_stockDialogFormVisible(true,2)">添加出库记录</el-button>
    <el-button type="primary" @click="update_exportDialogVisible(true)">导出记录成Excel</el-button>
    <br>
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
          prop="productName"
          label="产品型号"
          width="auto">
        </el-table-column>
        <el-table-column
          fixed="left"
          prop="operationsType"
          label="操作类型"
          width="auto">
        </el-table-column>
        <el-table-column
          fixed="left"
          prop="operationsNumber"
          label="操作数量"
          width="auto">
        </el-table-column>
        <el-table-column
          fixed="left"
          prop="factory"
          label="厂家"
          width="auto">
        </el-table-column>
        <el-table-column
          fixed="left"
          prop="stockBalance"
          label="结余库存"
          width="auto">
        </el-table-column>
        <el-table-column
          fixed="left"
          prop="creatTime"
          label="操作时间"
          width="auto">
        </el-table-column>
        <el-table-column
          fixed="left"
          prop="creatUserName"
          label="操作人"
          width="auto">
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
    <addStock></addStock>
    <exportStock></exportStock>
  </div>
</template>

<script>
// 引入组件
import addStock from './AddStock'
import exportStock from './ExportStock'

export default {
  name: 'stockList',
  // 注册组件
  components: {
    addStock,
    exportStock
  },
  data () {
    return {
      tableData: [],
      page: 1,
      total: 0,
      pageSize: 10,
      queryConditions: {
        productModel:'',
        operationsType:'',
      }
    }
  },
  // 页面加载完成调用
  mounted () {
    // 加载表格数据
    this.loadTableStock()
  },
  methods: {
    // 每页多少条发生改变时触发
    handleSizeChange (val) {
      this.loadTableStock()
    },
    // 第几页发生改变时触发
    handleCurrentChange (val) {
      this.loadTableStock()
    },
    // 点击添加菜单(修改状态位true)
    update_stockDialogFormVisible (state,type) {
      let param = {
        tableState: state,
        typeValue: type
      }
      this.$store.commit('update_stockDialogFormVisible', param)
    },
    update_exportDialogVisible (state) {
      this.$store.commit('update_exportDialogVisible', state)
    },
    // 加载表格数据（所有产品）
    loadTableStock () {
      let params = {
        pageNum: this.page,
        pageSize: this.pageSize
      }
      var $this = this
      this.$ajax.loadTableStock(params).then(res => {
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
      this.$ajax.delStock(params).then(res => {
        this.$message({
          message: res.message,
          type: res.code === 0 ? 'success' : 'error'
        })
      })
    },
    // 编辑
    updateStock (index, row) {
      this.$store.dispatch('updateStock', row)
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
