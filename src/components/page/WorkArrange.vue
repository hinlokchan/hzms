<template>
  <div class="container">
    <el-page-header @back="goBack"></el-page-header>
    <div
      class="crumbs"
      style="margin-top: 20px"
    >
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
        :model="arrgForm"
        ref="arrgFormRules"
        :rules="arrgFormRules"
        label-width="auto"
      >
        <el-form-item
          label="评估方法"
          prop="assemMethod"
        >
          <!-- <el-radio-group v-model="arrgForm.assemMethod">
            <el-radio label="成本法">成本法</el-radio>
            <el-radio label="收益法">收益法</el-radio>
            <el-radio label="市场法">市场法</el-radio>
          </el-radio-group> -->
          <el-checkbox-group v-model="arrgForm.assemMethod">
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
            v-model="arrgForm.fldSrvyContent"
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
                v-model="arrgForm.prePreparationSche"
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
              <el-checkbox-group v-model="arrgForm.prePreparationPic">
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
                v-model="arrgForm.fldSrvySche"
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
              <el-checkbox-group v-model="arrgForm.fldSrvyPic">
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
                v-model="arrgForm.mktSrvySche"
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
              <el-checkbox-group v-model="arrgForm.mktSrvyPic">
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
                v-model="arrgForm.assemEstSche"
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
              <el-checkbox-group v-model="arrgForm.assemEstPic">
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
                v-model="arrgForm.issueValSche"
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
              <el-checkbox-group v-model="arrgForm.issueValPic">
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
                v-model="arrgForm.internalAuditSche"
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
              <el-checkbox-group v-model="arrgForm.internalAuditPic">
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
                v-model="arrgForm.commuClientSche"
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
              <el-checkbox-group v-model="arrgForm.commuClientPic">
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
                v-model="arrgForm.assemChargeSche"
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
              <el-checkbox-group v-model="arrgForm.assemChargePic">
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
                v-model="arrgForm.amendFinalSche"
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
              <el-checkbox-group v-model="arrgForm.amendFinalPic">
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
                v-model="arrgForm.manuArchiveSche"
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
              <el-checkbox-group v-model="arrgForm.manuArchivePic">
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
      arrgForm: {
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
      // arrgFormRules: {
      //   assemMethod: [{ required: true, message: '请选择评估方法', trigger: 'change' }],
      //   prePreparationSche: [{ required: true, message: '请选择日期', trigger: 'change' }],
      //   fldSrvySche: [{ required: true, message: '请选择日期', trigger: 'change' }],
      //   mktSrvySche: [{ required: true, message: '请选择日期', trigger: 'change' }],
      //   assemEstSche: [{ required: true, message: '请选择日期', trigger: 'change' }],
      //   issueValSche: [{ required: true, message: '请选择日期', trigger: 'change' }],
      //   internalAuditSche: [{ required: true, message: '请选择日期', trigger: 'change' }],
      //   commuClientSche: [{ required: true, message: '请选择日期', trigger: 'change' }],
      //   assemChargeSche: [{ required: true, message: '请选择日期', trigger: 'change' }],
      //   amendFinalSche: [{ required: true, message: '请选择日期', trigger: 'change' }],
      //   manuArchiveSche: [{ required: true, message: '请选择日期', trigger: 'change' }],
      //   //
      //   prePreparationPic: [{ required: true, message: '请选择责任人', trigger: 'change' }],
      //   prePreparationPic: [{ required: true, message: '请选择责任人', trigger: 'change' }],
      //   fldSrvyPic: [{ required: true, message: '请选择责任人', trigger: 'change' }],
      //   mktSrvyPic: [{ required: true, message: '请选择责任人', trigger: 'change' }],
      //   assemEstPic: [{ required: true, message: '请选择责任人', trigger: 'change' }],
      //   issueValPic: [{ required: true, message: '请选择责任人', trigger: 'change' }],
      //   internalAuditPic: [{ required: true, message: '请选择责任人', trigger: 'change' }],
      //   commuClientPic: [{ required: true, message: '请选择责任人', trigger: 'change' }],
      //   assemChargePic: [{ required: true, message: '请选择责任人', trigger: 'change' }],
      //   amendFinalPic: [{ required: true, message: '请选择责任人', trigger: 'change' }],
      //   manuArchivePic: [{ required: true, message: '请选择责任人', trigger: 'change' }]

      // }

    }
  },
  created() {
    this.queryData = this.$route.query.data
    this.projMember = this.$route.query.projMember
    this.arrgForm.projId = this.queryData.projId
    if (this.$route.query.isEdit == true) {
      this.getWorkAssg()
    } else {
      
    }
  },
  mounted() {

  },
  methods: {
    // onSubmitWorkArrg() {
    //   this.$refs.arrgFormRules.validate((valid) => {
    //     if (valid) {
    //       this.arrgForm.prePreparationPic = this.arrgForm.prePreparationPic.join(',')
    //       this.arrgForm.fldSrvyPic = this.arrgForm.fldSrvyPic.join(',')
    //       this.arrgForm.mktSrvyPic = this.arrgForm.mktSrvyPic.join(',')
    //       this.arrgForm.assemEstPic = this.arrgForm.assemEstPic.join(',')
    //       this.arrgForm.issueValPic = this.arrgForm.issueValPic.join(',')
    //       this.arrgForm.internalAuditPic = this.arrgForm.internalAuditPic.join(',')
    //       this.arrgForm.commuClientPic = this.arrgForm.commuClientPic.join(',')
    //       this.arrgForm.assemChargePic = this.arrgForm.assemChargePic.join(',')
    //       this.arrgForm.amendFinalPic = this.arrgForm.amendFinalPic.join(',')
    //       this.arrgForm.manuArchivePic = this.arrgForm.manuArchivePic.join(',')
    //       //
    //       this.arrgForm.prePreparationSche = this.arrgForm.prePreparationSche.join('-')
    //       this.arrgForm.fldSrvySche = this.arrgForm.fldSrvySche.join('-')
    //       this.arrgForm.mktSrvySche = this.arrgForm.mktSrvySche.join('-')
    //       this.arrgForm.assemEstSche = this.arrgForm.assemEstSche.join('-')
    //       this.arrgForm.issueValSche = this.arrgForm.issueValSche.join('-')
    //       this.arrgForm.internalAuditSche = this.arrgForm.internalAuditSche.join('-')
    //       this.arrgForm.commuClientSche = this.arrgForm.commuClientSche.join('-')
    //       this.arrgForm.assemChargeSche = this.arrgForm.assemChargeSche.join('-')
    //       this.arrgForm.amendFinalSche = this.arrgForm.amendFinalSche.join('-')
    //       this.arrgForm.manuArchiveSche = this.arrgForm.manuArchiveSche.join('-')
    //       //
    //       this.arrgForm.assemMethod = this.arrgForm.assemMethod.join(',')
    //       console.log(this.arrgForm)
    //       setWorkAssignment(this.arrgForm)
    //         .then(res => {
    //           this.$message.success('提交成功')
    //           this.goBack(-1)
    //         })
    //         .catch(err => {
    //           this.$message.warning('提交失败')
    //           this.goBack(-1)
    //         })
    //     } else {
    //       this.$message('请填写必填信息');
    //     }
    //   })
    // },
    getWorkAssg() {
      getWorkAssignment({ projId: this.queryData.projId })
        .then(res => {
          console.log('data', res.data)
          this.arrgForm = res.data
          this.dealArrgData()
          console.log('arrgform', this.arrgForm)
        })
        .catch(err => {

        })
    },
    dealArrgData() {
      this.arrgForm.assemMethod = this.arrgForm.assemMethod.split(',')
      //
      this.arrgForm.prePreparationPic = this.arrgForm.prePreparationPic.split(',')
      this.arrgForm.fldSrvyPic = this.arrgForm.fldSrvyPic.split(',')
      this.arrgForm.mktSrvyPic = this.arrgForm.mktSrvyPic.split(',')
      this.arrgForm.assemEstPic = this.arrgForm.assemEstPic.split(',')
      this.arrgForm.issueValPic = this.arrgForm.issueValPic.split(',')
      this.arrgForm.internalAuditPic = this.arrgForm.internalAuditPic.split(',')
      this.arrgForm.commuClientPic = this.arrgForm.commuClientPic.split(',')
      this.arrgForm.assemChargePic = this.arrgForm.assemChargePic.split(',')
      this.arrgForm.amendFinalPic = this.arrgForm.amendFinalPic.split(',')
      this.arrgForm.manuArchivePic = this.arrgForm.manuArchivePic.split(',')
      //
      const pre = this.arrgForm.prePreparationSche.substr(0, 10) + ',' + this.arrgForm.prePreparationSche.substr(11, 10)
      const fld = this.arrgForm.fldSrvySche.substr(0, 10) + ',' + this.arrgForm.fldSrvySche.substr(11, 10)
      const mkt = this.arrgForm.mktSrvySche.substr(0, 10) + ',' + this.arrgForm.mktSrvySche.substr(11, 10)
      const est = this.arrgForm.assemEstSche.substr(0, 10) + ',' + this.arrgForm.assemEstSche.substr(11, 10)
      const issue = this.arrgForm.issueValSche.substr(0, 10) + ',' + this.arrgForm.issueValSche.substr(11, 10)
      const inte = this.arrgForm.internalAuditSche.substr(0, 10) + ',' + this.arrgForm.internalAuditSche.substr(11, 10)
      const com = this.arrgForm.commuClientSche.substr(0, 10) + ',' + this.arrgForm.commuClientSche.substr(11, 10)
      const charge = this.arrgForm.assemChargeSche.substr(0, 10) + ',' + this.arrgForm.assemChargeSche.substr(11, 10)
      const ame = this.arrgForm.amendFinalSche.substr(0, 10) + ',' + this.arrgForm.amendFinalSche.substr(11, 10)
      const manu = this.arrgForm.manuArchiveSche.substr(0, 10) + ',' + this.arrgForm.manuArchiveSche.substr(11, 10)
      //
      this.arrgForm.prePreparationSche = pre.split(',')
      this.arrgForm.fldSrvySche = fld.split(',')
      this.arrgForm.mktSrvySche = mkt.split(',')
      this.arrgForm.assemEstSche = est.split(',')
      this.arrgForm.issueValSche = issue.split(',')
      this.arrgForm.internalAuditSche = inte.split(',')
      this.arrgForm.commuClientSche = com.split(',')
      this.arrgForm.assemChargeSche = charge.split(',')
      this.arrgForm.amendFinalSche = ame.split(',')
      this.arrgForm.manuArchiveSche = manu.split(',')
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