<template>
  <div>
    <div class="container">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-receiving"></i> 我的项目
          </el-breadcrumb-item>
          <el-breadcrumb-item>工作台处理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
	  
	  <!-- 弹出框 -->
	  <el-dialog :title="`发票开具 ${subBillInfoTitle}`" :visible.sync="subBillInfoVisible" width="600px">
		<el-form
			ref="subBillInfoForm"
			:visible.sync="subBillInfoVisible"
			:model="subBillInfoForm"
			:rules="subBillInfoRules"
			label-width="125px"
		>
			<el-form-item label="项目名称" prop="subProjName">
				<el-input v-model="subBillInfoForm.subProjName" disabled
					type="textarea" autosize maxlength="240" style="width: 100%;"
				></el-input>
			</el-form-item>
			<el-form-item label="项目范围" prop="subProjScope">
				<el-input v-model="subBillInfoForm.subProjScope" disabled
					type="textarea" autosize maxlength="240" style="width: 100%;"
				></el-input>
			</el-form-item>
			<el-form-item label="归档发票抬头" prop="subProjFPTT" class="red-item">
			  <el-input v-model="subBillInfoForm.subProjFPTT" style="width: 100%" clearable></el-input>
			</el-form-item>
			<el-form-item label="已开发票金额" prop="subProjFPJE" class="red-item">
			  <el-input v-model="subBillInfoForm.subProjFPJE" style="width: 100%" clearable
			  oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
			</el-form-item>
			<el-form-item label="已开收据金额" prop="subProjSJJE" >
			  <el-input v-model="subBillInfoForm.subProjSJJE" style="width: 100%" clearable
			  oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
			</el-form-item>
		</el-form>
		<div
		  slot="footer"
		  class="dialog-footer"
		>
		  <el-button @click="subBillInfoVisible = false">取 消</el-button>
		  <el-button
			@click="subBillInfoEdit()"
			type="primary"
		  >确认更改</el-button>
		</div>
	  </el-dialog>
	  
	  <el-dialog :title="`问题记录 ${subProblemInfoTitle}`" :visible.sync="subProblemInfoVisible" :modal="false" v-dialogDrag width="600px"	  >
		<el-form
			ref="subProblemInfoForm"
			:visible.sync="subProblemInfoVisible"
			:model="subProblemInfoForm"
			:rules="subProblemInfoRules"
			label-width="125px"
		>
			<el-form-item label="项目名称" prop="subProjName">
				<el-input v-model="subProblemInfoForm.subProjName" disabled
					type="textarea" autosize maxlength="240" style="width: 100%;"
				></el-input>
			</el-form-item>
			<el-form-item label="项目范围" prop="subProjScope">
				<el-input v-model="subProblemInfoForm.subProjScope" disabled
					type="textarea" autosize maxlength="240" style="width: 100%;"
				></el-input>
			</el-form-item>
			<el-form-item label="底单没登记" prop="subProjDDMDJ">
			  <el-input v-model="subProblemInfoForm.subProjDDMDJ" style="width: 100%" clearable
				type="textarea" autosize maxlength="240"></el-input>
			</el-form-item>
			<el-form-item label="催收记录" prop="subProjCSJL">
			  <el-input v-model="subProblemInfoForm.subProjCSJL" style="width: 100%" clearable
				type="textarea" autosize maxlength="240"></el-input>
			</el-form-item>
			<el-form-item label="登记错误记录" prop="subProjDJCWJL">
			  <el-input v-model="subProblemInfoForm.subProjDJCWJL" style="width: 100%" clearable
				type="textarea" autosize maxlength="240"></el-input>
			</el-form-item>
		</el-form>
		<div
		  slot="footer"
		  class="dialog-footer"
		>
		  <el-button @click="subProblemInfoVisible = false">取 消</el-button>
		  <el-button
			@click="subProblemInfoEdit()"
			type="primary"
		  >确认更改</el-button>
		</div>
	  </el-dialog>
	  
	  <el-dialog :title="`收费录入 ${subPayInfoTitle}`" :visible.sync="subPayInfoVisible" :modal="false" v-dialogDrag width="600px"	  >
		<el-form
			ref="subPayInfoForm"
			:visible.sync="subPayInfoVisible"
			:model="subPayInfoForm"
			:rules="subPayInfoRules"
			label-width="125px"
		>
			<el-form-item label="项目名称" prop="subProjName">
				<el-input v-model="subPayInfoForm.subProjName" disabled
					type="textarea" autosize maxlength="240" style="width: 100%;"
				></el-input>
			</el-form-item>
			<el-form-item label="项目范围" prop="subProjScope">
				<el-input v-model="subPayInfoForm.subProjScope" disabled
					type="textarea" autosize maxlength="240" style="width: 100%;"
				></el-input>
			</el-form-item>
			<el-form-item label="现收" prop="subProjXSJE"
			:rules="subPayInfoForm.subProjYSJE?subProjRuleNoReq:subProjRuleReq">
			<el-input v-model="subPayInfoForm.subProjXSJE" style="width: 100%" clearable
				  oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
			</el-form-item>
			<el-form-item label="银收" prop="subProjYSJE"
			:rules="subPayInfoForm.subProjXSJE?subProjRuleNoReq:subProjRuleReq">
			<el-input v-model="subPayInfoForm.subProjYSJE" style="width: 100%" clearable
				  oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
			</el-form-item>
			<el-form-item label="已开发票金额">
				{{subPayInfoForm.subProjFPJE?subPayInfoForm.subProjFPJE:'未开'}}
				<!-- 
				<el-input v-model="subPayInfoForm.subProjFPJE" style="width: 100%" clearable disabled></el-input>
				 -->
			</el-form-item>
			<el-form-item label="收费情况" prop="subProjSFQK">
			  <el-input v-model="subPayInfoForm.subProjSFQK" style="width: 100%" clearable
				type="textarea" autosize maxlength="240"></el-input>
			</el-form-item>
			<el-form-item label="收费记录" prop="subProjSFJL">
				
			</el-form-item>
			<el-form-item label="收费合计" prop="subProjSFHJ">
			<el-input v-model="subPayInfoForm.subProjSFHJ" style="width: 100%" disabled
				  oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
			</el-form-item>
		</el-form>
		<div
		  slot="footer"
		  class="dialog-footer"
		>
		  <el-button @click="subPayInfoVisible = false">取 消</el-button>
		  <el-button
			@click="subPayInfoEdit()"
			type="primary"
		  >确认更改</el-button>
		</div>
	  </el-dialog>
	  
	  
	  <!-- 211028变动 新增: 多个公司切换 -->
	  <el-tabs v-model="companyId" type="card" @tab-click="handleTabsClick">
	    <el-tab-pane label="惠正公司" name="HZ"></el-tab-pane>
	    <el-tab-pane label="智明公司" name="ZM"></el-tab-pane>
	    <el-tab-pane label="汇正公司" name="HZKJ"></el-tab-pane>
	  </el-tabs>
	  
	  <!-- 
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <div class="grid-content grid-con-1">
              <i class="el-icon-lx-edit grid-con-icon"></i>
              <div class="grid-cont-right">
                <div class="grid-num">{{missionData.onGoing}}</div>
                <div>待完成项目</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <div class="grid-content grid-con-3">
              <i class="el-icon-lx-warn grid-con-icon"></i>
              <div class="grid-cont-right">
                <div class="grid-num">{{missionData.urgent}}</div>
                <div>紧急项目</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <div class="grid-content grid-con-2">
              <i class="el-icon-bell grid-con-icon"></i>
              <div class="grid-cont-right">
                <div class="grid-num">{{missionData.new}}</div>
                <div>本日新项目</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="search">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-input
              v-model="searchData.projNum"
              placeholder="计划编号"
              @keyup.enter.native="getData"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-input
              v-model="searchData.reportNum"
              placeholder="报告号"
              @keyup.enter.native="getData"
            ></el-input>
          </el-col>
          <el-col :span="5">
            <el-input
              v-model="searchData.projName"
              placeholder="项目名称"
              @keyup.enter.native="getData"
            ></el-input>
          </el-col>
          <el-col :span="5">
            <el-input
              v-model="searchData.projScope"
              placeholder="项目范围"
              @keyup.enter.native="getData"
            ></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-button
              icon="el-icon-search"
              @click="getData"
              type="text"
              size="medium"
            >搜 索</el-button>
            <el-button
              @click="reset"
              type="text"
              icon="el-icon-refresh-right"
              size="medium"
            >重 置</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-switch
              v-model="onGoing"
              active-text="进行中项目"
              inactive-text="所有项目"
              @change="getData"
            ></el-switch>
          </el-col>
        </el-row>
      </div>
	  -->	 
	   
	   
      <!-- table multipleTable @row-dblclick="handleHandle" -->
	  <!-- 	  
	  class="table"
	  height="600"
	  style="width: 100%"
	  -->
      <el-table
        ref="table"
        :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        border
        fit
        stripe
		
		highlight-current-row
        @expand-change="expandChange"
		:expand-row-keys="expands"
		@row-click="rowClick"
		:row-key="getRowKeys"
      >	  
	  <!-- 展开行  v-loading="expandLoading"element-loading-text="Loading"-->
	  <el-table-column type="expand" width="20">
	    <template slot-scope="props">
	      <el-table
	        :data="subProjdataList"
	        align="center"
	        border
	        fit
	       
			style="margin: 0 10px"
	        >
			<el-table-column
				label="序号"
				width="50"
				type="index"
				align="center"
			></el-table-column>
	        <el-table-column label="子项目号" width="80">
	          <template slot-scope="scope">
				{{ scope.row.subProjNum }}
	          </template>
	        </el-table-column>
			<el-table-column label="基准日" width="90">
			  <template slot-scope="scope">
				{{formatDate(scope.row.subBaseDate)}}
			  </template>	
			</el-table-column>
	        <el-table-column label="项目名称" min-width="200px">
	          <template slot-scope="scope">
				{{ scope.row.subProjName }}
	          </template>
	        </el-table-column>
	        <el-table-column label="项目范围" min-width="200px">
	          <template slot-scope="scope">
				{{ scope.row.subProjScope }}
	          </template>
	        </el-table-column>
			<el-table-column
			  label="操作"
			  width="220"
			>
			  <template slot-scope="scope"> 
				
			    <el-button
			      type="primary"
				  size="mini"
			      @click="editPaySubProj(scope.row)"
			    >收费</el-button>
				
			    <el-button
			      type="primary"
				  size="mini"
			      @click="editBillSubProj(scope.row)"
			    >发票</el-button>
				
			    <el-button
			      type="warning"
				  size="mini"
			      @click="jumpToSubHandle(scope.row)"
			    >修改</el-button>
				
				<el-button
				  type="success"
				  size="mini"
				  @click="jumpToSubHandleCheck(scope.row)"
				>审核</el-button>
								
			    <el-button
			      type="primary"
				  size="mini"
			      @click="editProblemSubProj(scope.row)"
			    >记录</el-button>
			    <el-button
			      type="primary"
				  size="mini"
			      @click="editEvaluationSubProj(scope.row)"
			    >评价</el-button>
				
			  </template>
			</el-table-column>
			
			<el-table-column
			  label="进度"
			  width="80"
			>
			  <template slot-scope="scope">
			    <el-tag :type="newTagType(scope.row.subProjStatus.mainStatus)">{{newTagValue(scope.row.subProjStatus.mainStatus)}}</el-tag>
			  </template>
			</el-table-column>
	      </el-table>
	    </template>
	  </el-table-column>
	  
	    <!-- 
        <el-table-column
          prop="projState"
          label="项目状态"
          width="80"
          align="center"
        >
          <template slot-scope="props">
            <el-tag
                  :type="tagType(props.row.projState)"
                  disable-transitions
              >
                <span v-if="props.row.projState == 0">进行中</span>
                <span v-if="props.row.projState == 1">已完成</span>
                <span v-if="props.row.projState == 2">中止</span>
            </el-tag>
          </template>
        </el-table-column>
		 -->
        <el-table-column
          prop="projDate"
          label="编制日期"
          width="120"
          :formatter="this.$formatDate"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="projNum"
          label="计划编号"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="projName"
          label="项目名称"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <el-badge value="new" class="item" style="margin-top: 5px" v-if="scope.row.projDate > timestamp"></el-badge>
            {{scope.row.projName}}
          </template>
        </el-table-column>
        <el-table-column
          prop="projScope"
          label="项目范围"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="projLeader"
          label="项目负责人"
          width="110"
        >
        </el-table-column>
        <el-table-column
          prop="projReviewer"
          label="项目复核人"
          width="110"
        >
        </el-table-column>
        <el-table-column
          prop="projAsst"
          label="助理"
          width="110"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="projState"
          label="项目进度"
          width="90"
          align="center"
        >
          <template slot-scope="props">
            <el-tag type="primary">{{ props.row.projState }}</el-tag>
          </template>
        </el-table-column> -->
		
		<!-- 
        <el-table-column
          label="操作"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-s-order"
              @click="handleHandle(scope.row)"
              size="medium"
            >处理项目</el-button>
          </template>
        </el-table-column>
		 -->
      </el-table>
      <div class="pagination">
        <el-pagination
          :total="pageTotal"
          :current-page="currentPage"
          :page-size="pageSize"
          @current-change="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import {
  getAllAbstractProject,
  searchMyProject,
  getReportNum,
  createReportNum,
  alterProjType,
  getSubReportNum,
  addSubReportNum,
  deleteReportNum
} from '@/api/index'
import {getCurrentMission} from '@/api/statistics'
import { getSubProjectInfoList, getRegisterList } from '@/api/subReport'
export default {
  name: 'workbranch',
  data() {
    return {		
      currentPage: 1, // 当前页码
      pageSize: 50, // 每页的数据条数
      pageTotal: 0, // 数据数
      tableData: [],
      missionData: {},
      onGoing: false,
      typeOptions: [
        { value: '1010', label: '房地产' },
        { value: '1020', label: '资产' },
        { value: '1030', label: '土地' },
        { value: '1041', label: '房地产咨询' },
        { value: '1042', label: '资产咨询' },
        { value: '1043', label: '土地咨询' }
      ],
      getNumVisible: false,
      changeNumVisible: false,
      innerVisible: false,
      arrMemberVisible: false,
      changeType: {
        projId: '',
        toType: ''
      },
	  searchData:{
		projNum: '',
		reportNum: '',
		projName: '',
		projScope: '',  
	  },
	  
      midNum: 0,
      date1: '',
      getNumType: 0,
      getNumData: {},
      getSubNum: '',
      projLeaderFilter: [{ text: '我负责的项目', value: '' }],
      timestamp: 0,
	  
	  	  
	  //211028变动 新增: 多个公司切换	  
	  companyRange:['HZ', 'ZM','HZKJ'],
	  companyId:'',
	  companyTabsId: 0,
	  
	  //展开表格  
	  /* 
	  expands:{
	    expand_id:'',
	    expand_status:false,
	  },
	  */
	  expands: [],
	  
	  expandLoading:false,
	  
	  subProjdataList:[],
	  
	  //项目处理对话框
	  //发票开具
	  subBillInfoVisible:false,
	  subBillInfoTitle:'',
	  subBillInfoForm:{
		subProjId: "", //子项目id
		subProjNum: "", //子项目报告号
		subProjName: "", //项目名称
		subProjScope: "", //项目范围
		
		subProjFPTT: "", //归档发票抬头
		subProjFPJE: "", //已开发票金额
		subProjSJJE: "", //已开收据金额
	  },
	  subBillInfoRules:{
		  subProjFPTT:[{ required: true, message: '请输入归档发票抬头', trigger: 'blur' }],
		  subProjFPJE:[
			{ required: true, message: '请输入已开发票金额', trigger: 'blur' },
			{
				validator: (rule, value, callback) => {
					if(value){
						if (/^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/.test(value) == false) {
							callback(new Error("请输入正确金额"));
						} else {
							callback();
						}
					}else{
						callback();
					}
				}, trigger: 'blur',
			}
		  ],
		  subProjSJJE:[
			{
				validator: (rule, value, callback) => {
					if(value){
						if (/^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/.test(value) == false) {
							callback(new Error("请输入正确金额"));
						} else {
							callback();
						}
					}else{
						callback();
					}
				}, trigger: 'blur',
			}
		  ],
	  },
	  
	  //问题记录
	  subProblemInfoVisible:false,
	  subProblemInfoTitle:'',
	  subProblemInfoForm:{
		subProjId: "", //子项目id
		subProjNum: "", //子项目报告号
		subProjName: "", //项目名称
		subProjScope: "", //项目范围
		subProjDDMDJ: "", //底单没登记
		subProjCSJL: "", //催收记录
		subProjDJCWJL: "", //登记错误记录
	  },
	  subProblemInfoRules:{
	  },
	  
	  //收费录入
	  subPayInfoVisible:false,
	  subPayInfoTitle:'',
	  subPayInfoForm:{
		subProjId: "", //子项目id
		subProjNum: "", //子项目报告号
		subProjName: "", //项目名称
		subProjScope: "", //项目范围
		
		//subProjSFFS: ["现收","银收"],
		//subProjSFJE: "",
		subProjXSJE: "", //现收
		subProjYSJE: "", //银收
		subProjSFQK: "", //收费情况
		subProjSFJL: [], //收费记录
		subProjSFHJ: "", //收费合计
		
		subProjFPJE:"", //已开发票金额
	  },
	  subPayInfoRules:{
		/* 
		subProjSFFS:[
			{ required: true, message: '请选择收费方式', trigger: 'blur' },
		],  
		subProjSFJE:[
			{ required: true, message: '请输入收费金额', trigger: 'blur' },
			{
				validator: (rule, value, callback) => {
					if(value){
						if (/^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/.test(value) == false) {
							callback(new Error("请输入正确金额"));
						} else {
							callback();
						}
					}else{
						callback();
					}
				}, trigger: 'blur',
			}
		], 
		 */
		subProjXSJE:[
			{
				validator: (rule, value, callback) => {
					if(value){
						if (/^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/.test(value) == false) {
							callback(new Error("请输入正确金额"));
						} else {
							callback();
						}
					}else{
						callback();
					}
				}, trigger: 'blur',
			}
		], 
		subProjYSJE:[
			{
				validator: (rule, value, callback) => {
					if(value){
						if (/^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/.test(value) == false) {
							callback(new Error("请输入正确金额"));
						} else {
							callback();
						}
					}else{
						callback();
					}
				}, trigger: 'blur',
			}
		], 
		subProjSFHJ:[
			{
				validator: (rule, value, callback) => {
					if(value){
						if (/^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/.test(value) == false) {
							callback(new Error("请输入正确金额"));
						} else {
							callback();
						}
					}else{
						callback();
					}
				}, trigger: 'blur',
			}
		], 
	  },
	  subProjRuleNoReq:[
		{
			validator: (rule, value, callback) => {
				if(value){
					if (/^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/.test(value) == false) {
						callback(new Error("请输入正确金额"));
					} else {
						callback();
					}
				}else{
					callback();
				}
			}, trigger: 'blur',
		}  
	  ],
	  subProjRuleReq:[
		{ required: true, message: '请填写现收或银收',trigger: 'blur'},
		{
			validator: (rule, value, callback) => {
				if(value){
					if (/^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/.test(value) == false) {
						callback(new Error("请输入正确金额"));
					} else {
						callback();
					}
				}else{
					callback();
				}
			}, trigger: 'blur',
		}  
	  ],
    };
  },
  computed:{
  	newTagType(){
  		return (data)=>{
  			if(data == "0"){
  				return "info";
  			}else if(data == "1"){
  				return "";
  			}else if(data == "2"){
  				return "warning";
  			}else if(data == "3"){
  				return "success";
  			}else{
				return "info";
			}
  		}
  	},
	newTagValue(){
		return (data)=>{
			if(data == "0"){
				return "未提交";
			}else if(data == "1"){
				return "待审核";
			}else if(data == "2"){
				return "待修改";
			}else if(data == "3"){
				return "已通过";
			}else{
				return "未提交";
			}
		}
	},
  },
  created() {
	//211028变动 新增: 多个公司切换
	const value = localStorage.getItem('companyId');
	if(value){
		this.companyId = value;
		this.companyTabsId = this.companyRange.indexOf(this.companyId);
	}else{
		this.companyId = this.companyRange[0];
		this.companyTabsId = 0;
	}
	//console.log('初始化公司id', this.companyId);  
	
	//211202 处理页面跳转返回
	if(!this.pageInfoLoad()){
		this.getData()
	}	
	
    let date = new Date()
    this.timestamp = date.getTime() - date.getHours()*60*60*1000
    console.log(this.timestamp)
    this.projLeaderFilter[0].value = localStorage.getItem('staffName')
  },
  methods: {
    projLeaderFilterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    // deleteReportNum(reportNum) {
    //   deleteReportNum({ reportNum: reportNum }).then(res => {
    //     this.$message.success('删除成功');
    //     this.getNumVisible = false
    //     this.getData();
    //   }).catch(err => {
    //     this.$message.error('删除失败');
    //   })
    // },
	
	/* 
    alterProjType() {
      console.log('this.changeType', this.changeType);
      if (this.changeType.toType == '') {
        this.$message.info('请选择修改类型');
      } else {
        alterProjType(this.changeType)
          .then(res => {
            this.$message.success('修改成功');
            this.changeNumVisible = false;
            this.getData();
          })
          .catch(err => {
            this.$message.error('修改失败');
          });
      }
    },
	 */
	
    //完整号显示
    changeNum(num, type) {
      if (num) {
        const comp = '惠正';
        const year = '[' + num.substr(0, 4) + ']';
        const lastNum = '第' + num.substr(4) + '号';
        let midType = '';
        let numType = '';
        if (
          this.getNumData.projType == 1010 ||
          this.getNumData.projType == 1020 ||
          this.getNumData.projType == 1030
        ) {
          if (this.getNumData.projType == 1010) {
            midType = '房地';
          } else if (this.getNumData.projType == 1020) {
            midType = '土地';
          } else {
            midType = '资产';
          }
          if (type == 1) {
            numType = '初评字';
          } else if (type == 2) {
            numType = '估字';
          } else if (type == 3) {
            numType = '资字';
          }
        } else if (
          this.getNumData.projType == 1061 ||
          this.getNumData.projType == 1062 ||
          this.getNumData.projType == 1063
        ) {
          midType = '申报字';
        } else if (this.getNumData.projType == 1090) {
          midType = '绩效评字';
        } else if (
          this.getNumData.projType == 1050 ||
          this.getNumData.projType == 1080
        ) {
          midType = '资字';
        } else if (this.getNumData.projType == 1070) {
          midType = '测绘';
        } else if (this.getNumData.projType == 1100) {
          midType = '函';
        }
        if (type == 4) {
          midType = '函';
          numType = '';
        }
        return comp + midType + numType + year + lastNum;
      } else {
        return '';
      }
    },
    changeProjType(data) {
      console.log('data>>>', data);
      this.changeType.projId = data.projId;
      this.changeNumVisible = true;
      let selOption = this.typeOptions;
      const index = selOption.findIndex((item, index, arr) => {
        console.log('value>>>', item);
        return item.value == data.projType;
      });
      //selOption.splice(index, 1)
      this.typeOptions = selOption;
    },
    getData() {
	  /* 
      if (sessionStorage.getItem('page')) {
        this.changePage(parseInt(sessionStorage.getItem('page')));
        sessionStorage.removeItem('page');
      }
	  */
	  //220220 
	  this.expands = [];
	  /* 
	  this.expands = {
	    expand_id:'',
	    expand_status:false,
	  };
	 */
	  //211029变动 新增: 多个公司切换
	  
	  this.currentPage = 1;
	  this.tableData=[];
	  this.pageTotal = 0;
	  
      getRegisterList(this.searchData, this.companyId)
        .then(res => {
			
		  if(this.onGoing){
			let arr = []
			for(let i of res.data) {
			  if(i.projState == 0) {
			    arr.push(i)
			  }
			}
			this.tableData = arr;
			this.pageTotal = arr.length;  
		  }else{
			this.tableData = res.data;
			this.pageTotal = res.data.length;  
		  }
        })
        .catch(err => {
          console.log('field to search myproject');
        })
		
		//211029变动 新增: 多个公司切换
		const missionData = {
		} 
        getCurrentMission(missionData, this.companyId)
          .then(res => {
            this.missionData = res.data
            console.log(this.missionData)
          })
          .catch(err => {
            console.log('error', err)
          })
    },
	resetExpand(){
		/* 
		this.expands = {
		  expand_id:'',
		  expand_status:false,
		};
		 */
		this.expands = [];
	},
	/* 
    getOnGoingProj() {
      if (this.onGoing == true) {
		
		this.currentPage = 1;
		this.tableData=[];
		this.pageTotal = 0;
        searchMyProject(this.searchData, this.companyId)
        .then(res => {
          let arr = []
          for(let i of res.data) {
            if(i.projState == 0) {
              arr.push(i)
            }
          }
          this.tableData = arr;
		  this.pageTotal = arr.length;
        })
        .catch(err => {})
      } else {
        this.reset()
      }
    },
	 */
    showOnlyPl(){
      var list = this.tableData
    },
    reset() {
	  this.currentPage = 1;
	  this.tableData=[];
	  this.pageTotal = 0;
	  this.onGoing = false;
	  Object.keys(this.searchData).forEach(key => (this.searchData[key] = ''))
	  
      searchMyProject(this.searchData, this.companyId)
        .then(res => {
          console.log(res.data);
          this.tableData = res.data;
          this.pageTotal = res.data.length;
        })
        .catch(err => {
          console.log('field to search');
        });
    },
	/* 
    handleDetail(val) {
      sessionStorage.setItem('page', this.currentPage);
      // const index2 = (this.currentPage - 1)*10 + index
      console.log('当前行信息 >>>', val);
      this.$router.push({ path: '/projcheck', query: { data: val.projId } });
    },
	 */
    handleHandle(val) {
	  //211202 处理页面跳转返回
	  this.pageInfoSave();			
      //sessionStorage.setItem('page', this.currentPage);
	  
	  const key = this.newCode(val.projId);
	  
	  this.$router.push({ path: '/workhandlecheck', query: { data: key } })
    },
    changePage(val) {
      console.log(val);
      this.currentPage = val;
	  
	  //220220
	  this.resetExpand();
    },
    tagType(val) {
      if (val == 0) {
        return 'primary'
      } else if (val == 1) {
        return 'success'
      } else if (val == 2) {
        return 'danger'
      }
    },
	
	//211028变动 新增: 多个公司切换
	handleTabsClick(tab, event) {
	  //console.log("切换到: ", tab.label, tab.name);
	  this.$message.success('切换到: ' + tab.label);
	  
	  //1.companyTabsId, 修改公司数组序号id
	  this.companyTabsId = this.companyRange.indexOf(this.companyId);
	  
	  //2. localStorage 将该公司id存储起来, 其他页面也是显示该公司信息
	  localStorage.setItem('companyId', tab.name);
	  console.log('公司id', localStorage.getItem('companyId'));
	  
	  //3. this.getData 重新读取该公司项目数据, 重置分页	  
	  
	  this.reset(); //根据公司id获取对应项目数据
	 
	}, 
	
	
	//211202 处理页面跳转返回
	pageInfoLoad(){
		//const workbranch_pageinfo = JSON.parse(sessionStorage.getItem('workbranch_pageinfo'));
		const workbranch_pageinfo = JSON.parse(this.global.workbranch_pageinfo);
		if(workbranch_pageinfo){
		  if(workbranch_pageinfo.status){
			//赋值		
			this.tableData = workbranch_pageinfo.data;
			
			this.pageTotal = workbranch_pageinfo.pageData.pageTotal;
			this.currentPage = workbranch_pageinfo.pageData.currentPage;
			this.pageSize = workbranch_pageinfo.pageData.pageSize;
			
			this.searchData = workbranch_pageinfo.searchData;
			
			this.onGoing = workbranch_pageinfo.onGoing;
		  }
		  //删除
		  this.global.workbranch_pageinfo = null;
		  return true;
		}else{
		  return false;
		}
	},
	
	pageInfoSave(){
	  const workbranch_pageinfo ={
		searchData: this.searchData,
		pageData: {
			pageTotal: this.pageTotal,
			currentPage: this.currentPage,
			pageSize: this.pageSize,
		},
		data: this.tableData,
		onGoing: this.onGoing,
	    status:0
	  };
	  //sessionStorage.setItem('workbranch_pageinfo', JSON.stringify(workbranch_pageinfo));
	  this.global.workbranch_pageinfo = JSON.stringify(workbranch_pageinfo);
	},
		
	//211210变动 query加密
	newCode(data){
	  data = ""+data;
	  if(data){
	    const key = CryptoJS.enc.Utf8.parse('65201488');
	    const iv = CryptoJS.enc.Utf8.parse('45872411');
	
	    const encrypted = CryptoJS.TripleDES.encrypt(
	      data,
	      key,
	      {
	        iv: iv,
	        mode: CryptoJS.mode.CBC,
	        padding: CryptoJS.pad.Pkcs7,
	      },
	    );
	  	return encrypted.toString();
	  }
	},
	
	
	//展开行
	
	rowClick(row,index) {
	  this.$refs.table.toggleRowExpansion(row)
	},
	
	expandChange(row,expandedRows) {
		
			console.log(row, expandedRows)
		
	  if (expandedRows.length) {
	    this.expands = []
	    if (row) {
	      this.expands.push(row.projId)// 每次push进去的是每行的ID
		  
		  //读取数据...
		  this.getTableInfo(row.projId);
	    }
	  } else {
	    this.expands = []// 默认不展开
	    this.evalObj = []
	    return
	  }
	},	
	
	getRowKeys(row) {
	  return row.projId
	},
	  
	getTableInfo(projId){
		const projData = {
			projId: projId,
		}
		getSubProjectInfoList(projData, this.companyId)
		.then(res => {
		    this.subProjdataList = res.data
		})
		.catch(err => {
		})
	},
	handleClick(data){
	  console.log(data);
	},
	
	//子项目处理按钮  
	//跳转正评修改页
	jumpToSubHandle(subData) {
		this.$router.push({ path: '/worksubhandle', query: { projId: subData.projId, data: subData.subProjId } })
	},
	//跳转正评审核页
	jumpToSubHandleCheck(subData) {
		if(subData.subProjStatus.mainStatus == "1"){
			this.$router.push({ path: '/worksubhandlecheck', query: { projId: subData.projId, data: subData.subProjId } })
		}else{
			this.$message.warning("请等待子项目正评提交后再审核")
		}
		
		
	},
	
	editPaySubProj(subData) {
		//this.$message("收费录入")
		this.resetExpand();
		this.subPayInfoTitle = "".concat("计划编号:", subData.projId, subData.subProjNum?" 子报告号:"+subData.subProjNum:"");
		
		//初始化表单
		const subPayInfoForm={
			subProjId: subData.projId, //子项目id
			subProjNum: subData.subProjNum, //子项目报告号
			subProjName: subData.subProjName, //项目名称
			subProjScope: subData.subProjScope, //项目范围
			
			subProjXSJE: subData.subProjXSJE, //现收
			subProjYSJE: subData.subProjYSJE, //银收
			subProjSFQK: subData.subProjSFQK, //收费情况
			subProjSFJL: subData.subProjSFJL, //收费记录
			subProjSFHJ: subData.subProjSFHJ, //收费合计
			
			subProjFPJE: subData.subProjFPJE,//已开发票金额
		}		
		this.subPayInfoForm = subPayInfoForm;
		
		this.subPayInfoVisible = true
	},
	editBillSubProj(subData) {
		//this.$message("发票开具")
		this.resetExpand();
		this.subBillInfoTitle = "".concat("计划编号:", subData.projId, subData.subProjNum?" 子报告号:"+subData.subProjNum:"");
		
		//初始化表单
		const subBillInfoForm={
			subProjId: subData.projId, //子项目id
			subProjNum: subData.subProjNum, //子项目报告号
			subProjName: subData.subProjName, //项目名称
			subProjScope: subData.subProjScope, //项目范围
			
			subProjFPTT: subData.subProjFPTT, //归档发票抬头
			subProjYSJE: subData.subProjYSJE, //已开发票金额
			subProjSJJE: subData.subProjSJJE, //已开收据金额
		}		
		this.subBillInfoForm = subBillInfoForm;
		
		this.subBillInfoVisible = true
	},
	editProblemSubProj(subData) {
		//this.$message("问题记录")
		this.resetExpand();
		this.subProblemInfoTitle = "".concat("计划编号:", subData.projId, subData.subProjNum?" 子报告号:"+subData.subProjNum:"");
		
		//初始化表单
		const subProblemInfoForm={
			subProjId: subData.projId, //子项目id
			subProjNum: subData.subProjNum, //子项目报告号
			subProjName: subData.subProjName, //项目名称
			subProjScope: subData.subProjScope, //项目范围
			
			subProjDDMDJ: subData.subProjDDMDJ, //底单没登记
			subProjCSJL: subData.subProjCSJL, //催收记录
			subProjDJCWJL: subData.subProjDJCWJL, //登记错误记录			
		}		
		this.subProblemInfoForm = subProblemInfoForm;
		
		this.subProblemInfoVisible = true
	},
	editEvaluationSubProj(subData) {
		this.resetExpand();
		this.$message("项目评价")
		//this.$router.push({ path: '/worksubhandlecheck', query: { projId: projId, data: val } })
	},
	
	//弹出框提交
	subBillInfoEdit(){
		this.$refs.subBillInfoForm.validate((valid) => {
			if (valid) {
				this.$message('可以提交');
				console.log('subBillInfo', this.subBillInfoForm);
			}else{
				this.$message('请填写必填信息或格式有误');
			}
		})
	},
	subProblemInfoEdit(){
		this.$refs.subProblemInfoForm.validate((valid) => {
			if (valid) {
				this.$message('可以提交');
				console.log('subProblemInfo', this.subProblemInfoForm);
			}else{
				this.$message('请填写必填信息或格式有误');
			}
		})
	},
	subPayInfoEdit(){
		/* 
		if(!(this.subPayInfoForm.subProjXSJE || this.subPayInfoForm.subProjYSJE)){
			this.$message('请填写现收或银收');
			return;
		}
		 */
		
		this.$refs.subPayInfoForm.validate((valid) => {
			if (valid) {
				this.$message('可以提交');
				console.log('subPayInfo', this.subPayInfoForm);
			}else{
				this.$message('请填写必填信息或格式有误');
			}
		})
	},
	
	formatDate(now) {
	  const time = new Date(now)
	  var year = time.getFullYear();  //取得4位数的年份
	  var month = time.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
	  var date = time.getDate();      //返回日期月份中的天数（1到31）
	  var hour = time.getHours();     //返回日期中的小时数（0到23）
	  return year + "-" + month + "-" + date
	},
  }
}
</script>

<style scoped>
.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.table {
  width: 100%;
  margin-top: 10px;
  font-size: 14px;
}

.search {
  margin-top: 20px;
}
.dialog-item {
  margin-top: 20px;
  width: 90%;
}
.right-button {
  float: right;
}


/deep/ .el-form-item__label {
  color: #000;
  font-size: 16px;
}

/deep/ .red-item .el-form-item__label {
  color: #ed1941;
}

</style>