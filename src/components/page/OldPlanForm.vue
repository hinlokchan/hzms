<template>
  <div>
    <div class="container">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>录入旧项目计划</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="form-box">
        <el-form
          ref="ruleForm"
          :model="form"
          label-width="125px"
          :rules="rules"
        >
          <div class="form-item-title">
            <h3>编号信息</h3>
          </div>
          <el-row>
            <el-col :span="6">
              <el-form-item
                label="计划编号"
                prop="projNum"
              >
                <el-input
                  v-model="form.projNum"
                  placeholder="例:房202001001"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="正评号"
                prop="zph"
              >
                <el-input
                  ref="faReportNum"
                  v-model="form.zph"
                  @input="setUpper"
                  @blur="checkNum"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="报告号日期">
                <el-date-picker
                  v-model="takenDate"
                  type="month"
                  placeholder="选择月份"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col> -->
            <!-- <el-col :span="6">
              <el-form-item
                label="初评号"
                prop="cph"
              >
                <el-input
                  ref="faReportNum"
                  v-model="form.cph"
                  @input="setUpper"
                  @blur="checkNum"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col> -->
            <el-col
              :span="6"
              :offset="7"
            >
              <span style="color: red">Tips: 没有取过号的项目请勿填写报告号</span>
            </el-col>
          </el-row>
          <div class="form-item-title">
            <h3>项目信息</h3>
          </div>

          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item
                :span="6"
                label="项目类型"
                prop="projType"
              >
                <el-select v-model="form.projType">
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
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item
                label="委托人"
                v-if="this.clientInputTypeChange == false"
              >
                <el-cascader
                  :show-all-levels="false"
                  v-model="form.clientId"
                  :options="clientOptions"
                  :props="{ expandTrigger: 'hover' }"
                  style="width: 90%"
                  @change="selectToInput()"
                  filterable
                >
                </el-cascader>
                <el-button
                  type="text"
                  icon="el-icon-refresh-right"
                  style="width: 10%"
                  @click="resetClientName()"
                ></el-button>
              </el-form-item>
              <el-form-item
                label="委托人"
                v-if="this.clientInputTypeChange == true"
              >
                <el-input
                  v-model="form.clientName"
                  style="width: 90%"
                ></el-input>
                <el-button
                  type="text"
                  icon="el-icon-refresh-right"
                  style="width: 10%"
                  @click="resetClientName()"
                ></el-button>
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
            <el-col :span="6">
              <el-form-item label="产权持有人">
                <el-input v-model="form.incumbrancer"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
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
                <el-input
                  v-model="form.compSchedule"
                  :min="1"
                  label="完成天数"
                  oninput="value=value.replace(/[^\d.]/g,'')"
                ></el-input>
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
                label="编制日期"
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
            <el-col :span="6">
              <el-form-item
                v-for="(item, index) in form.projContact"
                :label="'接洽人' + (index + 1)"
                :key="index"
                prop="projContact"
              >
                <!-- <el-button @click.prevent="removeDomain(index)">删除</el-button> -->
                <div class="flexBox">
                  <el-input
                    style="width:90%"
                    v-model="item.value"
                  ></el-input><i
                    class="el-icon-lx-roundclose"
                    style="margin: 6px 0 0 5px;font-size: 20px;color:#b5b5b5"
                    @click.prevent="removeDomain(index, 5)"
                  ></i>
                </div>
              </el-form-item>
              <el-form-item>
                <i
                  class="el-icon-lx-roundadd"
                  style="font-size: 26px;color:#b5b5b5"
                  @click="addDomain(5)"
                ></i>
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
            <el-button @click="transformPeop()">取消</el-button>
            <!-- <el-button @click="test()">test</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { setOldProject } from '@/api/index'
