<template>
  <div class="container">
    <!-- <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-receiving"></i> 我的项目
        </el-breadcrumb-item>
        <el-breadcrumb-item>工作台</el-breadcrumb-item>
        <el-breadcrumb-item>项目工作管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <el-dialog
      title="取号"
      :visible.sync="getNumVisible"
      width="50%"
    >

    </el-dialog>
    <el-tag>项目状态：已安排人员，已取号，无子项目信息</el-tag>
    <div class="work">
      <div class="work-title">
        <span class="work-title-name">项目信息</span>
        <span class="work-title-button">
          <el-button
            icon="el-icon-info"
            size="medium"
            @click="handleDetail()"
          >查看详情</el-button>
          <el-button
            icon="el-icon-edit"
            size="medium"
          >编辑</el-button>
          <el-button
            icon="el-icon-set-up"
            size="medium"
          >更改项目类型</el-button>
          <el-button
            icon="el-icon-printer"
            size="medium"
          >打印计划信息表</el-button>
        </span>
      </div>
      <el-divider></el-divider>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <div
              slot="header"
              class="card-header"
            >
              基本信息 - {{queryData.projNum}}
            </div>
            <div class="text">
              <div class="item"><span>项目类型：</span>{{this.transedProjType.projType}}</div>
              <div class="item"><span>评估目的：</span>{{this.projDetail.assemGoal}}</div>
              <div class="item"><span>项目名称：</span>{{this.projDetail.projName}}</div>
              <div class="item"><span>项目范围：</span>{{this.projDetail.projScope}}</div>
              <div class="item"><span>基准日：</span>{{formatDate(this.projDetail.baseDate)}}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div
              slot="header"
              class="card-header"
            >项目组成员信息</div>
            <div class="text item">
              <div class="item"><span>项目负责人：</span>{{this.projDetail.projLeader}}</div>
              <div class="item"><span>项目复核人：</span>{{this.projDetail.projReviewer}}</div>
              <div class="item"><span>专业复核人：</span>{{this.projDetail.projProReviewer}}</div>
              <div class="item"><span>项目助理：</span>{{this.projDetail.projAsst}}</div>
              <div class="item"><span>现场勘查：</span>{{this.projDetail.fieldSrvy}}</div>
            </div>
          </el-card>
        </el-col>
        <el-col
          :span="24"
          style="margin-top: 10px;"
        >
          <el-card>
            <div
              slot="header"
              class="card-header"
            >
              <span>报告号信息</span>
              <span style="float: right">
                <el-button
                  type="primary"
                  size="medium"
                  icon="el-icon-circle-plus-outline"
                  @click="handleGetNum"
                >取报告号</el-button>
                <el-button
                  type="danger"
                  size="medium"
                  icon="el-icon-circle-close"
                >取消报告号</el-button>
              </span>
            </div>
            <div>
              <div class="report-num">
                <el-row>
                  <el-col
                    :span="2"
                    class="report-title"
                  >初评号</el-col>
                  <el-col
                    :span="6"
                    class="report-content"
                  >
                    <span v-if="this.reportNum.cph == ''">未取号</span>
                    <span v-else>{{this.reportNum.cph}}</span>
                  </el-col>
                  <el-col
                    :span="2"
                    class="report-title"
                  >正评号</el-col>
                  <el-col
                    :span="6"
                    class="report-content"
                  >
                    <span v-if="this.reportNum.zph == ''">未取号</span>
                    <span v-else>{{this.reportNum.zph}}</span>
                  </el-col>
                  <el-col
                    :span="2"
                    class="report-title"
                  >回函号</el-col>
                  <el-col
                    :span="6"
                    class="report-content"
                  >
                    <span v-if="this.reportNum.hhh == ''">未取号</span>
                    <span v-else>{{this.reportNum.hhh}}</span>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="work-title">
      <span class="work-title-name">子项目信息</span>
      <span class="work-title-button">
        <el-button
          icon="el-icon-circle-plus-outline"
          size="medium"
        >新增子项目</el-button>
      </span>
    </div>
    <el-divider></el-divider>
    <el-table
      :data="tableData"
      border
    >
      <el-table-column
        label="子项目报告号"
        width="120"
        prop="a"
      ></el-table-column>
      <el-table-column label="子项目名称"></el-table-column>
      <el-table-column label="子项目范围"></el-table-column>
      <el-table-column
        label="基准日"
        width="120"
      ></el-table-column>
      <el-table-column
        label="操作"
        width="200"
      >
        <template>
          <el-button type="text">查看</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="work-title">
      <span class="work-title-name">项目工作信息</span>
    </div>
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div v-if="workArrgEdit == false">
            尚未安排工作详情，请先
            <el-button
              type="primary"
              icon="el-icon-notebook-1"
            >安排</el-button>
          </div>
          <div v-else>
            <div class="text">
              <div class="item"><span>评估方法：</span>11</div>
              <div class="item"><span>现场调查内容：</span></div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <div slot="header">综合进度安排</div>
          <div>
            <el-row :gutter="20">
              <el-col :span="6">
                <h4>综合进度</h4>
              </el-col>
              <el-col :span="10">
                <h4>时间安排</h4>
              </el-col>
              <el-col :span="8">
                <h4>责任人</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <div
                  class="workname-left"
                  v-for="item in workName"
                  :key="item"
                >
                  {{item}}
                </div>
              </el-col>
              <el-col :span="10">
                <div
                  class="workname-left"
                  v-for="(item, i) in workDate"
                  :key="i"
                >{{item}}</div>
              </el-col>
              <el-col :span="8">
                <div
                  class="workname-left"
                  v-for="(item, i) in workPeople"
                  :key="i"
                >{{item}}</div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getDetailProjInfo, getWorkAssignment } from '@/api/index'
