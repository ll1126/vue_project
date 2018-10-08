<template>
  <div id='addMenu'>
    <el-dialog title="添加菜单" :visible.sync="dialogFormVisible">
      <el-form :model="menu">
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="menu.menuName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" :label-width="formLabelWidth">
          <el-input v-model="menu.menuUrl" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth">
          <el-input v-model="menu.clconpic" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="menu.fsort" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
          v-model="menu.fstate == 0"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="启用"
          inactive-text="禁用">
        </el-switch>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="update_dialogFormVisible(false)">取 消</el-button>
        <el-button type="primary" @click="update_dialogFormVisible(false)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'addMenu',
  data () {
    return {
      menu: {
        menuName: '',
        menuUrl: '',
        clconpic: '',
        fsort: '',
        fstate: 0,
        fpartentid: 0
      },
      formLabelWidth: '120px'
    }
  },
  // 检测到数据发生变动时就会执行对相应数据有引用的函数
  computed: {
    dialogFormVisible: {
      // getter
      get () {
       return this.$store.state.menu.dialogFormVisible
      },
      // setter
      set: function (newValue) {
          this.$store.state.menu.dialogFormVisible = newValue
      }
    }
  },
  methods: {
    // 修改store仓库的 dialogFormVisible 的值
    update_dialogFormVisible (state) {
      var $this = this
      // 赋值 父节点id
      $this.menu.fpartentid = this.$store.state.menu.fpartentid
      // 访问接口保存数据
      this.$ajax.insertMenu($this.menu).then(res => {
        if (res.code === 0) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          // 隐藏窗口
          $this.$store.commit('update_dialogFormVisible', {state: state})
          // 重新加载表格数据
          $this.$parent.loadTableMenu($this.menu.fpartentid)
          // 清空之前数据
          $this.empty()
        } else {
          this.$message.error('系统错误')
        }
      })
    },
    // 清空值
    empty () {
      this.menu.menuName = ''
      this.menu.menuUrl = ''
      this.menu.clconpic = ''
      this.menu.fsort = ''
      this.menu.fstate = 0
    }
  }
}
</script>
