<template>
  <div id='addMenu'>
    <el-dialog title="添加菜单" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="菜单类别" :label-width="formLabelWidth">
          <el-input v-model="form.type" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" :label-width="formLabelWidth">
          <el-input v-model="form.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth">
          <el-input v-model="form.lcon" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="form.num" auto-complete="off"></el-input>
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
    return{
      form: {
        type: '',
        name: '',
        url: '',
        lcon: '',
        num: '',
        state: true,
      },
      formLabelWidth: '120px'
    }
  },
  //检测到数据发生变动时就会执行对相应数据有引用的函数
  computed:{
    dialogFormVisible: {
      // getter
      get () {
       return this.$store.state.menu.dialogFormVisible
      },
      // setter
      set: function (newValue) {
          this.$store.state.menu.dialogFormVisible = newValue;
      }
    },

  },
  methods: {
    //修改store仓库的 dialogFormVisible 的值
    update_dialogFormVisible(state){
      this.$store.commit('update_dialogFormVisible',state)
    }

  }
}
</script>