import projTypeOption from '../../../public/projTypeOption.json'
export default {
  name: 'workhandle',
  data() {
    return {
      queryData: '',
      projDetail: '',
      reportNum: {},
      projTypeOption: [],
      transedProjType: {},
      tableData: [],
      activeTab: 'reportNum',
      workArrgEdit: true,
      workName: ['前期准备', '现场勘查及收集资料', '市场调查询价记录', '评定估算', '编制出具评估（估价）报告', '内部三级审核', '与委托人沟通', '评估收费', '修正定稿及提交报告', '工作底稿归档'],
      workDate: [],
      workPeople: [],
      getNumVisible: false
    }
  },
  created() {
    //处理从工作台获取的val -> queryData
    this.queryData = this.$route.query.data
    console.log(this.queryData)
    this.projTypeOption = projTypeOption
    //处理项目类型value转为label展示
    for (var i = 0; i < this.projTypeOption.length; i++) {
      if (this.queryData.projType == this.projTypeOption[i].value) {
        this.transedProjType.projType = this.projTypeOption[i].label
      }
    }
    //调项目详情接口
    this.getDetail()
    //调工作安排接口
    this.getWorkAssignmentData()
  },
  methods: {
    getDetail() {
      getDetailProjInfo({ projId: this.queryData.projId })
        .then(res => {
          if (res.statusCode == 200) {
            this.projDetail = res.data
            console.log('detail200', res.data)
            this.reportNum = res.data.reportNumList
            console.log('reportNum', this.reportNum)
          }
        })
        .catch(err => {
          this.$message.error('获取项目详细信息失败')
        })
    },
    getWorkAssignmentData() {
      getWorkAssignment({ projId: this.queryData.projId })
        .then(res => {
          if (res.statusCode == 200) {
            console.log('arrg200', res.data)
          }
          // //将时间安排导入workDate
          // this.workDate.push(res.data.prePreparationSche, res.data.fldSrvySche, res.data.mktSrvySche, res.data.assemEstSche, res.data.issueValSche, res.data.internalAuditSche, res.data.commuClientSche, res.data.assemChargeSche, res.data.amendFinalSche, res.data.manuArchiveSche)
          // // //将责任人导入workPeople
          // this.workPeople.push(res.data.prePreparationPic, res.data.fldSrvyPic, res.data.mktSrvyPic, res.data.assemEstPic, res.data.issueValPic, res.data.internalAuditPic, res.data.commuClientPic, res.data.assemChargePic, res.data.amendFinalPic, res.data.manuArchivePic)
        })
        .catch(err => {
          this.$message.error('获取安排信息失败，请重试')
        })
    },
    handleDetail() {
      this.$router.push({ path: '/projcheck', query: { data: this.queryData.projId } })
    },
    handleGetNum() {
      this.getNumVisible = true
    },
    formatDate(now) {
      const time = new Date(now)
      var year = time.getFullYear();  //取得4位数的年份
      var month = time.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
      var date = time.getDate();      //返回日期月份中的天数（1到31）
      var hour = time.getHours();     //返回日期中的小时数（0到23）
      return year + "-" + month + "-" + date
    }
  },
}
</script>

<style scoped>
.card-header {
  font-size: 20px;
}
.text {
  line-height: 40px;
}
.text span {
  color: #707781;
}
.item {
  border-bottom: solid 1px #ebe8e8;
}
.work {
  width: 100%;
}
.work-title {
  width: 100%;
  text-align: left;
  padding-left: 10px;
  margin: 50px 0 5px 0;
  border-left: solid 5px #409eff;
}
.work-title-name {
  font-size: 24px;
}
.work-title-button {
  float: right;
  padding-right: 25px;
}
.tabs {
  margin-top: 20px;
}
.report-num {
  margin-top: 5px;
}
.report-title {
  text-align: center;
  border: 1px solid #d3d3d3;
  height: 40px;
  line-height: 40px;
  background-color: #cbe5ff;
}
.report-content {
  text-align: center;
  border: 1px solid #d3d3d3;
  height: 40px;
  line-height: 40px;
}
.workname-left {
  height: 30px;
  margin-top: 15px;
  line-height: 30px;
}
</style>