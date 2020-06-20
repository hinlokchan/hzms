<template>
  <div class="container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>资产项目正评登记</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="form-header">
      <h3>计划编号：{{form1.projNum}}</h3>
      <h3>项目名称：{{form1.projName}}</h3>
    </div>
    <div class="form-body">
      <el-tabs v-model="activeTab">
        <el-tab-pane
          label="计划信息"
          name="planInfo"
        >
          <el-form :model="form1">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="计划编号">
                  <el-input
                    :disabled="true"
                    v-model="form1.projNum"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="项目类型">
                  <!-- <el-input
                    :disabled="true"
                    v-model="form1.projType"
                  ></el-input> -->
                  <el-select
                    v-model="form1.projType"
                    :disabled="true"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in projTypeOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="基准日">
                  <el-input
                    :disabled="true"
                    v-model="form1.baseDate"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同号">
                  <el-input
                    :disabled="true"
                    v-model="form1.contractNum"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="估价项目">
                  <el-input
                    :disabled="true"
                    v-model="form1.projName"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="估价对象详细地址">
                  <el-input
                    :disabled="true"
                    v-model="form1.projScope"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="委托人">
                  <el-input
                    :disabled="true"
                    v-model="form1.clientName"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="项目信息"
          name="projInfo"
        >
          <el-form
            :model="form1"
            :rules="formRule"
          >
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="初评号">
                  <el-input
                    :disabled="true"
                    v-model="form2.paReportNum"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="正评号">
                  <el-input
                    :disabled="true"
                    v-model="form2.faReportNum"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="分户号（子报告号）">
                  <el-input
                    :disabled="true"
                    v-model="form2.subReportNum"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="评估目的">
                  <el-input
                    :disabled="true"
                    v-model="form2.assemGoal"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="评估方法">
                  <el-input
                    :disabled="true"
                    v-model="form1.assemMethod"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="行政区域">
                  <el-cascader
                    v-model="form2.adminRegion"
                    :options="cityOptions"
                    style="width: 100%"
                    clearable
                  >
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="出报告日期">
                  <el-date-picker
                    v-model="form2.projCompTime"
                    type="date"
                    placeholder="请选择日期"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="评估对象数量"
                  prop="count"
                >
                  <el-input
                    v-model="form2.count"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="报备号">
                  <el-input v-model="form2.recordNum"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="摇珠单或委托书编号">
                  <el-input v-model="form2.entrustNum"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="摇珠或委托时间">
                  <el-date-picker
                    v-model="form2.entrustTime"
                    type="date"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-divider content-position="left">评估前价值（元）</el-divider>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="资产总值">
                  <el-input
                    v-model="form2.formerTotalAssets"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="负债总值">
                  <el-input
                    v-model="form2.formerTotalDebet"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="所有值权益">
                  <el-input
                    v-model="form2.formerOwnersEquity"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-divider content-position="left">评估后价值（元）</el-divider>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="资产总值">
                  <el-input
                    v-model="form2.latterTotalAssets"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="负债总值">
                  <el-input
                    v-model="form2.latterTotalDebet"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="所有值权益">
                  <el-input
                    v-model="form2.latterOwnersEquity"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>

        <el-tab-pane
          label="人员信息"
          name="memberInfo"
        >
          <el-form :model="form4">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="项目负责人">
                  <el-input
                    v-model="form4.projLeader"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="专业复核人">
                  <el-input
                    v-model="form4.projProReviewer"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="签字估价师">
                  <el-input v-model="form4.signedAppraiser"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="现勘">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="资料收集及验证">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="市场询价调查">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="技术说明">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="报告拟稿">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="收费跟进">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-button
          type="primary"
          @click="onSubmit()"
        >提交</el-button>
        <el-button>取消</el-button>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import projTypeOption from '../../../../public/projTypeOption.json'
import cityOptions from '../../../../public/citys.json'
export default {
  name: 'zcformalreg',
  data() {
    return {
      projId: '',
      projDetail: '',
      activeTab: 'projInfo',
      projTypeOption: [],
      cityOptions: [],
      //计划信息
      form1: {
        projNum: '',
        projType: '',
        baseDate: '',
        contractNum: '',
        projName: '',
        projScope: '',
        clientName: '',
        paReportNum: '',
        faReportNum: '',
        subReportNum: '',
        assemGoal: '',
        assemMethod: '',
        adminRegion: '',
        projCompTime: '',
        count: '',
        recordNum: '',
        entrustNum: '',
        entrustTime: '',
        formerTotalAssets: '',
        formerTotalDebet: '',
        formerOwnersEquity: '',
        latterTotalAssets: '',
        latterTotalDebet: '',
        latterOwnersEquity: ''
      },
      //项目信息
      form2: {
        paReportNum: '',
        faReportNum: '',
        subReportNum: '',
        assemGoal: '',
        assemMethod: '',
        adminRegion: '',
        projCompTime: '',
        count: '',
        recordNum: '',
        entrustNum: '',
        entrustTime: '',
        formerTotalAssets: '',
        formerTotalDebet: '',
        formerOwnersEquity: '',
        latterTotalAssets: '',
        latterTotalDebet: '',
        latterOwnersEquity: ''
      },
      //人员信息
      form4: {
        projContact: '',
        projLeader: '',
        projProReviewer: '',
        signedAppraiser: '',
        fieldSrvy: '',
        infoVerification: '',
        marketEnquiry: '',
        techExpDrafter: '',
        reportDrafter: '',
      },
      mainForm: {},
      formRule: {

      }
    }
  },
  created() {
    this.projTypeOption = projTypeOption
    this.cityOptions = cityOptions
  },
  methods: {

  }
}
</script>

<style scoped>
</style>