<template>
  <div class="container">
    <el-page-header @back="goBack"></el-page-header>
	
	<el-drawer
	  title="登记审核"
	  :before-close="handleDelItem"
	  :visible.sync="registerCheckVisible"
	  direction="rtl"
	  ref="drawer"
	  :modal="false"
	  >
	  <div class="demo-drawer__content" style="padding: 10px;">
	    <el-form ref="registerCheckForm" label-width="125px">
		  <div
		  v-for="(item, index) in registerCheckForm"
		  :key="index">
	      <el-form-item :label="item.label" :prop="item.name">
	        <el-input :id="'name'+item.id" placeholder="输入存在问题, 点右侧按钮可清空" v-model.trim="item[item.name]" clearable></el-input>
	      </el-form-item>
		  </div>
	    </el-form>
		<!-- 
	    <div class="demo-drawer__footer">
		  <div style="text-align: center;">
	      <el-button size="medium" @click="$refs.drawer.closeDrawer()">取消</el-button>
	      <el-button size="medium" type="primary" @click="registerCheckSubmit">提交</el-button>
		  </div>
	    </div>
		 -->
	  </div>
	</el-drawer>
	
	<el-dialog title="修改委托方" :visible.sync="clientNameVisible" :modal="false" v-dialogDrag width="800px"	  >
		<el-form
			ref="clientNameForm"
			:model="clientNameForm"
			:rules="clientNameRules"
			label-width="125px"
		>
			<!-- 
			<el-form-item label="委托方Id" prop="clientId">
				<el-input v-model="clientNameForm.clientId" disabled
					type="textarea" autosize maxlength="240" style="width: 100%;"
				></el-input>
			</el-form-item>
			 -->
			<el-form-item label="委托方简称" prop="clientName">
				<el-input v-model="clientNameForm.clientName" disabled
					type="textarea" autosize maxlength="240" style="width: 100%;"
				></el-input>
			</el-form-item>
			<el-form-item label="委托方全称" prop="clientOldFullName">
					<el-input v-model="clientNameForm.clientOldFullName" disabled
						type="textarea" autosize maxlength="240" style="width: 100%;"
					></el-input>
				</el-form-item>
				<el-form-item label="委托方新全称" prop="toBeAuditClientFullName" class="red-item">
					<el-autocomplete
					  class="input-select"
					  type="textarea"
					  autosize
					  v-model.trim="clientNameForm.toBeAuditClientFullName"
					  :fetch-suggestions="clientFullNameSearch"
					  :popper-append-to-body="false"
					  @select="clientFullNameSelect"
					  clearable 
					  :disabled="clientNameForm.id==''||clientNameForm.canEdit?false:true"
					></el-autocomplete>
					
					
				</el-form-item>
				<el-form-item label="委托方新性质" prop="toBeAuditClientProperty" class="red-item">
					<el-select
						v-model="clientNameForm.toBeAuditClientProperty"
					:disabled="clientNameForm.id==''||clientNameForm.canEdit?false:true"
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
			</el-form>
		<el-table
			:data="clientChangeList"
		>
			<el-table-column label="序号" width="50"
				type="index" align="center"
			></el-table-column>
			<el-table-column
			  label="委托人"
			  prop="clientName"
			>
			</el-table-column>
			<el-table-column
			  label="委托方新全称"
			  prop="toBeAuditClientInfo.toBeAuditClientFullName"
			>
			</el-table-column>
			<el-table-column
			  label="委托方新性质"
			  prop="toBeAuditClientInfo.toBeAuditClientProperty"
			>
			</el-table-column>
			<el-table-column
			  label="申请人"
			  prop="staffName"
			  width="80px"
			>
			</el-table-column>
			<el-table-column
			  label="申请日期"
			  prop="applicationTime"
			  width="85px"
			>
				<template slot-scope="scope">
					{{formatDate(scope.row.applicationTime)}}
				</template>
			</el-table-column>
			<el-table-column
			  label="状态"
			  prop="status"
			  width="80px"
			>
				<template slot-scope="scope">
					<el-tag :type="newStatusType(scope.row.status)">
						{{newStatusValue(scope.row.status)}}
					</el-tag>
				</template>
			</el-table-column>
		</el-table>
		<div
		  slot="footer"
		  class="dialog-footer"
		>
		  <el-button @click="clientNameVisible = false">取 消</el-button>
		  
		  <span style="margin-left: 10px;" 
		  v-if="clientNameForm.id && clientNameForm.canEdit">
			<el-button
				@click="clientNameEdit()"
				type="primary"
			>再次修改</el-button>
			<el-button
				@click="clientNameDel()"
				type="warning"
			>撤销修改</el-button>  
		  </span>
		  
		  <span style="margin-left: 10px;"
		  v-else-if="clientNameForm.id">
			<el-button
				type="warning"
				@click="clientNameVisible = false"
			>已有修改待审核</el-button>    
		  </span>
		  
		  <el-button
			@click="clientNameAdd()"
			type="primary"
		  v-else
		  >提交</el-button>
		</div>
	</el-dialog>
	
    <div class="work-title"
	v-if="subInfoForm">
      <span class="work-title-name">{{newTitleValue(projType)}} <el-tag :type="newButtonType(registerStatus)" plain size="medium">{{newButtonValue(registerStatus)}}</el-tag></span>
	  <span class="work-title-button">
		
		<!-- icon="el-icon-download" 
		<el-button-group style="margin-left: 10px;" v-if="registerStatus>0">
			<el-button type="primary" size="medium" plain disabled>生成</el-button>
			<el-button
				size="medium"
				type="success"
				@click=""
			>二维码</el-button>
		</el-button-group>
		-->
		
		<el-button-group style="margin-left: 10px;" v-if="registerStatus>0">
			<el-button type="primary" size="medium" plain disabled>导出</el-button>
			
			<el-button
				size="medium"
				type="primary"
				@click="exportSubProj('三审', projId,subProjId)"
			>三审</el-button>
			
			<el-button
				size="medium"
				type="primary"
				@click="exportSubProj('正评', projId,subProjId)"
			>正评</el-button>
			
			<el-button
				size="medium"
				type="primary"
				@click="exportSubProj('底单', projId,subProjId)"
			>底单</el-button>
		</el-button-group>		
		<!-- 
		<el-button-group style="margin-left: 10px;" v-else-if="draftData">
			<el-button type="primary" size="medium" plain disabled>导出</el-button>
			
			<el-button
				size="medium"
				type="primary"
				@click="exportSubProj('临时三审', projId,subProjId)"
			>临时三审</el-button>
		</el-button-group>
		 -->
	  </span>
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
	    label-width="120px"
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
	    	<el-autocomplete
			  class="input-select"
			  type="textarea"
			  autosize
			  v-model.trim="addInvoiceForm.invoiceTitle"
			  :fetch-suggestions="invoiceTitleSearch"
			  :popper-append-to-body="false"
			  @select="addInvoiceTitleSelect"
			  clearable 
			  placeholder="请输入发票抬头, 可识别税号 (仅供参考, 部分发票没对应信息)"
			></el-autocomplete>
			
	    </el-form-item>
	    <el-form-item label="发票税号" prop="dutyParagraph">
	    	<el-autocomplete
			  class="input-select"
			  type="textarea"
			  autosize
			  v-model.trim="addInvoiceForm.dutyParagraph"
			  :fetch-suggestions="dutyParagraphSearch"
			  :popper-append-to-body="false"
			  @select="addDutyParagraphSelect"
			  clearable 
			  placeholder="请输入税号, 可识别发票抬头 (仅供参考, 部分发票没对应信息)"
			></el-autocomplete>
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
	    label-width="120px"
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
	    	<el-autocomplete
			  class="input-select"
			  type="textarea"
			  autosize
			  v-model.trim="editInvoiceForm.invoiceTitle"
			  :fetch-suggestions="invoiceTitleSearch"
			  :popper-append-to-body="false"
			  @select="editInvoiceTitleSelect"
			  clearable 
			></el-autocomplete>
			
	    </el-form-item>
	    <el-form-item label="发票税号" prop="dutyParagraph">
	    	<el-autocomplete
			  class="input-select"
			  type="textarea"
			  autosize
			  v-model.trim="editInvoiceForm.dutyParagraph"
			  :fetch-suggestions="dutyParagraphSearch"
			  :popper-append-to-body="false"
			  @select="editDutyParagraphSelect"
			  clearable 
			></el-autocomplete>
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
		ref="subInfoForm"
		:model="subInfoForm"
		label-width="130px"
		:rules="subInfoRules"
		v-if="subInfoForm"
	>	
		<el-divider>委托方信息</el-divider>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="委托方" prop="regClientName" class="red-item">
					<span slot="label" @click="handleAddItem('regClientName','委托方')">委托方</span>
					
					<el-input v-model="subInfoForm.regClientName" readonly style="width: 100%" clearable></el-input>
					<el-tag>计划: {{subInfoForm.regClientShortName}}</el-tag>
					<!-- 
					<el-tooltip effect="dark" content="委托方全称不对, 可以提交修改申请, 由计划部门审核更新" placement="top-start">
					<el-tag @click="editClientName(subInfoForm)">
						修改
					</el-tag>
					</el-tooltip>
					 -->
				</el-form-item>
			</el-col>
			
			<el-col :span="12">
				<el-form-item label="委托方性质" prop="regClientType" class="red-item">
					<span slot="label" @click="handleAddItem('regClientType', '委托方性质')">委托方性质</span>
					
					<el-row>
						<el-col :span="12">
							<el-input v-model="subInfoForm.regClientType" readonly style="width: 100%" placeholder="请点修改按钮, 修改委托方信息"></el-input>
						</el-col>
						
						<el-col :offset="1" :span="6">
							<el-tooltip effect="dark" placement="top">
							<el-button type="primary" size="small" @click="editClientName(subInfoForm)"
							v-if="registerStatus!=3">
								修改全称和性质
							</el-button>
							<div slot="content">1. 修改委托方全称和性质: <br>委托方全称不对, 可以提交修改申请, 由计划部门审核更新<br><br> 2. 缺少共同委托方: <br>如有多个共同委托方, 请联系计划部门添加对应委托方</div>
							</el-tooltip>
						</el-col>
						
					</el-row>
				</el-form-item>
			</el-col>	
		</el-row>
		
		<el-row :gutter="20"
			v-for="(item, index) in subInfoForm.coClientList"
			:key="index"
		>
			<el-col :span="12">
				<el-form-item :label="'共同委托方' + (index + 1)" class="red-item">
					<el-input :value="item.clientFullName?item.clientFullName:(item.clientType<1000?item.clientTypeName+item.clientName:item.clientName)" readonly style="width: 100%"></el-input>
					<el-tag>计划: {{item.clientType<1000? item.clientTypeName + item.clientName:item.clientName}}</el-tag>
				</el-form-item>
			</el-col>
			
			<el-col :span="12">
				<el-form-item :label="'委托方性质' + (index + 1)"  :prop="'clientProperty' + (index + 1)"  class="red-item" 
				:rules="item.clientProperty?[]:clientProperty">
					<el-row>
						<el-col :span="12">
							<el-input v-model="item.clientProperty" readonly style="width: 100%" placeholder="请点修改按钮, 修改委托方信息"></el-input>
						</el-col>
						
						<el-col :offset="1" :span="6">
							<el-button type="primary" @click="editClientName(item, '共同委托方')"
							v-if="registerStatus!=3">
								修 改
							</el-button>
						</el-col>
						
					</el-row>
				</el-form-item>
			</el-col>
		</el-row>
		
		
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="被评估单位" prop="regEvaluatedUnit" class="red-item">
					<span slot="label" @click="handleAddItem('regEvaluatedUnit', '被评估单位')">被评估单位</span>
					
					<el-input v-model="subInfoForm.regEvaluatedUnit" style="width: 100%" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="评估对象" prop="regEvalObject" class="red-item">
					<span slot="label" @click="handleAddItem('regEvalObject', '评估对象')">评估对象</span>
					
					<el-cascader
						v-model="subInfoForm.regEvalObject"
						style="width: 100%"
						:props="{ expandTrigger: 'hover', value:'label', label:'label' }"
						filterable
						:options="regEvalObjectOption"
					>
					</el-cascader>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="行政区域" prop="regAdminRegion" class="red-item">
				  <span slot="label" @click="handleAddItem('regAdminRegion', '行政区域')">行政区域</span>
					
				  <el-cascader
				    v-model="subInfoForm.regAdminRegion"
				    style="width: 100%"
					:props="{ expandTrigger: 'hover', value:'label', label:'label' }"
				    filterable
				    :options="regAdminRegionOption"
				  >
				  </el-cascader>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="数量" prop="regEvalObjCount" class="red-item">
					<!-- 
					<el-input v-model="subInfoForm.regEvalObjCount" style="width: 100%" clearable
					oninput="value=value.replace(/[^\d]/g,'')"
					:min="1"
					type="number"></el-input>
					 -->
					<span slot="label" @click="handleAddItem('regEvalObjCount', '数量')">数量</span>
									
					<el-input v-model.trim="subInfoForm.regEvalObjCount" style="width: 100%" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="贷款人" prop="cdLoaner">
					<span slot="label" @click="handleAddItem('cdLoaner', '贷款人')">贷款人</span>
					
					<el-input v-model.trim="subInfoForm.cdLoaner" style="width: 100%" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="银行名称" prop="cdBankName">
					<span slot="label" @click="handleAddItem('cdBankName', '银行名称')">银行名称</span>
					
					<el-input v-model.trim="subInfoForm.cdBankName" style="width: 100%" clearable></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-divider>报告信息</el-divider>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-form-item label="评估目的" prop="regEvalGoal" class="red-item">
					<span slot="label" @click="handleAddItem('regEvalGoal', '评估目的')">评估目的</span>
					
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
					<span slot="label" @click="handleAddItem('regEvalMethod', '评估方法')">评估方法</span>
					
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
		</el-row>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-form-item label="资产总值(元)" prop="regTotalAssets"
				:rules="subInfoForm.regOwnersEquity?subProjRuleNoReq:subProjRuleReq">
					<span slot="label" @click="handleAddItem('regTotalAssets', '资产总值(元)')">资产总值(元)</span>
				
					<el-input v-model="subInfoForm.regTotalAssets" style="width: 100%" clearable
					placeholder="资产总值和所有者权益二者不能同时为空"
					oninput="value=value.replace(/[^\-\d.]/g,'')"
					@change="handleChangeEvalConclusionValue"></el-input>
					<span v-if="subInfoForm.regTotalAssets">
						{{changeMoneyToChinese(subInfoForm.regTotalAssets)}}
					</span>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="负债总值(元)" prop="regTotalDebts">
					<span slot="label" @click="handleAddItem('regTotalDebts', '负债总值(元)')">负债总值(元)</span>
									
					<el-input v-model="subInfoForm.regTotalDebts" style="width: 100%" clearable
					oninput="value=value.replace(/[^\-\d.]/g,'')"></el-input>
					<span v-if="subInfoForm.regTotalDebts">
						{{changeMoneyToChinese(subInfoForm.regTotalDebts)}}
					</span>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="所有者权益(元)" prop="regOwnersEquity"
				:rules="subInfoForm.regTotalAssets?subProjRuleNoReq:subProjRuleReq">
					<span slot="label" @click="handleAddItem('regOwnersEquity', '所有者权益(元)')">所有者权益(元)</span>
				
					<el-input v-model="subInfoForm.regOwnersEquity" style="width: 100%" clearable
					placeholder="资产总值和所有者权益二者不能同时为空"
					oninput="value=value.replace(/[^\-\d.]/g,'')"
					@change="handleChangeEvalConclusionValue"></el-input>
					<span v-if="subInfoForm.regOwnersEquity">
						{{changeMoneyToChinese(subInfoForm.regOwnersEquity)}}
					</span>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-form-item label="评估结论" prop="regEvalConclusion" class="red-item">
					<span slot="label" @click="handleAddItem('regEvalConclusion', '评估结论')">评估结论</span>
									
					<el-select
						v-model="subInfoForm.regEvalConclusion"
						style="width: 100%;"
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
				<el-form-item label="评估值(元)" prop="regEvalConclusionValue" class="red-item"
				:rules="projType=='非咨询'?inputReq:[]">
					<span slot="label" @click="handleAddItem('regEvalConclusionValue', '评估值(元)')">评估值(元)</span>
					
					<el-input v-model="subInfoForm.regEvalConclusionValue" style="width: 100%" clearable
					oninput="value=value.replace(/[^\-\d.]/g,'')"
					@change="handleChangeStandardFee"
					disabled></el-input>		
					<span v-if="subInfoForm.regTotalAssets && subInfoForm.regOwnersEquity && registerStatus!=3">
					<!-- 
					<el-tag @click="handleCopyEvalConclusionValue('资产总值', subInfoForm.regTotalAssets)">
						资产总值
					</el-tag>
					<el-tag style="margin-left: 10px;" @click="handleCopyEvalConclusionValue('所有者权益', subInfoForm.regOwnersEquity)">
						所有者权益
					</el-tag>
					 -->
					</span>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="出报告日期" prop="regReportIssueDate" class="red-item">
					<span slot="label" @click="handleAddItem('regReportIssueDate', '出报告日期')">出报告日期</span>
					
					<el-date-picker
					  type="date"
					  value-format="yyyy-MM-dd"
					  style="width: 100%"
					  v-model="subInfoForm.regReportIssueDate"
					></el-date-picker>
				</el-form-item>
			</el-col>
		</el-row>
				
		<el-divider>收费信息</el-divider>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-form-item label="凭证类型" prop="cdReceiptType" class="red-item">
					<span slot="label" @click="handleAddItem('cdReceiptType', '凭证类型')">凭证类型</span>
					
					<el-select
						v-model="subInfoForm.cdReceiptType"
						style="width: 100%;"
						@change="handleChangeReceiptType"
					>
						<el-option
							v-for="item, index in cdReceiptTypeOption"
							:key="index"
							:label="item"
							:value="item"
						>
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="16"
			v-if="subInfoForm.cdReceiptType=='专用发票'||subInfoForm.cdReceiptType=='普通发票'">
				<el-form-item label="开票抬头" prop="cdInvoiceTitle">
					<span slot="label" @click="handleAddItem('cdInvoiceTitle', '开票抬头')">开票抬头</span>
					
					<el-tooltip class="item" effect="dark" content="没有该发票信息时, 请先点新增按钮" placement="top-start">
					<el-select
					  v-model="subInfoForm.cdInvoiceTitle"
					  placeholder="请选择, 可输入关键字搜索"
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
					<!-- 
					<div v-if="registerStatus!=3">
					<el-tag @click="handleAddInvoice">
						新增
					</el-tag>
					<el-tag type="warning" @click="handleEditInvoice"  style="margin-left: 10px;"
					v-if="subInfoForm.cdInvoiceTitle != ''">
						修改
					</el-tag>
					</div>
					 -->
				</el-form-item>
			</el-col>
			<el-col :span="16"
			v-else>
				<el-form-item label="开票抬头" prop="cdInvoiceTitle"
				:rules="subInfoForm.cdReceiptType=='开收据'?cdInvoiceTitleReq:[]">
					<span slot="label" @click="handleAddItem('cdInvoiceTitle', '开票抬头')">开票抬头</span>
				
					<el-input v-model="subInfoForm.cdInvoiceTitle" style="width: 100%" clearable
					placeholder="请输入"></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-form-item label="项目分类" prop="cdChargeType" class="red-item">
					<span slot="label" @click="handleAddItem('cdChargeType', '项目分类')">项目分类</span>
									
					<el-select
						v-model="subInfoForm.cdChargeType"
						style="width: 100%;"
						@change="handleChangeStandardFee"
					>
						<el-option
							v-for="item, index in cdChargeTypeOption"
							:key="index"
							:label="item"
							:value="item"
						>
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="联系人" prop="cdContact">
					<span slot="label" @click="handleAddItem('cdContact', '联系人')">联系人</span>
					
					<el-input v-model.trim="subInfoForm.cdContact" style="width: 100%" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="联系电话" prop="cdContactInfo">
					<span slot="label" @click="handleAddItem('cdContactInfo', '联系电话')">联系电话</span>
					
					<el-input v-model.trim="subInfoForm.cdContactInfo" style="width: 100%" clearable></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		
		<el-row :gutter="20">			
			<!-- 	
			<el-col :span="8">
				<el-form-item label="备案号" prop="cdRecordNum" class="red-item">
					<el-input v-model="subInfoForm.cdRecordNum" disabled style="width: 100%" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="备案值(元）" prop="cdRecordValue" class="red-item">
					<el-input v-model="subInfoForm.cdRecordValue" style="width: 100%" clearable
					disabled></el-input>
					<span v-if="subInfoForm.cdRecordValue">
						{{changeMoneyToChinese(subInfoForm.cdRecordValue)}}
					</span>
				</el-form-item>
			</el-col>
			 -->
		</el-row>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-form-item label="是否签协议" prop="cdDoSignAgreement" class="red-item">
					<span slot="label" @click="handleAddItem('cdDoSignAgreement', '是否签协议')">是否签协议</span>
					
					<el-select
						v-model="subInfoForm.cdDoSignAgreement"
						style="width: 100%;"
					>
						<el-option
							v-for="item, index in cdDoSignAgreementOption"
							:key="index"
							:label="item"
							:value="item"
						>
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="预收款金额" prop="cdAdvReceivedAmount" >
					<span slot="label" @click="handleAddItem('cdAdvReceivedAmount', '预收款金额')">预收款金额</span>
					
					<el-input v-model="subInfoForm.cdAdvReceivedAmount" style="width: 100%" clearable
					oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
					<span v-if="subInfoForm.cdAdvReceivedAmount">
						{{changeMoneyToChinese(subInfoForm.cdAdvReceivedAmount)}}
					</span>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="预收款日期" prop="cdAdvReceivedDate" >
					<span slot="label" @click="handleAddItem('cdAdvReceivedDate', '预收款日期')">预收款日期</span>
					
					<el-date-picker
					  type="date"
					  value-format="yyyy-MM-dd"
					  style="width: 100%"
					  v-model="subInfoForm.cdAdvReceivedDate"
					></el-date-picker>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<!-- 
			<el-col :span="8">
				<el-form-item label="评估值(元)" prop="regEvalConclusionValue" class="red-item">
					<el-input v-model="subInfoForm.regEvalConclusionValue" style="width: 100%" clearable
					oninput="value=value.replace(/[^\-\d.]/g,'')"
					disabled></el-input>
				</el-form-item>
			</el-col>
			
			<el-col :span="8">
				<el-form-item label="评估值(元)" prop="cdAssemTotalValue" class="red-item">
					<el-input v-model="subInfoForm.cdAssemTotalValue" style="width: 100%" clearable
					oninput="value=value.replace(/[^\d.]/g,'')"
					@change="handleChangeStandardFee"
					disabled></el-input>
					<span v-if="subInfoForm.cdAssemTotalValue">
						{{changeMoneyToChinese(subInfoForm.cdAssemTotalValue)}}
					</span>
				</el-form-item>
			</el-col>
			 -->
			<el-col :span="8">
				<el-form-item label="标准收费(元)" prop="cdStandardFee" class="red-item">
					<span slot="label" @click="handleAddItem('cdStandardFee', '标准收费(元)')">标准收费(元)</span>
					
					<el-input v-model="subInfoForm.cdStandardFee" style="width: 100%" clearable
					oninput="value=value.replace(/[^\d.]/g,'')"
					@change="handleChangeDiscount"
					:disabled="projType=='非咨询'?true:(isNaN(subInfoForm.regEvalConclusionValue)?false:true)"></el-input>
					<span v-if="subInfoForm.cdStandardFee">
						{{changeMoneyToChinese(subInfoForm.cdStandardFee)}}
					</span>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="应收费用(元)" prop="cdReceivable" class="red-item">
					<span slot="label" @click="handleAddItem('cdReceivable', '应收费用(元)')">应收费用(元)</span>
					
					<el-input v-model="subInfoForm.cdReceivable" style="width: 100%" clearable
					oninput="value=value.replace(/[^\d.]/g,'')"
					@change="handleChangeDiscount"></el-input>
					<span v-if="subInfoForm.cdReceivable">
						{{changeMoneyToChinese(subInfoForm.cdReceivable)}}
					</span>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="折扣" prop="cdDiscount" class="red-item">
					<span slot="label" @click="handleAddItem('cdDiscount', '折扣')">折扣</span>
					
					<el-input v-model="subInfoForm.cdDiscount" disabled style="width: 100%" clearable></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		
		<el-divider>其他信息</el-divider>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-form-item label="备案号" prop="regRecordNum">
					<span slot="label" @click="handleAddItem('regRecordNum', '备案号')">备案号</span>
					
					<el-input v-model="subInfoForm.regRecordNum" style="width: 100%" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="合同号" prop="regContractNum" class="red-item">
					<span slot="label" @click="handleAddItem('regContractNum', '合同号')">合同号</span>
					
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
				<el-form-item label="安排类型" prop="regArrgType" class="red-item">
					<span slot="label" @click="handleAddItem('regArrgType', '安排类型')">安排类型</span>
					
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
		</el-row>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-form-item label="摇珠单/委托书" prop="regEntrustLetterNum">
					<span slot="label" @click="handleAddItem('regEntrustLetterNum', '摇珠单/委托书')">摇珠单/委托书</span>
					
					<el-input v-model="subInfoForm.regEntrustLetterNum" style="width: 100%" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="摇珠/委托时间" prop="regEntrustTime">
					<span slot="label" @click="handleAddItem('regEntrustTime', '摇珠/委托时间')">摇珠/委托时间</span>
					
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
					<span slot="label" @click="handleAddItem('regOutsourceStatus', '外协情况')">外协情况</span>
					
					<el-input v-model="subInfoForm.regOutsourceStatus" style="width: 100%" clearable></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		
		
		<el-divider>项目组成员信息</el-divider>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-form-item label="项目负责人" prop="regProjLeader" class="red-item">
					<span slot="label" @click="handleAddItem('regProjLeader', '项目负责人')">项目负责人</span>
					
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
					<span slot="label" @click="handleAddItem('regSignedAppraiser', '签字估价师')">签字估价师</span>
					
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
					<span slot="label" @click="handleAddItem('regProjProReviewer', '专业复核人')">专业复核人</span>
					
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
					<span slot="label" @click="handleAddItem('regFieldSrvy', '现勘')">现勘</span>
					
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
					<span slot="label" @click="handleAddItem('regInfoVerification', '资料收集验证')">资料收集验证</span>
					
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
					<span slot="label" @click="handleAddItem('regMarketEnquiry', '市场询价调查')">市场询价调查</span>
					
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
					<span slot="label" @click="handleAddItem('regTechExpDrafter', '技术说明')">技术说明</span>
					
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
					<span slot="label" @click="handleAddItem('regReportDrafter', '报告拟稿')">报告拟稿</span>
					
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
					<span slot="label" @click="handleAddItem('regProjArchive', '助理(归档)')">助理(归档)</span>
					
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
					<span slot="label" @click="handleAddItem('regFeeFollowUp', '收费跟进')">收费跟进</span>
					
					<el-select
						v-model="subInfoForm.regFeeFollowUp"
						style="width: 100%;"
						multiple
						clearable
					>
						<el-option
							v-for="item, index in regFeeFollowUpOption"
							:key="index"
							:label="item"
							:value="item"
						>
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="接洽人" prop="cdProjContact" class="red-item">
					<span slot="label" @click="handleAddItem('cdProjContact', '接洽人')">接洽人</span>
					
					<el-tooltip class="item" effect="dark" content="如需修改, 请联系计划部门" placement="top-start">
					<el-input v-model="subInfoForm.cdProjContact" disabled style="width: 100%" clearable></el-input>
					</el-tooltip>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="总审" prop="regFinalReview" class="red-item">
					<span slot="label" @click="handleAddItem('regFinalReview', '总审')">总审</span>
					
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
		
		<el-divider>存在问题</el-divider>
		<el-row :gutter="20" style="margin-bottom: 20px;"
		v-if="workOrderFullList.length">
			<el-col :span="24">
				<el-table
				  :data="workOrderList"
				  element-loading-text="Loading"
				  empty-text='所有问题已处理, 请再次审核, 可点击"全部/待处理"切换查看历史问题'
				  border
				  fit
				  highlight-current-row
				>
				  <el-table-column align="center" label="ID" width="60">
					<template slot-scope="scope">
					  {{ scope.$index+1 }}
					</template>
				  </el-table-column>
				  <el-table-column label="审核日期"  width="100" align="center" prop="woCreationTime">
					<template slot-scope="scope">
					  {{ formatDate(scope.row.woCreationTime) }}
					</template>
				  </el-table-column>
				  <el-table-column label="存在问题" align="center" prop="woOrderContent">
					<template slot-scope="scope">
					  {{ scope.row.woOrderContent }}
					</template>
				  </el-table-column>
				  <el-table-column label="问题状态"  width="100" align="center" prop="woStatus">
					<template slot-scope="scope">
					  <el-tag :type="newWoStatusType(scope.row.woStatus)">
					  	{{newWoStatusValue(scope.row.woStatus)}}
					  </el-tag>
					</template>
				  </el-table-column>
				  <el-table-column
					label="操作"
					width="200"
					align="center">
					<template slot="header" slot-scope="scope">
					  <el-switch
					    v-model="woChangeOption"
					    active-text="待处理"
					    inactive-text="显示全部"
						@change="handleChangeOption">
					  </el-switch>
					</template>
					<template slot-scope="scope">
					  <el-button @click="handleUpdateWorkOrderInfo(scope.row)" type="primary" size="small"
					  :disabled="scope.row.woStatus == 0?false:true">修改</el-button>
					  <el-button @click="handleDelWorkOrderInfo(scope.row)" type="danger" size="small"
					  :disabled="scope.row.woStatus == 0?false:true">撤销</el-button>
					</template>
				  </el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<el-row :gutter="20"
		v-if="!showWorkOrderList">
			<el-col :span="24">
				<el-form-item label="问题汇总">
					<el-input v-model="registerCheckInfo" placeholder="请点击栏目名然后输入对应问题; 或直接输入所有问题" type="textarea" autosize maxlength="2000" style="width: 100%;"
					></el-input>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
	
	
		
	<el-divider></el-divider>
	<div style="text-align: center;"
	v-if="registerStatus == 1">
		<div v-if="!showWorkOrderList">
		<el-button type="warning" icon="el-icon-close" size="medium" @click="failRegisterCheckSubmit()">审核不通过</el-button>
		<el-button type="primary" icon="el-icon-check" size="medium" @click="passRegisterCheckSubmit()">审核通过</el-button>
		</div>
	</div>
	<div style="text-align: center;"
	v-else-if="registerStatus == 3">
		<el-button type="danger" icon="el-icon-refresh-left" size="medium" @click="returnRegisterCheckSubmit()">审核撤回</el-button>
	</div>
	<div style="text-align: center;"
	v-else>
		<el-button type="primary" disabled icon="el-icon-loading" size="medium" >{{newButtonValue(registerStatus)}}</el-button>
		<el-button icon="el-icon-arrow-left" size="medium" @click="goBack" >返回</el-button>
	</div>
	
	<!-- 
	<div style="text-align: center;">
		<el-tooltip class="item" effect="dark" content="临时保存时, 必填项可先不填" placement="top"
		v-if="parseInt(registerStatus) == 0">
			<el-button type="warning" icon="el-icon-document" size="medium" @click.native="subInfoFormSave()">临时保存</el-button>
		</el-tooltip>
		<el-button-group style="margin-left: 20px;">
			<el-button :type="newButtonType(registerStatus)" plain size="medium" disabled>{{newButtonValue(registerStatus)}}</el-button>
			<el-button type="primary" icon="el-icon-edit-outline" size="medium" @click.native="subInfoFormSubmit()"
			v-if="registerStatus!=3">确认提交</el-button>
		</el-button-group>
	</div>
	 -->
  </div>
