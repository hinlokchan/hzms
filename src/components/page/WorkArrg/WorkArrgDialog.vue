<template>
  <el-dialog
    :visible.sync="visible"
    :show="show"
    title="工作安排"
    width="80%"
    center
    @close="onClose()"
  >
    <el-form
      :model="arrgForm"
      ref="arrgForm"
      :rules="arrgFormRules"
      label-width="150px"
    >
      <el-button @click="defaultArrg">默认安排</el-button>
      <el-form-item
        label="评估方法"
        prop="assemMethod"
      >
        <el-select
          v-model="arrgForm.assemMethod"
          multiple
          filterable
          allow-create
          placeholder="请选择评估方法"
        >
        <el-option
            v-if="projType == 1010"
            v-for="item in assemMethodOptionsFc"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
          <el-option
            v-if="projType == 1020"
            v-for="item in assemMethodOptionsZc"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
          <el-option
            v-if="projType == 1030"
            v-for="item in assemMethodOptionsTd"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
          <el-option
            v-if="projType != 1010 && projType != 1020 && projType != 1030 "
            v-for="item in assemMethodOptionsNr"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <div style="color: red">Tips:选项中没有的评估方法可直接在框内输入创建</div>
      </el-form-item>
      <el-form-item label="现场勘查内容">
        <el-input
          v-model="arrgForm.fldSrvyContent"
          type="textarea"
          rows="2"
        ></el-input>
      </el-form-item>

      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item
            label="前期准备"
            prop="prePreparationSche"
          >
            <el-date-picker
              style="width: 100%"
              v-model="arrgForm.prePreparationSche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="MM/dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item
            prop="prePreparationPic"
            label="责任人"
          >
            <el-checkbox-group
              v-model="arrgForm.prePreparationPic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item
            label="现场勘查及收集资料"
            prop="fldSrvySche"
          >
            <el-date-picker
              style="width: 100%"
              v-model="arrgForm.fldSrvySche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="MM/dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item
            label="责任人"
            prop="fldSrvyPic"
          >
            <el-checkbox-group
              v-model="arrgForm.fldSrvyPic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item
            label="市场调查询价记录"
            prop="mktSrvySche"
          >
            <el-date-picker
              style="width: 100%"
              v-model="arrgForm.mktSrvySche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="MM/dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item
            label="责任人"
            prop="mktSrvyPic"
          >
            <el-checkbox-group
              v-model="arrgForm.mktSrvyPic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item
            label="评定估算"
            prop="assemEstSche"
          >
            <el-date-picker
              style="width: 100%"
              v-model="arrgForm.assemEstSche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="MM/dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item
            label="责任人"
            prop="assemEstPic"
          >
            <el-checkbox-group
              v-model="arrgForm.assemEstPic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item
            label="编制出具报告"
            prop="issueValSche"
          >
            <el-date-picker
              style="width: 100%"
              v-model="arrgForm.issueValSche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="MM/dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item
            label="责任人"
            prop="issueValPic"
          >
            <el-checkbox-group
              v-model="arrgForm.issueValPic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item
            label="内部三级审核"
            prop="internalAuditSche"
          >
            <el-date-picker
              style="width: 100%"
              v-model="arrgForm.internalAuditSche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="MM/dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item
            label="责任人"
            prop="internalAuditPic"
          >
            <el-checkbox-group
              v-model="arrgForm.internalAuditPic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item
            label="与委托人沟通"
            prop="commuClientSche"
          >
            <el-date-picker
              style="width: 100%"
              v-model="arrgForm.commuClientSche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="MM/dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item
            label="责任人"
            prop="commuClientPic"
          >
            <el-checkbox-group
              v-model="arrgForm.commuClientPic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item
            label="评估收费"
            prop="assemChargeSche"
          >
            <!-- <el-date-picker
              style="width: 100%"
              v-model="arrgForm.assemChargeSche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="MM/dd"
            ></el-date-picker> -->
            <el-input
              v-model="arrgForm.assemChargeSche"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item
            label="责任人"
            prop="assemChargePic"
          >
            <el-checkbox-group
              v-model="arrgForm.assemChargePic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item
            label="修正定稿及提交报告"
            prop="amendFinalSche"
          >
            <el-date-picker
              style="width: 100%"
              v-model="arrgForm.amendFinalSche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="MM/dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item
            label="责任人"
            prop="amendFinalPic"
          >
            <el-checkbox-group
              v-model="arrgForm.amendFinalPic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item
            label="工作底稿归档"
            prop="manuArchiveSche"
          >
            <!-- <el-date-picker
              style="width: 100%"
              v-model="arrgForm.manuArchiveSche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="MM/dd"
            ></el-date-picker> -->
            <el-input
              v-model="arrgForm.manuArchiveSche"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item
            label="责任人"
            prop="manuArchivePic"
          >
            <el-checkbox-group
              v-model="arrgForm.manuArchivePic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button
        type="primary"
        @click="onSubmitWorkArrg()"
      >提交</el-button>
      <el-button
        type="text"
        @click="onClose()"
      >取消</el-button>
    </el-form>
  </el-dialog>
