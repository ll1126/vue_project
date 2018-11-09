<template>
  <div id='addMenu'>
    <el-dialog :title="type" :visible.sync="dialogFormVisible" @close="menu_dialogClose()">
      <el-form :model="menu">
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="menu.menuName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="this.$store.state.menu.isButton == 0 ? '菜单路由' : '按钮标识'" :label-width="formLabelWidth">
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
          v-model="menu.fstate"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="启用"
          inactive-text="禁用">
        </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="menu_dialogClose()">取 消</el-button>
        <el-button type="primary" @click="save(false)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'addMenu',
  data () {
    return {
      formLabelWidth: '120px'
    }
  },
  // 检测到数据发生变动时就会执行对相应数据有引用的函数
  computed: {
    menu: {
      // getter
      get () {
        return this.$store.state.menu.menu
      },
      // setter
      set: function (newValue) {
        this.$store.state.menu.menu = newValue
      }
    },
    type: {
      // getter
      get () {
        return this.$store.state.menu.type
      },
      // setter
      set: function (newValue) {
        this.$store.state.menu.type = newValue
      }
    },
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
    // 保存
    save (state) {
      var $this = this
      // 添加时 赋值父节点id
      var fparentid
      if (!this.$store.state.menu.idUpdate) {
        fparentid = this.$store.state.menu.fparentid
      }
      // 参数
      let params = {
        id: this.$store.state.menu.menu.id,
        menuName: this.$store.state.menu.menu.menuName,
        menuUrl: this.$store.state.menu.menu.menuUrl,
        clconpic: this.$store.state.menu.menu.clconpic,
        fsort: this.$store.state.menu.menu.fsort,
        fstate: this.$store.state.menu.menu.fstate === true ? 0 : 1,
        isUpdate: this.$store.state.menu.isUpdate,
        isButton: this.$store.state.menu.isButton,
        fparentid: fparentid
      }
      // 访问接口保存数据
      this.$ajax.insertMenu(params).then(res => {
        if (res.code === 0) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          // 关闭dialog并清空dialog里的数据
          $this.menu_dialogClose()
          // 重新加载表格数据
          $this.$parent.loadTableMenu(fparentid)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /** dialog关闭执行 */
    menu_dialogClose () {
      this.$store.dispatch('menu_dialogClose')
    }
  }
}
</script>
