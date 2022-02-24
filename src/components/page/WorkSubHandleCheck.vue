<template>
  <div class="container">
    <el-page-header @back="goBack"></el-page-header>
    <div class="work-title">
      <span class="work-title-name">子项目信息 <el-tag :type="newButtonType(subInfoForm.status)" plain size="medium">{{newButtonValue(subInfoForm.status)}}</el-tag></span>
	  <span class="work-title-button">
	    <el-button
	        size="medium"
			icon="el-icon-upload2"
			type="warning"
		    @click="importSubProj(projId,subProjId)"
	    >导入</el-button>
		<el-button
		    size="medium"
			icon="el-icon-download"
			type="primary"
		    @click="exportSubProj(projId,subProjId)"
		>导出</el-button>
	  </span>
    </div>
	
	<el-form
		ref="subInfoForm"
		:model="subInfoForm"
		label-width="125px"
		:rules="subInfoRules"
		v-if="subInfoForm"
	>
		<el-divider>特有信息</el-divider>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="委托方" prop="regClientName" class="red-item">
					<el-input v-model="subInfoForm.regClientName" disabled style="width: 100%" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="委托方性质" prop="regClientType" class="red-item">
					<el-select
						v-model="subInfoForm.regClientType"
					>
						<el-option
							v-for="item, index in regClientTypeOption"
							:key="index"
							:label="item"
							:value="item"
						>
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="被评估单位" prop="regEvaluatedUnit" class="red-item">
					<el-input v-model="subInfoForm.regEvaluatedUnit" style="width: 100%" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="评估对象" prop="regEvalObject" class="red-item">
					<el-cascader
						v-model="subInfoForm.regEvalObject"
						style="width: 100%"
						:props="{ expandTrigger: 'hover', value:'label', label:'label' }"
						filterable
						:options="regEvalObjectOption"
						@change="regEvalObjectHandleChange"
					>
					</el-cascader>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="行政区域" prop="regAdminRegion" class="red-item">
				  <el-cascader
				    v-model="subInfoForm.regAdminRegion"
				    style="width: 100%"
					:props="{ expandTrigger: 'hover', value:'label', label:'label' }"
				    filterable
				    :options="regAdminRegionOption"
					@change="regAdminRegionHandleChange"
				  >
				  </el-cascader>
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="数量" prop="regEvalObjCount" class="red-item">
					<el-input v-model="subInfoForm.regEvalObjCount" style="width: 100%" clearable
					oninput="value=value.replace(/[^\d]/g,'')"
					:min="1"
					type="number"></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-divider>报告信息</el-divider>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="评估目的" prop="regEvalGoal" class="red-item">
					<el-select	v-model="subInfoForm.regEvalGoal"  style="width: 100%;">
						<el-option
							v-for="item, index in regEvalGoalOption"
							:key="index"
							:label="item"
							:value="item"
						>
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="评估方法" prop="regEvalMethod" class="red-item">
					<el-select
						v-model="subInfoForm.regEvalMethod"
						multiple
						filterable
						allow-create
						style="width: 100%;"
					>
						<el-option
							v-for="item, index in regEvalMethodOption"
							:key="index"
							:label="item"
							:value="item"
						>
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="出报告日期" prop="regReportIssueDate" class="red-item">
					<el-date-picker
					  type="date"
					  value-format="yyyy-MM-dd"
					  style="width: 100%"
					  v-model="subInfoForm.regReportIssueDate"
					></el-date-picker>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="评估结论" prop="regEvalConclusion" class="red-item">
					<el-select
						v-model="subInfoForm.regEvalConclusion"
					>
						<el-option
							v-for="item, index in regEvalConclusionOption"
							:key="index"
							:label="item"
							:value="item"
						>
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="资产总值(元)" prop="regTotalAssets" class="red-item">
					<el-input v-model="subInfoForm.regTotalAssets" style="width: 100%" clearable
					oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="负债总值(元)" prop="regTotalDebts">
					<el-input v-model="subInfoForm.regTotalDebts" style="width: 100%" clearable
					oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="所有者权益(元)" prop="regOwnersEquity">
					<el-input v-model="subInfoForm.regOwnersEquity" style="width: 100%" clearable
					oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-divider>其他信息</el-divider>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-form-item label="报备号" prop="regRecordNum">
					<el-input v-model="subInfoForm.regRecordNum" style="width: 100%" clearable></el-input>
				</el-form-item>
			</el-col>			
			<el-col :span="8">
				<el-form-item label="合同号" prop="regContractNum" class="red-item">
					<div
					v-if="subInfoForm.regContractNum">
						<el-input v-model="subInfoForm.regContractNum" disabled style="width: 100%" clearable></el-input>
					</div>
					<el-tooltip class="item" effect="dark" content="请先返回, 取合同号" placement="top-end"
					v-else>
						<el-input v-model="subInfoForm.regContractNum" disabled style="width: 100%" clearable></el-input>
					</el-tooltip>
				</el-form-item>
			</el-col>		
			<el-col :span="8">
				<el-form-item label="项目类型" prop="regArrgType" class="red-item">
					<el-select
						v-model="subInfoForm.regArrgType"
						disabled
					>
						<el-option
							v-for="item, index in regArrgTypeOption"
							:key="index"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>	
			<el-col :span="8">
				<el-form-item label="摇珠单/委托书" prop="regEntrustLetterNum">
					<el-input v-model="subInfoForm.regEntrustLetterNum" style="width: 100%" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="摇珠/委托时间" prop="regEntrustTime">
					<el-date-picker
					  type="date"
					  value-format="yyyy-MM-dd"
					  style="width: 100%"
					  v-model="subInfoForm.regEntrustTime"
					></el-date-picker>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="外协情况" prop="regOutsourceStatus">
					<el-input v-model="subInfoForm.regOutsourceStatus" style="width: 100%" clearable></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-divider>项目组成员信息</el-divider>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-form-item label="项目负责人" prop="regProjLeader" class="red-item">
					<el-select
						v-model="subInfoForm.regProjLeader"
						style="width: 100%;"
						multiple
						clearable
					>
						<el-option
							v-for="item, index in subTeamOption"
							:key="index"
							:label="item"
							:value="item"
						>
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="签字估价师" prop="regSignedAppraiser" class="red-item">
					<el-select
						v-model="subInfoForm.regSignedAppraiser"
						style="width: 100%;"
						multiple
						clearable
					>
						<el-option
							v-for="item, index in subTeamOption"
							:key="index"
							:label="item"
							:value="item"
						>
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="专业复核人" prop="regProjProReviewer">
					<el-select
						v-model="subInfoForm.regProjProReviewer"
						style="width: 100%;"
						multiple
						clearable
					>
						<el-option
							v-for="item, index in subTeamOption"
							:key="index"
							:label="item"
							:value="item"
						>
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="现勘" prop="regFieldSrvy" class="red-item">
					<el-select
						v-model="subInfoForm.regFieldSrvy"
						style="width: 100%;"
						multiple
						clearable
					>
						<el-option
							v-for="item, index in subTeamOption"
							:key="index"
							:label="item"
							:value="item"
						>
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="资料收集验证" prop="regInfoVerification" class="red-item">
					<el-select
						v-model="subInfoForm.regInfoVerification"
						style="width: 100%;"
						multiple
						clearable
					>
						<el-option
							v-for="item, index in subTeamOption"
							:key="index"
							:label="item"
							:value="item"
						>
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="市场询价调查" prop="regMarketEnquiry" class="red-item">
					<el-select
						v-model="subInfoForm.regMarketEnquiry"
						style="width: 100%;"
						multiple
						clearable
					>
						<el-option
							v-for="item, index in subTeamOption"
							:key="index"
							:label="item"
							:value="item"
						>
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="技术说明" prop="regTechExpDrafter" class="red-item">
					<el-select
						v-model="subInfoForm.regTechExpDrafter"
						style="width: 100%;"
						multiple
						clearable
					>
						<el-option
							v-for="item, index in subTeamOption"
							:key="index"
							:label="item"
							:value="item"
						>
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="报告拟稿" prop="regReportDrafter" class="red-item">
					<el-select
						v-model="subInfoForm.regReportDrafter"
						style="width: 100%;"
						multiple
						clearable
					>
						<el-option
							v-for="item, index in subTeamOption"
							:key="index"
							:label="item"
							:value="item"
						>
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="助理(归档)" prop="regProjArchive" class="red-item">
					<el-select
						v-model="subInfoForm.regProjArchive"
						style="width: 100%;"
						multiple
						clearable
					>
						<el-option
							v-for="item, index in subTeamOption"
							:key="index"
							:label="item"
							:value="item"
						>
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="收费跟进" prop="regFeeFollowUp" class="red-item">
					<el-select
						v-model="subInfoForm.regFeeFollowUp"
						style="width: 100%;"
						multiple
						clearable
					>
						<el-option
							v-for="item, index in subTeamOption"
							:key="index"
							:label="item"
							:value="item"
						>
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="总审" prop="regFinalReview" class="red-item">
					<el-select
						v-model="subInfoForm.regFinalReview"
						style="width: 100%;"
						clearable
					>
						<el-option
							v-for="item, index in regFinalReviewOption"
							:key="index"
							:label="item"
							:value="item"
						>
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
		
	<el-divider></el-divider>
	<div style="text-align: center;">
		<el-button-group>
			<el-button :type="newButtonType(subInfoForm.status)" plain size="medium">{{newButtonValue(subInfoForm.status)}}</el-button>
			<el-button type="primary" icon="el-icon-check" size="medium" @click.native="subInfoFormSubmit()">确认提交</el-button>
		</el-button-group>
	</div>
  </div>
