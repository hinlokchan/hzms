<template>
  <div class="container">
    <el-page-header @back="goBack"></el-page-header>
    <div class="work-title"
	v-if="subReceiptForm">
      <span class="work-title-name">开票信息 <el-tag :type="newButtonType(isEdit)" plain size="medium">{{newButtonValue(isEdit)}}</el-tag></span>
	</div>
	
	<el-dialog
	  title="新增发票信息"
	  :visible.sync="addInvoiceDialogVisible"
	  width="800px"
	  :close-on-click-modal = "false"
	>
	  <el-form
	    ref="addInvoiceForm"
	    :model="addInvoiceForm"
	    label-width="auto"
	    :rules="addInvoiceFormRules"
		v-if="addInvoiceForm"
	  >
	    <el-form-item label="发票类型" prop="receiptType">
	    	<el-select
			  v-model="addInvoiceForm.receiptType"
			  placeholder="请选择"
			>
			  <el-option
				v-for="item, index in invoiceTypeOptions"
				:key="index"
				:label="item"
				:value="item"
			  ></el-option>
			</el-select>
		</el-form-item>
	    <el-form-item label="发票抬头" prop="invoiceTitle">
	    	<el-input v-model.trim="addInvoiceForm.invoiceTitle" style="width: 100%" clearable></el-input>
	    </el-form-item>
	    <el-form-item label="发票税号" prop="dutyParagraph">
	    	<el-input v-model.trim="addInvoiceForm.dutyParagraph" style="width: 100%" clearable></el-input>
	    </el-form-item>
		<el-form-item label="地址" prop="address"
		:rules="addInvoiceForm.receiptType=='专用发票'?inputReq:[]">
			<el-input v-model.trim="addInvoiceForm.address" style="width: 100%" clearable></el-input>
		</el-form-item>
		<el-form-item label="电话" prop="telNum"
		:rules="addInvoiceForm.receiptType=='专用发票'?inputReq:[]">
			<el-input v-model.trim="addInvoiceForm.telNum" style="width: 100%" clearable></el-input>
		</el-form-item>
		<el-form-item label="开户行" prop="depositBank"
		:rules="addInvoiceForm.receiptType=='专用发票'?inputReq:[]">
			<el-input v-model.trim="addInvoiceForm.depositBank" style="width: 100%" clearable></el-input>
		</el-form-item>
		<el-form-item label="账号" prop="bankAccount"
		:rules="addInvoiceForm.receiptType=='专用发票'?inputReq:[]">
			<el-input v-model.trim="addInvoiceForm.bankAccount" style="width: 100%" clearable></el-input>
		</el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button
	      type="text"
	      @click="addInvoiceDialogVisible = false"
	    >取 消</el-button>
	    <el-button
	      type="primary"
	      @click="addInvoiceFormSubmit(projId)"
	    >确认提交</el-button>
	  </div>
	</el-dialog>
	
	<el-dialog
	  title="修改发票信息"
	  :visible.sync="editInvoiceDialogVisible"
	  width="800px"
	  :close-on-click-modal = "false"
	>
	  <el-form
	    ref="editInvoiceForm"
	    :model="editInvoiceForm"
	    label-width="auto"
	    :rules="editInvoiceFormRules"
		v-if="editInvoiceForm"
	  >
	    <el-form-item label="发票类型" prop="receiptType">
	    	<el-select
			  v-model="editInvoiceForm.receiptType"
			  placeholder="请选择"
			>
			  <el-option
				v-for="item, index in invoiceTypeOptions"
				:key="index"
				:label="item"
				:value="item"
			  ></el-option>
			</el-select>
		</el-form-item>
	    <el-form-item label="发票抬头" prop="invoiceTitle">
	    	<el-input v-model.trim="editInvoiceForm.invoiceTitle" style="width: 100%" clearable></el-input>
	    </el-form-item>
	    <el-form-item label="发票税号" prop="dutyParagraph">
	    	<el-input v-model.trim="editInvoiceForm.dutyParagraph" style="width: 100%" clearable></el-input>
	    </el-form-item>
		<el-form-item label="地址" prop="address"
		:rules="editInvoiceForm.receiptType=='专用发票'?inputReq:[]">
			<el-input v-model.trim="editInvoiceForm.address" style="width: 100%" clearable></el-input>
		</el-form-item>
		<el-form-item label="电话" prop="telNum"
		:rules="editInvoiceForm.receiptType=='专用发票'?inputReq:[]">
			<el-input v-model.trim="editInvoiceForm.telNum" style="width: 100%" clearable></el-input>
		</el-form-item>
		<el-form-item label="开户行" prop="depositBank"
		:rules="editInvoiceForm.receiptType=='专用发票'?inputReq:[]">
			<el-input v-model.trim="editInvoiceForm.depositBank" style="width: 100%" clearable></el-input>
		</el-form-item>
		<el-form-item label="账号" prop="bankAccount"
		:rules="editInvoiceForm.receiptType=='专用发票'?inputReq:[]">
			<el-input v-model.trim="editInvoiceForm.bankAccount" style="width: 100%" clearable></el-input>
		</el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button
	      type="text"
	      @click="editInvoiceDialogVisible = false"
	    >取 消</el-button>
	    <el-button
	      type="primary"
	      @click="editInvoiceFormSubmit(projId)"
	    >确认提交</el-button>
	  </div>
	</el-dialog>
	
	<el-form
		ref="subReceiptForm"
		:model="subReceiptForm"
		label-width="125px"
		:rules="subReceiptRules"
		v-if="subReceiptForm"
	>
		<el-divider>基本信息</el-divider>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-form-item label="凭证类型" prop="receiptType" class="red-item">
					<el-tooltip class="item" effect="dark" content="请先选对凭证类型, 再往后操作" placement="top">
					<el-select
					  v-model="subReceiptForm.receiptType"
					  placeholder="请选择"
					  @change="handleChangeReceiptType"
					  style="width: 100%;"
					>
					  <el-option
					    v-for="item, index in receiptTypeOptions"
					    :key="index"
					    :label="item"
					    :value="item"
					  ></el-option>
					</el-select>
					</el-tooltip>
				</el-form-item>
			</el-col>
			
			<el-col :span="8">
				<el-form-item label="电子/纸质" prop="isElectronic" class="red-item"
				v-if="subReceiptForm.receiptType=='普通发票'"
				:rules="subReceiptForm.receiptType=='普通发票'?isElectronic:[]">
					<el-select
					  v-model="subReceiptForm.isElectronic"
					  placeholder="请选择"
					>
					  <el-option
					    v-for="item, index in isElectronicOptions"
					    :key="index"
					    :label="item"
					    :value="item"
					  ></el-option>
					</el-select>
					</el-tooltip>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="20">	
			<!-- 根据凭证类型显示不同项目 -->
			<el-col :span="8"
			v-if="subReceiptForm.receiptType=='专用发票'||subReceiptForm.receiptType=='普通发票'">
				<el-form-item label="开票抬头" prop="invoiceTitle">
					<el-tooltip class="item" effect="dark" content="没有该发票信息时, 请先点新增按钮" placement="top">
					<el-select
					  v-model="subReceiptForm.invoiceTitle"
					  placeholder="请选择"
					  style="width: 100%;"
					  filterable 
					  @change="handleChangeInvoiceTitle"
					>
					  <el-option
					    v-for="item, index in invoiceTitleList"
					    :key="index"
					    :label="item.invoiceTitle"
					    :value="item.invoiceTitle"
					  ></el-option>
					</el-select>
					</el-tooltip>
					<el-tag @click="handleAddInvoice">
						新增
					</el-tag>
					<el-tag type="warning" @click="handleEditInvoice"  style="margin-left: 10px;"
					v-if="subReceiptForm.invoiceTitle != ''">
						修改
					</el-tag>
				</el-form-item>
			</el-col>
			<el-col :span="8"
			v-else>
				<el-form-item label="开票抬头" prop="invoiceTitle"
				:rules="subReceiptForm.receiptType=='开收据'?inputReq:[]">
					<el-input v-model="subReceiptForm.invoiceTitle" style="width: 100%" clearable
					placeholder="请输入"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="发票税号" prop="dutyParagraph"
				:rules="subReceiptForm.receiptType=='专用发票'||subReceiptForm.receiptType=='普通发票'?inputReq:[]">
					<el-input v-model="subReceiptForm.dutyParagraph" style="width: 100%" clearable disabled></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="地址" prop="address"
				:rules="subReceiptForm.receiptType=='专用发票'?inputReq:[]">
					<el-input v-model="subReceiptForm.address" style="width: 100%" clearable></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="20">	
			<el-col :span="8">
				<el-form-item label="电话" prop="telNum"
				:rules="subReceiptForm.receiptType=='专用发票'?inputReq:[]">
					<el-input v-model="subReceiptForm.telNum" style="width: 100%" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="开户行" prop="depositBank"
				:rules="subReceiptForm.receiptType=='专用发票'?inputReq:[]">
					<el-input v-model="subReceiptForm.depositBank" style="width: 100%" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="账号" prop="bankAccount"
				:rules="subReceiptForm.receiptType=='专用发票'?inputReq:[]">
					<el-input v-model="subReceiptForm.bankAccount" style="width: 100%" clearable></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-divider>子项目信息</el-divider>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="项目开票方式" prop="makeOutPattern" class="red-item">
					<el-select
					  v-model="subReceiptForm.makeOutPattern"
					  placeholder="请正确选择"
					  style="width: 100%;"
					  @change="handleChangeMakeOutPattern"
					>
					  <el-option
					    v-for="item, index in makeOutPatternOption"
					    :key="index"
					    :label="item.label"
					    :value="item.value"
					  ></el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="项目开票举例">
					<span>
						<el-popover trigger="hover" placement="top" title="单一项目 (预收款+尾款或多次进度款)">
							<span>
								举例: 合同价为50万, 预收款30% 15万, 尾款35万, 共两笔收费
								<br>
								<br>
								1. 录入第一笔, 预收款:
								<br>
								1) 选择开票方式为"<span style="color: red"><strong>单一项目</strong></span>"
								<br>
								2) <strong>点选一个</strong>项目
								<br>
								3) 输入开票金额 150000, 提交
								<br>
								<br>
								2. 录入第二笔, 尾款:
								<br>
								1) 选择开票方式为"<span style="color: red"><strong>单一项目</strong></span>"
								<br>
								2) <strong>点选一个</strong>项目
								<br>
								3) 输入开票金额 350000, 提交
								<br>
							</span>
							<span slot="reference">
								<el-tag>单项举例1</el-tag>
							</span>
						</el-popover>
					</span>
					<span>
						<el-popover trigger="hover" placement="top" title="单一项目 (由多家公司付款)">
							<span>
								举例: 合同价为30万, A公司 支付10万, B公司支付20万, 共两笔收费
								<br>
								<br>
								1. 录入第一笔, A公司收款:
								<br>
								1) 选择开票抬头为"A公司"
								<br>
								2) 选择开票方式为"<span style="color: red"><strong>单一项目</strong></span>"
								<br>
								3) <strong>点选一个</strong>项目
								<br>
								4) 输入开票金额 100000, 提交
								<br>
								<br>
								2. 录入第二笔, B公司收款:
								<br>
								1) 选择开票抬头为"B公司"
								<br>
								2) 选择开票方式为"<span style="color: red"><strong>单一项目</strong></span>"
								<br>
								3) <strong>点选一个</strong>项目
								<br>
								4) 输入开票金额 200000, 提交
								<br>
							</span>
							<span slot="reference">
								<el-tag style="margin-left: 10px;">单项举例2</el-tag>
							</span>
						</el-popover>
					</span>
					
					<span>
						<el-popover trigger="hover" placement="top" title="可确定多子项目 (多笔收费, 每笔对应多个子项目)">
							<span>
								举例: 合同价为20万, 第一笔6万对应子项目 111和333, 
								<br>								第二笔11万,对应子项目 222, 444 和 555, 
								<br>
								第三笔3万等以后建子项目 666 后再收, 共3笔收费
								<br>
								<br>
								1. 录入第一笔收款:
								<br>
								1) 选择开票方式为"<span style="color: red"><strong>可确定多子项目</strong></span>"
								<br>
								2) <strong>点选1个或多个</strong>子项目 (111 和 333)
								<br>
								3) 输入开票金额 60000, 提交
								<br>
								<br>
								2. 录入第二笔收款:
								<br>
								1) 选择开票方式为"<span style="color: red"><strong>可确定多子项目</strong></span>"
								<br>
								2) <strong>点选1个或多个</strong>子项目 (222, 444 和 555)
								<br>
								3) 输入开票金额 110000, 提交
								<br>
								<br>
								3. 录入第三笔收款:
								<br>
								1) 选择开票方式为"<span style="color: red"><strong>可确定多子项目</strong></span>"
								<br>
								2) <strong>点选1个或多个</strong>子项目 (666)
								<br>
								3) 输入开票金额 30000, 提交
								<br>
							</span>
							<span slot="reference">
								<el-tag style="margin-left: 10px;" type="success">多项举例1</el-tag>
							</span>
						</el-popover>
					</span>
					
					<span>
						<el-popover trigger="hover" placement="top" title="不确定多子项目 (按比例收费)">
							<span>
								举例: 合同价为50万, 第一笔收30% 15万, 第二笔收50% 25万, 
								<br>								    第三笔收20% 10万  共三笔收费
								<br>
								<br>
								1. 录入第一笔收款, 30% 15万:
								<br>
								1) 选择开票方式为"<span style="color: red"><strong>不确定多子项目</strong></span>"
								<br>
								2) <strong>不点选</strong>子项目
								<br>
								3) 输入开票金额 150000, 提交
								<br>
								<br>
								2. 录入第二笔收款, 50% 25万:
								<br>
								1) 选择开票方式为"<span style="color: red"><strong>不确定多子项目</strong></span>"
								<br>
								2) <strong>不点选</strong>子项目
								<br>
								3) 输入开票金额 250000, 提交
								<br>
								<br>
								3. 录入第三笔收款, 10% 10万:
								<br>
								1) 选择开票方式为"<span style="color: red"><strong>不确定多子项目</strong></span>"
								<br>
								2) <strong>不点选</strong>子项目
								<br>
								3) 输入开票金额 100000, 提交
								<br>
							</span>
							<span slot="reference">
								<el-tag style="margin-left: 10px;" type="success">多项举例2</el-tag>
							</span>
						</el-popover>
					</span>
					<span>
						<el-popover trigger="hover" placement="top" title="多子项目混合 (不能确认项目的预收款+能确认项目尾款">
							<span>
								举例: 合同价为4万, 第一笔预收款1.2万, 当时不能确定子项目数
								<br>
								第二笔尾款2.8万, 能确定3个子项目aaa,bbb,ccc, 共两笔收费
								<br>
								<br>
								1. 录入第一笔收款, 预收款 1.2万:
								<br>
								1) 选择开票方式为"<span style="color: red"><strong>不确定多子项目</strong></span>"
								<br>
								2) <strong>不点选</strong>子项目
								<br>
								3) 输入开票金额 12000, 提交
								<br>
								<br>
								2. 录入第二笔收款, 尾款 2.8万:
								<br>
								1) 选择开票方式为"<span style="color: red"><strong>可确定多子项目</strong></span>"
								<br>
								2) <strong>点选1个或多个</strong>子项目 (aaa, bbb 和 ccc)
								<br>
								3) 输入开票金额 28000, 提交
								<br>
							</span>
							<span slot="reference">
								<el-tag style="margin-left: 10px;" type="success">多项举例3</el-tag>
							</span>
						</el-popover>
					</span>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="开票金额" prop="totalAmount" class="red-item">
					<el-input v-model="subReceiptForm.totalAmount" style="width: 100%" clearable
					oninput="value=value.replace(/[^\d.]/g,'')"
					placeholder="请输入发票金额"
					></el-input>
					<span>
						大写: {{changeMoneyToChinese(subReceiptForm.totalAmount)}}
					</span>
					<el-tag style="margin-left: 10px;"
					@click="handleCopyTotalReceivable">
						使用应收费用作为开票金额
					</el-tag>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="参考应收费用" prop="totalReceivable">
					<el-input v-model="subReceiptForm.totalReceivable" style="width: 100%" clearable
					readonly
					oninput="value=value.replace(/[^\d.]/g,'')"
					></el-input>
					<span>
						大写: {{changeMoneyToChinese(subReceiptForm.totalReceivable)}} 
						<el-tag  type="danger" style="margin-left: 10px;">
							登记有未提交时, 费用会不准
						</el-tag>
					</span>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="子项目号" prop="bindingSubProjNum">
					<el-input v-model="subReceiptForm.bindingSubProjNum" style="width: 100%" clearable
					type="textarea" autosize readonly></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="子项目id" prop="bindingSubProjId"
				:rules="subReceiptForm.makeOutPattern==2?[]:bindingSubProjId">
					<el-input v-model="subReceiptForm.bindingSubProjId" style="width: 100%" clearable
					type="textarea" autosize readonly></el-input>
				</el-form-item>
			</el-col>			
		</el-row>
	</el-form>
	<el-divider>项目开票方式为单一项目或可确定多子项目时, 请勾选下方项目</el-divider>
	<el-table
	  ref="subTable"
	  :data="subProjectInfoList"
	  border
	  highlight-current-row
	  max-height="500"
	  style="width: 100%; margin-top: 20px"
	  @row-click="onSelect"
	  @selection-change="onSelection"
	  @select-all="onSelectAll"
	  v-if="subProjectInfoList">
	  
	  <!-- v-if="subReceiptForm.makeOutPattern == 1" -->
	  <el-table-column
	  	type="selection"
	    :selectable='selectInit'
	  	width="55"
		>
	  </el-table-column>	  
	  <el-table-column
	    label="序号"
	    width="50"
	  type="index"
	  align="center"
	  ></el-table-column>
	  <!-- 
	  <el-table-column prop="subProjId" label="子项目ID"></el-table-column>
	  -->
	  <el-table-column prop="receiptStatus" width="90px" label="凭证状态">
		  <template slot-scope="scope">
			<el-tag :type="newReceiptStatus(scope.row.receiptStatus)">
				{{scope.row.receiptStatus}}
			</el-tag>
		  </template>
	  </el-table-column>
	  
	  <el-table-column prop="mainStatus" width="90px" label="登记状态">
		  <template slot-scope="scope">
			<el-tag :type="newMainStatus(scope.row.mainStatus)">
				{{scope.row.mainStatus}}
			</el-tag>
		  </template>
	  </el-table-column>
	 
	  
	  <el-table-column prop="subProjNum" label="子项目号"></el-table-column>
	  
	  <el-table-column prop="cdReceivable" width="120px" label="项目收费"></el-table-column>
	  
	  <el-table-column prop="subProjName" label="项目名称"></el-table-column>
	  
	  <el-table-column prop="subProjScope" label="项目范围"></el-table-column>
	  
	  
	</el-table>
		
	<el-divider></el-divider>
	<div style="text-align: center;">
		<el-button-group>
			<el-button :type="newButtonType(isEdit)" plain size="medium" disabled>{{newButtonValue(isEdit)}}</el-button>
			<el-button type="primary" icon="el-icon-edit-outline" size="medium" @click.native="subReceiptFormSubmit()">确认提交</el-button>
		</el-button-group>
	</div>
  </div>
