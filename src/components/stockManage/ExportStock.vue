<template>
  <div id='exportStock'>
    <el-dialog title="导出数据" :visible.sync="exportDialogVisible" @close="stock_dialogClose()">
     <div class="block">
      <span class="demonstration">月</span>
      <el-date-picker
        v-model="month"
        type="month"
        placeholder="选择月">
      </el-date-picker>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="stock_dialogClose()">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'exportStock',
  data () {
    return {
      formLabelWidth: '120px',
      month: ''
    }
  },
  // 检测到数据发生变动时就会执行对相应数据有引用的函数
  computed: {
    exportDialogVisible: {
      // getter
      get () {
        return this.$store.state.stock.exportDialogVisible
      },
      // setter
      set: function (newValue) {
        this.$store.state.stock.exportDialogVisible = newValue
      }
    }
  },
  // 页面加载完成调用
  mounted () {
  },
  methods: {
    /* 确定按钮 */
    onSubmit () {
      var d = this.month
      var youWant= d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      window.open(process.env.API_ROOT+"/stock/api/exportStock?date="+youWant);
      this.stock_dialogClose()
    },
    /* 取消 */
    stock_dialogClose () {
      this.$store.commit('update_exportDialogVisible', false)
    }
  }
}
</script>
