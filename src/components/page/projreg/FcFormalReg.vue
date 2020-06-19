<template>
  <div class="container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>房地产项目正评登记</el-breadcrumb-item>
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
                <el-form-item label="价值时点">
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
                <el-form-item label="估价委托人（产权持有人）">
                  <el-input
                    :disabled="true"
                    v-model="form1.incumbrancer"
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
              <el-col :span="6">
                <el-form-item label="委托人联系人">
                  <el-input
                    :disabled="true"
                    v-model="form1.clientContact"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="委托人联系人电话">
                  <el-input
                    :disabled="true"
                    v-model="form1.clientContactInfo"
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
          <el-form :model="form2">
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
                <el-form-item label="估价目的">
                  <el-select
                    v-model="form2.evalGoal"
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
                    v-model="form2.valueType"
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
                    v-model="form2.evalObjCount"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="估价对象所在城市">
                  <el-input v-model="form2.evalObjCity"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="估价对象所在行政区">
                  <el-input v-model="form2.evalObjAdminRegion"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="估价对象所在小区">
                  <el-input v-model="form2.evalObjCommunity"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="项目完成时间">
                  <el-date-picker
                    style="width: 100%"
                    v-model="form2.projCompTime"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="估价方法">
                  <el-input
                    :disabled="true"
                    v-model="form2.assemMethod"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="估价方法说明">
                  <el-input v-model="form2.assemMethodExp"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="估价对象土地面积（平方米）">
                  <el-input
                    v-model="form2.evalObjAcreage"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="土地评估单价（元/平方米）">
                  <el-input
                    v-model="form2.landAssemUnitPrice"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="估价对象建筑面积（平方米）">
                  <el-input
                    v-model="form2.evalObjArea"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="建筑评估单价（元/平方米）">
                  <el-input
                    v-model="form2.buildingAssemUnitPrice"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="房屋信息"
          name="houseInfo"
        >
          <el-form :model="form3">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="房屋用途">
                  <el-select
                    style="width: 100%"
                    v-model="form3.unitUsage"
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
                    v-model="form3.unitType"
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
                    v-model="form3.unitProperty"
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
                    v-model="form3.houseTypeStructure"
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
                    v-model="form3.houseType"
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
                    v-model="form3.towards"
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
                  <el-input v-model="form3.buildingNum"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="装修程度">
                  <el-select
                    style="width: 100%"
                    v-model="form3.decoDegree"
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
                    v-model="form3.remainTerm"
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
                <el-form-item label="接洽人">
                  <el-input
                    v-model="form4.projContact"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
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
                <el-form-item label="现勘">
                  <el-input
                    v-model="form4.fieldSrvy"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="资料收集及验证">
                  <el-checkbox-group v-model="form4.infoVerification">
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
                <el-form-item label="市场询价调查">
                  <el-checkbox-group v-model="form4.marketEnquiry">
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
                <el-form-item label="技术说明">
                  <el-checkbox-group v-model="form4.techExpDrafter">
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
                <el-form-item label="报告拟稿">
                  <el-checkbox-group v-model="form4.reportDrafter">
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
                <el-form-item label="收费跟进">
                  <el-checkbox-group v-model="form4.feeFollowUp">
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
import { getDetailProjInfo, getWorkAssignment, } from '@/api/index'
import { submitFaRegister } from '@/api/formalReg'
import projTypeOption from '../../../../public/projTypeOption.json'
import citys from '../../../../public/citys.json'
export default {
  name: 'fcformalreg',
  data() {
    return {
      projId: '',
      registerType: '',
      projDetail: '',
      activeTab: 'projInfo',
      projTypeOption: [],
      projMember: [],
      midMember: [],
      //计划信息
      form1: {
        projNum: '',
        projType: '',
        baseDate: '',
        contractNum: '',
        projName: '',
        projScope: '',
        incumbrancer: '',
        clientName: '',
        clientContact: '',
        clientContactInfo: ''
      },
      //项目信息
      form2: {
        paReportNum: '',
        faReportNum: '',
        subReportNum: '',
        evalGoal: '',
        valueType: '',
        evalObjCount: '',
        evalObjCity: '',
        evalObjAdminRegion: '',
        evalObjCommunity: '',
        projCompTime: '',
        assemGoal: '',
        assemGoalExp: '',
        evalObjAcreage: '',
        landAssemUnitPrice: '',
        evalObjArea: '',
        buildingAssemUnitPrice: '',
      },
      //房屋信息
      form3: {
        unitUsage: '',
        unitType: '',
        unitProperty: '',
        houseTypeStructure: '',
        houseType: '',
        towards: '',
        buildingNum: '',
        decoDegree: '',
        remainTerm: ''
      },
      //人员信息
      form4: {
        projContact: '',
        projLeader: '',
        projProReviewer: '',
        fieldSrvy: '',
        infoVerification: [],
        marketEnquiry: [],
        techExpDrafter: [],
        reportDrafter: [],
        feeFollowUp: []
      },
      mainForm: {},
      //select option
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
  created() {
    this.getDetail()
    //this.splitDetailData()
    this.projTypeOption = projTypeOption

  },
  methods: {
    getDetail() {
      getDetailProjInfo({ projId: 1010202005001 })
        .then(res => {
          this.projDetail = res.data

          this.form1.projNum = res.data.projNum
          this.form1.projType = res.data.projType + ''
          this.form1.baseDate = this.$moment(res.data.baseDate).format('YYYY-MM-DD')
          this.form1.projName = res.data.projName
          this.form1.projScope = res.data.projScope
          this.form1.clientName = res.data.clientName
          this.form1.clientContact = res.data.clientContact
          this.form1.clientContactInfo = res.data.clientContactInfo

          this.form4.projContact = res.data.projContact
          this.form4.projLeader = res.data.projLeader
          this.form4.projProReviewer = res.data.projProReviewer

          //提取项目组成员
          const leader = this.projDetail.projLeader.split(',')
          const reviewer = this.projDetail.projReviewer.split(',')
          const projReviewer = this.projDetail.projProReviewer.split(',')
          const asst = this.projDetail.projAsst.split(',')
          const srvy = this.projDetail.fieldSrvy.split(',')
          this.midMember.push(...leader, ...reviewer, ...projReviewer, ...asst, ...srvy)
          const mid2 = Array.from(new Set(this.midMember))
          this.projMember = mid2.filter(item => item)
          console.log('projMember', this.projMember)
        })
        .catch(err => {
          this.$message.warning('读取项目信息失败，请重试')
        })
    },
    onSubmit() {
      this.dealPeopleData()
      this.mergeForm()

      console.log('marinform', this.mainForm)
      submitFaRegister(this.mainForm)
        .then(res => {
          console.log('res', res)
        })
        .catch(err => {
          console.log('err', err)
        })

    },
    mergeForm() {
      this.mainForm = Object.assign(this.projId, this.registerType, this.form1, this.form2, this.form3, this.form4)
    },
    dealPeopleData() {
      this.form4.infoVerification = this.form4.infoVerification.join(',')
      this.form4.marketEnquiry = this.form4.marketEnquiry.join(',')
      this.form4.techExpDrafter = this.form4.techExpDrafter.join(',')
      this.form4.reportDrafter = this.form4.reportDrafter.join(',')
      this.form4.feeFollowUp = this.form4.feeFollowUp.join(',')

    }
  }
}
</script>

<style>
</style>