</template>

<script>
import cityOptions from '../../../public/city.json'
import standardinfoOptions from '../../../public/standardinfo.json'
//api
import { getWorkAssignment, getDetailProjInfo,
		getClientNameChangeInfo, addClientNameChange, editClientNameChange, delClientNameChange} from '@/api/index'
import { getTyshxydm} from '@/api/third'
import { getSubProjectInfoList, editSubProject, getSubProjectInfo, auditSubProjectRegister,
		addSubProjectRegister, editSubProjectRegister, getSubProjectRegisterInfo, getSubProjStatus, getSubProjectRegisterDraft, editSubProjectRegisterDraft, 
		getInvoiceTitleList, addInvoiceTitle, editInvoiceTitle,
		getWorkOrderList, getWorkOrderInfo, updateWorkOrderInfo, delWorkOrderInfo} from '@/api/subReport'
import {downloadExcel} from '../../utils/download';

export default {
	name: 'worksubregister',
	data() {
		return {
			projId:'',
			subProjId:'',
			registerStatus:0,
						
			subInfoForm:"",
			isEdit:false,
						
			//表单验证规则
			subInfoRules:{
				//subSpecialInfoRules特有信息
				regEvaluatedUnit:[{ required: true, message: '请输入被评估单位', trigger: 'blur' }],
				regEvalObject:[{ required: true, message: '请选择评估对象', trigger: 'blur' }],
				regClientName:[{ required: true, message: '请输入委托方', trigger: 'blur' }],
				regClientType:[{ required: true, message: '请点修改按钮, 修改委托方信息', trigger: 'blur' }],
				regAdminRegion:[{ required: true, message: '请选择行政区域', trigger: 'blur' }],
				regEvalObjCount:[{ required: true, message: '请输入数量', trigger: 'blur' }],
				
				//subReportInfoRules报告信息
				regEvalGoal:[{ required: true, message: '请选择评估目的', trigger: 'blur' }],
				regEvalMethod:[{ required: true, message: '请输入评估方法', trigger: 'blur' }],
				regReportIssueDate:[{ required: true, message: '请选择出报告日期', trigger: 'blur' }],
				regEvalConclusion:[{ required: true, message: '请选择评估结论', trigger: 'blur' }],
				regEvalConclusionValue:[
					{ required: true, message: '请选择评估值', trigger: 'blur' },
					{
						validator: (rule, value, callback) => {
							if(value){
								if (/^(\-{0,1})(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/.test(value) == false) {
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
				regTotalAssets:[
					{ required: true, message: '请输入资产总值', trigger: 'blur' },
					{
						validator: (rule, value, callback) => {
							if(value){
								if (/^(\-{0,1})(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/.test(value) == false) {
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
								if (/^(\-{0,1})(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/.test(value) == false) {
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
								if (/^(\-{0,1})(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/.test(value) == false) {
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
				//regRecordNum:[{ required: true, message: '请输入备案号', trigger: 'blur' }],
				regContractNum:[{ required: true, message: '请在前页面取合同号', trigger: 'blur' }],
				regArrgType:[{ required: true, message: '请联系计划部门选择安排类型', trigger: 'blur' }],
				
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
				
				//原来底单
				cdChargeType:[{ required: true, message: '请选择项目分类', trigger: 'blur' }],
				
				cdProjContact:[{ required: true, message: '请输入接洽人', trigger: 'blur' }],				
				
				cdInvoiceTitle:[{ required: true, message: '请输入开票抬头', trigger: 'blur' }],
				cdDoSignAgreement:[{ required: true, message: '请选择预收款日期', trigger: 'blur' }],
				cdAssemTotalValue:[
					{ required: true, message: '请输入评估值', trigger: 'blur' },
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
				cdStandardFee:[
					{ required: true, message: '请输入标准收费', trigger: 'blur' },
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
				cdReceivable:[
					{ required: true, message: '请输入应收评估费', trigger: 'blur' },
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
				cdReceiptType:[{ required: true, message: '请选择开具收费凭证', trigger: 'blur' }],
				cdDiscount:[{ required: true, message: '请选择折扣', trigger: 'blur' }],
			},
			
			clientProperty:[{ required: true, message: '请点修改按钮, 修改委托方信息', trigger: 'blur' }],
			
			subProjRuleNoReq:[
				{
					validator: (rule, value, callback) => {
						if(value){
							if (/^(\-{0,1})(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/.test(value) == false) {
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
				{ required: true, message: '请填写资产总值或所有者权益',trigger: 'blur'},
				{
					validator: (rule, value, callback) => {
						if(value){
							if (/^(\-{0,1})(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/.test(value) == false) {
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
			cdInvoiceTitleReq:[{ required: true, message: '请输入开票抬头', trigger: 'blur' }],
			inputReq:[{ required: true, message: '请输入', trigger: 'blur' }],
			invoiceTypeOptions:['专用发票','普通发票'],
			
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
			/* 
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
			 */
			//评估目的
			regEvalGoalOption:['IPO上市','公司制改建','对外投资','接受投资','合并、分立、破产、清算、解散','股东股权比例变动','产权转让','上市公司发行股份购买资产','资产转让、置换、拍卖','资产抵押/质押','资产捐赠','资产租赁','资产补偿/损失补偿','资产偿债','资产涉讼','资产收购','接受抵债资产','债转股','债务重组及其他','追溯评估','复核报告','了解价值','财务会计报告目的','计税价格评估','认定报关价格','其他'],
			regEvalMethodOption:['成本法', '收益法', '市场法', '实物期权法'],
			regEvalConclusionOption:['确定值','区间值'],
			
			//行政区域
			regAdminRegionOption:[],
			
			//安排类型
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
			
			
			//项目分类
			cdChargeTypeOption:['资产类','房地产类','土地类','会计审计','咨询评价'],
			
			//是否签协议
			cdDoSignAgreementOption:['是','否'],
			
			//开具收费凭证
			cdReceiptTypeOption:['专用发票','普通发票','开收据','无'],
			
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
			
			//发票列表
			invoiceTitleList:[],
			//invoiceOptions:[],
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
						
			//委托方修改对话框
			clientNameVisible:false,
			clientNameTitle:'',
			clientNameForm:{
				clientId: "", //委托方id
				clientName: "", //委托方简称
				clientOldFullName: "", //委托方旧全称
				toBeAuditClientFullName: "", //待审核名称
				toBeAuditClientProperty: "", //待审核委托人性质
				toBeAuditClientPropertyTemp: "", //待审核委托人性质旧
			},
			clientNameRules:{
				toBeAuditClientFullName: [{ required: true, message: '请输入新的委托方全称', trigger: 'blur' }],
				toBeAuditClientProperty: [{ required: true, message: '请选择新的委托方性质', trigger: 'blur' }],
			},
			
			clientChangeList:[],
			
			//临时数据
			draftData: false,
			
			//登记审核对话框
			registerCheckVisible:false,
			//registerCheckTitle:'',
			//registerCheckItemInfo:{},
			registerCheckForm:[],
			registerCheckRules:{
			},
			registerCheckInfo:'',
			
						
			//工单列表
			workOrderList:[],
			workOrderFullList:[],
			showWorkOrderList:false,
			woChangeOption:true,
			
			//211101变动 新增: 多个公司切换
			companyRange:['HZ', 'ZM','HZKJ'],
			companyId:'',
			companyTabsId: 0,
		}
	},
	computed:{
		newButtonType(){
			return (data)=>{
				if(data == 1){
					return "primary";
				}else if(data == 2){
					return "warning";
				}else if(data == 3){
					return "success";
				}else if(data == 4){
					return "danger";
				}else{
					return "info";
				}
			}
		},
		newButtonValue(){
			return (data)=>{
				if(data == 1){
					return "待审核";
				}else if(data == 2){
					return "未通过";
				}else if(data == 3){
					return "已通过";
				}else if(data == 4){
					return "已撤回";
				}else{
					return "未提交";
				}
			}
		},
		
		newStatusType(){
			return (data)=>{
				if(data == 0){
					return "primary";
				}else if(data == 1){
					return "success";
				}else if(data == 2){
					return "warning";
				}else{
					return "info";
				}				
			}
		},
		newStatusValue(){
			return (data)=>{
				if(data == 0){
					return "待审核";
				}else if(data == 1){
					return "已通过";
				}else if(data == 2){
					return "未通过";
				}else{
					return "info";
				}				
			}
		},
		
		newWoStatusType(){
			return (data)=>{
				if(data == 0){
					return "primary";
				}else if(data == 1){
					return "success";
				}else if(data == 2){
					return "info";
				}				
			}
		},
		newWoStatusValue(){
			return (data)=>{
				if(data == 0){
					return "待处理";
				}else if(data == 1){
					return "已处理";
				}else if(data == 2){
					return "已撤销";
				}				
			}
		},
		newTitleValue(){
			return (data)=>{
				if(data == '非咨询'){
					return "资产子项目信息";
				}else{
					return "资产咨询子项目信息";
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
		//console.log(this.projId, this.subProjId);
		
		this.regAdminRegionOption = cityOptions;
						
		//读取远程数据
		this.getSubProjData(this.projId, this.subProjId);
		
		//读取发票列表
		this.getInvoiceTitleListData(this.projId, (itData)=>{
			this.invoiceTitleList = itData
		});
		
		//读取工单列表
		this.handleRefreshWorkOrderList();
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
		
		
		//临时保存
		subInfoFormSave(){
			//临时保存不做表单验证
			/* this.$refs.subInfoForm.validate((valid) => {
				if (valid) { */
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
									
					editSubProjectRegisterDraft(subData, this.companyId)
					.then(res => {
						this.$message.success('项目正评信息临时保存成功')
						
						//刷新表单
						this.getSubProjData(this.projId, this.subProjId);
					})
					.catch(err => {
					})
					
			/* 	}else{
					this.$message('请填写必填信息或格式有误');
				}
			}) */
		},
		//提交		
		subInfoFormSubmit(){
			const confirmText = this.registerStatus==2?'审核不通过的问题已处理, 确认再次提交?':'确认提交正评信息?';
			const confirmType = this.registerStatus==2?'warning':'info';
			
			this.$refs.subInfoForm.validate((valid) => {
				if (valid) {
					this.$confirm(confirmText, '提示', { type: confirmType })
					.then(() => {
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
						
						//console.log(subData)
						
						
						if(this.isEdit){
							editSubProjectRegister(subData, this.companyId)
							.then(res => {
								this.$message.success('项目正评信息修改成功')
								
								//刷新表单
								this.getSubProjData(this.projId, this.subProjId);
								
								//刷新工单列表
								this.handleRefreshWorkOrderList();
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
						
					})
					
				}else{
					this.$message('请填写必填信息或格式有误');
				}
			})
		},
		
		//远程调用
		getSubProjData(projId, subProjId){
			
			this.getSubProjStatusData(projId, subProjId, (ssData)=>{
				console.log('ssData', ssData)
				this.registerStatus = parseInt(ssData.mainStatus)
				
				if(this.registerStatus >= 1){
					//情况1 修改: 有数据时, 调用计划信息, 使用正评信息
				
					//获取项目正评数据
					const subData = {
						projId: projId,
						subProjId: subProjId
					}			
					getSubProjectRegisterInfo(subData, this.companyId)
					.then(res => {
						if (res.statusCode == 200) {
							if(res.data){
								this.isEdit = true;
								console.log("有数据", res.data);
								
								//调用计划信息
								this.getDetailProjData(projId, (dpData)=>{
									console.log('dpData', dpData);
									
									this.projType = dpData.projType==1020?'非咨询':'资产咨询';
									
									//1. 传值
									//var spFullData = Object.assign({}, res.data)
									var spFullData = res.data
									
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
									
									//处理调用的计划数据
									if(dpData){
										//委托方
										spFullData.regClientName = dpData.clientFullName || dpData.clientName;
										spFullData.regClientType = dpData.clientProperty;
										spFullData.regClientId = dpData.clientId;	
										spFullData.regClientShortName = dpData.clientName;	
										spFullData.regClientFullName = dpData.clientFullName;	
										
										spFullData.coClientList = dpData.coClientList||[];
										
										//安排类型
										if(dpData.arrgType == '1001'){
											spFullData.regArrgType = "L";
										}else if(dpData.arrgType == '1002'){
											spFullData.regArrgType = "A";
										}										
										//合同号
										//更新: 220418 处理合同号为空时
										//spFullData.regContractNum = dpData.contractNum.contractNum;
										spFullData.regContractNum = dpData.contractNum?dpData.contractNum.contractNum:null;
										//接洽人
										spFullData.cdProjContact = dpData.projContact											
										//项目类型
										//this.subInfoForm.cdChargeType = '资产类'
									}
									
									//处理发票修改
									if(spFullData.cdInvoiceTitle){
										this.handleChangeInvoiceTitle(spFullData.cdInvoiceTitle);
									}
									
									//this.subInfoForm = spFullData;
									this.subInfoForm = Object.assign({}, spFullData)
															
									//2. 生成各字段option
									this.getSubProjectData(projId, subProjId, (spData)=>{
										//设置项目组选项
										const teamOptionInfo = (spData.subProjLeader+","+spData.subProjReviewer+","+spData.subProjProReviewer+","+spData.subProjAsst+","+spData.subFieldSrvy).replace(",,",",")
										this.subTeamOption = Array.from(new Set(teamOptionInfo.split(',')));
										this.regFeeFollowUpOption =this.subTeamOption.concat(this.subInfoForm.cdProjContact?this.subInfoForm.cdProjContact.split(','):[]);
									});
								});
								
							}else{
								this.$message.warning("项目正评数据获取失败")
							}
						}
					})
					.catch(err => {
						console.log('获取正评信息', err)
					})
				}else{
					//情况2 有临时数据时, 使用临时数据
					this.getSubProjectRegisterDraftData(projId, subProjId, (ddData)=>{
						if(ddData){
							this.isEdit = false;
							console.log("有临时数据", ddData);
							
							this.draftData = true;
							
							this.$message.success("已成功加载临时数据")
							
							//调用计划信息
							this.getDetailProjData(projId, (dpData)=>{
								console.log('dpData', dpData);
							
								this.projType = dpData.projType==1020?'非咨询':'资产咨询';
														
								//1. 传值
								var spFullData = ddData
								
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
								
								//处理调用的计划数据
								if(dpData){
									//委托方
									spFullData.regClientName = dpData.clientFullName || dpData.clientName;
									spFullData.regClientType = dpData.clientProperty;
									spFullData.regClientId = dpData.clientId;	
									spFullData.regClientShortName = dpData.clientName;	
									spFullData.regClientFullName = dpData.clientFullName;								
									
									spFullData.coClientList = dpData.coClientList||[];
																		
									//安排类型
									if(dpData.arrgType == '1001'){
										spFullData.regArrgType = "L";
									}else if(dpData.arrgType == '1002'){
										spFullData.regArrgType = "A";
									}										
									//合同号
									//更新: 220418 处理合同号为空时
									//spFullData.regContractNum = dpData.contractNum.contractNum;
									spFullData.regContractNum = dpData.contractNum?dpData.contractNum.contractNum:null;
									//接洽人
									spFullData.cdProjContact = dpData.projContact											
									//项目类型
									//this.subInfoForm.cdChargeType = '资产类'
								}
								
								//处理发票修改
								if(spFullData.cdInvoiceTitle){
									this.handleChangeInvoiceTitle(spFullData.cdInvoiceTitle);
									console.log('2',spFullData.cdInvoiceTitle)
								}
								
								this.subInfoForm = Object.assign({}, spFullData)
														
								//2. 生成各字段option
								this.getSubProjectData(projId, subProjId, (spData)=>{
									//设置项目组选项
									const teamOptionInfo = (spData.subProjLeader+","+spData.subProjReviewer+","+spData.subProjProReviewer+","+spData.subProjAsst+","+spData.subFieldSrvy).replace(",,",",")
									this.subTeamOption = Array.from(new Set(teamOptionInfo.split(',')));
									this.regFeeFollowUpOption =this.subTeamOption.concat(this.subInfoForm.cdProjContact?this.subInfoForm.cdProjContact.split(','):[]);
								});							
							});
						}else{
							//情况3 新增: 没数据时, 使用计划信息, 子项目基本信息, 安排信息, 合成初始化数据
							this.isEdit = false;
							//1 获取计划信息, 子项目基本信息, 安排信息
							this.getDetailProjData(projId, (dpData)=>{
								this.getSubProjectData(projId, subProjId, (spData)=>{
									this.getWorkAssignmentData(projId, subProjId, (waData)=>{
										console.log('dpData', dpData);
										console.log('spData', spData);
										console.log('waData', waData);
										
										this.projType = dpData.projType==1020?'非咨询':'资产咨询';
										
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
											regClientId:"", 
											regClientShortName:"",
											regClientFullName:"", 
											
											regClientType:"", //委托方性质
											regEvaluatedUnit:"", //被评估单位
											regEvalObject:[],  //评估对象
											regEvalObjCount:"", //数量
											regAdminRegion:[], //行政区域 省市区
										
											//subReportInfo
											regEvalGoal:"", //评估目的
											regEvalMethod:[], //"市场法"
											regReportIssueDate:"", //出报告日期
											regEvalConclusion:"", //评估结论
											regEvalConclusionValue:"", //评估值
											regTotalAssets:"", //资产总值
											regTotalDebts:"", //负债总值
											regOwnersEquity:"", //所有者权益
										
											//subOtherInfo
											regRecordNum:"", //备案号
											regContractNum:"", //合同号
											regEntrustLetterNum:"", //摇珠单/委托书编号
											regEntrustTime:"", //摇珠/委托时间
											regOutsourceStatus:"", //外协情况
											regArrgType:"", //安排类型 轮序  L轮序 1001, A安排 1002											
										
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
											
											
											cdDoSignAgreement : '', //是否签协议
											cdAdvReceivedAmount : '', //预收款金额
											cdAdvReceivedDate : '', //预收款日期
											
											cdBankName : '', //银行名称
											cdChargeType: "", //项目分类
											cdContact: "", //联系人
											cdContactInfo: "", //联系电话
											
											cdInvoiceTitle: "", //付款单位\个人（开票抬头
											cdLoaner: "", //贷款人
											cdReceiptType: "普通发票", //开具收费凭证
											cdReceivableNum: "", //应收账款编号
											
											cdStandardFee : '', //标准收费（元）//从评估值计算得到
											cdReceivable : '', //应收评估费（元）
											cdDiscount : '', //折扣
										}
										
										
										if(dpData){
											//委托方
											this.subInfoForm.regClientName = dpData.clientFullName || dpData.clientName;
											this.subInfoForm.regClientId = dpData.clientId;	
											this.subInfoForm.regClientShortName = dpData.clientName;
											this.subInfoForm.regClientFullName = dpData.clientFullName;
											this.subInfoForm.regClientType = dpData.clientProperty;
											
											
											this.subInfoForm.coClientList = dpData.coClientList||[];
											
											//安排类型
											if(dpData.arrgType == '1001'){
												this.subInfoForm.regArrgType = "L";
											}else if(dpData.arrgType == '1002'){
												this.subInfoForm.regArrgType = "A";
											}
											
											//合同号
											//更新: 220418 处理合同号为空时
											//this.subInfoForm.regContractNum = dpData.contractNum.contractNum;
											this.subInfoForm.regContractNum = dpData.contractNum?dpData.contractNum.contractNum:null;
																						
											//接洽人
											this.subInfoForm.cdProjContact = dpData.projContact											
											
											//项目类型
											this.subInfoForm.cdChargeType = this.projType=='非咨询'?'资产类':'咨询评价'
											
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
											
											//设置项目跟进选项, 将接洽人加入到收费跟进里面
											//this.regFeeFollowUpOption = Object.assign({}, this.subTeamOption);
												//将接洽人加入到收费跟进里面
											this.regFeeFollowUpOption =this.subTeamOption.concat(this.subInfoForm.cdProjContact?this.subInfoForm.cdProjContact.split(','):[]);
											
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
					});
					
					
				}
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
		//子项目状态
		getSubProjectRegisterDraftData(projId, subProjId, successc) {
		  //211101变动 新增: 多个公司切换
			const statusData = {
				projId: projId,
				subProjId: subProjId,
			}
			getSubProjectRegisterDraft(statusData, this.companyId)
		    .then(res => {
				if (res.statusCode == 200) {
					successc(res.data);
				}
		    })
		    .catch(err => {
		      console.log('获取正评临时信息', err)
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
		
		//第三方统一社会信用代码
		getTyshxydmData(companyCode, companyName, successc) {			
			const dmData = {
				keyword: companyCode||companyName,
				scenes:'defaultscenario',
				tableName:'credit_xyzx_tyshxydm',
				searchState:2,
				page: 1,
				pageSize: 50
			}
			getTyshxydm(dmData)
			.then(res => {
				successc(res.data);
			})
		},
		
		importSubProj(){
			this.$message.info('导入功能未完成')
		},
		
		exportSubProj(exportType, projId,subProjId){
			var formData = new FormData()
			formData.append('projId', projId)
			formData.append('subProjId', subProjId)
				
			if(this.registerStatus>0){
				if(exportType == '正评'){
					const path = 'register/exportRegisterInfoExcel'
					downloadExcel(formData, path, this.companyId)
				}else if(exportType == '底单'){
					const path = 'register/chargeDoc/exportExcel'
					downloadExcel(formData, path, this.companyId)
				}else if(exportType == '三审'){
					const path = 'register/exportTriAuditFormExcel'
					downloadExcel(formData, path, this.companyId)
				}
			}else if(exportType == '临时三审'){
				const path = 'register/exportTriAuditFormExcel'
				downloadExcel(formData, path, this.companyId)
			}else{
				this.$message.warning('请提交后, 再导出')
			}
		},
		
		//项目分类改变, 修改标准收费
		handleChangeStandardFee(handle){			
			if(this.subInfoForm.regEvalConclusionValue){
				const chargeType = this.subInfoForm.cdChargeType;
				var chargeTypeIndex = 0;
				if(chargeType == "资产类"){
					chargeTypeIndex = 0;
				}else if(chargeType == "房地产类"){
					chargeTypeIndex = 1;
				}else if(chargeType == "土地类"){
					chargeTypeIndex = 2;
				}else if(chargeType == "会计审计"){
					chargeTypeIndex = 3;
				}else if(chargeType == "咨询评价"){
					//处理咨询
					if(this.projType == '资产咨询'){
						chargeTypeIndex = 0;						
					}else if(this.projType == '房地产咨询'){
						chargeTypeIndex = 1;						
					}else if(this.projType == '土地咨询'){
						chargeTypeIndex = 2;
					}
				}
				
				if(chargeTypeIndex <= 2){
					//console.log(chargeTypeIndex)
					const counterPrice = parseFloat(this.subInfoForm.regEvalConclusionValue / 10000)
					
					const counterInfo = standardinfoOptions[chargeTypeIndex].standard_info;
					
					var feesInfo =[];
					var fees = 0;
					
					//计算费用
					counterInfo.forEach(item=>{
						var counter_fees = 0;
						if(counterPrice >= parseInt(item.counter_up)){
							counter_fees = (parseInt(item.counter_up) - parseInt(item.counter_down)) * parseFloat(item.counter_rate) * 10;
						}else{
							if(counterPrice >= parseInt(item.counter_down)){
								counter_fees = (counterPrice - parseInt(item.counter_down)) * parseFloat(item.counter_rate) * 10;
							}else{
								counter_fees = 0;
							}
						}
						feesInfo.push(counter_fees);
						fees += counter_fees;
					});
					//费用少于2000时, 按2000标准
					if(fees<2000){
						fees = 2000;
					}
					this.subInfoForm.cdStandardFee =  fees.toFixed(2);
				}else{
					this.subInfoForm.cdStandardFee = "--"
				}
				
				//改变折扣
				this.handleChangeDiscount()
			}
		},
		
		//改变折扣
		handleChangeDiscount(){
			if(this.subInfoForm.cdStandardFee != "--" && this.subInfoForm.cdStandardFee != 0){
				this.subInfoForm.cdDiscount = Math.round(this.subInfoForm.cdReceivable / this.subInfoForm.cdStandardFee * 10000) / 100 + "%";
			}else{
				this.subInfoForm.cdDiscount = "--"
			}
		},
		
		handleInputRegTotalAssets(val){
			if(this.projType=='非咨询'){
				this.subInfoForm.regTotalAssets = val.replace(/[^\-\d.]/g,'')
			}
		},
		
		//改变评估值
		handleChangeEvalConclusionValue(val){
			if(this.subInfoForm.regTotalAssets && this.subInfoForm.regOwnersEquity){
				//两个值都有时, 清空值, 自行选择
				this.subInfoForm.regEvalConclusionValue = ''
				this.subInfoForm.cdStandardFee = ''
				this.subInfoForm.cdDiscount = ''
			}else if(this.subInfoForm.regTotalAssets){
				this.subInfoForm.regEvalConclusionValue = this.subInfoForm.regTotalAssets;
				//改变标准收费
				this.handleChangeStandardFee();
			}else if(this.subInfoForm.regOwnersEquity){
				this.subInfoForm.regEvalConclusionValue = this.subInfoForm.regOwnersEquity;
				//改变标准收费
				this.handleChangeStandardFee();
			}else{
				this.subInfoForm.regEvalConclusionValue = ''
				this.subInfoForm.cdStandardFee = ''
				this.subInfoForm.cdDiscount = ''
			}
			
			
		},
		
		handleCopyEvalConclusionValue(title, val){
			this.subInfoForm.regEvalConclusionValue = val
			this.$message.success("使用"+title+"作为评估值")
			
			//改变标准收费
			this.handleChangeStandardFee()
		},
		
		//委托方修改信息
		getClientNameChangeInfoData(clientId, successc) {
		  //211101变动 新增: 多个公司切换
			const ciData = {
				clientId: clientId,
			}
			getClientNameChangeInfo(ciData, this.companyId)
			.then(res => {
				if (res.statusCode == 200) {
					successc(res.data);
				}
			})
			.catch(err => {
			  console.log('委托方修改信息', err)
			})
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
		
		invoiceTitleQuerySearch(query, callback) {
			var str=query?query.replace(/[ `~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/g,''):'';
			if(str){
			  this.loading = true;
			  setTimeout(() => {
				this.loading = false;
				
				var res=[];
				var key = "";
				
				for(var i=0 ; i<=str.length ;i++){
				  const newvalue = str.slice(i,i+1); 
				  if(newvalue.length != 0){
					if(res.indexOf(newvalue)==-1){
					  res.push(newvalue);
					  key+="(?=.*"+newvalue+")";
					}                
				  }
				}
				
				key = eval("/"+key+"^.*/g");
				
				//发票
				this.invoiceOptions = [];
				this.invoiceOptions = this.invoiceTitleList.filter(item => {
				  return item.invoiceTitle.match(key);
				  // key=eval("/(?=.*关)(?=.*键)(?=.*字)^.*/g")
				});
				
				for(let i of this.invoiceOptions){  
					i.value = i.invoiceTitle; //i.projNum + " | " + i.invoiceTitle;
				}			
				callback(this.invoiceOptions);
				
			  }, 10);
			}else{
				this.invoiceOptions = []; 
				callback(this.invoiceOptions);
			}
		},
		
		//添加修改发票
		handleChangeReceiptType(val){
			if(val == '专用发票' || val == '普通发票'){
				this.subInfoForm.cdInvoiceTitle = [];
			}else{
				this.subInfoForm.cdInvoiceTitle = '';
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
			
			params.receiptType = this.subInfoForm.cdReceiptType;
			
			params.invoiceTitleTemp = params.invoiceTitle;
			params.dutyParagraphTemp = params.dutyParagraph;
			
			//保存选中发票信息
			this.invoiceInfo =  Object.assign({}, params)
		},	
		handleAddInvoice(){
			console.log('addInvoice')
			const addInvoiceForm = {
				receiptType : this.subInfoForm.cdReceiptType, //发票类型
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
		
		handleEditInvoice(val){
			console.log('editInvoice', this.invoiceInfo)
			
			//this.editInvoiceForm = Object.assign({}, this.invoiceInfo);
			this.invoiceInfo.receiptType = this.subInfoForm.cdReceiptType; //发票类型
			this.editInvoiceForm = this.invoiceInfo;
			
			this.editInvoiceDialogVisible = true;
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
		
		editInvoiceFormSubmit(projId){
			this.$refs.editInvoiceForm.validate((valid) => {
				if (valid) {
					const invoiceData = this.editInvoiceForm
					//console.log(invoiceData)
					
					editInvoiceTitle(invoiceData, this.companyId)
					.then(res => {
						if(res.statusCode == 200){
							this.$message.success('发票信息修改成功')
							
							this.editInvoiceDialogVisible = false;
							
							//刷新发票表单
							this.getInvoiceTitleListData(projId, (itData)=>{
								this.invoiceTitleList = itData
								
								this.subInfoForm.cdInvoiceTitle = invoiceData.invoiceTitle;
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
		
		
		editClientName(clientData, handle) {
			//this.$message("问题记录")
			var subData = {};
			if(handle == '共同委托方'){
				subData = {
					regClientId: clientData.clientId,
					regClientShortName:clientData.clientType<1000?clientData.clientTypeName+clientData.clientName:clientData.clientName,
					regClientFullName:clientData.clientFullName,
					regClientType:clientData.regClientType||clientData.clientProperty,
				}
			}else{
				subData = {
					regClientId: clientData.regClientId,
					regClientShortName:clientData.regClientShortName,
					regClientFullName:clientData.regClientFullName,
					regClientType:clientData.regClientType||clientData.clientProperty,
				}
			}
			
			//1. 判断是否有修改没处理
			this.getClientNameChangeInfoData(subData.regClientId, (ciData)=>{
				console.log('ciData', ciData)
				this.clientChangeList = ciData;
				
				var id = '';
				var canEdit = false;
				/*已改为直接通过审核, 不用对待审核信息处理
				//var toBeAuditName= '';
				var toBeAuditClientFullName= '';
				var toBeAuditClientProperty= '';
				var toBeAuditClientPropertyTemp= '';
				
				if(ciData.length > 0){
					//最后一个状态是否为0
					const lastItem = ciData[ciData.length-1];
					if(lastItem.status == 0){
						//判断是本人
						id = lastItem.id;
						toBeAuditClientFullName = lastItem.toBeAuditClientInfo.toBeAuditClientFullName;
						toBeAuditClientProperty = lastItem.toBeAuditClientInfo.toBeAuditClientProperty;
						toBeAuditClientPropertyTemp = toBeAuditClientProperty;
						if(lastItem.staffId == localStorage.getItem('staffId')){
							canEdit = true;
						}						
					}else if(lastItem.status == 1){
						toBeAuditClientFullName = lastItem.toBeAuditClientInfo.toBeAuditClientFullName;
						toBeAuditClientProperty = lastItem.toBeAuditClientInfo.toBeAuditClientProperty;
						toBeAuditClientPropertyTemp = toBeAuditClientProperty;
					}
				}
				*/
				
				
				//初始化表单
				const clientNameForm={
					projId: this.projId,
					clientId:  parseInt(subData.regClientId), //委托方id
					clientName: subData.regClientShortName, //委托方简称
					clientOldFullName: subData.regClientFullName, //委托方旧全称
					toBeAuditClientFullName: subData.regClientFullName||subData.regClientShortName.replace('分行','').replace(/[ `~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/g,''), //待审核名称
					toBeAuditClientProperty: subData.regClientType, //待审核委托人性质
					toBeAuditClientPropertyTemp: subData.regClientType, //待审核委托人性质旧
					id: id, //委托方修改Id
					canEdit: canEdit
				}		
				this.clientNameForm = clientNameForm;
				
				//console.log('clientNameForm', clientNameForm)
				
				this.clientNameVisible = true
			});
			
			
		},
			
		checkClientNameSimilar(oldName, newName){
			//1.拆解旧名
			//2.过滤掉常见词
			oldName =oldName?oldName.replace(/[ `~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/g,'').replace('分行',''):'';
			
			var strArr = ['中国','广东','广州','深圳','佛山','东莞','中山','珠海','江门','肇庆','惠州','汕头','潮州','揭阳','汕尾','湛江','茂名','阳江','云浮','韶关','清远','梅州','股份有限公司','分行'];
			strArr.forEach((item, index) =>{
				oldName = oldName.replace(item,'')
				newName = newName.replace(item,'')
			});
			var res=[];			
			var similarnum = 0;
			var similarlength = newName.length;
			
			for(var i=0 ; i<=oldName.length ;i++){
			  const newvalue = oldName.slice(i,i+1); 
			  if(newvalue.length != 0){
				if(res.indexOf(newvalue)==-1){
				  res.push(newvalue);
				  if(newName.indexOf(""+newvalue) != -1){
					similarnum++;
				  }
				}                
			  }
			}
			return (similarnum*100/similarlength).toFixed(0);
			
		},
			
		clientNameAdd(){
			this.$refs.clientNameForm.validate((valid) => {
				if(this.clientNameForm.clientOldFullName == this.clientNameForm.toBeAuditClientFullName && this.clientNameForm.toBeAuditClientProperty == this.clientNameForm.toBeAuditClientPropertyTemp ){
					this.$message.warning('新的名称和性质跟之前一样, 请确认后再提交');
				}else{
					if (valid) {	
						//提示相识度
						const clientNameSimilar = this.checkClientNameSimilar(this.clientNameForm.clientName, this.clientNameForm.toBeAuditClientFullName);
						
						if(clientNameSimilar<30){
							
							this.$confirm('委托方和委托方全称相似度有点低, 确认他们是同一个主体?', '提示', { type: 'warning' })
							.then(() => {
								this.clientNameConfirmAdd();
							}).catch(err => {
							})
						}else{
							this.clientNameConfirmAdd();
						}						
					}else{
						this.$message('请填写必填信息或格式有误');
					}
				}
			})
		},
		clientNameConfirmAdd(){
			//提示是否同一主体
			const h = this.$createElement
			this.$confirm('提交确认提示', {
				title: '提交确认提示',
				message: h('div', [h('p', '确认是同一主体的委托方信息, 只是修改其全称或性质?'), h('p', '_______________________________________________'), h('p', '(注意:不是同一主体, 请先联系计划部门更换委托方)'), h('p', '将"惠正公司"改成"惠州市智明管理咨询与测绘技术有限公司"'), h('p', '要先联系计划部门, 将委托方换成 "智明公司", 再录入全称')]),
				confirmButtonText: '确定',
				cancelButtonText: '取消',
			})
			.then(() => {
				const addData =this.clientNameForm; 					
				
				addClientNameChange(addData, this.companyId)
				.then(res => {
					this.$message.success('修改委托方提交成功');
					
					this.clientNameVisible = false;
					
					//刷新表单委托方和共同委托方信息
					this.getDetailProjData(this.projId, (dpData)=>{
						if(dpData){										
							//更新委托方
							this.subInfoForm.regClientName = dpData.clientFullName || dpData.clientName;
							this.subInfoForm.regClientType = dpData.clientProperty;
							this.subInfoForm.regClientId = dpData.clientId;	
							this.subInfoForm.regClientShortName = dpData.clientName;
							this.subInfoForm.regClientFullName = dpData.clientFullName;
							
							//更新共同委托方
							this.subInfoForm.coClientList = dpData.coClientList||[];
						}
					});
					
				})
				.catch(err => {
				})
			}).catch(err => {
			})
		},
		
		
		//编辑和撤销接口已被移除, 助理提交直接生效
		clientNameEdit(){
			if(this.clientNameForm.clientOldFullName == this.clientNameForm.toBeAuditClientFullName && this.clientNameForm.toBeAuditClientProperty == this.clientNameForm.toBeAuditClientPropertyTemp ){
				this.$message.warning('新的名称和性质跟之前一样, 请确认后再提交');
			}else{
				this.$refs.clientNameForm.validate((valid) => {
					if (valid) {
						//console.log('clientName', this.clientNameForm);
						this.$confirm('确认提交修改?', '提示', { type: 'info' })
						.then(() => {
							const editData =this.clientNameForm; 					
							
							editClientNameChange(editData, this.companyId)
							.then(res => {
								this.$message.success('修改委托方再次修改成功');
								
								this.clientNameVisible = false;
							})
							.catch(err => {
							})
						})
					}else{
						this.$message('请填写必填信息或格式有误');
					}
				})
			}
			
		},
		
		clientNameDel(){
			//console.log('clientName', this.clientNameForm);
			this.$confirm('确认撤销修改?', '提示', { type: 'info' })
			.then(() => {
				const delData =this.clientNameForm;
				
				delClientNameChange(delData, this.companyId)
				.then(res => {
					this.$message.success('修改委托方撤销成功');
					
					this.clientNameVisible = false;
				})
				.catch(err => {
				})
			})
		},
				
		handleAddItem(itemName){
			const iteminfo={
				'regClientName': '委托方',
				'regClientType': '委托方性质',
				'regEvaluatedUnit': '被评估单位',
				'regEvalObject': '评估对象',
				'regAdminRegion': '行政区域',
				'regEvalObjCount': '数量',
				'cdLoaner': '贷款人',
				'cdBankName': '银行名称',
				'regEvalGoal': '评估目的',
				'regEvalMethod': '评估方法',
				'regTotalAssets': '资产总值(元)',
				'regTotalDebts': '负债总值(元)',
				'regOwnersEquity': '所有者权益(元)',
				'regEvalConclusion': '评估结论',
				'regEvalConclusionValue': '评估值(元)',
				'regReportIssueDate': '出报告日期',
				'cdReceiptType': '凭证类型',
				'cdInvoiceTitle': '开票抬头',
				'cdChargeType': '项目分类',
				'cdContact': '联系人',
				'cdContactInfo': '联系电话',
				'cdDoSignAgreement': '是否签协议',
				'cdAdvReceivedAmount': '预收款金额',
				'cdAdvReceivedDate': '预收款日期',
				'cdStandardFee': '标准收费(元)',
				'cdReceivable': '应收费用(元)',
				'cdDiscount': '折扣',
				'regRecordNum': '备案号',
				'regContractNum': '合同号',
				'regArrgType': '安排类型',
				'regEntrustLetterNum': '摇珠单/委托书',
				'regEntrustTime': '摇珠/委托时间',
				'regOutsourceStatus': '外协情况',
				'regProjLeader': '项目负责人',
				'regSignedAppraiser': '签字估价师',
				'regProjProReviewer': '专业复核人',
				'regFieldSrvy': '现勘',
				'regInfoVerification': '资料收集验证',
				'regMarketEnquiry': '市场询价调查',
				'regTechExpDrafter': '技术说明',
				'regReportDrafter': '报告拟稿',
				'regProjArchive': '助理(归档)',
				'regFeeFollowUp': '收费跟进',
				'cdProjContact': '接洽人',
				'regFinalReview': '总审',
			};
			
			const newList = this.registerCheckForm.filter(item => {
			    //条件匹配
			    return item.name == itemName;
			}); 
			
			var itemId = 999;
			Object.keys(iteminfo).forEach((key, index) =>{
				if(key == itemName){
				  itemId = index
				}
			});
			
			if(newList.length == 0){				
				//不存在				
				var newItem = {};
				newItem['id'] = itemId;
				newItem['name'] = itemName;
				newItem['label'] = iteminfo[itemName];
				newItem[itemName] = '';
				
				this.registerCheckForm.push(newItem);
			}
			
			this.registerCheckVisible = true;
			
			this.$nextTick(function () {
				document.getElementById('name'+itemId).focus();
			})
		},
		
		handleDelItem(){
			//删除值为空的item
			this.registerCheckForm = this.registerCheckForm.filter(item => {
			    return item[item.name] != "";
			}); 
			
			this.registerCheckVisible = false;
			
			//重新排序
			this.handleSortItem();
			
			//得到问题汇总
			this.handleGetCheckInfo();
		},
		
		handleSortItem(){
			//重新排序
			this.registerCheckForm = this.registerCheckForm.sort((a, b)=>{
				return a.id - b.id
			});
		},
		
		handleGetCheckInfo(){			
			//转换成逗号分隔, 英文逗号转中文逗号
			var newItem=[];
			this.registerCheckForm.forEach((item, index) =>{
				const newItemValue = item.label + ":" + item[item.name].replace(/\,/g, "，");
				newItem.push(newItemValue)
			});
			
			this.registerCheckInfo =newItem?newItem.join(','):'';
			
		},
		
		failRegisterCheckSubmit(){
			if(this.registerCheckInfo){
				this.$confirm('确认不通过该登记信息?', '提示', { type: 'warning' })
				.then(() => {
					const registerCheckForm={
						subProjIdArray: this.subProjId,
						mainStatus:2,
						woOrderContent: this.registerCheckInfo,
					}					
					console.log(registerCheckForm);
					this.auditSubProjectRegisterData( registerCheckForm, (auditData)=>{
						//提交成功
						
						//刷新表单
						this.getSubProjData(this.projId, this.subProjId);
						
						//刷新工单列表
						this.handleRefreshWorkOrderList();
					});
				})
			}else{
				this.$message.warning('请点击标签,输入对应问题')
			}
		},
		
		passRegisterCheckSubmit(){
			this.$confirm('确认通过该登记信息?', '提示', { type: 'success' })
			.then(() => {
				const registerCheckForm = {
					subProjIdArray: this.subProjId,
					mainStatus:3,
				}
				console.log(registerCheckForm);
				this.auditSubProjectRegisterData( registerCheckForm, (auditData)=>{
					//提交成功
					
					//刷新表单
					this.getSubProjData(this.projId, this.subProjId);
				});
			})
		},
		
		returnRegisterCheckSubmit(){
			this.$confirm('确认撤回该登记审核?', '提示', { type: 'warning' })
			.then(() => {
				const registerCheckForm = {
					subProjIdArray: this.subProjId,
					mainStatus:4,
				}
				console.log(registerCheckForm);
				this.auditSubProjectRegisterData( registerCheckForm, (auditData)=>{
					//提交成功
					
					//刷新表单
					this.getSubProjData(this.projId, this.subProjId);
				});
			})
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
			if( money == "" || money == "-" || isNaN(money)){
				return "";  
			}  
			money = parseFloat(money);  
			
			if( money >= maxNum ){  
				//$.alert('超出最大处理数字');  
				this.$message.warning('超出最大处理数字')
				return "";  
			}  
			if( money == 0 ){  
				ChineseStr = cnNums[0]+cnIntLast  
				return ChineseStr;  
			}  
			if(money < 0){
				ChineseStr = "负"
				money = Math.abs(money)
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
		},
				
		
		clientFullNameSearch(query, callback) {
			
			//替换特殊字符
			query =query?query.replace(/[ `~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/g,'').replace('分行',''):'';
			var str = query;
			var strArr = ['中国','广东','广州','深圳','佛山','东莞','中山','珠海','江门','肇庆','惠州','汕头','潮州','揭阳','汕尾','湛江','茂名','阳江','云浮','韶关','清远','梅州','股份有限公司','分行'];
			strArr.forEach((item, index) =>{
				str = str.replace(item,'')
			});
			
			var clientFullNameOptions = [];
			//if(str.length>4){
			  setTimeout(() => {
				
				var companyName = '';
				if(str.length>4){
					companyName = query;
				
					var res=[];
					var key = "";
					
					for(var i=0 ; i<=companyName.length ;i++){
					  const newvalue = companyName.slice(i,i+1); 
					  if(newvalue.length != 0){
						if(res.indexOf(newvalue)==-1){
						  res.push(newvalue);
						  key+="(?=.*"+newvalue+")";
						}                
					  }
					}
					
					key = eval("/"+key+"^.*/g");
					
					
					this.getTyshxydmData( '', companyName, (dmData)=>{
						if(dmData.total>0){
							//项目范围
							clientFullNameOptions = dmData.list.filter(item => {
							  return item.jgmc.match(key);
							  // key=eval("/(?=.*关)(?=.*键)(?=.*字)^.*/g")
							});
							
							for(let i of clientFullNameOptions){  
								i.value = i.jgmc + " | " + i.tyshxydm;
							}
							
							const newItem = {
								jgmc:'',
								tyshxydm:'',
								value:'下面数据仅供参考, 请认真核对',
							}
							clientFullNameOptions.unshift(newItem);		
							
							callback(clientFullNameOptions);
						}else{
							callback(clientFullNameOptions);
						}
						
						
					});
				}else{
					callback(clientFullNameOptions);
				}
				
				
				
			  }, 10);
			//}else{
			//	callback(clientFullNameOptions);
			//}
		},
		
		
		clientFullNameSelect(item){
			if(item.jgmc){
				this.clientNameForm.toBeAuditClientFullName = item.jgmc;
			}else{
				this.clientNameForm.toBeAuditClientFullName = this.clientNameForm.clientName.replace('分行','').replace(/[ `~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/g,'');
				this.$message.warning('请输入或选择正确的名称')
			}			
		},
		
		invoiceTitleSearch(query, callback) {
			
			//替换特殊字符
			query =query?query.replace(/[ `~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/g,'').replace('分行',''):'';
			var str = query;
			var strArr = ['中国','广东','广州','深圳','佛山','东莞','中山','珠海','江门','肇庆','惠州','汕头','潮州','揭阳','汕尾','湛江','茂名','阳江','云浮','韶关','清远','梅州','股份有限公司','分行'];
			strArr.forEach((item, index) =>{
				str = str.replace(item,'')
			});
			
			var invoiceTitleOptions = [];
			setTimeout(() => {
							
				var companyName = '';
				if(str.length>4){
					companyName = query;
				
					var res=[];
					var key = "";
					
					for(var i=0 ; i<=companyName.length ;i++){
					  const newvalue = companyName.slice(i,i+1); 
					  if(newvalue.length != 0){
						if(res.indexOf(newvalue)==-1){
						  res.push(newvalue);
						  key+="(?=.*"+newvalue+")";
						}                
					  }
					}
					
					key = eval("/"+key+"^.*/g");
					
					
					this.getTyshxydmData( '', companyName, (dmData)=>{
						if(dmData.total>0){
							//项目范围
							invoiceTitleOptions = dmData.list.filter(item => {
							  return item.jgmc.match(key);
							  // key=eval("/(?=.*关)(?=.*键)(?=.*字)^.*/g")
							});
							
							for(let i of invoiceTitleOptions){  
								i.value = i.jgmc + " | " + i.tyshxydm;
							}
							
							const newItem = {
								jgmc:'',
								tyshxydm:'',
								value:'下面数据仅供参考, 请认真核对',
							}
							invoiceTitleOptions.unshift(newItem);		
							
							callback(invoiceTitleOptions);
						}else{
							callback(invoiceTitleOptions);
						}
						
						
					});
				}else{
					callback(invoiceTitleOptions);
				}
				
			}, 10);  
		},		
		
		
		addInvoiceTitleSelect(item){
			if(item.jgmc){
				this.addInvoiceForm.invoiceTitle = item.jgmc;
				this.addInvoiceForm.dutyParagraph = item.tyshxydm;
			}else{
				this.addInvoiceForm.invoiceTitle = this.addInvoiceForm.invoiceTitleTemp;
				this.addInvoiceForm.dutyParagraph = this.addInvoiceForm.dutyParagraphTemp;
				this.$message.warning('请输入或选择正确的名称')
			}
		},
		
		editInvoiceTitleSelect(item){
			if(item.jgmc){
				this.editInvoiceForm.invoiceTitle = item.jgmc;
				this.editInvoiceForm.dutyParagraph = item.tyshxydm;
			}else{
				this.editInvoiceForm.invoiceTitle = this.editInvoiceForm.invoiceTitleTemp;
				this.editInvoiceForm.dutyParagraph = this.editInvoiceForm.dutyParagraphTemp;
				this.$message.warning('请输入或选择正确的名称')
			}
		},
		
		dutyParagraphSearch(query, callback) {
			
			//替换特殊字符
			var companyCode = query?query.replace(/[ `~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/g,'').replace('分行',''):'';
			
			var dutyParagraphOptions = [];
			setTimeout(() => {
				if(companyCode.length==18){
										
					this.getTyshxydmData( companyCode, '', (dmData)=>{
						if(dmData.total>0){
							//项目范围
							dutyParagraphOptions = dmData.list.filter(item => {
							  return item.tyshxydm == companyCode;
							});
							
							for(let i of dutyParagraphOptions){  
								i.value = i.jgmc + " | " + i.tyshxydm;
							}
							
							const newItem = {
								jgmc:'',
								tyshxydm:'',
								value:'下面数据仅供参考, 请认真核对',
							}
							dutyParagraphOptions.unshift(newItem);		
							
							callback(dutyParagraphOptions);
						}else{
							callback(dutyParagraphOptions);
						}
						
						
					});
				}else{
					callback(dutyParagraphOptions);
				}
				
			}, 10);  
		},		
		
		addDutyParagraphSelect(item){
			if(item.jgmc){
				this.addInvoiceForm.invoiceTitle = item.jgmc;
				this.addInvoiceForm.dutyParagraph = item.tyshxydm;
			}else{
				this.addInvoiceForm.invoiceTitle = this.addInvoiceForm.invoiceTitleTemp;
				this.addInvoiceForm.dutyParagraph = this.addInvoiceForm.dutyParagraphTemp;
				this.$message.warning('请输入或选择正确的税号')
			}
		},
		editDutyParagraphSelect(item){
			if(item.jgmc){
				this.editInvoiceForm.invoiceTitle = item.jgmc;
				this.editInvoiceForm.dutyParagraph = item.tyshxydm;
			}else{
				this.editInvoiceForm.invoiceTitle = this.editInvoiceForm.invoiceTitleTemp;
				this.editInvoiceForm.dutyParagraph = this.editInvoiceForm.dutyParagraphTemp;
				this.$message.warning('请输入或选择正确的税号')
			}
		},		
		
		
		//财务审核正评信息
		auditSubProjectRegisterData(auditData, successc) {
		  //211101变动 新增: 多个公司切换
			
			auditSubProjectRegister(auditData, this.companyId)
			.then(res => {
				if (res.statusCode == 200) {
					successc(res.data);
				}
			})
			.catch(err => {
			  console.log('审核正评信息', err)
			})
		},
		
		
		//工单列表信息
		getWorkOrderListData(subProjId, successc) {
		  //211101变动 新增: 多个公司切换
			const listData = {
				subProjId: subProjId,
			}
			getWorkOrderList(listData, this.companyId)
			.then(res => {
				if (res.statusCode == 200) {
					successc(res.data);
				}
			})
			.catch(err => {
			  console.log('工单列表信息', err)
			})
		},
		
		handleRefreshWorkOrderList(){
			this.getWorkOrderListData(this.subProjId, (woData)=>{
				this.workOrderFullList = woData;
				this.handleChangeOption(true);
				
				this.showWorkOrderList = false;
				//判断是否为空, 或woStatus不为0
				if(woData){
					woData.forEach((item, index) =>{
						if(item.woStatus == 0){
							this.showWorkOrderList = true;
						}
					});
				}
				
				console.log('woData', woData)
			});
		},
		
		handleChangeOption(val){
			if(val == true){			
				//待审核列表			
				this.workOrderList = this.workOrderFullList.filter(item => {
					//条件匹配
					return item.woStatus == "0";
				}); 
				
			}else{
				//完整列表
				this.workOrderList = this.workOrderFullList
			}
		},
		
		//财务修改审核不通过工单内容
		updateWorkOrderInfoData(updateData, successc) {
		  //211101变动 新增: 多个公司切换
			
			updateWorkOrderInfo(updateData, this.companyId)
			.then(res => {
				if (res.statusCode == 200) {
					successc(res.data);
				}
			})
			.catch(err => {
			  console.log('修改审核内容', err)
			})
		},
		//财务删除审核不通过工单内容
		delWorkOrderInfoData(delData, successc) {
		  //211101变动 新增: 多个公司切换
			
			delWorkOrderInfo(delData, this.companyId)
			.then(res => {
				if (res.statusCode == 200) {
					successc(res.data);
				}
			})
			.catch(err => {
			  console.log('删除审核内容', err)
			})
		},
		
		//财务修改审核内容
		handleUpdateWorkOrderInfo(item){
			//待处理时, 弹出输入框自行输入
			const oldContent = item.woOrderContent;
			
			this.$prompt('请输入新的审核问题', '提示', {
			  customClass:'prompt-style',
			  closeOnClickModal:false,
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  inputType: 'textarea',
			  inputValue: item.woOrderContent,
			  inputErrorMessage: '输入不能为空',
			  inputValidator: (value) => {  
				if(!value) {
				  return '输入不能为空';
				}else if(value == oldContent){
				  return '内容没变化, 请修改内容';
				}
			  },
			}).then(({ value }) => {
			  //1. 提交修改
			  const updateData = {
				woId: item.woId,
				woOrderContent : value,
			  }
			  
			  this.updateWorkOrderInfoData(updateData, (updateData)=>{
			  	//刷新工单列表
			  	this.handleRefreshWorkOrderList();
			  });
			  
			  
			}).catch((err) => {
			  console.log('修改审核内容', err)      
			});
		},
		
		//财务撤销该审核
		handleDelWorkOrderInfo(item){
			//待处理时, 弹出输入框自行输入
			
			this.$confirm('确认撤销该审核问题?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type:'warning'
			}).then(({ value }) => {				
			  //1. 提交修改
			  const delData = {
				woId: item.woId,
			  }
			  
			  this.delWorkOrderInfoData(delData, (delData)=>{
			  	//提交成功
				
			  	//刷新表单
			  	this.getSubProjData(this.projId, this.subProjId);
			  	
			  	//刷新工单列表
			  	this.handleRefreshWorkOrderList();
			  });
			  
			}).catch((err) => {
			  console.log('撤销审核内容', err)      
			});
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
		width:650px !important;
	}
	
	/deep/ .el-form-item__label {
	  color: #000;
	  font-size: 16px;
	}
	
	/deep/ .red-item .el-form-item__label {
	  color: #ed1941;
	}	
		
</style>

<style>
	.prompt-style .el-textarea__inner {
	  height: 150px;
	}	
</style>