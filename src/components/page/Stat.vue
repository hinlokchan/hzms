<template>
  <div class="container">
    <el-card style="width:50%">
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
    <el-card style="width:50%">
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
  </div>
</template>

<script>
import { getDayReport } from '@/api/statistics'
import { Base64 } from 'js-base64'
import { host } from '@/config'
var ProManageAPIServer = `${host.baseUrl}/`
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
    }
  },
  created() {

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
    },
    printWeekReport(val) {
      if (val == '') {
        this.$message.warning('请选择时间')
        return 0
      }
      val = this.$moment(val).format('W')
      console.log(val)
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
      fdata.append('week', val)
      oReq.send(fdata)
    },
    formatDate(now) {
      const time = new Date(now)
      var year = time.getFullYear();  //取得4位数的年份
      var month = time.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
      var date = time.getDate();      //返回日期月份中的天数（1到31）
      var hour = time.getHours();     //返回日期中的小时数（0到23）
      return year + "-" + month + "-" + date
    },
  }
}
</script>

<style scoped>
</style>