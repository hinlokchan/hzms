<template>
  <div class="container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>房地产项目正评登记</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="form-header">
      <h3>计划编号：{{form.projNum}}</h3>
      <h3>项目名称：{{form.projName}}</h3>
    </div>
    <div class="form-body">
      <el-tabs v-model="activeTab">

        <el-tab-pane
          label="项目信息"
          name="projInfo"
        >
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
        <el-tab-pane
          label="人员信息"
          name="memberInfo"
        >
          <el-form :model="form">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="接洽人">
                  <el-input
                    v-model="form.projContact"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="项目负责人">
                  <el-input
                    v-model="form.projLeader"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="专业复核人">
                  <el-input
                    v-model="form.projProReviewer"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="现勘">
                  <el-input
                    v-model="form.fieldSrvy"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="资料收集及验证">
                  <el-checkbox-group v-model="form.infoVerification">
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
                  <el-checkbox-group v-model="form.marketEnquiry">
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
                  <el-checkbox-group v-model="form.techExpDrafter">
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
                  <el-checkbox-group v-model="form.reportDrafter">
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
                  <el-checkbox-group v-model="form.feeFollowUp">
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
        <el-button @click="goback()">取消</el-button>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getDetailProjInfo, getWorkAssignment, } from '@/api/index'
import { submitFaRegister, getFaRegister, editFaRegister } from '@/api/formalReg'
import projTypeOption from '../../../../public/projTypeOption.json'
import citys from '../../../../public/citys.json'
export default {
  name: 'fcformalreg',
  data() {
    return {
      isReg: false,
      projId: '',
      registerType: '',
      projDetail: '',
      activeTab: 'projInfo',
      projTypeOption: [],
      projMember: [],
      midMember: [],
      //计划信息
      form: {
        projId: '',
        registerType: '',
        registerId: '',
        //计划信息
        projNum: '',
        projType: '',
        baseDate: '',
        contractNum: '',
        projName: '',
        projScope: '',
        incumbrancer: '',
        clientName: '',
        clientContact: '',
        clientContactInfo: '',
        //项目信息
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
        evalObjAcreage: '0',
        landAssemUnitPrice: '0',
        evalObjArea: '0',
        buildingAssemUnitPrice: '0',
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
        //人员信息
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
      //项目信息
      // form: {
      //   paReportNum: '',
      //   faReportNum: '',
      //   subReportNum: '',
      //   evalGoal: '',
      //   valueType: '',
      //   evalObjCount: '',
      //   evalObjCity: '',
      //   evalObjAdminRegion: '',
      //   evalObjCommunity: '',
      //   projCompTime: '',
      //   assemGoal: '',
      //   assemGoalExp: '',
      //   evalObjAcreage: '',
      //   landAssemUnitPrice: '',
      //   evalObjArea: '',
      //   buildingAssemUnitPrice: '',
      // },
      //房屋信息
      // form: {
      //   unitUsage: '',
      //   unitType: '',
      //   unitProperty: '',
      //   houseTypeStructure: '',
      //   houseType: '',
      //   towards: '',
      //   buildingNum: '',
      //   decoDegree: '',
      //   remainTerm: ''
      // },
      // //人员信息
      // form: {
      //   projContact: '',
      //   projLeader: '',
      //   projProReviewer: '',
      //   fieldSrvy: '',
      //   infoVerification: [],
      //   marketEnquiry: [],
      //   techExpDrafter: [],
      //   reportDrafter: [],
      //   feeFollowUp: []
      //},
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
    this.projId = this.$route.query.data
    //this.getDetail()
    //this.splitDetailData()
    this.projTypeOption = projTypeOption

  },
  mounted() {
  },
  methods: {
    getDetail() {
      getDetailProjInfo({ projId: this.projId })
        .then(res => {
          this.projDetail = res.data

          this.form.projId = res.data.projId
          this.form.projNum = res.data.projNum
          this.form.projType = res.data.projType + ''
          this.form.baseDate = this.$moment(res.data.baseDate).format('YYYY-MM-DD')
          this.form.projName = res.data.projName
          this.form.projScope = res.data.projScope
          this.form.clientName = res.data.clientName
          this.form.clientContact = res.data.clientContact
          this.form.clientContactInfo = res.data.clientContactInfo

          this.form.projContact = res.data.projContact
          this.form.projLeader = res.data.projLeader
          this.form.projProReviewer = res.data.projProReviewer

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
          //获取registerType
          switch (this.projDetail.projType) {
            case 1010:
              this.form.registerType = '101'
              break
            case 1020:
              this.form.registerType = '201'
              break
            case 1030:
              this.form.registerType = '301'
              break
            case 1061, 1062, 1063:
              this.form.registerType = '401'
              break
            case 1050:
              this.form.registerType = '501'
              break
            case 1070:
              this.form.registerType = '701'
              break
            case 1100:
              this.mainForm.registerType = '801'
              break
          }
          //判断是否已登记
          this.$nextTick(() => {
            this.checkRegister()
          })
        })
        .catch(err => {
          this.$message.warning('读取项目信息失败，请重试')
        })
    },
    checkRegister() {
      getFaRegister({ projId: this.projDetail.projId, registerType: this.form.registerType, subReportNum: this.projDetail.subReportNum })
        .then(res => {
          console.log(res)
          if (res.statusCode == 200) {
            if (res.data.registered == true) {
              this.$confirm('该项目已登记，是否要进行编辑？', '提示', {
                type: 'info'
              })
                .then(() => {
                  this.isReg = true
                  //进行编辑
                  this.form = res.data.registerData
                  this.form.infoVerification = this.form.infoVerification.split(',')
                  this.form.marketEnquiry = this.form.marketEnquiry.split(',')
                  this.form.techExpDrafter = this.form.techExpDrafter.split(',')
                  this.form.reportDrafter = this.form.reportDrafter.split(',')
                  this.form.feeFollowUp = this.form.feeFollowUp.split(',')
                  console.log('获取的登记信息', this.form)

                })
                .catch(() => {
                  this.$router.go(-1)
                })
            }
          } else {
            this.$message.warning('服务器忙，请稍后重试')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    onSubmit() {
      //有时间写更好的
      if (this.form.evalObjAcreage == '') {
        this.form.evalObjAcreage = '0'
      }
      if (this.form.evalObjArea == '') {
        this.form.evalObjArea = '0'
      }
      if (this.form.landAssemUnitPrice == '') {
        this.form.landAssemUnitPrice = '0'
      }
      if (this.form.buildingAssemUnitPrice == '') {
        this.form.buildingAssemUnitPrice = '0'
      }
      this.dealPeopleData()
      //this.mergeForm()
      console.log('form', this.form)

      if (this.isReg == false) {
        submitFaRegister(this.form)
          .then(res => {
            console.log('res', res)
          })
          .catch(err => {
            console.log('err', err)
          })
      } else if (this.isReg == true) {
        editFaRegister(this.form)
          .then(res => {
            this.$message.success('提交成功')
            this.$router.go(-1)
          })
          .catch(err => {
            this.$message.warning('提交失败，请稍后重试')
          })
      }
    },
    dealPeopleData() {
      this.form.infoVerification = this.form.infoVerification.join(',')
      this.form.marketEnquiry = this.form.marketEnquiry.join(',')
      this.form.techExpDrafter = this.form.techExpDrafter.join(',')
      this.form.reportDrafter = this.form.reportDrafter.join(',')
      this.form.feeFollowUp = this.form.feeFollowUp.join(',')

    },
    goback() {
      this.$router.go(-1)
    }

  }
}
</script>

<style>
</style>