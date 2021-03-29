<template>
  <el-dialog
    title="正评登记1"
    :visible.sync="formalRegVisible"
    width="80%"
  >
    <el-form
      :model="regForm"
      :rules="regRules"
      ref="regForm"
    >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item
            label="项目完成时间"
            prop="projCompTime"
          >
            <el-date-picker
              v-model="regForm.projCompTime"
              value-format="yyyy-MM-dd"
              type="date"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="标准收费（元）"
            prop="standardFee"
          >
            <el-input
              v-model="regForm.standardFee"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="应收费（元）"
            prop="dutyFee"
            oninput="value=value.replace(/[^\d.]/g,'')"
          >
            <el-input v-model="regForm.dutyFee"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="资料收集及验证"
            prop="infoVerification"
          >
            <el-checkbox-group v-model="regForm.infoVerification">
              <el-checkbox
                v-for="item in projMember"
                :key="item"
                :label="item"
                style="width: 100%"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="市场询价调查"
            prop="marketEnquiry"
          >
            <el-checkbox-group v-model="regForm.marketEnquiry">
              <el-checkbox
                v-for="item in projMember"
                :key="item"
                :label="item"
                style="width: 100%"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="技术说明"
            prop="techExp"
          >
            <el-checkbox-group v-model="regForm.techExp">
              <el-checkbox
                v-for="item in projMember"
                :key="item"
                :label="item"
                style="width: 100%"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="报告拟稿"
            prop="reportDrafter"
          >
            <el-checkbox-group v-model="regForm.reportDrafter">
              <el-checkbox
                v-for="item in projMember"
                :key="item"
                :label="item"
                style="width: 100%"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="收费跟进"
            prop="feeFollowUp"
          >
            <el-checkbox-group v-model="regForm.feeFollowUp">
              <el-checkbox
                v-for="item in projMember"
                :key="item"
                :label="item"
                style="width: 100%"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="签字评估（估价）师"
            prop="signedAppraiser"
          >
            <el-checkbox-group v-model="regForm.signedAppraiser">
              <el-checkbox
                v-for="item in projMember"
                :key="item"
                :label="item"
                style="width: 100%"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="助理（归档）"
            prop="projAsst"
          >
            <el-checkbox-group v-model="regForm.projAsst">
              <el-checkbox
                v-for="item in projMember"
                :key="item"
                :label="item"
                style="width: 100%"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="现场勘查"
            prop="fieldSrvy"
          >
            <el-checkbox-group v-model="regForm.fieldSrvy">
              <el-checkbox
                v-for="item in projMember"
                :key="item"
                :label="item"
                style="width: 100%"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button
        type="text"
        @click="formalRegVisible = false"
      >取 消</el-button>
      <el-button
        type="primary"
        @click="submitFormalReg()"
      >确认提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'FormalRegDialog',
  inject: ['reload'],
  props: {
    show: { type: Boolean, default: false },
    obj: {
      type: Object
    },
    projId: { type: Number },
  },
  watch: {
    show: {
      immediate: true,
      handler(show) {
        this.visible = this.show
        this.cityOptions = cityOptions
      }
    }
  },
  data() {
    return {
      visible: this.show,
      regForm: {
        projId: '',
        subReportNum: '-',
        projCompTime: '',
        standardFee: 0,
        dutyFee: 0,
        fieldSrvy: [],
        infoVerification: [],
        signedAppraiser: [],
        marketEnquiry: [],
        techExp: [],
        reportDrafter: [],
        projAsst: [],
        feeFollow: []
      }
    }
  },
  methods: {

  }
}
</script>

<style scoped>
</style>