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
    <el-card style="width: 70%">
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
        <el-form-item
          label="前期准备"
          prop="prePrerationSche"
        >
          <el-date-picker
            v-model="workArrgForm.prePreparationSche"
            type="daterange"
            range-separator="-"
            start-placeholde="开始日期"
            end-placeholde="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <el-checkbox-group v-model="workArrgForm.prePreparationPic">
            <el-checkbox-button
              v-for="item in projMember"
              :key="item"
              :label="item"
            ></el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="现场勘查及收集资料">
          <el-date-picker
            v-model="workArrgForm.fldSrvySche"
            type="daterange"
            range-separator="-"
            start-placeholde="开始日期"
            end-placeholde="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <el-checkbox-group v-model="workArrgForm.fldSrvyPic">
            <el-checkbox-button
              v-for="item in projMember"
              :key="item"
              :label="item"
            ></el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="市场调查询价记录">
          <el-date-picker
            v-model="workArrgForm.mktSrvySche"
            type="daterange"
            range-separator="-"
            start-placeholde="开始日期"
            end-placeholde="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <el-checkbox-group v-model="workArrgForm.mktSrvyPic">
            <el-checkbox-button
              v-for="item in projMember"
              :key="item"
              :label="item"
            ></el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="评定估算">
          <el-date-picker
            v-model="workArrgForm.assemEstSche"
            type="daterange"
            range-separator="-"
            start-placeholde="开始日期"
            end-placeholde="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <el-checkbox-group v-model="workArrgForm.assemEstPic">
            <el-checkbox-button
              v-for="item in projMember"
              :key="item"
              :label="item"
            ></el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="编制出具报告">
          <el-date-picker
            v-model="workArrgForm.issueValSche"
            type="daterange"
            range-separator="-"
            start-placeholde="开始日期"
            end-placeholde="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <el-checkbox-group v-model="workArrgForm.issueValPic">
            <el-checkbox-button
              v-for="item in projMember"
              :key="item"
              :label="item"
            ></el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="内部三级审核">
          <el-date-picker
            v-model="workArrgForm.internalAuditSche"
            type="daterange"
            range-separator="-"
            start-placeholde="开始日期"
            end-placeholde="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <el-checkbox-group v-model="workArrgForm.internalAuditPic">
            <el-checkbox-button
              v-for="item in projMember"
              :key="item"
              :label="item"
            ></el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="与委托人沟通">
          <el-date-picker
            v-model="workArrgForm.commuClientSche"
            type="daterange"
            range-separator="-"
            start-placeholde="开始日期"
            end-placeholde="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <el-checkbox-group v-model="workArrgForm.commuClientPic">
            <el-checkbox-button
              v-for="item in projMember"
              :key="item"
              :label="item"
            ></el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="评估收费">
          <el-date-picker
            v-model="workArrgForm.assemChargeSche"
            type="daterange"
            range-separator="-"
            start-placeholde="开始日期"
            end-placeholde="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <el-checkbox-group v-model="workArrgForm.assemChargePic">
            <el-checkbox-button
              v-for="item in projMember"
              :key="item"
              :label="item"
            ></el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="修正定稿及提交报告">
          <el-date-picker
            v-model="workArrgForm.amendFinalSche"
            type="daterange"
            range-separator="-"
            start-placeholde="开始日期"
            end-placeholde="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <el-checkbox-group v-model="workArrgForm.amendFinalPic">
            <el-checkbox-button
              v-for="item in projMember"
              :key="item"
              :label="item"
            ></el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="工作底稿归档">
          <el-date-picker
            v-model="workArrgForm.manuArchiveSche"
            type="daterange"
            range-separator="-"
            start-placeholde="开始日期"
            end-placeholde="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <el-checkbox-group v-model="workArrgForm.manuArchivePic">
            <el-checkbox-button
              v-for="item in projMember"
              :key="item"
              :label="item"
            ></el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
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
import { setWorkAssignment } from '@/api/index'
export default {
  name: 'workarrange',
  data() {
    return {
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
        prePreparationSche: '',
        fldSrvySche: '',
        mktSrvySche: '',
        assemEstcSche: '',
        issueValSche: '',
        internalAuditSche: '',
        commuClientSche: '',
        assemChargeSche: '',
        amendFinalSche: '',
        manuArchiveSche: ''
      },
      arrgFormRules: {
        //   fldSrvyContent: [{required: true, message: '请填写', trigger: 'blur'}],
        //   prePreparationSche: [{required: true, message: '请填写', trigger: 'blur'}],
        //   prePreparationPic: [{required: true, message: '请填写', trigger: 'blur'}]
      }

    }
  },
  created() {
    this.queryData = this.$route.query.data
    this.projMember = this.$route.query.projMember
    this.workArrgForm.projId = this.queryData.projId
  },
  mounted() {

  },
  methods: {
    onSubmitWorkArrg() {
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
      console.log(this.workArrgForm)
      setWorkAssignment(this.workArrgForm)
        .then(res => {
          this.$message.success('提交成功')
          this.goBack(-1)
        })
        .catch(err => {

        })
    },
    goBack() {
      this.$router.go(-1)
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