<template>
  <div>
    <div class="container">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-receiving"></i> 我的审核
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
	   
	  <!-- 弹出框 -->	 
	  <el-dialog :title="`总审审核 ${chiefInfoTitle}`" :visible.sync="chiefInfoVisible" :modal="false" :destroy-on-close="true" v-dialogDrag width="800px" top="20px">
		<el-form
			ref="chiefInfoForm"
			:model="chiefInfoForm"
			:rules="chiefInfoRules"
			label-width="100px"
		>
			<el-row :gutter="10">
				<el-col :span="24">
					<el-form-item label="项目名称" prop="subProjName">
						<el-input v-model="chiefInfoForm.subProjName" readonly
							type="textarea" autosize maxlength="240" style="width: 100%;"
						></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="项目范围" prop="subProjName">
						<el-input v-model="chiefInfoForm.subProjScope" readonly
							type="textarea" autosize maxlength="240" style="width: 100%;"
						></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="10">
				<el-col :span="12">
					<el-form-item label="公司合同号" prop="contractNum">
					  <el-input v-model="chiefInfoForm.contractNum" readonly ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="合同价" prop="contractPrice">
					  <el-input v-model="chiefInfoForm.contractPrice" readonly ></el-input>
					  <span v-if="chiefInfoForm.contractPrice">
					  	{{changeMoneyToChinese(chiefInfoForm.contractPrice)}}
					  </span>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="评估值" prop="regEvalConclusionValue">
					  <el-input v-model="chiefInfoForm.regEvalConclusionValue" readonly ></el-input>
					  <span v-if="chiefInfoForm.regEvalConclusionValue">
					  	{{changeMoneyToChinese(chiefInfoForm.regEvalConclusionValue)}}
					  </span>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="应收款" prop="cdReceivable">
					  <el-input v-model="chiefInfoForm.cdReceivable" readonly ></el-input>
					  <span v-if="chiefInfoForm.cdReceivable">
					  	{{changeMoneyToChinese(chiefInfoForm.cdReceivable)}}
					  </span>
					</el-form-item>
				</el-col>
			</el-row>
			
			<el-row :gutter="10">
				<el-col :span="12">
					<el-form-item label="项目负责人" prop="regProjLeader">
					  <el-input v-model="chiefInfoForm.regProjLeader" readonly ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="签字估价师" prop="regSignedAppraiser">
					  <el-input v-model="chiefInfoForm.regSignedAppraiser" readonly ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="技术说明" prop="regTechExpDrafter">
						<el-input v-model="chiefInfoForm.regTechExpDrafter" readonly 
						type="textarea" autosize ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="报告拟稿" prop="regReportDrafter">
					  <el-input v-model="chiefInfoForm.regReportDrafter" readonly style="width: 100%" 
					  type="textarea" autosize ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="10">
				<el-col :span="12">
					<el-form-item label="技术评分" prop="technicalRating" :class="chiefInfoForm.regTechExpDrafter?'red-item':''"
					:rules="(chiefInfoForm.regTechExpDrafter && chiefInfoForm.reviewStatus!=2)?selectReq:[]">
						<el-select
						  style="width: 100%;" 
						  v-model="chiefInfoForm.technicalRating"
						  placeholder="请选择"
						  filterable
						  clearable
						>
						  <el-option
						    v-for="item in technicalRatingOptions"
						    :key="item"
						    :value="item=='不作统计'?'不计':item"
						    :label="item"
						  ></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="拟稿评分" prop="draftingRating" :class="chiefInfoForm.regReportDrafter?'red-item':''"
					:rules="(chiefInfoForm.regReportDrafter && chiefInfoForm.reviewStatus!=2)?selectReq:[]">
						<el-select
						  style="width: 100%;" 
						  v-model="chiefInfoForm.draftingRating"
						  placeholder="请选择"
						  filterable
						  clearable
						>
						  <el-option
						    v-for="item in draftingRatingOptions"
						    :key="item"
						    :value="item=='不作统计'?'不计':item"
						    :label="item"
						  ></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="审核备注" prop="reviewComment"  class="red-item">
					  <el-input v-model="chiefInfoForm.reviewComment" style="width: 100%" clearable placeholder="如需要, 请输入"
						type="textarea" autosize maxlength="240"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="审核情况" prop="reviewStatus" class="red-item">
					  <el-select
						style="width: 100%;" 
						v-model="chiefInfoForm.reviewStatus"
						placeholder="请选择"
						filterable
						@change="handleChangeReviewStatus"
					  >
						<el-option
						  v-for="item, index in reviewStatusOptions"
						  :key="index"
						  :label="item.label"
						  :value="item.value"
						  :disabled="item.value===0?true:false"
						></el-option>
					  </el-select>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div
		  slot="footer"
		  class="dialog-footer"
		>
		  <el-button
			@click="chiefInfoEdit()"
			type="primary"
		  >确认提交</el-button>
		  <el-button @click="chiefInfoVisible = false">取 消</el-button>
		</div>
		<ChiefRecord :subProjId="chiefInfoForm.subProjId"></ChiefRecord>
	  </el-dialog>
	  
	  <el-dialog :title="`盖章 ${stampedInfoTitle}`" :visible.sync="stampedInfoVisible" :modal="false" :destroy-on-close="true"  v-dialogDrag width="800px" top="20px">
		<el-form
			ref="stampedInfoForm"
			:model="stampedInfoForm"
			:rules="stampedInfoRules"
			label-width="125px"
		>
			<el-form-item label="项目名称" prop="subProjName">
				<el-input v-model="stampedInfoForm.subProjName" readonly
					type="textarea" autosize maxlength="240" style="width: 100%;"
				></el-input>
			</el-form-item>
			<el-form-item label="项目范围" prop="subProjName">
				<el-input v-model="stampedInfoForm.subProjScope" readonly
					type="textarea" autosize maxlength="240" style="width: 100%;"
				></el-input>
			</el-form-item>
			
			<el-row :gutter="10">
				<el-col :span="12">
					<el-form-item label="公司合同号" prop="contractNum">
					  <el-input v-model="stampedInfoForm.contractNum" readonly ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="合同价" prop="contractPrice">
					  <el-input v-model="stampedInfoForm.contractPrice" readonly ></el-input>
					  <span v-if="stampedInfoForm.contractPrice">
					  	{{changeMoneyToChinese(stampedInfoForm.contractPrice)}}
					  </span>
					</el-form-item>
				</el-col>
			</el-row>
			
			
			<el-row :gutter="10">
				<el-col :span="12">
					<el-form-item label="评估值" prop="regEvalConclusionValue">
					  <el-input v-model="stampedInfoForm.regEvalConclusionValue" readonly ></el-input>
					  <span v-if="stampedInfoForm.regEvalConclusionValue">
					  	{{changeMoneyToChinese(stampedInfoForm.regEvalConclusionValue)}}
					  </span>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="应收款" prop="cdReceivable">
					  <el-input v-model="stampedInfoForm.cdReceivable" readonly ></el-input>
					  <span v-if="stampedInfoForm.cdReceivable">
					  	{{changeMoneyToChinese(stampedInfoForm.cdReceivable)}}
					  </span>
					</el-form-item>
				</el-col>
			</el-row>
			
			<el-row :gutter="10">
				<el-col :span="12">
					<el-form-item label="项目负责人" prop="regProjLeader">
					  <el-input v-model="stampedInfoForm.regProjLeader" readonly ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="签字估价师" prop="regSignedAppraiser">
					  <el-input v-model="stampedInfoForm.regSignedAppraiser" readonly ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="10">
				<el-col :span="12">
					<el-form-item label="技术说明" prop="regTechExpDrafter">
						<el-input v-model="stampedInfoForm.regTechExpDrafter" readonly 
						type="textarea" autosize ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="报告拟稿" prop="regReportDrafter">
					  <el-input v-model="stampedInfoForm.regReportDrafter" readonly style="width: 100%" 
					  type="textarea" autosize ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="10">
				<el-col :span="12">
					<el-form-item label="审核备注" prop="reviewComment">
					  <el-input v-model="stampedInfoForm.reviewComment" style="width: 100%" readonly clearable placeholder="如需要, 请输入审批备注"
						type="textarea" autosize maxlength="240"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="审核情况" prop="reviewStatus">
					  <el-select
						style="width: 100%;" 
						v-model="stampedInfoForm.reviewStatus"
						placeholder="请选择"
						filterable
						disabled
					  >
						<el-option
						  v-for="item, index in reviewStatusOptions"
						  :key="index"
						  :label="item.label"
						  :value="item.value"
						></el-option>
					  </el-select>
					</el-form-item>
				</el-col>
			</el-row>
			
			<el-form-item label="盖章情况" prop="isStamped" class="red-item">
			  <el-select
				style="width: 100%;" 
				v-model="stampedInfoForm.isStamped"
				placeholder="请选择"
				filterable
				readonly
			  >
				<el-option
				  v-for="item,index in isStampedOptions"
				  :key="index"
				  :label="item.label"
				  :value="item.value"
				  :disabled="(item.value===0||(stampedInfoForm.isStampedtemp==0 && item.value==2)) ?true:false"
				></el-option>
			  </el-select>
			</el-form-item>
		</el-form>
		<div
		  slot="footer"
		  class="dialog-footer"
		>
		  <el-button
			@click="stampedInfoEdit()"
			type="primary"
		  >确认提交</el-button>
		  <el-button @click="stampedInfoVisible = false">取 消</el-button>
		  
		</div>
		<ChiefRecord :subProjId="stampedInfoForm.subProjId"></ChiefRecord>
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
				  v-model.trim="searchData.projNum"
				  placeholder="计划编号"
				  @keyup.enter.native="getLocalData"
				></el-input>
			  </el-col>
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
				  v-model.trim="searchData.projName"
				  placeholder="项目名称"
				  @keyup.enter.native="getLocalData"
				></el-input>
			  </el-col>
			  <el-col :lg="4" :span="4">
				<el-input
				  v-model.trim="searchData.projScope"
				  placeholder="项目范围"
				  @keyup.enter.native="getLocalData"
				></el-input>
			  </el-col>
			  <el-col :lg="3" :span="3">
				<el-input
				  v-model.trim="searchData.projAsst"
				  placeholder="助理"
				  @keyup.enter.native="getLocalData"
				></el-input>
			  </el-col>
			  <el-col :lg="5" :span="5">
				<el-button-group>
					<el-button type="primary" size="small" @click="getLocalData">查找</el-button>
					<el-button type="warning" size="small" @click="resetSearchData">重置</el-button>
				</el-button-group>
			  </el-col>
			  
			</el-row>
		  </el-col>
		  <el-col :lg="8" :span="23">
			<div style="float: right;">				
			  <el-switch
				v-model="chiefRole.showStamp"
				active-text="显示盖章"
				inactive-text="不显示"
				:active-value="true"
				:inactive-value="false"
				@change="onChangeSwitch"
				style="height: 28px; margin-right: 10px;"
				v-if="chiefRole.canCheckAll && chiefRole.canStamp">
			  </el-switch>
				  
			  <el-switch
				v-model="chiefRole.showCheckAll"
				active-text="全部审核"
				inactive-text="本人审核"
				:active-value="true"
				:inactive-value="false"
				@change="onChangeSwitch"
				style="height: 28px;"
				v-if="chiefRole.canCheckAll">
			  </el-switch>
			</div>
		  </el-col>
		  
		  <!-- 
		  <el-col :xs="24" :sm="24" :lg="9">
			<div style="text-align: right; ">
				<el-form
					ref="exportSubListForm"
					:model="exportSubListForm"
					:rules="exportSubListFormRules"
					label-width="auto"
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
		  -->
		  
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
		:default-sort = "{prop: 'changeTime', order: 'descending'}"
		@sort-change="sortChange"
      >	  
	  <!-- 展开行  v-loading="expandLoading"element-loading-text="Loading"-->
	  <el-table-column type="expand" width="20">
	    <template slot-scope="props">
	      <el-table
			ref="subTable"
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
	        <el-table-column label="修改日期" width="90">
	          <template slot-scope="scope">
				{{formatDate(scope.row.changeTime)}}
	          </template>
	        </el-table-column>
			<!-- 
			<el-table-column label="基准日" width="90">
			  <template slot-scope="scope">
				{{formatDate(scope.row.subBaseDate)}}
			  </template>	
			</el-table-column>
			 -->
	        <el-table-column label="项目名称" min-width="180px">
	          <template slot-scope="scope">
				<el-tooltip class="item" effect="dark" :content="`项目范围: ${scope.row.subProjScope||'无'}`" placement="top">
					<span>{{ scope.row.subProjName }}</span>
				</el-tooltip>
				
	          </template>
	        </el-table-column>
			<!-- 
	        <el-table-column label="项目范围" min-width="180px">
	          <template slot-scope="scope">
				{{ scope.row.subProjScope }}
	          </template>
	        </el-table-column>
			 -->
	        <el-table-column label="评估值" width="100px">
	          <template slot-scope="scope">
				<div style="text-align: right;">
				{{ newPrice(scope.row.regEvalConclusionValue) }}
				</div>
	          </template>
	        </el-table-column>
			
	        <el-table-column label="应收款" width="100px">
	          <template slot-scope="scope">
				<div style="text-align: right;">
				{{ newPrice(scope.row.cdReceivable) }}
				</div>
	          </template>
	        </el-table-column>
	        <el-table-column label="技术说明" width="70px">
	          <template slot-scope="scope">
				{{ scope.row.regTechExpDrafter }}
	          </template>
	        </el-table-column>
	        <el-table-column label="技术" width="45px"
			v-if="chiefRole.showCheck">
	          <template slot-scope="scope">
				{{ scope.row.technicalRating }}
	          </template>
	        </el-table-column>
	        <el-table-column label="报告拟稿" width="70px">
	          <template slot-scope="scope">
				{{ scope.row.regReportDrafter }}
	          </template>
	        </el-table-column>
	        <el-table-column label="质量" width="45px"
			v-if="chiefRole.showCheck">
	          <template slot-scope="scope">
				{{ scope.row.draftingRating }}
	          </template>
	        </el-table-column>
			
			<el-table-column label="处理日期" width="120px">
			  <template slot-scope="scope">
				<div>
				审核: {{formatDate(scope.row.reviewTime)}}
				</div>
				<div>
				盖章: {{formatDate(scope.row.stampedTime)}}
				</div>
			  </template>
			</el-table-column>
			<!-- 
	        <el-table-column label="审核日期" width="90px">
	          <template slot-scope="scope">
				{{formatDate(scope.row.reviewTime)}}
	          </template>
	        </el-table-column>
	        <el-table-column label="盖章日期" width="90px">
	          <template slot-scope="scope">
				{{formatDate(scope.row.stampedTime)}}
	          </template>
	        </el-table-column>
			 -->
			
			<el-table-column
			  label="总审审核"
			  width="100"
			  align="center"
			  v-if="chiefRole.showCheck"
			>
			  <template slot-scope="scope"> 
				<el-button
				  :type="newButtonType(scope.row.reviewStatus)"
				  size="mini"
				  @click="editChiefInfo(scope.row)"
				  :disabled="scope.row.mainStatus>0?false:true"
				>审核</el-button>
				
			  </template>
			</el-table-column>			
			
			<el-table-column
			  label="盖章"
			  width="100"
			  align="center"
			  v-if="chiefRole.showStamp"
			>
			  <template slot-scope="scope"> 
				<el-button
				  :type="newButtonType(scope.row.isStamped)"
				  size="mini"
				  @click="editStampedInfo(scope.row)"
				  :disabled="scope.row.reviewStatus==1?false:true"
				>盖章</el-button>
			  </template>
			</el-table-column>	
			
			<el-table-column
			  label="进度"
			  width="90"
			  align="center"
			>
			  <template slot-scope="scope">
				<div style="text-align: left;">
			    <el-tag :type="newTagType(scope.row)">{{newTagValue(scope.row)}}</el-tag>
				</div>
			  </template>
			</el-table-column>
	      </el-table>
	    </template>
	  </el-table-column>
		
		<el-table-column
		  prop="projNum"
		  label="计划编号"
		  width="100"
		  sortable="custom"
		>
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
          prop="changeTime"
          label="更新日期"
          width="100"
          sortable="custom"
        >
			<template slot-scope="scope">
				{{formatDate(scope.row.changeTime)}}
			</template>
        </el-table-column>		
        <el-table-column
          prop="checkNum"
          label="待审"
          width="70"
          sortable="custom"
		  align="center"
		  v-if="chiefRole.showCheck"
        >
        </el-table-column>
        <el-table-column
          prop="stampedNum"
          label="待盖"
          width="70"
          sortable="custom"
		  align="center"
		  v-if="chiefRole.showStamp"
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
		  prop="contractNum"
		  label="公司合同号"
		  width="90"
		>
        </el-table-column>
		<el-table-column
		  prop="contractPrice"
		  label="合同价"
		  width="90"
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
		<!-- 
        <el-table-column
          prop="projScope"
          label="项目范围"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
		 -->
        <el-table-column
          prop="projAsst"
          label="助理"
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
							{{scope.row.projAsst}}
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
          :width="(chiefRole.showCheck && chiefRole.showStamp)?170:100"
        >
          <template slot-scope="scope">
			<span v-if="chiefRole.showCheck">
			<el-badge :value="newCheckBadge(scope.row)" :type="newCheckBadgeType(scope.row)" class="badgeitem">              
			<el-button
			  type="primary" 
			  @click=""
			  size="small"
			>审核</el-button>
			</el-badge>
			</span>
			
			<span v-if="chiefRole.showStamp">
			<el-badge :value="newStampedBadge(scope.row)" :type="newStampedBadgeType(scope.row)" class="badgeitem">
			<el-button
			  type="primary" 
			  @click=""
			  size="small"
			>盖章</el-button>
			</el-badge>
			</span>
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
import { getSubProjectInfoList, getRawRegisterList, getManageRegisterList, getReceiptList, getRegisterList, editSubProjectReceiptIssue, editSubProjectReceiptInvalidate, editSubProjectReceiptPay, auditSubProjectRegister,
		getFinalReviewList, getRawFinalReviewList, getSubProjListWithReviewInfo, auditReview, doStamp} from '@/api/subReport'
