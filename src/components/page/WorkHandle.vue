<template>
  <div class="container">
    <!-- <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-receiving"></i> 我的项目
        </el-breadcrumb-item>
        <el-breadcrumb-item>工作台</el-breadcrumb-item>
        <el-breadcrumb-item>项目工作管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <el-dialog
      title="取号"
      :visible.sync="getNumVisible"
      width="30%"
      prop="reportNumSelectVal"
    >
      <el-radio-group v-model="reportNumSelectVal">
        <el-radio :label="1">初评号</el-radio>
        <el-radio :label="2">正评号</el-radio>
        <el-radio :label="3">回函号</el-radio>
      </el-radio-group>
      <div style="margin-top: 25px">
        <el-button
          type="text"
          @click="getNumVisible = false"
        >取消</el-button>
        <el-button
          type="primary"
          @click="getNewNum(reportNumSelectVal)"
        >确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="取消报告号"
      :visible.sync="delNumVisible"
      width="30%"
      prop="deleteNumSelectVal"
    >
      <div v-if="this.reportNum.cph !== ''">
        <el-radio
          v-model="deleteNumSelectVal"
          :label="1"
        >初评号{{this.reportNum.cph}}</el-radio>
      </div>
      <div v-if="this.reportNum.zph !== ''">
        <el-radio
          v-model="deleteNumSelectVal"
          :label="2"
        >正评号{{this.reportNum.zph}}</el-radio>
      </div>
      <div v-if="this.reportNum.hhh !== ''">
        <el-radio
          v-model="deleteNumSelectVal"
          :label="3"
        >回函号{{this.reportNum.hhh}}</el-radio>
      </div>
      <div style="margin-top: 25px">
        <el-button
          type="text"
          @click="delNumVisible = false"
        >取消</el-button>
        <el-button
          type="primary"
          @click="delNum(deleteNumSelectVal)"
        >确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="创建子项目信息"
      :visible.sync="subProjVisible"
      width="40%"
    >
      <h3>父项目报告号:{{subFatherReport}}</h3>
      <el-form
        ref="subFormRules"
        :model="subProjForm"
        label-width="auto"
        :rules="subFormRules"
      >
        <el-form-item
          label="子项目报告号"
          prop="subReportNum"
        >
          <el-input
            placeholder="例:001"
            style="width: 80px"
            v-model="subProjForm.subReportNum"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="子项目项目名称"
          prop="subProjName"
        >
          <el-input
            style="width: 200px"
            v-model="subProjForm.subProjName"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="子项目项目范围"
          prop="subProjScope"
        >
          <el-input
            style="width: 200px"
            v-model="subProjForm.subProjScope"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button
          type="text"
          @click="subProjVisible = false"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="addSubProj(subFatherReport)"
        >确认提交</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="更改项目类型"
      :visible.sync="changeTypeVisible"
    >
      <el-form>
        <el-form-item
          label="选择需要更改的类型"
          label-width="200"
        >
          <el-select
            v-model="changeType.toType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="color: red">Tips:更改后原报告号及计划编号将改变</div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="changeTypeVisible = false">取 消</el-button>
        <el-button
          @click="changeProjType()"
          type="primary"
        >确认更改</el-button>
      </div>
    </el-dialog>
    <el-dialog
      width="30%"
      @close="closeQRCode"
      :visible.sync="qrcodeVisible"
      append-to-body
    >
      <div>
        <span style="color: red">Tips: 右键二维码-图片另存为即可保存</span>
      </div>
      <div
        id="qrcode"
        ref="qrcode"
        style="margin-left:27%"
      ></div>
    </el-dialog>
    <el-dialog
      title="取往月报告号"
      :visible.sync="getOldNumVisible"
      prop="takenDate"
      width="30%"
    >
      <el-date-picker
        v-model="takenDate"
        type="month"
        placeholder="选择月份"
      ></el-date-picker>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="getOldNumVisible = false">取 消</el-button>
        <el-button
          @click="getOldNum(takenDate)"
          type="primary"
        >确认更改</el-button>
      </div>
    </el-dialog>
    <!--////////////////////////////////-->
    <!--            主体                 -->
    <!--////////////////////////////////-->
    <div class="work">
      <div class="work-title">
        <span class="work-title-name">项目信息</span>
        <span class="work-title-button">
          <el-button
            icon="el-icon-info"
            size="medium"
            @click="handleDetail()"
          >查看详情</el-button>
          <el-button
            icon="el-icon-edit"
            size="medium"
            @click="handleEdit()"
          >编辑</el-button>
          <el-button
            icon="el-icon-set-up"
            size="medium"
            v-if="this.queryData.projType == 1010 || this.queryData.projType == 1020 || this.queryData.projType == 1030 || this.queryData.projType == 1041 || this.queryData.projType == 1042 || this.queryData.projType == 1043"
            @click="handleChangeType()"
          >更改项目类型</el-button>
          <el-button
            icon="el-icon-lx-qrcode"
            size="medium"
            @click="handleQRCode()"
          >生成二维码</el-button>
          <el-button
            icon="el-icon-printer"
            size="medium"
            @click="handlePrintProj(queryData.projId)"
          >打印计划信息表</el-button>
        </span>
      </div>
      <el-divider></el-divider>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <div
              slot="header"
              class="card-header"
            >
              基本信息 - {{queryData.projNum}}
            </div>
            <div class="text">
              <div class="item"><span>项目类型：</span>{{this.transedProjType.projType}}</div>
              <div class="item"><span>评估目的：</span>{{this.projDetail.assemGoal}}</div>
              <div class="item"><span>项目名称：</span>{{this.projDetail.projName}}</div>
              <div class="item"><span>项目范围：</span>{{this.projDetail.projScope}}</div>
              <div class="item"><span>基准日：</span>{{formatDate(this.projDetail.baseDate)}}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div
              slot="header"
              class="card-header"
            >项目组成员信息</div>
            <div class="text item">
              <div class="item"><span>项目负责人：</span>{{this.projDetail.projLeader}}</div>
              <div class="item"><span>项目复核人：</span>{{this.projDetail.projReviewer}}</div>
              <div class="item"><span>专业复核人：</span>{{this.projDetail.projProReviewer}}</div>
              <div class="item"><span>项目助理：</span>{{this.projDetail.projAsst}}</div>
              <div class="item"><span>现场勘查：</span>{{this.projDetail.fieldSrvy}}</div>
            </div>
          </el-card>
        </el-col>
        <el-col
          :span="24"
          style="margin-top: 10px;"
        >
          <el-card>
            <div
              slot="header"
              class="card-header"
            >
              <span>报告号信息</span>
              <span style="float: right">
                <el-button
                  slot="reference"
                  type="primary"
                  icon="el-icon-circle-plus-outline"
                  @click="handleGetNum"
                >取号</el-button>
                <el-button
                  type="primary"
                  icon="el-icon-circle-close"
                  @click="handleGetOldNum"
                >取往月报告号</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-circle-close"
                  @click="handleDelNum"
                >取消报告号</el-button>
              </span>
            </div>
            <div>
              <div class="report-num">
                <el-row>
                  <el-col
                    :span="2"
                    class="report-title"
                  >初评号</el-col>
                  <el-col
                    :span="6"
                    class="report-content"
                  >
                    <span v-if="this.reportNum.cph == ''">未取号</span>
                    <span v-else>{{this.reportNum.cph}}</span>
                  </el-col>
                  <el-col
                    :span="2"
                    class="report-title"
                  >正评号</el-col>
                  <el-col
                    :span="6"
                    class="report-content"
                  >
                    <span v-if="this.reportNum.zph == ''">未取号</span>
                    <span v-else>{{this.reportNum.zph}}</span>
                  </el-col>
                  <el-col
                    :span="2"
                    class="report-title"
                  >回函号</el-col>
                  <el-col
                    :span="6"
                    class="report-content"
                  >
                    <span v-if="this.reportNum.hhh == ''">未取号</span>
                    <span v-else>{{this.reportNum.hhh}}</span>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="work-title">
      <span class="work-title-name">子项目信息</span>
      <span class="work-title-button">
        <el-button
          icon="el-icon-circle-plus-outline"
          size="medium"
          @click="handleAddSubProj(reportNum.cph)"
        >新增子项目(初评)</el-button>
        <el-button
          icon="el-icon-circle-plus-outline"
          size="medium"
          @click="handleAddSubProj(reportNum.zph)"
        >新增子项目(正评)</el-button>
      </span>
    </div>
    <el-divider></el-divider>
    <el-table
      :data="subTableData"
      border
    >
      <el-table-column
        label="父报告号"
        width="120"
        prop="reportNum"
      ></el-table-column>
      <el-table-column
        label="子项目报告号"
        width="120"
        prop="subReportNum"
      ></el-table-column>
      <el-table-column
        label="子项目名称"
        prop="subProjName"
      ></el-table-column>
      <el-table-column
        label="子项目范围"
        prop="subProjScope"
      ></el-table-column>
      <!-- <el-table-column
        label="基准日"
        width="120"
      ></el-table-column> -->
      <el-table-column
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <!-- <el-button type="text">查看</el-button> -->
          <el-button
            type="text"
            @click="delSubProj(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="work-title">
      <span class="work-title-name">项目工作信息</span>
      <span class="work-title-button">
        <el-button
          icon="el-icon-s-order"
          size="medium"
          type="primary"
          @click="handleWorkArrg"
        >安排</el-button>
      </span>
    </div>
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div v-if="workArrgEdit == false">
            <h3>未安排工作信息，请先安排</h3>
          </div>
          <div v-else>
            <div class="text">
              <div class="item"><span>评估方法：</span>{{arrgData.assemMethod}}</div>
              <div class="item"><span>现场调查内容：</span>{{arrgData.fldSrvyContent}}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <div slot="header">综合进度安排</div>
          <div v-if="this.workArrgEdit == true">
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
                  v-for="item in workName"
                  :key="item"
                >
                  {{item}}
                </div>
              </el-col>
              <el-col :span="10">
                <div
                  class="workname-left"
                  v-for="(item, i) in workDate"
                  :key="i"
                >{{item}}</div>
              </el-col>
              <el-col :span="8">
                <div
                  class="workname-left"
                  v-for="(item, i) in workPeople"
                  :key="i"
                >{{item}}</div>
              </el-col>
            </el-row>
          </div>
          <div v-else>
            <h3>未安排工作信息，请先安排</h3>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import { editProject, getDetailProjInfo, getWorkAssignment, setWorkAssignment, createReportNum, deleteReportNum, alterProjType, getProjInfoTable, getOldReportNum } from '@/api/index'
