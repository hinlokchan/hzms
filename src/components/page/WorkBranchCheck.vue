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
	  <el-dialog :title="`开票处理 ${subBillInfoTitle}`" :visible.sync="subBillInfoVisible" :modal="false" v-dialogDrag width="800px">
	  		<el-form
	  			ref="subBillInfoForm"
	  			:model="subBillInfoForm"
	  			:rules="subBillInfoRules"
	  			label-width="100px"
	  		>
	  		<el-row :gutter="20">
	  			<el-col :span="12">	
	  				<el-form-item label="子项目号" prop="bindingSubProjNum">
	  					<el-input v-model="subBillInfoForm.bindingSubProjNum" style="width: 100%" 
						type="textarea"	autosize
						readonly></el-input>
	  				</el-form-item>		
	  			</el-col>
	  			<el-col :span="12">		
	  				<el-form-item label="收费凭证" prop="receiptType">
	  					<el-input v-model="subBillInfoForm.receiptType" style="width: 50%" readonly></el-input>
						<el-input v-model="subBillInfoForm.isElectronic" style="width: 50%" readonly></el-input>
	  				</el-form-item>
	  			</el-col>
			</el-row>
			<el-row :gutter="20">
	  			<el-col :span="12">	
	  				<el-form-item label="开票抬头" prop="invoiceTitle">
	  					<el-input v-model="subBillInfoForm.invoiceTitle" style="width: 100%"
						type="textarea"	autosize
						readonly></el-input>
						
						<span style="font-size: 14px;">
						  <el-button
						    type="text"
						    icon="el-icon-document-copy"
						    size="medium"
						    v-clipboard:copy="subBillInfoForm.invoiceTitle"
						    v-clipboard:success="copy"
						  >复制</el-button>
						</span>
	  				</el-form-item>
	  			</el-col>
	  			<el-col :span="12">	
	  				<el-form-item label="开票税号" prop="dutyParagraph">
	  					<el-input v-model="subBillInfoForm.dutyParagraph" style="width: 100%" readonly></el-input>
						<span style="font-size: 14px;">
						  <el-button
						    type="text"
						    icon="el-icon-document-copy"
						    size="medium"
						    v-clipboard:copy="subBillInfoForm.dutyParagraph"
						    v-clipboard:success="copy"
						  >复制</el-button>
						</span>
	  				</el-form-item>
	  			</el-col>
			</el-row>
			<el-row :gutter="20">
	  			<el-col :span="12">	
	  				<el-form-item label="地址" prop="address">
						<el-input v-model="subBillInfoForm.address" style="width: 100%"
						type="textarea"	autosize
						readonly></el-input>
						<span style="font-size: 14px;"
						v-if="subBillInfoForm.address">
						  <el-button
						    type="text"
						    icon="el-icon-document-copy"
						    size="medium"
						    v-clipboard:copy="subBillInfoForm.address"
						    v-clipboard:success="copy"
						  >复制</el-button>
						</span>
	  				</el-form-item>
	  			</el-col>
	  			<el-col :span="12">	
	  				<el-form-item label="电话" prop="telNum">
	  					<el-input v-model="subBillInfoForm.telNum" style="width: 100%" readonly></el-input>
						<span style="font-size: 14px;"
						v-if="subBillInfoForm.telNum">
						  <el-button
						    type="text"
						    icon="el-icon-document-copy"
						    size="medium"
						    v-clipboard:copy="subBillInfoForm.telNum"
						    v-clipboard:success="copy"
						  >复制</el-button>
						</span>
	  				</el-form-item>
	  			</el-col>
			</el-row>
			<el-row :gutter="20">
	  			<el-col :span="12">	
	  				<el-form-item label="开户行" prop="depositBank">
	  					<el-input v-model="subBillInfoForm.depositBank" type="textarea" autosize maxlength="240" style="width: 100%" readonly></el-input>
						<span style="font-size: 14px;"
						v-if="subBillInfoForm.depositBank">
						  <el-button
						    type="text"
						    icon="el-icon-document-copy"
						    size="medium"
						    v-clipboard:copy="subBillInfoForm.depositBank"
						    v-clipboard:success="copy"
						  >复制</el-button>
						</span>
	  				</el-form-item>
	  			</el-col>
	  			<el-col :span="12">	
	  				<el-form-item label="账号" prop="bankAccount">
	  					<el-input v-model="subBillInfoForm.bankAccount" type="textarea" autosize maxlength="240" style="width: 100%" readonly></el-input>
						<span style="font-size: 14px;"
						v-if="subBillInfoForm.bankAccount">
						  <el-button
						    type="text"
						    icon="el-icon-document-copy"
						    size="medium"
						    v-clipboard:copy="subBillInfoForm.bankAccount"
						    v-clipboard:success="copy"
						  >复制</el-button>
						</span>
	  				</el-form-item>
	  			</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">	
					<el-form-item label="开票金额" prop="totalAmount">
						<el-input v-model="subBillInfoForm.totalAmount" style="width: 100%" readonly></el-input>
						<el-button
						  type="text"
						  icon="el-icon-document-copy"
						  size="medium"
						  v-clipboard:copy="subBillInfoForm.totalAmount"
						  v-clipboard:success="copy"
						>复制</el-button>
					</el-form-item>
				</el-col>
				<el-col :span="12">	
					<el-form-item label="开票备注" prop="receiptRemark">
						<el-input v-model="subBillInfoForm.receiptRemark" type="textarea" autosize maxlength="240" style="width: 100%" readonly></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-divider>开票处理</el-divider>
			<el-row :gutter="20">
				<el-col :span="12">	
					<el-form-item label="收据号" prop="quittanceNum"
					:class="subBillInfoForm.receiptType=='开收据'?'red-item':''"
					:rules="subBillInfoForm.receiptType=='开收据'?quittanceNumRules:{}">
						<el-input v-model="subBillInfoForm.quittanceNum" type="textarea" autosize style="width: 100%" 
						:readonly="subBillInfoForm.receiptType=='开收据'?false:true"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">	
					<el-form-item label="收据日期" prop="quittanceDate"
					:class="subBillInfoForm.receiptType=='开收据'?'red-item':''"
					:rules="subBillInfoForm.receiptType=='开收据'?quittanceDateRules:{}">
						<el-date-picker
						  type="date"
						  value-format="yyyy-MM-dd"
						  style="width: 100%"
						  v-model="subBillInfoForm.quittanceDate"
						  :readonly="subBillInfoForm.receiptType != '开收据'?true:false"
						></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
	  			<el-col :span="12"
				v-if="subBillInfoForm.receiptType == '普通发票' || subBillInfoForm.receiptType == '专用发票'">	
	  				<el-form-item label="发票号" prop="invoiceNum"  class="red-item">
	  					<el-input v-model.trim="subBillInfoForm.invoiceNum" type="textarea" autosize style="width: 100%"
						oninput="value=value.replace('，',',').replace('（','(').replace('）',')').replace(' ','')"></el-input>
	  				</el-form-item>
	  			</el-col>
				<el-col :span="12"
				v-if="subBillInfoForm.receiptType == '普通发票' || subBillInfoForm.receiptType == '专用发票'">	
					<el-form-item label="发票日期" prop="invoiceDate" class="red-item">
						<el-date-picker
						  type="date"
						  value-format="yyyy-MM-dd"
						  style="width: 100%"
						  v-model="subBillInfoForm.invoiceDate"
						  :readonly="(subBillInfoForm.receiptType != '普通发票' && subBillInfoForm.receiptType != '专用发票')?true:false"
						></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
	  		</el-form>
	  		<div
	  		  slot="footer"
	  		  class="dialog-footer"
	  		>
	  		  <el-button @click="subBillInfoVisible = false">取 消</el-button>
	  		  <el-button
	  			@click="subBillInfoInvalidate(subBillInfoForm)"
	  			type="warning"
	  		  >开票作废</el-button>
			  
	  		  <el-button
	  			@click="subBillInfoEdit(subBillInfoForm)"
	  			type="primary"
	  		  >确认开票</el-button>
	  		</div>
	  </el-dialog>
	 	  
	  <el-dialog :title="`收款处理 ${subPayInfoTitle}`" :visible.sync="subPayInfoVisible" :modal="false" v-dialogDrag width="800px">
		<el-form
			ref="subPayInfoForm"
			:model="subPayInfoForm"
			:rules="subPayInfoRules"
			label-width="100px"
		>
		<el-row :gutter="20">
			<el-col :span="12">	
				<el-form-item label="子项目号" prop="bindingSubProjNum">
					<el-input v-model="subPayInfoForm.bindingSubProjNum" style="width: 100%"
					type="textarea"	autosize
					readonly></el-input>
				</el-form-item>		
			</el-col>
			<el-col :span="12">		
				<el-form-item label="收费凭证" prop="receiptType">
					<el-input v-model="subPayInfoForm.receiptType" style="width: 50%" readonly></el-input>
					<el-input v-model="subPayInfoForm.isElectronic" style="width: 50%" readonly></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="12">	
				<el-form-item label="开票抬头" prop="invoiceTitle">
					<el-input v-model="subPayInfoForm.invoiceTitle" style="width: 100%"
					type="textarea"	autosize
					readonly></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">	
				<el-form-item label="开票税号" prop="dutyParagraph">
					<el-input v-model="subPayInfoForm.dutyParagraph" style="width: 100%" readonly></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="12">	
				<el-form-item label="地址" prop="address">
					<el-input v-model="subPayInfoForm.address" style="width: 100%"
					type="textarea"	autosize
					readonly></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">	
				<el-form-item label="电话" prop="telNum">
					<el-input v-model="subPayInfoForm.telNum" style="width: 100%" readonly></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">	
				<el-form-item label="开户行" prop="depositBank">
					<el-input v-model="subPayInfoForm.depositBank" style="width: 100%" readonly></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">	
				<el-form-item label="账号" prop="bankAccount">
					<el-input v-model="subPayInfoForm.bankAccount" style="width: 100%" readonly></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">	
				<el-form-item label="收据号" prop="quittanceNum">
					<el-input v-model="subPayInfoForm.quittanceNum" type="textarea" autosize  style="width: 100%" readonly></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">	
				<el-form-item label="收据日期" prop="quittanceDate">
					<el-input v-model="subPayInfoForm.quittanceDate" style="width: 100%" readonly></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">	
				<el-form-item label="发票号" prop="invoiceNum">
					<el-input v-model="subPayInfoForm.invoiceNum" type="textarea" autosize style="width: 100%" readonly></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">	
				<el-form-item label="发票日期" prop="invoiceDate">
					<el-input v-model="subPayInfoForm.invoiceDate" style="width: 100%" readonly></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="12">	
				<el-form-item label="开票金额" prop="totalAmount">
					<el-input v-model="subPayInfoForm.totalAmount" style="width: 100%" readonly></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="12">	
				<el-form-item label="收费方式" prop="paymentType" class="red-item">
					<el-select
						v-model="subPayInfoForm.paymentType" style="width: 100%" 
					>
						<el-option
							v-for="item, index in paymentTypeOption"
							:key="index"
							:label="item"
							:value="item"
						>
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="12">	
				<el-form-item label="收费日期" prop="collectionDate" class="red-item">
					<el-date-picker
					  type="date"
					  value-format="yyyy-MM-dd"
					  style="width: 100%"
					  v-model="subPayInfoForm.collectionDate"
					></el-date-picker>
				</el-form-item>
			</el-col>
		</el-row>
		</el-form>
		<div
		  slot="footer"
		  class="dialog-footer"
		>
		  <el-button @click="subPayInfoVisible = false">取 消</el-button>
		  <el-button
			@click="subPayInfoEdit(subPayInfoForm)"
			type="primary"
			:disabled="subPayInfoForm.invoiceDate?false:true"
		  >确认收款</el-button>
		</div>
	  </el-dialog>
	  
	  
	  <el-dialog :title="`问题记录 ${subProblemInfoTitle}`" :visible.sync="subProblemInfoVisible" :modal="false" v-dialogDrag width="600px"	  >
	  		<el-form
	  			ref="subProblemInfoForm"
	  			:model="subProblemInfoForm"
	  			:rules="subProblemInfoRules"
	  			label-width="125px"
	  		>
	  			<el-form-item label="项目名称" prop="subProjName">
	  				<el-input v-model="subProblemInfoForm.subProjName" readonly
	  					type="textarea" autosize maxlength="240" style="width: 100%;"
	  				></el-input>
	  			</el-form-item>
	  			<el-form-item label="项目范围" prop="subProjScope">
	  				<el-input v-model="subProblemInfoForm.subProjScope" readonly
	  					type="textarea" autosize maxlength="240" style="width: 100%;"
	  				></el-input>
	  			</el-form-item>
	  			<el-form-item label="底单没登记" prop="subProjDDMDJ"
	  			:rules="(subProblemInfoForm.subProjCSJL||subProblemInfoForm.subProjDJCWJL)?[]:inputReq">
	  			  <el-input v-model="subProblemInfoForm.subProjDDMDJ" style="width: 100%" clearable
	  			  placeholder="三个问题至少录入一个"
	  				type="textarea" autosize maxlength="240"></el-input>
	  			</el-form-item>
	  			<el-form-item label="催收记录" prop="subProjCSJL"
	  			:rules="(subProblemInfoForm.subProjDDMDJ||subProblemInfoForm.subProjDJCWJL)?[]:inputReq">
	  			  <el-input v-model="subProblemInfoForm.subProjCSJL" style="width: 100%" clearable
	  			  placeholder="三个问题至少录入一个"
	  				type="textarea" autosize maxlength="240"></el-input>
	  			</el-form-item>
	  			<el-form-item label="登记错误记录" prop="subProjDJCWJL"
	  			:rules="(subProblemInfoForm.subProjCSJL||subProblemInfoForm.subProjDDMDJ)?[]:inputReq">
	  			  <el-input v-model="subProblemInfoForm.subProjDJCWJL" style="width: 100%" clearable
	  			  placeholder="三个问题至少录入一个"
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
	  
	  <el-dialog :title="`凭证处理 ${receiptTitle}`" :visible.sync="receiptVisible" width="1200px" top="20px">
		<el-form
			ref="receiptForm"
			:model="receiptForm"
			:rules="receiptFormRules"
			:close-on-click-modal="false"
			label-width="100px"
		>
			<el-row :gutter="20">
				<el-col :span="8">				
					<el-form-item label="发票金额" prop="subProjFPJE">
					  <el-input v-model="receiptForm.subProjFPJE" style="width: 100%" clearable
					  readonly
					  oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="收据金额" prop="subProjSJJE" >
					  <el-input v-model="receiptForm.subProjSJJE" style="width: 100%" clearable
					  readonly
					  oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">	
					<el-form-item label="无凭证金额" prop="subProjWPJE" >
					  <el-input v-model="receiptForm.subProjWPJE" style="width: 100%" clearable
					  readonly
					  oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="8">			
					<el-form-item label="银收金额" prop="subProjYSJE">
					  <el-input v-model="receiptForm.subProjYSJE" style="width: 100%" clearable
					  readonly
					  oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">	
					<el-form-item label="现收金额" prop="subProjXSJE">
					  <el-input v-model="receiptForm.subProjXSJE" style="width: 100%" clearable
					  readonly
					  oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
					</el-form-item>
				</el-col>
				<!-- 
				<el-col :span="8">	
					<el-form-item label="收费情况" prop="subProjFPTT" class="red-item">
					  <el-input v-model="receiptForm.subProjFPTT" style="width: 100%" clearable></el-input>
					</el-form-item>
				</el-col>
				 -->
			</el-row>
			<el-row :gutter="10" style="margin-top: 20px;">
				<el-col :span="24">
					<el-table :data="receiptList"
						ref="receipttable"
						show-summary
						row-key="receiptId"
						:tree-props="{children: 'children', hasChildren: 'hasChildren'}"
						:summary-method="getSummaries"
						@row-click="expandSubChange"
						default-expand-all
						border>
					  <el-table-column label="ID" align="center" width="60">
					    <template slot-scope="scope">
					  	{{ scope.row.id }}
					    </template>
					  </el-table-column>	
						
					  <el-table-column label="子项目号" prop="bindingSubProjNum" ></el-table-column>
					  
					  <el-table-column label="收费凭证" width="80" prop="receiptType" ></el-table-column>
					  
					  <el-table-column label="开票抬头" prop="invoiceTitle" ></el-table-column>
					  
					  <el-table-column label="开票金额" width="100" prop="totalAmount" ></el-table-column>
					  
					  <el-table-column label="应收费用" width="100" prop="cdReceivable" ></el-table-column>
					  
					  <el-table-column label="票费差额" width="100" prop="difference" >
						  <template slot-scope="scope">
							  <el-tag :type="newButtonTypeDifference(scope.row.difference)"
							  v-if="scope.row.difference">
								  {{scope.row.difference}}
							  </el-tag>
						  </template>
					  </el-table-column>
					  
					  <!-- 
					  <el-table-column label="子项目id" prop="bindingSubProjId" ></el-table-column>
					  -->
					  <el-table-column label="录入日期" width="90" prop="createdDate" >
						  <template slot-scope="scope">
							  <div
							  v-if="!isNaN(parseFloat(scope.row.receiptId))">
								{{scope.row.createdDate}}
							  </div>
						  </template>
					  </el-table-column>
					  
					  <el-table-column label="其他信息" width="200" prop="" >
						  <template slot-scope="scope">
							<div
							v-if="!isNaN(parseFloat(scope.row.receiptId))">
								<div
								v-if="scope.row.receiptType.indexOf('发票')!=-1">
									发票编号: {{scope.row.invoiceNum}}
									<br>
									<span
									v-if="scope.row.invoiceDate">
										发票日期: {{scope.row.invoiceDate}}
									</span>
									<span
									v-else>
										发票日期: <el-tag type="warning">未开票</el-tag>
									</span>
								</div>
								<div
								v-else-if="scope.row.receiptType == '开收据'">	
									收据编号: {{scope.row.quittanceNum}}
									<br>
									<span
									v-if="scope.row.quittanceDate">
										收据日期: {{scope.row.quittanceDate}}
									</span>
									<span
									v-else>
										收据日期: <el-tag type="warning">未开具</el-tag>
									</span>
								</div>
									收款方式: {{scope.row.paymentType}}
								<br>
								<span
								v-if="scope.row.collectionDate">
									收款日期: {{scope.row.collectionDate}}
								</span>
								<span
								v-else>
									收款日期: <el-tag type="warning">未收款</el-tag>
								</span>
							
							</div>
						  </template>
					  </el-table-column>
					
					  <el-table-column label="操作" width="150" align="center">
						<template slot-scope="scope">
							<div
							v-if="scope.row.receiptStatus == 9">
								<el-button type="danger" size="mini">已作废</el-button>
							</div>
							<div
							v-else>
								<div
								v-if="!isNaN(parseFloat(scope.row.receiptId))">
								<el-button
								  type="primary"
									size="mini"
								  @click="editBillSubProj(scope.row)"
								  :disabled="scope.row.collectionDate?true:false"
								>开票</el-button>
								<el-button
								  type="success"
									size="mini"
								  @click="editPaySubProj(scope.row)"
								>收款</el-button>  
								</div>
								<div
								v-else>
									<el-button
									  type="success"
										size="mini"
									  @click=""
									>点击展合</el-button>
								</div>
							</div>
						</template>
					  </el-table-column>
					</el-table>
				</el-col>
			</el-row>
		</el-form>
	  </el-dialog>
	  
	  <!-- 211028变动 新增: 多个公司切换 -->
	  <el-tabs v-model="companyId" type="card" @tab-click="handleTabsClick">
	    <el-tab-pane label="惠正公司" name="HZ"></el-tab-pane>
	    <el-tab-pane label="智明公司" name="ZM" disabled></el-tab-pane>
	    <el-tab-pane label="汇正公司" name="HZKJ" disabled></el-tab-pane>
	  </el-tabs>
	  
	  <div>
	    <el-row :gutter="4">
		  <el-col  :xs="24" :sm="24" :lg="15" >
			<el-row :gutter="4">
			  <el-col :lg="4" :span="4">
				<el-input
				  v-model.trim="searchData.reportNum"
				  placeholder="报告号"
				  @keyup.enter.native="getLocalData"
				  oninput="value=value.toUpperCase()"
				></el-input>
			  </el-col>
			  <el-col :lg="4" :span="4">
				<el-input
				  v-model.trim="searchData.projNum"
				  placeholder="计划编号"
				  @keyup.enter.native="getLocalData"
				></el-input>
			  </el-col>
			  <el-col :lg="5" :span="5">
				<el-input
				  v-model.trim="searchData.projName"
				  placeholder="项目名称"
				  @keyup.enter.native="getLocalData"
				></el-input>
			  </el-col>
			  <el-col :lg="5" :span="5">
				<el-input
				  v-model.trim="searchData.projScope"
				  placeholder="项目范围"
				  @keyup.enter.native="getLocalData"
				></el-input>
			  </el-col>
			  <el-col :lg="6" :span="6">
				<el-button-group>
					<el-button type="primary" size="small" @click="getLocalData">查找</el-button>
					<el-button type="warning" size="small" @click="resetSearchData">重置</el-button>
				</el-button-group>
			  </el-col>
			</el-row>
		  </el-col>
		  <el-col :xs="24" :sm="24" :lg="9">
			<div style="text-align: right; ">
				<el-form
					ref="exportSubListForm"
					:model="exportSubListForm"
					:rules="exportSubListFormRules"
					label-width="0px"
				>  
					<el-form-item >
						<el-date-picker
							v-model="exportSubListForm.multiDate"
							value-format="yyyy-MM-dd"
							type="daterange"
							unlink-panels
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							:picker-options="multiDateOptions"
							style="width: 220px;">
						</el-date-picker>
						<el-button-group>
							<el-button type="success" style="margin-left: 4px; height: 31px;" @click="exportSubProj('正评列表', '')" size="small">导正评</el-button>
							<el-button type="primary" style="height: 31px;" @click="exportSubProj('发票列表', '')" size="small">导发票</el-button>
						</el-button-group>
					</el-form-item>
				</el-form>
			</div>  
		  </el-col>
	    </el-row>
	  </div>
	  
	  
	  
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
		row-key="projId"
		:default-sort = "{prop: 'creationTime', order: 'descending'}"
		@sort-change="sortChange"
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
	        <el-table-column label="子项目号" width="100">
	          <template slot-scope="scope">
				{{ scope.row.subProjNum }}
	          </template>
	        </el-table-column>
	        <el-table-column label="登记日期" width="90">
	          <template slot-scope="scope">
				{{formatDate(scope.row.creationTime)}}
	          </template>
	        </el-table-column>
			<el-table-column label="基准日" width="90">
			  <template slot-scope="scope">
				{{formatDate(scope.row.subBaseDate)}}
			  </template>	
			</el-table-column>
	        <el-table-column label="项目名称" min-width="180px">
	          <template slot-scope="scope">
				{{ scope.row.subProjName }}
	          </template>
	        </el-table-column>
	        <el-table-column label="项目范围" min-width="180px">
	          <template slot-scope="scope">
				{{ scope.row.subProjScope }}
	          </template>
	        </el-table-column>
			<el-table-column
			  label="操作2"
			  width="210"
			  align="center"
			>
			  <template slot-scope="scope"> 
				<!-- 				
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
				 -->
				<el-button-group>
					<el-button
					  type="primary"
					  size="mini"
					  @click="jumpToSubHandleCheck(scope.row, projType)"
					  :disabled="scope.row.subProjStatus.mainStatus>0?false:true"
					>审核</el-button>
					
					
					<el-button
					  type="success"
					  size="mini"
					  @click="passRegisterCheckSubmit(scope.row, projType)"
					  :disabled="scope.row.subProjStatus.mainStatus==1?false:true"
					>通过</el-button>
				</el-button-group>
				<!-- 
			    <el-button
			      type="warning"
				  size="mini"
			      @click="jumpToSubHandle(scope.row)"
			    >修改</el-button>
				 -->	
				<el-button-group style="margin-left: 10px;">
					<el-button
					  type="primary"
					  size="mini"
					  @click="editProblemSubProj(scope.row)"
					>记录</el-button>
				</el-button-group>
				
			  </template>
			</el-table-column>
			
			<el-table-column
			  label="进度"
			  width="80"
			  align="center"
			>
			  <template slot-scope="scope">
			    <el-tag :type="newTagType(scope.row.subProjStatus.mainStatus)">{{newTagValue(scope.row.subProjStatus.mainStatus)}}</el-tag>
			  </template>
			</el-table-column>
	      </el-table>
	    </template>
	  </el-table-column>
	  
        <el-table-column
          prop="projDate"
          label="编制日期"
          width="100"
          :formatter="this.$formatDate"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          prop="creationTime"
          label="更新日期"
          width="100"
          sortable="custom"
        >
			<template slot-scope="scope">
				{{formatDate(scope.row.creationTime)}}
			</template>
        </el-table-column>
        <el-table-column
          prop="checkNum"
          label="待审"
          width="70"
          sortable="custom"
		  align="center"
        >
        </el-table-column>
		<el-table-column
		  prop="reportNum"
		  label="报告号"
		  width="120"
          sortable="custom"
		>
        </el-table-column>
        <el-table-column
          prop="projNum"
          label="计划编号"
          width="120"
          sortable="custom"
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
			<template slot-scope="scope">
				<div style="text-align: left;">
				    <el-popover trigger="hover" placement="left-end" title="项目组成员">
						<span>项目负责人: </span><br>
						<span>{{scope.row.projLeader}}</span>
						</p><br>
						<span>项目复核人: </span><br>
						<span>{{scope.row.projReviewer}}</span>
						</p><br>
						<span>助理: </span><br>
						<span>{{scope.row.projAsst}}</span>
						<div slot="reference" class="name-wrapper">
							{{scope.row.projLeader}}
						</div>
				    </el-popover>
				</div>
			</template>
		</el-table-column>
		<!-- 
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
		 -->
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
		
		
        <el-table-column
          label="操作"
          align="center"
          width="220"
        >
          <template slot-scope="scope">
			<el-badge :value="newRegisterBadge(scope.row)" :type="newRegisterBadgeType(scope.row)" class="badgeitem">              
			<el-button
			  type="primary" 
			  @click=""
			  size="small"
			>登记</el-button>
			</el-badge>						
			
			<el-badge :value="newReceiptBadge(scope.row)" :type="newReceiptBadgeType(scope.row)" class="badgeitem">
            <el-button
              type="primary" 
              @click.native.stop="editReceiptSubProj(scope.row)"
              size="small"
            >凭证</el-button>
			</el-badge>
			
			<el-badge value="" class="badgenull">
			<el-button
			  type="success" 
			  @click.native.stop="exportSubProj('正评', scope.row.projId)"
			  size="small"
			>导出</el-button>
			</el-badge>
          </template>
        </el-table-column>
		
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
  getAllAbstractProject, searchMyProject, getReportNum, createReportNum, alterProjType, getSubReportNum, addSubReportNum, deleteReportNum} from '@/api/index'