</template>

<script>
import standardinfoOptions from '../../../public/standardinfo.json'
//api
import { getDetailProjInfo} from '@/api/index'
import { getSubProjectInfoList, getSubProjectInfo, getRegisterList,
		addSubProjectChargeDoc, editSubProjectChargeDoc, getSubProjectChargeDocInfo, getSubProjStatus,
		addInvoiceTitle, editInvoiceTitle, getInvoiceTitleList, getInvoiceTitleInfo,
		addSubProjectReceipt, editSubProjectReceipt, getSubProjectReceiptInfo, getReceiptList} from '@/api/subReport'

export default {
	name: 'subworkhandle',
	data() {
		return {
			projId:'',
			subProjId:'',
						
			subReceiptForm:"",
			isEdit:false,
						
			//表单验证规则
			subReceiptRules:{
				//基本信息
				receiptType:[{ required: true, message: '请选择凭证类型', trigger: 'blur' }],
				totalAmount:[
					{ required: true, message: '请输入开票金额', trigger: 'blur' },
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
				makeOutPattern:[{ required: true, message: '请选择对应项目切换', trigger: 'blur' }],
				invoiceTitle:[{ required: true, message: '请输入开票抬头', trigger: 'blur' }],
				//bindingSubProjNum:[{ required: true, message: '请选择子项目号', trigger: 'blur' }],
				//bindingSubProjId:[{ required: true, message: '请选择子项目Id', trigger: 'blur' }],
			},
			inputReq:[{ required: true, message: '请输入', trigger: 'blur' }],
			invoiceTypeOptions:['专用发票','普通发票'],
			
			bindingSubProjId:[{ required: true, message: '请在下方表格选择子项目', trigger: 'blur' }],
			
			//下拉选项
			receiptTypeOptions:['专用发票','普通发票','开收据','无'],
			isElectronicOptions:['纸质', '电子'],
			/* 
			isElectronicOptions:[
			  {
				value: 0,
				label: '纸质'
			  }, {
				value: 1,
				label: '电子'
			  },
			],
			 */
			isElectronic:[{ required: true, message: '请选择电子或纸质发票', trigger: 'blur' }],
			
			
			//远程数据
			subProjData:{},
			
			
			//211101变动 新增: 多个公司切换
			companyRange:['HZ', 'ZM','HZKJ'],
			companyId:'',
			companyTabsId: 0,
			
			
			//项目列表
			subProjectInfoList:[],
			
			//凭证列表
			receiptList:[],
						
			//发票列表
			invoiceTitleList:[],
			//选中的发票信息
			invoiceInfo:{},
			
			//添加发票信息
			addInvoiceDialogVisible:false,
			addInvoiceForm:'',
			addInvoiceFormRules:{
				invoiceTitle: [{ required: true, message: '请输入发票抬头', trigger: 'blur' }],
				dutyParagraph: [{ required: true, message: '请输入发票税号', trigger: 'blur' }],
			},
			
			//修改发票信息
			editInvoiceDialogVisible:false,
			editInvoiceForm:'',
			editInvoiceFormRules:{
				invoiceTitle: [{ required: true, message: '请输入发票抬头', trigger: 'blur' }],
				dutyParagraph: [{ required: true, message: '请输入发票税号', trigger: 'blur' }],
			},
			
			makeOutPatternOption:[
				{
					label:'单一项目 (一个项目由多家公司付款 / 一个项目的预收款或多个进度的收费)',
					value:0,
				},
				{
					label:'可确定多子项目 (一笔收费对应多个子项目)',
					value:1,
				},
				{
					label:'不确定多子项目 (不指定对应子项目, 含预收款或按进度收费)',
					value:2,
				},
			]
		}
	},
	computed:{
		newButtonType(){
			return (data)=>{				
				if(data){
					return "primary";
				}else{
					return "info";
				}
			}
		},
		newButtonValue(){
			return (data)=>{
				if(data){
					return "修改";
				}else{
					return "新增";
				}
			}
		},
		
		newMainStatus(){
			return (data)=>{
				if(data == '未提交'){
					return "warning";
				}else{
					return "primary";
				}
			}
		},
		
		newReceiptStatus(){
			return (data)=>{
				if(data == '可开凭证'){
					return "success";
				}else if(data == '当前凭证' || data =='单项可开'){
					return "primary";
				}else if(data == '多项已开'){
					return "danger";
				}else{
					return "info";
				}
			}
		}
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
		if(typeof(this.$route.query.data) != "undefined"){
			this.isEdit = true;
			this.receiptId = this.$route.query.data
		}else{
			this.isEdit = false;
		}
		console.log(this.projId, this.receiptId);
		
		//console.log(standardinfoOptions)
		
		//静态数据
		var subReceiptForm = {
			receiptType: '普通发票', //凭证类型
			isElectronic:'电子', //电子或纸质
			
			totalAmount: '', //开票金额
			totalReceivable: '', //应收金额
			
			//发票信息
			invoiceTitle: '', //开票抬头
			dutyParagraph: '', //开票税号
			address: '', //地址
			telNum: '', //电话
			depositBank: '', //开户行
			bankAccount: '', //账号
			
			//子项目信息
			bindingSubProjId: '', //对应子项目id
			bindingSubProjNum: '', //对应子项目号
			
			bindingSubProjIdList:[], //对应子项目id列表
			bindingSubProjNumList:[], //对应子项目号列表
			makeOutPattern: '',
		};
		
		this.subReceiptForm = subReceiptForm;
		
		
								
		//读取远程数据
		this.getSubProjData(this.projId, this.receiptId);
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
						
		//提交		
		subReceiptFormSubmit(){
			this.$refs.subReceiptForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交凭证信息?', '提示', { type: 'info' })
					.then(() => {
						//远程更新
						var subData = {
							projId: this.projId,
							receiptType: this.subReceiptForm.receiptType,
							isElectronic: this.subReceiptForm.isElectronic,
							invoiceTitle: this.subReceiptForm.invoiceTitle,
							dutyParagraph: this.subReceiptForm.dutyParagraph,
							address: this.subReceiptForm.address,
							bankAccount: this.subReceiptForm.bankAccount,
							depositBank: this.subReceiptForm.depositBank,
							telNum: this.subReceiptForm.telNum,
							totalAmount: this.subReceiptForm.totalAmount,
							bindingSubProjId: this.subReceiptForm.bindingSubProjId,
							bindingSubProjNum: this.subReceiptForm.bindingSubProjNum,
							makeOutPattern:this.subReceiptForm.makeOutPattern,
						}
						
						console.log(subData)
						
						if(this.isEdit){
							subData.receiptId = this.receiptId
							console.log('edit', subData)
							
							editSubProjectReceipt(subData, this.companyId)
							.then(res => {
								this.$message.success('项目凭证修改成功')
								
								//刷新表单
								this.getSubProjData(this.projId, this.receiptId);
							})
							.catch(err => {
							})
							
						}else{
							console.log('add', subData)
							addSubProjectReceipt(subData, this.companyId)
							.then(res => {
								this.$message.success('项目凭证添加成功')
								
								//刷新表单
								this.goBack()
							})
							.catch(err => {
							})
						}
						
					})
				}else{
					this.$message('请填写必填信息或格式有误');
				}
			})
		},
		
		//远程调用
		getSubProjData(projId, receiptId){
			this.getInvoiceTitleListData(projId, (itlData)=>{
				//发票列表
				this.invoiceTitleList = itlData
				this.getSubProjectInfoListData(projId, (silData)=>{
					//项目列表
					this.subProjectInfoList = silData
					this.getReceiptListData(projId, (rlData)=>{
						//凭证列表
						this.receiptList = rlData
						this.getRegisterListData(projId, (relData)=>{
							//console.log('发票列表', itlData)
							console.log('项目列表', silData)
							console.log('凭证列表', rlData)
							console.log('登记列表', relData)
							
							
							if(this.isEdit){
								//情况1 修改: 有数据时, 使用凭证信息
								//获取项目凭证数据
								const subData = {
									projId: projId,
									receiptId: receiptId
								}
								getSubProjectReceiptInfo(subData, this.companyId)
								.then(res => {
									if (res.statusCode == 200) {
										if(res.data){
											console.log("有数据", res.data);
											
											this.subReceiptForm = res.data;
											
											//循环 获取底单
											var newList = [];
											var newItem = [];
											this.subProjectInfoList.forEach((item, index) =>{	
												newItem = Object.assign({}, item) 
												
												
												//处理登记
												newItem.mainStatus = '未提交'
												newItem.cdReceivable = null;	
												if(newItem.subProjStatus.mainStatus != 0){
													relData.forEach((item2, index2) =>{
														if(newItem.subProjId == item2.subProjId){
															newItem.mainStatus = '已提交'
															newItem.cdReceivable =  parseFloat(item2.cdReceivable)
														}
													});
												}
																								
												//处理凭证											
												newItem.receiptStatus = '可开凭证'
												rlData.forEach((item3, index3) =>{
													const pzSubProjId = item3.bindingSubProjId?item3.bindingSubProjId.split(','):[];
													if(pzSubProjId.indexOf(newItem.subProjId) != -1){
														
														newItem.receiptStatus =  "多项已开"
														
														//是否在当前凭证
														const dqSubProjId = this.subReceiptForm.bindingSubProjId?this.subReceiptForm.bindingSubProjId.split(','):[];
														if(dqSubProjId.indexOf(newItem.subProjId) != -1){
															newItem.receiptStatus =  "当前凭证"
														}else{
															newItem.receiptStatus =  "多项已开"
														}
														
														
													}
												});
												
												newList.push(newItem);
											});
											this.subProjectInfoList = newList;
											
											
											this.$nextTick(()=>{
											  this.subProjectInfoList.forEach(row => {
											    if(row.receiptStatus=='当前凭证'){
											      this.$refs.subTable.toggleRowSelection(row,true);
											    }
											  })
											})
											
											
										}else{
											this.$message.warning("项目凭证获取失败")
											this.$router.push({ path: '/workbranch'})
										}
									}
								})
								.catch(err => {
									console.log('项目凭证获取失败', err)
								});
							}else{
								//循环 获取登记
								var newList = [];
								var newItem = [];
								this.subProjectInfoList.forEach((item, index) =>{
									newItem = Object.assign({}, item) 
									
									//处理登记
									newItem.mainStatus = '未提交'
									newItem.cdReceivable = null;
									if(newItem.subProjStatus.mainStatus != 0){
										relData.forEach((item2, index2) =>{
											if(newItem.subProjId == item2.subProjId){
												newItem.mainStatus = '已提交'
												newItem.cdReceivable =  parseFloat(item2.cdReceivable)
											}
										});
									}
									
									//处理凭证
									newItem.receiptStatus = '可开凭证'
									rlData.forEach((item3, index3) =>{
										const pzSubProjId = item3.bindingSubProjId?item3.bindingSubProjId.split(','):[];
										if(pzSubProjId.indexOf(newItem.subProjId) != -1){
											if(item3.makeOutPattern == 0){
												//单项可以继续开票
												newItem.receiptStatus =  "单项可开"
											}else{
												newItem.receiptStatus =  "多项已开"
											}
											
										}
									});
									
									newList.push(newItem);
								});
								this.subProjectInfoList = newList;
							}
							
						});
					});
				});
			});
			
			
			
		},		
		
		
		//发票列表信息
		getInvoiceTitleListData(projId, successc) {
		  //211101变动 新增: 多个公司切换
			const listData = {
				projId: projId,
			}
			getInvoiceTitleList(listData, this.companyId)
			.then(res => {
				if (res.statusCode == 200) {
					successc(res.data);
				}
			})
			.catch(err => {
			  console.log('发票列表信息', err)
			})
		},
		//子项目列表信息
		getSubProjectInfoListData(projId, successc) {
		  //211101变动 新增: 多个公司切换
			const listData = {
				projId: projId,
			}
			getSubProjectInfoList(listData, this.companyId)
		    .then(res => {
				if (res.statusCode == 200) {
					successc(res.data);
				}
		    })
		    .catch(err => {
		      console.log('子项目列表信息', err)
		    })
		},
		//凭证列表信息
		getReceiptListData(projId, successc) {
		  //211101变动 新增: 多个公司切换
			const listData = {
				projId: projId,
			}
			getReceiptList(listData, this.companyId)
		    .then(res => {
				if (res.statusCode == 200) {
					successc(res.data);
				}
		    })
		    .catch(err => {
		      console.log('凭证列表信息', err)
		    })
		},
		//项目登记列表信息
		getRegisterListData(projId, successc) {
		  //211101变动 新增: 多个公司切换
			const listData = {
				projId: projId,
			}
			getRegisterList(listData, this.companyId)
		    .then(res => {
				if (res.statusCode == 200) {
					successc(res.data);
				}
		    })
		    .catch(err => {
		      console.log('项目登记列表信息', err)
		    })
		},
		
		//子项目状态
		getSubProjStatusData(projId, subProjId, successc) {
		  //211101变动 新增: 多个公司切换
			const statusData = {
				projId: projId,
				subProjId: subProjId,
			}
			getSubProjStatus(statusData, this.companyId)
		    .then(res => {
				if (res.statusCode == 200) {
					successc(res.data);
				}
		    })
		    .catch(err => {
		      console.log('获取子项目状态', err)
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
		      console.log('子项目基本信息', err)
		    })
		},
		
		//正评信息/register/getRegisterInfo
		getSubRegisterData(projId, subProjId, successc) {
		  //211101变动 新增: 多个公司切换
			const registerData = {
				projId: projId,
				subProjId: subProjId,
			}
			getSubProjectRegisterInfo(registerData, this.companyId)
		    .then(res => {
				if (res.statusCode == 200) {
					successc(res.data);
				}
		    })
		    .catch(err => {
		      console.log('获取正评信息', err)
		    })
		},		
		
		importSubProj(){
			this.$message.info('导入功能未完成')
		},
		
		exportSubProj(){
			this.$message.info('导出功能未完成')
		},
		
		//切换单个或多个项目		
		handleCopyTotalReceivable(){
			this.subReceiptForm.totalAmount = this.subReceiptForm.totalReceivable;
		},
		
		handleChangeReceiptType(val){
			//还原
			this.subReceiptForm.dutyParagraph = ''; //开票税号
			this.subReceiptForm.address = ''; //地址
			this.subReceiptForm.telNum = ''; //电话
			this.subReceiptForm.depositBank = ''; //开户行
			this.subReceiptForm.bankAccount = ''; //账号
			this.subReceiptForm.invoiceTitleId = ''; //发票id
			
			console.log(val)
			if(val == '专用发票' || val == '普通发票'){
				this.subReceiptForm.invoiceTitle = [];
			}else{
				this.subReceiptForm.invoiceTitle = '';
			}
			
			if(val != '普通发票'){
				this.subReceiptForm.isElectronic = '';
			}else{
				this.subReceiptForm.isElectronic = '电子';
			}
		},
		
		handleChangeInvoiceTitle(val){
			//通过抬头获取其他值
			var params = {};
			this.invoiceTitleList.forEach((item, index) =>{
				if(item.invoiceTitle == val){
					params = item;
				}
			});
			
			params.receiptType = this.subReceiptForm.receiptType;
			
			//保存选中发票信息
			this.invoiceInfo =  Object.assign({}, params)
			console.log('invoiceInfo', this.invoiceInfo)
			
			const receiptType = this.subReceiptForm.receiptType
			
			//还原
			this.subReceiptForm.dutyParagraph = ''; //开票税号
			this.subReceiptForm.address = ''; //地址
			this.subReceiptForm.telNum = ''; //电话
			this.subReceiptForm.depositBank = ''; //开户行
			this.subReceiptForm.bankAccount = ''; //账号
			this.subReceiptForm.invoiceTitleId = ''; //发票id
			
			if(receiptType == '专用发票'){
				this.subReceiptForm.dutyParagraph = params.dutyParagraph;
				this.subReceiptForm.address = params.address;
				this.subReceiptForm.telNum = params.telNum;
				this.subReceiptForm.depositBank = params.depositBank;
				this.subReceiptForm.bankAccount = params.bankAccount;
				this.subReceiptForm.invoiceTitleId = params.invoiceTitleId;
			}else if(receiptType == '普通发票'){
				this.subReceiptForm.dutyParagraph = params.dutyParagraph;
				this.subReceiptForm.invoiceTitleId = params.invoiceTitleId;
			}
			
			//console.log(this.subReceiptForm);
		},		
		
		handleAddInvoice(){
			console.log('addInvoice')
			const addInvoiceForm = {
				receiptType : this.subReceiptForm.receiptType, //发票类型
				invoiceTitle : '', //发票抬头
				dutyParagraph : '', //开票税号
				address : '', //地址
				telNum : '', //电话
				depositBank : '', //开户行
				bankAccount : '', //账号
			}
			
			this.addInvoiceForm = addInvoiceForm;
			
			this.addInvoiceDialogVisible = true;
		},
		
		addInvoiceFormSubmit(projId){
			this.$refs.addInvoiceForm.validate((valid) => {
				if (valid) {
					const invoiceData = this.addInvoiceForm
					
					addInvoiceTitle(invoiceData, this.companyId)
					.then(res => {
						if(res.statusCode == 200){
							this.$message.success('发票信息添加成功')
							
							this.addInvoiceDialogVisible = false;
							
							//刷新发票表单
							this.getInvoiceTitleListData(projId, (itData)=>{
								this.invoiceTitleList = itData
							});
						}
					})
					.catch(err => {
						if(err.statusCode == 5001){
							this.$message.warning('发票抬头或发票税号已存在')
						}
					})
				}else{
					this.$message('请填写必填信息或格式有误');
				}
			})
		},
		
		handleEditInvoice(val){			
			console.log('editInvoice', this.invoiceInfo)
			
			//this.editInvoiceForm = Object.assign({}, this.invoiceInfo);
			//this.invoiceInfo.receiptType = this.subReceiptForm.receiptType; //发票类型
			this.editInvoiceForm = this.invoiceInfo;
			
			this.editInvoiceDialogVisible = true;
		},
		
		editInvoiceFormSubmit(projId){
			this.$refs.editInvoiceForm.validate((valid) => {
				if (valid) {
					const invoiceData = this.editInvoiceForm
					console.log(invoiceData)
					
					editInvoiceTitle(invoiceData, this.companyId)
					.then(res => {
						if(res.statusCode == 200){
							this.$message.success('发票信息修改成功')
							
							this.editInvoiceDialogVisible = false;
							
							//刷新发票表单
							this.getInvoiceTitleListData(projId, (itData)=>{
								this.invoiceTitleList = itData
								
								this.subReceiptForm.invoiceTitle = invoiceData.invoiceTitle;
								this.subReceiptForm.dutyParagraph = invoiceData.dutyParagraph;
								if(invoiceData.receiptType == '专用发票'){
									this.subReceiptForm.address = invoiceData.address;
									this.subReceiptForm.telNum = invoiceData.telNum;
									this.subReceiptForm.depositBank = invoiceData.depositBank;
									this.subReceiptForm.bankAccount = invoiceData.bankAccount;
								}
							});
						}
					})
					.catch(err => {
						if(err.statusCode == 5001 || err.statusCode == 500){
							this.$message.warning('发票抬头或发票税号已存在')
						}
					})
					
				}else{
					this.$message('请填写必填信息或格式有误');
				}
			})
		},
		
		selectInit(row,index){
			if(this.subReceiptForm.makeOutPattern == 0){
				if(row.receiptStatus=='多项已开'){
					return false  //不可勾选
				}else{    
					return true  //可勾选
				}
			}else{
				if(row.receiptStatus=='多项已开' || row.receiptStatus=='单项可开'){
					return false  //不可勾选
				}else{    
					return true  //可勾选
				}
			}
			
			
		},
		
		onSelect(row){//点击行选中复选框
			if(this.subReceiptForm.makeOutPattern == 2){
				//不可勾选
				this.$message.warning('当前项目开票方式, 不用勾选子项目')
			}else{
				if(row.receiptStatus=='多项已开'){
					
				}else{
					if(this.subReceiptForm.makeOutPattern == 0){
						//清空勾选
						this.$refs.subTable.clearSelection()
						this.$refs.subTable.toggleRowSelection(row);
					}else{
						if(row.receiptStatus=='单项可开'){
							
						}else{
							this.$refs.subTable.toggleRowSelection(row);
						}
					}
					
				}
			}
		},
		onSelection(row){//选中复选框操作
			//console.log(row)
			//if(row.length > 0){
				var totalAmount = 0;
				var subProjId = '';
				var subProjNum = '';
				var subProjIdList = [];
				var subProjNumList = [];
				
				row.forEach((item, index) =>{
					totalAmount += item.cdReceivable;
					subProjIdList.push(item.subProjId);
					subProjNumList.push(item.subProjNum);
				});
				
				subProjId = subProjIdList?subProjIdList.join(','):'';
				subProjNum = subProjNumList?subProjNumList.join(','):'';
				
				//this.subReceiptForm.totalAmount = totalAmount;
				this.subReceiptForm.totalReceivable = totalAmount;
				this.subReceiptForm.bindingSubProjId = subProjId;
				this.subReceiptForm.bindingSubProjNum = subProjNum;
			//}
		},
		
		onSelectAll(row,param){
			if(this.subReceiptForm.makeOutPattern === "" 
			|| (this.subReceiptForm.makeOutPattern === 0 && this.subProjectInfoList.length > 1) 
			|| this.subReceiptForm.makeOutPattern == 2 ){
				this.$message.warning('当前开票方式, 不能全选')
				this.$refs.subTable.clearSelection()
			}
		},
		
		handleChangeMakeOutPattern(val){
			//取消点击对应行
			//清空勾选
			this.$refs.subTable.clearSelection()
			
			this.subReceiptForm.totalAmount = '';
			this.subReceiptForm.totalReceivable = '';
			this.subReceiptForm.bindingSubProjNum = '';
			this.subReceiptForm.bindingSubProjId = '';
			
		},
				
		changeMoneyToChinese(money){  
			var cnNums = new Array("零","壹","贰","叁","肆","伍","陆","柒","捌","玖"); //汉字的数字  
			var cnIntRadice = new Array("","拾","佰","仟"); //基本单位  
			var cnIntUnits = new Array("","万","亿","兆"); //对应整数部分扩展单位  
			var cnDecUnits = new Array("角","分","毫","厘"); //对应小数部分单位  
			//var cnInteger = "整"; //整数金额时后面跟的字符  
			var cnIntLast = "元"; //整型完以后的单位  
			var maxNum = 999999999999999.9999; //最大处理的数字  
			  
			var IntegerNum; //金额整数部分  
			var DecimalNum; //金额小数部分  
			var ChineseStr=""; //输出的中文金额字符串  
			var parts; //分离金额后用的数组，预定义  
			if( money == "" ){  
				return "";  
			}  
			money = parseFloat(money);  
			if( money >= maxNum ){  
				$.alert('超出最大处理数字');  
				return "";  
			}  
			if( money == 0 ){  
				ChineseStr = cnNums[0]+cnIntLast  
				return ChineseStr;  
			}  
			money = money.toString(); //转换为字符串  
			if( money.indexOf(".") == -1 ){  
				IntegerNum = money;  
				DecimalNum = '';  
			}else{  
				parts = money.split(".");  
				IntegerNum = parts[0];  
				DecimalNum = parts[1].substr(0,4);  
			}  
			if( parseInt(IntegerNum,10) > 0 ){//获取整型部分转换  
				var zeroCount = 0;  
				var IntLen = IntegerNum.length;  
				for(var i=0;i<IntLen;i++ ){  
					var n = IntegerNum.substr(i,1);  
					var p = IntLen - i - 1;  
					var q = p / 4;  
					var m = p % 4;  
					if( n == "0" ){  
						zeroCount++;  
					}else{  
						if( zeroCount > 0 ){  
							ChineseStr += cnNums[0];  
						}  
						zeroCount = 0; //归零  
						ChineseStr += cnNums[parseInt(n)]+cnIntRadice[m];  
					}  
					if( m==0 && zeroCount<4 ){  
						ChineseStr += cnIntUnits[q];  
					}  
				}  
				ChineseStr += cnIntLast;  
				//整型部分处理完毕  
			}  
			if( DecimalNum!= '' ){//小数部分  
				var decLen = DecimalNum.length;  
				for(var i=0; i<decLen; i++ ){  
					var n = DecimalNum.substr(i,1);  
					if( n != '0' ){  
						ChineseStr += cnNums[Number(n)]+cnDecUnits[i];  
					}  
				}  
			}  
			if( ChineseStr == '' ){  
				ChineseStr += cnNums[0]+cnIntLast;  
			} 
			return ChineseStr;  
		}
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