<template>
  <div>
    <div class="container">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-lx-calendar"></i> 项目管理
          </el-breadcrumb-item>
          <el-breadcrumb-item>新增项目计划</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-dialog
        title="项目计划"
        :visible.sync="newInfo"
        width="40%"
        @close="closeNewInfo"
      >
        <el-input
          :rows="6"
          type="textarea"
          v-model="newInfoData"
          size="medium"
        ></el-input>
      </el-dialog>
      <div class="form-box">
        <div class="form-item-title">
          <h3>项目信息</h3>
        </div>
        <el-form
          ref="ruleForm"
          :model="form"
          label-width="125px"
          :rules="rules"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item
                :span="6"
                label="项目类型"
                prop="projType"
              >
                <el-select
                  v-model="form.projType"
                  @change="arrgTypeToEnable"
                >
                  <el-option
                    v-for="item in projTypeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="轮序/安排">
                <el-select
                  v-model="form.arrgType"
                  placeholder="请选择"
                  :disabled="arrgTypeEnable"
                >
                  <el-option
                    label="轮序"
                    value="1001"
                  ></el-option>
                  <el-option
                    label="安排"
                    value="1002"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="接洽类型">
                <el-select v-model="form.projContactType">
                  <el-option
                    v-for="item in contactTypeOption"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="接洽人"
                prop="projContact"
              >
                <el-input v-model="form.projContact"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="委托人"
                prop="clientName"
              >
                <el-input v-model="form.clientName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="贷款银行"
                prop="lendingBank"
              >
                <el-cascader
                  :show-all-levels="true"
                  v-model="form.lendingBank"
                  :options="bankOptions"
                  :props="{ expandTrigger: 'hover' }"
                >
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="委托人联系人">
                <el-input v-model="form.clientContact"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="委托人联系人电话">
                <el-input v-model="form.clientContactInfo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="项目名称"
                prop="projName"
              >
                <el-input v-model="form.projName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="引荐人">
                <el-input v-model="form.projReferer"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="引荐人电话">
                <el-input v-model="form.projRefererInfo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="评估范围"
                prop="projScope"
              >
                <el-input v-model="form.projScope"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="现勘联系人">
                <el-input v-model="form.fldSrvyContact"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="现勘联系人电话">
                <el-input v-model="form.fldSrvyContactInfo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="评估目的"
                prop="assemGoal"
              >
                <el-select
                  v-model="form.assemGoal"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in assemGoalList"
                    :key="item"
                    :value="item"
                    :label="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="计划完成天数">
                <el-input-number
                  v-model="form.compSchedule"
                  :min="1"
                  label="完成天数"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="基准日"
                prop="baseDate"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.baseDate"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="计划现勘日期"
                prop="fldSrvySchedule"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.fldSrvySchedule"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-divider></el-divider>
            <el-col :span="6">
              <el-form-item label="新/重评">
                <el-select
                  v-model="form.newOldType"
                  placeholder="请选择"
                >
                  <el-option
                    label="新项目"
                    value="1001"
                  ></el-option>
                  <el-option
                    label="重评项目"
                    value="1002"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="紧急程度">
                <el-select
                  v-model="form.projDegree"
                  placeholder="请选择"
                >
                  <el-option
                    label="正常"
                    value="1001"
                  ></el-option>
                  <el-option
                    label="紧急"
                    value="1002"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="风险预测">
                <el-select v-model="form.riskProfile">
                  <el-option
                    label="低"
                    value="1001"
                  ></el-option>
                  <el-option
                    label="中等"
                    value="1002"
                  ></el-option>
                  <el-option
                    label="较高"
                    value="1003"
                  ></el-option>
                  <el-option
                    label="高"
                    value="1004"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="评估报价收费">
                <el-input v-model="form.assemFeeQuote"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="其他补充说明">
                <el-input
                  type="textarea"
                  autosize
                  v-model="form.supInstruction"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="编制时间"
                prop="projDate"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.projDate"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col>
              <div class="form-item-title">
                <h3>项目组成员</h3>
              </div>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目负责人">
                <el-input v-model="form.projLeader"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item
                v-for="(item, index) in form.projReviewer"
                :label="'项目复核人' + (index + 1)"
                :key="index"
              >
                <!-- <el-button @click.prevent="removeDomain(index)">删除</el-button> -->
                <div class="flexBox">
                  <el-input
                    style="width:90%"
                    v-model="item.value"
                  ></el-input><i
                    class="el-icon-lx-roundclose"
                    style="margin: 6px 0 0 5px;font-size: 20px;color:#b5b5b5"
                    @click.prevent="removeDomain(index, 1)"
                  ></i>
                </div>
              </el-form-item>
              <el-form-item>
                <i
                  class="el-icon-lx-roundadd"
                  style="font-size: 26px;color:#b5b5b5"
                  @click="addDomain(1)"
                ></i>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                v-for="(item, index) in form.projProReviewer"
                :label="'专业复核人' + (index + 1)"
                :key="index"
              >
                <!-- <el-button @click.prevent="removeDomain(index)">删除</el-button> -->
                <div class="flexBox">
                  <el-input
                    style="width:90%"
                    v-model="item.value"
                  ></el-input><i
                    class="el-icon-lx-roundclose"
                    style="margin: 6px 0 0 5px;font-size: 20px;color:#b5b5b5"
                    @click.prevent="removeDomain(index, 2)"
                  ></i>
                </div>
              </el-form-item>
              <el-form-item>
                <i
                  class="el-icon-lx-roundadd"
                  style="font-size: 26px;color:#b5b5b5"
                  @click="addDomain(2)"
                ></i>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                v-for="(item, index) in form.projAsst"
                :label="'项目助理' + (index + 1)"
                :key="index"
              >
                <!-- <el-button @click.prevent="removeDomain(index)">删除</el-button> -->
                <div class="flexBox">
                  <el-input
                    style="width:90%"
                    v-model="item.value"
                  ></el-input><i
                    class="el-icon-lx-roundclose"
                    style="margin: 6px 0 0 5px;font-size: 20px;color:#b5b5b5"
                    @click.prevent="removeDomain(index, 3)"
                  ></i>
                </div>
              </el-form-item>
              <el-form-item>
                <i
                  class="el-icon-lx-roundadd"
                  style="font-size: 26px;color:#b5b5b5"
                  @click="addDomain(3)"
                ></i>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                v-for="(item, index) in form.fieldSrvy"
                :label="'现场勘查' + (index + 1)"
                :key="index"
              >
                <!-- <el-button @click.prevent="removeDomain(index)">删除</el-button> -->
                <div class="flexBox">
                  <el-input
                    style="width:90%"
                    v-model="item.value"
                  ></el-input><i
                    class="el-icon-lx-roundclose"
                    style="margin: 6px 0 0 5px;font-size: 20px;color:#b5b5b5"
                    @click.prevent="removeDomain(index, 4)"
                  ></i>
                </div>
              </el-form-item>
              <el-form-item>
                <i
                  class="el-icon-lx-roundadd"
                  style="font-size: 26px;color:#b5b5b5"
                  @click="addDomain(4)"
                ></i>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
            >表单提交</el-button>
            <el-button @click="goBack">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { createNewProject, editProject } from '@/api/index'