</template>

<script>
import { setWorkAssignment, getWorkAssignment } from '@/api/index'
import { Form } from 'element-ui'
export default {
  name: 'WorkArrgDialog',
  inject: ['reload'],
  props: {
    show: { type: Boolean, default: false },
    arrgEdit: { type: Boolean, default: false },
    arrgData: { type: Object },
    projId: { type: Number },
    projType: { type: Number },
    projMember: { type: Array },
    baseDate: { type: Number },
    projLeader: { type: String },
    projReviewer: { type: String },
    projProReviewer: { type: String },
    projAsst: { type: String },
    fieldSrvy: { type: String }
  },
  watch: {
    show: {
      immediate: true,
      handler(show) {
        console.log(this.projReviewer)
        this.visible = this.show
        this.arrgForm.projId = this.projId
        if (show == true) {
          this.checkData()
        }
      }
    },
    // arrgEdit: {
    //   immediate: true,
    //   handler(arrgEdit) {
    //     console.log('成！！！！', arrgEdit)
    //     console.log('施恩', this.arrgData)
    //   }
    // }
  },
  data() {
    return {
      visible: this.show,
      arrgForm: {
        projId: '',
        assemMethod: '',
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
        //日期
        prePreparationSche: [],
        fldSrvySche: [],
        mktSrvySche: [],
        assemEstSche: [],
        issueValSche: [],
        internalAuditSche: [],
        commuClientSche: [],
        assemChargeSche: '出具正式报告时',
        amendFinalSche: [],
        manuArchiveSche: '出正评后3个月内'
      },
      assemMethodOptionsNr: ['成本法', '收益法', '市场法'],
      assemMethodOptionsZc: ['成本法', '收益法', '市场法', '实物期权法'],
      assemMethodOptionsFc: ['成本法', '剩余法', '市场比较法', '收益法', '假设开发法', '公示地价系数修正法'],
      assemMethodOptionsTd: ['市场比较法', '收益还原法', '剩余法', '成本逼近法', '基准地价系数修正法'],
      arrgFormRules: {
        assemMethod: [{ required: true, message: '请填写评估方法', trigger: 'change' }],
        prePreparationSche: [{ required: true, message: '请选择日期', trigger: 'change' }],
        fldSrvySche: [{ required: true, message: '请选择日期', trigger: 'change' }],
        mktSrvySche: [{ required: true, message: '请选择日期', trigger: 'change' }],
        assemEstSche: [{ required: true, message: '请选择日期', trigger: 'change' }],
        issueValSche: [{ required: true, message: '请选择日期', trigger: 'change' }],
        internalAuditSche: [{ required: true, message: '请选择日期', trigger: 'change' }],
        commuClientSche: [{ required: true, message: '请选择日期', trigger: 'change' }],
        amendFinalSche: [{ required: true, message: '请选择日期', trigger: 'change' }],
        //
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
  methods: {
    checkData() {
      if (this.arrgData == null) {
        this.$message.success('新增安排')
      } else {
        this.$message.success('编辑安排')
        this.arrgForm = this.arrgData
      }
    },
    onClose() {
      this.$emit('update:show', false)
    },
    onSubmitWorkArrg() {
      this.$refs.arrgForm.validate((valid) => {
        if (valid) {
          this.arrgForm.assemMethod = this.arrgForm.assemMethod.join(',')
          //
          this.arrgForm.prePreparationPic = this.arrgForm.prePreparationPic.join(',')
          this.arrgForm.fldSrvyPic = this.arrgForm.fldSrvyPic.join(',')
          this.arrgForm.mktSrvyPic = this.arrgForm.mktSrvyPic.join(',')
          this.arrgForm.assemEstPic = this.arrgForm.assemEstPic.join(',')
          this.arrgForm.issueValPic = this.arrgForm.issueValPic.join(',')
          this.arrgForm.internalAuditPic = this.arrgForm.internalAuditPic.join(',')
          this.arrgForm.commuClientPic = this.arrgForm.commuClientPic.join(',')
          this.arrgForm.assemChargePic = this.arrgForm.assemChargePic.join(',')
          this.arrgForm.amendFinalPic = this.arrgForm.amendFinalPic.join(',')
          this.arrgForm.manuArchivePic = this.arrgForm.manuArchivePic.join(',')
          //
          this.arrgForm.prePreparationSche = this.arrgForm.prePreparationSche.join('-')
          this.arrgForm.fldSrvySche = this.arrgForm.fldSrvySche.join('-')
          this.arrgForm.mktSrvySche = this.arrgForm.mktSrvySche.join('-')
          this.arrgForm.assemEstSche = this.arrgForm.assemEstSche.join('-')
          this.arrgForm.issueValSche = this.arrgForm.issueValSche.join('-')
          this.arrgForm.internalAuditSche = this.arrgForm.internalAuditSche.join('-')
          this.arrgForm.commuClientSche = this.arrgForm.commuClientSche.join('-')
          //this.arrgForm.assemChargeSche = this.arrgForm.assemChargeSche.join('-')
          this.arrgForm.amendFinalSche = this.arrgForm.amendFinalSche.join('-')
          //this.arrgForm.manuArchiveSche = this.arrgForm.manuArchiveSche.join('-')
          //
          console.log('提交arrgForm', this.arrgForm)
          setWorkAssignment(this.arrgForm)
            .then(res => {
              this.$message.success('提交成功')
              this.reload()
            })
            .catch(err => {
              this.$message.error('提交失败，请稍后重试')
            })
        } else {
          this.$message.warning('请填写必填信息')
        }
      })
    },
    defaultArrg() {
      let day = this.baseDate
      let day1 = this.$moment(day).format('MM/DD')
      let day2 = this.$moment(day + 86400000).format('MM/DD')
      let day3 = this.$moment(day + 172800000).format('MM/DD')
      let day4 = this.$moment(day + 259200000).format('MM/DD')
      console.log(day, day1, day2, day3, day4)
      this.arrgForm.prePreparationSche.push(day1, day1)
      this.arrgForm.fldSrvySche.push(day1, day1)
      this.arrgForm.mktSrvySche.push(day1, day1)
      this.arrgForm.assemEstSche.push(day2, day2)
      this.arrgForm.issueValSche.push(day2, day2)
      this.arrgForm.internalAuditSche.push(day3, day3)
      this.arrgForm.commuClientSche.push(day3, day3)
      this.arrgForm.amendFinalSche.push(day4, day4)

      let leader = this.projLeader.split(',')
      let reviewer = this.projReviewer.split(',')
      let asst = this.projAsst.split(',')
      let srvy = this.fieldSrvy.split(',')
      for (let i of leader) {
        if (i != '') {
          this.arrgForm.prePreparationPic.push(i)
          this.arrgForm.internalAuditPic.push(i)
          this.arrgForm.commuClientPic.push(i)
          this.arrgForm.assemChargePic.push(i)
          this.arrgForm.amendFinalPic.push(i)
        }

      }
      for (let i of reviewer) {
        if (i != '') {
          this.arrgForm.internalAuditPic.push(i)
          this.arrgForm.commuClientPic.push(i)
        }

      }
      for (let i of asst) {
        if (i != '') {
          this.arrgForm.mktSrvyPic.push(i)
          this.arrgForm.assemEstPic.push(i)
          this.arrgForm.issueValPic.push(i)
          this.arrgForm.internalAuditPic.push(i)
          this.arrgForm.manuArchivePic.push(i)
        }

      }
      for (let i of srvy) {
        if (i != '') {
          this.arrgForm.fldSrvyPic.push(i)
        }
      }
    },
    transData() {
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
      this.arrgForm.prePreparationSche = this.arrgForm.prePreparationSche.split('-')
      this.arrgForm.fldSrvySche = this.arrgForm.fldSrvySche.split('-')
      this.arrgForm.mktSrvySche = this.arrgForm.mktSrvySche.split('-')
      this.arrgForm.assemEstSche = this.arrgForm.assemEstSche.split('-')
      this.arrgForm.issueValSche = this.arrgForm.issueValSche.split('-')
      this.arrgForm.internalAuditSche = this.arrgForm.internalAuditSche.split('-')
      this.arrgForm.commuClientSche = this.arrgForm.commuClientSche.split('-')
      //this.arrgForm.assemChargeSche = this.arrgForm.assemChargeSche.split('-')
      this.arrgForm.amendFinalSche = this.arrgForm.amendFinalSche.split('-')
      //this.arrgForm.manuArchiveSche = this.arrgForm.manuArchiveSche.split('-')
    }
  }
}
</script>

<style>
</style>