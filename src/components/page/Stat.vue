<template>
  <div class="container">
    <el-page-header @back="goBack"></el-page-header>
    <el-card style="width:50%; margin-top: 20px">
      <div
        slot="header"
        class="clearfix"
      >
        <span>日计划报表</span>
        <el-button
          style="float:right"
          type="text"
          @click="printDayReport(dateStr)"
        >导出</el-button>
      </div>
      <div>
        <el-date-picker
          v-model="dateStr"
          type="date"
          placeholder="请选择日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </el-card>
    <el-card style="width:50%; margin-top: 20px">
      <div
        slot="header"
        class="clearfix"
      >
        <span>周报表</span>
        <el-button
          style="float:right"
          type="text"
          @click="printWeekReport(week)"
        >导出</el-button>
      </div>
      <div>
        <el-date-picker
          v-model="week"
          type="week"
          placeholder="请选择日期"
          format="yyyy 第 WW 周"
        >
        </el-date-picker>
      </div>
    </el-card>
    <el-card style="width:50%; margin-top: 20px">
      <div slot="header"
           class="clearfix">
        <span>多条件筛选导出计划报表</span>
        <el-button
            style="float:right"
            type="text"
            @click="exportPlan"
        >导出</el-button>
      </div>
      <div style="margin-bottom: 20px">
        <span class="demonstration">编制日期&nbsp;&nbsp;</span>
        <el-date-picker
            v-model="multiConProjDate"
            type="daterange"
            placeholder="请选择日期"
            value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
      <div style="margin-bottom: 20px">
        <span class="demonstration">项目类型&nbsp;&nbsp;</span>
        <el-select v-model="multiConProjType" multiple placeholder="请选择">
          <el-option
              v-for="item in multiConProjTypeOps"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div style="margin-bottom: 20px">
        <span class="demonstration">委托人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <el-cascader
            ref="cascaderAddr"
            :show-all-levels="false"
            v-model="multiConClientId"
            :options="clientList"
            :props="{ expandTrigger: 'hover' }"
            filterable
            clearable
        >
        </el-cascader>
      </div>
      <div>
        <span class="demonstration">项目组成员&nbsp;&nbsp;</span>
        <el-select v-model="multiConStaffName" placeholder="请选择" clearable filterable>
          <el-option
              v-for="item in staffList"
              :key="item.staffId"
              :label="item.staffName"
              :value="item.staffId"
          >
          </el-option>
        </el-select>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getUserList,getClientList } from '@/api/index'
import { getDayReport } from '@/api/statistics'
import { Base64 } from 'js-base64'
import { host } from '@/config'
var ProManageAPIServer = `${host.baseUrl}/${host.ProManageAPIServer}`
export default {
  name: 'stat',
  data() {
    return {
      dateStr: '',
      week: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }]
      },
      multiConProjDate: '',
      multiConProjType: '',
      multiConProjTypeOps:[
        {
          value: '1010',
          label: '房地产'
        },
        {
          value: '1020',
          label: '资产'
        },
        {
          value: '1030',
          label: '土地'
        },
        {
          value: '1031',
          label: '房地产咨询'
        },
        {
          value: '1032',
          label: '资产咨询'
        },
        {
          value: '1033',
          label: '土地咨询'
        },
      ],
      clientList:[],
      staffList:[],
      multiConClientName: '',
      multiConClientId:'',
      multiConStaffName: ''
    }
  },
  created() {
    getClientList().then(
        res => {
          this.clientList = res.data
        }
    );
    getUserList().then(
        res => {
          this.staffList = res.data;
        }
    );
  },
  mounted() {

  },
  methods: {
    printDayReport(val) {
      if (val == '') {
        this.$message.warning('请选择时间')
        return 0
      }
      var oReq = new XMLHttpRequest()
      // url参数为拿后台数据的接口
      let pathUrl = ProManageAPIServer + 'statistics/dayReport'
      oReq.open('POST', pathUrl, true)
      oReq.responseType = 'blob'
      oReq.onload = function (oEvent) {
        var content = oReq.response
        var elink = document.createElement('a')
        // name为后台返给前端的文件名，根据下载文件格式加后缀名，后缀名必须加，不然下载在本地不方便打开。
        var headers = oReq.getResponseHeader('content-disposition')
        const headers2 = headers.split(';')[1].split('=')[1].substr(10)
        elink.download = headers2
        elink.style.display = 'none'
        var blob = new Blob([content])
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        document.body.removeChild(elink)
      }
      const fdata = new FormData()
      fdata.append('dateStr', val)
      oReq.send(fdata)
      //伪加载中，防止重复提交请求
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      // setTimeout(() => {
      //   loading.close()
      // }, 3500)
    },
    printWeekReport(val) {
      if (val == '') {
        this.$message.warning('请选择时间')
        return 0
      }
      const week = this.$moment(val).format('WW')
      const year = this.$moment(val).format('YYYY')
      //console.log(val, week, year)
      var oReq = new XMLHttpRequest()
      // url参数为拿后台数据的接口
      let pathUrl = ProManageAPIServer + 'statistics/getWeekReport'
      oReq.open('POST', pathUrl, true)
      oReq.responseType = 'blob'
      oReq.onload = function (oEvent) {
        var content = oReq.response
        var elink = document.createElement('a')
        // name为后台返给前端的文件名，根据下载文件格式加后缀名，后缀名必须加，不然下载在本地不方便打开。
        var headers = oReq.getResponseHeader('content-disposition')
        console.log(headers)
        const headers2 = headers.split(';')[1].split('=')[1].substr(10)
        elink.download = headers2
        elink.style.display = 'none'
        var blob = new Blob([content])
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        document.body.removeChild(elink)
      }
      const fdata = new FormData()
      fdata.append('week', week)
      fdata.append('year', year)
      oReq.send(fdata)
      //伪加载中，防止重复提交请求
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 5000)
    },
    formatDate(now) {
      const time = new Date(now)
      var year = time.getFullYear();  //取得4位数的年份
      var month = time.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
      var date = time.getDate();      //返回日期月份中的天数（1到31）
      var hour = time.getHours();     //返回日期中的小时数（0到23）
      return year + "-" + month + "-" + date
    },
    goBack() {
      this.$router.go(-1)
    },
    exportPlan() {
      if (this.multiConProjDate === '') {
        this.$message.error('请至少选择编制日期范围作为筛选条件')
        return
      }

    },
    parseArray(array) {
      let str = '';
      for (let i = 0; i < array.length; i++) {
        str += array[i] + ',';
      }
      str = str.slice(0, str.length - 1);
      console.log(str);
    }
  }
}
</script>

<style scoped>
</style>