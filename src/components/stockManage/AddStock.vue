<template>
  <div id='addStock'>
    <el-dialog :title="stock.type" :visible.sync="stockDialogFormVisible" @close="stock_dialogClose()">
      <el-form :model="stock">
        <el-form-item label="型号" :label-width="formLabelWidth">
          <el-select v-model="stock.productId" filterable placeholder="请选择" >
            <el-option
              v-for="item in options"
              :key="item.productModel"
              :label="item.productModel"
              :value="item.id"
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="stock.operationsNumber" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="厂家" :label-width="formLabelWidth">
          <el-input v-model="stock.factory" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="stock_dialogClose()">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'addStock',
  data () {
    return {
      options: [],
      formLabelWidth: '120px',
    }
  },
  // 检测到数据发生变动时就会执行对相应数据有引用的函数
  computed: {
    stockDialogFormVisible: {
      // getter
      get () {
        return this.$store.state.stock.stockDialogFormVisible
      },
      // setter
      set: function (newValue) {
        this.$store.state.stock.stockDialogFormVisible = newValue
      }
    },
    stock: {
      // getter
      get () {
        return this.$store.state.stock.stock
      },
      // setter
      set: function (newValue) {
        this.$store.state.stock.stock = newValue
      }
    }
  },
  // 页面加载完成调用
  mounted () {
    // 加载所有的型号
    this.loadAllProductModel()
  },
  methods: {
    /* 确定按钮 */
    onSubmit () {
      /* 保存数据 */
      let params = {
        operationsType: this.$store.state.stock.stock.operationsType,
        productId: this.$store.state.stock.stock.productId,
        operationsNumber: this.$store.state.stock.stock.operationsNumber,
        factory: this.$store.state.stock.stock.factory
      }
      var $this = this
      this.$ajax.insertStock(params).then(res => {
        if (res.code === 0) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.$store.dispatch('cancel')
          // 重新加载表格数据
          $this.$parent.loadTableStock()
        }
      })
    },
    /* 取消 */
    stock_dialogClose () {
      this.$store.dispatch('cancel')
    },
    loadAllProductModel () {
      var $this = this
      this.$ajax.getAllProductModel().then(res => {
        if (res.code === 0) {
          $this.options = res.content
        } else {
          this.$message.error('加载产品里列表失败,请联系管理员')
        }
      })
    }
  }
}
</script>
