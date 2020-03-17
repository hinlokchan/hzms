<template>
  <div>
    <div class="container">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-lx-calendar"></i> 项目管理
          </el-breadcrumb-item>
          <el-breadcrumb-item>查看项目详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="form-box">
        <div class="form-item-title">
          <h3>项目信息</h3>
        </div>
        <div class="project">
          <el-row>
            <el-col :span="2">
              <div class="projTitle">计划编号</div>
            </el-col>
            <el-col :span="6">
              <div class="projContent">{{detailData.projNum}}</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">初评号</div>
            </el-col>
            <el-col :span="6">
              <div class="projContent">{{detailData.paNum}}</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">正评号</div>
            </el-col>
            <el-col :span="6">
              <div class="projContent">{{detailData.faNUm}}</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">项目类型</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">{{detailData.projType}}</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">安排/轮序</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">{{detailData.arrgType}}</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">新/重评项目</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">{{detailData.newOldType}}</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">紧急程度</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">{{detailData.projDegree}}</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">项目名称</div>
            </el-col>
            <el-col :span="10">
              <div class="projContent">{{detailData.projName}}</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">项目范围</div>
            </el-col>
            <el-col :span="10">
              <div class="projContent">{{detailData.projScope}}</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">评估目的</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">{{detailData.assemGoal}}</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">编制时间</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">{{formatDate(detailData.projDate)}}</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">基准日</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">{{formatDate(detailData.baseDate)}}</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">计划现勘日</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">{{formatDate(detailData.fldSrvySchedule)}}</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">委托方</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">{{detailData.clientName}}</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">权属银行</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">{{detailData.lendingBank}}</div>
            </el-col>
            <el-col :span="4">
              <div class="projTitle">委托方联系人及联系方式</div>
            </el-col>
            <el-col :span="8">
              <div class="projContent">{{detailData.clientContact}}{{detailData.clientContactInfo}}</div>
            </el-col>
            <el-col :span="4">
              <div class="projTitle">引荐人及联系方式</div>
            </el-col>
            <el-col :span="8">
              <div class="projContent">{{detailData.projReferer}}{{detailData.projRefererInfo}}</div>
            </el-col>
            <el-col :span="4">
              <div class="projTitle">现勘联系人及联系方式</div>
            </el-col>
            <el-col :span="8">
              <div class="projContent">{{detailData.fldSvryContact}}{{detailData.fldSvryContactInfo}}</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">接洽人</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">{{detailData.projContact}}</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">风险预测</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">
                <span v-for="item in fengxian" :key="item">
                  <span v-if="detailData.riskProfile == fengxian.value">{{fengxian.label}}</span>
                </span>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">评估值报价</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">{{detailData.assemValueQuote}}</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">评估收费报价</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">{{detailData.assemFeeQuote}}</div>
            </el-col>
          </el-row>
          <el-row>
            <div class="form-item-title">
              <h3>项目进度</h3>
            </div>
            <el-col :span="12">
              <span>当前状态</span>
              <el-tag
                type="warning"
                size="medium"
              >滞后</el-tag>
            </el-col>
            <el-col :span="18">
              <el-steps
                :active="1"
                simple
              >
                <el-step
                  title="计划"
                  icon="el-icon-s-order"
                ></el-step>
                <el-step
                  title="现勘"
                  icon="el-icon-place"
                ></el-step>
                <el-step
                  title="撰写报告"
                  icon="el-icon-edit"
                ></el-step>
                <el-step
                  title="收费、送达"
                  icon="el-icon-s-custom"
                ></el-step>
                <el-step
                  title="归档"
                  icon="el-icon-check"
                ></el-step>
              </el-steps>
            </el-col>
          </el-row>
          <el-row>
            <div class="form-item-title">
              <h3>项目组成员</h3>
            </div>
            <el-row>
              <el-col :span="3">
                <div class="projTitle">项目负责人</div>
              </el-col>
              <el-col :span="9">
                <div class="projContent">{{detailData.projLeader}}</div>
              </el-col>
            </el-row>
            <el-col :span="3">
              <div class="projTitle">项目复核人</div>
            </el-col>
            <el-col :span="9">
              <div class="projContent">{{detailData.projReviewer}}</div>
            </el-col>
            <el-col :span="3">
              <div class="projTitle">专业复核人</div>
            </el-col>
            <el-col :span="9">
              <div class="projContent">{{detailData.projProReviewer}}</div>
            </el-col>
            <el-col :span="3">
              <div class="projTitle">现勘调查人员</div>
            </el-col>
            <el-col :span="9">
              <div class="projContent">{{detailData.fieldSrvy}}</div>
            </el-col>
            <el-col :span="3">
              <div class="projTitle">资料核查验证人员</div>
            </el-col>
            <el-col :span="9">
              <div class="projContent">{{detailData.infoVerification}}</div>
            </el-col>
            <el-col :span="3">
              <div class="projTitle">市场询价调查人员</div>
            </el-col>
            <el-col :span="9">
              <div class="projContent">{{detailData.marketEnquiry}}</div>
            </el-col>
            <el-col :span="3">
              <div class="projTitle">助理</div>
            </el-col>
            <el-col :span="9">
              <div class="projContent">{{detailData.projAsst}}</div>
            </el-col>
            <el-col :span="3">
              <div class="projTitle">技术说明拟稿人</div>
            </el-col>
            <el-col :span="9">
              <div class="projContent">{{detailData.techExpDrafter}}</div>
            </el-col>
            <el-col :span="3">
              <div class="projTitle">外聘专家</div>
            </el-col>
            <el-col :span="9">
              <div class="projContent">{{detailData.externalExpert}}</div>
            </el-col>
            <el-col :span="3">
              <div class="projTitle">报告拟稿人</div>
            </el-col>
            <el-col :span="9">
              <div class="projContent">{{detailData.reportDrafter}}</div>
            </el-col>
            <el-col :span="3">
              <div class="projTitle">指导员</div>
            </el-col>
            <el-col :span="9">
              <div class="projContent">{{detailData.instructor}}</div>
            </el-col>
          </el-row>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getDetailProjInfo } from '@/api/index'
export default {
  name: 'projcheck',
  data() {
    return {
      projId: '',
      detailData: [],
      fengxian: [
        {
          value: '1001',
          label: '低'
        },
        {
          value: '1002',
          label: '中等'
        },
        {
          value: '1003',
          label: '较高'
        },
        {
          value: '1004',
          label: '高'
        }
      ]
    }
  },
  created() {
    console.log('11', this.$route.query.data)
    this.projId = this.$route.query.data
    this.getDetail()
  },
  mounted() {

  },
  methods: {
    getDetail() {
      getDetailProjInfo({ projId: this.projId }).then(res => {
        console.log(res.data)
        this.detailData = res.data
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
.project {
    width: 100%;
    height: inherit;
}
.projTitle {
    background-color: #cbe5ff;
    text-align: center;
    height: 50px;
    line-height: 50px;
    border: 1px solid #d3d3d3;
}
.projContent {
    text-align: center;
    height: 50px;
    line-height: 50px;
    border: 1px solid #d3d3d3;
}
.form-item-title {
    width: 100px;
    text-align: center;
    margin: 20px 0 20px 0;
    border-left: solid 5px #409eff;
}
</style>