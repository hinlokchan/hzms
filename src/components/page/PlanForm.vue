<template>
  <div>
    <div class="container">
      <el-page-header
        @back="goBack"
        style="margin-bottom: 15px"
      ></el-page-header>
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-lx-calendar"></i> 项目管理
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="this.isEdit == false">新增项目计划</el-breadcrumb-item>
          
		  <!-- 211026变动 新增: 克隆功能 功能按钮-->
		  <el-breadcrumb-item v-else>
			  编辑项目计划
			  <el-button
			    type="primary"
			    icon="el-icon-plus"
			    style="height:auto;padding: 0px 8px 7px 8px;margin-left:15px"
			    @click="handleAdd"
				v-if="userRole<=2"
			  ><span style="font-size:14px;color:#fff;" >克隆为新项目计划</span></el-button>
		  </el-breadcrumb-item>
		  
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
		<!-- 211116变动， 新增不同项目类型，使用不用项目消息模板，增加复制按钮 -->
		<span slot="footer" class="dialog-footer">
		  <el-button @click="newInfo = false">取消</el-button>
		  <el-button
		    style="right: 0px;"
		    type="primary"
		    icon="el-icon-copy-document"
		    v-clipboard:copy="newInfoData"
		    v-clipboard:success="copy"
		  >复制</el-button>
		</span>
		
      </el-dialog>
      <el-dialog
        title="新增委托人"
        :visible.sync="showAddClient"
        width="40%"
      >
        <el-form :model="clientForm">
          <el-form-item label="类别">
            <el-cascader
              clearable
              ref="clientType"
              v-model="clientForm.clientType"
              :options="clientTypeOptions"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item label="名称">
            <el-input
              ref="clientName"
              v-model.trim="clientForm.clientName"
              @blur="checkClientName(clientForm.clientName)"
            ></el-input>
            <h4 style="color: #ed1941">银行委托人添加格式:类别选择银行名称，名称填写分（支）行名字</h4>
            <h4>例:中国银行惠州分行 -> 类别选择中国银行，名称填写惠州分行</h4>
            <el-tree
              ref="tree"
              :data="clientList"
              :props="defaultProps"
              :filter-node-method="filterNode"
            ></el-tree>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          @click="submitAddClient"
        >提交</el-button>
        <el-button
          type="text"
          @click="showAddClient = false"
        >取消</el-button>
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
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item
                :span="6"
                label="项目类型"
                prop="projType"
                class="red-item"
              >
                <el-select
				  class="select-width-100"
                  v-model="form.projType"
                  @change="arrgTypeToEnable"
                  v-if="!this.isEdit"
                >
                  <el-option
                    v-for="item in projTypeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-input disabled type="text"
                          style="width: 50%"
                          v-if="this.isEdit"
                          v-model="projTypes[form.projType]"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="轮序/安排">
                <el-select
				  class="select-width-100"
                  v-model="form.arrgType"
                  placeholder="请选择"
                  :disabled="userRole>2"
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
                <el-select 
				  class="select-width-100"
				  v-model="form.projContactType" :disabled="userRole>2">
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
                v-for="(item, index) in form.projContact"
                :label="'接洽人' + (index + 1)"
                :key="index"
                prop="projContact"
              >
                <div class="flexBox">
                  <!-- <el-input
                    style="width:90%"
                    v-model="item.value"
                  ></el-input> -->
                  <el-autocomplete
                    v-model="item.value"
                    :fetch-suggestions="querySearch"
                    :disabled="userRole>2"
                  ></el-autocomplete>
                  <i
                    class="el-icon-lx-roundclose"
                    style="margin: 6px 0 0 0;font-size: 20px;color:#b5b5b5"
                    @click.prevent="removeDomain(index, 5)"
                    v-if="userRole<3"
                  ></i>
                </div>
              </el-form-item>
              <el-form-item v-if="userRole<3">
                <el-button type="primary" icon="el-icon-plus" circle
                           @click="addDomain(5)"
                >
                </el-button>
                添加
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item
                label="委托人"
                prop="clientName"
                class="red-item"
              >
                <el-cascader
                  v-if="!clientInputTypeChange && userRole<3"
                  ref="cascaderAddr"
                  :show-all-levels="false"
                  v-model="form.clientId"
                  :options="clientList"
                  :props="{ expandTrigger: 'hover' }"
                  style="width: 85%"
                  filterable
                >
                </el-cascader>
                <el-input
                  v-if="clientInputTypeChange || userRole>2"
                  :disabled="true"
                  style="width: 90%"
                  v-model="form.clientName"
                ></el-input>
                <el-button
                  type="text"
                  icon="el-icon-refresh-right"
                  style="width: 10%"
                  v-if="userRole<3"
                  @click="resetClientName()"
                ></el-button>
                <el-button
                  type="text"
                  @click="showAddClientDialog"
                  v-if="userRole<3"
                >新增</el-button>
                <el-button
                  type="text"
                  @click="setUnconfirmClient()"
                  v-if="userRole<3"
                >待定</el-button>
              </el-form-item>
              <!-- <el-form-item
                label="委托人"
                prop="clientName"
                v-if="clientInputTypeChange == false"
                class="red-item"
              >
                <el-input
                  :disabled="true"
                  style="width: 90%"
                  placeholder="待定"
                ></el-input>
                <el-button
                  type="text"
                  icon="el-icon-refresh-right"
                  style="width: 10%"
                  @click="resetClientName()"
                ></el-button>
              </el-form-item> -->

            </el-col>
            <el-col :span="6">
              <el-form-item
                label="产权持有人  "
                prop="incumbrancer"
              >
                <el-input v-model="form.incumbrancer"></el-input>
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
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item
                label="项目名称"
                prop="projName"
                class="red-item"
              >
                <el-input
                  v-model="form.projName"
                  type="textarea"
                  autosize
                  maxlength="240"
                ></el-input>
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
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item
                label="评估范围"
                prop="projScope"
                class="red-item"
              >
                <el-input
                  v-model="form.projScope"
                  type="textarea"
                  autosize
                  maxlength="240"
                ></el-input>
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
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item
                label="评估目的"
                prop="assemGoal"
                class="red-item"
              >
                <el-select
				  class="select-width-100"
                  v-model="form.assemGoal"
                  placeholder="请选择"
                  filterable
                  allow-create
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
                  :disabled="userRole>2"
                  oninput="value=value.replace(/[^\d.]/g,'')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="基准日"
                prop="baseDate"
                class="red-item"
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
                class="red-item"
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
            <!-- <el-col :span="6">
              <el-form-item
                label="编制日期"
                prop="projDate"
                class="red-item"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.projDate"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col> -->
          </el-row>
          <el-row :gutter="20">
            <el-divider></el-divider>
            <el-col :span="6">
              <el-form-item label="新/重评">
                <el-select
				  class="select-width-100"
                  v-model="form.newOldType"
                  placeholder="请选择"
                  :disabled="userRole>2"
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
				  class="select-width-100"
                  v-model="form.projDegree"
                  placeholder="请选择"
                  :disabled="userRole>2"
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
                <el-select 
				  class="select-width-100"
				  v-model="form.riskProfile" :disabled="userRole>2">
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
                <el-input
                  v-model="form.assemFeeQuote"
                  oninput="value=value.replace(/[^\d.]/g,'')"
                  :disabled="userRole>2"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="补充说明">
                <el-input
                  type="textarea"
                  autosize
                  v-model="form.supInstruction"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20"
                  v-if="this.form.projType === '1010' && !this.isEdit "
          >
            <el-col>
              <div class="form-item-title">
                <h3>估价对象</h3>
              </div>
            </el-col>
            <el-col :span="6">
                <el-form-item
                    v-for="(item, index) in form.evalObjArray"
                    :label="'估价对象' + (index + 1)"
                    :key="index"
                >
                  <div class="flexBox">
                    <el-input
                        v-model="item.evalObjName"
                        placeholder=""
                    ></el-input>
                    <i
                        class="el-icon-lx-roundclose"
                        style="margin: 6px 0 0 5px;font-size: 20px;color:#b5b5b5"
                        @click.prevent="removeDomain(index, 6)"
                    ></i>
                  </div>
                </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-plus" circle
                           @click="addDomain(6)"
                >
                </el-button>
                添加
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
                <el-autocomplete
                  v-model="form.projLeader"
                  :fetch-suggestions="querySearch"
                  :disabled="userRole>2"
                ></el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col
              :span="6"
              v-if="this.form.projType == 1090"
            >
              <el-form-item label="总审">
                <el-input v-model="form.finalReview" :disabled="userRole>2"></el-input>
              </el-form-item>
            </el-col>
            <!-- </el-row>
          <el-row :gutter="20"> -->
            <!-- <el-col :span="6">
              <el-form-item
                v-for="(item, index) in form.projContact"
                :label="'接洽人' + (index + 1)"
                :key="index"
                prop="projContact"
              >
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
            </el-col> -->
            <el-col :span="6">
              <el-form-item
                v-for="(item, index) in form.projReviewer"
                :label="'项目复核人' + (index + 1)"
                :key="index"
              >
                <div class="flexBox">
                  <!-- <el-input
                    style="width:90%"
                    v-model="item.value"
                  ></el-input> -->
                  <el-autocomplete
                    v-model="item.value"
                    :fetch-suggestions="querySearch"
                    :disabled="userRole>2"
                  ></el-autocomplete>
                  <i
                    class="el-icon-lx-roundclose"
                    style="margin: 6px 0 0 5px;font-size: 20px;color:#b5b5b5"
                    @click.prevent="removeDomain(index, 1)"
                    v-if="userRole<3"
                  ></i>
                </div>
              </el-form-item>
