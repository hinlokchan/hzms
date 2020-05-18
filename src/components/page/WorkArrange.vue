<template>
  <div class="container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-receiving"></i> 我的项目
        </el-breadcrumb-item>
        <el-breadcrumb-item>工作台</el-breadcrumb-item>
        <el-breadcrumb-item>工作安排</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card style="width: 95%">
      <div slot="header">
        <h2>安排项目：{{this.queryData.projNum}}</h2>
      </div>
      <el-form
        :model="workArrgForm"
        ref="arrgFormRules"
        :rules="arrgFormRules"
        label-width="auto"
      >
        <el-form-item
          label="评估方法"
          prop="assemMethod"
        >
          <!-- <el-radio-group v-model="workArrgForm.assemMethod">
            <el-radio label="成本法">成本法</el-radio>
            <el-radio label="收益法">收益法</el-radio>
            <el-radio label="市场法">市场法</el-radio>
          </el-radio-group> -->
          <el-checkbox-group v-model="workArrgForm.assemMethod">
            <el-checkbox label="成本法"></el-checkbox>
            <el-checkbox label="收益法"></el-checkbox>
            <el-checkbox label="市场法"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          label="现场勘查内容"
          prop="fldSrvyContent"
        >
          <el-input
            v-model="workArrgForm.fldSrvyContent"
            type="textarea"
            rows="2"
          ></el-input>
        </el-form-item>
        <div slot="header">
          <span>综合进度计划安排</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
              label="前期准备"
              prop="prePreparationSche"
            >
              <el-date-picker
                v-model="workArrgForm.prePreparationSche"
                type="daterange"
                range-separator="-"
                start-placeholde="开始日期"
                end-placeholde="结束日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              prop="prePreparationPic"
              label="责任人"
            >
              <el-checkbox-group v-model="workArrgForm.prePreparationPic">
                <el-checkbox-button
                  v-for="item in projMember"
                  :key="item"
                  :label="item"
                ></el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
              label="现场勘查及收集资料"
              prop="fldSrvySche"
            >
              <el-date-picker
                v-model="workArrgForm.fldSrvySche"
                type="daterange"
                range-separator="-"
                start-placeholde="开始日期"
                end-placeholde="结束日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="责任人"
              prop="fldSrvyPic"
            >
              <el-checkbox-group v-model="workArrgForm.fldSrvyPic">
                <el-checkbox-button
                  v-for="item in projMember"
                  :key="item"
                  :label="item"
                ></el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
              label="市场调查询价记录"
              prop="mktSrvySche"
            >
              <el-date-picker
                v-model="workArrgForm.mktSrvySche"
                type="daterange"
                range-separator="-"
                start-placeholde="开始日期"
                end-placeholde="结束日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="责任人"
              prop="mktSrvyPic"
            >
              <el-checkbox-group v-model="workArrgForm.mktSrvyPic">
                <el-checkbox-button
                  v-for="item in projMember"
                  :key="item"
                  :label="item"
                ></el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
              label="评定估算"
              prop="assemEstSche"
            >
              <el-date-picker
                v-model="workArrgForm.assemEstSche"
                type="daterange"
                range-separator="-"
                start-placeholde="开始日期"
                end-placeholde="结束日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="责任人"
              prop="assemEstPic"
            >
              <el-checkbox-group v-model="workArrgForm.assemEstPic">
                <el-checkbox-button
                  v-for="item in projMember"
                  :key="item"
                  :label="item"
                ></el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
              label="编制出具报告"
              prop="issueValSche"
            >
              <el-date-picker
                v-model="workArrgForm.issueValSche"
                type="daterange"
                range-separator="-"
                start-placeholde="开始日期"
                end-placeholde="结束日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="责任人"
              prop="issueValPic"
            >
              <el-checkbox-group v-model="workArrgForm.issueValPic">
                <el-checkbox-button
                  v-for="item in projMember"
                  :key="item"
                  :label="item"
                ></el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
              label="内部三级审核"
              prop="internalAuditSche"
            >
              <el-date-picker
                v-model="workArrgForm.internalAuditSche"
                type="daterange"
                range-separator="-"
                start-placeholde="开始日期"
                end-placeholde="结束日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="责任人"
              prop="internalAuditPic"
            >
              <el-checkbox-group v-model="workArrgForm.internalAuditPic">
                <el-checkbox-button
                  v-for="item in projMember"
                  :key="item"
                  :label="item"
                ></el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
              label="与委托人沟通"
              prop="commuClientSche"
            >
              <el-date-picker
                v-model="workArrgForm.commuClientSche"
                type="daterange"
                range-separator="-"
                start-placeholde="开始日期"
                end-placeholde="结束日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="责任人"
              prop="commuClientPic"
            >
              <el-checkbox-group v-model="workArrgForm.commuClientPic">
                <el-checkbox-button
                  v-for="item in projMember"
                  :key="item"
                  :label="item"
                ></el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
              label="评估收费"
              prop="assemChargeSche"
            >
              <el-date-picker
                v-model="workArrgForm.assemChargeSche"
                type="daterange"
                range-separator="-"
                start-placeholde="开始日期"
                end-placeholde="结束日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="责任人"
              prop="assemChargePic"
            >
              <el-checkbox-group v-model="workArrgForm.assemChargePic">
                <el-checkbox-button
                  v-for="item in projMember"
                  :key="item"
                  :label="item"
                ></el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
              label="修正定稿及提交报告"
              prop="amendFinalSche"
            >
              <el-date-picker
                v-model="workArrgForm.amendFinalSche"
                type="daterange"
                range-separator="-"
                start-placeholde="开始日期"
                end-placeholde="结束日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="责任人"
              prop="amendFinalPic"
            >
              <el-checkbox-group v-model="workArrgForm.amendFinalPic">
                <el-checkbox-button
                  v-for="item in projMember"
                  :key="item"
                  :label="item"
                ></el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
              label="工作底稿归档"
              prop="manuArchiveSche"
            >
              <el-date-picker
                v-model="workArrgForm.manuArchiveSche"
                type="daterange"
                range-separator="-"
                start-placeholde="开始日期"
                end-placeholde="结束日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="责任人"
              prop="manuArchivePic"
            >
              <el-checkbox-group v-model="workArrgForm.manuArchivePic">
                <el-checkbox-button
                  v-for="item in projMember"
                  :key="item"
                  :label="item"
                ></el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmitWorkArrg()"
          >提交</el-button>
          <el-button
            type="text"
            @click="goBack()"
          >取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { setWorkAssignment, getWorkAssignment } from '@/api/index'
