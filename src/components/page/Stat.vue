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
        {{dateStr}}
      </div>
    </el-card>
  </div>
</template>

<script>
import { getDayReport } from '@/api/statistics'
export default {
  name: 'stat',
  data() {
    return {
      dateStr: '',
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
      getDayReport({ dateStr: val })
        .then(res => {
          
          
        })
        .catch(err => {
          console.log(err)
          this.$message({
            message: '下载失败',
            type: 'error',
            
          })
        })
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