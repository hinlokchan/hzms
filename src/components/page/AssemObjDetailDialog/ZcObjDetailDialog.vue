<template>
  <el-dialog
    :visible.sync="visible"
    :show="show"
    title="评估（估价）对象详情"
    width="80%"
    center
    @close="onClose()"
  >
    <el-tabs>
      <el-tab-pane label="基本信息">
        <el-form :model="form">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="报备号">
                <el-input v-model="form.recordNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="摇珠单或委托书编号">
                <el-input v-model="form.entrustNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="摇珠或委托时间">
                <el-date-picker
                  v-model="form.entrustTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="数量">
                <el-input
                  v-model="form.count"
                  oninput="value=value.replace(/[^\d.]/g,'')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="行政区域">
                <el-cascader
                  v-model="form.adminRegion"
                  style="width: 100%"
                  filterable
                  :options="cityOptions"
                >
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="升值率(%)">
                <el-input
                  v-model="form.appriationRate"
                  oninput="value=value.replace(/[^\d.]/g,'')"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="left">评估前价值（元）</el-divider>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="评估前资产总值">
                <el-input
                  v-model="form.formerTotalAssets"
                  oninput="value=value.replace(/[^\d.]/g,'')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="评估前负债总值">
                <el-input
                  v-model="form.formerTotalDebet"
                  oninput="value=value.replace(/[^\d.]/g,'')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="评估前所有者权益">
                <el-input
                  v-model="form.formerOwnersEquity"
                  oninput="value=value.replace(/[^\d.]/g,'')"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="left">评估后价值（元）</el-divider>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="评估后资产总值">
                <el-input
                  v-model="form.latterTotalAssets"
                  oninput="value=value.replace(/[^\d.]/g,'')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="评估后负债总值">
                <el-input
                  v-model="form.latterTotalDebet"
                  oninput="value=value.replace(/[^\d.]/g,'')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="评估后所有者权益">
                <el-input
                  v-model="form.latterOwnersEquity"
                  oninput="value=value.replace(/[^\d.]/g,'')"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-button
        type="primary"
        @click="onSubmit"
      >保存</el-button>
      <el-button @click="onClose">取消</el-button>
    </el-tabs>
  </el-dialog>
</template>

<script>
import { getUserList } from '@/api/index'
import { submitEvalObjDetail, editEvalObjDetail } from '@/api/assemobjdetail'
import cityOptions from '../../../../public/citys.json'
import { Form } from 'element-ui'
export default {
  name: 'ZcObjDetailDialog',
  inject: ['reload'],
  props: {
    show: { type: Boolean, default: false },
    isEdit: { type: Boolean, default: false },
    obj: {
      type: Object
    },
    projId: { type: Number },
  },

  data() {
    return {
      visible: this.show,
      //
      edit: false,
      cityOptions: [],
      form: {
        projId: '',
        subReportNum: '-',
        //
        recordNum: '',
        entrustNum: '',
        entrustTime: '',
        count: '',
        adminRegion: '',

        formerTotalAssets: 0,
        formerTotalDebet: 0,
        formerOwnersEquity: 0,
        latterTotalAssets: 0,
        latterTotalDebet: 0,
        latterOwnersEquity: 0,
        appriationRate: 0
      },
    }
  },
  watch: {
    show: {
      immediate: true,
      handler(show) {
        this.visible = this.show
        this.cityOptions = cityOptions
      }
    },
    isEdit: {
      immediate: true,
      handler(isEdit) {
        console.log('propIsEdit', isEdit)
        if (isEdit == true) {
          this.form = this.obj
        }
      }
    },
    projId: {
      immediate: true,
      handler(projId) {
        this.form.projId = projId
        this.form.subReportNum = '-'
      }
    },
  },
  methods: {
    onClose() {
      this.$emit('update:show', false)
    },
    onSubmit() {
      console.log(this.form)
      console.log(this.isEdit)
      if (this.isEdit) {
        editEvalObjDetail(this.form)
          .then(res => {
            console.log('edit', res)
            this.$message.success('提交成功')
            this.reload()
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        submitEvalObjDetail(this.form)
          .then(res => {
            console.log('submit', res)
            this.$message.success('提交成功')
            this.reload()
          })
          .catch(err => {
            console.log(err)
          })
      }

    },
    // calculate(i, j, id) {
    //   if (i != '' && j != '') {
    //     switch (id) {
    //       case 1:
    //         this.form.landTotalValue = (i * j / 10000).toFixed(2)
    //         this.form.projTotalAcreage = this.form.landTotalValue
    //         break
    //       case 2:
    //         this.form.buildingTotalValue = (i * j / 10000).toFixed(2)
    //         this.form.projTotalArea = this.form.buildingTotalValue
    //         break
    //     }
    //     this.form.evalObjTotalAssemValue = (parseFloat(this.form.landTotalValue) + parseFloat(this.form.buildingTotalValue)).toFixed(2)
    //     this.form.projTotalValue = this.form.evalObjTotalAssemValue
    //   }
    // }
  }
}
</script>