import clientOptions from '../../../public/clientName.json'
import projTypeOption from '../../../public/projTypeOption.json'
export default {
  name: 'oldplanform',
  inject: ['reload'],            //注入App里的reload方法

  data() {
    return {
      clientInputTypeChange: false,
      takenDate: '',
      projTypeOption: [],
      form: {
        projNum: '',
        projDate: '',
        projState: '',
        projProgress: '',
        projType: '',
        projName: '',
        projDegree: '1001',
        arrgType: '',
        projScope: '',
        newOldType: '1001',
        baseDate: '',
        fldSrvySchedule: '',
        riskProfile: '1002',
        assemGoal: '',
        compSchedule: 3,
        supInstruction: '',
        fldSrvyContact: '',
        fldSrvyContactInfo: '',
        clientId: '',
        clientName: '',
        clientContact: '',
        clientContactInfo: '',
        projReferer: '',
        projRefererInfo: '',
        projContact: [{ value: '' }],
        projLeader: '',
        projReviewer: [{ value: '' }],
        projProReviewer: [{ value: '' }],
        projAsst: [{ value: '' }],
        fieldSrvy: [{ value: '' }],
        //
        infoVerification: '',
        marketEnquiry: '',
        techExpDrafter: '',
        reportDrafter: '',
        instructor: '',
        externalExpert: '',
        //
        assemFeeQuote: '',
        assemValueQuote: '',
        projContactType: '',
        //
        zph: '',
        //cph: '',
        reportNums: [
          {
            reportNum: '',
            reportNumType: '',
            takenDate: ''
          },
          // {
          //   reportNum: '',
          //   reportNumType: '',
          //   takenDate: ''
          // }
        ],

      },
      rules: {
        projNum: [
          { required: true, message: '请填写计划编号', trigger: 'blur' },
        ],
        zph: [
          { min: 11, max: 12, message: '请输入11-12位报告号', trigger: 'blur' }
        ],
        cph: [
          { min: 11, max: 12, message: '请输入11-12位报告号', trigger: 'blur' }
        ],
        projType: [
          { required: true, message: '请选择项目类型', trigger: 'change' }
        ],
        projName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        projScope: [
          { required: true, message: '请输入评估范围', trigger: 'blur' }
        ],
        assemGoal: [
          { required: true, message: '请选择评估目的', trigger: 'change' }
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
        // projContact: [
        //   { required: true, message: '请填写接洽人', trigge: 'blur' }
        // ],
        clientName: [
          { required: true, message: '请填写委托人', trigge: 'blur' }
        ],
      },
      assemGoalList: ['抵押', '交易', '资产处置（司法鉴定）', '出让', '挂牌出让', '补出让', '转让', '盘整收回', '征收补偿', '活立木拍卖', '出租', '置换', '股权转让', '作价入股', '增资扩股', '入账', '征收、完税', '企业改制', '清算', '复审', '评价', '咨询'],
      contactTypeOption: ['正常接洽', '摇珠', '中行通知书', '定点采购', '中介超市']
    }
  },
  created() {
    this.clientOptions = clientOptions
    this.projTypeOption = projTypeOption
  },
  mounted() {

  },
  methods: {
    //项目组成员添加、删除组件
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
      } else if (type == 5) {
        this.form.projContact.push({
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
      } else if (type == 5) {
        if (this.form.projContact.length !== 1 && this.form.projContact.length !== 0) {
          this.form.projContact.splice(index, 1)
        }
      }
    },
    selectToInput() {
      if (this.form.clientId == '141') {
        this.clientInputTypeChange = true
      } else {
        this.clientInputTypeChange = false
      }
    },
    resetClientName() {
      this.clientInputTypeChange = false
      this.form.clientId = ''
      this.form.clientName = ''
    },
    setUpper() {
      this.form.zph = this.form.zph.toUpperCase()
      // this.form.cph = this.form.cph.toUpperCase()
    },
    checkNum() {
      if (this.form.zph.length == 11) {
        let type = this.form.zph.substr(4, 2)
        const typeName = ['FG', 'ZP', 'TG', 'FZ', 'ZZ', 'TZ', 'WX', 'ZC', 'JX', 'QT']
        for (let i in typeName) {
          if (i == 9 && typeName[i] != type) {
            this.$message.warning('正评号字母输入有误，请确认后重试')
            this.$refs['faReportNum'].focus()
          } else if (typeName[i] == type) {
            let year = this.form.zph.substr(0, 4)
            let month = this.form.zph.substr(6, 2)
            if (month == 13 || month == 19 || month == 20) {
              month = '01'
            }
            this.form.reportNums[0].takenDate = year + '-' + month + '-01'
            console.log(this.form.reportNums[0].takenDate)
            return 0
          }
        }
      } else if (this.form.zph.length == 12) {
        let type = this.form.zph.substr(4, 3)
        const typeName = ['FSF', 'FSZ', 'FST', 'PPP']
        for (let i in typeName) {
          if (i == 3 && typeName[i] != type) {
            this.$message.warning('正评号字母输入有误，请确认后重试')
            this.$refs['faReportNum'].focus()
          } else if (typeName[i] == type) {
            let year = this.form.zph.substr(0, 4)
            //let month = this.form.zph.substr(0, 2)
            this.form.reportNums[0].takenDate = year + '-' + '01' + '-01'
            return 0
          }
        }
      }
    },
    test() {
      this.form.reportNums[1].reportNum = '2020FG03001'
      console.log(this.form.reportNums)
    },
    // check() {
    //   let clientIdMid = [...this.form.clientId].pop()
    //   this.form.clientId = clientIdMid
    //   console.log('clientIdMid', this.form.clientId)
    //   console.log('ppppp', this.form)
    //   console.log(this.form.clientId.length)
    //   //console.log('clientId', this.form)
    // },
    onSubmit() {
      //判断是否填写了正评号,赋值reportNumType
      if (this.form.zph) {
        const type = this.projTypeOption.filter((n) => n.value == this.form.projType)[0].type
        if (this.form.zph.indexOf(type) == -1) {
          this.$message.warning('正评号与项目类型不符')
          return 0
        }
        if (this.form.projType == 1010 || this.form.projType == 1020 || this.form.projType == 1030) {
          this.form.reportNums[0].reportNumType = parseInt(this.form.projType) + 2//房地资正评
        } else if (this.form.projType == 1041 || this.form.projType == 1042 || this.form.projType == 1043) {
          //*********
          //请不要怀疑这一段代码为什么这么绕口令，因为初期提需求的时候（也就是写下这段代码的本人）没有考虑好projType和ReportNumType的关系，详情参考接口文档
          //*********
          if (this.form.projType == 1041) {
            this.form.reportNums[0].reportNumType = 1013 //房咨询正评
          } else if (this.form.projType == 1042) {
            this.form.reportNums[0].reportNumType = 1023 //资咨询正评
          } else if (this.form.projType == 1043) {
            this.form.reportNums[0].reportNumType = 1033 //土咨询正评
          }
        } else {
          this.form.reportNums[0].reportNumType = this.form.projType
        }
        //
        this.form.reportNums[0].reportNum = this.form.zph
        //this.form.reportNums[0].takenDate = this.$moment(this.takenDate).format('YYYY-MM-DD')
      } else {
        //没输入正评号的时候传空数组
        this.form.reportNums = null
        console.log('没有填写正评号的情况')
      }
      console.log('form', this.form)
      if (this.form.clientName == '' && this.form.clientId == '') {
        this.$message.warning('请填写委托人')
      } else {
        if (this.form.clientId == 141) {
          this.form.clientId = ''
        } else {
          let clientIdMid = [...this.form.clientId].pop()
          this.form.clientId = clientIdMid
          if (this.form.clientId.length <= 1) {
            this.$message.warning('请重新选择委托人')
            this.clientId = ''
            this.clientName = ''
            return 0
          }
        }
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.transformPeop()
              .then(res => {
                console.log('subform', this.form)
                setOldProject(this.form)
                  .then(res => {
                    this.$message.success('录入成功')
                    this.reload()
                    console.log('res', res)
                  })
                  .catch(err => {
                    console.log('err', err)
                    if (err.statusCode == 5011) {
                      this.$message.error('该项目编号已存在')
                    } else {
                      this.$message.error('提交失败，请稍后重试')
                    }
                  })
              })
          } else {
            this.$message.warning('请填写必填信息')
          }
        })
      }



      // this.$refs.ruleForm.validate((valid) => {
      //   if (valid) {
      //     this.transformPeop()
      //       .then(res => {
      //         console.log('form', this.form)
      //         setOldProject(this.form)
      //           .then(res => {
      //             this.$message.success('录入成功')
      //             location.reload()
      //             console.log('res', res)
      //           })
      //           .catch(err => {
      //             console.log('err', err)
      //           })
      //       })
      //   } else {
      //     this.$message.warning('请填写必填信息')
      //   }
      // })
    },
    //转化项目组成员
    transformPeop() {
      var that = this
      return new Promise(function (resolve, reject) {
        //  接洽人
        let projContact = that.form.projContact
        let projContactNew = ''
        for (let i = 0; i < projContact.length; i++) {
          if (projContact[i].value) {
            projContactNew = projContactNew + projContact[i].value + ','
          }
        }
        console.log('projContact', projContactNew.substr(0, projContactNew.length - 1))
        that.form.projContact = projContactNew.substr(0, projContactNew.length - 1)
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
}
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