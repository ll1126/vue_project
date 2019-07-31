<template>
  <div id='addProduct'>
    <el-dialog title="添加产品" :visible.sync="productDialogFormVisible" @close="product_dialogClose()">
      <el-form :model="product">
        <el-form-item label="产品型号" :label-width="formLabelWidth">
          <el-input v-model="product.productModel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品数量" :label-width="formLabelWidth">
          <el-input v-model="product.productNumber" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="product_dialogClose()">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'addProduct',
  data () {
    return {
      options: [],
      formLabelWidth: '120px'
    }
  },
  // 检测到数据发生变动时就会执行对相应数据有引用的函数
  computed: {
    productDialogFormVisible: {
      // getter
      get () {
        return this.$store.state.product.productDialogFormVisible
      },
      // setter
      set: function (newValue) {
        this.$store.state.product.productDialogFormVisible = newValue
      }
    },
    product: {
      // getter
      get () {
        return this.$store.state.product.product
      },
      // setter
      set: function (newValue) {
        this.$store.state.product.product = newValue
      }
    }
  },
  // 页面加载完成调用
  mounted () {
  },
  methods: {
    /* 确定按钮 */
    onSubmit () {
      /* 保存数据 */
      let params = {
        id: this.$store.state.product.product.id,
        productModel: this.$store.state.product.product.productModel,
        productNumber: this.$store.state.product.product.productNumber,
        isUpdate: this.$store.state.product.isUpdate,
      }
      var $this = this
      this.$ajax.insertProduct(params).then(res => {
        if (res.code === 0) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.$store.dispatch('cancel')
          // 重新加载表格数据
          $this.$parent.loadTableProduct()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /* 取消 */
    product_dialogClose () {
      this.$store.dispatch('cancel')
    }
  }
}
</script>
