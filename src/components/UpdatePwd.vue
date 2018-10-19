<template>
  <div id='updatePwd'>
    <el-dialog title="修改密码" :visible.sync="updatePwdDialogFormVisible">
      <el-form :model="form"  :rules="rules2" >
        <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldPwd">
          <el-input v-model="form.oldPwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="firstNewPwd">
          <el-input v-model="form.firstNewPwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="secondNewPwd">
          <el-input v-model="form.secondNewPwd" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updatePwd_dialogFormVisible(false)">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'updatePwd',
  data () {
    var validateOldPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码'))
      } else {
        callback()
      }
    }
    var validateFirstNewPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (this.form.secondNewPwd !== '' && value !== this.form.secondNewPwd) {
        callback(new Error('两次新密码不一样'))
      } else {
        callback()
      }
    }
    var validateSecondNewPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (value !== this.form.firstNewPwd) {
        callback(new Error('两次新密码不一样'))
      } else {
        callback()
      }
    }
    return {
      form: {
        oldPwd: '',
        firstNewPwd: '',
        secondNewPwd: ''
      },
      formLabelWidth: '120px',
      rules2: {
        oldPwd: [
          { validator: validateOldPwd, trigger: 'blur' }
        ],
        firstNewPwd: [
          { validator: validateFirstNewPwd, trigger: 'blur' }
        ],
        secondNewPwd: [
          { validator: validateSecondNewPwd, trigger: 'blur' }
        ]
      }
    }
  },
  // 检测到数据发生变动时就会执行对相应数据有引用的函数
  computed: {
    updatePwdDialogFormVisible: {
      // getter
      get () {
        return this.$store.state.header.updatePwdDialogFormVisible
      },
      // setter
      set: function (newValue) {
        this.$store.state.header.updatePwdDialogFormVisible = newValue
      }
    }
  },
  methods: {
    /** 弹窗隐藏 */
    updatePwd_dialogFormVisible (boolean) {
      this.$store.commit('updatePwd_dialogFormVisible', boolean)
    },
    /** 确认修改 */
    onSubmit () {
      var oldPwd = this.form.oldPwd
      var firstNewPwd = this.form.firstNewPwd
      var secondNewPwd = this.form.secondNewPwd
      if (oldPwd === '') {
        this.$message.error('请输入原密码')
        return false
      }
      if (firstNewPwd === '') {
        this.$message.error('请输入新密码')
        return false
      }
      if (secondNewPwd === '') {
        this.$message.error('请输入新密码')
        return false
      }
      let params = {
        oldPwd: this.form.oldPwd,
        firstNewPwd: this.form.firstNewPwd,
        secondNewPwd: this.form.secondNewPwd
      }
      this.$ajax.updatePwd(params).then(res => {
        if (res.code === 0) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.updatePwd_dialogFormVisible(false)
          // 清除token缓存
          window.localStorage.removeItem('token')
          window.localStorage.removeItem('userName')
          this.$router.push({path: '/Login'})
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>
