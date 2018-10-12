<template>
  <div id='addMenu'>
    <el-dialog title="添加人员" :visible.sync="peopleDialogFormVisible">
      <el-form :model="form">
        <el-form-item label="角色" :label-width="formLabelWidth">
         <el-select v-model="form.value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.managerName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.managerPhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio-group v-model="form.managerSex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
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
        <el-button @click="update_peopleDialogFormVisible(false)">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'addMenu',
  data () {
    return {
      options: [],
      formLabelWidth: '120px'
    }
  },
  // 检测到数据发生变动时就会执行对相应数据有引用的函数
  computed: {
    peopleDialogFormVisible: {
      // getter
      get () {
        return this.$store.state.people.peopleDialogFormVisible
      },
      // setter
      set: function (newValue) {
        this.$store.state.people.peopleDialogFormVisible = newValue
      }
    },
    form: {
      // getter
      get () {
        return this.$store.state.people.form
      },
      // setter
      set: function (newValue) {
        this.$store.state.people.form = newValue
      }
    }
  },
  // 页面加载完成调用
  mounted () {
    // 加载角色下拉数据
    this.loadRolel()
  },
  methods: {
    /* 确定按钮 */
    onSubmit () {
      /* 保存数据 */
      let params = {
        id: this.$store.state.people.form.id,
        managerName: this.$store.state.people.form.managerName,
        managerPhone: this.$store.state.people.form.managerPhone,
        managerSex: this.$store.state.people.form.managerSex,
        state: this.$store.state.people.form.state === true ? 0 : 1,
        roleId: this.$store.state.people.form.value,
        isUpdate: this.$store.state.people.form.isUpdate
      }
      var $this = this
      this.$ajax.insertUser(params).then(res => {
        if (res.code === 0) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.$store.dispatch('onSubmit')
          // 重新加载表格数据
          $this.$parent.loadTableRole()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /* 取消 */
    update_peopleDialogFormVisible (state) {
      this.$store.dispatch('cancel')
    },
    /* 加载可选角色 */
    loadRolel () {
      var $this = this
      this.$ajax.loadRolel(null).then(res => {
        $this.options = res.content
      })
    }
  }
}
</script>