import { getDetailProjInfo } from '@/api/index'
import bankOptions from '../../../public/bank.json'
import projTypeOption from '../../../public/projTypeOption.json'
export default {
  name: 'planform',
  data() {
    return {
      isEdit: false,
      newInfo: false,
      newInfoData: '',
      arrgTypeEnable: true,
      transedData: {},
      form: {
        projType: '',
        projName: '',
        projContact: '',
        projContactType: '正常接洽',
        projDate: '',
        newOldType: '1001',
        arrgType: '',
        projDegree: '1001',
        baseDate: '',
        assemGoal: '',
        clientName: '',
        projReferer: '',
        supInstruction: '',
        projRefererInfo: '',
        fldSrvyContact: '',
        fldSrvyContactInfo: '',
        projScope: '',
        clientContact: '',
        fldSrvySchedule: '',
        clientContactInfo: '',
        assemFeeQuote: '',
        assemValueQuote: '',
        projLeader: '',
        projAsst: [{ value: '' }],
        projProReviewer: [{ value: '' }],
        riskProfile: '1002',
        fieldSrvy: [{ value: '' }],
        compSchedule: 3,
        projReviewer: [{ value: '' }],
        lendingBank: [],
        projTypeOption: []
      },
      rules: {
        projType: [
          { required: true, message: '请选择项目类型', trigger: 'blur' }
        ],
        projName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        projScope: [
          { required: true, message: '请输入评估范围', trigger: 'blur' }
        ],
        assemGoal: [
          { required: true, message: '请选择评估目的', trigger: 'blur' }
        ],
        projDate: [
          { required: true, message: '请选择编制日期', trigger: 'blur' }
        ],
        baseDate: [
          { required: true, message: '请选择基准日', trigger: 'blur' }
        ],
        fldSrvySchedule: [
          { required: true, message: '请选择现勘日期', trigger: 'blur' }
        ],
        projContact: [
          { required: true, message: '请填写接洽人', trigge: 'blur' }
        ],
        clientName: [
          { required: true, message: '请填写委托人', trigge: 'blur' }
        ],
      },
      assemGoalList: ['抵押', '交易', '资产处置（司法鉴定）', '出让', '挂牌出让', '补出让', '转让', '盘整收回', '征收补偿', '活立木拍卖', '出租', '置换', '股权转让', '作价入股', '增资扩股', '入账', '征收、完税', '企业改制', '清算', '复审', '评价', '咨询'],
      contactTypeOption: ['正常接洽', '摇珠', '中行通知书', '定点采购', '中介超市摇珠']
    };
  },
  created() {
    if (this.$route.query.data == undefined) {
      this.isEdit = false
      this.form.projDate = this.getToday()
      this.form.baseDate = this.getToday()
      this.form.fldSrvySchedule = this.getToday()
    } else {
      this.projId = this.$route.query.data
      this.isEdit = true
      this.getDetail()
    }
    this.bankOptions = bankOptions
    this.projTypeOption = projTypeOption
  },
  methods: {
    arrgTypeToEnable(val) {
      if (val == 1010 || val == 1030) {
        this.arrgTypeEnable = false
      } else {
        this.arrgTypeEnable = true
      }
    },
    closeNewInfo() {
      this.newInfo = false
      //this.goBack()
      location.reload()
    },
    formatDate(now) {
      const time = new Date(now)
      var year = time.getFullYear();  //取得4位数的年份
      var month = time.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
      var date = time.getDate();      //返回日期月份中的天数（1到31）
      var hour = time.getHours();     //返回日期中的小时数（0到23）
      return year + "-" + month + "-" + date
    },
    getToday() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    getDetail() {
      getDetailProjInfo({ projId: this.projId }).then(res => {
        console.log(res.data)
        this.dealEditData(res.data)
        // this.form = res.data
      })
    },
    dealEditData(data) {
      // 项目复核人
      if (data.projReviewer !== '') {
        if (data.projReviewer.indexOf(',') !== -1) {
          let midData = data.projReviewer.split(',')
          let endData = []
          for (let i = 0; i < midData.length; i++) {
            endData.push({ value: midData[i] })
          }
          data.projReviewer = endData
        } else {
          data.projReviewer = [{ value: data.projReviewer }]
        }
      } else {
        data.projReviewer = [{ value: '' }]
      }
      //  专业复核人
      if (data.projProReviewer !== '') {
        if (data.projProReviewer.indexOf(',') !== -1) {
          let midData = data.projProReviewer.split(',')
          let endData = []
          for (let i = 0; i < midData.length; i++) {
            endData.push({ value: midData[i] })
          }
          data.projProReviewer = endData
        } else {
          data.projProReviewer = [{ value: data.projProReviewer }]
        }
      } else {
        data.projProReviewer = [{ value: '' }]
      }
      // 项目助理
      if (data.projAsst !== '') {
        if (data.projAsst.indexOf(',') !== -1) {
          let midData = data.projAsst.split(',')
          let endData = []
          for (let i = 0; i < midData.length; i++) {
            endData.push({ value: midData[i] })
          }
          data.projAsst = endData
        } else {
          data.projAsst = [{ value: data.projAsst }]
        }
      } else {
        data.projAsst = [{ value: '' }]
      }
      // 现场勘察
      if (data.fieldSrvy !== '') {
        if (data.fieldSrvy.indexOf(',') !== -1) {
          let midData = data.fieldSrvy.split(',')
          let endData = []
          for (let i = 0; i < midData.length; i++) {
            endData.push({ value: midData[i] })
          }
          data.fieldSrvy = endData
        } else {
          data.fieldSrvy = [{ value: data.fieldSrvy }]
        }
      } else {
        data.fieldSrvy = [{ value: '' }]
      }
      // this.form.projDate = this.formatDate(this.form.projDate)
      data.projType = data.projType + ''
      data.projDate = this.formatDate(data.projDate)
      data.baseDate = this.formatDate(data.baseDate)
      data.fldSrvySchedule = this.formatDate(data.fldSrvySchedule)
      this.form = data
    },
    addDomain(type) {
      if (type == 1) {
        this.form.projReviewer.push({
          value: ''
        });
      } else if (type == 2) {
        this.form.projProReviewer.push({
          value: ''
        });
      } else if (type == 3) {
        this.form.projAsst.push({
          value: ''
        });
      } else if (type == 4) {
        this.form.fieldSrvy.push({
          value: ''
        });
      }
    },
    removeDomain(index, type) {
      if (type == 1) {
        if (this.form.projReviewer.length !== 1 && this.form.projReviewer.length !== 0) {
          this.form.projReviewer.splice(index, 1)
        }
      } else if (type == 2) {
        if (this.form.projProReviewer.length !== 1 && this.form.projProReviewer.length !== 0) {
          this.form.projProReviewer.splice(index, 1)
        }
      } else if (type == 3) {
        if (this.form.projAsst.length !== 1 && this.form.projAsst.length !== 0) {
          this.form.projAsst.splice(index, 1)
        }
      } else if (type == 4) {
        if (this.form.fieldSrvy.length !== 1 && this.form.fieldSrvy.length !== 0) {
          this.form.fieldSrvy.splice(index, 1)
        }
      }
    },
    onSubmit() {
      console.log(this.form)
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.transformPeop().then(res => {
            console.log('this.form', this.form)
            if (this.isEdit) {
              editProject(this.form).then(res => {
                console.log('add>>>res', res)
                this.$message.success('提交成功！');
                this.goBack()
              }).catch(err => {
                this.$message.warning('提交失败！');
                console.log('add>>>err', err)
              })
            } else {
              createNewProject(this.form).then(res => {
                console.log('add>>>res', res)
                this.$message.success('提交成功！');
                let riskProfile = ''
                if (this.form.riskProfile == 1001) {
                  riskProfile == '低'
                } else if (this.form.riskProfile == 1002) {
                  riskProfile == '中等'
                } else if (this.form.riskProfile == 1003) {
                  riskProfile == '较高'
                } else {
                  riskProfile == '高'
                }
                //处理value转为label展示
                for (var i = 0; i < this.projTypeOption.length; i++) {
                  if (this.form.projType == this.projTypeOption[i].value) {
                    this.transedData.projType = this.projTypeOption[i].label
                  }
                }
                // ZP项目类型：资；委托 人：(其他):惠州市水务投资集团；项目名称：惠州大道大湖溪段667平方米租金；评估对象及其坐落：同上;；评估目的：物业出租价格；引荐人及其电话：惠州市水务投资集团王总135 0229 7502；现联系单位、人及电话：同上；现勘时间：现勘同事约；报告时间要求：5天；项目风险预测：；评估收费报价：待定；是否曾评估的项目：（若是，原项目组成员：）；项目接洽人""[52]-缨(注师：莎缨;助理：健;专业复核人:远。以下由项目负责人安排 现勘：;资料核查验证：;市场询价调查：;技术报告:；报告编制:; 归档：;对外沟通:
                this.newInfoData = `项目编号:${res.data.projNum};项目类型:${this.transedData.projType};委托人:${this.form.clientName};项目名称:${this.form.projName};评估对象及其坐落:同上;评估目的:${this.form.assemGoal};引荐人及其电话:${this.form.projReferer}${this.form.projRefererInfo};现勘联系单位人及电话：同上;现勘时间:${this.form.fldSrvySchedule};报告时间要求:${this.form.compSchedule}天;项目风险预测:${riskProfile};评估收费报价:${this.form.assemFeeQuote};是否曾评估项目:${this.form.newOldType};项目接洽人:${this.form.projContact},项目助理:${this.form.projAsst},专业复核人:${this.form.projProReviewer}。以下由项目负责人安排,现勘:${this.form.fieldSrvy};资料核查验证: ;市场询价调查: ;技术报告: ;报告编制: ;归档: ;对外沟通: 。`
                this.newInfo = true
              }).catch(err => {
                console.log('add>>>err', err)
              })
            }
          })
        } else {
          this.$message('请填写必填信息');
        }
      })
    },
    transformPeop() {
      var that = this
      return new Promise(function (resolve, reject) {
        //  银行
        // if(!that.isEdit){
        //后端处理好号把这段加回去
        let lendingBankNew = ''
        console.log('that.form.lendingBank', that.form.lendingBank[1])
        if (that.form.lendingBank) {
          lendingBankNew = that.form.lendingBank[1]
          that.form.lendingBank = lendingBankNew
        }
        //}
        //  项目复核人
        let projReviewer = that.form.projReviewer
        let projReviewerNew = ''
        for (let i = 0; i < projReviewer.length; i++) {
          if (projReviewer[i].value) {
            projReviewerNew = projReviewerNew + projReviewer[i].value + ','
          }
        }
        console.log('projReviewerNew', projReviewerNew.substr(0, projReviewerNew.length - 1))
        that.form.projReviewer = projReviewerNew.substr(0, projReviewerNew.length - 1)
        //  专业复核人
        let projProReviewer = that.form.projProReviewer
        let projProReviewerNew = ''
        for (let i = 0; i < projProReviewer.length; i++) {
          if (projProReviewer[i].value) {
            projProReviewerNew = projProReviewerNew + projProReviewer[i].value + ','
          }
        }
        console.log('projProReviewerNew', projProReviewerNew.substr(0, projProReviewerNew.length - 1))
        that.form.projProReviewer = projProReviewerNew.substr(0, projProReviewerNew.length - 1)
        // 项目助理
        let projAsst = that.form.projAsst
        let projAsstNew = ''
        for (let i = 0; i < projAsst.length; i++) {
          if (projAsst[i].value) {
            projAsstNew = projAsstNew + projAsst[i].value + ','
          }
        }
        console.log('projAsstNew', projAsstNew.substr(0, projAsstNew.length - 1))
        that.form.projAsst = projAsstNew.substr(0, projAsstNew.length - 1)
        // 现场勘察
        let fieldSrvy = that.form.fieldSrvy
        let fieldSrvyNew = ''
        for (let i = 0; i < fieldSrvy.length; i++) {
          if (fieldSrvy[i].value) {
            fieldSrvyNew = fieldSrvyNew + fieldSrvy[i].value + ','
          }
        }
        console.log('fieldSrvyNew', fieldSrvyNew.substr(0, fieldSrvyNew.length - 1))
        that.form.fieldSrvy = fieldSrvyNew.substr(0, fieldSrvyNew.length - 1)
        resolve(1)
      })
    },
    goBack() {
      this.$router.go(-1)
    }
  }
};
</script>

<style scoped>
.form-item-title {
  width: 100px;
  text-align: center;
  margin: 10px 0 20px 0;
  border-left: solid 5px #409eff;
}
.flexBox {
  display: flex;
  justify-content: space-between;
}
.flexBox el-input {
  margin-right: 5px;
}
</style>