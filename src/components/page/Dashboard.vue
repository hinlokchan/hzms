<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="9">
        <el-card
          shadow="hover"
          class="mgb20"
          style="height:150px;"
        >
          <div class="user-info">
            <img
              src="../../assets/img/img.jpg"
              class="user-avator"
              alt
            />
            <div class="user-info-cont">
              <div class="user-info-name">你好呀，{{name}}</div>
              <span
                v-for="item in sfList"
                :key="item.value"
              >
                <span
                  style="font-size:17px"
                  v-if="item.value == sf"
                >{{item.label}}</span>
              </span>
            </div>
          </div>
        </el-card>
        <el-card
          shadow="hover"
          :body-style="{padding: '0px'}"
        >
          <div class="grid-content grid-con-1">
            <i class="el-icon-lx-remind grid-con-icon"></i>
            <div class="grid-cont-right">
              <div class="grid-num">{{missionData.onGoing}}</div>
              <div>待完成项目数</div>
            </div>
          </div>
        </el-card>
        <el-card
          shadow="hover"
          :body-style="{padding: '0px'}"
          style="margin-top: 10px;"
        >
          <div class="grid-content grid-con-2">
            <i class="el-icon-bell grid-con-icon"></i>
            <div class="grid-cont-right">
              <div class="grid-num">{{missionData.new}}</div>
              <div>本日新项目</div>
            </div>
          </div>
        </el-card>
        <el-card
          shadow="hover"
          :body-style="{padding: '0px'}"
          style="margin-top: 10px;"
        >
          <div class="grid-content grid-con-3">
            <i class="el-icon-lx-warn grid-con-icon"></i>
            <div class="grid-cont-right">
              <div class="grid-num">{{missionData.urgent}}</div>
              <div>紧急项目</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="15">
        <el-card
          shadow="hover"
          style="height:50%;"
        >
          <div slot="header" class="clearfix">
            <span>公告</span>
          </div>
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="2021/10/28更新" name="1">
              <template slot="title">
                <span>2021/10/28更新<el-badge is-dot></el-badge></span>
              </template>
              <b>获取往月报告号入口变更为【取号】</b>
              <div>点击【取号】后，在对话框中将滑块拨至【往月报告号】，选择日期及报告号类型后，点击确认按钮即可取号。</div>
              <div></div>
            </el-collapse-item>
          </el-collapse>
<!--          <el-calendar id="calendar"></el-calendar>-->
        </el-card>
        <el-card shadow="hover" style="margin-top: 10px">
          <el-calendar></el-calendar>
        </el-card>
      </el-col>
    </el-row>
    <!-- <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <schart
            ref="bar"
            class="schart"
            canvasId="bar"
            :options="options"
          ></schart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <schart
            ref="line"
            class="schart"
            canvasId="line"
            :options="options2"
          ></schart>
        </el-card>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import { touch } from '@/api/index'
import { getCurrentMission } from '@/api/statistics'
import Schart from 'vue-schart';
import bus from '../common/bus';
export default {
  name: 'dashboard',
  data() {
    return {
      activeName: '1',
      missionData: {},
      sfList: [
        {
          label: '超级管理员',
          value: 0
        },
        {
          label: '管理员',
          value: 1
        },
        {
          label: '计划部门',
          value: 2
        },
        {
          label: '业务部门',
          value: 3
        },
      ],
      sf: localStorage.getItem('role'),
      name: localStorage.getItem('staffName'),
      todoList: [
        {
          title: '今天要修复100个bug',
          status: false
        },
        {
          title: '今天要修复100个bug',
          status: false
        },
        {
          title: '今天要写100行代码加几个bug吧',
          status: false
        },
        {
          title: '今天要修复100个bug',
          status: false
        },
        {
          title: '今天要修复100个bug',
          status: true
        },
        {
          title: '今天要写100行代码加几个bug吧',
          status: true
        }
      ],
      data: [
        {
          name: '2018/09/04',
          value: 1083
        },
        {
          name: '2018/09/05',
          value: 941
        },
        {
          name: '2018/09/06',
          value: 1139
        },
        {
          name: '2018/09/07',
          value: 816
        },
        {
          name: '2018/09/08',
          value: 327
        },
        {
          name: '2018/09/09',
          value: 228
        },
        {
          name: '2018/09/10',
          value: 1065
        }
      ],
      options: {
        type: 'ring',
        title: {
          text: '本周完成项目数'
        },
        xRorate: 25,
        labels: ['周一', '周二', '周三', '周四', '周五'],
        datasets: [
          {
            label: '家电',
            data: [234, 278, 270, 190, 230]
          },
          {
            label: '百货',
            data: [164, 178, 190, 135, 160]
          },
          {
            label: '食品',
            data: [144, 198, 150, 235, 120]
          }
        ]
      },
      options2: {
        type: 'ring',
        title: {
          text: '本月完成项目数'
        },
        labels: ['6月', '7月', '8月', '9月', '10月'],
        datasets: [
          {
            label: '家电',
            data: [234, 278, 270, 190, 230]
          },
          {
            label: '百货',
            data: [164, 178, 150, 135, 160]
          },
          {
            label: '食品',
            data: [74, 118, 200, 235, 90]
          }
        ]
      },
	  
	  //211028变动 新增: 多个公司切换
	  companyId:'',
	  companyRange:['HZ', 'ZM','HZKJ'],
    }
  },
  created() {
	//211028变动 新增: 多个公司切换
	const value = localStorage.getItem('companyId');
	if(value){
		this.companyId = value;
		//this.companyTabsId = this.companyRange.indexOf(this.companyId);
	}else{
		this.companyId = this.companyRange[0];
		//this.companyTabsId = 0;
	}
	//console.log('初始化公司id', this.companyId);    
		  
    this.touchAPI()
    this.getCurrent()
  },
  components: {

  },
  computed: {
    role() {
      return this.name === 'admin' ? '超级管理员' : '普通用户';
    }
  },
  // created() {
  //     this.handleListener();
  //     this.changeDate();
  // },
  // activated() {
  //     this.handleListener();
  // },
  // deactivated() {
  //     window.removeEventListener('resize', this.renderChart);
  //     bus.$off('collapse', this.handleBus);
  // },
  methods: {
    changeDate() {
      const now = new Date().getTime();
      this.data.forEach((item, index) => {
        const date = new Date(now - (6 - index) * 86400000);
        item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
      });
    },
    touchAPI() {
      touch()
        .then(res => { })
        .catch(err => { })
    },
    getCurrent() {
      getCurrentMission({}, this.companyId)
        .then(res => {
          this.missionData = res.data
          console.log(this.missionData)
        })
        .catch(err => {
          console.log('error', err)
        })
    }
    // handleListener() {
    //     bus.$on('collapse', this.handleBus);
    //     // 调用renderChart方法对图表进行重新渲染
    //     window.addEventListener('resize', this.renderChart);
    // },
    // handleBus(msg) {
    //     setTimeout(() => {
    //         this.renderChart();
    //     }, 200);
    // },
    // renderChart() {
    //     this.$refs.bar.renderChart();
    //     this.$refs.line.renderChart();
    // }
  }
};
</script>


<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.user-avator {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}
</style>