<!--              <el-form-item>-->
<!--                <i-->
<!--                  class="el-icon-lx-roundadd"-->
<!--                  style="font-size: 26px;color:#b5b5b5"-->
<!--                  @click="addDomain(1)"-->
<!--                ></i>-->
<!--              </el-form-item>-->
              <el-form-item v-if="userRole<3">
                <el-button type="primary" icon="el-icon-plus" circle
                           @click="addDomain(1)"
                >
                </el-button>
                添加
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                v-for="(item, index) in form.projProReviewer"
                :label="'专业复核人' + (index + 1)"
                :key="index"
              >
                <div class="flexBox">
                  <!-- <el-input
                    style="width:90%"
                    v-model="item.value"
                  ></el-input> -->
                  <el-autocomplete
                    v-model="item.value"
                    :fetch-suggestions="querySearch"
                    :disabled="userRole>2"
                  ></el-autocomplete>
                  <i
                    class="el-icon-lx-roundclose"
                    style="margin: 6px 0 0 5px;font-size: 20px;color:#b5b5b5"
                    @click.prevent="removeDomain(index, 2)"
                    v-if="userRole<3"
                  ></i>
                </div>
              </el-form-item>
<!--              <el-form-item>-->
<!--                <i-->
<!--                  class="el-icon-lx-roundadd"-->
<!--                  style="font-size: 26px;color:#b5b5b5"-->
<!--                  @click="addDomain(2)"-->
<!--                ></i>-->
<!--              </el-form-item>-->
              <el-form-item v-if="userRole<3">
                <el-button type="primary" icon="el-icon-plus" circle
                           @click="addDomain(2)"
                >
                </el-button>
                添加
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                v-for="(item, index) in form.projAsst"
                :label="'项目助理' + (index + 1)"
                :key="index"
              >
                <div class="flexBox">
                  <!-- <el-input
                    style="width:90%"
                    v-model="item.value"
                  ></el-input> -->
                  <el-autocomplete
                    v-model="item.value"
                    :fetch-suggestions="querySearch"
                    :disabled="userRole>2"
                  ></el-autocomplete>
                  <i
                    class="el-icon-lx-roundclose"
                    style="margin: 6px 0 0 5px;font-size: 20px;color:#b5b5b5"
                    @click.prevent="removeDomain(index, 3)"
                    v-if="userRole<3"
                  ></i>
                </div>
              </el-form-item>
