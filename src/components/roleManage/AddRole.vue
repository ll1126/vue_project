<template>
  <div id='addRole'>
    <el-dialog title="添加角色" :visible.sync="roleDialogFormVisible">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="启用"
            inactive-text="禁用">
          </el-switch>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="form.menudata"
            show-checkbox
            node-key="id"
            ref="menuTree"
            :default-expanded-keys="[1, 1]"
            :default-checked-keys="form.checkmenudata"
            :props="defaultProps">
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="update_roleDialogFormVisible(false)">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'addRole',
  data () {
    return {
      formLabelWidth: '120px',
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  // 检测到数据发生变动时就会执行对相应数据有引用的函数
  computed: {
    roleDialogFormVisible: {
      // getter
      get () {
        return this.$store.state.role.roleDialogFormVisible
      },
      // setter
      set: function (newValue) {
        this.$store.state.role.roleDialogFormVisible = newValue
      }
    },
    form: {
      // getter
      get () {
        return this.$store.state.role.form
      },
      // setter
      set: function (newValue) {
        this.$store.state.role.form = newValue
      }
    }
  },
  // 页面加载完成调用
  mounted () {
    // 加载表格数据
    this.loadRoleMenu()
  },
  methods: {
    /* 确定按钮 */
    onSubmit () {
      // 选中的key组成的数组
      var a = this.$refs.menuTree.getCheckedKeys()
      // 半选中的key组成的数组（一般为父节点）
      var b = this.$refs.menuTree.getHalfCheckedKeys()
      // 合并后的数组(字符串， 用 ',' 拼接)
      var c = a.concat(b).join(',')
      let params = {
        id: this.$store.state.role.form.id,
        // 角色名字
        cname: this.$store.state.role.form.rolename,
        // 选中的菜单id（字符串，用 ',' 拼接）
        checkMenu: c,
        // 是否启用 0：启用 1：禁用
        fstate: this.$store.state.role.form.state === true ? 0 : 1,
        isUpdate: this.$store.state.role.form.isUpdate
      }
      // 访问接口
      this.$ajax.insertRole(params).then(res => {
        if (res.code === 0) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.$store.dispatch('onSubmit')
          // 重新加载外面表格数据
          this.$parent.loadTableRole()
        }
      })
    },
    /* 取消 */
    update_roleDialogFormVisible (state) {
      // console.log("取消")
      this.$store.dispatch('cancel')
      // 获取已经设置的资源后渲染
      this.$refs.menuTree.setCheckedKeys(this.form.checkmenudata)
    },
    /* 加载所有菜单节点 */
    loadRoleMenu () {
      this.$ajax.loadRoleMenu('').then(res => {
        this.$store.dispatch('loadMenu', res.content)
      })
    }
  }
}
</script>