</template>

<script>
import cityOptions from '../../../public/city.json'
//api
import { getWorkAssignment } from '@/api/index'
import { getSubProjectInfoList, editSubProject, getSubProjectInfo, addSubProjectRegister, editSubProjectRegister, getSubProjectRegisterInfo} from '@/api/subReport'
import { getDetailProjInfo} from '@/api/index'
export default {
	name: 'subworkhandle',
	data() {
		return {
			projId:'',
			subProjId:'',
			
			labelStyle:{
				'font-size':'16px', 
				/* 'width': '100px' */
				/* 'color':'#333', */
			},
			
			percentage:0,
			percentagecolors: [
			  {color: '#e6a23c', percentage: 26},
			  {color: '#6f7ad3', percentage: 51},
			  {color: '#1989fa', percentage: 76},
			  {color: '#5cb87a', percentage: 100},
			],
			
			subInfoForm:{},
			isEdit:false,
						
			//表单验证规则
			subInfoRules:{
				//subSpecialInfoRules特有信息
				regEvaluatedUnit:[{ required: true, message: '请输入被评估单位', trigger: 'blur' }],
				regEvalObject:[{ required: true, message: '请选择评估对象', trigger: 'blur' }],
				//regEvalObject1:[{ required: true, message: '请选择评估对象1', trigger: 'blur' }],
				//regEvalObject2:[{ required: true, message: '请选择评估对象2', trigger: 'blur' }],
				regClientName:[{ required: true, message: '请输入委托方', trigger: 'blur' }],
				regClientType:[{ required: true, message: '请选择委托方性质', trigger: 'blur' }],
				regAdminRegion:[{ required: true, message: '请选择行政区域', trigger: 'blur' }],
				regEvalObjCount:[{ required: true, message: '请输入数量', trigger: 'blur' }],
				
				//subReportInfoRules报告信息
				regEvalGoal:[{ required: true, message: '请选择评估目的', trigger: 'blur' }],
				regEvalMethod:[{ required: true, message: '请输入评估方法', trigger: 'blur' }],
				regReportIssueDate:[{ required: true, message: '请选择出报告日期', trigger: 'blur' }],
				regEvalConclusion:[{ required: true, message: '请选择评估结论', trigger: 'blur' }],
				regTotalAssets:[
					{ required: true, message: '请输入资产总值', trigger: 'blur' },
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
				regTotalDebts:[
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
				regOwnersEquity:[
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
				
				//subOtherInfoRules其他信息
				regContractNum:[{ required: true, message: '请在前页面取合同号', trigger: 'blur' }],
				regArrgType:[{ required: true, message: '请联系计划部门选择项目类型', trigger: 'blur' }],
				
				//subTeamInfoRules项目组信息
				regProjLeader:[{ required: true, message: '请选择项目负责人', trigger: 'blur' }],
				regSignedAppraiser:[{ required: true, message: '请选择签字估价师', trigger: 'blur' }],
				//regProjProReviewer:[{ required: true, message: '请选择专业复核人', trigger: 'blur' }],
				regFieldSrvy:[{ required: true, message: '请选择现勘', trigger: 'blur' }],
				regInfoVerification:[{ required: true, message: '请选择资料收集及验证', trigger: 'blur' }],
				regMarketEnquiry:[{ required: true, message: '请选择市场询价调查', trigger: 'blur' }],
				regTechExpDrafter:[{ required: true, message: '请选择技术说明', trigger: 'blur' }],
				regReportDrafter:[{ required: true, message: '请选择报告拟稿', trigger: 'blur' }],
				regProjArchive:[{ required: true, message: '请选择助理(归档)', trigger: 'blur' }],
				regFeeFollowUp:[{ required: true, message: '请选择收费跟进', trigger: 'blur' }],
				regFinalReview:[{ required: true, message: '请选择总审', trigger: 'blur' }],
				
			},
			
			//下拉选项
			//委托方性质	
			regClientTypeOption:['国有企业','集体所有制企业','民营企业','外资企业','政府机构','事业单位','社会组织','个人','国有控股','国有参股'],
		
			//评估对象
			regEvalObjectOption:[
				{
					"label": "企业价值",
					"children": [{"label": "企业全部资产及负债"},{"label":"股东全部权益价值"},{"label":"股东部分权益价值"}],
				},
				{
					"label": "单项资产",
					"children": [{"label": "房建类"},{"label": "设备类"},{"label": "存货类"},{"label": "其他单项资产"}],
				},
				{
					"label": "资产组合",
					"children":[{"label": "实物资产组合"},{"label": "实物资产与无形资产组合"},{"label": "实物资产与权利义务组合"},{"label": "无形资产与权利义务组合"},{"label": "其他资产组合"}],
				},
				{
					"label": "无形资产",
					"children":[{"label": "专利权"},{"label": "专有技术"},{"label": "著作权"},{"label": "特许经营权"},{"label": "商标权"},{"label": "商誉"},{"label": "土地使用权"},{"label": "水域使用权"},{"label": "海域使用权"},{"label": "岸线使用权"},{"label": "采矿权"},{"label": "探矿权"},{"label": "许可使用权"},{"label": "无形资产组合"},{"label": "其他无形资产"}],
				},
				{
					"label": "森林资源资产",
					"children":[{"label": "林木所有权"},{"label": "林木使用权"},{"label": "林地使用权"},{"label": "林木所有权/使用权与林地使用权组合"},{"label": "森林生态价值"},{"label": "生态补偿价值"}],
				},
				{
					"label": "珠宝首饰艺术品",
					"children":[{"label": "珠宝首饰艺术品"}],
				},
				{
					"label": "其他资产评估",
					"children":[{"label": "碳排放权"},{"label": "计税价格"},{"label": "经营损失"},{"label": "环境损失"},{"label": "其他"}],
				}
			],
			
			regEvalObject1Option:['企业价值','单项资产','资产组合','无形资产','森林资源资产','珠宝首饰艺术品','其他资产评估'],
			regEvalObject2Option:{
				'企业价值':['企业全部资产及负债','股东全部权益价值','股东部分权益价值'],
				'单项资产':['房建类','设备类','存货类','其他单项资产'],
				'资产组合':['实物资产组合','实物资产与无形资产组合','实物资产与权利义务组合','无形资产与权利义务组合','其他资产组合'],
				'无形资产':['专利权','专有技术','著作权','特许经营权','商标权','商誉','土地使用权','水域使用权','海域使用权','岸线使用权','采矿权','探矿权','许可使用权','无形资产组合','其他无形资产'],
				'森林资源资产':['林木所有权','林木使用权','林地使用权','林木所有权/使用权与林地使用权组合','森林生态价值','生态补偿价值'],
				'珠宝首饰艺术品':['珠宝首饰艺术品'],
				'其他资产评估':['碳排放权','计税价格','经营损失','环境损失','其他'],
			},
			
			//评估目的
			regEvalGoalOption:['IPO上市','公司制改建','对外投资','接受投资','合并、分立、破产、清算、解散','股东股权比例变动','产权转让','上市公司发行股份购买资产','资产转让、置换、拍卖','资产抵押/质押','资产捐赠','资产租赁','资产补偿/损失补偿','资产偿债','资产涉讼','资产收购','接受抵债资产','债转股','债务重组及其他','追溯评估','复核报告','了解价值','财务会计报告目的','计税价格评估','认定报关价格','其他'],
			regEvalMethodOption:['成本法/资产基础法','市场法','收益法','其他'],
			regEvalConclusionOption:['确定值','区间值'],
			
			//行政区域
			regAdminRegionOption:[],
			/* 
			regAdminRegion1Option:['惠州市','深圳市'],
			regAdminRegion2Option:{
				'惠州市':['惠城区','龙门县'],
				'深圳市':['龙岗','南山'],
			},
			 */
			
			//项目类型
			regArrgTypeOption:[
				{
					'label':'L (轮序)',
					'value':'L',
				},
				{
					'label':'A (安排)',
					'value':'A',
				}
			],
			
			//项目组成员
			regProjLeaderOption:[],
			regSignedAppraiserOption:[],
			regProjProReviewerOption:[],
			regFieldSrvyOption:[],
			regInfoVerificationOption:[],
			regMarketEnquiryOption:[],
			regTechExpDrafterOption:[],
			regReportDrafterOption:[],
			regProjArchiveOption:[],
			regFeeFollowUpOption:[],
			subTeamOption:[],
			regFinalReviewOption:['张建文','刘志远'],
			
			//远程数据
			subProjData:{},
			workAssignmentData:{},
			
			
			//211101变动 新增: 多个公司切换
			companyRange:['HZ', 'ZM','HZKJ'],
			companyId:'',
			companyTabsId: 0,
		}
	},
	computed:{
		newButtonType(){
			return (data)=>{
				if(data == "1"){
					return "primary";
				}else if(data == "2"){
					return "success";
				}else if(data == "2"){
					return "warning";
				}else{
					return "info";
				}
			}
		},
		newButtonValue(){
			return (data)=>{
				if(data == "1"){
					return "待审核";
				}else if(data == "2"){
					return "已通过";
				}else if(data == "3"){
					return "待修改";
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
		
		//读取传参
		this.projId = this.$route.query.projId;
		this.subProjId = this.$route.query.data;
		console.log(this.projId, this.subProjId);
		
		this.regAdminRegionOption = cityOptions;
						
		//读取远程数据
		this.getSubProjData(this.projId, this.subProjId);
	},
	methods: {
		goBack() {
			this.$router.go(-1)
		},
		
		formatDate(now) {
		  const time = new Date(now)
		  var year = time.getFullYear();  //取得4位数的年份
		  var month = time.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
		  var date = time.getDate();      //返回日期月份中的天数（1到31）
		  var hour = time.getHours();     //返回日期中的小时数（0到23）
		  return year + "-" + month + "-" + date
		},
				
		format(percentage) {
			return percentage === 100 ? '可提交' : `${percentage}%`;
		},
		
		//级联选择变动
		regAdminRegion1HandleChange(){
			this.subInfoForm.regAdminRegion2 = '';
		},
		
		regEvalObjectHandleChange(val){
			if(val){
				this.subInfoForm.regEvalObject1 = val[0];
				this.subInfoForm.regEvalObject2 = val[1];
			}
		},
		regAdminRegionHandleChange(val){
			if(val){
				this.subInfoForm.regAdminRegion1 = val[0];
				this.subInfoForm.regAdminRegion2 = val[1];
				this.subInfoForm.regAdminRegion3 = val[2];
			}
		},
		
		//提交		
		subInfoFormSubmit(){
			this.$refs.subInfoForm.validate((valid) => {
				if (valid) {
					//远程更新
					var subData = Object.assign({}, this.subInfoForm);
					//数组转字符串
					subData.regAdminRegion = subData.regAdminRegion?subData.regAdminRegion.join(','):'';					
					subData.regEvalObject  = subData.regEvalObject?subData.regEvalObject.join(','):'';	
								
					subData.regEvalMethod  = subData.regEvalMethod?subData.regEvalMethod.join(','):'';	
					
					subData.regProjLeader  = subData.regProjLeader?subData.regProjLeader.join(','):'';	
					subData.regSignedAppraiser  = subData.regSignedAppraiser?subData.regSignedAppraiser.join(','):'';	
					subData.regProjProReviewer  = subData.regProjProReviewer?subData.regProjProReviewer.join(','):'';				
					subData.regFieldSrvy = subData.regFieldSrvy?subData.regFieldSrvy.join(','):'';			
					subData.regInfoVerification  = subData.regInfoVerification?subData.regInfoVerification.join(','):'';
					subData.regMarketEnquiry  = subData.regMarketEnquiry?subData.regMarketEnquiry.join(','):'';		
					subData.regTechExpDrafter  = subData.regTechExpDrafter?subData.regTechExpDrafter.join(','):'';		
					subData.regReportDrafter = subData.regReportDrafter?subData.regReportDrafter.join(','):'';	
					subData.regProjArchive  = subData.regProjArchive?subData.regProjArchive.join(','):'';		
					subData.regFeeFollowUp  = subData.regFeeFollowUp?subData.regFeeFollowUp.join(','):'';					
										
					if(this.isEdit){
						editSubProjectRegister(subData, this.companyId)
						.then(res => {
						    this.$message.success('项目正评信息修改成功')
							
							//刷新表单
							this.getSubProjData(this.projId, this.subProjId);
						})
						.catch(err => {
						})
					}else{
						addSubProjectRegister(subData, this.companyId)
						.then(res => {
						    this.$message.success('项目正评信息添加成功')
							
							//刷新表单
							this.getSubProjData(this.projId, this.subProjId);
						})
						.catch(err => {
						})
					}
					
				}else{
					this.$message('请填写必填信息或格式有误');
				}
			})
		},
				
		//测试用改变进度条
		percentageHandleChange(subInfo){
			subInfo.status = "1"
			this.setPercentage();
		},
		
		setPercentage(){
			this.percentage = (parseInt(this.subSpecialInfo.status) + parseInt(this.subReportInfo.status) + parseInt(this.subOtherInfo.status) + parseInt(this.subTeamInfo.status)) * 25;
		},
		
		//远程调用
		getSubProjData(projId, subProjId){
			//获取项目组数据
			const subData = {
				projId: projId,
				subProjId: subProjId
			}			
			getSubProjectRegisterInfo(subData, this.companyId)
			.then(res => {
				if (res.statusCode == 200) {
					if(res.data){
						//情况1 修改: 有数据时, 使用子项目信息
						this.isEdit = true;
						console.log("有数据", res.data);
						
						//1. 传值
						var spFullData = Object.assign({}, res.data)
						
						//字符串转数组
						spFullData.regEvalObject = spFullData.regEvalObject?spFullData.regEvalObject.split(','):'';
						spFullData.regAdminRegion = spFullData.regAdminRegion?spFullData.regAdminRegion.split(','):'';
						spFullData.regEvalMethod = spFullData.regEvalMethod?spFullData.regEvalMethod.split(','):'';
												
						spFullData.regProjLeader = spFullData.regProjLeader?spFullData.regProjLeader.split(','):'';
						spFullData.regSignedAppraiser = spFullData.regSignedAppraiser?spFullData.regSignedAppraiser.split(','):'';
						spFullData.regProjProReviewer = spFullData.regProjProReviewer?spFullData.regProjProReviewer.split(','):'';
						spFullData.regFieldSrvy = spFullData.regFieldSrvy?spFullData.regFieldSrvy.split(','):'';
						spFullData.regInfoVerification = spFullData.regInfoVerification?spFullData.regInfoVerification.split(','):'';
						spFullData.regMarketEnquiry = spFullData.regMarketEnquiry?spFullData.regMarketEnquiry.split(','):'';
						spFullData.regTechExpDrafter = spFullData.regTechExpDrafter?spFullData.regTechExpDrafter.split(','):'';
						spFullData.regReportDrafter = spFullData.regReportDrafter?spFullData.regReportDrafter.split(','):'';
						spFullData.regProjArchive = spFullData.regProjArchive?spFullData.regProjArchive.split(','):'';
						spFullData.regFeeFollowUp = spFullData.regFeeFollowUp?spFullData.regFeeFollowUp.split(','):'';
						
						this.subInfoForm = spFullData;
												
						//2. 生成各字段option
						this.getSubProjectData(projId, subProjId, (spData)=>{
							//设置项目组选项
							const teamOptionInfo = (spData.subProjLeader+","+spData.subProjReviewer+","+spData.subProjProReviewer+","+spData.subProjAsst+","+spData.subFieldSrvy).replace(",,",",")
							this.subTeamOption = Array.from(new Set(teamOptionInfo.split(',')));
						});
						
					}else{
						//情况2 新增: 没数据时, 使用计划信息, 子项目基本信息, 安排信息, 合成初始化数据
						this.isEdit = false;
						//1 获取计划信息, 子项目基本信息, 安排信息
						this.getDetailProjData(projId, (dpData)=>{
							this.getSubProjectData(projId, subProjId, (spData)=>{
								this.getWorkAssignmentData(projId, subProjId, (waData)=>{
									console.log('dpData', dpData);
									console.log('spData', spData);
									console.log('waData', waData);
									
									//初始化表单
									this.subInfoForm={
										//subBasicInfo
										subProjId: "", //子项目id
										subProjNum: "", //子项目号
										subProjName: "", //项目名称
										subProjScope: "", //项目范围
										subBaseDate: "", //基准日
										
										//subSpecialInfo
										regClientName:"",
										regClientType:"", //委托方性质
										regEvaluatedUnit:"", //被评估单位
										regEvalObject:[],  //评估对象
											regEvalObject1:"", //评估对象1
											regEvalObject2:"", //评估对象2
										regEvalObjCount:"", //数量
										regAdminRegion:[], //行政区域 省市区
											regAdminRegion1:"", //行政区域1 省
											regAdminRegion2:"", //行政区域2 城市
											regAdminRegion3:"", //行政区域3 县区
									
										//subReportInfo
										regEvalGoal:"", //评估目的
										regEvalMethod:[], //"市场法"
										regReportIssueDate:"", //出报告日期
										regEvalConclusion:"", //评估结论			
										regTotalAssets:"", //资产总值
										regTotalDebts:"", //负债总值
										regOwnersEquity:"", //所有者权益
									
										//subOtherInfo
										regRecordNum:"", //报备号
										regContractNum:"", //合同号
										regEntrustLetterNum:"", //摇珠单/委托书编号
										regEntrustTime:"", //摇珠/委托时间
										regOutsourceStatus:"", //外协情况
										regArrgType:"", //项目类型 轮序  L轮序 1001, A安排 1002
									
										//subTeamInfo
										regProjLeader:[],  //项目负责人
										regSignedAppraiser:[], //签字估价师
										regProjProReviewer:[], //"专业复核人"
										regFieldSrvy:[], //"现勘"
										regInfoVerification:[], //"资料收集及验证"
										regMarketEnquiry:[], //"市场询价调查"
										regTechExpDrafter:[], //"技术说明"
										regReportDrafter:[], //"报告拟稿"
										regProjArchive:[], //"助理(归档)"
										regFeeFollowUp:[], //"收费跟进"
										regFinalReview:"", //"总审"
									}
									
									if(dpData){
										//委托方
										this.subInfoForm.regClientName = dpData.clientName;
										
										//项目类型
										if(dpData.arrgType == '1001'){
											this.subInfoForm.regArrgType = "L";
										}else if(dpData.arrgType == '1002'){
											this.subInfoForm.regArrgType = "A";
										}
										
										//合同号
										this.subInfoForm.regContractNum = dpData.contractNum.contractNum;
									}
									
									if(spData){
										this.subInfoForm.subProjId = spData.subProjId; //子项目id
										this.subInfoForm.subProjNum = spData.subProjNum; //子项目号
										this.subInfoForm.subProjName = spData.subProjName; //项目名称
										this.subInfoForm.subProjScope = spData.subProjScope; //项目范围
										this.subInfoForm.subBaseDate = this.formatDate(spData.subBaseDate); //基准日
																				
										//设置项目组选项
										const teamOptionInfo = (spData.subProjLeader+","+spData.subProjReviewer+","+spData.subProjProReviewer+","+spData.subProjAsst+","+spData.subFieldSrvy).replace(",,",",")
										this.subTeamOption = Array.from(new Set(teamOptionInfo.split(',')));
										
										//签字估价师由负责人和项目复核人组成
										var arr = new Array;
										var regSignedAppraiser = Array.from(new Set(arr.concat(spData.subProjLeader?spData.subProjLeader.split(','):[], spData.subProjReviewer?spData.subProjReviewer.split(','):[])));
									
										if(waData){
											this.subInfoForm.regEvalMethod = waData.assemMethod?waData.assemMethod.split(','):[];  //"评估方法"
											
											//使用安排和项目组成员, 生成subTeamInfo
											const newSubTeamInfo={
												regProjLeader: spData.subProjLeader?spData.subProjLeader.split(','):[], //项目负责人
												regSignedAppraiser: regSignedAppraiser, //签字估价师
												regProjProReviewer: spData.subProjProReviewer?spData.subProjProReviewer.split(','):[], //"专业复核人",
												regFieldSrvy:spData.subFieldSrvy?spData.subFieldSrvy.split(','):[], //"现勘"
												regInfoVerification:waData.fldSrvyPic?waData.fldSrvyPic.split(','):[], //"资料收集及验证",
												regMarketEnquiry:waData.mktSrvyPic?waData.mktSrvyPic.split(','):[], //"市场询价调查"
												//regTechExpDrafter:waData.assemEstPic?waData.assemEstPic.split(','):[], //"技术说明",
												regTechExpDrafter:spData.subProjLeader?spData.subProjLeader.split(','):[], //"技术说明",
												regReportDrafter:waData.issueValPic?waData.issueValPic.split(','):[], //"报告拟稿",
												regProjArchive:spData.subProjAsst?spData.subProjAsst.split(','):[], //"助理(归档)",
												regFeeFollowUp: waData.assemChargePic?waData.assemChargePic.split(','):[], //"收费跟进"
												regFinalReview: "", //"总审"
											}
											this.subInfoForm.regProjLeader = newSubTeamInfo.regProjLeader;
											this.subInfoForm.regSignedAppraiser = newSubTeamInfo.regSignedAppraiser;
											this.subInfoForm.regProjProReviewer = newSubTeamInfo.regProjProReviewer;
											this.subInfoForm.regFieldSrvy = newSubTeamInfo.regFieldSrvy;
											this.subInfoForm.regInfoVerification = newSubTeamInfo.regInfoVerification;
											this.subInfoForm.regMarketEnquiry = newSubTeamInfo.regMarketEnquiry;
											this.subInfoForm.regTechExpDrafter = newSubTeamInfo.regTechExpDrafter;
											this.subInfoForm.regReportDrafter = newSubTeamInfo.regProjLeader;
											this.subInfoForm.regProjArchive = newSubTeamInfo.regProjArchive;
											this.subInfoForm.regFeeFollowUp = newSubTeamInfo.regFeeFollowUp;
											this.subInfoForm.regFinalReview = newSubTeamInfo.regFinalReview;
										}else{
											//console.log('未安排');
											//使用项目组成员, 生成subTeamInfo
											const newSubTeamInfo={
												regProjLeader: spData.subProjLeader?spData.subProjLeader.split(','):[], //项目负责人
												regSignedAppraiser: regSignedAppraiser, //签字估价师
												regProjProReviewer: spData.subProjProReviewer?spData.subProjProReviewer.split(','):[], //"专业复核人",
												regFieldSrvy:spData.subFieldSrvy?spData.subFieldSrvy.split(','):[], //"现勘"
												regInfoVerification:[], //"资料收集及验证",
												regMarketEnquiry:[], //"市场询价调查"
												//regTechExpDrafter:[], //"技术说明",
												regTechExpDrafter:spData.subProjLeader?spData.subProjLeader.split(','):[], //"技术说明",
												regReportDrafter:[], //"报告拟稿",
												regProjArchive:spData.subProjAsst?spData.subProjAsst.split(','):[], //"助理(归档)",
												regFeeFollowUp: [], //"收费跟进"
												regFinalReview: "", //"总审"
											}
											this.subInfoForm.regProjLeader = newSubTeamInfo.regProjLeader;
											this.subInfoForm.regSignedAppraiser = newSubTeamInfo.regSignedAppraiser;
											this.subInfoForm.regProjProReviewer = newSubTeamInfo.regProjProReviewer;
											this.subInfoForm.regFieldSrvy = newSubTeamInfo.regFieldSrvy;
											this.subInfoForm.regInfoVerification = newSubTeamInfo.regInfoVerification;
											this.subInfoForm.regMarketEnquiry = newSubTeamInfo.regMarketEnquiry;
											this.subInfoForm.regTechExpDrafter = newSubTeamInfo.regTechExpDrafter;
											this.subInfoForm.regReportDrafter = newSubTeamInfo.regProjLeader;
											this.subInfoForm.regProjArchive = newSubTeamInfo.regProjArchive;
											this.subInfoForm.regFeeFollowUp = newSubTeamInfo.regFeeFollowUp;
											this.subInfoForm.regFinalReview = newSubTeamInfo.regFinalReview;
										}
									}
								});
							});
						});
					}
					
					
					
					/* 
					//1.读取表单数据
					this.subProjData = res.data;
					//字段格式转换
					//this.subProjData.subBaseDate = this.formatDate(this.subProjData.subBaseDate);
					
					const spData = Object.assign({}, this.subProjData)
					
					//设置项目组选项
					const teamOptionInfo = (spData.subProjLeader+","+spData.subProjReviewer+","+spData.subProjProReviewer+","+spData.subProjAsst+","+spData.subFieldSrvy).replace(",,",",")
					this.subTeamOption = Array.from(new Set(teamOptionInfo.split(',')));
					
					//2.转换成各info
					//静态数据
					this.subInfoForm={
						//subBasicInfo
						subProjId: spData.subProjId, //子项目id
						subProjNum: spData.subProjNum, //子项目号
						subProjName: spData.subProjName, //项目名称
						subProjScope: spData.subProjScope, //项目范围
						subBaseDate: this.formatDate(spData.subBaseDate), //基准日
						
						//subSpecialInfo
						regClientName:"委托方",
						regClientType:"个人", //委托方性质
						regEvaluatedUnit:"被评估单位",
						regEvalObject:"",  //评估对象
						regEvalObject1:"", //评估对象1
						regEvalObject2:"", //评估对象2
						regEvalObjCount:"1", //数量
						regAdminRegion:"", //行政区域 省市区
						regAdminRegion1:"省", //行政区域1 省
						regAdminRegion2:"市", //行政区域2 城市
						regAdminRegion3:"区", //行政区域3 县区
					
						//subReportInfo
						regEvalGoal:"评估目的",
						regEvalMethod:["市场法"],
						regReportIssueDate:"2022-2-18", //出报告日期
						regEvalConclusion:"评估结论", 						
						regTotalAssets:"100000", //资产总值
						regTotalDebts:"", //负债总值
						regOwnersEquity:"", //所有者权益
					
						//subOtherInfo
						regRecordNum:"报备号",
						regContractNum:"", //合同号
						regEntrustLetterNum:"摇珠单/委托书编号",
						regEntrustTime:"", //摇珠/委托时间
						regOutsourceStatus:"外协情况",
						regArrgType:"", //项目类型 轮序  L轮序 1001, A安排 1002
					
						//subTeamInfo
						regProjLeader:"",
						regSignedAppraiser:"",
						regProjProReviewer:"",
						regFieldSrvy:"",
						regInfoVerification:"",
						regMarketEnquiry:"",
						regTechExpDrafter:"",
						regReportDrafter:"",
						regProjArchive:"",
						regFeeFollowUp:"",
						regFinalReview:"",
					}
					 */
					
					//获取安排数据
					//this.getWorkAssignmentData(projId, subProjId);
				}
			})
			.catch(err => {
			  console.log('获取子项目信息', err)
			})
				
		},		
		
		//计划信息
		getDetailProjData(projId, successc) {
		  //211101变动 新增: 多个公司切换
			const detailData = {
				projId: projId,
			}
			getDetailProjInfo(detailData, this.companyId)
		    .then(res => {
				if (res.statusCode == 200) {
					successc(res.data);
				}
		    })
		    .catch(err => {
		      console.log('获取计划信息', err)
		    })
		},
		//子项目基本信息
		getSubProjectData(projId, subProjId, successc) {
		  //211101变动 新增: 多个公司切换
			const subProjectData = {
				projId: projId,
				subProjId: subProjId,
			}
			getSubProjectInfo(subProjectData, this.companyId)
		    .then(res => {
				if (res.statusCode == 200) {
					successc(res.data);
				}
		    })
		    .catch(err => {
		      console.log('获取计划信息', err)
		    })
		},
		//安排信息
		getWorkAssignmentData(projId, subProjId, successc) {
		  //211101变动 新增: 多个公司切换
			const AssignmentData = {
				projId: projId,
				subProjId: subProjId,
			}
			getWorkAssignment(AssignmentData, this.companyId)
		    .then(res => {
				if (res.statusCode == 200) {
					//this.workAssignmentData = res.data;
					//console.log("workAssignmentData里面的", this.workAssignmentData)
					successc(res.data);
				}
		    })
		    .catch(err => {
		      console.log('获取项目安排信息', err)
		    })
		},
		/* 
		getWorkAssignmentData(projId, subProjId) {
		  //211101变动 新增: 多个公司切换
			const AssignmentData = {
				projId: projId,
				subProjId: subProjId,
			}
			getWorkAssignment(AssignmentData, this.companyId)
		    .then(res => {
				if (res.statusCode == 200) {					
					this.workAssignmentData = res.data;
					
					
					const spData = this.subProjData;
					const waData = this.workAssignmentData;
					//签字估价师由负责人和项目复核人组成					
					var arr = new Array;
					var regSignedAppraiser = Array.from(new Set(arr.concat(spData.subProjLeader?spData.subProjLeader.split(','):[], spData.subProjReviewer?spData.subProjReviewer.split(','):[])));
					
					
					if(this.workAssignmentData){						
						//使用安排和项目组成员, 生成subTeamInfo
						const newSubTeamInfo={
							regProjLeader: spData.subProjLeader?spData.subProjLeader.split(','):[], //项目负责人
							regSignedAppraiser: regSignedAppraiser, //签字估价师
							regProjProReviewer: spData.subProjProReviewer?spData.subProjProReviewer.split(','):[], //"专业复核人",
							regFieldSrvy:spData.subFieldSrvy?spData.subFieldSrvy.split(','):[], //"现勘"
							regInfoVerification:waData.fldSrvyPic?waData.fldSrvyPic.split(','):[], //"资料收集及验证",
							regMarketEnquiry:waData.mktSrvyPic?waData.mktSrvyPic.split(','):[], //"市场询价调查"
							//regTechExpDrafter:waData.assemEstPic?waData.assemEstPic.split(','):[], //"技术说明",
							regTechExpDrafter:spData.subProjLeader?spData.subProjLeader.split(','):[], //"技术说明",
							regReportDrafter:waData.issueValPic?waData.issueValPic.split(','):[], //"报告拟稿",
							regProjArchive:spData.subProjAsst?spData.subProjAsst.split(','):[], //"助理(归档)",
							regFeeFollowUp: waData.assemChargePic?waData.assemChargePic.split(','):[], //"收费跟进"
							regFinalReview: "", //"总审"
						}
						this.subInfoForm.regProjLeader = newSubTeamInfo.regProjLeader;
						this.subInfoForm.regSignedAppraiser = newSubTeamInfo.regSignedAppraiser;
						this.subInfoForm.regProjProReviewer = newSubTeamInfo.regProjProReviewer;
						this.subInfoForm.regFieldSrvy = newSubTeamInfo.regFieldSrvy;
						this.subInfoForm.regInfoVerification = newSubTeamInfo.regInfoVerification;
						this.subInfoForm.regMarketEnquiry = newSubTeamInfo.regMarketEnquiry;
						this.subInfoForm.regTechExpDrafter = newSubTeamInfo.regTechExpDrafter;
						this.subInfoForm.regReportDrafter = newSubTeamInfo.regProjLeader;
						this.subInfoForm.regProjArchive = newSubTeamInfo.regProjArchive;
						this.subInfoForm.regFeeFollowUp = newSubTeamInfo.regFeeFollowUp;
						this.subInfoForm.regFinalReview = newSubTeamInfo.regFinalReview;
					}else{
						//console.log('未安排');
						//使用项目组成员, 生成subTeamInfo
						const newSubTeamInfo={
							regProjLeader: spData.subProjLeader?spData.subProjLeader.split(','):[], //项目负责人
							regSignedAppraiser: regSignedAppraiser, //签字估价师
							regProjProReviewer: spData.subProjProReviewer?spData.subProjProReviewer.split(','):[], //"专业复核人",
							regFieldSrvy:spData.subFieldSrvy?spData.subFieldSrvy.split(','):[], //"现勘"
							regInfoVerification:[], //"资料收集及验证",
							regMarketEnquiry:[], //"市场询价调查"
							//regTechExpDrafter:[], //"技术说明",
							regTechExpDrafter:spData.subProjLeader?spData.subProjLeader.split(','):[], //"技术说明",
							regReportDrafter:[], //"报告拟稿",
							regProjArchive:spData.subProjAsst?spData.subProjAsst.split(','):[], //"助理(归档)",
							regFeeFollowUp: [], //"收费跟进"
							regFinalReview: "", //"总审"
						}
						this.subInfoForm.regProjLeader = newSubTeamInfo.regProjLeader;
						this.subInfoForm.regSignedAppraiser = newSubTeamInfo.regSignedAppraiser;
						this.subInfoForm.regProjProReviewer = newSubTeamInfo.regProjProReviewer;
						this.subInfoForm.regFieldSrvy = newSubTeamInfo.regFieldSrvy;
						this.subInfoForm.regInfoVerification = newSubTeamInfo.regInfoVerification;
						this.subInfoForm.regMarketEnquiry = newSubTeamInfo.regMarketEnquiry;
						this.subInfoForm.regTechExpDrafter = newSubTeamInfo.regTechExpDrafter;
						this.subInfoForm.regReportDrafter = newSubTeamInfo.regProjLeader;
						this.subInfoForm.regProjArchive = newSubTeamInfo.regProjArchive;
						this.subInfoForm.regFeeFollowUp = newSubTeamInfo.regFeeFollowUp;
						this.subInfoForm.regFinalReview = newSubTeamInfo.regFinalReview;
					}
		      }
		    })
		    .catch(err => {
		      console.log('获取项目安排信息', err)
		    })
		},
		 */
		
		importSubProj(){
			this.$message.info('导入功能未完成')
		},
		
		exportSubProj(){
			this.$message.info('导出功能未完成')
		},
	}
}
</script>

<style scoped>
	.work {
	  width: 100%;
	}
	.work-title {
	  width: 100%;
	  text-align: left;
	  padding-left: 10px;
	  margin: 10px 0 5px 0;
	  border-left: solid 5px #409eff;
	}
	.work-title-name {
	  font-size: 24px;
	}
	.work-title-button {
	  float: right;
	  padding-right: 25px;
	}
	
	.form-item-title {
	  width: 200px;
	  text-align: left;
	  margin: 10px 0 20px 0;
	  padding-left: 5px;
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
	
	.select-width-100{
		width: 100%;
	}
	/*el-autocomplete下拉宽度*/
	.input-select{
		width: 100%;
	}
	/deep/ .input-select .el-popper[x-placement^=bottom]{
		width:1000px !important;
	}
	
	/deep/ .el-form-item__label {
	  color: #000;
	  font-size: 16px;
	}
	
	/deep/ .red-item .el-form-item__label {
	  color: #ed1941;
	}
</style>