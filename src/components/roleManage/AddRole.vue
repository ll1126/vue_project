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
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
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
    return{
      formLabelWidth: '120px',
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  //检测到数据发生变动时就会执行对相应数据有引用的函数
  computed:{
    roleDialogFormVisible: {
      // getter
      get () {
       return this.$store.state.role.roleDialogFormVisible
      },
      // setter
      set: function (newValue) {
         this.$store.state.role.roleDialogFormVisible = newValue;
      }
    },
    form: {
       // getter
      get () {
       return this.$store.state.role.form
      },
      // setter
      set: function (newValue) {
         this.$store.state.role.form = newValue;
      }
    }

  },
  methods: {
    /* 确定按钮 */
    onSubmit(){
      this.$store.dispatch('onSubmit')
    },
    /* 取消 */
    update_peopleDialogFormVisible(state){
      this.$store.dispatch('cancel')
    }


  }
}
</script>
