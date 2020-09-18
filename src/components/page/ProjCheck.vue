<template>
  <div>
    <div class="container">
      <el-page-header @back="goBack"></el-page-header>
      <div
        class="crumbs"
        style="margin-top: 15px"
      >
        <el-breadcrumb>
          <el-breadcrumb-item>查看项目详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
        <el-card>
          <div slot="header">
            <!-- <span style="color: #009AD6; font-size: 18px;">项目名称</span> -->
            <span v-if="detailData.projDegree == 1002">
              <el-tag
                type="danger"
                size="medium"
              >紧急项目</el-tag>
            </span>
            <span
              v-for="item in risk"
              :key="'info1'+item.value"
            >
              <span
                v-if="detailData.riskProfile == item.value"
                style="margin-left: 10px;"
              >
                <el-tag
                  :type="item.tag"
                  size="medium"
                >{{item.label}}风险</el-tag>
              </span>
            </span>
            <span
              v-for="item in arrgType"
              :key="'info2'+item.value"
            >
              <span
                v-if="detailData.arrgType == item.value"
                style="margin-left: 10px;"
              >
                <el-tag
                  type="primary"
                  size="medium"
                >{{item.label}}</el-tag>
              </span>
            </span>
            <span
              v-for="item in newOldType"
              :key="'info3'+item.value"
            >
              <span
                v-if="detailData.newOldType == item.value"
                style="margin-left: 10px;"
              >
                <el-tag
                  type="primary"
                  size="medium"
                >{{item.label}}</el-tag>
              </span>
            </span>
            <span style="float: right; font-size: 14px;">计划录入:{{detailData.operator}}，编制日期:{{this.formatDate(detailData.projDate)}}</span>
          </div>
          <div style="font-size: 20px">{{detailData.projName}}</div>
        </el-card>
        <el-form
          label-position="right"
          label-width="110px"
        >

          <div class="detail">
            <div class="title">基本信息</div>

            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="计划编号"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projNum}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="项目类型"
                  class="label"
                >
                  <span class="detail-content">{{transedData.projType}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="评估目的"
                  class="label"
                >
                  <span class="detail-content">{{detailData.assemGoal}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="初评号"
                  class="label"
                >
                  <span class="detail-content">{{reportNum.cph}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="正评号"
                  class="label"
                >
                  <span class="detail-content">{{reportNum.zph}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="回函号"
                  class="label"
                >
                  <span class="detail-content">{{reportNum.hhh}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="基准日"
                  class="label"
                >
                  <span class="detail-content">{{this.formatDate(detailData.baseDate)}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  label="项目范围"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projScope}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label="补充说明"
                  class="label"
                >
                  <span class="detail-content">{{detailData.supInstruction}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="title">委托信息</div>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="接洽人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projContactType}} {{detailData.projContact}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="委托人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.clientName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="委托人联系人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.clientContact}} {{detailData.clientContactInfo}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="产权持有人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.incumbrancer}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="计划现勘日"
                  class="label"
                >
                  <span class="detail-content">{{this.formatDate(detailData.fldSrvySchedule)}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="现勘联系人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.fldSrvyContact}} {{detailData.fldSrvyContactInfo}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="引荐人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projReferer}} {{detailData.projRefererInfo}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="title">项目组成员</div>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="项目负责人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projLeader}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="项目复核人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projReviewer}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="专业复核人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projProReviewer}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="项目助理"
                  class="label"
                >
                  <span>{{detailData.projAsst}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="现场勘查"
                  class="label"
                >
                  <span class="detail-content">{{detailData.fieldSrvy}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <div class="title">操作记录</div>
        <OpRecord />
      </div>
    </div>
  </div>
</template>

<script>
import { getDetailProjInfo, getReportNum, getProjInfoTable } from '@/api/index'
import OpRecord from './OpRecord'
import projTypeOption from '../../../public/projTypeOption.json'
import clientOptions from '../../../public/clientName.json'
import { host } from '@/config'
var ProManageAPIServer = `${host.baseUrl}/`
export default {
  name: 'projcheck',
  components: {
    OpRecord
  },
  data() {
    return {
      projId: '',
      cph: '',
      zph: '',
      hhh: '',
      detailData: {},
      reportNum: {},
      clientOptions: [],
      projTypeOption: [],
      projTypeZH: '',
      transedData: {},
      risk: [
        {
          value: '1001',
          label: '低',
          tag: 'success'
        },
        {
          value: '1002',
          label: '中等',
          tag: 'primary'
        },
        {
          value: '1003',
          label: '较高',
          tag: 'warning'
        },
        {
          value: '1004',
          label: '高',
          tag: 'danger'
        }
      ],
      arrgType: [
        { value: '1001', label: '轮序项目' }, { value: '1002', label: '安排项目' }
      ],
      newOldType: [
        { value: '1001', label: '新项目' }, { value: '1002', label: '重评项目' }
      ]
    }
  },
  created() {
    this.projId = this.$route.query.data
    this.getDetail()
    this.projTypeOption = projTypeOption
    this.clientOptions = clientOptions
  },
  mounted() {

  },
  methods: {
    formatDate(now) {
      const time = new Date(now)
      var year = time.getFullYear();  //取得4位数的年份
      var month = time.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
      var date = time.getDate();      //返回日期月份中的天数（1到31）
      var hour = time.getHours();     //返回日期中的小时数（0到23）
      return year + "-" + month + "-" + date
    },
    getDetail() {
      getDetailProjInfo({ projId: this.projId }).then(res => {
        console.log('res.data', res.data)
        this.detailData = res.data
        //处理value转为label展示
        for (var i = 0; i < this.projTypeOption.length; i++) {
          if (this.detailData.projType == this.projTypeOption[i].value) {
            this.transedData.projType = this.projTypeOption[i].label
          }
        }
        this.reportNum = res.data.reportNumList
        console.log('reportNum', this.reportNum)
        //委托人（原银行）转译
        // let clientOptions = this.clientOptions
        // let bankAfter = []
        // for (let i = 0; i < clientOptions.length; i++) {
        //   if (clientOptions[i].children) {
        //     bankAfter = bankAfter.concat(clientOptions[i].children)
        //   }
        // }
        // let index = bankAfter.findIndex((val) => {
        //   return val.value == this.detailData.lendingBank
        // })
        // let indexBefore = clientOptions.findIndex((val) => {
        //   return val.value == this.detailData.lendingBank.substring(0, 3)
        // })
        // this.detailData.lendingBankLable = clientOptions[indexBefore].label + ' - ' + bankAfter[index].label
      })
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
.detail {
  padding: 10px;
}
.detail-content {
  color: #2f2f2f;
}
.el-tag--medium {
  font-size: 16px;
  height: 30px;
  line-height: 30px;
}
.label span {
  font-size: 16px;
}
.label .el-form-item__label {
  color: #009ad6;
  font-size: 16px;
}
.title {
  margin: 10px 0 10px 0;
  font-size: 20px;
}
</style>