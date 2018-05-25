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
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" auto-complete="off"></el-input>
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
    return{
       options: [{
          value: '1',
          label: '超级管理员'
        }, {
          value: '2',
          label: '管理员'
        }, {
          value: '3',
          label: '小管理员'
        }, {
          value: '4',
          label: '究极管理员'
        }],
      formLabelWidth: '120px'
    }
  },
  //检测到数据发生变动时就会执行对相应数据有引用的函数
  computed:{
    peopleDialogFormVisible: {
      // getter
      get () {
       return this.$store.state.people.peopleDialogFormVisible
      },
      // setter
      set: function (newValue) {
         this.$store.state.people.peopleDialogFormVisible = newValue;
      }
    },
    form: {
       // getter
      get () {
       return this.$store.state.people.form
      },
      // setter
      set: function (newValue) {
         this.$store.state.people.form = newValue;
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