import { addSubProject, getSubProjectInfoList, delSubProject } from '@/api/subReport'
import projTypeOption from '../../../public/projTypeOption.json'
import { host } from '@/config'
var ProManageAPIServer = `${host.baseUrl}/${host.ProManageAPIServer}`

export default {
  name: 'workhandle',
  data() {
    return {
      queryData: '',
      arrgData: {},
      projDetail: '',
      projMember: [],
      reportNum: {},
      projTypeOption: [],
      transedProjType: {},
      tableData: [],
      takenDate: '',
      activeTab: 'reportNum',
      addAssemCheck: false,
      workArrgEdit: false,
      assemValueEdit: false,
      workName: ['前期准备', '现场勘查及收集资料', '市场调查询价记录', '评定估算', '编制出具评估（估价）报告', '内部三级审核', '与委托人沟通', '评估收费', '修正定稿及提交报告', '工作底稿归档'],
      workDate: [],
      workPeople: [],
      getNumVisible: false,
      delNumVisible: false,
      changeTypeVisible: false,
      qrcodeVisible: false,
      getOldNumVisible: false,
      reportNumSelectVal: 2,
      deleteNumSelectVal: 2,
      getNumType: '',
      needDelNum: '',
      subProjVisible: false,
      subFatherReport: '',
      subTableData: [],
      changeType: {
        projId: '',
        toType: ''
      },
      typeOptions: [
        { value: '1010', label: '房地产' },
        { value: '1020', label: '资产' },
        { value: '1030', label: '土地' },
        { value: '1041', label: '房地产咨询' },
        { value: '1042', label: '资产咨询' },
        { value: '1043', label: '土地咨询' }
      ],
      //
      subProjForm: {
        reportNum: '',
        subReportNum: '',
        subProjName: '',
        subProjScope: ''
      },
      subFormRules: {
        subReportNum: [
          { required: true, message: '请输入子项目报告号', trigger: 'blur' },
          { min: 3, max: 3, message: '请输入长度为3位数字', trigger: 'blur' },
        ],
        subProjName: [
          { required: true, message: '请输入子项目名称', trigger: 'blur' }
        ],
        subProjScope: [
          { required: true, message: '请输入子项目范围', trigger: 'blur' }
        ]
      },
      midMember: [],
      workArrgForm: {
        projId: '',
        assemMethod: '成本法',
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
        // //日期
        prePreparationSche: '',
        fldSrvySche: '',
        mktSrvySche: '',
        assemEstcSche: '',
        issueValSche: '',
        internalAuditSche: '',
        commuClientSche: '',
        assemChargeSche: '',
        amendFinalSche: '',
        manuArchiveSche: ''
      },
      arrgFormRules: {
        assemMethod: [
          { required: true, message: '请选择评估方法', trigger: 'blur' }
        ]
      },
      reportNumList: ''
    }
  },
  created() {
    //处理从工作台获取的val -> queryData
    this.queryData = JSON.parse(this.$route.query.data)
    this.workArrgForm.projId = this.queryData.projId
    console.log('queryData', this.queryData)
    this.projTypeOption = projTypeOption
    //处理项目类型value转为label展示
    for (var i = 0; i < this.projTypeOption.length; i++) {
      if (this.queryData.projType == this.projTypeOption[i].value) {
        this.transedProjType.projType = this.projTypeOption[i].label
      }
    }
    //调项目详情接口
    this.getDetail()
    //调工作安排接口
    this.getWorkAssignmentData()
    //子项目信息接口

  },
  mounted() {

  },
  methods: {
    getDetail() {
      getDetailProjInfo({ projId: this.queryData.projId })
        .then(res => {
          if (res.statusCode == 200) {
            this.projDetail = res.data
            console.log('projDetail', this.projDetail)
            this.reportNum = res.data.reportNumList
            console.log('reportNum', this.reportNum)
            const leader = this.projDetail.projLeader.split(',')
            const reviewer = this.projDetail.projReviewer.split(',')
            const projReviewer = this.projDetail.projProReviewer.split(',')
            const asst = this.projDetail.projAsst.split(',')
            const srvy = this.projDetail.fieldSrvy.split(',')
            this.midMember.push(...leader, ...reviewer, ...projReviewer, ...asst, ...srvy)
            const mid2 = Array.from(new Set(this.midMember))
            this.projMember = mid2.filter(item => item)
            // this.projMember.forEach(item => {
            //   let key = item
            //   this.$set(this.workArrgForm, key, [])
            // })
            console.log('projMember', this.projMember)
          }
          this.$nextTick(() => {
            // let numVal = JSON.stringify(this.reportNum)
            // console.log('numval', numVal)
            if (this.reportNum.cph != '' && this.reportNum.zph != '') {
              this.reportNumList = this.reportNum.cph + ',' + this.reportNum.zph
            } else if (this.reportNum.cph == '' && this.reportNum.zph == '') {
              this.reportNumList = ''
            } else if (this.reportNum.cph == '' && this.reportNum.zph != '') {
              this.reportNumList = this.reportNum.zph
            } else if (this.reportNum.zph == '' && this.reportNum.cph != '') {
              this.reportNumList = this.reportNum.cph
            }
            getSubProjectInfoList({ reportNumList: this.reportNumList })
              .then(res => {
                this.subTableData = res.data.cph
                this.subTableData = this.subTableData.concat(res.data.zph)
                console.log('subTableData', res)
              })
              .catch(err => {
                console.log('failed to getSubProjectInfoList', err)
              })
          })
        })
        .catch(err => {
          this.$message.error('获取项目详细信息失败')
        })

    },
    getWorkAssignmentData() {
      getWorkAssignment({ projId: this.queryData.projId })
        .then(res => {
          if (res.statusCode == 200) {
            if (res.data == null) {
              this.workArrgEdit = false
              console.log('workArrgEdit', this.workArrgEdit)
            } else {
              this.workArrgEdit = true
              this.arrgData = res.data
              //后期看看让后端分割出date和people
              this.workPeople.push(res.data.prePreparationPic, res.data.fldSrvyPic, res.data.mktSrvyPic, res.data.assemEstPic, res.data.issueValPic, res.data.internalAuditPic, res.data.commuClientPic, res.data.assemChargePic, res.data.amendFinalPic, res.data.manuArchivePic)
              this.workDate.push(res.data.prePreparationSche, res.data.fldSrvySche, res.data.mktSrvySche, res.data.assemEstSche, res.data.issueValSche, res.data.internalAuditSche, res.data.commuClientSche, res.data.assemChargeSche, res.data.amendFinalSche, res.data.manuArchiveSche)
              // for (var i = 0; i < this.workPeople.length; i++) {
              //   if (this.workPeople[i] !== '') {
              //     this.workArrgEdit = true
              //     break
              //   } else {
              //     this.workArrgEdit = false
              //   }
              // }
              console.log('arrgData', this.arrgData)
              console.log('workArrgEdit', this.workArrgEdit)
            }
          }
        })
        .catch(err => {

        })
    },
    handleWorkArrg() {
      this.$router.push({ path: '/workarrange', query: { data: this.queryData, projMember: this.projMember, isEdit: this.workArrgEdit } })
    },
    // submitWorkArrg() {
    //   console.log(this.workArrgForm)
    //   //将人员的数组转为字符串
    //   this.workArrgForm.prePreparationPic = this.workArrgForm.prePreparationPic.join(',')
    //   this.workArrgForm.fldSrvyPic = this.fldSrvyPic.join(',')
    //   this.workArrgForm.mktSrvyPic = this.workArrgForm.mktSrvyPic.join(',')
    //   this.workArrgForm.assemChargePic = this.workArrgForm.assemChargePic.join(',')
    //   this.workArrgForm.issueValSche = this.workArrgForm.pissueValSche.join(',')
    //   this.workArrgForm.internalAuditPic = this.workArrgForm.internalAuditPic.join(',')
    //   this.workArrgForm.commuClientPic = this.workArrgForm.commuClientPic.join(',')
    //   this.workArrgForm.assemChargePic = this.workArrgForm.assemChargePic.join(',')
    //   this.workArrgForm.amendFinalPic = this.workArrgForm.amendFinalPic.join(',')
    //   this.workArrgForm.manuArchivePic = this.workArrgForm.manuArchivePic.join(',')
    //   setWorkAssignment(this.workArrgForm)
    //     .then(res => {
    //       console.log('success')
    //     })
    // },
    handleDetail() {
      this.$router.push({ path: '/projcheck', query: { data: this.queryData.projId } })
    },
    handleEdit() {
      this.$router.push({ path: '/planform', query: { data: this.queryData.projId } })
    },
    handleChangeType() {
      this.changeTypeVisible = true
      this.changeType.projId = this.queryData.projId
      let selOption = this.typeOptions
      const index = selOption.findIndex((item, index, arr) => {
        console.log('value>>>', item)
        return item.value == this.queryData.projType
      })
      //selOption.splice(index, 1)
      this.typeOptions = selOption
    },
    changeProjType() {
      if (this.changeType.toType == '') {
        this.$message.info('请选择修改类型');
      } else {
        alterProjType(this.changeType)
          .then(res => {
            console.log(res)
            this.$message.success('修改成功');
            this.changeTypeVisible = false
            this.$router.go(-1)
          })
          .catch(err => {
            console.log(err)
            this.$message.error('修改失败');
          })
      }
    },
    handleQRCode() {


      this.qrcodeVisible = true
      this.$nextTick(() => {
        this.creatQRCode()
      })
    },
    creatQRCode() {
      this.qr = new QRCode('qrcode', {
        width: '150',
        height: '150',
        //text: this.form.zph + this.form.xmmc + this.form.pgz + this.form.jzr,
        text: '项目报告号：' + this.reportNum.zph + ' ' + '项目名称：' + this.projDetail.projName + ' ' + '项目评估值：' + this.projDetail.assemValue + ' ' + '基准日：' + this.formatDate(this.projDetail.projDate)
      })
    },
    closeQRCode() {
      this.$refs.qrcode.innerHTML = ''
    },
    handlePrintProj(val) {
      //伪加载中，防止重复提交请求
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 5000)
      var that = this
      var oReq = new XMLHttpRequest()
      // url参数为拿后台数据的接口
      let pathUrl = ProManageAPIServer + getProjInfoTable
      oReq.open('POST', pathUrl, true)
      oReq.responseType = 'blob'
      oReq.onload = function (oEvent) {
        //生产环境需要加上前缀/hzms/hzht
        window.open('/hzms/hzht/static/pdf/web/viewer.html?file=' + encodeURIComponent(URL.createObjectURL(new Blob([oReq.response]))))
      }
      const fdata = new FormData()
      fdata.append('projId', parseInt(that.queryData.projId))
      oReq.send(fdata)
    },
    //取号流程
    handleGetNum() {
      this.getNumVisible = true
    },
    getNewNum(val) {
      if (val == 1) { //初评号
        //房地资才有初评号
        if (this.queryData.projType == 1010 || this.queryData.projType == 1020 || this.queryData.projType == 1030) {
          this.getNumType = this.queryData.projType + 1
        } else {
          this.$message.warning('非房地资项目请选择正评号')
        }
      } else if (val == 2) { //正评号
        if (this.queryData.projType == 1010 || this.queryData.projType == 1020 || this.queryData.projType == 1030) {
          this.getNumType = this.queryData.projType + 2 //房地资正评
        } else if (this.queryData.projType == 1041 || this.queryData.projType == 1042 || this.queryData.projType == 1043) {
          //*********
          //请不要怀疑这一段代码为什么这么绕口令，因为初期提需求的时候（也就是写下这段代码的本人）没有考虑好projType和ReportNumType的关系，详情参考接口文档
          //*********
          if (this.queryData.projType == 1041) {
            this.getNumType = 1013 //房咨询正评
          } else if (this.queryData.projType == 1042) {
            this.getNumType = 1023 //资咨询正评
          } else if (this.queryData.projType == 1043) {
            this.getNumType = 1033 //土咨询正评
          }
        } else {
          this.getNumType = this.queryData.projType
        }
      } else if (val == 3) { //回函号
        this.getNumType = 1100
      }
      //结束判断类型，调取号接口
      createReportNum({ projId: this.queryData.projId, reportNumType: this.getNumType })
        .then(res => {
          this.$message.success('取号成功')
          setTimeout("location.reload()", "1000")
        })
        .catch(err => {
          if (err.statusCode == 5001) {
            this.$message.warning('报告号已存在，请勿重复提交')
          } else {
            this.$message.warning('获取报告号失败，请稍后重试')
          }
        })
      //end of getNewNum()
    },
    handleGetOldNum() {
      this.getOldNumVisible = true
    },
    getOldNum(val) {
      if (val == '') {
        this.$message.warning('请选择时间')
        return 0
      } else if (this.reportNum.zph !== '') {
        this.$message.warning('已存在正评号')
        return 0
      } else {
        //takenData格式化
        this.takenDate = this.$moment(val).format('YYYY-MM-DD')
        //reportNumType
        if (this.queryData.projType == 1010 || this.queryData.projType == 1020 || this.queryData.projType == 1030) {
          this.getNumType = this.queryData.projType + 2 //房地资正评
        } else if (this.queryData.projType == 1041 || this.queryData.projType == 1042 || this.queryData.projType == 1043) {
          //*********
          //请不要怀疑这一段代码为什么这么绕口令，因为初期提需求的时候（也就是写下这段代码的本人）没有考虑好projType和ReportNumType的关系，详情参考接口文档
          //*********
          if (this.queryData.projType == 1041) {
            this.getNumType = 1013 //房咨询正评
          } else if (this.queryData.projType == 1042) {
            this.getNumType = 1023 //资咨询正评
          } else if (this.queryData.projType == 1043) {
            this.getNumType = 1033 //土咨询正评
          }
        } else {
          this.getNumType = this.queryData.projType
        }
        getOldReportNum({ projId: this.queryData.projId, reportNumType: this.getNumType, takenDate: this.takenDate })
          .then(res => {
            console.log('oldReportNum', res.data)
            this.$message.success('获取成功')
            setTimeout("location.reload()", "400")
          })
          .catch(err => {
            console.log('oldReportNum.err', err)
            this.$message.warning('获取失败，请稍后再试')
          })
      }

    },
    handleDelNum() {
      this.delNumVisible = true
    },
    delNum(val) {
      this.$confirm('删除后将不可恢复，确定要删除吗？', {
        type: 'warning'
      })
        .then(() => {
          if (val == 1) {
            this.needDelNum = this.reportNum.cph
          } else if (val == 2) {
            this.needDelNum = this.reportNum.zph
          } else if (val == 3) {
            this.needDelNum = this.reportNum.hhh
          }
          deleteReportNum({ reportNum: this.needDelNum })
            .then(res => {
              this.$message.success('删除成功')
              setTimeout("location.reload()", "1200")
            })
            .catch(err => {
              this.$message.warning('删除失败，请稍后再试')
            })
        })
        .catch(() => { })
    },//end of delNum

    //子项目
    handleAddSubProj(val) {
      if (val !== '') {
        console.log(val)
        this.subProjVisible = true
        this.subFatherReport = val
      } else {
        this.$message('请先获取的对应初(正)评号')
      }
    },
    addSubProj(val) {
      this.$refs.subFormRules.validate((valid) => {
        if (valid) {
          console.log(this.subProjForm)
          this.subProjForm.reportNum = val
          addSubProject(this.subProjForm)
            .then(res => {
              this.$message.success('创建子项目成功')
              setTimeout("location.reload()", "500")
            })
            .catch(err => {
              if (statusCode == 5002) {
                this.$message.warning('该子报告号已存在，请勿重新添加')
              } else {
                this.$message.warning('添加失败，请稍后重试')
              }
            })
        } else {
          this.$message('请填写必填信息')
        }
      })
    },
    delSubProj(row) {
      delSubProject({ reportNum: row.reportNum, subReportNum: row.subReportNum })
        .then(res => {
          this.$message.success('删除子项目成功')
          setTimeout("location.reload()", "400")
        })
        .catch(err => {
          this.$message.warning('删除失败，请稍后重试')
        })
    },
    formatDate(now) {
      const time = new Date(now)
      var year = time.getFullYear();  //取得4位数的年份
      var month = time.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
      var date = time.getDate();      //返回日期月份中的天数（1到31）
      var hour = time.getHours();     //返回日期中的小时数（0到23）
      return year + "-" + month + "-" + date
    }
  },
}
</script>

<style scoped>
.card-header {
  font-size: 20px;
}
.text {
  line-height: 40px;
}
.text span {
  color: #707781;
}
.item {
  border-bottom: solid 1px #ebe8e8;
}
.work {
  width: 100%;
}
.work-title {
  width: 100%;
  text-align: left;
  padding-left: 10px;
  margin: 50px 0 5px 0;
  border-left: solid 5px #409eff;
}
.work-title-name {
  font-size: 24px;
}
.work-title-button {
  float: right;
  padding-right: 25px;
}
.tabs {
  margin-top: 20px;
}
.report-num {
  margin-top: 5px;
}
.report-title {
  text-align: center;
  border: 1px solid #d3d3d3;
  height: 40px;
  line-height: 40px;
  background-color: #cbe5ff;
}
.report-content {
  text-align: center;
  border: 1px solid #d3d3d3;
  height: 40px;
  line-height: 40px;
}
.workname-left {
  height: 30px;
  margin-top: 15px;
  line-height: 30px;
}
</style>