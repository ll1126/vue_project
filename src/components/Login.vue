<template>
  <div id="Login">
    <div class="wrap" style="height:100%">
    <div class="container">
      <div class="loginForm">
        <h1>Welcome</h1>
        <el-form :model="loginForm" status-icon :rules="rules2" ref="loginForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" prop="userName">
            <el-input type="text" v-model="loginForm.userName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userPass">
            <el-input type="password" v-model="loginForm.userPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login()" style="margin-left: 100px">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
      </div>
      <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    var validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    var validateUserPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userName: '',
        userPass: ''
      },
      rules2: {
        userName: [
          { validator: validateUserName, trigger: 'blur' }
        ],
        userPass: [
          { validator: validateUserPass, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    /* 页面加载时调用 */
  },
  methods: {
    /* 方法区 */
    login () {
      var userName = this.loginForm.userName
      var userPass = this.loginForm.userPass
      if (userName === '') {
        this.$message.error('请输入账号')
        return false
      }
      if (userPass === '') {
        this.$message.error('请输入密码')
        return false
      }
      /* 登陆 */
      let params = {
        userName: userName,
        password: userPass
      }
      var $this = this
      this.$ajax.login(params).then(res => {
        if (res.code === 0) {
          $this.$message({
            message: res.message,
            type: 'success'
          })
          // 把token存起来
          var token = res.content
          window.localStorage.setItem('token', token)
          window.localStorage.setItem('userName', userName)
          this.$router.push({path: '/Main/Home'})
        } else {
          $this.$message.error(res.message)
        }
      })
    }
  }
}

</script>

<style scoped>
  .loginForm {
    width:400px;/**宽度**/
    position:absolute;/**绝对定位**/
    left:40%;/**左边40%**/
    top:30%;/**顶部30%**/
    margin-top:-50px;/**上移-50%**/
    margin-left:-100px;/**左移-50%**/
  }
  </style>
  <style type="text/css">
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    font: 16px/20px microsft yahei;
  }
  .wrap {
    width: 100%;
    height: 400px;
    padding: 40px 0;
    position: fixed;
    /* top: 50%; */
    /* margin-top: -200px; */
    opacity: 0.8;
    background: linear-gradient(to bottom right,#50a3a2,#53e3a6);
    background: -webkit-linear-gradient(to bottom right,#50a3a2,#53e3a6);
  }
  .container {
    width: 60%;
    margin: 0 auto;
  }
  .container h1 {
    text-align: center;
    color: #FFFFFF;
    font-weight: 500;
    margin-left: 60px;
  }
  /* .container el-input {
  width: 320px;
  display: block;
  height: 36px;
  border: 0;
  outline: 0;
  padding: 6px 10px;
  line-height: 24px;
  margin: 32px auto;
  -webkit-transition: all 0s ease-in 0.1ms;
  -moz-transition: all 0s ease-in 0.1ms;
  transition: all 0s ease-in 0.1ms;
  }
  .container el-input[type="text"] , .container el-input[type="password"]  {
  background-color: #FFFFFF;
  font-size: 16px;
  color: #50a3a2;
  }
  .container el-input[type='submit'] {
  font-size: 16px;
  letter-spacing: 2px;
  color: #666666;
  background-color: #FFFFFF;
  }
  .container el-input:focus {
  width: 400px;
  }
  .container el-input[type='submit']:hover {
  cursor: pointer;
  width: 400px;
  } */

  .wrap ul {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -10;
  }
  .wrap ul li {
    list-style-type: none;
    display: block;
    position: absolute;
    bottom: -120px;
    width: 15px;
    height: 15px;
    z-index: -8;
    background-color:rgba(255, 255, 255, 0.15);
    animotion: square 25s infinite;
    -webkit-animation: square 25s infinite;
  }
  .wrap ul li:nth-child(1) {
    left: 0;
    animation-duration: 10s;
    -moz-animation-duration: 10s;
    -o-animation-duration: 10s;
    -webkit-animation-duration: 10s;
  }
  .wrap ul li:nth-child(2) {
    width: 40px;
    height: 40px;
    left: 10%;
    animation-duration: 15s;
    -moz-animation-duration: 15s;
    -o-animation-duration: 15s;
    -webkit-animation-duration: 15s;
  }
  .wrap ul li:nth-child(3) {
    left: 20%;
    width: 25px;
    height: 25px;
    animation-duration: 12s;
    -moz-animation-duration: 12s;
    -o-animation-duration: 12s;
    -webkit-animation-duration: 12s;
  }
  .wrap ul li:nth-child(4) {
    width: 50px;
    height: 50px;
    left: 30%;
    -webkit-animation-delay: 3s;
    -moz-animation-delay: 3s;
    -o-animation-delay: 3s;
    animation-delay: 3s;
    animation-duration: 12s;
    -moz-animation-duration: 12s;
    -o-animation-duration: 12s;
    -webkit-animation-duration: 12s;
  }
  .wrap ul li:nth-child(5) {
    width: 60px;
    height: 60px;
    left: 40%;
    animation-duration: 10s;
    -moz-animation-duration: 10s;
    -o-animation-duration: 10s;
    -webkit-animation-duration: 10s;
  }
  .wrap ul li:nth-child(6) {
    width: 75px;
    height: 75px;
    left: 50%;
    -webkit-animation-delay: 7s;
    -moz-animation-delay: 7s;
    -o-animation-delay: 7s;
    animation-delay: 7s;
  }
  .wrap ul li:nth-child(7) {
    left: 60%;
    animation-duration: 8s;
    -moz-animation-duration: 8s;
    -o-animation-duration: 8s;
    -webkit-animation-duration: 8s;
  }
  .wrap ul li:nth-child(8) {
    width: 90px;
    height: 90px;
    left: 70%;
    -webkit-animation-delay: 4s;
    -moz-animation-delay: 4s;
    -o-animation-delay: 4s;
    animation-delay: 4s;
  }
  .wrap ul li:nth-child(9) {
    width: 100px;
    height: 100px;
    left: 80%;
    animation-duration: 20s;
    -moz-animation-duration: 20s;
    -o-animation-duration: 20s;
    -webkit-animation-duration: 20s;
  }
  .wrap ul li:nth-child(10) {
    width: 120px;
    height: 120px;
    left: 90%;
    -webkit-animation-delay: 6s;
    -moz-animation-delay: 6s;
    -o-animation-delay: 6s;
    animation-delay: 6s;
    animation-duration: 30s;
    -moz-animation-duration: 30s;
    -o-animation-duration: 30s;
    -webkit-animation-duration: 30s;
  }

  @keyframes square {
    0%  {
      -webkit-transform: translateY(0);
      transform: translateY(0)
    }
    100% {
      bottom: 400px;
      transform: rotate(600deg);
      -webit-transform: rotate(600deg);
      -webkit-transform: translateY(-500);
      transform: translateY(-500)
    }
  }
  @-webkit-keyframes square {
    0%  {
      -webkit-transform: translateY(0);
      transform: translateY(0)
    }
    100% {
      bottom: 400px;
      transform: rotate(600deg);
      -webit-transform: rotate(600deg);
      -webkit-transform: translateY(-500);
      transform: translateY(-500)
    }
  }
</style>
