<template>
  <div class="container">
    <el-dialog title="进行中的项目" :visible.sync="detailVisible" width="70%">
      <el-table
        :data="missionDetailData"
        stripe
      >
        <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
        <el-table-column prop="projName" label="项目名称" width="300"></el-table-column>
        <el-table-column prop="projLeader" label="项目负责人" width="100"></el-table-column>
        <el-table-column prop="projReviewer" label="项目复核人" width="100"></el-table-column>
        <el-table-column prop="baseDate" label="基准日" width="150"></el-table-column>
        <el-table-column label="编制日期" width="150">
          <template slot-scope="scope">
            <span>{{formatDate(scope.row.projDate)}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-table
      :data="tableData"
      :default-sort="{ prop: 'staffInfo.staffId', order: 'ascending' }"
      show-summary
      stripe
    >
      <el-table-column
        prop="staffInfo.staffId"
        label="工号"
        width="70"
      >
        <template slot-scope="scope">
          <el-tag size="medium">{{scope.row.staffInfo.staffId}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="staffInfo.staffName"
        label="姓名"
        width="120"
      ></el-table-column>
      <el-table-column prop="onGoing" label="进行中项目数"></el-table-column>
      <el-table-column label="安排类型">
        <el-table-column prop="arrg1001" label="轮序"></el-table-column>
        <el-table-column prop="arrg1002" label="安排"></el-table-column>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="missionDetail(scope.row.staffInfo.staffId)"
          >进行中项目详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllMission, getUserDetailMission } from '@/api/statistics';
export default {
  name: 'projstat',
  data() {
    return {
      tableData: [],
      missionDetailData: [],
      detailVisible: false,
    };
  },
  created() {
    this.getAll()
  },
  methods: {
    getAll() {
      getAllMission()
        .then(res => {
          this.tableData = res.data;
          console.log(this.tableData);
        })
        .catch(err => {
          this.$message.warning('获取信息失败，请刷新后重试');
        });
    },
    missionDetail(val) {
      getUserDetailMission({staffId: val})
        .then(res => {
          this.missionDetailData = res.data
          console.log(this.missionDetailData)
        })
        .catch(err => {
          this.$message.danger('获取详情失败，请刷新后重试')
        })
      this.detailVisible = true
    },
    formatDate(now) {
      const time = new Date(now)
      var year = time.getFullYear();  //取得4位数的年份
      var month = time.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
      var date = time.getDate();      //返回日期月份中的天数（1到31）
      var hour = time.getHours();     //返回日期中的小时数（0到23）
      return year + "-" + month + "-" + date
    }
  }
};
</script>

<style>
</style>