<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">
        <h3>惠正评估管理系统</h3></div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="工号/Staff Number" size="large">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              type="password"
              placeholder="密码/Password"
              v-model="param.password"
              size="large"
              @keyup.enter.native="submitForm()"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/index'
export default {
  data: function () {
    return {
      param: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ required: true, message: '请输入工号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.login.validate(valid => {
        if (valid) {
          login({ staffId: parseInt(this.param.username), password: this.param.password }).then(res => {
            this.$message.success('登录成功');
            console.log('login', res)
            localStorage.setItem('staffId', res.data.staffId);
            localStorage.setItem('staffName', res.data.staffName);
            localStorage.setItem('role', res.data.role);
			
            localStorage.setItem('finalReviewAuth', res.data.finalReviewAuth);
            localStorage.setItem('isSuperFinalReview', res.data.isSuperFinalReview);
            localStorage.setItem('isStampHandler', res.data.isStampHandler);
            this.$router.push('/');
          }).catch(err => {
            this.$message.warning('账号密码错误')
          })
        } else {
          this.$message.error('请输入账号和密码');
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  /*background-image: url(../../assets/img/login-bg.jpg);*/
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #ffffff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 450px;
  /*margin: -190px 0 0 -175px;*/
  transform: translate(-50%, -70%);
  border-radius: 5px;
  background: rgba(150, 143, 143, 0.5);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>