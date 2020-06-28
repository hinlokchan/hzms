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
        <el-form
          :model="form"
          :disabled="this.isReg"
        >
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
            <el-col :span="6">
              <el-form-item label="项目完成时间">
                <el-date-picker
                  style="width: 100%"
                  v-model="form.projCompTime"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
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
                  @blur="calculate(form.evalObjAcreage, form.landAssemUnitPrice, 1)"
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
                  @blur="calculate(form.evalObjArea, form.buildingAssemUnitPrice, 2)"
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
import { submitFaRegister, getFaRegister, editFaRegister } from '@/api/formalreg'
import { Form } from 'element-ui'
export default {
  name: 'FcRegDialog',
  props: {
    show: { type: Boolean, default: false },
    obj: {
      type: Object
    }
  },

  data() {
    return {
      visible: this.show,
      //
      isReg: false,
      form: {
        projId: '',
        registerType: '',
        registerId: '',
        //基本信息
        paReportNum: '',
        faReportNum: '',
        subReportNum: '',
        evalGoal: '',
        valueType: '',
        evalObjCount: '',
        evalObjCity: '',
        evalObjAdminRegion: '',
        evalObjCommunity: '',

        assemGoal: '',
        assemGoalExp: '',
        evalObjAcreage: 0,
        landAssemUnitPrice: 0,
        evalObjArea: 0,
        buildingAssemUnitPrice: 0,
        landTotalValue: 0,
        buildingTotalValue: 0,
        evalObjTotalAssemValue: 0,
        projTotalValue: 0,
        //房屋信息
        unitUsage: '',
        unitType: '',
        unitProperty: '',
        houseTypeStructure: '',
        houseType: '',
        towards: '',
        buildingNum: '',
        decoDegree: '',
        remainTerm: '',
      },
      assemGoalOption: ['房地产转让价格评估', '房地产分割、合并评估', '房地产纠纷估价', '房地产保险估价', '土地使用权出让价格评估', '房地产拍卖底价评估', '房地产抵押价值评估', '房地产课税估价', '房地产租赁价格评估', '企业各种经济活动中涉及的房地产估价', '其他目的的房地产估价'],
      priceTypeOption: ['成交价格', '正常价格', '市场价格', '评估价值', '市场价值', '投资价值', '现状价值', '快速变现价值', '残余价值', '抵押价值', '抵押净值', '法定优先受偿款', '计税价值', '保险价值', '完全产权价值', '无租约限制价值', '出租人权益价值', '承租人权益价值', '建筑物价值', '土地价值', '楼面地价'],
      housePurposeOption: ['住宅', '宗教', '园林绿化', '工业、交通、仓储', '别墅', '涉外', '医疗卫生', '文化、娱乐、体育', '公共运输', '新闻', '娱乐', '监狱', '集体宿舍', '成套住宅', '商业服务', '旅游', '军事', '体育', '物管用房', '铁路', '非成套住宅', '工业', '文化', '仓储', '电讯信息', '教育', '教育、医疗、卫生、可研', '民航', '高档公寓', '科研', '公共设施', '商业、金融、信息', '航运', '金融保险', '其他', '办公', '经营'],
      houseTypeOption: ['车库', '别墅、高档公寓', '仓储用房', '住宅', '其他', '办公用房', '商业用房', '工业用房', '房地价值'],
      houseAttributeOption: ['其他', '经济适用房', '配套商品房', '建筑物价值', '市场化商品房', '动迁房', '公共租赁住房', '廉租住房', '限价普通商品住房', '集资建房', '定销商品房', '福利房'],
      houstStructureOption: ['错层', '复式楼', '土地价值', '跃层', '平层', '其他'],
      houseModelOption: ['一居室', '二居室', '三居室', '四居室', '五居室', '其他'],
      houseDirectionOption: ['东北', '东南', '西北', '西南', '东', '南', '西', '北', '西南双面', '东南双面', '南北通透双面', '其他通透双面', '其他非通透双面', '其他'],
      houseDecorationOption: ['粗装修', '毛坯', '精装修']
    }
  },
  watch: {
    show: {
      immediate: true,
      handler(show) {
        this.visible = this.show
      }
    },
    obj: {
      immediate: true,
      handler(obj) {
        if (obj == null) {
          console.log('新建详情')
        } else {
          this.form = this.obj
        }
      }

    }
  },
  methods: {
    onClose() {
      this.$emit('update:show', false)
    },
    onSubmit() {
    },
    calculate(i, j, id) {
      if (i != '' && j != '') {
        switch (id) {
          case 1:
            this.form.landTotalValue = (i * j / 10000).toFixed(2)
            break
          case 2:
            this.form.buildingTotalValue = (i * j / 10000).toFixed(2)
            break
        }
        this.form.evalObjTotalAssemValue = (parseFloat(this.form.landTotalValue) + parseFloat(this.form.buildingTotalValue)).toFixed(2)
        this.form.projTotalValue = this.form.evalObjTotalAssemValue
      }
    }
  }
}
</script>