<!--              <el-form-item>-->
<!--                <i-->
<!--                  class="el-icon-lx-roundadd"-->
<!--                  style="font-size: 26px;color:#b5b5b5"-->
<!--                  @click="addDomain(3)"-->
<!--                ></i>-->
<!--              </el-form-item>-->
              <el-form-item v-if="userRole<3">
                <el-button type="primary" icon="el-icon-plus" circle
                           @click="addDomain(3)"
                >
                </el-button>
                添加
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item
                v-for="(item, index) in form.fieldSrvy"
                :label="'现场勘查' + (index + 1)"
                :key="index"
              >
                <div class="flexBox">
                  <!-- <el-input
                    style="width:90%"
                    v-model="item.value"
                  ></el-input> -->
                  <el-autocomplete
                    v-model="item.value"
                    :fetch-suggestions="querySearch"
                  ></el-autocomplete>
                  <i
                    class="el-icon-lx-roundclose"
                    style="margin-top: 6px ;font-size: 20px;color:#b5b5b5"
                    @click.prevent="removeDomain(index, 4)"
                  ></i>
                </div>
              </el-form-item>
<!--              <el-form-item>-->
<!--                <i-->
<!--                  class="el-icon-lx-roundadd"-->
<!--                  style="font-size: 26px;color:#b5b5b5"-->
<!--                  @click="addDomain(4)"-->
<!--                ></i>-->
<!--              </el-form-item>-->
              <el-form-item>
                <el-button type="primary" icon="el-icon-plus" circle
                           @click="addDomain(4)"
                >
                </el-button>
                添加
              </el-form-item>
            </el-col>
          </el-row>
		  
		  <!-- 211026变动 新增: 克隆功能 调整提交按钮样色文字 -->
          <el-form-item>
            <el-button
              :type="newButtonType(isEdit)"
			  :icon="newButtonIcon(isEdit)"
              @click="onSubmit"
            >{{newButtonText(isEdit)}}</el-button>
            <el-button @click="goBack">取消</el-button>
            <!-- <el-button @click="test">test</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { createNewProject, editProject,createEvalObj } from '@/api/index'
