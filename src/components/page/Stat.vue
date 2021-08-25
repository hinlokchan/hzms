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
          :editable="false"
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
          :editable="false"
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
            v-model="multiConProjDateStart"
            type="date"
            :editable="false"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
        >
        </el-date-picker>&nbsp;
        <el-date-picker
            v-model="multiConProjDateEnd"
            type="date"
            :editable="false"
            placeholder="请选择结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
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
        <span class="demonstration">委托人类型&nbsp;&nbsp;</span>
        <el-select
            v-model="multiConClientType"
            clearable
            :disabled="multiConClientId.length !== 0"
        >
          <el-option
              v-for="item in clientTypeList"
              :key="item.clientType"
              :label="item.clientTypeName"
              :value="item.clientType"
          >
          </el-option>
        </el-select>
      </div>
      <div style="margin-bottom: 20px">
        <span class="demonstration">委托人&nbsp;&nbsp;</span>
        <el-cascader
            :disabled="multiConClientType !== ''"
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
              :value="item.staffName"
          >
          </el-option>
        </el-select>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getUserList,getClientList,getClientTypeList } from '@/api/index'
import { getDayReport } from '@/api/statistics'
import { Base64 } from 'js-base64'
import { host } from '@/config'
import {downloadExcel} from '../../utils/download';

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
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          },
          {
            text: '一个月前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', date);
            }
          }
        ]
      },
      multiConProjDate: '',
      multiConProjDateStart: '',
      multiConProjDateEnd: '',
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
          value: '1041',
          label: '房地产咨询'
        },
        {
          value: '1042',
          label: '资产咨询'
        },
        {
          value: '1043',
          label: '土地咨询'
        },
        {
          value: '1050',
          label: 'PPP'
        },{
          value: '1061',
          label: '房地产复审'
        },{
          value: '1062',
          label: '资产复审'
        },{
          value: '1063',
          label: '土地复审'
        },
        {
          value: '1070',
          label: '外协'
        },
        {
          value: '1071',
          label: '协外'
        },
        {
          value: '1080',
          label: '政策修订'
        },
        {
          value: '1090',
          label: '绩效'
        },
        {
          value: '1100',
          label: '其他'
        },
      ],
      clientList:[],
      staffList:[],
      clientTypeList: [],
      multiConClientName: '',
      multiConClientId:[],
      multiConClientType:'',
      multiConStaffName: ''
    }
  },
  created() {
    getClientList().then(
        res => {
          this.clientList = res.data
        }
    );
    getClientTypeList().then(
        res => {
          this.clientTypeList = res.data
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
      let path = 'statistics/dayReport'
      const formData = new FormData()
      formData.append('dateStr', val)
      downloadExcel(formData, path)
    },

    download(formData,path) {
      const loading = this.$loading({
        lock: true,
        text: '下载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      var oReq = new XMLHttpRequest()
      // url参数为拿后台数据的接口
      oReq.open('POST', ProManageAPIServer + path, true)
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
      oReq.send(formData)
      oReq.onloadend = e => {
        console.log(e)
        setTimeout(() => {
          loading.close()
          this.$message.success('下载成功')
        }, 300)
      };
    },

    printWeekReport(val) {
      if (val == '') {
        this.$message.warning('请选择时间')
        return 0
      }
      const week = this.$moment(val).format('WW')
      const year = this.$moment(val).format('YYYY')

      let path = 'statistics/getWeekReport'

      const formData = new FormData()
      formData.append('week', week)
      formData.append('year', year)
      downloadExcel(formData, path)
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

      var startDate = Date.parse(this.multiConProjDateStart)
      var endDate = Date.parse(this.multiConProjDateEnd)
      console.log(this.multiConProjDateStart)
      console.log(this.multiConProjDateEnd)
      if (startDate > endDate) {
        this.$message.error('开始日期不能大于结束日期');
        return;
      }

      if (this.multiConProjDateStart === ''
          || this.multiConProjDateEnd === ''
          || this.multiConProjDateStart === null
          || this.multiConProjDateEnd === null
      ) {
        this.$message.error('请至少选择编制日期范围作为筛选条件');
        return;
      }

      let path = 'statistics/export/exportPlan'

      const formData = new FormData()
      if (this.multiConClientId.length > 0) {
        formData.append('clientIdStr', this.multiConClientId[this.multiConClientId.length-1])
      }
      formData.append('projDateStart', this.multiConProjDateStart)
      formData.append('projDateEnd', this.multiConProjDateEnd)
      formData.append('projTypeArrStr', this.parseArray(this.multiConProjType))
      formData.append('projMemberStr', this.multiConStaffName)
      formData.append('clientTypeStr', this.multiConClientType)

      downloadExcel(formData, path)

    },
    parseArray(array) {
      let str = '';
      if (array.length === 0) {
        return str
      }
      for (let i = 0; i < array.length; i++) {
        str += array[i] + ',';
      }
      str = str.slice(0, str.length - 1);
      return str
    }
  }
}
</script>

<style scoped>
</style>