export default {
  name: 'workarrange',
  data() {
    return {
      isEdit: false,
      queryData: '',
      tableData: [],
      projMember: [],
      projNum: '',
      workname: ['前期准备', '现场勘查及收集资料', '市场调查询价记录', '评定估算', '编制出具估价（估价）报告', '内部三级审核', '与委托人沟通', '评估收费', '修正定稿及提交报告', '工作底稿归档'],
      workArrgForm: {
        projId: '',
        assemMethod: [],
        fldSrvyContent: '',
        //人员
        prePreparationPic: [],
        fldSrvyPic: [],
        mktSrvyPic: [],
        assemEstPic: [],
        issueValPic: [],
        internalAuditPic: [],
        commuClientPic: [],
        assemChargePic: [],
        amendFinalPic: [],
        manuArchivePic: [],
        // //日期
        prePreparationSche: [],
        fldSrvySche: [],
        mktSrvySche: [],
        assemEstSche: [],
        issueValSche: [],
        internalAuditSche: [],
        commuClientSche: [],
        assemChargeSche: [],
        amendFinalSche: [],
        manuArchiveSche: []
      },
      arrgFormRules: {
        assemMethod: [{ required: true, message: '请选择评估方法', trigger: 'change' }],
        prePreparationSche: [{ required: true, message: '请选择日期', trigger: 'change' }],
        fldSrvySche: [{ required: true, message: '请选择日期', trigger: 'change' }],
        mktSrvySche: [{ required: true, message: '请选择日期', trigger: 'change' }],
        assemEstSche: [{ required: true, message: '请选择日期', trigger: 'change' }],
        issueValSche: [{ required: true, message: '请选择日期', trigger: 'change' }],
        internalAuditSche: [{ required: true, message: '请选择日期', trigger: 'change' }],
        commuClientSche: [{ required: true, message: '请选择日期', trigger: 'change' }],
        assemChargeSche: [{ required: true, message: '请选择日期', trigger: 'change' }],
        amendFinalSche: [{ required: true, message: '请选择日期', trigger: 'change' }],
        manuArchiveSche: [{ required: true, message: '请选择日期', trigger: 'change' }],
        //
        prePreparationPic: [{ required: true, message: '请选择责任人', trigger: 'change' }],
        prePreparationPic: [{ required: true, message: '请选择责任人', trigger: 'change' }],
        fldSrvyPic: [{ required: true, message: '请选择责任人', trigger: 'change' }],
        mktSrvyPic: [{ required: true, message: '请选择责任人', trigger: 'change' }],
        assemEstPic: [{ required: true, message: '请选择责任人', trigger: 'change' }],
        issueValPic: [{ required: true, message: '请选择责任人', trigger: 'change' }],
        internalAuditPic: [{ required: true, message: '请选择责任人', trigger: 'change' }],
        commuClientPic: [{ required: true, message: '请选择责任人', trigger: 'change' }],
        assemChargePic: [{ required: true, message: '请选择责任人', trigger: 'change' }],
        amendFinalPic: [{ required: true, message: '请选择责任人', trigger: 'change' }],
        manuArchivePic: [{ required: true, message: '请选择责任人', trigger: 'change' }]

      }

    }
  },
  created() {
    this.queryData = this.$route.query.data
    this.projMember = this.$route.query.projMember
    this.workArrgForm.projId = this.queryData.projId
    if (this.$route.query.isEdit == true) {
      this.getWorkAssg()
    } else {

    }
  },
  mounted() {

  },
  methods: {
    onSubmitWorkArrg() {
      this.$refs.arrgFormRules.validate((valid) => {
        if (valid) {
          this.workArrgForm.prePreparationPic = this.workArrgForm.prePreparationPic.join(',')
          this.workArrgForm.fldSrvyPic = this.workArrgForm.fldSrvyPic.join(',')
          this.workArrgForm.mktSrvyPic = this.workArrgForm.mktSrvyPic.join(',')
          this.workArrgForm.assemEstPic = this.workArrgForm.assemEstPic.join(',')
          this.workArrgForm.issueValPic = this.workArrgForm.issueValPic.join(',')
          this.workArrgForm.internalAuditPic = this.workArrgForm.internalAuditPic.join(',')
          this.workArrgForm.commuClientPic = this.workArrgForm.commuClientPic.join(',')
          this.workArrgForm.assemChargePic = this.workArrgForm.assemChargePic.join(',')
          this.workArrgForm.amendFinalPic = this.workArrgForm.amendFinalPic.join(',')
          this.workArrgForm.manuArchivePic = this.workArrgForm.manuArchivePic.join(',')
          //
          this.workArrgForm.prePreparationSche = this.workArrgForm.prePreparationSche.join('-')
          this.workArrgForm.fldSrvySche = this.workArrgForm.fldSrvySche.join('-')
          this.workArrgForm.mktSrvySche = this.workArrgForm.mktSrvySche.join('-')
          this.workArrgForm.assemEstSche = this.workArrgForm.assemEstSche.join('-')
          this.workArrgForm.issueValSche = this.workArrgForm.issueValSche.join('-')
          this.workArrgForm.internalAuditSche = this.workArrgForm.internalAuditSche.join('-')
          this.workArrgForm.commuClientSche = this.workArrgForm.commuClientSche.join('-')
          this.workArrgForm.assemChargeSche = this.workArrgForm.assemChargeSche.join('-')
          this.workArrgForm.amendFinalSche = this.workArrgForm.amendFinalSche.join('-')
          this.workArrgForm.manuArchiveSche = this.workArrgForm.manuArchiveSche.join('-')
          //
          this.workArrgForm.assemMethod = this.workArrgForm.assemMethod.join(',')
          console.log(this.workArrgForm)
          setWorkAssignment(this.workArrgForm)
            .then(res => {
              this.$message.success('提交成功')
              this.goBack(-1)
            })
            .catch(err => {
              this.$message.warning('提交失败')
              this.goBack(-1)
            })
        } else {
          this.$message('请填写必填信息');
        }
      })
    },
    getWorkAssg() {
      getWorkAssignment({ projId: this.queryData.projId })
        .then(res => {
          console.log('data', res.data)
          this.workArrgForm = res.data
          this.dealArrgData()
          console.log('arrgform', this.workArrgForm)
        })
        .catch(err => {

        })
    },
    dealArrgData() {
      this.workArrgForm.assemMethod = this.workArrgForm.assemMethod.split(',')
      //
      this.workArrgForm.prePreparationPic = this.workArrgForm.prePreparationPic.split(',')
      this.workArrgForm.fldSrvyPic = this.workArrgForm.fldSrvyPic.split(',')
      this.workArrgForm.mktSrvyPic = this.workArrgForm.mktSrvyPic.split(',')
      this.workArrgForm.assemEstPic = this.workArrgForm.assemEstPic.split(',')
      this.workArrgForm.issueValPic = this.workArrgForm.issueValPic.split(',')
      this.workArrgForm.internalAuditPic = this.workArrgForm.internalAuditPic.split(',')
      this.workArrgForm.commuClientPic = this.workArrgForm.commuClientPic.split(',')
      this.workArrgForm.assemChargePic = this.workArrgForm.assemChargePic.split(',')
      this.workArrgForm.amendFinalPic = this.workArrgForm.amendFinalPic.split(',')
      this.workArrgForm.manuArchivePic = this.workArrgForm.manuArchivePic.split(',')
      //
      const pre = this.workArrgForm.prePreparationSche.substr(0, 10) + ',' + this.workArrgForm.prePreparationSche.substr(11, 10)
      const fld = this.workArrgForm.fldSrvySche.substr(0, 10) + ',' + this.workArrgForm.fldSrvySche.substr(11, 10)
      const mkt = this.workArrgForm.mktSrvySche.substr(0, 10) + ',' + this.workArrgForm.mktSrvySche.substr(11, 10)
      const est = this.workArrgForm.assemEstSche.substr(0, 10) + ',' + this.workArrgForm.assemEstSche.substr(11, 10)
      const issue = this.workArrgForm.issueValSche.substr(0, 10) + ',' + this.workArrgForm.issueValSche.substr(11, 10)
      const inte = this.workArrgForm.internalAuditSche.substr(0, 10) + ',' + this.workArrgForm.internalAuditSche.substr(11, 10)
      const com = this.workArrgForm.commuClientSche.substr(0, 10) + ',' + this.workArrgForm.commuClientSche.substr(11, 10)
      const charge = this.workArrgForm.assemChargeSche.substr(0, 10) + ',' + this.workArrgForm.assemChargeSche.substr(11, 10)
      const ame = this.workArrgForm.amendFinalSche.substr(0, 10) + ',' + this.workArrgForm.amendFinalSche.substr(11, 10)
      const manu = this.workArrgForm.manuArchiveSche.substr(0, 10) + ',' + this.workArrgForm.manuArchiveSche.substr(11, 10)
      //
      this.workArrgForm.prePreparationSche = pre.split(',')
      this.workArrgForm.fldSrvySche = fld.split(',')
      this.workArrgForm.mktSrvySche = mkt.split(',')
      this.workArrgForm.assemEstSche = est.split(',')
      this.workArrgForm.issueValSche = issue.split(',')
      this.workArrgForm.internalAuditSche = inte.split(',')
      this.workArrgForm.commuClientSche = com.split(',')
      this.workArrgForm.assemChargeSche = charge.split(',')
      this.workArrgForm.amendFinalSche = ame.split(',')
      this.workArrgForm.manuArchiveSche = manu.split(',')
    },
    goBack() {
      this.$router.go(-1)
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
}
</script>

<style scoped>
.workname-left {
  height: 30px;
  margin-top: 15px;
  line-height: 30px;
}
</style>