import { getSubProjectInfoList, getRawRegisterList, getManageRegisterList, getReceiptList, getRegisterList, editSubProjectReceiptIssue, editSubProjectReceiptInvalidate, editSubProjectReceiptPay, auditSubProjectRegister} from '@/api/subReport'
import {downloadExcel, downloadImageReview} from '../../utils/download';
export default {
  name: 'workbranchcheck',
  data() {
    return {		
      currentPage: 1, // 当前页码
      pageSize: 3, // 每页的数据条数
      pageTotal: 0, // 数据数
      tableData: [],
      tableDataTemp: [],
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
	  searchData:{
		projNum: '',
		reportNum: '',
		projName: '',
		projScope: '',  
	  },
	  
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
		receiptId: '', //凭证id
		bindingSubProjNum: '', //子项目号
		receiptType:'', //收费凭证
		isElectronic:'', //电子/纸质
		invoiceTitle:'', //开票抬头
		dutyParagraph:'', //开票税号
		totalAmount:'',  //开票金额
		address: '',//地址
		telNum: '',//电话
		depositBank: '',//开户行
		bankAccount: '',//账号
		quittanceNum: '', //收据号
		quittanceDate: '', //收据日期		
		invoiceNum:'', //发票号
		invoiceDate: '', //发票日期
		receiptRemark: '', //凭证备注
	  },
	  subBillInfoRules:{
		invoiceNum: [{ required: true, message: '请输入发票号', trigger: 'blur' }],
		invoiceDate: [{ required: true, message: '请输入发票日期', trigger: 'blur' }],
	  },
	  quittanceNumRules: [{ required: true, message: '请输入收据号', trigger: 'blur' }],
	  quittanceDateRules: [{ required: true, message: '请输入收据日期', trigger: 'blur' }],
	  
	  //问题记录
	  subProblemInfoVisible:false,
	  subProblemInfoTitle:'',
	  subProblemInfoForm:{
		projId: "", //子项目id
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
	  
	  inputReq:[{ required: true, message: '请输入', trigger: 'blur' }],
	  
	  //收款处理
	  subPayInfoVisible:false,
	  subPayInfoTitle:'',
	  subPayInfoForm:{
		receiptId: '', //凭证id
		bindingSubProjNum: '', //子项目号
		receiptType:'', //收费凭证
		isElectronic:'', //收费凭证
		invoiceTitle:'', //开票抬头
		dutyParagraph:'', //开票税号
		totalAmount:'',  //开票金额
		address: '',//地址
		telNum: '',//电话
		depositBank: '',//开户行
		bankAccount: '',//账号		
		quittanceNum:'', //收据号
		quittanceDate:'', //收据日期
		invoiceNum:'', //发票号
		invoiceDate:'', //发票日期
		paymentType: '', //收费方式  现收或银收
		collectionDate: '', //收费日期
		receiptRemark: '', //凭证备注
	  },
	  subPayInfoRules:{
		paymentType:[{ required: true, message: '请选择',trigger: 'blur'}],
		collectionDate:[{ required: true, message: '请选择',trigger: 'blur'}],
	  },
	  paymentTypeOption:['现收', '银收', '待定'],
	  
	  //凭证信息
	  receiptList:[],
	  receiptVisible:false,
	  receiptTitle:'',
	  receiptForm:{
		projId: "", //子项目id
		subProjId: "", //子项目id
		subProjNum: "", //子项目报告号
		subProjName: "", //项目名称
		subProjScope: "", //项目范围
		
		subProjXSJE: "", //现收合计金额
		subProjYSJE: "", //银收合计金额
		
		subProjFPJE: "", //已开发票金额
		subProjSJJE: "", //已开收据金额
		subProjWPJE: "", //没开凭证金额
		
		subProjSFQK: "", //收费情况 每笔收费情况
		
	  },
	  receiptFormRules:{},
	  
	  //批导出表单	  
	  exportSubListForm:{
		multiDate:'',
	  },
	  exportSubListFormRules:{
	  		multiDate:[{ required: true, message: '请选择导出的日期范围',trigger: 'blur'}],
	  },	  
	  multiDateOptions: {
	  		disabledDate(time) {
	  		  return time.getTime() > Date.now()
	    },
	  },
	  
	  //本地查找列表
	  searchData:{
		reportNum:'', //报告号
		projNum:'', //计划号
		projName:'', //项目名称
		projScope:'', //项目范围
	  },
	  
	  projType:'',
	  
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
  			}else if(data == "4"){
  				return "danger";
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
				return "未通过";
			}else if(data == "3"){
				return "已通过";
			}else if(data == "4"){
				return "已撤回";
			}else{
				return "未提交";
			}
		}
	},
		
	newButtonTypeDifference(){
		return (data)=>{
			if(data == '一致'){
				return "success";
			}else if(data < 0){
				return "warning";
			}else{
				return "danger";
			}
		}
	},
	
	//角标	
	newReceiptBadge(){
		return (data)=>{
			if(data.receiptTotalCount){
				const bargeCount = data.receiptTotalCount - data.receiptIssuedCount||0;
				if(bargeCount == 0){
					//全审核, 返回审核总数
					return data.receiptIssuedCount;
				}else{
					//有审核, 返回待审核数
					return bargeCount;
				}				
			}else{
				return "";
			}
		}
	},
	
	
	newReceiptBadgeType(){
		return (data)=>{
			if(data.receiptTotalCount){
				const bargeCount = data.receiptTotalCount - data.receiptIssuedCount||0;
				if(bargeCount == 0){
					//全审核, 返回审核总数, (绿色)
					return "success";
				}else{
					//有审核, 返回待审核数 (红色)
					return "danger";
				}				
			}else{
				return "danger";
			}
		}
	},
	
	newRegisterBadge(){
		return (data)=>{
			//1.有待审核, 红色显示待审核  registerToBeAuditCount
			//2.有已通过, 绿色显示已通过  registerAuditedPassCount
			//3.有未通过或已撤回, 黄色显示他们总和  registerRejectedCount+registerWithdrawCount
			if(data.registerToBeAuditCount){
				return data.registerToBeAuditCount;
			}else if(data.registerAuditedPassCount){
				return data.registerAuditedPassCount;
			}else if(data.registerRejectedCount || data.registerWithdrawCount){
				return (data.registerRejectedCount||0 + data.registerWithdrawCount||0)
			}else{
				return "";
			}
		}
	},
	
	
	newRegisterBadgeType(){
		
		return (data)=>{
			if(data.registerToBeAuditCount){
				return "danger";
			}else if(data.registerAuditedPassCount){
				return "success";
			}else if(data.registerRejectedCount || data.registerWithdrawCount){
				return "warning";
			}else{
				return "danger";
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
	
	//if(!this.pageInfoLoad()){
		this.getData()
	//}
		
	
    let date = new Date()
    this.timestamp = date.getTime() - date.getHours()*60*60*1000
    console.log(this.timestamp)
  },
  methods: {
		
    getData() {
	  //重置表格展开
	  this.expands = [];
	  
	  //重置分页信息
	  this.currentPage = 1;
	  this.pageTotal = 0;
	  
	  //刷新项目处理列表
	  this.getManageRegisterListData({}, (mrRes)=>{
	  				
	  	this.getRawRegisterListData({}, (rawRes)=>{
	  		//console.log('正评登记列表', rawRes);
			
			var rawProjIdList = {};
			rawRes.forEach((item, index) =>{
				//item
				//1.循环获取projId列表获取该projId列表下最新的subProjId的日期 和 总的待审核数
				if(typeof(rawProjIdList[item.projId]) == "undefined"){
					//不存在时, 添加
					//console.log('添加', item.projId, item.creationTime);					
					const newItem = {
						creationTime: item.creationTime,
						checkNum: item.mainStatus===1?1:0,
					}
					
					rawProjIdList[item.projId] = newItem;
				}else{
					//存在时, 更新
					//更新 更新日期
					if(rawProjIdList[item.projId].creationTime < item.creationTime){
						rawProjIdList[item.projId].creationTime = item.creationTime
					}					
					//更新 待审核数
					if(item.mainStatus===1){
						rawProjIdList[item.projId].checkNum += 1
					}
				}
			});
			
			//console.log(rawProjIdList);
			//2. 循环项目列表 增加更新日期到项目列表
			mrRes.forEach((item, index) =>{
				if(typeof(rawProjIdList[item.projId]) == "undefined"){
					
				}else{
					mrRes[index].creationTime = rawProjIdList[item.projId].creationTime;
					mrRes[index].checkNum = rawProjIdList[item.projId].checkNum;
				}
			});
		
			this.tableData = mrRes;
			this.tableDataTemp = mrRes;
			this.pageTotal = mrRes.length;
			
			this.$refs.table.sort('creationTime','descending')
	  	});
	  	
	  });
		
    },
	
	getLocalData(){
		this.tableData = this.tableDataTemp.filter(item =>{
			return  (((item.reportNum||'').indexOf(this.searchData.reportNum)!=-1 ) || this.searchData.reportNum == '') 
					&& (((item.projNum||'').indexOf(this.searchData.projNum)!=-1 ) || this.searchData.projNum == '')
					&& (((item.projName||'').indexOf(this.searchData.projName)!=-1 ) || this.searchData.projName == '')
					&& (((item.projScope||'').indexOf(this.searchData.projScope)!=-1 ) || this.searchData.projScope == '')
		})
		this.currentPage = 1;
		this.pageTotal = this.tableData.length;
		
		this.$refs.table.sort('creationTime','descending')
	},
	
	resetSearchData(){
		Object.keys(this.searchData).forEach(key => (this.searchData[key] = ''));
		this.getLocalData();
	},
	
	getRawRegisterListData(rawData, successc) {
		
		getRawRegisterList(rawData, this.companyId)
		.then(res => {
			if (res.statusCode == 200) {
				successc(res.data);
			}
		})
		.catch(err => {
		  console.log('正评登记列表', err)
		})
	},
	
	getManageRegisterListData(searchData, successc) {
		
		getManageRegisterList(searchData, this.companyId)
		.then(res => {
			if (res.statusCode == 200) {
				successc(res.data);
			}
		})
		.catch(err => {
		  console.log('项目处理列表', err)
		})
	},
	
    reset() {
		//重置分页信息
	  this.currentPage = 1;
	  this.tableData=[];
	  this.pageTotal = 0;
	  this.onGoing = false;
	  Object.keys(this.searchData).forEach(key => (this.searchData[key] = ''))
	  
      //刷新项目处理列表
      this.getManageRegisterListData({}, (mrRes)=>{
      	this.tableData = mrRes.data;
		this.tableDataTemp = mrRes.data;
      	this.pageTotal = mrRes.data.length;
      });
		
    },
	
	refresh(){
		this.getManageRegisterListData({}, (mrRes)=>{
			this.tableData = mrRes.data;
			this.tableDataTemp = mrRes.data;
			this.pageTotal = mrRes.data.length;
		});
	},
	
	//分页
    changePage(val) {
      console.log(val);
      this.currentPage = val;
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
	
	//排序变动
	sortChange({column,prop,order}){
		if(order == 'ascending'){
			this.tableData = this.tableData.sort((a, b)=>{
				return (""+a[prop]).localeCompare((""+b[prop]), "zh-Hans-CN", {sensitivity: "accent",})
			});
		}else if(order == 'descending'){
			this.tableData = this.tableData.sort((a, b)=>{
				return (""+b[prop]).localeCompare((""+a[prop]), "zh-Hans-CN", {sensitivity: "accent",})
			});
		}else{
			this.tableData = this.tableData.sort((a, b)=>{
				return (""+b['creationTime']).localeCompare((""+a['creationTime']), "zh-Hans-CN", {sensitivity: "accent",})
			});
		}
	},
	
	//展开行	
	rowClick(row,index) {
	  this.$refs.table.toggleRowExpansion(row)
	},
	
	expandChange(row,expandedRows) {		
	  if (expandedRows.length) {
	    this.expands = []
	    if (row) {
	      this.expands.push(row.projId)// 每次push进去的是每行的ID
		  
		  //读取数据...
		  this.getTableInfo(row.projId);
		  
		  //保存类型, 跳转审核模板
		  this.projType = row.projType;
	    }
	  } else {
	    this.expands = []// 默认不展开
	  }
	},	
	/* 
	getRowKeys(row) {
	  return row.projId
	},
	getSubRowKeys(row){
		return row.subProjNum
	},
	 */
	
	//子表格
	getTableInfo(projId){
		this.subProjdataList = [];
		/* 
		const projData = {
			projId: projId,
		}
		getSubProjectInfoList(projData, this.companyId)
		.then(res => {
			console.log('subList',  res.data)
		    this.subProjdataList = res.data
		})
		.catch(err => {
		})
		 */
		
		this.getSubProjectInfoListData(projId, (splData)=>{
		    this.subProjdataList = splData
			console.log('splData', splData)
		})
		
		this.getRegisterListData(projId, (relData)=>{
		    //this.subProjdataList = relData
			console.log('relData', relData)
		})
	},
	
	//子项目列表
	getSubProjectInfoListData(projId, successc) {
		const projData = {
			projId: projId,
		}
		getSubProjectInfoList(projData, this.companyId)
		.then(res => {
			if (res.statusCode == 200) {
				successc(res.data);
			}
		})
		.catch(err => {
			console.log('子项目列表', err)
		})
	},
	
	//子表格 处理登记信息审核
	//跳转正评修改页
	jumpToSubHandle(subData) {
		this.$router.push({ path: '/worksubregister', query: { projId: subData.projId, data: subData.subProjId } })
	},
	//跳转正评审核页
	jumpToSubHandleCheck(subData, projType) {
		if(subData.subProjStatus.mainStatus >= 1){
			//跳转不同页面
			if(projType==1020 || projType==1042){
				//资产
				this.$router.push({ path: '/worksubregistercheckz', query: { projId: subData.projId, data: subData.subProjId } })
			}else if(projType==1010 || projType==1041){
				//房产
				this.$router.push({ path: '/worksubregistercheckf', query: { projId: subData.projId, data: subData.subProjId } })
			// }else if(projType==1030 || projType==1043){
			// 	//土地
			// 	this.$router.push({ path: '/worksubregistercheckd', query: { projId: subData.projId, data: subData.subProjId } })
			}else{
				this.$message.warning('该项目类型还没开放信息录入');
			}
			
			//this.$router.push({ path: '/worksubregistercheck', query: { projId: subData.projId, data: subData.subProjId } })
		}else{
			this.$message.warning("请等待子项目正评提交后再审核")
		}
		
		
	},
	
	
	passRegisterCheckSubmit(subData, type){
		//console.log(subData, type);
		
		this.$confirm('确认通过该登记信息?', '提示: '.concat("计划编号:", subData.projId, subData.subProjNum?"-"+subData.subProjNum:""), { type: 'success' })
		.then(() => {
			const registerCheckForm = {
				subProjIdArray: subData.subProjId,
				mainStatus:3,
			}
			this.auditSubProjectRegisterData( registerCheckForm, (auditData)=>{
				//提交成功
				
				//刷新表单
				this.getTableInfo(subData.projId);
			});
		})
		
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
	
	
	//子表格 处理凭证信息审核
		
	//刷新凭证
	reflashReceiptList(projId){
		//获取合同值
		
		this.getReceiptListData(projId, (rlData)=>{
			//this.receiptList = rlData
			this.getRegisterListData(projId, (relData)=>{
			//	this.registerList = relData
				//const relData = this.subProjdataList;
				
				console.log('rlData', rlData)
				console.log('relData', relData)
				
				var rTotal={
					xs:0,
					ys:0,
					fp:0,
					fpok:0,
					sj:0,
					sjok:0,
					wp:0,
					wpok:0,
				}
				
				//循环得到项目应收费
				var newList = [];
				var newItem = {};
				rlData.forEach((item, index) =>{
					if(item.receiptType == '专用发票' || item.receiptType == '普通发票'){
						rTotal.fp += parseFloat(item.totalAmount);
						if(item.paymentType){
							rTotal.fpok += parseFloat(item.totalAmount);
						}
					}else if(item.receiptType == '开收据'){
						rTotal.sj += parseFloat(item.totalAmount);
						if(item.paymentType){
							rTotal.sjok += parseFloat(item.totalAmount);
						}
					}else if(item.receiptType == '无'){
						rTotal.wp += parseFloat(item.totalAmount);
						if(item.paymentType){
							rTotal.wpok += parseFloat(item.totalAmount);
						}
					}
					
					if(item.paymentType == '现收'){
						rTotal.xs += parseFloat(item.totalAmount);
					}else if(item.paymentType == '银收'){
						rTotal.ys += parseFloat(item.totalAmount);
					}
					
					//当多项时, 作为1层
					if(item.makeOutPattern == 1){
						newItem = item
						var cdReceivable = 0;
						relData.forEach((item2, index2) =>{
							if(item.bindingSubProjId.indexOf(item2.subProjId) != -1){
								cdReceivable += parseFloat(item2.cdReceivable)
							}
						});
						newItem.cdReceivable = cdReceivable;
						newList.push(newItem)
					}else{
						//判断1层列表是否存在
						const findres = newList.find((ev) => {
							return ev.bindingSubProjId === item.bindingSubProjId;
						});
						
						if (findres == undefined){
							//不存在 undefined, 作为第一层, 原来item作为第二层
							
							var itemtemp = item							
							//获取cdReceivable
							const findreceivable = relData.find((ev) => {
								return ev.subProjId === item.bindingSubProjId;
							});							
							if(findreceivable != undefined){
								//找到
								itemtemp.cdReceivable =  parseFloat(findreceivable.cdReceivable)
							}
							
							newItem = Object.assign({}, itemtemp)
							newItem.receiptId = 'new'+ newItem.receiptId;
							
							newItem.receiptType = '';
							newItem.invoiceTitle = '';
							newItem.paymentType = '';
							newItem.quittanceNum = '';
							newItem.quittanceDate = '';
							newItem.invoiceNum = '';
							newItem.invoiceDate = '';
							newItem.collectionDate = '';
							newItem.children = [];
							
							newItem.children.push(itemtemp)
							newList.push(newItem)
						}else{
							//已经存在
							var itemtemp = item							
							//获取cdReceivable
							const findreceivable = relData.find((ev) => {
								return ev.subProjId === item.bindingSubProjId;
							});							
							if(findreceivable != undefined){
								//找到
								itemtemp.cdReceivable = parseFloat(findreceivable.cdReceivable)
							}
							
							const findIndex = newList.findIndex((ev) => {
								return ev.bindingSubProjId === item.bindingSubProjId;
							});
							//开票金额相加
							newList[findIndex].totalAmount =  parseFloat(newList[findIndex].totalAmount) + parseFloat(itemtemp.totalAmount);
							
							newList[findIndex].children.push(itemtemp)
						}
					}
				});
				
				console.log('newList', newList)
				
				//循环newList 计算差值
				newList.forEach((item, index, newList) =>{
					newList[index].difference = parseFloat(newList[index].cdReceivable) -  parseFloat(newList[index].totalAmount)
					if(newList[index].difference === 0){
						newList[index].difference = '一致'
					}
					
					//增加id
					newList[index].id = (index+1);
				});
				
				this.receiptList = newList;
				
				//console.log('rTotal', rTotal)
				
				//对话框表单
				this.receiptForm.subProjXSJE = rTotal.xs; //现收合计金额
				this.receiptForm.subProjYSJE = rTotal.ys; //银收合计金额				
				this.receiptForm.subProjFPJE = "开: " + rTotal.fp + " / 收: " + rTotal.fpok; //发票金额
				this.receiptForm.subProjSJJE = "开: " + rTotal.sj + " / 收: " + rTotal.sjok; //收据金额
				this.receiptForm.subProjWPJE = "开: " + rTotal.wp + " / 收: " + rTotal.wpok; //无凭证金额 = receiptForm;
				
			});
		});
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
	
	//开票
	editSubProjectReceiptIssueData(receiptData, successc) {
	  //211101变动 新增: 多个公司切换
		editSubProjectReceiptIssue(receiptData, this.companyId)
	    .then(res => {
			if (res.statusCode == 200) {
				successc(res.data);
			}
			
	    })
	    .catch(err => {
	      console.log('开具凭证', err)
	    })
	},
	
	//作废
	editSubProjectReceiptInvalidateData(receiptData, successc) {
	  //211101变动 新增: 多个公司切换
		editSubProjectReceiptInvalidate(receiptData, this.companyId)
	    .then(res => {
			if (res.statusCode == 200) {
				successc(res.data);
			}
			
	    })
	    .catch(err => {
	      console.log('开具凭证', err)
	    })
	},
	
	//收费
	editSubProjectReceiptPayData(payData, successc) {
	  //211101变动 新增: 多个公司切换
		editSubProjectReceiptPay(payData, this.companyId)
	    .then(res => {
			if (res.statusCode == 200) {
				successc(res.data);
			}
			
	    })
	    .catch(err => {
	      console.log('收费', err)
	    })
	},
	
	editReceiptSubProj(projData) {
		//this.$message("收费凭证处理")
		this.receiptTitle = projData.reportNum + ' ' + projData.projNum;
				
		//初始化表单
		const receiptForm={
			projId: projData.projId, //项目id
			subProjId: '', //子项目id
			
			subProjXSJE: "", //现收合计金额
			subProjYSJE: "", //银收合计金额
			
			subProjFPJE: "", //发票金额
			subProjSJJE: "", //收据金额
			subProjWPJE: "", //无凭证金额
			
			subProjSFQK: "", //收费情况 每笔收费情况
			
			contractPrice: projData.contractPrice,//合同价
		}
		this.receiptForm = receiptForm;
		
		//读取对应发票列表
		this.reflashReceiptList(projData.projId)
		
		
		this.receiptVisible = true
	},
	
	getSummaries(param) {
		const { columns, data } = param;
		const sums = [];
		columns.forEach((column, index) => {
		  if (index === 1) {
			sums[index] = '合计';
			return;
		  }
		  
		  if(index ===6 || index === 3 || index === 4 || index === 5){
			const values = data.filter(item=>item['receiptStatus']!=9).map(item => Number(item[column.property]));
			if (!values.every(value => isNaN(value))) {
				sums[index] = values.reduce((prev, curr) => {
				  const value = Number(curr);
				  if (!isNaN(value)) {
					return prev + curr;
				  } else {
					return prev;
				  }
				}, 0);
				
				if(index ===4 && this.receiptForm){
					//跟开票列做对比
					const invoicePrice = parseFloat(sums[index]);
					const contractPrice = parseFloat(this.receiptForm.contractPrice);
					if(contractPrice){
						if(contractPrice-invoicePrice == 0){
							sums[3] = '合同价: '+contractPrice.toFixed(2) + ', 合同价和开票一致';
						}else{
							sums[3] = '合同价: '+contractPrice.toFixed(2) + ', 开票差额: '+ (contractPrice-invoicePrice).toFixed(2) ;
						}
						
					}else{
						sums[3] = '未填报合同价';
					}
				}
				
				
				if(index ===6){
					const invoicePrice = parseFloat(sums[4]);
					const receivablePrice = parseFloat(sums[5]);
					sums[index] = (receivablePrice-invoicePrice).toFixed(2);
				}
				
				if(index ===5||index ===4){
					sums[index] = sums[index].toFixed(2);
				}
				
				
				/* 
				if(index ===5){
					const invoicePrice = parseFloat(sums[4]);
					const receivablePrice = parseFloat(sums[5]);
					sums[index] = sums[index].toFixed(2) + '元, 开票差额: '+ (receivablePrice-invoicePrice).toFixed(2) + '元';
				}
				
				if(index ===4){
					sums[index] = sums[index].toFixed(2) + '元';
				}
				 */
				
			}  
		  }
		  /* 
		  if(index === 3 || index === 4){
			const values = data.map(item => Number(item[column.property]));
			if (!values.every(value => isNaN(value))) {
				sums[index] = values.reduce((prev, curr) => {
				  const value = Number(curr);
				  if (!isNaN(value)) {
					return prev + curr;
				  } else {
					return prev;
				  }
				}, 0);
				sums[index] = sums[index].toFixed(2) + '元';
			}  
		  }
		  */
		});
	
		return sums;
	},
	expandSubChange(row,index,e){
	  this.$refs.receipttable.toggleRowExpansion(row)
	},
	
	//收费录入
	editPaySubProj(subData) {
		//this.$message("收费录入")
		this.subPayInfoTitle = "";
		
		//初始化表单
		const subPayInfoForm={
			receiptId: subData.receiptId, //凭证id
			bindingSubProjNum: subData.bindingSubProjNum, //子项目号
			receiptType:subData.receiptType, //收费凭证
			isElectronic:subData.isElectronic, //电子/纸质
			invoiceTitle:subData.invoiceTitle, //开票抬头
			dutyParagraph:subData.dutyParagraph, //开票税号
			totalAmount:subData.totalAmount,  //开票金额
			address: subData.address,//地址
			telNum: subData.telNum,//电话
			depositBank: subData.depositBank,//开户行
			bankAccount: subData.bankAccount,//账号
			quittanceNum:subData.quittanceNum, //收据号
			quittanceDate:subData.quittanceDate, //收据日期
			invoiceNum:subData.invoiceNum, //发票号
			invoiceDate:subData.invoiceDate, //发票日期
			paymentType: subData.paymentType, //收费方式  现收或银收
			collectionDate: subData.collectionDate, //收款日期
		}		
		this.subPayInfoForm = subPayInfoForm;
		
		this.subPayInfoVisible = true
	},
	editBillSubProj(subData) {
		//this.$message("发票开具")
		this.subBillInfoTitle = "";
		
		//初始化表单
		const subBillInfoForm={
			receiptId: subData.receiptId, //凭证id
			bindingSubProjNum: subData.bindingSubProjNum, //子项目号
			receiptType:subData.receiptType, //收费凭证
			isElectronic:subData.isElectronic, //电子/纸质
			invoiceTitle:subData.invoiceTitle, //开票抬头
			dutyParagraph:subData.dutyParagraph, //开票税号
			totalAmount:subData.totalAmount,  //开票金额
			address: subData.address,//地址
			telNum: subData.telNum,//电话
			depositBank: subData.depositBank,//开户行
			bankAccount: subData.bankAccount,//账号			
			quittanceNum:subData.quittanceNum, //收据号		
			quittanceDate:subData.quittanceDate, //收据日期
			invoiceNum:subData.invoiceNum, //发票号		
			invoiceDate:subData.invoiceDate, //发票日期
			receiptRemark:subData.receiptRemark, //凭证备注
		}		
		this.subBillInfoForm = subBillInfoForm;
		
		this.subBillInfoVisible = true
	},
	editProblemSubProj(subData) {
		//this.$message("问题记录")
		this.subProblemInfoTitle = "".concat("计划编号:", subData.projId, subData.subProjNum?" 子报告号:"+subData.subProjNum:"");
		
		//初始化表单
		const subProblemInfoForm={
			projId: subData.projId, //子项目id
			subProjId: subData.subProjId, //子项目id
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
		this.$message("项目评价")
		//this.$router.push({ path: '/worksubregistercheck', query: { projId: projId, data: val } })
	},
	
	//弹出框提交
	subBillInfoEdit(billform){
		this.$refs.subBillInfoForm.validate((valid) => {
			if (valid) {
				this.$confirm('确认提交该凭证信息?', '开票提示', { type: 'success' })
				.then(() => {
					var receiptData = {};
					if(billform.receiptType == '开收据'){
						receiptData={
							receiptId:billform.receiptId,
							quittanceNum:billform.quittanceNum,
							quittanceDate:billform.quittanceDate,
						}
						
					}else if(billform.receiptType == '普通发票' || billform.receiptType == '专用发票'){
						receiptData={
							receiptId:billform.receiptId,
							invoiceNum:billform.invoiceNum,
							invoiceDate:billform.invoiceDate,
						}
					}
					
					this.editSubProjectReceiptIssueData(receiptData, (rData)=>{
						this.$message.success('开票成功');
						this.subBillInfoVisible = false;
						
						//读取对应发票列表
						this.reflashReceiptList(this.receiptForm.projId)
						
						//刷新项目处理列表
						this.refresh();
					})
				
				})
				
				
				//this.$message(this.subBillInfoForm.receiptType+'可以提交');
				//console.log('subBillInfo', this.subBillInfoForm);
			}else{
				this.$message('请填写必填信息或格式有误');
			}
		})
	},
	subBillInfoInvalidate(billform){
		if(billform.quittanceDate || billform.invoiceDate){
			//已开收据或发票
			this.$confirm('确认作废该凭证信息?', '作废提示', { type: 'warning' })
			.then(() => {
				const receiptData ={
					receiptId: billform.receiptId,
				}
				this.editSubProjectReceiptInvalidateData(receiptData, (rData)=>{
					this.$message.success('作废成功');
					this.subBillInfoVisible = false;
					
					//读取对应发票列表
					this.reflashReceiptList(this.receiptForm.projId)
					
					//刷新项目处理列表
					this.refresh();
				})
			})
		}else{
			this.$message.warning('当前还没开票, 不需要作废, 让助理自行修改或删除');
		}
		
		
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
	subPayInfoEdit(payform){
		this.$refs.subPayInfoForm.validate((valid) => {
			if (valid) {
				this.$confirm('确认提交收款信息?', '收款提示', { type: 'success' })
				.then(() => {
					var payData={
						receiptId:payform.receiptId,
						paymentType:payform.paymentType,
						collectionDate:payform.collectionDate,
					}
					
					this.editSubProjectReceiptPayData()(payData, (pData)=>{
						this.$message.success('收费成功');
						this.subPayInfoVisible = false;
						
						//读取对应发票列表
						this.reflashReceiptList(this.receiptForm.projId)
					})
				
				})
				
				// this.$message('可以提交');
				// console.log('subPayInfo', this.subPayInfoForm);
			}else{
				this.$message('请填写必填信息或格式有误');
			}
		})
	},
	
	exportSubProj(exportType, projId){
		var formData = new FormData()
		if(exportType == '正评列表'){
			if(this.exportSubListForm.multiDate){
				const startData = this.exportSubListForm.multiDate[0] + ' 00:00:00';
				const endDate = this.exportSubListForm.multiDate[1] + ' 23:59:59';
				formData.append('startDate', startData);
				formData.append('endDate', endDate);
				
				const path = 'registerManage/batchExportRegisterInfoListExcel'
				downloadExcel(formData, path, this.companyId)
			}else{
				this.$message.warning('请选择导出的日期范围');
			}
		}else if(exportType == '发票列表'){
			if(this.exportSubListForm.multiDate){
				const startData = this.exportSubListForm.multiDate[0] + ' 00:00:00';
				const endDate = this.exportSubListForm.multiDate[1] + ' 23:59:59';
				formData.append('startDate', startData);
				formData.append('endDate', endDate);
				
				const path = 'registerManage/batchExportReceiptInfoListExcel'
				downloadExcel(formData, path, this.companyId)
			}else{
				this.$message.warning('请选择导出的日期范围');
			}
		}else if(exportType == '正评'){
			formData.append('projId', projId)
			const path = 'register/batchExportRegisterInfoExcel'
			downloadExcel(formData, path, this.companyId)
		}else if(exportType == '底单'){
			formData.append('projId', projId)
			const path = 'register/chargeDoc/batchExportExcel'
			downloadExcel(formData, path, this.companyId)
		}
	},
	
	copy(e) {
	  this.$message.success('内容已复制到剪贴板')
	},
	
	formatDate(now) {
	  if(now){
		const time = new Date(now)
		var year = time.getFullYear();  //取得4位数的年份
		var month = time.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
		var date = time.getDate();      //返回日期月份中的天数（1到31）
		var hour = time.getHours();     //返回日期中的小时数（0到23）
		return year + "-" + month + "-" + date  
	  }else{
		return '';
	  }
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

.badgeitem {
  margin-top: 10px;
  margin-right: 15px;
}
.badgenull {
  margin-top: 10px;
}

</style>