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
          <el-radio-group v-model="workArrgForm.assemMethod">
            <el-radio label="成本法">成本法</el-radio>
            <el-radio label="收益法">收益法</el-radio>
            <el-radio label="市场法">市场法</el-radio>
          </el-radio-group>
          <!-- <el-checkbox
            v-model="addAssemCheck"
            @change="addAssemMethod"
          >其他
          </el-checkbox>
          <el-input
            style="width: 200px"
            transition="el-fade-in"
            v-if="addAssemCheck == true"
            v-model="workArrgForm.assemMethod"
          ></el-input>
          {{this.workArrgForm.assemMethod}} -->
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
        <!-- <el-form-item prop="prePrerationPic">
            <el-checkbox-group v-model="workArrgForm.prePreparationPic">
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item> -->
        <el-form-item>
          <el-button
            type="primary"
            @click="submitWorkArrg()"
          >提交</el-button>
          <el-button
            type="text"
            @click="workArrgVisible = false"
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
      queryData: {},
      tableData: [],
      projMember: [],
      workname: ['前期准备', '现场勘查及收集资料', '市场调查询价记录', '评定估算', '编制出具估价（估价）报告', '内部三级审核', '与委托人沟通', '评估收费', '修正定稿及提交报告', '工作底稿归档'],
      workArrgForm: {
        projId: '',
        assemMethod: '成本法',
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


    }
  },
  created() {
    this.workArrgForm.projId = this.$route.query.projId
    console.log('queryData', this.workArrgForm)
    console.log('queryData', this.$route.query.projMember)
  },
  mounted() {

  },
  methods: {

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