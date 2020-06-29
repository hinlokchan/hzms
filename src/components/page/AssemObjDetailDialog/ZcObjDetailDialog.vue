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
              <el-form-item label="估价目的">
                <el-select
                  v-model="form.evalGoal"
                  style="width: 100%"
                  filterable
                >
                  <el-option
                    v-for="item in assemGoalOption"
                    :key="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="价值类型">
                <el-select
                  v-model="form.valueType"
                  style="width: 100%"
                  filterable
                >
                  <el-option
                    v-for="item in priceTypeOption"
                    :key="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="本报告的估价对象个数">
                <el-input
                  v-model="form.evalObjCount"
                  oninput="value=value.replace(/[^\d.]/g,'')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="估价对象所在城市">
                <el-input v-model="form.evalObjCity"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="估价对象所在行政区">
                <el-input v-model="form.evalObjAdminRegion"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="估价对象所在小区">
                <el-input v-model="form.evalObjCommunity"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="项目完成时间">
                <el-date-picker
                  style="width: 100%"
                  v-model="form.projCompTime"
                ></el-date-picker>
              </el-form-item>
            </el-col> -->
            <el-col :span="12">
              <el-form-item label="估价方法说明">
                <el-input v-model="form.assemMethodExp"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="估价对象土地面积（平方米）">
                <el-input
                  v-model="form.evalObjAcreage"
                  oninput="value=value.replace(/[^\d.]/g,'')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="土地评估单价（元/平方米）">
                <el-input
                  v-model="form.landAssemUnitPrice"
                  oninput="value=value.replace(/[^\d.]/g,'')"
                  @input="calculate(form.evalObjAcreage, form.landAssemUnitPrice, 1)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="估价对象建筑面积（平方米）">
                <el-input
                  v-model="form.evalObjArea"
                  oninput="value=value.replace(/[^\d.]/g,'')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="建筑评估单价（元/平方米）">
                <el-input
                  v-model="form.buildingAssemUnitPrice"
                  oninput="value=value.replace(/[^\d.]/g,'')"
                  @input="calculate(form.evalObjArea, form.buildingAssemUnitPrice, 2)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <h4>土地总价值：{{this.form.landTotalValue}}万元</h4>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <h4>建筑总价值：{{this.form.buildingTotalValue}}万元</h4>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <h3 style="color: red">估价对象评估总价：{{this.form.evalObjTotalAssemValue}}万元</h3>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <h3 style="color: red">项目总价值：{{this.form.projTotalValue}}万元</h3>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="房屋信息">
        <el-form :model="form">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="房屋用途">
                <el-select
                  style="width: 100%"
                  v-model="form.unitUsage"
                >
                  <el-option
                    v-for="item in housePurposeOption"
                    :key="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="房屋类型">
                <el-select
                  style="width: 100%"
                  v-model="form.unitType"
                >
                  <el-option
                    v-for="item in houseTypeOption"
                    :key="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="房屋性质">
                <el-select
                  style="width: 100%"
                  v-model="form.unitProperty"
                >
                  <el-option
                    v-for="item in houseAttributeOption"
                    :key="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="户型结构">
                <el-select
                  style="width: 100%"
                  v-model="form.houseTypeStructure"
                >
                  <el-option
                    v-for="item in houstStructureOption"
                    :key="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="户型">
                <el-select
                  style="width: 100%"
                  v-model="form.houseType"
                >
                  <el-option
                    v-for="item in houseModelOption"
                    :key="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="向">
                <el-select
                  style="width: 100%"
                  v-model="form.towards"
                >
                  <el-option
                    v-for="item in houseDirectionOption"
                    :key="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所在楼">
                <el-input v-model="form.buildingNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="装修程度">
                <el-select
                  style="width: 100%"
                  v-model="form.decoDegree"
                >
                  <el-option
                    v-for="item in houseDecorationOption"
                    :key="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="剩余年限">
                <el-input
                  v-model="form.remainTerm"
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