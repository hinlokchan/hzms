<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in roleItem">
        <template v-if="item.subs">
          <!-- index为字符串格式，加一个''可避免报错type check failed -->
          <el-submenu
            :index="item.index + ''"
            :key="item.index"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.index"
                :key="subItem.index"
              >{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item
            :index="item.index"
            :key="item.index"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from '../common/bus';
export default {
  data() {
    return {
      collapse: false,
      roleItem: [],
      items0: [
        {
          icon: 'el-icon-lx-home',
          index: 'dashboard',
          title: '系统首页'
        },
        {
          icon: 'el-icon-lx-edit',
          index: 'plan',
          title: '项目管理',
          subs: [
            {
              index: 'plan',
              title: '查看项目'
            },
            {
              index: 'planform',
              title: '项目计划录入'
            }
          ]
        },
        {
          icon: 'el-icon-receiving',
          title: '我的项目',
          subs: [
            {
              title: '询价记录查询'
            },
            {
              index: 'workbranch',
              title: '工作台'
            },
            {
              index: 'qrcode',
              title: '报告二维码生成'
            },
            {
              title: '正评登记'
            }
          ]
        },
        {
          index: 'stat',
          icon: "el-icon-data-analysis",
          title: "统计管理"
        },
        {
          index: "usermanage",
          icon: "el-icon-user",
          title: "用户管理"
        }
      ],
      items2: [
        {
          icon: 'el-icon-lx-home',
          index: 'dashboard',
          title: '系统首页'
        },
        {
          icon: 'el-icon-lx-edit',
          index: 'plan',
          title: '项目管理',
          subs: [
            {
              index: 'plan',
              title: '查看项目'
            },
            {
              index: 'planform',
              title: '项目计划录入'
            }
          ]
        },
        {
          icon: 'el-icon-receiving',
          title: '我的项目',
          subs: [
            {
              title: '询价记录查询'
            },
            {
              index: 'qrcode',
              title: '报告二维码生成'
            },
            {
              title: '正评登记'
            }
          ]
        },
        {
          index: 'stat',
          icon: "el-icon-data-analysis",
          title: "统计管理"
        }
      ],
      items3: [
        {
          icon: 'el-icon-lx-home',
          index: 'dashboard',
          title: '系统首页'
        },
        {
          icon: 'el-icon-receiving',
          title: '我的项目',
          subs: [
            {
              title: '询价记录查询'
            },
            {
              index: 'workbranch',
              title: '工作台'
            },
            {
              index: 'qrcode',
              title: '报告二维码生成'
            },
            {
              title: '正评登记'
            }
          ]
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '');
    }
  },
  created() {
    let sf = localStorage.getItem('role')
    if (sf == 0 || sf == 1) {
      this.roleItem = this.items0
    } else if (sf == 2) {
      this.roleItem = this.items2
    } else if (sf == 3) {
      this.roleItem = this.items3
    }
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg;
      bus.$emit('collapse-content', msg);
    });
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 220px;
}
.sidebar > ul {
  height: 100%;
}
</style>
