<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">
            <img class="logoImg" src="../../assets/img/logo.png">
            <span class="logoTitle">惠正评估管理系统</span>
        </div>
        <el-dialog
          title="修改密码"
          :visible.sync="password"
          width="20%"
        >
          <el-form>
            <el-form-item
              label="旧密码"
              label-width="100"
            >
              <el-input v-model="passwordData.origPassword" placeholder="旧密码" size="medium"></el-input>
            </el-form-item>
            <el-form-item
              label="新密码"
              label-width="100"
            >
              <el-input v-model="passwordData.newPassword" placeholder="新密码" size="medium"></el-input>
            </el-form-item>
          </el-form>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="password = false">取 消</el-button>
            <el-button @click="change" type="primary">确认更改</el-button>
          </div>
        </el-dialog>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <el-tooltip
                        effect="dark"
                        :content="message?`有${message}条未读消息`:`消息中心`"
                        placement="bottom"
                    >
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator">
                    <img src="../../assets/img/img.jpg" />
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <!-- <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
                            <el-dropdown-item>项目仓库</el-dropdown-item>
                        </a> -->
                        <el-dropdown-item divided command="changePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import bus from '../common/bus';
import { logout, alterPassword } from '@/api/index'
import Cookies from 'js-cookie'
export default {
    data() {
        return {
            collapse: false,
            fullscreen: false,
            password: false,
            name: 'linxin',
            message: 2,
            passwordData: {
              newPassword: '',
              origPassword: ''
            }
        };
    },
    computed: {
        username() {
            let username = localStorage.getItem('staffName');
            return username ? username : this.name;
        }
    },
    methods: {
      changPassword() {
        console.log('111')
      },
      change() {
        alterPassword(this.passwordData).then(res => {
          this.$message.success('密码修改成功')
          this.password = false
        }).catch(err => {
          this.$message.warning('密码修改失败')
        })
      },
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                logout().then(res => {
                    this.$message.warning('退出登录成功')
                    Cookies.remove('JSESSIONID')
                    localStorage.removeItem('staffId');
                    localStorage.removeItem('staffName');
                    localStorage.removeItem('role');
                    this.$router.push('/login');
                }).catch(err => {
                    this.$message.warning('退出登录失败')
                })
            } else if (command == 'changePassword') {
              this.password = true
            }
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    float: left;
    width: 350px;
    line-height: 70px;
}
.logoImg{
   width:50px;
   height:50px;
   vertical-align: middle;
   margin: 0 20px;
}
.logoTitle{
   vertical-align: middle;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
