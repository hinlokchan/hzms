<template>
  <div class="login-wrap">
    <div class="login-title">
      <h1>欢迎使用惠正评估管理系统</h1>
    </div>
    <div class="ms-login">
      <el-form
        :model="param"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="ms-content"
        v-enterToNext="true"
      >
        <el-form-item prop="username">
          <el-input
            v-model="param.username"
            placeholder="工号"
            size="medium"
          >
            <el-button
              slot="prepend"
              icon="el-icon-lx-people"
            ></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            size="medium"
            placeholder="密码"
            v-model="param.password"
            @keyup.enter.native="submitForm()"
          >
            <el-button
              slot="prepend"
              icon="el-icon-lx-lock"
            ></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button
            type="primary"
            @click="submitForm()"
            size="medium"
          >登录</el-button>
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
            console.log(res)
            localStorage.setItem('staffId', res.data.staffId);
            localStorage.setItem('staffName', res.data.staffName);
            localStorage.setItem('role', res.data.role);
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
  /* background-image: url(../../assets/img/bg.png);
    background-size: 100%; */
}
.login-title {
  padding-top: 130px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  letter-spacing: 4px;
}
.ms-title {
  top: 25%;
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  
  top: 500px;
  width: 550px;
  margin: 0 auto;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0);
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