import {downloadExcel, downloadImageReview} from '../../utils/download';
import ChiefRecord from './ChiefRecord'
export default {
  name: 'workchief',
  components: {
    ChiefRecord,
  },
  data() {
    return {		
      currentPage: 1, // 当前页码
      pageSize: 20, // 每页的数据条数
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
		projAsst: '',  
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
	  
	  //总审审核
	  chiefInfoVisible:false,
	  chiefInfoTitle:'',
	  chiefInfoForm:{
	  },
	  chiefInfoRules:{
		  reviewStatus: [{ required: true, message: '请选择', trigger: 'blur' }],
	  },
	  
	  
	  //盖章
	  stampedInfoVisible:false,
	  stampedInfoTitle:'',
	  stampedInfoForm:{
	  },
	  stampedInfoRules:{
	  	isStamped: [{ required: true, message: '请选择', trigger: 'blur' }],
	  },
	  
	  
	  technicalRatingOptions:['优','良','中','差','不作统计'],
	  draftingRatingOptions:['优','良','中','差','不作统计'],
	  reviewStatusOptions:[
		{
		  label:'审核通过, 可出报告',
		  value:1
		},
		{
		  label:'审核不通过, 不出报告',
		  value:2
		},
	  ],
	  isStampedOptions:[
		{
		  label:'已盖章',
		  value:1
		},
		{
		  label:'撤销盖章',
		  value:2
		},
	  ],
	  
	  inputReq:[{ required: true, message: '请输入', trigger: 'blur' }],
	  
	  selectReq:[{ required: true, message: '请选择', trigger: 'blur' }],
	  
	  
	  //本地查找列表
	  searchData:{
		reportNum:'', //报告号
		projNum:'', //计划号
		projName:'', //项目名称
		projScope:'', //项目范围
		projAsst:'', //助理
	  },
	  
	  projType:'',
	  
	  projData:[],
	  
	  //访问权限控制
	  chiefRole:{
		canCheckAll:false,
		checkType:'',
		canStamp:false,
		showCheckAll:false,
		showCheck:false,
		showStamp:false,
	  }	  
	  
    };
  },
  computed:{
  	newTagType(){
  		return (data)=>{
			if(data.mainStatus>0){
				if(data.isStamped == 1){
					//已盖章
					return "success";
				}else if(data.isStamped == 2){
					//不盖章
					return "warning";
				}else if(data.reviewStatus == 1){
					//已审核, 并通过
					return "";
				}else if(data.reviewStatus == 2){
					//已审核, 但不通过
					return "danger";
				}else{
					//其他状态
					return "info";
				}
			}else{
				return "warning";
			}
  		}
  	},
	newTagValue(){
		return (data)=>{
			if(data.mainStatus>0){
				if(data.isStamped == 1){
					//已盖章
					return "已盖章";
				}else if(data.isStamped == 2){
					//不盖章
					return "不盖章";
				}else if(data.reviewStatus == 1){
					//已审核, 并出报告
					return "出报告";
				}else if(data.reviewStatus == 2){
					//已审核, 但不出报告
					return "不出报告";
				}else{
					//其他状态
					return "未审核";
				}
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
	
	newButtonType(){
		return (data)=>{
			if(data == "1"){
				return "success";
			}else if(data == "2"){
				return "danger";
			}else{
				return "warning";
			}
			
		}
	},
	
	
	//角标		
	newCheckBadge(){
		return (data)=>{
			//1.有待审核, 红色显示待审核  checkNum
			//2.有已通过, 绿色显示已通过  checkPassNum
			//3.有未通过或已撤回, 黄色显示他们总和  checkCount
			if(data.checkNum){
				return data.checkNum;
			}else if(data.checkCount>data.checkPassNum){
				return data.checkCount - data.checkPassNum;
			}else if(data.checkPassNum){
				return data.checkPassNum;
			}else{
				return "";
			}
		}
	},
	
	newCheckBadgeType(){
		return (data)=>{
			if(data.checkNum){
				return "danger";
			}else if(data.checkCount>data.checkPassNum){
				return "warning";
			}else if(data.checkPassNum){
				return "success";
			}else{
				return "danger";
			}
		}
	},
	
	newStampedBadge(){
		return (data)=>{
			//1.有待审核, 红色显示待审核  checkNum
			//2.有已通过, 绿色显示已通过  checkPassNum
			//3.有未通过或已撤回, 黄色显示他们总和  checkCount
			if(data.stampedNum){
				return data.stampedNum;
			}else if(data.stampedCount>data.stampedPassNum){
				return data.stampedCount - data.stampedPassNum;
			}else if(data.stampedPassNum){
				return data.stampedPassNum;
			}else{
				return "";
			}
		}
	},
	
	
	newStampedBadgeType(){
		return (data)=>{
			if(data.stampedNum){
				return "warning"; //要盖章数danger
			}else if(data.stampedCount>data.stampedPassNum){
				return "info"; //其他warning
			}else if(data.stampedPassNum){
				return "success";
			}else{
				return "danger";
			}
		}
	},
	
	newPrice(){
		return (data)=>{
			if(data === "" || data ==null){
				return ''
			}else if(data){
				return parseFloat(data).toFixed(2)
			}
			return data;
		}
	},
	
  },
  created() {
	
	//暂改成惠正
	this.companyId = 'HZ';
	this.companyTabsId = 0;
	localStorage.setItem('companyId', this.companyId);
	  
	/*  
	//211028变动 新增: 多个公司切换
	const value = localStorage.getItem('companyId');
	if(value){
		this.companyId = value;
		this.companyTabsId = this.companyRange.indexOf(this.companyId);
	}else{
		this.companyId = this.companyRange[0];
		this.companyTabsId = 0;
	}
	 */
	
	let date = new Date()
	this.timestamp = date.getTime() - date.getHours()*60*60*1000
	console.log(this.timestamp)
	
	//获取总审权限
	this.chiefRole.canCheckAll = localStorage.getItem('isSuperFinalReview')=='1'?true:false;
	const checkType = localStorage.getItem('finalReviewAuth');
	this.chiefRole.checkType = checkType?checkType:''; 
	this.chiefRole.canStamp = localStorage.getItem('isStampHandler')=='1'?true:false;
	this.chiefRole.showCheck = (this.chiefRole.canCheckAll||this.chiefRole.checkType)?true:false;
	this.chiefRole.showStamp = this.chiefRole.canStamp?true:false;
	
	
	if(this.chiefRole.canCheckAll || this.chiefRole.checkType|| this.chiefRole.canStamp ){
		this.getData()
		//console.log(this.chiefRole)
	}else{
		this.$message.warning('没有权限访问');
		this.$router.push({name:"dashboard"})
	}
	
	
	//console.log('初始化公司id', this.companyId);  
	
	//211202 处理页面跳转返回
	
	//if(!this.pageInfoLoad()){
		
	//}
		
	
  },
  methods: {
	
    getData() {
	  //重置表格展开
	  this.expands = [];
	  
	  //重置分页信息
	  this.currentPage = 1;
	  this.pageTotal = 0;
	  
	  //刷新项目处理列表
	  this.getFinalReviewListData({}, (mrRes)=>{
	  				
	  	this.getRawFinalReviewListData({}, (rawRes)=>{
	  		//console.log('正评登记列表', rawRes);
			
			var rawProjIdList = {};
			rawRes.forEach((item, index) =>{
				//item
				//1.循环获取projId列表获取该projId列表下最新的subProjId的日期 和 总的待审核数
				if(typeof(rawProjIdList[item.projId]) == "undefined"){
					//不存在时, 添加
					//console.log('添加', item.projId, item.creationTime);					
					//优先使用修改日期
					var newItem = {
						changeTime: item.changeTime || item.creationTime,
						//checkNum: item.mainStatus===1?1:0,
						checkNum: item.reviewStatus===0?1:0,   //待审数
						stampedNum: (item.isStamped===0 && item.reviewStatus===1)?1:0, //待盖章数
						
						checkPassNum: item.reviewStatus===1?1:0,  //已同意数
						stampedPassNum: item.isStamped===1?1:0,   //已盖章数
						checkCount: 1, //需审核总数
						stampedCount: 1, //需盖章总数
					}
					
					rawProjIdList[item.projId] = newItem;
				}else{
					//存在时, 更新
					//更新 更新日期
					const changeTime = item.changeTime || item.creationTime;
					if(rawProjIdList[item.projId].changeTime < changeTime){
						rawProjIdList[item.projId].changeTime = changeTime
					}					
					//更新 待审核数
					//if(item.mainStatus===1){
					//待处理数
					if(item.reviewStatus===0){
						rawProjIdList[item.projId].checkNum += 1
					}
					if(item.isStamped===0 && item.reviewStatus===1){
						rawProjIdList[item.projId].stampedNum += 1
					}
					
					//通过数
					if(item.reviewStatus===1){
						rawProjIdList[item.projId].checkPassNum += 1
					}
					if(item.isStamped===1){
						rawProjIdList[item.projId].stampedPassNum += 1
					}
					
					//总数
					rawProjIdList[item.projId].checkCount += 1
					rawProjIdList[item.projId].stampedCount += 1
				}
			});
			
			//console.log(rawProjIdList);
			//2. 循环项目列表 增加更新日期到项目列表
			mrRes.forEach((item, index) =>{
				if(typeof(rawProjIdList[item.projId]) == "undefined"){
					mrRes[index].changeTime = '';
					mrRes[index].checkNum = '';
					mrRes[index].stampedNum = '';
					
					mrRes[index].checkPassNum = '';
					mrRes[index].stampedPassNum = '';
					mrRes[index].checkCount = '';
					mrRes[index].stampedCount = '';
				}else{
					mrRes[index].changeTime = rawProjIdList[item.projId].changeTime;
					mrRes[index].checkNum = rawProjIdList[item.projId].checkNum;
					mrRes[index].stampedNum = rawProjIdList[item.projId].stampedNum;
					
					mrRes[index].checkPassNum = rawProjIdList[item.projId].checkPassNum;
					mrRes[index].stampedPassNum = rawProjIdList[item.projId].stampedPassNum;
					mrRes[index].checkCount = rawProjIdList[item.projId].checkCount;
					mrRes[index].stampedCount = rawProjIdList[item.projId].stampedCount;
				}
			});
			
			//根据权限执行类型过滤
			if(this.chiefRole.canCheckAll && this.chiefRole.showCheckAll){
				//所有权限 并 显示
			}else if(this.chiefRole.canStamp && this.chiefRole.showStamp){
				//盖章 并 可见
			}else{
				//根据checkType过滤
				mrRes = mrRes.filter(item=>this.chiefRole.checkType.indexOf(item.projType)!=-1)
			}
		
			this.tableData = mrRes;
			this.tableDataTemp = mrRes;
			this.pageTotal = mrRes.length;
			
			this.$refs.table.sort('creationTime','descending')
			
			//console.log('处理列表', this.tableData)
	  	});
	  	
	  });
		
    },
	
	
	getQuerySearchKey(query){
		var str=query.replace(/[ `~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/g,'');
		
		if(str){
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
			
			return key;
			
			//匹配方法		
			//  return item.projName.match(key);
			
		}else{
			return "";
		}
	},
	getLocalData(){
		//项目名称 和 项目范围 拆分模糊查询key
		const projNameKey = this.getQuerySearchKey(this.searchData.projName);
		const projScopeKey = this.getQuerySearchKey(this.searchData.projScope);
		
		this.tableData = this.tableDataTemp.filter(item =>{
			return  (((item.reportNum||'').indexOf(this.searchData.reportNum)!=-1 ) || this.searchData.reportNum == '') 
					&& (((item.projNum||'').indexOf(this.searchData.projNum)!=-1 ) || this.searchData.projNum == '')
					//改为模糊查询
					&& (item.projName.match(projNameKey) || this.searchData.projName == '')
					&& (item.projScope.match(projScopeKey) || this.searchData.projScope == '')
					&& (((item.projAsst||'').indexOf(this.searchData.projAsst)!=-1 ) || this.searchData.projAsst == '')
		})
		this.currentPage = 1;
		this.pageTotal = this.tableData.length;
		
		this.$refs.table.sort('creationTime','descending')
	},
	
	resetSearchData(){
		Object.keys(this.searchData).forEach(key => (this.searchData[key] = ''));
		this.getLocalData();
	},
	
	getRawFinalReviewListData(rawData, successc) {
		
		getRawFinalReviewList(rawData, this.companyId)
		.then(res => {
			if (res.statusCode == 200) {
				successc(res.data);
			}
		})
		.catch(err => {
		  console.log('正评登记列表', err)
		})
	},
	
	getFinalReviewListData(searchData, successc) {
		
		getFinalReviewList(searchData, this.companyId)
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
		Object.keys(this.searchData).forEach(key => (this.searchData[key] = ''))
		
		this.getData();
    },
	
	refresh(){
		this.getManageRegisterListData({}, (mrRes)=>{
			this.tableData = mrRes;
			this.tableDataTemp = mrRes;
			this.pageTotal = mrRes.length;
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
	
	/* 
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
	 */	
	
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
		if(prop == 'checkNum' || prop == 'stampedNum'){
			//处理数字排序
			if(order == 'ascending'){
				this.tableData = this.tableData.sort((a, b)=>{
					return a[prop]-b[prop]
				});
			}else if(order == 'descending'){
				this.tableData = this.tableData.sort((a, b)=>{
					return b[prop]-a[prop]
				});
			}
			
		}else{
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
		}
	},
	
	//展开行	
	rowClick(row,index) {
	  this.$refs.table.toggleRowExpansion(row)
	},
	
	expandChange(row,expandedRows) {	
	  this.projData = [];
	  if (expandedRows.length) {
	    this.expands = []
	    if (row) {
	      this.expands.push(row.projId)// 每次push进去的是每行的ID
		  
		  //读取数据...
		  this.getTableInfo(row.projId);
		  
		  //保存类型, 跳转审核模板
		  this.projType = row.projType;
		  
		  this.projData = row;
		  //console.log('expandChange', this.projData)
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
		this.getSubProjListWithReviewInfoData(projId, (splData)=>{
		    this.subProjdataList = splData
			//console.log('子项目正评列表', splData)			
			
		})
	},
	
	refreshTableInfo(projId){
		this.subProjdataList = [];
		this.getSubProjListWithReviewInfoData(projId, (splData)=>{
		    this.subProjdataList = splData
			//console.log('子项目正评列表', splData)
			
			//更新对应一层数据
			var rawProjIdList = {};
			splData.forEach((item, index) =>{
				//item
				//1.循环获取projId列表获取该projId列表下最新的subProjId的日期 和 总的待审核数
				if(typeof(rawProjIdList[item.projId]) == "undefined"){
					//不存在时, 添加
					//console.log('添加', item.projId, item.creationTime);					
					var newItem = {
						creationTime: item.creationTime,
						//checkNum: item.mainStatus===1?1:0,
						checkNum: item.reviewStatus===0?1:0,   //待审数
						stampedNum: (item.isStamped===0 && item.reviewStatus===1)?1:0, //待盖章数
						
						checkPassNum: item.reviewStatus===1?1:0,  //已同意数
						stampedPassNum: item.isStamped===1?1:0,   //已盖章数
						checkCount: 1, //需审核总数
						stampedCount: 1, //需盖章总数
					}
					
					rawProjIdList[item.projId] = newItem;
				}else{
					//存在时, 更新
					//更新 更新日期
					if(rawProjIdList[item.projId].creationTime < item.creationTime){
						rawProjIdList[item.projId].creationTime = item.creationTime
					}					
					//更新 待审核数
					//if(item.mainStatus===1){
					//待处理数
					if(item.reviewStatus===0){
						rawProjIdList[item.projId].checkNum += 1
					}
					if(item.isStamped===0 && item.reviewStatus===1){
						rawProjIdList[item.projId].stampedNum += 1
					}
					
					//通过数
					if(item.reviewStatus===1){
						rawProjIdList[item.projId].checkPassNum += 1
					}
					if(item.isStamped===1){
						rawProjIdList[item.projId].stampedPassNum += 1
					}
					
					//总数
					rawProjIdList[item.projId].checkCount += 1
					rawProjIdList[item.projId].stampedCount += 1
				}
			});
			
			//console.log('rawProjIdList', rawProjIdList)
			
			//2. 循环项目列表 增加更新日期到项目列表
			this.tableData.forEach((item, index) =>{
				if(item.projId == projId){
					this.tableData[index].creationTime = rawProjIdList[item.projId].creationTime;
					this.tableData[index].checkNum = rawProjIdList[item.projId].checkNum;
					this.tableData[index].stampedNum = rawProjIdList[item.projId].stampedNum;
					
					this.tableData[index].checkPassNum = rawProjIdList[item.projId].checkPassNum;
					this.tableData[index].stampedPassNum = rawProjIdList[item.projId].stampedPassNum;
					this.tableData[index].checkCount = rawProjIdList[item.projId].checkCount;
					this.tableData[index].stampedCount = rawProjIdList[item.projId].stampedCount;
				}
			});
			this.tableDataTemp.forEach((item, index) =>{
				if(item.projId == projId){
					this.tableDataTemp[index].creationTime = rawProjIdList[item.projId].creationTime;
					this.tableDataTemp[index].checkNum = rawProjIdList[item.projId].checkNum;
					this.tableDataTemp[index].stampedNum = rawProjIdList[item.projId].stampedNum;
					
					this.tableDataTemp[index].checkPassNum = rawProjIdList[item.projId].checkPassNum;
					this.tableDataTemp[index].stampedPassNum = rawProjIdList[item.projId].stampedPassNum;
					this.tableDataTemp[index].checkCount = rawProjIdList[item.projId].checkCount;
					this.tableDataTemp[index].stampedCount = rawProjIdList[item.projId].stampedCount;
				}
			});
			
		})
	},
	
	//子项目列表  旧
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
	
			
	//项目登记列表信息 旧
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
	
	//总审正评列表
	getSubProjListWithReviewInfoData(projId, successc) {
		const projData = {
			projId: projId,
		}
		getSubProjListWithReviewInfo(projData, this.companyId)
		.then(res => {
			if (res.statusCode == 200) {
				successc(res.data);
			}
		})
		.catch(err => {
			console.log('子项目列表', err)
		})
	},
			
	//总审审核信息
	auditReviewData(dataform, successc) {
		auditReview(dataform, this.companyId)
	    .then(res => {
			if (res.statusCode == 200) {
				successc(res.data);
			}
	    })
	    .catch(err => {
	      console.log('总审审核信息', err)
	    })
	},
			
	//盖章信息
	doStampData(dataform, successc) {
		doStamp(dataform, this.companyId)
	    .then(res => {
			if (res.statusCode == 200) {
				successc(res.data);
			}
	    })
	    .catch(err => {
	      console.log('盖章信息', err)
	    })
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
	
	//总审提交
	editChiefInfo(subData) {
		//this.$message("总审审核")
		//this.chiefInfoTitle = "".concat("计划编号:", subData.projId, subData.subProjNum?" 子报告号:"+subData.subProjNum:"");
		this.chiefInfoTitle = "".concat("计划编号:", this.projData.projNum||subData.projId, " 报告号:", subData.subProjNum?this.projData.reportNum +'-'+ subData.subProjNum:this.projData.reportNum);
		
		//初始化表单
		const chiefInfoForm={
			//reviewId: subData.reviewId||null, //审核id
			projId: subData.projId, //子项目id
			subProjId: subData.subProjId, //子项目id
			subProjNum: subData.subProjNum, //子项目报告号
			subProjName: subData.subProjName, //项目名称
			subProjScope: subData.subProjScope, //项目范围
			
			contractNum: this.projData.contractNum, //公司合同号
			contractPrice: this.projData.contractPrice, //合同价
			regEvalConclusionValue: subData.regEvalConclusionValue, //评估值
			cdReceivable: subData.cdReceivable, //应收款
			
			regProjLeader: subData.regProjLeader, //项目负责人
			regSignedAppraiser: subData.regSignedAppraiser, //签字估价师
			
			regTechExpDrafter: subData.regTechExpDrafter, //技术说明
			technicalRating: subData.technicalRating, //技术评分
			regReportDrafter: subData.regReportDrafter, //报告拟稿		
			draftingRating: subData.draftingRating, //拟稿评分		
			reviewComment: subData.reviewComment||null, //审核备注		
			reviewStatus: subData.reviewStatus==0?'':subData.reviewStatus, //审核情况
			reviewStatustemp: subData.reviewStatus==0?'':subData.reviewStatus,
			reviewTime: subData.reviewTime, //审核日期
			
			isStamped: subData.isStamped==0?'':subData.isStamped,
			stampedTime: subData.stampedTime, //盖章日期
		}		
		this.chiefInfoForm = chiefInfoForm;
				
		this.chiefInfoVisible = true
	},
	
	//弹出框提交
	chiefInfoEdit(){
		//流程: 总审首次审批出报告, 盖章; 总审修改审批, 
		
		this.$refs.chiefInfoForm.validate((valid) => {
			if (valid) {
				//console.log('chiefInfo', this.chiefInfoForm);
				
				if(this.chiefInfoForm.reviewStatus==1 && this.chiefInfoForm.reviewStatustemp==1){
					this.$confirm('确认重新审核?', '提示', {
					  type: 'warning'
					}).then(() => {
					  this.chiefInfoEditAction('重新审核');					  
					  
					}).catch((err) => {
						console.log(err)
					});
				}else{
					this.chiefInfoEditAction();
				}
				
			}else{
				this.$message('请填写必填信息或格式有误');
			}
		})
	},
	
	chiefInfoEditAction(handle){
		const dataform = {
			subProjId: this.chiefInfoForm.subProjId, //子项目id
			technicalRating: this.chiefInfoForm.technicalRating, //技术评分
			draftingRating: this.chiefInfoForm.draftingRating, //拟稿评分		
			reviewComment: this.chiefInfoForm.reviewComment, //审核备注		
			reviewStatus: this.chiefInfoForm.reviewStatus, //审核情况
			//isStamped: (this.chiefInfoForm.reviewStatus==1 && this.chiefInfoForm.reviewStatustemp==1)?0:(this.chiefInfoForm.isStamped||0),
		}
		
		this.auditReviewData(dataform, (reviewData)=>{
			this.$message.success('处理成功');
			
			this.chiefInfoVisible = false;
			
			this.refreshTableInfo(this.chiefInfoForm.projId);
			/* 
			if(handle == '重新审核' && this.chiefInfoForm.isStamped == 1){
				//已盖章时, 修改对应状态
				const dataform = {
					subProjId: this.chiefInfoForm.subProjId, //子项目id	
					isStamped: 0, //审核情况 撤销盖章时, 改成状态0
				}
				this.doStampData(dataform, (stampData)=>{
					//刷新表单
					this.refreshTableInfo(this.chiefInfoForm.projId);
				})
			}else{
				//刷新表单
				this.refreshTableInfo(this.chiefInfoForm.projId);
			}
			 */
			
		})
	},
	
	handleChangeReviewStatus(){
		//重置评分
		this.chiefInfoForm.technicalRating = '';
		this.chiefInfoForm.draftingRating = '';
	},
	
	
	//盖章提交	
	editStampedInfo(subData) {		
		//this.$message("盖章")
		//this.stampedInfoTitle = "".concat("计划编号:", subData.projId, subData.subProjNum?" 子报告号:"+subData.subProjNum:"");
		this.stampedInfoTitle = "".concat("计划编号:", this.projData.projNum||subData.projId, " 报告号:", subData.subProjNum?this.projData.reportNum +'-'+ subData.subProjNum:this.projData.reportNum);
		
		//初始化表单
		const stampedInfoForm={
			//reviewId: subData.reviewId||null, //审核id
			projId: subData.projId, //子项目id
			subProjId: subData.subProjId, //子项目id
			subProjNum: subData.subProjNum, //子项目报告号
			subProjName: subData.subProjName, //项目名称
			subProjScope: subData.subProjScope, //项目范围
			
			contractNum: this.projData.contractNum, //公司合同号
			contractPrice: this.projData.contractPrice, //合同价
			regEvalConclusionValue: subData.regEvalConclusionValue, //评估值
			cdReceivable: subData.cdReceivable, //应收款
			
			regProjLeader: subData.regProjLeader, //项目负责人
			regSignedAppraiser: subData.regSignedAppraiser, //签字估价师
			
			regTechExpDrafter: subData.regTechExpDrafter, //技术说明
			technicalRating: subData.technicalRating, //技术评分
			regReportDrafter: subData.regReportDrafter, //报告拟稿		
			draftingRating: subData.draftingRating, //拟稿评分		
			reviewComment: subData.reviewComment||null, //审核备注		
			reviewStatus: subData.reviewStatus==0?'':subData.reviewStatus, //审核情况
			reviewTime: subData.reviewTime, //审核日期
			
			isStamped: subData.isStamped==0?'':subData.isStamped,
			isStampedtemp: subData.isStamped==0?'':subData.isStamped,
			
			stampedTime: subData.stampedTime, //盖章日期
		}		
		this.stampedInfoForm = stampedInfoForm;
		
		this.stampedInfoVisible = true
	},
	
	
	//弹出框提交
	stampedInfoEdit(){
		this.$refs.stampedInfoForm.validate((valid) => {
			if (valid) {
				console.log('stampedInfo', this.stampedInfoForm);
				
				if(this.stampedInfoForm.isStamped==2){
					this.$confirm('确认撤销盖章?', '提示', {
					  type: 'warning'
					}).then(() => {
					  this.stampedInfoEditAction();
					  
					}).catch((err) => {
						console.log(err)
					});
				}else{
					this.stampedInfoEditAction();
				}
				
			}else{
				this.$message('请填写必填信息或格式有误');
			}
		})
	},
	
	stampedInfoEditAction(){
		const dataform = {
			subProjId: this.stampedInfoForm.subProjId, //子项目id	
			//isStamped: this.stampedInfoForm.isStamped, //审核情况
			isStamped: this.stampedInfoForm.isStamped==2?0:this.stampedInfoForm.isStamped, //审核情况 撤销盖章时, 改成状态0
		}
		this.doStampData(dataform, (stampData)=>{
			this.$message.success('处理成功');
			
			this.stampedInfoVisible = false;
			
			//刷新表单
			this.refreshTableInfo(this.stampedInfoForm.projId);
		})
	},
	
	onChangeSwitch(val){
		//console.log('onChangeSwitch', val, this.chiefRole.showCheckAll)
		this.reset();
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