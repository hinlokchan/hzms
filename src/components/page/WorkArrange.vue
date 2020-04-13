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
    <div>
      <el-form>
        <div class="form-item-title">
          <h3>选定评估方法</h3>
        </div>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item class="el-form-item">
              <el-checkbox-group v-model="form.assemMethod">
                <el-checkbox
                  label="成本法"
                  border
                  size="medium"
                  name="assemMethod"
                ></el-checkbox>
                <el-checkbox
                  label="收益法"
                  border
                  size="medium"
                  name="assemMethod"
                ></el-checkbox>
                <el-checkbox
                  label="市场法"
                  border
                  size="medium"
                  name="assemMethod"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item
              class="el-form-item"
              label="其他方法"
              label-width="75px"
            >
              <el-input style="width:300px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="form-item-title">
          <h3>现场调查内容</h3>
        </div>
        <el-row>
          <el-col :span="12">
        <el-form-item class="el-form-item">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.fldSrvyContent"
          ></el-input>
        </el-form-item>
        </el-col>
        </el-row>
        <div class="form-item-title">
          <h3>综合进度安排</h3>
        </div>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-card>
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
                    v-for="item in workname"
                    :key="item"
                  >{{item}}</div>
                </el-col>
                <el-col :span="10">
                  <div class="workname-mid">
                    <el-form-item class="workname-mid-form">
                      <el-date-picker
                        type="daterange"
                        v-model="form.prePreparationSche"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item class="workname-mid-form">
                      <el-date-picker
                        type="daterange"
                        v-model="form.fldSrvySche"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item class="workname-mid-form">
                      <el-date-picker
                        type="daterange"
                        v-model="form.mktSrvySche"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item class="workname-mid-form">
                      <el-date-picker
                        type="daterange"
                        v-model="form.assemEstSche"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item class="workname-mid-form">
                      <el-date-picker
                        type="daterange"
                        v-model="form.issueValSche"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item class="workname-mid-form">
                      <el-date-picker
                        type="daterange"
                        v-model="form.internalAuditSche"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item class="workname-mid-form">
                      <el-date-picker
                        type="daterange"
                        v-model="form.commuClientSche"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item class="workname-mid-form">
                      <el-date-picker
                        type="daterange"
                        v-model="form.assemChargeSche"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item class="workname-mid-form">
                      <el-date-picker
                        type="daterange"
                        v-model="form.amendFinalSche"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item class="workname-mid-form">
                      <el-date-picker
                        type="daterange"
                        v-model="form.manuArchiveSche"
                      ></el-date-picker>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="8">
                  <el-form-item class="workname-right-form">
                    <el-checkbox-group v-model="form.prePreparationPic">
                      <el-checkbox-button
                        v-for="item in projMember"
                        :key="item"
                        :label="item"
                      ></el-checkbox-button>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="8">
                  <el-form-item class="workname-right-form">
                    <el-select
                      v-model="form.prePreparationPic"
                      multiple
                      placeholder="请选择人员"
                    >
                      <el-option
                        v-for="item in projMember"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="workname-right-form">
                    <el-select
                      v-model="form.fldSrvyPic"
                      multiple
                      placeholder="请选择人员"
                    >
                      <el-option
                        v-for="item in projMember"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="workname-right-form">
                    <el-select
                      v-model="form.mktSrvyPic"
                      multiple
                      placeholder="请选择人员"
                    >
                      <el-option
                        v-for="item in projMember"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="workname-right-form">
                    <el-select
                      v-model="form.assemEstPic"
                      multiple
                      placeholder="请选择人员"
                    >
                      <el-option
                        v-for="item in projMember"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="workname-right-form">
                    <el-select
                      v-model="form.issueValPic"
                      multiple
                      placeholder="请选择人员"
                    >
                      <el-option
                        v-for="item in projMember"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="workname-right-form">
                    <el-select
                      v-model="form.internalAuditPic"
                      multiple
                      placeholder="请选择人员"
                    >
                      <el-option
                        v-for="item in projMember"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="workname-right-form">
                    <el-select
                      v-model="form.commuClientPic"
                      multiple
                      placeholder="请选择人员"
                    >
                      <el-option
                        v-for="item in projMember"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="workname-right-form">
                    <el-select
                      v-model="form.assemChargePic"
                      multiple
                      placeholder="请选择人员"
                    >
                      <el-option
                        v-for="item in projMember"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="workname-right-form">
                    <el-select
                      v-model="form.amendFinalPic"
                      multiple
                      placeholder="请选择人员"
                    >
                      <el-option
                        v-for="item in projMember"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="workname-right-form">
                    <el-select
                      v-model="form.manuArchivePic"
                      multiple
                      placeholder="请选择人员"
                    >
                      <el-option
                        v-for="item in projMember"
                        :key="item"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col> -->
              </el-row>
            </el-card>
            <el-form-item>
              <el-button
                type="primary"
                @click="onSubmit"
              >表单提交</el-button>
              <el-button @click="goBack">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
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
      midMember: [],
      projMember: [],
      projContact: [],
      projLeader: [],
      projReviewer: [],
      projProReviewver: [],
      projAsst: [],
      workname: ['前期准备', '现场勘查及收集资料', '市场调查询价记录', '评定估算', '编制出具估价（估价）报告', '内部三级审核', '与委托人沟通', '评估收费', '修正定稿及提交报告', '工作底稿归档'],
      form: {
        assemMethod: [],
        fldSrvyContent: '',
        prePreparationSche: '',
        prePreparationPic: '',
        fldSrvySche: '',
        fldSrvyPic: '',
        mktSrvySche: '',
        mktSrvyPic: '',
        assemEstSche: '',
        assemEstPic: '',
        issueValSche: '',
        issueValPic: '',
        internalAuditSche: '',
        internalAuditPic: '',
        commuClientSche: '',
        commuClientPic: '',
        assemChargeSche: '',
        assemChargePic: '',
        amendFinalSche: '',
        amendFinalPic: '',
        manuArchiveSche: '',
        manuArchivePic: ''
      }
    }
  },
  created() {
    this.queryData = this.$route.query.data
    console.log('queryData >>> ', this.queryData)
    this.projContact = (this.queryData.projContact || '').split(',')
    this.projLeader = (this.queryData.projLeader || '').split(',')
    this.projReviewer = (this.queryData.projReviewer || '').split(',')
    this.projProReviewer = (this.queryData.projProReviewer || '').split(',')
    this.projAsst = (this.queryData.projAsst || '').split(',')
    this.midMember.push(...this.projContact, ...this.projLeader, ...this.projReviewer, ...this.projProReviewver, ...this.projAsst)//暂存后续去重
    this.getData()
  },
  mounted() {
    var a = Array.from(new Set(this.midMember))//数组内去重
    this.projMember = a.filter(item => item)
    console.log('去重，去空串后projMember', this.projMember)

  },
  methods: {
    onSubmit() {
      console.log('onsubmit')

    },
    goBack() {
      this.$router.push('/workbranch')
    },
    getData() {
      getWorkAssignment({ projId: this.queryData.projId })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log('failed to get work assignment')
        })
    }
  }
}
</script>

<style scoped>
.form-item-title {
  width: 100%;
  text-align: left;
  padding-left: 10px;
  margin: 20px 0 5px 0;
  border-left: solid 5px #409eff;
}
.el-form-item {
  margin: 10px 0 0 15px;
}
.work-container {
  margin-top: 15px;
}
.workitem {
  height: 45px;
  color: #8a8a8a;
  line-height: 30px;
  border: 1px solid #fff;
}
.workdate {
  border: 1px solid #fff;
  background-color: aquamarine;
}
.workname-left {
  margin-top: 15px;
  line-height: 30px;
}
.workname-mid {
  width: 100%;
}
.workname-mid-form {
  margin-top: 13px;
}
.workname-right-form {
  margin-top: 12px;
}
</style>