import { getDetailProjInfo, getUserList, userQuery, getClientList, addClient } from '@/api/index'
import clientOptions from '../../../public/clientName.json'
import projTypeOption from '../../../public/projTypeOption.json'

export default {
  name: 'planform',
  inject: ['reload'],            //注入App里的reload方法
  data() {
    return {
      userRole:null,
      isEdit: false,
      newInfo: false,
      newInfoData: '',
      transedData: {},
      clientList: [],
      clientInputTypeChange: false,
      showAddClient: false,
      clientForm: {
        clientType: '',
        clientName: ''
      },
      searchClientType: '',
      form: {
        projType: '',
        projName: '',
        projContact: [{ value: '' }],
        projContactType: '正常接洽',
        projDate: '',
        newOldType: '1001',
        arrgType: '',
        projDegree: '1001',
        baseDate: '',
        assemGoal: '',
        clientId: '',
        clientName: '',
        incumbrancer: '',
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
        finalReview: '',
        projAsst: [{ value: '' }],
        projProReviewer: [{ value: '' }],
        riskProfile: '1002',
        fieldSrvy: [{ value: '' }],
        compSchedule: 3,
        projReviewer: [{ value: '' }],
        //lendingBank: [],
        projTypeOption: [],
        evalObjArray:[]
      },
      backupForm: {},
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
        // projDate: [
        //   { required: true, message: '请选择编制日期', trigger: 'blur' }
        // ],
        baseDate: [
          { required: true, message: '请选择基准日', trigger: 'blur' }
        ],
        fldSrvySchedule: [
          { required: true, message: '请选择现勘日期', trigger: 'blur' }
        ]
      },
      assemGoalList: ['抵押', '交易', '资产处置（司法鉴定）', '出让', '挂牌出让', '补出让', '转让', '盘整收回', '征收补偿', '活立木拍卖', '出租', '置换', '股权转让', '作价入股', '增资扩股', '入账', '征收、完税', '企业改制', '清算', '复审', '评价', '咨询'],
      contactTypeOption: ['正常接洽', '摇珠', '中行通知书', '定点采购', '中介超市', '河源分公司', '政府采购', '招标委托'],
      userList: [],
      projTypes: {
        1010: '房地产',
        1020: '资产',
        1030: '土地',
        1041: '房地产咨询',
        1042: '资产咨询',
        1043: '地产咨询',
        1050: 'PPP',
        1061: '房地产复审',
        1062: '资产复审',
        1063: '土地复审',
        1070: '外协',
        1071: '协外',
        1080: '政策修订',
        1090: '绩效',
        1100: '其他'
      },
      clientTypeOptions: [
        {
          value: '1',
          label: '银行',
          children: [
            { value: '101', label: '中国银行' },
            { value: '102', label: '建设银行' },
            { value: '103', label: '农业银行' },
            { value: '104', label: '工商银行' },
            { value: '105', label: '交通银行' },
            { value: '106', label: '广发银行' },
            { value: '107', label: '浦发银行' },
            { value: '108', label: '民生银行' },
            { value: '109', label: '兴业银行' },
            { value: '110', label: '中信银行' },
            { value: '122', label: '招商银行' },
            { value: '111', label: '平安银行' },
            { value: '112', label: '南粤银行' },
            { value: '113', label: '邮政储蓄银行' },
            { value: '114', label: '光大银行' },
            { value: '115', label: '广州银行' },
            { value: '116', label: '华润银行' },
            { value: '117', label: '东莞农商银行' },
            { value: '118', label: '惠州东盈村镇银行' },
            { value: '119', label: '惠民村镇银行' },
            { value: '120', label: '广东华兴银行' },
            { value: '121', label: '农商银行' },
            { value: '122', label: '招商银行' },
            { value: '123', label: '东莞银行' },
            { value: '124', label: '华夏银行' },
            { value: '125', label: '农业发展银行' }
          ]
        },
        { value: '1001', label: '自然资源局' },
        { value: '1002', label: '法院' },
        { value: '1003', label: '国资委' },
        { value: '1004', label: '财政局' },
        { value: '1005', label: '政府部门' },
        { value: '1006', label: '担保公司' },
        { value: '1100', label: '其他' }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  created() {
    this.userRole = localStorage.getItem('role') - 0
    this.getClientList();
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
    this.clientOptions = clientOptions
    this.projTypeOption = projTypeOption
    getUserList()
      .then(res => {
        this.userList = res.data
        for (let i of userList) {
          i.value = i.staffName
        }
      })
      .catch(err => { })
    // this.getClientList()
  },
  
  //211026变动 新增: 克隆功能 计算属性调整提交按钮样色文字
  computed:{
    newButtonText(){
    	return (data)=>{
    		if(data){
    			return "更新项目";
    		}else{
				return "新增项目";
			}
    	}
    },
	newButtonType(){
    	return (data)=>{
    		if(data){
    			return "success";
    		}else{
				return "primary";
			}
    	}
    },
	newButtonIcon(){
    	return (data)=>{
    		if(data){
    			return "el-icon-edit";
    		}else{
				return "el-icon-plus";
			}
    	}
    },
  },
  
  watch: {
    'clientForm.clientName': {
      handler(val) {
        let type = this.searchClientType + val
        this.$refs.tree.filter(type)
      }
    },
    'clientForm.clientType': {
      handler(val) {
        if (val == '') {
          this.$refs.tree.filter(val)
          return 0
        }

        var label = this.$refs['clientType'].getCheckedNodes()[0].label
        if (val[0] == 1) {
          this.searchClientType = label
        } else {
          this.searchClientType = ''
        }
        //this.searchClientType = label
        console.log(label)
        this.$refs.tree.filter(label)
      }
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getClientList() {
      getClientList()
        .then(res => {
          this.clientList = res.data
        })
        .catch(err => { })
    },
    showAddClientDialog() {
      this.showAddClient = true
    },
    // test() {
    //   let a = this.form.supInstruction.split(';')
    //   let b = a[0].split(':')
    //   console.log(a.length, b)
    // },
    querySearch(queryString, callback) {
      var userList = this.userList
      this.userListType = false
      for (let i of userList) {
        i.value = i.staffName
      }
      var results = queryString ? userList.filter(this.createFilter(queryString)) : userList
      callback(results)
    },
    createFilter(queryString) {
      return (userList) => {
        return (userList.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
      }
    },
    arrgTypeToEnable(val) {
      if (val == 1010 || val == 1030) {
        this.form.arrgType = '1001'
      } else {
        this.form.arrgType = '1002'
      }
    },
    closeNewInfo() {
      this.newInfo = false
      //this.goBack()
      this.reload()
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
      // 接洽人
      if (data.projContact !== '') {
        if (data.projContact.indexOf(',') !== -1) {
          let midData = data.projContact.split(',')
          let endData = []
          for (let i = 0; i < midData.length; i++) {
            endData.push({ value: midData[i] })
          }
          data.projContact = endData
        } else {
          data.projContact = [{ value: data.projContact }]
        }
      } else {
        data.projContact = [{ value: '' }]
      }
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
      
	  //211103变动 修复:克隆功能 新增估价对象bug
	  data.evalObjArray = [];	  
	  this.form = data;
	  
      //转化委托人
      let value = data.clientId
      if (value == '0') {
        this.clientInputTypeChange = true
      } else {
        this.searchJsonTree(this.clientList, value)
      }
      // this.searchJsonTree(this.clientList, value)
      //this.form = data
    },
    //遍历clientList
    searchJsonTree(jsonObj, value) {
      for (let i in jsonObj) {
        let element = jsonObj[i]
        if (typeof (element) == 'object') {
          this.searchJsonTree(element, value)
        } else {
          if (element == value) {
            this.form.clientId = element
          } else {
            //this.clientInputTypeChange = true
          }
        }
      }
    },
    addDomain(type) {
      if (type === 1) {
        this.form.projReviewer.push({
          value: ''
        });
      } else if (type === 2) {
        this.form.projProReviewer.push({
          value: ''
        });
      } else if (type === 3) {
        this.form.projAsst.push({
          value: ''
        });
      } else if (type === 4) {
        this.form.fieldSrvy.push({
          value: ''
        });
      } else if (type === 5) {
        this.form.projContact.push({
          value: ''
        });
      } else if (type === 6) {
        this.form.evalObjArray.push({
          evalObjName : ''
        });
      }
    },
    removeDomain(index, type) {
      if (type === 1) {
        if (this.form.projReviewer.length !== 1 && this.form.projReviewer.length !== 0) {
          this.form.projReviewer.splice(index, 1)
        }
      } else if (type === 2) {
        if (this.form.projProReviewer.length !== 1 && this.form.projProReviewer.length !== 0) {
          this.form.projProReviewer.splice(index, 1)
        }
      } else if (type === 3) {
        if (this.form.projAsst.length !== 1 && this.form.projAsst.length !== 0) {
          this.form.projAsst.splice(index, 1)
        }
      } else if (type === 4) {
        if (this.form.fieldSrvy.length !== 1 && this.form.fieldSrvy.length !== 0) {
          this.form.fieldSrvy.splice(index, 1)
        }
      } else if (type === 5) {
        if (this.form.projContact.length !== 1 && this.form.projContact.length !== 0) {
          this.form.projContact.splice(index, 1)
        }
      } else if (type === 6) {
        if (this.form.evalObjArray.length !== 0) {
          this.form.evalObjArray.splice(index, 1)
        }
      }
    },
    //委托人待处理
    setUnconfirmClient() {
      this.clientInputTypeChange = true
      this.form.clientId = '0'
      this.form.clientName = '委托人待处理'
    },
    resetClientName() {
      this.clientInputTypeChange = false
      this.form.clientId = ''
      this.form.clientName = ''
    },
    onSubmit() {
      //备份已填表格（数组未处理）
      this.backupForm = this.form

      if (this.form.clientName == '' && this.form.clientId == '') {
        this.$message.warning('请填写委托人！')
        return 0
      } else {
        if (this.form.clientId == 141) {
          if (this.form.clientName == '') {
            this.$message.warning('请填写委托人！')
            return 0
          }
          this.form.clientId = ''
        }
        // else {
        //   //this.form.clientId = this.form.clientId[this.form.clientId.length - 1]
        //   if (this.isEdit == false) {
        //     let clientIdMid = [...this.form.clientId].pop()
        //     this.form.clientId = clientIdMid
        //   }
        // }
        console.log('form', this.form)
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (Array.isArray(this.form.clientId) == true) {
              let clientIdMid = [...this.form.clientId].pop()
              console.log(clientIdMid)
              this.form.clientId = clientIdMid
            }
            this.transformPeop().then(this.handleEvalObj).then(
                res => {
                  console.log('this.form', this.form);
                  if (this.isEdit) {
                    editProject(this.form)
                        .then(res => {
                          console.log('add>>>res', res);
                          this.$message.success('提交成功！');
                          this.goBack();
                        })
                        .catch(err => {
                          this.$message.warning('提交失败！');
                          console.log('add>>>err', err);
                        });
                  } else {
                    createNewProject(this.form).then(res => {
                      console.log('add>>>res', res);
                      this.$message.success('提交成功！');
                      //短信
                      this.messageAfterSubmit(res)
                    }).catch(err => {
                      console.log('add>>>err', err);
                      this.$message("未知错误")
                      this.form = this.backupForm
                    });
                  }
                }
            ).catch(
                err => {
                  this.$message("未知错误")
                }
            );
          } else {
            this.$message('请填写必填信息');
          }
        })
      }
    },
	
	//211116变动， 新增不同项目类型，使用不用项目消息模板
	copy(e) {
	  this.$message.success('内容已复制到剪贴板')
	},
    messageAfterSubmit(res) {
	  var tempType=1;
	  
      let riskProfile = '';
      if (this.form.riskProfile == '1001') {
        riskProfile == '低';
      } else if (this.form.riskProfile == '1002') {
        riskProfile = '中等';
      } else if (this.form.riskProfile == '1003') {
        riskProfile = '较高';
      } else {
        riskProfile = '高';
      }
      let newOldType = '';
      if (this.form.newOldType == '1001') {
        newOldType = '新项目';
      } else if (this.form.newOldType == '1002') {
        newOldType = '重评项目';
      }
      //处理value转为label展示
	  let projLabel = '';
	  let projType = '';
      for (var i = 0; i < this.projTypeOption.length; i++) {
        if (this.form.projType == this.projTypeOption[i].value) {
          projLabel = this.projTypeOption[i].label;
		  projType = this.projTypeOption[i].type;
		  
		  //判断模板， 默认1， 绩效2， 复审3
		  if(projType == 'JX'){
			tempType = 2;  
		  }else if(projType == 'FSF' || projType == 'FSZ' || projType == 'FST'){
			tempType = 3;    
		  }
        }
      }
      // ZP项目类型：资；委托 人：(其他):惠州市水务投资集团；项目名称：惠州大道大湖溪段667平方米租金；评估对象及其坐落：同上;；评估目的：物业出租价格；引荐人及其电话：惠州市水务投资集团王总135 0229 7502；现联系单位、人及电话：同上；现勘时间：现勘同事约；报告时间要求：5天；项目风险预测：；评估收费报价：待定；是否曾评估的项目：（若是，原项目组成员：）；项目接洽人""[52]-缨(注师：莎缨;助理：健;专业复核人:远。以下由项目负责人安排 现勘：;资料核查验证：;市场询价调查：;技术报告:；报告编制:; 归档：;对外沟通:
      if (this.form.clientName != '') {
        var clientName = this.form.clientName;
      } else if (this.form.clientId == '0') {
        var clientName = '委托人待定';
      } else {
        var clientName = this.$refs['cascaderAddr'].getCheckedNodes()[0].label;
      }
	  
	  if(tempType == 1){
		//默认模板 项目编号:${res.data.projNum}; 
		this.newInfoData = `${projType}项目类型:${projLabel}; 委托人:${clientName}; 项目名称:${this.form.projName}; 评估对象及其坐落:${this.form.projScope}; 评估目的:${this.form.assemGoal}; 引荐人及其电话:${this.form.projReferer}${this.form.projRefererInfo}; 现勘联系人及电话：${this.form.fldSrvyContact}${this.form.fldSrvyContactInfo}; 现勘时间:${this.form.fldSrvySchedule}; 报告时间要求:${this.form.compSchedule}天; 项目风险预测:${riskProfile}; 评估收费报价:${this.form.assemFeeQuote?this.form.assemFeeQuote:''}; 是否曾评估项目:${newOldType}; 项目接洽人:${this.form.projContactType} ${this.form.projContact} (注师：；助理：；专业复核人:)。以下由项目负责人安排,现勘:${this.form.fieldSrvy}; 资料核查验证: ; 市场询价调查: ; 技术报告: ; 报告编制: ; 归档: ; 对外沟通: 。`;
	  }else if(tempType == 2){
		//绩效模板
		this.newInfoData = `${projType}项目类型:${projLabel}; 委托人:${clientName}; 评价目的:${this.form.assemGoal}; 项目名称:${this.form.projName}; 引荐人及其电话:${this.form.projReferer} ${this.form.projRefererInfo}; 现勘联系人及电话：${this.form.fldSrvyContact} ${this.form.fldSrvyContactInfo}; 现勘时间:${this.form.fldSrvySchedule}; 报告时间要求:${this.form.compSchedule}天; 收费报价:${this.form.assemFeeQuote?this.form.assemFeeQuote:''}; 项目接洽人:${this.form.projContactType} ${this.form.projContact} (项目组成员：；总审：；); 现勘:${this.form.fieldSrvy}; 资料核查验证: ; 市场询价调查: ; 报告编制: ; 聘请专家: ; 归档: ; 对外沟通人: 。`;
	  }else if(tempType == 3){
		//复审模板
		this.newInfoData = `${projType}项目类型:${projLabel}; 委托方:${clientName}; 项目名称:${this.form.projName}; 引荐人及其电话:${this.form.projReferer}${this.form.projRefererInfo}; 现勘联系人及电话：${this.form.fldSrvyContact}${this.form.fldSrvyContactInfo}; 现勘时间:${this.form.fldSrvySchedule}; 报告时间要求:${this.form.compSchedule}天; 评审要求: ; 项目接洽人:${this.form.projContactType} ${this.form.projContact} (评审师：；助理：；); 现勘:${this.form.fieldSrvy}; 对外沟通人: 。`;
	  }
      //this.newInfoData = `项目编号:${res.data.projNum};项目类型:${this.transedData.projType};委托人:${clientName};项目名称:${this.form.projName};评估对象及其坐落:${this.form.projScope};评估目的:${this.form.assemGoal};引荐人及其电话:${this.form.projReferer}${this.form.projRefererInfo};现勘联系单位人及电话：${this.form.fldSrvyContact}${this.form.fldSrvyContactInfo};现勘时间:${this.form.fldSrvySchedule};报告时间要求:${this.form.compSchedule}天;项目风险预测:${riskProfile};评估收费报价:${this.form.assemFeeQuote};是否曾评估项目:${newOldType};项目接洽人:${this.form.projContact} ${this.form.projContactType}(注师：；助理：；专业复核人:)。以下由项目负责人安排,现勘:${this.form.fieldSrvy};资料核查验证: ;市场询价调查: ;技术报告: ;报告编制: ;归档: ;对外沟通: 。`;
      this.newInfo = true;
    },
    //测试用的，无关
    // info() {
    //   console.log('agds', this.form)
    //   this.transformPeop()
    //   this.newInfoData = `项目编号:;项目类型:${this.transedData.projType};委托人:${this.form.clientName};项目名称:${this.form.projName};评估对象及其坐落:同上;评估目的:${this.form.assemGoal};引荐人及其电话:${this.form.projReferer}${this.form.projRefererInfo};现勘联系单位人及电话：${this.form.fldSrvyContact}${this.form.fldSrvyContactInfo};现勘时间:${this.form.fldSrvySchedule};报告时间要求:${this.form.compSchedule}天;项目风险预测:;评估收费报价:${this.form.assemFeeQuote};是否曾评估项目:;项目接洽人:${this.form.projContact} ${this.form.projContactType}(注师：；助理：；专业复核人:)。以下由项目负责人安排,现勘:${this.form.fieldSrvy};资料核查验证: ;市场询价调查: ;技术报告: ;报告编制: ;归档: ;对外沟通: 。`
    //   this.newInfo = true
    // },
    handleEvalObj() {
      let arr = this.form.evalObjArray
      // let str = JSON.stringify(arr)
      // console.log(str);
      // return
      // for (let i = 0; i < arr.length; i++) {
      //   if (arr[i].evalObjName) {
      //     str += arr[i].evalObjName + '||';
      //   }
      // }
      // if (str !== '') {
      //   str = str.substring(0, str.length - 2);
      // }
      this.form.evalObjArray = JSON.stringify(arr);
    },
    transformPeop() {
      var that = this
      return new Promise(function (resolve, reject) {
        //  银行
        // if(!that.isEdit){
        //后端处理好号把这段加回去
        // let lendingBankNew = ''
        // console.log('that.form.lendingBank', that.form.lendingBank[1])
        // if (that.form.lendingBank) {
        //   lendingBankNew = that.form.lendingBank[1]
        //   that.form.lendingBank = lendingBankNew
        // }
        //}
        //  接洽人
        let projContact = that.form.projContact
        let projContactNew = ''
        for (let i = 0; i < projContact.length; i++) {
          if (projContact[i].value) {
            projContactNew = projContactNew + projContact[i].value + ','
          }
        }
        that.form.projContact = projContactNew.substr(0, projContactNew.length - 1)
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
    checkClientName(str) {
      var pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im
      if (pattern.test(str)) {
        this.$message.warning('请勿输入特殊符号')
        this.$refs['clientName'].focus()
      }
    },
    submitAddClient() {
      if (this.clientForm.clientName == '' || this.clientForm.clientType == '') {
        this.$message.warning('类别、名称不能为空')
        return 0
      }
      if (this.clientForm.clientType instanceof Array) {
        let clientTypeMid = this.clientForm.clientType[this.clientForm.clientType.length - 1]
        this.clientForm.clientType = clientTypeMid
      }
      console.log(this.clientForm)
      addClient(this.clientForm)
        .then(res => {
          this.$message.success('添加成功！')
          let client = res.data
          console.log(res, client)
          this.getClientList()
          this.form.clientId = client
          this.showAddClient = false

        })
        .catch(err => {
          if (err.statusCode == 5002) {
            this.$message.warning('该委托人已存在！')
            this.clientForm.clientName = ''
          }
          console.log(err)
        })
    },
    // btKeyUp(e) {
    //   e.target.value = e.target.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, "")
    // },
    goBack() {
      this.$router.go(-1)
    },
	
	//211026变动 新增:克隆功能 功能函数
	handleAdd() {
		this.$confirm('是否确定克隆为新的项目计划', '提示', {
		}).then(() => {
		  this.$message.warning('克隆为新项目计划');
		  this.isEdit = false;
		}).catch(() => {
		
		});
	},
	
  }
};
</script>

<style lang="less">
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
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .id {
      font-size: 12px;
      color: #b4b4b4;
      float: right;
    }

    .highlighted .id {
      color: #ddd;
    }
  }
}
.red-item .el-form-item__label {
  color: #ed1941;
}

.select-width-100{
	width: 100%;
}

</style>