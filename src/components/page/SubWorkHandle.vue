<template>
  <div class="container">
    <el-page-header @back="goBack"></el-page-header>
    <div class="work-title">
      <span class="work-title-name">子项目信息</span>
      <span class="work-title-button">
        <!-- <el-button
          icon="el-icon-info"
          size="medium"
        >查看详情</el-button>
        <el-button
          icon="el-icon-edit"
          size="medium"
        >编辑</el-button>
        <el-button
          icon="el-icon-lx-qrcode"
          size="medium"
          @click="handleQRCode()"
        >生成二维码</el-button> -->
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
            基本信息: {{this.subProjData.reportNum}}-{{this.subProjData.subReportNum}}
          </div>
          <div class="text">
            <div class="item"><span>项目名称：</span>{{this.subProjData.subProjName}}</div>
            <div class="item"><span>项目范围：</span>{{this.subProjData.subProjScope}}</div>
            <div class="item"><span>基准日：</span>{{this.subProjData.subBaseDate}}</div>
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
            <div class="item"><span>项目负责人：</span>{{this.subProjData.subProjLeader}}</div>
            <div class="item"><span>项目复核人：</span>{{this.subProjData.subProjReviewer}}</div>
            <div class="item"><span>专业复核人：</span>{{this.subProjData.subProjProReviewer}}</div>
            <div class="item"><span>项目助理：</span>{{this.subProjData.subProjAsst}}</div>
            <div class="item"><span>现场勘查：</span>{{this.subProjData.subFieldSrvy}}</div>
          </div>
        </el-card>
      </el-col>
      <!-- <el-col
        :span="12"
        style="margin-top: 10px"
      >
        <el-card>
          <div
            slot="header"
            class="card-header"
          >
            <span>报告登记信息</span>
            <span style="float: right">
              <el-button
                icon="el-icon-suitcase"
                type="success"
                plain
                size="medium"
              >登记正评</el-button>
            </span>
          </div>
          <h4>Tips:取二维码前请先进行登记</h4>
        </el-card>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'subworkhandle',
  data() {
    return {
      subProjData: {}
    }
  },
  created() {
    let obj = JSON.parse(this.$route.query.data)
    console.log('obj', obj)
    this.subProjData = obj
    this.subProjData.subBaseDate = this.$moment(this.subProjData.subBaseDate).format('YYYY-MM-DD')

    // this.subProjData.subProjLeader = this.subProjData.subProjLeader.join(',')
    // this.subProjData.subProjReviewer = this.subProjData.subProjReviewer.join(',')
    // this.subProjData.subProjProReviewer = this.subProjData.subProjProReviewer.join(',')
    // this.subProjData.subProjAsst = this.subProjData.subProjAsst.join(',')
    // this.subProjData.subFieldSrvy = this.subProjData.subFieldSrvy.join(',')
    console.log('subProjData', this.subProjData)
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
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