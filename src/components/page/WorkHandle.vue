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
    <el-page-header @back="goBack"></el-page-header>
    <el-dialog
      title="取号"
      :visible.sync="getNumVisible"
      width="30%"
      prop="reportNumSelectVal"
    >
      <el-radio-group
        v-model="reportNumSelectVal"
        v-if="projDetail.projType != 1080"
      >
        <el-radio :label="1">初评号</el-radio>
        <el-radio :label="2">正评号</el-radio>
        <el-radio :label="3">回函（其他）号</el-radio>
      </el-radio-group>
      <el-radio-group
        v-model="reportNumSelectVal"
        v-if="projDetail.projType == 1080"
      >
        <el-radio :label="4">房地产</el-radio>
        <el-radio :label="5">资产</el-radio>
        <el-radio :label="6">土地</el-radio>
        <el-radio :label="3">回函（其他）号</el-radio>
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
		  style="margin-bottom: 10px;"
        >初评号{{this.reportNum.cph}}</el-radio>
      </div>
      <div v-if="this.reportNum.zph !== ''">
        <el-radio
          v-model="deleteNumSelectVal"
          :label="2"
		  style="margin-bottom: 10px;"
        >正评号{{this.reportNum.zph}}</el-radio>
      </div>
      <div v-if="this.reportNum.hhh !== ''">
        <el-radio
          v-model="deleteNumSelectVal"
          :label="3"
		  style="margin-bottom: 10px;"
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
      title="新增项目"
      :visible.sync="subProjVisible"
      width="800px"
	  top="20px"
	  :close-on-click-modal = "false"
    >
		<!-- <div class="dialog_body">
			<div class="dialog_content"> -->
      <!-- <h3>父项目报告号:{{subFatherReport}}</h3> -->
      <el-form
        ref="subFormRules"
        :model="subProjForm"
        label-width="auto"
        :rules="subFormRules"
      >
		<el-divider><strong>基本信息</strong></el-divider>
        <el-form-item
          label="子项目号"
          prop="subProjNum"
        >
          <el-input
            placeholder="第一个字符只能输入数字或英文; 例: 001"
            style="width: 100%"
            v-model.trim="subProjForm.subProjNum"
			clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="子项目项目名称"
          prop="subProjName"
        >
          <el-input
            v-model="subProjForm.subProjName"
			clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="子项目项目范围"
          prop="subProjScope"
        >
          <el-input
            v-model="subProjForm.subProjScope"
			clearable
          ></el-input>
        </el-form-item>		
		<el-form-item
		  label="子项目基准日"
		  prop="subBaseDate"
		>
		  <el-date-picker
		    type="date"
		    value-format="yyyy-MM-dd"
		    style="width: 200px"
		    v-model="subProjForm.subBaseDate"
		  ></el-date-picker>
		</el-form-item>
		
		<el-divider><strong>项目组成员信息</strong></el-divider>
        <el-form-item
          label="项目负责人"
          prop="subProjLeader"
        >
          <el-checkbox-group v-model="subProjForm.subProjLeader">
            <el-checkbox
              v-for="item in projMember"
              :key="item"
              :label="item"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          label="项目复核人"
          prop="subProjReviewer"
        >
          <el-checkbox-group v-model="subProjForm.subProjReviewer">
            <el-checkbox
              v-for="item in projMember"
              :key="item"
              :label="item"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          label="专业复核人"
          prop="subProjProReviewer"
        >
          <el-checkbox-group v-model="subProjForm.subProjProReviewer">
            <el-checkbox
              v-for="item in projMember"
              :key="item"
              :label="item"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          label="项目助理"
          prop="subProjAsst"
        >
          <el-checkbox-group v-model="subProjForm.subProjAsst">
            <el-checkbox
              v-for="item in projMember"
              :key="item"
              :label="item"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          label="现场勘查"
          prop="subFieldSrvy"
        >
          <el-checkbox-group v-model="subProjForm.subFieldSrvy">
            <el-checkbox
              v-for="item in projMember"
              :key="item"
              :label="item"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="text"
          @click="subProjVisible = false"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="addSubProj(subFatherReport)"
        >确认提交</el-button>
      </div>
        <!--    </div>	
		</div> -->
    </el-dialog>
	
	<el-dialog
	  title="修改项目"
	  :visible.sync="editSubProjVisible"
	  width="800px"
	  top="20px"
	  v-if="editSubProjForm"
	  :close-on-click-modal = "false"
	>
		<!-- <div class="dialog_body">
			<div class="dialog_content"> -->
	  <!-- <h3>父项目报告号:{{subFatherReport}}</h3> -->
	  <el-form
	    ref="editSubProjForm"
	    :model="editSubProjForm"
	    label-width="auto"
	    :rules="editSubProjFormRules"
	  >
		<el-divider><strong>基本信息</strong></el-divider>
	    <el-form-item
	      label="子项目号"
	      prop="subProjNum"
		  v-if="subTableData.length > 1"
	    >
	      <el-input
	        placeholder="第一个字符只能输入数字或英文; 例: 001"
	        style="width: 100%"
	        v-model.trim="editSubProjForm.subProjNum"
			clearable
	      ></el-input>
	    </el-form-item>
	    <el-form-item
	      label="子项目项目名称"
	      prop="subProjName"
	    >
	      <el-input
	        v-model="editSubProjForm.subProjName"
			clearable
	      ></el-input>
	    </el-form-item>
	    <el-form-item
	      label="子项目项目范围"
	      prop="subProjScope"
	    >
	      <el-input
	        v-model="editSubProjForm.subProjScope"
			clearable
	      ></el-input>
	    </el-form-item>		
		<el-form-item
		  label="子项目基准日"
		  prop="subBaseDate"
		>
		  <el-date-picker
		    type="date"
		    value-format="yyyy-MM-dd"
		    style="width: 200px"
		    v-model="editSubProjForm.subBaseDate"
		  ></el-date-picker>
		</el-form-item>
		
		<el-divider><strong>项目组成员信息</strong></el-divider>
	    <el-form-item
	      label="项目负责人"
	      prop="subProjLeader"
	    >
	      <el-checkbox-group v-model="editSubProjForm.subProjLeader">
	        <el-checkbox
	          v-for="item in workArrgProjMember"
	          :key="item"
	          :label="item"
	        ></el-checkbox>
	      </el-checkbox-group>
	    </el-form-item>
	    <el-form-item
	      label="项目复核人"
	      prop="subProjReviewer"
	    >
	      <el-checkbox-group v-model="editSubProjForm.subProjReviewer">
	        <el-checkbox
	          v-for="item in workArrgProjMember"
	          :key="item"
	          :label="item"
	        ></el-checkbox>
	      </el-checkbox-group>
	    </el-form-item>
	    <el-form-item
	      label="专业复核人"
	      prop="subProjProReviewer"
	    >
	      <el-checkbox-group v-model="editSubProjForm.subProjProReviewer">
	        <el-checkbox
	          v-for="item in workArrgProjMember"
	          :key="item"
	          :label="item"
	        ></el-checkbox>
	      </el-checkbox-group>
	    </el-form-item>
	    <el-form-item
	      label="项目助理"
	      prop="subProjAsst"
	    >
	      <el-checkbox-group v-model="editSubProjForm.subProjAsst">
	        <el-checkbox
	          v-for="item in workArrgProjMember"
	          :key="item"
	          :label="item"
	        ></el-checkbox>
	      </el-checkbox-group>
	    </el-form-item>
	    <el-form-item
	      label="现场勘查"
	      prop="subFieldSrvy"
	    >
	      <el-checkbox-group v-model="editSubProjForm.subFieldSrvy">
	        <el-checkbox
	          v-for="item in workArrgProjMember"
	          :key="item"
	          :label="item"
	        ></el-checkbox>
	      </el-checkbox-group>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button
	      type="text"
	      @click="editSubProjVisible = false"
	    >取 消</el-button>
	    <el-button
	      type="primary"
	      @click="editSubProjSubmit(projDetail.projId)"
	    >确认提交</el-button>
	  </div>
	    <!--    </div>	
		</div> -->
	</el-dialog>
	
	<el-dialog
	  title="新增项目前, 请先修改第一条项目的子项目号"
	  :visible.sync="subBasicInfoDialogVisible"
	  width="800px"
	  :close-on-click-modal = "false"
	>
		<div class="dialog_body">
			<div class="dialog_content">
	  <!-- <h3>父项目报告号:{{subFatherReport}}</h3> -->
	  <el-form
	    ref="subBasicInfoForm"
	    :model="subBasicInfoForm"
	    label-width="auto"
	    :rules="subBasicInfoFormRules"
	  >
	    <el-form-item
	      label="子项目号"
	      prop="subProjNum"
	    >
	      <el-input
	        placeholder="第一个字符只能输入数字或英文; 例: 001"
	        style="width: 100%"
	        v-model.trim="subBasicInfoForm.subProjNum"
			clearable
	      ></el-input>
	    </el-form-item>
	    <el-form-item
	      label="子项目项目名称"
	      prop="subProjName"
	    >
	      <el-input
	        v-model="subBasicInfoForm.subProjName"
			clearable
	      ></el-input>
	    </el-form-item>
	    <el-form-item
	      label="子项目项目范围"
	      prop="subProjScope"
	    >
	      <el-input
	        v-model="subBasicInfoForm.subProjScope"
			clearable
	      ></el-input>
	    </el-form-item>		
		<el-form-item
		  label="子项目基准日"
		  prop="subBaseDate"
		>
		  <el-date-picker
		    type="date"
		    value-format="yyyy-MM-dd"
		    style="width: 200px"
		    v-model="subBasicInfoForm.subBaseDate"
		  ></el-date-picker>
		</el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button
	      type="text"
	      @click="subBasicInfoDialogVisible = false"
	    >取 消</el-button>
	    <el-button
	      type="primary"
	      @click="subBasicInfoEdit(projDetail.projId)"
	    >确认提交</el-button>
	  </div>
	        </div>	
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
              :disabled="item.disable"
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
      width="40%"
      :visible.sync="setQRCodeVisible"
    >
      <el-form :model="qrcodeForm">
        <el-form-item label="项目报告号">{{this.reportNum.zph}}</el-form-item>
        <el-form-item label="项目名称">{{this.projDetail.projName}}</el-form-item>
        <el-form-item label="项目基准日">{{formatDate(this.projDetail.baseDate)}}</el-form-item>
        <el-form-item label="项目评估值(万元)">
          <el-input v-model="qrcodeForm.assessedValue"></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="setQRCodeVisible = false">取 消</el-button>
        <el-button
          @click="handleQRCode()"
          type="primary"
        >生成</el-button>
      </div>
    </el-dialog>
    <el-dialog
      width="30%"
      @close="closeQRCode"
      :visible.sync="qrcodeVisible"
      append-to-body
    >
      <!-- <el-input v-model="totalValue"></el-input>
      <el-button @click="newQRCode(totalValue)">确定</el-button> -->
      <div>
        <span style="color: red">Tips: 右键二维码-图片另存为即可保存</span>
      </div>
<!--      <div-->
<!--        id="qrcode"-->
<!--        ref="qrcode"-->
<!--        style="margin-left:27%"-->
<!--      ></div>-->
      <img :src="qrCodeSrc" alt="">
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
        :picker-options="postMonthPickerOps"
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
	
	<!-- 220216 项目工作信息 -->
	<el-dialog
	  title="项目工作信息"
	  :visible.sync="showWorkArrgVisible"
	  width="800px"
	  top="20px"
	  v-if="workArrgEdit"
	>
		<!-- <div class="dialog_body">
			<div class="dialog_content"> -->
		<el-row :gutter="20">
		  <el-col :span="24">
			<el-card>
			  <div>
				<div class="text">
				  <div class="item"><span>评估方法：</span>{{workAssemMethod}}</div>
				  <div class="item"><span>现场调查内容：</span>{{arrgData.fldSrvyContent}}</div>
				</div>
			  </div>
			</el-card>
		  </el-col>
		</el-row>
		<el-row
		  :gutter="20"
		  style="margin-top: 15px"
		>
		  <el-col :span="24">
			<el-card>
			  <div slot="header">综合进度安排</div>
			  <div>
				<el-row :gutter="20">
				  <el-col :span="8">
					<h4>综合进度</h4>
				  </el-col>
				  <el-col :span="6">
					<h4>时间安排</h4>
				  </el-col>
				  <el-col :span="10">
					<h4>责任人</h4>
				  </el-col>
				</el-row>
				<el-row>
				  <el-col :span="8">
					<div
					  class="workname-left"
					  v-for="item in workName"
					  :key="item"
					>
					  {{item}}
					</div>
				  </el-col>
				  <el-col :span="6">
					<div
					  class="workname-left"
					  v-for="(item, i) in workDate"
					  :key="i"
					>{{item}}</div>
				  </el-col>
				  <el-col :span="10">
					<div
					  class="workname-left"
					  v-for="(item, i) in workPeople"
					  :key="i"
					>{{item}}</div>
				  </el-col>
				</el-row>
			  </div>
			</el-card>
		  </el-col>
		</el-row>	
        <!--    </div>	
		</div> -->
    </el-dialog>
	
	<el-dialog
	  title="合同号信息"
	  :visible.sync="contractNumReviewDialogVisible"
	  width="600px"
	>
		<div class="item">
			<span v-if="contractNum == ''">未取号</span>
			<div v-else>
			  <span>公司合同号：</span>{{contractNum}}
			  
			  <el-tag
			    style="margin-left: 10px;"
			    type="primary"
			    v-clipboard:copy="contractNum"
			    v-clipboard:success="copy"
			  >复制</el-tag>
			  <br><br> 
			  <span>外部合同号：</span>{{projDetail.contractNum.externalContractNum}}
			  
			  <el-button
				  type="text"
				  size="medium"
				  @click="openContractNumDialog"
			  ><i class="el-icon-edit"></i>修改</el-button>
			 
			  <!-- 
			  <el-tag
			    type="primary"
				@click="openContractNumDialog"
			  >修改</el-tag>
			  -->
			  
			  <el-tag
			    style="margin-left: 10px;"
			    type="primary"
			    v-clipboard:copy="projDetail.contractNum.externalContractNum"
			    v-clipboard:success="copy"
				v-if="projDetail.contractNum.externalContractNum"
			  >复制</el-tag>
			  
			  <br><br> 
			</div>
		</div>
	</el-dialog>
	
	

    <!-- <el-dialog
      title="正评登记"
      :visible.sync="formalRegVisible"
      width="80%"
    >
      <el-form
        :model="regForm"
        :rules="regRules"
        ref="regForm"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
              label="项目完成时间"
              prop="projCompTime"
            >
              <el-date-picker
                v-model="regForm.projCompTime"
                value-format="yyyy-MM-dd"
                type="date"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="标准收费（元）"
              prop="standardFee"
            >
              <el-input
                v-model="regForm.standardFee"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="应收费（元）"
              prop="dutyFee"
            >
              <el-input
                v-model="regForm.dutyFee"
                oninput="value=value.replace(/[^\d.]/g,'')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="资料收集及验证"
              prop="infoVerification"
            >
              <el-checkbox-group v-model="regForm.infoVerification">
                <el-checkbox
                  v-for="item in projMember"
                  :key="item"
                  :label="item"
                  style="width: 100%"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="市场询价调查"
              prop="marketEnquiry"
            >
              <el-checkbox-group v-model="regForm.marketEnquiry">
                <el-checkbox
                  v-for="item in projMember"
                  :key="item"
                  :label="item"
                  style="width: 100%"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="技术说明"
              prop="techExp"
            >
              <el-checkbox-group v-model="regForm.techExp">
                <el-checkbox
                  v-for="item in projMember"
                  :key="item"
                  :label="item"
                  style="width: 100%"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="报告拟稿"
              prop="reportDrafter"
            >
              <el-checkbox-group v-model="regForm.reportDrafter">
                <el-checkbox
                  v-for="item in projMember"
                  :key="item"
                  :label="item"
                  style="width: 100%"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="收费跟进"
              prop="feeFollowUp"
            >
              <el-checkbox-group v-model="regForm.feeFollowUp">
                <el-checkbox
                  v-for="item in projMember"
                  :key="item"
                  :label="item"
                  style="width: 100%"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="签字评估（估价）师"
              prop="signedAppraiser"
            >
              <el-checkbox-group v-model="regForm.signedAppraiser">
                <el-checkbox
                  v-for="item in projMember"
                  :key="item"
                  :label="item"
                  style="width: 100%"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="助理（归档）"
              prop="projAsst"
            >
              <el-checkbox-group v-model="regForm.projAsst">
                <el-checkbox
                  v-for="item in projMember"
                  :key="item"
                  :label="item"
                  style="width: 100%"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="现场勘查"
              prop="fieldSrvy"
            >
              <el-checkbox-group v-model="regForm.fieldSrvy">
                <el-checkbox
                  v-for="item in projMember"
                  :key="item"
                  :label="item"
                  style="width: 100%"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button
          type="text"
          @click="formalRegVisible = false"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="submitFormalReg()"
        >确认提交</el-button>
      </div>
    </el-dialog> -->
    <FcObjDetailDialog
      v-if="this.projDetail.projType == 1010"
      :show.sync="fcDialogVisible"
      :obj="assemObjForm"
      :isEdit="assemObjIsEdit"
      :projId="projDetail.projId"
    ></FcObjDetailDialog>
    <ZcObjDetailDialog
      v-if="this.projDetail.projType == 1020"
      :show.sync="zcDialogVisible"
      :projId="projDetail.projId"
    />
	
	<!-- 
	<WorkArrgDialog	
	  :show.sync="workArrgDialogVisible"
	  :projId="projDetail.projId"
	  :subProjId="projDetail.subProjId"
	  :projType="projDetail.projType"
	  :projMember="projMember"
	  :arrgEdit="workArrgEdit"
	  :arrgData="arrgData"
	  :baseDate="projDetail.baseDate"
	  :auditPeriodStart="projDetail.auditPeriodStart"
	  :auditPeriodEnd="projDetail.auditPeriodEnd"
	  :projLeader="projDetail.projLeader"
	  :projReviewer="projDetail.projReviewer"
	  :projProReviewer="projDetail.projProReviewer"
	  :projAsst="projDetail.projAsst"
	  :fieldSrvy="projDetail.fieldSrvy"
	  @response="createWorkArrgResponse"
	></WorkArrgDialog>
	 -->
    <WorkArrgDialog	
      :show.sync="workArrgDialogVisible"
      :projId="projDetail.projId"
      :subProjId="projDetail.subProjId"
      :projType="projDetail.projType"
      :arrgEdit="workArrgEdit"
      :arrgData="arrgData"
      :auditPeriodStart="projDetail.auditPeriodStart"
      :auditPeriodEnd="projDetail.auditPeriodEnd"
      :projMember="workArrgProjMember"
      :baseDate="workArrgProjMemberInfo.baseDate"
      :projLeader="workArrgProjMemberInfo.projLeader"
      :projReviewer="workArrgProjMemberInfo.projReviewer"
      :projProReviewer="workArrgProjMemberInfo.projProReviewer"
      :projAsst="workArrgProjMemberInfo.projAsst"
      :fieldSrvy="workArrgProjMemberInfo.fieldSrvy"
	  @response="createWorkArrgResponse"
    ></WorkArrgDialog>
    <!--
                  /\    \                  /\    \                  /\    \                  /\    \         
                  /::\____\                /::\    \                /::\    \                /::\____\        
                /::::|   |               /::::\    \               \:::\    \              /::::|   |        
                /:::::|   |              /::::::\    \               \:::\    \            /:::::|   |        
              /::::::|   |             /:::/\:::\    \               \:::\    \          /::::::|   |        
              /:::/|::|   |            /:::/__\:::\    \               \:::\    \        /:::/|::|   |        
            /:::/ |::|   |           /::::\   \:::\    \              /::::\    \      /:::/ |::|   |        
            /:::/  |::|___|______    /::::::\   \:::\    \    ____    /::::::\    \    /:::/  |::|   | _____  
          /:::/   |::::::::\    \  /:::/\:::\   \:::\    \  /\   \  /:::/\:::\    \  /:::/   |::|   |/\    \ 
          /:::/    |:::::::::\____\/:::/  \:::\   \:::\____\/::\   \/:::/  \:::\____\/:: /    |::|   /::\____\
          \::/    / ~~~~~/:::/    /\::/    \:::\  /:::/    /\:::\  /:::/    \::/    /\::/    /|::|  /:::/    /
          \/____/      /:::/    /  \/____/ \:::\/:::/    /  \:::\/:::/    / \/____/  \/____/ |::| /:::/    / 
                      /:::/    /            \::::::/    /    \::::::/    /                   |::|/:::/    /  
                      /:::/    /              \::::/    /      \::::/____/                    |::::::/    /   
                    /:::/    /               /:::/    /        \:::\    \                    |:::::/    /    
                    /:::/    /               /:::/    /          \:::\    \                   |::::/    /     
                  /:::/    /               /:::/    /            \:::\    \                  /:::/    /      
                  /:::/    /               /:::/    /              \:::\____\                /:::/    /       
                  \::/    /                \::/    /                \::/    /                \::/    /        
                  \/____/                  \/____/                  \/____/                  \/____/         
                                                                                                              
    -->
	
	<el-tabs v-model="companyId" type="card" @tab-click="handleTabsClick" style="margin-top:0px; display: none;">
	  <el-tab-pane label="惠正公司" name="HZ" :disabled="tabsDisable"></el-tab-pane>
	  <el-tab-pane label="智明公司" name="ZM" :disabled="tabsDisable"></el-tab-pane>
	  <el-tab-pane label="汇正公司" name="HZKJ" :disabled="tabsDisable"></el-tab-pane>
	</el-tabs>
	
<!-- =========================惠正========================= -->
	<div 
	v-if="companyTabsId == 0">
		
    <div class="work">
      <div style="margin-top:20px">
        <h1 v-if="projDetail.projState == 0" style="color: #009ad6">进行中</h1>
        <h1 v-if="projDetail.projState == 1" style="color: #1d953f">已完成</h1>
        <h1 v-if="projDetail.projState == 2" style="color: #d71345">项目中止</h1>
      </div>
      <div>
        <el-button
          type="success"
          icon="el-icon-success"
          @click="changeState(1)"
          :disabled="projDetail.projState == 1 ? true : false"
        >标记为完成</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="changeState(0)"
          :disabled="projDetail.projState == 0 ? true : false"
        >标记为进行中</el-button>
        <el-button
          type="danger"
          icon="el-icon-error"
          @click="changeState(2)"
          :disabled="projDetail.projState == 2 ? true : false"
        >标记为中止</el-button>
      </div>
	  <!-- 
      <div class="work-title">
        <span class="work-title-name">惠正项目信息</span>
        <span class="work-title-button">
          <el-button
            icon="el-icon-info"
            size="medium"
            @click="handleDetail()"
          >查看详情</el-button>
          <el-button
              icon="el-icon-info"
              size="medium"
              @click="checkCFSDetail"
              v-if="projDetail.projType == 1010"
          >现勘记录</el-button>
          <el-button
            icon="el-icon-edit"
            size="medium"
            @click="handleEdit()"
            :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"
          >修改项目信息</el-button>
          <el-button
            v-if="this.projDetail.projType == 1010 || this.projDetail.projType == 1030 || this.projDetail.projType == 1041 || this.projDetail.projType == 1042"
            icon="el-icon-lx-qrcode"
            size="medium"
            @click="setQRCode()"
            :disabled="projDetail.projState == 2 ? true : false"
          >生成二维码</el-button> 
          <el-button
            icon="el-icon-printer"
            size="medium"
            @click="handlePrintProj(queryData.projId)"
            :disabled="projDetail.projState == 2 ? true : false"
          >打印计划信息表</el-button>
        </span>
      </div>
	  -->
	  <div class="work-title">
	    <span class="work-title-name">计划信息</span>
	    <span class="work-title-button">
	      <el-button
	          icon="el-icon-s-claim"
	          size="medium"
	          @click="checkCFSDetail"
	          v-if="projDetail.projType == 1010"
	      >现勘记录</el-button>
		  <el-button-group style="margin-left: 10px;">
			  <el-button
				icon="el-icon-info"
				size="medium"
				@click="handleDetail()"
			  >查看计划</el-button>
			  <el-button
				icon="el-icon-edit"
				size="medium"
				@click="handleEdit()"
				:disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"
				type="primary"
			  >修改计划</el-button>
		  </el-button-group>
	    </span>
	  </div>
      <el-divider></el-divider>
      <el-row :gutter="10">
        <el-col :span="10">
          <el-card>
            <div
              slot="header"
              class="card-header"
            >
              基本信息
              <span v-if="projDetail.projDegree == 1002">
                <el-tag
                  type="danger"
                  size="medium"
                >紧急项目</el-tag>
              </span>
              <span
                v-for="item in risk"
                :key="'info1'+item.value"
              >
                <span
                  v-if="projDetail.riskProfile == item.value"
                  style="margin-left: 10px;"
                >
                  <el-tag
                    :type="item.tag"
                    size="medium"
                  >{{item.label}}风险</el-tag>
                </span>

              </span>
              <span
                v-for="item in arrgType"
                :key="'info2'+item.value"
              >
                <span
                  v-if="projDetail.arrgType == item.value"
                  style="margin-left: 10px;"
                >
                  <el-tag
                    type="primary"
                    size="medium"
                  >{{item.label}}</el-tag>
                </span>
              </span>
              <span
                v-for="item in newOldType"
                :key="'info3'+item.value"
              >
                <span
                  v-if="projDetail.newOldType == item.value"
                  style="margin-left: 10px;"
                >
                  <el-tag
                    :type="item.tag"
                    size="medium"
                  >{{item.label}}</el-tag>
                </span>
              </span>
            </div>
            <div class="text">
              <div class="item"><span>计划编号：</span>{{this.projDetail.projNum}}</div>
              <div class="item"><span>项目类型：</span>{{this.transedProjType.projType}}</div>
              <div class="item"><span>评估目的：</span>{{this.projDetail.assemGoal}}</div>
              <div class="item"><span>基准日：</span>{{formatDate(this.projDetail.baseDate)}}</div>
              <div class="item"><span>项目名称：</span>{{this.projDetail.projName}}</div>
              <div class="item"><span>项目范围：</span>{{this.projDetail.projScope}}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="7">
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
        <el-col :span="7">
          <el-card>
            <div
              slot="header"
              class="card-header"
            >委托信息</div>
            <div class="text item">
              <div class="item"><span>接洽人：</span>{{projDetail.projContactType}} {{projDetail.projContact}}</div>
              <div class="item"><span>委托方：</span>{{projDetail.clientName}}</div>
              <div class="item"><span>委托方联系人：</span>{{projDetail.clientContact}} {{projDetail.clientContactInfo}}</div>
              <div class="item"><span>产权持有人：</span>{{projDetail.incumbrancer}}</div>
              <div class="item"><span>计划现勘日：</span>{{formatDate(projDetail.fldSrvySchedule)}}</div>
			  <div class="item"><span>现勘联系人：</span>{{projDetail.fldSrvyContact}} {{projDetail.fldSrvyContactInfo}}</div>
			  <div class="item"><span>引荐人：</span>{{projDetail.projReferer}} {{projDetail.projRefererInfo}}</div>
            </div>
          </el-card>
        </el-col>
        
        <!-- <el-col
          :span="12"
          style="margin-top: 10px"
        >
          <el-card v-if="this.projDetail.projType == 1010">
            <div
              slot="header"
              class="card-header"
            >
              <span>报告登记信息</span>
              <span style="float: right">
                <el-button
                  v-if="this.projDetail.projType == 1010"
                  icon="el-icon-suitcase"
                  type="success"
                  plain
                  size="medium"
                  @click="handleFormalReg()"
                >登记正评</el-button>
                <el-button
                  v-if="this.projDetail.projType == 1010 || this.projDetail.projType == 1030"
                  icon="el-icon-lx-qrcode"
                  size="medium"
                  @click="handleQRCode()"
                >生成二维码</el-button>
                <el-button
                  v-if="this.projDetail.projType == 1020"
                  icon="el-icon-suitcase"
                  type="success"
                  plain
                  size="medium"
                >登记</el-button>
              </span>
            </div>
            <h4>Tips:取二维码前请先进行登记</h4>
            <div class="text item">
              <div class="item">
                <span v-if="this.statusInfo.registerState == false">正评登记：未登记</span>
                <span v-else>正评登记：已登记</span>
              </div>
            </div>
          </el-card>
        </el-col> -->
      </el-row>
    </div>
    <!-- <div
      class="work-title"
      v-if="this.projDetail.projType == 1010"
    >
      <span class="work-title-name">评估（估价）对象详情</span>
      <span class="work-title-button">
        <el-button
          v-if="this.projDetail.projType == 1010"
          icon="el-icon-info"
          size="medium"
          @click="isFcDialogVisible()"
          type="text"
        >展开详情</el-button>
        <el-button
          v-if="this.projDetail.projType == 1020"
          icon="el-icon-info"
          size="medium"
          @click="isZcDialogVisible()"
          type="text"
        >展开详情</el-button>
      </span>
    </div> -->
	
	
	<div class="work-title">
	  <span class="work-title-name">项目信息</span>
	  <span class="work-title-button">
		<!-- 变动20220214 改版-->
		<el-button-group>
			<el-button type="primary" size="medium" plain disabled>报告</el-button>
			<el-button
			  type="primary"
			  size="medium"
			  @click="handleGetNum"
			  :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"
			>取号</el-button>
			<el-button
			  v-if="reportNum.cph != '' || reportNum.zph != '' || reportNum.hhh != ''"
			  type="danger"
			  size="medium"
			  @click="handleDelNum()"
			  :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"
			>删号</el-button>
		</el-button-group>
		
		<el-button-group style="margin-left: 10px;">
			<el-button type="primary" size="medium" plain disabled>合同</el-button>
			<el-button
			  type="primary"
			  size="medium"
			  @click="handleCreateContractNum()"
			  :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 || this.contractNum != '')"
			  v-if="contractNum==''"
			>取号</el-button>
			<el-button
			  type="primary"
			  size="medium"
			  @click="handleReviewContractNum()"
			  :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 || this.contractNum == '')"
			  v-if="contractNum"
			>查看</el-button>
			<el-button
			  type="danger"
			  size="medium"
			  @click="handleDeleteContractNum()"
			  :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 || this.contractNum == '' )"
			  v-if="contractNum"
			>删号</el-button>
		</el-button-group>
				
		<el-button-group style="margin-left: 10px;">
			<el-button type="primary" size="medium" plain disabled>批导</el-button>
			<el-button type="primary" size="medium"
			  @click="exportSubProj('正评', projDetail.projId)"
			>正评</el-button>
			<el-button type="primary" size="medium"
			  @click="exportSubProj('底单', projDetail.projId)"
			>底单</el-button>
		</el-button-group>
		
		<el-tooltip class="item" effect="dark" content="新增前, 请先录入第一条项目的子项目号" placement="top-end">
		    <el-button
			  icon="el-icon-circle-plus-outline"
			  type="primary"
			  size="medium"
			  @click="handleAddSubProj(projDetail.projId)"
			  :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"
			  style="margin-left: 20px;"
			>新增项目</el-button>
		</el-tooltip>
	  </span>
	</div>
	<el-divider></el-divider>
	<el-table
	  :data="subTableData"
	  stripe
	  border
	  max-height="500"
	>
	  <el-table-column
	    label="序号"
	    width="50"
		type="index"
		align="center"
	  ></el-table-column>
	  <el-table-column
	    label="子项目号"
	    width="80"
	    prop="subProjNum"
	  >
		  <template slot-scope="scope">
			{{scope.row.subProjNum}}
			<div
			v-if="subTableData.length == 1 && scope.row.subProjNum">
				<el-button
				  type="warning"
				  size="mini"
				  @click="removeSubProjNum(scope.row.subProjId)"
				>移除</el-button>
			</div>
		  </template>	
	  </el-table-column>
	  <el-table-column
	    label="基准日"
	    width="90"
	    prop="subBaseDate"
	  >
		<template slot-scope="scope">
			{{formatDate(scope.row.subBaseDate)}}
		</template>	
	  </el-table-column>
	  <el-table-column
	    label="项目名称"
		min-width="160px"
	    prop="subProjName"
	  ></el-table-column>
	  <el-table-column
	    label="项目范围"
		min-width="160px"
	    prop="subProjScope"
	  ></el-table-column>
	  
	  <el-table-column
	    label="报告号"
	    width="180"
	  >
		<template slot-scope="scope">
		  <div style="text-align: left;">
		      <el-popover trigger="hover" placement="left" :title="`报告号${scope.row.subProjNum?'-'+scope.row.subProjNum:''}`">
		        <p v-if="reportNum.cph != ''">
					<span>初评号: </span><br>
					<span>{{handleShowSubNum(reportNum.cph, scope.row.subProjNum)}}
					  <el-button
					    style="right: 0px;"
					    type="text"
					    size="medium"
					    v-clipboard:copy="handleShowSubNum(reportNum.cph, scope.row.subProjNum)"
					    v-clipboard:success="copy"
					  >复制</el-button>
					</span><br>
					<span style="font-size: 14px;">{{handleShowSubNum(cnReportNum.cph, scope.row.subProjNum, 1)}}
					  <el-button
					    type="text"
					    size="medium"
					    v-clipboard:copy="handleShowSubNum(cnReportNum.cph, scope.row.subProjNum, 1)"
					    v-clipboard:success="copy"
					  >复制</el-button>
					</span>
				</p><br>
				<p v-if="reportNum.zph != ''">
					<span>正评号: </span><br>
					<span>{{handleShowSubNum(reportNum.zph, scope.row.subProjNum)}}
					  <el-button
					    style="right: 0px;"
					    type="text"
					    size="medium"
					    v-clipboard:copy="handleShowSubNum(reportNum.zph, scope.row.subProjNum)"
					    v-clipboard:success="copy"
					  >复制</el-button>
					</span><br>
					<span style="font-size: 14px;">{{handleShowSubNum(cnReportNum.zph, scope.row.subProjNum, 1)}}
					  <el-button
					    type="text"
					    size="medium"
					    v-clipboard:copy="handleShowSubNum(cnReportNum.zph, scope.row.subProjNum, 1)"
					    v-clipboard:success="copy"
					  >复制</el-button>
					</span>
				</p><br>
				<p v-if="reportNum.hhh != ''">
					<span>函号: </span><br>
					<span>{{handleShowSubNum(reportNum.hhh, scope.row.subProjNum)}}
					  <el-button
					    style="right: 0px;"
					    type="text"
					    size="medium"
					    v-clipboard:copy="handleShowSubNum(reportNum.hhh, scope.row.subProjNum)"
					    v-clipboard:success="copy"
					  >复制</el-button>
					</span><br>
					<span style="font-size: 14px;">{{handleShowSubNum(cnReportNum.hhh, scope.row.subProjNum, 1)}}
					  <el-button
					    type="text"
					    size="medium"
					    v-clipboard:copy="handleShowSubNum(cnReportNum.hhh, scope.row.subProjNum, 1)"
					    v-clipboard:success="copy"
					  >复制</el-button>
					</span>
				</p>
				<div slot="reference" class="name-wrapper">
		          {{reportNum.cph?"初评: "+handleShowSubNum(reportNum.cph, scope.row.subProjNum):"初评: 未取号"}}
				  <br>
				  {{reportNum.zph?"正评: "+handleShowSubNum(reportNum.zph, scope.row.subProjNum):"正评: 未取号"}}
				  <br>
				  {{reportNum.hhh?"函号: "+handleShowSubNum(reportNum.hhh, scope.row.subProjNum):"函号: 未取号"}}
		        </div>
		      </el-popover>
		    </div>
		</template>
	  </el-table-column>
	  
	  <el-table-column
	      label="安排"
	      width="150"
		  fixed="right"
	    >
		  <template slot-scope="scope">
			<!-- <el-button-group> -->
				<el-button
				  size="mini"
				  type="primary"
				  @click="isWorkArrgDialog(scope.row)"
				  :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"
				>安排</el-button>
				
				<el-button
				  v-if="scope.row.workAssignment != null"
				  size="mini"
				  type="danger"
				  @click="resetArrg(scope.row.subProjId)"
				  :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"
				>删除</el-button>
			<!-- </el-button-group> -->
			
			<div v-if="scope.row.workAssignment != null" style="height: 10px;">
			</div>
			<!-- <el-button-group> -->
				<el-button
				  v-if="scope.row.workAssignment != null"
				  size="mini"
				  @click="showWorkArrg(scope.row.subProjId)"
				  :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"
				>查看</el-button>
				
				<el-button
				  v-if="scope.row.workAssignment != null"
				  size="mini"
				  type="success"
				  @click="handlePrintProj(scope.row.subProjNum, true)"
				  :disabled="projDetail.projState == 2 ? true : false"
				>打印</el-button>
			<!-- </el-button-group> -->
		  </template>
	  </el-table-column>
	  	  
	  <el-table-column
	    label="操作"
	    width="150"
		fixed="right"
	  >
	    <template slot-scope="scope">
	      <el-button
	        type="primary"
			size="mini"
	        @click="handleEditSubProj(scope.row)"
	      >修改</el-button>
		  <!-- 
		  <div style="height: 10px;"></div>
	      -->
		  <el-button
	        type="danger"
			size="mini"
	        @click="delSubProj(scope.row)"
			v-if="scope.row.isDefault != 1"
	      >删除</el-button>
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="登记录入"
	    width="90"
	  	fixed="right"
	  >
	    <template slot-scope="scope">
			  <el-button type="primary" size="mini"
				@click="jumpToSubHandle(scope.row)"
			  >录信息</el-button>
			  <div style="height: 1px;"></div>
			  <el-button plain size="mini" disabled :type="newButtonTypeRegister(scope.row.subProjStatus)">{{newButtonValueRegister(scope.row.subProjStatus)}}</el-button>
			<!-- 
			<el-button-group>
				<el-button type="primary" size="mini"
				  @click="jumpToSubHandle(scope.row)"
				>录正评</el-button>
				<el-button plain size="mini" disabled :type="newButtonTypeRegister(scope.row.subProjStatus)">{{newButtonValueRegister(scope.row.subProjStatus)}}</el-button>
				
			</el-button-group>
			
			<div style="height: 10px;"></div>
			
			<el-button-group>
				<el-button type="primary" size="mini"
				  @click="jumpToSubChargeDoc(scope.row)"
				>录底单</el-button>
				<el-button plain size="mini" disabled :type="newButtonTypeChargeDoc(scope.row.subProjStatus)">{{newButtonValueChargeDoc(scope.row.subProjStatus)}}</el-button>
			</el-button-group>
			 -->
		</template>
	  </el-table-column>
	  
	</el-table>
	
	<!-- 
	<div class="work-title">
	  <span class="work-title-name">合同信息</span>
	  <span class="work-title-button">
	  </span>
	</div>
	 -->
	<!-- 
	<el-row :gutter="10" style="margin-top: 20px;">
		<el-col
		  :span="24"
		>
		  <el-card>
			<div
			  slot="header"
			  class="card-header"
			>
			  <span>合同号信息</span>
			  <span style="float: right">
				<el-button-group>
					<el-button
					  icon="el-icon-suitcase"
					  type="primary"
					  size="medium"
					  @click="handleCreateContractNum()"
					  :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 || this.contractNum != '')"
					>取号</el-button>
					<el-button
					  icon="el-icon-suitcase"
					  type="danger"
					  size="medium"
					  @click="handleDeleteContractNum()"
					  :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 || this.contractNum == '' )"
					>删除</el-button>
				</el-button-group>
			  </span>
			</div>
			<div class="text item">
			  <div class="item">
				<span v-if="this.contractNum == ''">未取号</span>
				<div v-else>
				  <span>公司合同号：</span>{{this.contractNum}}<br>
				  <span>外部合同号：</span>{{this.projDetail.contractNum.externalContractNum}}
				  <el-button
					  type="text"
					  size="medium"
					  @click="openContractNumDialog"
				  ><i class="el-icon-edit"></i></el-button>
				</div>
			  </div>
			</div>
		  </el-card>
	
		</el-col>
	</el-row>
	 -->
	<el-row :gutter="10" style="margin-top: 20px;"> 
		<el-col :span="24">
			<el-card shadow="hover">
				<div
				  slot="header"
				  class="card-header"
				>
				  <span>凭证信息</span>
				  <span style="float: right">
					<el-button-group>
						<el-button
						  icon="el-icon-bank-card"
						  type="primary"
						  size="medium"
						  @click="jumpToSubReceipt(projDetail.projId, '')"
						>凭证录入</el-button>
					</el-button-group>
				  </span>
				</div>
				<!-- class="text item" -->
				<div>
					<el-table :data="receiptList" 
						ref="receipttable"
						show-summary
						row-key="receiptId"
						:tree-props="{children: 'children', hasChildren: 'hasChildren'}"
						:summary-method="getSummaries"
						@row-click="expandChange"
						border>
					  <el-table-column label="序号" width="50" type="index" align="center" ></el-table-column>
					  <!-- 
					  <el-table-column label="展开" width="50" prop="" ></el-table-column>
					  -->
					  <el-table-column label="子项目号" prop="bindingSubProjNum" ></el-table-column>
					  
					  <el-table-column label="收费凭证" width="80" prop="receiptType" ></el-table-column>
					  
					  <el-table-column label="开票抬头" prop="invoiceTitle" ></el-table-column>
					  
					  <el-table-column label="开票金额" width="120" prop="totalAmount" ></el-table-column>
					  
					  <el-table-column label="应收费用" prop="cdReceivable" ></el-table-column>
					  
					  <el-table-column label="票费差额" width="80" prop="difference" >
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
					  
					  <el-table-column label="其他信息"  width="150" prop="" >
						  <template slot-scope="scope">
							<div
							v-if="!isNaN(parseFloat(scope.row.receiptId))">
						  	收款方式: {{scope.row.paymentType}}
							<br>
						  	发票编号: {{scope.row.invoiceNum}}
							<br>
							开票日期: {{scope.row.invoiceDate}}
							<br>
							收款日期: {{scope.row.collectionDate}}
							</div>
						  </template>
					  </el-table-column>
					
					  <el-table-column label="操作" width="150">
					    <template slot-scope="scope">
							<div
							v-if="!isNaN(parseFloat(scope.row.receiptId))">
							<el-button
							  type="primary"
								size="mini"
							  @click="jumpToSubReceipt(projDetail.projId, scope.row.receiptId)"
							>修改</el-button>
							<el-button
							  type="danger"
								size="mini"
							  @click="handleDelSubReceipt(projDetail.projId, scope.row.receiptId)"
							>删除</el-button>  
							</div>
							<div
							v-else>
								<el-button
								  type="success"
									size="mini"
								  @click=""
								>点击展合</el-button>
							</div>
					    </template>
					  </el-table-column>
					</el-table>
				</div>
			</el-card>
		</el-col>
    </el-row>
	
	<!-- 项目工作信息使用弹框显示 -->
	<!-- 
    <el-divider></el-divider>
    <div class="work-title">
      <span class="work-title-name">项目工作信息</span>
      <span class="work-title-button">
        <el-button
          icon="el-icon-s-order"
          size="medium"
          type="primary"
          @click="isWorkArrgDialog()"
          :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"
        >安排</el-button>
        <el-button
          v-if="workArrgEdit == true"
          icon="el-icon-refresh-right"
          size="medium"
          @click="resetArrg()"
          :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"
        >清空安排</el-button>
      </span>
    </div>
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div v-if="workArrgEdit == false">
            <h3>未安排工作信息，请先安排</h3>
          </div>
          <div v-else>
            <div class="text">
              <div class="item"><span>评估方法：</span>{{workAssemMethod}}</div>
              <div class="item"><span>现场调查内容：</span>{{arrgData.fldSrvyContent}}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      style="margin-top: 15px"
    >
      <el-col :span="24">
        <el-card>
          <div slot="header">综合进度安排</div>
          <div v-if="this.workArrgEdit == true">
            <el-row :gutter="20">
              <el-col :span="8">
                <h4>综合进度</h4>
              </el-col>
              <el-col :span="6">
                <h4>时间安排</h4>
              </el-col>
              <el-col :span="10">
                <h4>责任人</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <div
                  class="workname-left"
                  v-for="item in workName"
                  :key="item"
                >
                  {{item}}
                </div>
              </el-col>
              <el-col :span="6">
                <div
                  class="workname-left"
                  v-for="(item, i) in workDate"
                  :key="i"
                >{{item}}</div>
              </el-col>
              <el-col :span="10">
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
	 -->
    
	
	</div>
	
	
	
<!-- =========================智明========================= -->
	<div
	v-if="companyTabsId == 1">
		
    <div class="work">
      <div style="margin-top:20px">
        <h1 v-if="projDetail.projState == 0" style="color: #009ad6">进行中</h1>
        <h1 v-if="projDetail.projState == 1" style="color: #1d953f">已完成</h1>
        <h1 v-if="projDetail.projState == 2" style="color: #d71345">项目中止</h1>
      </div>
      <div>
        <el-button
          type="success"
          icon="el-icon-success"
          @click="changeState(1)"
          :disabled="projDetail.projState == 1 ? true : false"
        >标记为完成</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="changeState(0)"
          :disabled="projDetail.projState == 0 ? true : false"
        >标记为进行中</el-button>
        <el-button
          type="danger"
          icon="el-icon-error"
          @click="changeState(2)"
          :disabled="projDetail.projState == 2 ? true : false"
        >标记为中止</el-button>
      </div>
      <div class="work-title">
        <span class="work-title-name">智明项目信息</span>
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
            :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"
          >修改项目信息</el-button>
		  <!-- 
          <el-button
              icon="el-icon-set-up"
              size="medium"
              :disabled="true"
          >更改项目类型（已停用）</el-button>
		  -->
          <el-button
            v-if="this.projDetail.projType == 1010 || this.projDetail.projType == 1030 || this.projDetail.projType == 1041 || this.projDetail.projType == 1042"
            icon="el-icon-lx-qrcode"
            size="medium"
            @click="setQRCode()"
            :disabled="projDetail.projState == 2 ? true : false"
          >生成二维码</el-button> 
          <el-button
            icon="el-icon-printer"
            size="medium"
            @click="handlePrintProj(queryData.projId)"
            :disabled="projDetail.projState == 2 ? true : false"
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
              基本信息
              <span v-if="projDetail.projDegree == 1002">
                <el-tag
                  type="danger"
                  size="medium"
                >紧急项目</el-tag>
              </span>
              <span
                v-for="item in risk"
                :key="'info1'+item.value"
              >
                <span
                  v-if="projDetail.riskProfile == item.value"
                  style="margin-left: 10px;"
                >
                  <el-tag
                    :type="item.tag"
                    size="medium"
                  >{{item.label}}风险</el-tag>
                </span>

              </span>
              <span
                v-for="item in arrgType"
                :key="'info2'+item.value"
              >
                <span
                  v-if="projDetail.arrgType == item.value"
                  style="margin-left: 10px;"
                >
                  <el-tag
                    type="primary"
                    size="medium"
                  >{{item.label}}</el-tag>
                </span>
              </span>
              <span
                v-for="item in newOldType"
                :key="'info3'+item.value"
              >
                <span
                  v-if="projDetail.newOldType == item.value"
                  style="margin-left: 10px;"
                >
                  <el-tag
                    :type="item.tag"
                    size="medium"
                  >{{item.label}}</el-tag>
                </span>
              </span>
            </div>
            <div class="text">
              <div class="item"><span>计划编号：</span>{{this.projDetail.projNum}}</div>
              <div class="item"><span>项目类型：</span>{{this.transedProjType.projType}}</div>
              <div class="item"><span>{{onProjTypeChangeVisable() == 1 ? "测绘目的：" : "咨询目的："}}</span>{{this.projDetail.assemGoal}}</div>
              <div class="item"
			  v-if="onProjTypeChangeVisable() == 1"><span>进场日期：</span>{{formatDate(this.projDetail.fldSrvySchedule)}}</div>
			  <div class="item"
			  v-if="onProjTypeChangeVisable() == 2"><span>基准日：</span>{{formatDate(this.projDetail.baseDate)}}</div>
              <div class="item"><span>项目名称：</span>{{this.projDetail.projName}}</div>
              <div class="item"
			  v-if="onProjTypeChangeVisable() == 1">
			  <span>对象范围：</span>{{this.projDetail.projScope}}</div>
              <div class="item"
			  v-if="onProjTypeChangeVisable() == 1"
			  ><span>对象位置：</span>{{this.projDetail.mappingObjLocation}}</div>
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
              <div class="item"
			  v-if="onProjTypeChangeVisable() == 1">
			  <span>专业复核人：</span>{{this.projDetail.projProReviewer}}</div>
              <div class="item"><span>项目助理：</span>{{this.projDetail.projAsst}}</div>
              <div class="item"><span>{{onProjTypeChangeVisable() == 1 ? "现场测绘：" : "现场调研："}}</span>{{this.projDetail.fieldSrvy}}</div>
            </div>
          </el-card>
        </el-col>
        <el-col
          :span="24"
          style="margin-top: 10px;"
        >
          <el-card style="height: 180px">
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
                  :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"
                >取号</el-button>
<!--                <el-button-->
<!--                  type="primary"-->
<!--                  icon="el-icon-circle-plus-outline"-->
<!--                  @click="handleGetOldNum"-->
<!--                  :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"-->
<!--                >取往月报告号</el-button>-->
                <el-button
                  type="danger"
                  icon="el-icon-circle-close"
                  @click="handleDelNum()"
                  :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"
                >取消报告号</el-button>
              </span>
            </div>
            <div>
              <div class="report-num">
                <el-row>
				  <!-- 
                  <el-col
                    :span="2"
                    class="report-title"
                  >初评号
                  </el-col>
                  <el-col
                    :span="5"
                    class="report-content"
                  >
                    <span v-if="reportNum.cph == ''">未取号</span>
                    <span v-else>
                      <span>{{reportNum.cph}}
                        <el-button
                          style="right: 0px;"
                          type="text"
                          icon="el-icon-copy-document"
                          size="medium"
                          v-clipboard:copy="reportNum.cph"
                          v-clipboard:success="copy"
                        >复制</el-button>
                      </span>
              					  <br>
                      <span style="font-size: 14px;">{{cnReportNum.cph}}
                        <el-button
                          type="text"
                          icon="el-icon-copy-document"
                          size="medium"
                          v-clipboard:copy="cnReportNum.cph"
                          v-clipboard:success="copy"
                        >复制</el-button>
                      </span>
                    </span>
                  </el-col>
				  -->
                  <el-col
                    :span="2"
                    class="report-title"
                  >正评号</el-col>
                  <el-col
                    :span="5"
                    class="report-content"
                  >
                    <span v-if="this.reportNum.zph == ''">未取号</span>
                    <span v-else>
                      <span>{{reportNum.zph}}
                        <el-button
                          style="right: 0px;"
                          type="text"
                          icon="el-icon-copy-document"
                          size="medium"
                          v-clipboard:copy="reportNum.zph"
                          v-clipboard:success="copy"
                        >复制</el-button>
                      </span>
                      <br>
                      <span style="font-size: 14px;">{{cnReportNum.zph}}
                        <el-button
                          type="text"
                          icon="el-icon-copy-document"
                          size="medium"
                          v-clipboard:copy="cnReportNum.zph"
                          v-clipboard:success="copy"
                        >复制</el-button>
                      </span>					  
                    </span>
                  </el-col>
				  <!-- 
                  <el-col
                    :span="4"
                    class="report-title"
                  >回函（其他）号</el-col>
                  <el-col
                    :span="6"
                    class="report-content"
                  >
                    <span v-if="this.reportNum.hhh == ''">未取号</span>
                    <span v-else>
                      <span>{{reportNum.hhh}}
                        <el-button
                          style="right: 0px;"
                          type="text"
                          icon="el-icon-copy-document"
                          size="medium"
                          v-clipboard:copy="reportNum.hhh"
                          v-clipboard:success="copy"
                        >复制</el-button>
                      </span>
              					  <br>
                      <span style="font-size: 14px;">{{cnReportNum.hhh}}
                        <el-button
                          type="text"
                          icon="el-icon-copy-document"
                          size="medium"
                          v-clipboard:copy="cnReportNum.hhh"
                          v-clipboard:success="copy"
                        >复制</el-button>
                      </span>
                    </span>
                  </el-col>
				  -->
                </el-row>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col
          :span="12"
          style="margin-top: 10px"
        >
          <el-card>
            <div
              slot="header"
              class="card-header"
            >
              <span>合同号信息</span>
              <span style="float: right">
                <el-button
                  icon="el-icon-suitcase"
                  type="primary"
                  size="medium"
                  @click="handleCreateContractNum()"
                  :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 || this.contractNum != '')"
                >获取</el-button>
                <el-button
                  icon="el-icon-suitcase"
                  type="danger"
                  size="medium"
                  @click="handleDeleteContractNum()"
                  :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 || this.contractNum == '' )"
                >删除</el-button>
              </span>
            </div>
            <div class="text item">
              <div class="item">
                <span v-if="this.contractNum == ''">未取号</span>
                <div v-else>
                  <span>公司合同号：</span>{{this.contractNum}}<br>
                  <span>外部合同号：</span>{{this.projDetail.contractNum.externalContractNum}}
                  <el-button
                      type="text"
                      size="medium"
                      @click="openContractNumDialog"
                  ><i class="el-icon-edit"></i></el-button>
                </div>
              </div>
            </div>
          </el-card>

        </el-col>
        <!-- <el-col
          :span="12"
          style="margin-top: 10px"
        >
          <el-card v-if="this.projDetail.projType == 1010">
            <div
              slot="header"
              class="card-header"
            >
              <span>报告登记信息</span>
              <span style="float: right">
                <el-button
                  v-if="this.projDetail.projType == 1010"
                  icon="el-icon-suitcase"
                  type="success"
                  plain
                  size="medium"
                  @click="handleFormalReg()"
                >登记正评</el-button>
                <el-button
                  v-if="this.projDetail.projType == 1010 || this.projDetail.projType == 1030"
                  icon="el-icon-lx-qrcode"
                  size="medium"
                  @click="handleQRCode()"
                >生成二维码</el-button>
                <el-button
                  v-if="this.projDetail.projType == 1020"
                  icon="el-icon-suitcase"
                  type="success"
                  plain
                  size="medium"
                >登记</el-button>
              </span>
            </div>
            <h4>Tips:取二维码前请先进行登记</h4>
            <div class="text item">
              <div class="item">
                <span v-if="this.statusInfo.registerState == false">正评登记：未登记</span>
                <span v-else>正评登记：已登记</span>
              </div>
            </div>
          </el-card>
        </el-col> -->
      </el-row>
    </div>
    <!-- <div
      class="work-title"
      v-if="this.projDetail.projType == 1010"
    >
      <span class="work-title-name">评估（估价）对象详情</span>
      <span class="work-title-button">
        <el-button
          v-if="this.projDetail.projType == 1010"
          icon="el-icon-info"
          size="medium"
          @click="isFcDialogVisible()"
          type="text"
        >展开详情</el-button>
        <el-button
          v-if="this.projDetail.projType == 1020"
          icon="el-icon-info"
          size="medium"
          @click="isZcDialogVisible()"
          type="text"
        >展开详情</el-button>
      </span>
    </div> -->

    <el-divider></el-divider>
    <div class="work-title">
      <span class="work-title-name">项目工作信息</span>
      <span class="work-title-button">
        <el-button
          icon="el-icon-s-order"
          size="medium"
          type="primary"
          @click="isWorkArrgDialog()"
          :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"
        >安排</el-button>
        <el-button
          v-if="workArrgEdit == true"
          icon="el-icon-refresh-right"
          size="medium"
          @click="resetArrg()"
          :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"
        >清空安排</el-button>
      </span>
    </div>
    <el-divider></el-divider>
    <el-row :gutter="20"
	v-if="onProjTypeChangeVisable() == 1">
      <el-col :span="12">
        <el-card>
          <div v-if="workArrgEdit == false">
            <h3>未安排工作信息，请先安排</h3>
          </div>
          <div v-else>
            <div class="text"
			v-if="onProjTypeChangeVisable() == 1">
              <div class="item"><span>测绘方法：</span>{{workAssemMethod}}</div>
              <!-- <div class="item"><span>现场调查内容：</span>{{arrgData.fldSrvyContent}}</div> -->
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      style="margin-top: 15px"
    >
      <el-col :span="24">
        <el-card>
          <div slot="header">综合进度安排</div>
          <div v-if="this.workArrgEdit == true">
            <el-row :gutter="20">
              <el-col :span="8">
                <h4>综合进度</h4>
              </el-col>
              <el-col :span="6">
                <h4>时间安排</h4>
              </el-col>
              <el-col :span="10">
                <h4>责任人</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <div
                  class="workname-left"
                  v-for="item in workName"
                  :key="item"
                >
                  {{item}}
                </div>
              </el-col>
              <el-col :span="6">
                <div
                  class="workname-left"
                  v-for="(item, i) in workDate"
                  :key="i"
                >{{item}}</div>
              </el-col>
              <el-col :span="10">
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
	
	<!-- 
    <div class="work-title">
      <span class="work-title-name">子项目信息</span>
      <span class="work-title-button">
        <el-button
          icon="el-icon-circle-plus-outline"
          size="medium"
          @click="handleAddSubProj(reportNum.cph)"
          :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"
        >新增子项目(初评)</el-button>
        <el-button
          icon="el-icon-circle-plus-outline"
          size="medium"
          @click="handleAddSubProj(reportNum.zph)"
          :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"
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
        prop="subProjNum"
      ></el-table-column>
      <el-table-column
        label="子项目名称"
        prop="subProjName"
      ></el-table-column>
      <el-table-column
        label="子项目范围"
        prop="subProjScope"
      ></el-table-column>

      <el-table-column
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="delSubProj(scope.row)"
          >删除</el-button>
          <el-button
            type="text"
            @click="handleSubProjDetail(scope.row)"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table>
	 -->
	
	</div>
	
	
<!-- =========================汇正========================= -->
	<div
	v-if="companyTabsId == 2">
		
    <div class="work">
      <div style="margin-top:20px">
        <h1 v-if="projDetail.projState == 0" style="color: #009ad6">进行中</h1>
        <h1 v-if="projDetail.projState == 1" style="color: #1d953f">已完成</h1>
        <h1 v-if="projDetail.projState == 2" style="color: #d71345">项目中止</h1>
      </div>
      <div>
        <el-button
          type="success"
          icon="el-icon-success"
          @click="changeState(1)"
          :disabled="projDetail.projState == 1 ? true : false"
        >标记为完成</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="changeState(0)"
          :disabled="projDetail.projState == 0 ? true : false"
        >标记为进行中</el-button>
        <el-button
          type="danger"
          icon="el-icon-error"
          @click="changeState(2)"
          :disabled="projDetail.projState == 2 ? true : false"
        >标记为中止</el-button>
      </div>
      <div class="work-title">
        <span class="work-title-name">汇正项目信息</span>
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
            :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"
          >修改项目信息</el-button>
		  <!-- 
          <el-button
              icon="el-icon-set-up"
              size="medium"
              :disabled="true"
          >更改项目类型（已停用）</el-button>
		  -->
          <el-button
            v-if="this.projDetail.projType == 1010 || this.projDetail.projType == 1030 || this.projDetail.projType == 1041 || this.projDetail.projType == 1042"
            icon="el-icon-lx-qrcode"
            size="medium"
            @click="setQRCode()"
            :disabled="projDetail.projState == 2 ? true : false"
          >生成二维码</el-button> 
          <el-button
            icon="el-icon-printer"
            size="medium"
            @click="handlePrintProj(queryData.projId)"
            :disabled="projDetail.projState == 2 ? true : false"
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
              基本信息
              <span v-if="projDetail.projDegree == 1002">
                <el-tag
                  type="danger"
                  size="medium"
                >紧急项目</el-tag>
              </span>
              <span
                v-for="item in risk"
                :key="'info1'+item.value"
              >
                <span
                  v-if="projDetail.riskProfile == item.value"
                  style="margin-left: 10px;"
                >
                  <el-tag
                    :type="item.tag"
                    size="medium"
                  >{{item.label}}风险</el-tag>
                </span>

              </span>
              <span
                v-for="item in arrgType"
                :key="'info2'+item.value"
              >
                <span
                  v-if="projDetail.arrgType == item.value"
                  style="margin-left: 10px;"
                >
                  <el-tag
                    type="primary"
                    size="medium"
                  >{{item.label}}</el-tag>
                </span>
              </span>			 
              <span
                v-for="item in newOldType"
                :key="'info3'+item.value"
              >
                <span
                  v-if="projDetail.newOldType == item.value"
                  style="margin-left: 10px;"
                >
                  <el-tag
                    :type="item.tag"
                    size="medium"
                  >{{item.label}}</el-tag>
                </span>
              </span>
            </div>
            <div class="text">
              <div class="item"><span>计划编号：</span>{{this.projDetail.projNum}}</div>
              <div class="item"><span>项目类型：</span>{{this.transedProjType.projType}}</div>
              <div class="item"><span>项目目的：</span>{{this.projDetail.assemGoal}}</div>
              <div class="item"
			  v-if="projDetail.baseDate"
			  ><span>基准日：</span>{{formatDate(this.projDetail.baseDate)}}</div>
              <div class="item"
			  v-if="projDetail.auditPeriodStart"
			  ><span>审计期间：</span>{{formatDate(projDetail.auditPeriodStart)}} 至 {{formatDate(projDetail.auditPeriodEnd)}}</div>
              <div class="item"><span>项目名称：</span>{{this.projDetail.projName}}</div>
              <div class="item"><span>项目范围：</span>{{this.projDetail.projScope}}</div>
              <div class="item"
			  v-if="onProjTypeChangeVisable() == 1"
			  ><span>项目位置：</span>{{this.projDetail.mappingObjLocation}}</div>
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
              <!-- <div class="item"><span>专业复核人：</span>{{this.projDetail.projProReviewer}}</div> -->
              <div class="item"><span>项目助理：</span>{{this.projDetail.projAsst}}</div>
              <div class="item"><span>现场审计：</span>{{this.projDetail.fieldSrvy}}</div>
            </div>
          </el-card>
        </el-col>
        <el-col
          :span="24"
          style="margin-top: 10px;"
        >
          <el-card style="height: 180px">
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
                  :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"
                >取号</el-button>
<!--                <el-button-->
<!--                  type="primary"-->
<!--                  icon="el-icon-circle-plus-outline"-->
<!--                  @click="handleGetOldNum"-->
<!--                  :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"-->
<!--                >取往月报告号</el-button>-->
                <el-button
                  type="danger"
                  icon="el-icon-circle-close"
                  @click="handleDelNum()"
                  :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"
                >取消报告号</el-button>
              </span>
            </div>
            <div>
              <div class="report-num">
                <el-row>
              				  <!-- 
                  <el-col
                    :span="2"
                    class="report-title"
                  >初评号
                  </el-col>
                  <el-col
                    :span="5"
                    class="report-content"
                  >
                    <span v-if="reportNum.cph == ''">未取号</span>
                    <span v-else>
                      <span>{{reportNum.cph}}
                        <el-button
                          style="right: 0px;"
                          type="text"
                          icon="el-icon-copy-document"
                          size="medium"
                          v-clipboard:copy="reportNum.cph"
                          v-clipboard:success="copy"
                        >复制</el-button>
                      </span>
              					  <br>
                      <span style="font-size: 14px;">{{cnReportNum.cph}}
                        <el-button
                          type="text"
                          icon="el-icon-copy-document"
                          size="medium"
                          v-clipboard:copy="cnReportNum.cph"
                          v-clipboard:success="copy"
                        >复制</el-button>
                      </span>
                    </span>
                  </el-col>
              				  -->
                  <el-col
                    :span="2"
                    class="report-title"
                  >正评号</el-col>
                  <el-col
                    :span="5"
                    class="report-content"
                  >
                    <span v-if="this.reportNum.zph == ''">未取号</span>
                    <span v-else>
                      <span>{{reportNum.zph}}
                        <el-button
                          style="right: 0px;"
                          type="text"
                          icon="el-icon-copy-document"
                          size="medium"
                          v-clipboard:copy="reportNum.zph"
                          v-clipboard:success="copy"
                        >复制</el-button>
                      </span>
                      <br>
                      <span style="font-size: 14px;">{{cnReportNum.zph}}
                        <el-button
                          type="text"
                          icon="el-icon-copy-document"
                          size="medium"
                          v-clipboard:copy="cnReportNum.zph"
                          v-clipboard:success="copy"
                        >复制</el-button>
                      </span>					  
                    </span>
                  </el-col>
              				  <!-- 
                  <el-col
                    :span="4"
                    class="report-title"
                  >回函（其他）号</el-col>
                  <el-col
                    :span="6"
                    class="report-content"
                  >
                    <span v-if="this.reportNum.hhh == ''">未取号</span>
                    <span v-else>
                      <span>{{reportNum.hhh}}
                        <el-button
                          style="right: 0px;"
                          type="text"
                          icon="el-icon-copy-document"
                          size="medium"
                          v-clipboard:copy="reportNum.hhh"
                          v-clipboard:success="copy"
                        >复制</el-button>
                      </span>
              					  <br>
                      <span style="font-size: 14px;">{{cnReportNum.hhh}}
                        <el-button
                          type="text"
                          icon="el-icon-copy-document"
                          size="medium"
                          v-clipboard:copy="cnReportNum.hhh"
                          v-clipboard:success="copy"
                        >复制</el-button>
                      </span>
                    </span>
                  </el-col>
              		 -->
                </el-row>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col
          :span="12"
          style="margin-top: 10px"
        >
          <el-card>
            <div
              slot="header"
              class="card-header"
            >
              <span>合同号信息</span>
              <span style="float: right">
                <el-button
                  icon="el-icon-suitcase"
                  type="primary"
                  size="medium"
                  @click="handleCreateContractNum()"
                  :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 || this.contractNum != '')"
                >获取</el-button>
                <el-button
                  icon="el-icon-suitcase"
                  type="danger"
                  size="medium"
                  @click="handleDeleteContractNum()"
                  :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 || this.contractNum == '' )"
                >删除</el-button>
              </span>
            </div>
            <div class="text item">
              <div class="item">
                <span v-if="this.contractNum == ''">未取号</span>
                <div v-else>
                  <span>公司合同号：</span>{{this.contractNum}}<br>
                  <span>外部合同号：</span>{{this.projDetail.contractNum.externalContractNum}}
                  <el-button
                      type="text"
                      size="medium"
                      @click="openContractNumDialog"
                  ><i class="el-icon-edit"></i></el-button>
                </div>
              </div>
            </div>
          </el-card>

        </el-col>
      </el-row>
    </div>

    <el-divider></el-divider>
    <div class="work-title">
      <span class="work-title-name">项目工作信息</span>
      <span class="work-title-button">
        <el-button
          icon="el-icon-s-order"
          size="medium"
          type="primary"
          @click="isWorkArrgDialog()"
          :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"
        >安排</el-button>
        <el-button
          v-if="workArrgEdit == true"
          icon="el-icon-refresh-right"
          size="medium"
          @click="resetArrg()"
          :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"
        >清空安排</el-button>
      </span>
    </div>
    <el-divider></el-divider>
	<!-- 
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div v-if="workArrgEdit == false">
            <h3>未安排工作信息，请先安排</h3>
          </div>
          <div v-else>
            <div class="text">
              <div class="item"><span>评估方法：</span>{{workAssemMethod}}</div>
              <div class="item"><span>现场调查内容：</span>{{arrgData.fldSrvyContent}}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
	 -->
    <el-row
      :gutter="20"
      style="margin-top: 15px"
    >
      <el-col :span="24">
        <el-card>
          <div slot="header">综合进度安排</div>
          <div v-if="this.workArrgEdit == true">
            <el-row :gutter="20">
              <el-col :span="8">
                <h4>综合进度</h4>
              </el-col>
              <el-col :span="6">
                <h4>时间安排</h4>
              </el-col>
              <el-col :span="10">
                <h4>责任人</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <div
                  class="workname-left"
                  v-for="item in workName"
                  :key="item"
                >
                  {{item}}
                </div>
              </el-col>
              <el-col :span="6">
                <div
                  class="workname-left"
                  v-for="(item, i) in workDate"
                  :key="i"
                >{{item}}</div>
              </el-col>
              <el-col :span="10">
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
	
	<!-- 
    <div class="work-title">
      <span class="work-title-name">子项目信息</span>
      <span class="work-title-button">
        <el-button
          icon="el-icon-circle-plus-outline"
          size="medium"
          @click="handleAddSubProj(reportNum.cph)"
          :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"
        >新增子项目(初评)</el-button>
        <el-button
          icon="el-icon-circle-plus-outline"
          size="medium"
          @click="handleAddSubProj(reportNum.zph)"
          :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 )"
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
        prop="subProjNum"
      ></el-table-column>
      <el-table-column
        label="子项目名称"
        prop="subProjName"
      ></el-table-column>
      <el-table-column
        label="子项目范围"
        prop="subProjScope"
      ></el-table-column>

      <el-table-column
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="delSubProj(scope.row)"
          >删除</el-button>
          <el-button
            type="text"
            @click="handleSubProjDetail(scope.row)"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table>
	 -->
	
	</div>	
	
    <div class="work-title">
      <span class="work-title-name">操作记录</span>
    </div>
    <el-divider></el-divider>
    <el-card style="width: 100%">
      <OpRecord
          :projId="projDetail.projId"
      ></OpRecord>
    </el-card>
	
	
    <el-dialog
          title="修改外部合同号"
          :visible.sync="contractNumDialogVisible"
          width="30%"
		  :close-on-click-modal = 'false'
          >
          <el-input
              type="text"
              placeholder="请输入外部合同号（定点采购、中介超市等）"
              v-model.trim="preExternalContractNum"
          ></el-input>
          <span slot="footer" class="dialog-footer">
    <el-button @click="contractNumDialogVisible = false">取消</el-button>
    <el-button type="primary" @click="setExternalContractNum">保存</el-button>
            </span>
    </el-dialog>
    <el-dialog
          title="添加外部合同号"
          :visible.sync="preContractNumDialogVisible"
          width="30%"
      >
          <el-input
              type="text"
              placeholder="请输入外部合同号（定点采购、中介超市等）"
              v-model.trim="preExternalContractNum"
          ></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="createContractNumWithExternal" :disabled="this.preExternalContractNum === ''">确定</el-button>
          </span>
    </el-dialog>
	<!-- //211209变动 reportNumList新格式转换 -->
    <createReportNumDialog
    :show.sync="createReportNumDialogVisible" :projType="projDetail.projType" :projId="projDetail.projId" @response="createReportNumResponse"
    :reportNumList="reportNum" v-if="createReportNumDialogVisible"
    ></createReportNumDialog>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import Clipboard from 'clipboard'
import QRCode from 'qrcodejs2'
import { host } from '@/config'
//api
import { createReportQrCode,editProject, getDetailProjInfo,
  getWorkAssignment, delWorkAssignment, setWorkAssignment, createReportNum,
  deleteReportNum, alterProjType, getProjInfoTable, getOldReportNum,
  createContractNum, deleteContractNum, setProjState ,updateExternalContractNum} from '@/api/index'
import { addSubProject, getSubProjectInfoList, editSubProject, delSubProject , removeSubProjNum, getReceiptList, delSubProjectReceipt, getRegisterList } from '@/api/subReport'
import { getEvalObjDetail } from '@/api/assemobjdetail'
import { checkFaRegister, submitFaRegister, editFaRegister } from '@/api/formalreg'
//json
import projTypeOption from '../../../public/projTypeOption.json'
//components
import FcObjDetailDialog from './AssemObjDetailDialog/FcObjDetailDialog'
import ZcObjDetailDialog from './AssemObjDetailDialog/ZcObjDetailDialog'
import createReportNumDialog from '../business/reportNum/createReportNumDialog';
import WorkArrgDialog from './WorkArrg/WorkArrgDialog'
import OpRecord from './OpRecord'
import { getToken } from '../../api/cfs';
var ProManageAPIServer = `${host.baseUrl}/${host.ProManageAPIServer}`

import {downloadExcel} from '../../utils/download';

export default {
  name: 'workhandle',
  inject: ['reload'],            //注入App里的reload方法
  components: {
    WorkArrgDialog,
    FcObjDetailDialog,
    ZcObjDetailDialog,
    OpRecord,
    createReportNumDialog
  },
  data() {
    return {
      createReportNumDialogVisible: false,
      queryData: {},
	  
	  //220222 子项目安排
      //arrgData: {},
      arrgData: null,
	  workArrgProjMember:[],
	  workArrgProjMemberInfo:{},
	  
      projDetail: {},
      projMember: [],
	  reportNum: {
	  	cph:'',
	  	zph:'',
	  	hhh:'',
	  },	  
      cnReportNum: {
        cph: '',
        zph: '',
        hhh: ''
      },
      //qrcode
      setQRCodeVisible: false,
      qrcodeForm: {
        assessedValue: '',
        projId: ''
      },
      qrCodeSrc: '',
      //
      projTypeOption: [],
      transedProjType: {},
      tableData: [],
      takenDate: '',
      //
      fcDialogVisible: false,
      zcDialogVisible: false,
      //
      workArrgDialogVisible: false,
      //
      reportNumShowType: false,
      addAssemCheck: false,
      workArrgEdit: false,
      assemValueEdit: false,
      isReg: false,
      formalRegVisible: false,
      workName: [],
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
      contractNum: '',
      externalContractNum: '',
      preExternalContractNum: '',
      contractNumType: '',
      changeType: {
        projId: '',
        toType: ''
      },
      typeOptions: [
        { value: '1010', label: '房地产', disable: false },
        { value: '1020', label: '资产', disable: false },
        { value: '1030', label: '土地', disable: false },
        { value: '1041', label: '房地产咨询', disable: false },
        { value: '1042', label: '资产咨询', disable: false },
        { value: '1043', label: '土地咨询', disable: false },
        { value: '1061', label: '房地产复审', disable: false },
        { value: '1062', label: '资产复审', disable: false },
        { value: '1063', label: '土地复审', disable: false }
      ],
      //子项目表单
      subProjForm: {
        //reportNum: '',
        projId: '',
        subProjNum: '',
        subProjName: '',
        subBaseDate: '',
        subProjScope: '',
        subProjLeader: [],
        subProjReviewer: [],
        subProjProReviewer: [],
        subProjAsst: [],
        subFieldSrvy: []

      },
      subFormRules: {
        subProjNum: [
          { required: true, message: '请输入子项目报告号', trigger: 'blur' },
		  {
			validator: (rule, value, callback) => {
				if (/^[A-Za-z0-9].*/g.test(value) == false) {
				  callback(new Error("子项目号第一个字符必须是数字或英文"));
				} else {
				  callback();
				}
			}, trigger: 'blur'
		  }
        ],
        subProjName: [{ required: true, message: '请输入子项目名称', trigger: 'blur' }],
        //subProjScope: [{ required: true, message: '请输入子项目范围', trigger: 'blur' }],
        subBaseDate: [{ required: true, message: '请输入子项目基准日', trigger: 'blur' }],
        subProjLeader: [{ required: true, message: '请选择子项目负责人', trigger: 'change' }],
        subProjReviewer: [{ required: true, message: '请选择子项目复核人', trigger: 'change' }],
        //subProjProReviewer: [{ required: true, message: '请选择子项目专业复核人', trigger: 'change' }],
        subProjAsst: [{ required: true, message: '请选择子项目项目助理', trigger: 'change' }]
        //subProj: [{ required: true, message: '请输入子项目范围', trigger: 'change' }],
      },
      midMember: [],
      risk: [
        {
          value: '1001',
          label: '低',
          tag: 'success'
        },
        {
          value: '1002',
          label: '中等',
          tag: 'primary'
        },
        {
          value: '1003',
          label: '较高',
          tag: 'warning'
        },
        {
          value: '1004',
          label: '高',
          tag: 'danger'
        }
      ],
      arrgType: [
        { value: '1001', label: '轮序项目' }, { value: '1002', label: '安排项目' }
      ],
      newOldType: [
        { value: '1001', label: '新项目', tag: 'success' }, { value: '1002', label: '重评项目', tag: 'warning' }
      ],
      arrgFormRules: {
        assemMethod: [
          { required: true, message: '请选择评估方法', trigger: 'blur' }
        ]
      },
      reportNumList: {},
      form: {
        projId: '',
        registerType: '',
        registerId: '',
        //基本信息
        paReportNum: '',
        faReportNum: '',
        subProjNum: '',
        evalGoal: '',
        valueType: '',
        evalObjCount: '',
        evalObjCity: '',
        evalObjAdminRegion: '',
        evalObjCommunity: '',

        assemGoal: '',
        assemGoalExp: '',
        evalObjAcreage: 0,
        landAssemUnitPrice: 0,
        evalObjArea: 0,
        buildingAssemUnitPrice: 0,
        landTotalValue: 0,
        buildingTotalValue: 0,
        evalObjTotalAssemValue: 0,
        projTotalValue: 0,
        //房屋信息
        unitUsage: '',
        unitType: '',
        unitProperty: '',
        houseTypeStructure: '',
        houseType: '',
        towards: '',
        buildingNum: '',
        decoDegree: '',
        remainTerm: ''
        // //人员信息
        // infoVerification: [],
        // marketEnquiry: [],
        // techExpDrafter: [],
        // reportDrafter: [],
        // feeFollowUp: []
      },
      regForm: {
        projId: '',
        subProjNum: '',

        projCompTime: '',
        standardFee: '',
        dutyFee: '',
        //人员信息
        infoVerification: [],
        marketEnquiry: [],
        techExp: [],
        reportDrafter: [],
        feeFollowUp: [],
        signedAppraiser: [],
        projAsst: [],
        fieldSrvy: []
      },
      regRules: {
        projCompTime: [{ required: true, message: '不能为空!', trigger: 'blur' }],
        dutyFee: [{ required: true, message: '不能为空!', trigger: 'blur' }],
        infoVerification: [{ required: true, message: '不能为空!', trigger: 'change' }],
        marketEnquiry: [{ required: true, message: '不能为空!', trigger: 'change' }],
        techExp: [{ required: true, message: '不能为空!', trigger: 'change' }],
        reportDrafter: [{ required: true, message: '不能为空!', trigger: 'change' }],
        feeFollowUp: [{ required: true, message: '不能为空!', trigger: 'change' }],
        signedAppraiser: [{ required: true, message: '不能为空!', trigger: 'change' }],
        projAsst: [{ required: true, message: '不能为空!', trigger: 'change' }],
        fieldSrvy: [{ required: true, message: '不能为空!', trigger: 'change' }]
      },
      assemObjForm: {},
      assemObjIsEdit: false,
      statusInfo: {
        registerState: false,
        evalObjState: false
      },
      regInfo: {},
      postMonthPickerOps: {
        disabledDate(time) {
          var date = new Date();
          if (time.getMonth() === date.getMonth() && time.getFullYear() === date.getFullYear()) {
            return true;
          }
          return time.getMonth() >= date.getMonth() && time.getFullYear() >= date.getFullYear();
        }
      },
      contractNumDialogVisible: false,
      preContractNumDialogVisible: false,
	  	  
	  //211101变动 新增: 多个公司切换
	  companyRange:['HZ', 'ZM','HZKJ'],
	  companyId:'',
	  companyTabsId: 0,
	  
	  tabsDisable:true,	  
	  
	  //220216变动 新增: 工作安排弹出框
	  showWorkArrgVisible:false,
	  
	  //修改第一条项目基本信息
	  subBasicInfoDialogVisible:false,
	  subBasicInfoForm:{},
	  subBasicInfoFormRules:{
		subProjNum: [
		  { required: true, message: '请输入子项目报告号', trigger: 'blur' },
		  {
			validator: (rule, value, callback) => {
				if (/^[A-Za-z0-9].*/g.test(value) == false) {
				  callback(new Error("子项目号第一个字符必须是数字或英文"));
				} else {
				  callback();
				}
			}, trigger: 'blur'
		  }
		],
		subProjName: [{ required: true, message: '请输入子项目名称', trigger: 'blur' }],
		//subProjScope: [{ required: true, message: '请输入子项目范围', trigger: 'blur' }],
		subBaseDate: [{ required: true, message: '请输入子项目基准日', trigger: 'blur' }],
		
	  },
	  
	  //修改子项目信息
	  editSubProjVisible:false,
	  editSubProjForm:{},
	  editSubProjFormRules:{
	  		subProjNum: [
	  		  { required: true, message: '请输入子项目报告号', trigger: 'blur' },
	  		  {
	  			validator: (rule, value, callback) => {
	  				if (/^[A-Za-z0-9].*/g.test(value) == false) {
	  				  callback(new Error("子项目号第一个字符必须是数字或英文"));
	  				} else {
	  				  callback();
	  				}
	  			}, trigger: 'blur'
	  		  }
	  		],
	  		subProjName: [{ required: true, message: '请输入子项目名称', trigger: 'blur' }],
	  		//subProjScope: [{ required: true, message: '请输入子项目范围', trigger: 'blur' }],
	  		subBaseDate: [{ required: true, message: '请输入子项目基准日', trigger: 'blur' }],
			subProjLeader: [{ required: true, message: '请选择子项目负责人', trigger: 'change' }],
			subProjReviewer: [{ required: true, message: '请选择子项目复核人', trigger: 'change' }],
			//subProjProReviewer: [{ required: true, message: '请选择子项目专业复核人', trigger: 'change' }],
			subProjAsst: [{ required: true, message: '请选择子项目项目助理', trigger: 'change' }]
	  		  
	  },
	  
	  //发票信息
	  receiptList:[],
	  registerList:[],
	  
	  //合同号查看弹出框
	  contractNumReviewDialogVisible:false,
	  
    };
  },
  
  computed:{
	newButtonTypeRegister(){
		return (data)=>{
			if(data){				
				if(data.mainStatus == "1"){
					return "primary";
				}else if(data.mainStatus == "2"){
					return "warning";
				}else if(data.mainStatus == "3"){
					return "success";
				}else if(data.mainStatus == "4"){
					return "danger";
				}else{
					return "info";
				}
			}else{
				return "info";
			}
		}
	},
	newButtonValueRegister(){
		return (data)=>{
			if(data){
				if(data.mainStatus == "1"){
					return "待审核";
				}else if(data.mainStatus == "2"){
					return "未通过";
				}else if(data.mainStatus == "3"){
					return "已通过";
				}else if(data.mainStatus == "3"){
					return "已撤回";
				}else{
					return "未提交";
				}
			}else{
				return "未提交";
			}
		}
	},
	
	newButtonTypeChargeDoc(){
		return (data)=>{
			if(data){				
				if(data.chargeDocStatus == "1"){
					return "primary";
				}else{
					return "info";
				}
			}else{
				return "info";
			}
		}
	},
	newButtonValueChargeDoc(){
		return (data)=>{
			if(data){
				if(data.chargeDocStatus == "1"){
					return "已提交";
				}else{
					return "未提交";
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
	
	//211202 处理页面跳转返回
	this.pageInfoEdit();
	
	
	if(this.$route.query.data){
		
		//211210变动 处理query解密
		this.queryData.projId = this.newContent(this.$route.query.data);
		
		this.projTypeOption = projTypeOption
		
		//调项目详情接口
		this.getDetail()
	
		
		//子项目信息接口
		//this.check()
	}else{
		this.$message.error('出错: 参数为空!');
		this.$router.back();
	}  
	
	
    //处理从工作台获取的val -> queryData
    //this.queryData = JSON.parse(this.$route.query.data)
	//console.log('queryData', this.projDetail);
    //this.workArrgForm.projId = this.projDetail.projId
    
	
	//console.log(this.$route.query.projId);
	
	
  },
  mounted() {
	window.scrollTo(0,0);
  },
  // ███╗   ███╗███████╗████████╗██╗  ██╗ ██████╗ ██████╗ ███████╗
  // ████╗ ████║██╔════╝╚══██╔══╝██║  ██║██╔═══██╗██╔══██╗██╔════╝
  // ██╔████╔██║█████╗     ██║   ███████║██║   ██║██║  ██║███████╗
  // ██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║   ██║██║  ██║╚════██║
  // ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║╚██████╔╝██████╔╝███████║
  // ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝                                                           
  methods: {
    getDetail() {
	  //211101变动 新增: 多个公司切换
	  const projData = {
		projId: this.queryData.projId
	  } 
	  
	  //211209变动 报告号列表新返回格式
      getDetailProjInfo(projData, this.companyId)
        .then(res => {
          if (res.statusCode == 200) {
            this.projDetail = res.data
			
			//211209变动 reportNumList新格式转换
			this.reportNumList = res.data.reportNumList?res.data.reportNumList:'';
			
			Object.keys(this.reportNum).forEach(key => (this.reportNum[key] = ''))
			Object.keys(this.cnReportNum).forEach(key => (this.cnReportNum[key] = ''))
			
			const compList = ['惠正', '智明', '汇正'];
			this.reportNumList.forEach((item, index) =>{
				if(item.reportNum){
					//转中文
					const num = item.reportNum;
					const numType = item.reportNumChnAbbr;
					const type = item.reportNumLevel;					
					const comp = compList[this.companyTabsId];
					const year = '[' + num.substr(0, 4) + ']'
					var lastNum = '第' + num.substr(4) + '号'
					//处理汇正, 字符串后3位
					if(this.companyTabsId == 2){
						lastNum = '第' + num.substring(num.length-3) + '号'
					}
					const final = comp + numType + year + lastNum
					
					if (type == 1) {
					  this.reportNum.cph = item.reportNum;
					  this.cnReportNum.cph = final;
					} else if (type == 2) {
					  this.reportNum.zph = item.reportNum;
					  this.cnReportNum.zph = final;
					} else if (type == 3) {
					  this.reportNum.hhh = item.reportNum;
					  this.cnReportNum.hhh = final;
					}
				}
			})
			//console.log('reportNum', this.reportNum);
			//console.log('cnReportNum', this.cnReportNum);
			
			
            if (res.data.contractNum != null) {
              this.contractNum = res.data.contractNum.contractNum
              this.externalContractNum = res.data.contractNum.externalContractNum
            }
			
            //提取项目组成员
            const leader = this.projDetail.projLeader.split(',')
            const reviewer = this.projDetail.projReviewer.split(',')
            const projReviewer = this.projDetail.projProReviewer.split(',')
            const asst = this.projDetail.projAsst.split(',')
            const srvy = this.projDetail.fieldSrvy.split(',')
            this.midMember.push(...leader, ...reviewer, ...projReviewer, ...asst, ...srvy)
            const mid2 = Array.from(new Set(this.midMember))
            this.projMember = mid2.filter(item => item)
			
			//211209变动
			//处理项目类型value转为label展示
			for (var i = 0; i < this.projTypeOption[this.companyTabsId].length; i++) {
			  if (this.projDetail.projType == this.projTypeOption[this.companyTabsId][i].value) {
			    this.transedProjType.projType = this.projTypeOption[this.companyTabsId][i].label
			  }
			}
			
			//调工作安排接口
			//220221 非惠正页面加载时, 获取安排, 惠正的安排在子项目列表信息里面
			if(this.companyTabsId != 0){
				this.workArrgProjMember = this.projMember
				this.getWorkAssignmentData()
			}			
			
          }
          this.$nextTick(() => {
            //禁用同类型的“更改项目类型”
            for (let i of this.typeOptions) {
              if (this.projDetail.projType == i.value) {
                i.disable = true
              }
            }			
						
			//220221 变动 惠正 获取子项目信息, 包括各种状态
			if(this.companyTabsId == 0){
				
				//子项目信息
				const projData = {
					projId: this.projDetail.projId
				}
				getSubProjectInfoList(projData, this.companyId)
				.then(res => {
				  this.subTableData = res.data
				  // this.subTableData = res.data.cph
				  // this.subTableData = this.subTableData.concat(res.data.zph)
				})
				.catch(err => {
				})
				
				//发票信息
				this.reflashReceiptList(this.projDetail.projId);
			}
          })
        })
        .catch(err => {
          this.$message.error('获取项目详细信息失败')
		  console.log(err)
        })
    },
    check() {
	  //211101变动 新增: 多个公司切换
	  const checkData = {
	  	projId: this.projDetail.projId, 
		subProjNum: '-'
	  } 
      checkFaRegister(checkData, this.companyId)
        .then(res => {
          console.log(res)
          if (res.data.registerState == true && res.data.evalObjState == true) {
            this.statusInfo.registerState = res.data.registerState
            this.statusInfo.evalObjState = res.data.evalObjState
            this.regForm = res.data.registerInfo
            this.regForm.infoVerification = this.regForm.infoVerification.split(',')
            this.regForm.marketEnquiry = this.regForm.marketEnquiry.split(',')
            this.regForm.techExp = this.regForm.techExp.split(',')
            this.regForm.reportDrafter = this.regForm.reportDrafter.split(',')
            this.regForm.feeFollowUp = this.regForm.feeFollowUp.split(',')
            this.regForm.signedAppraiser = this.regForm.signedAppraiser.split(',')
            this.regForm.projAsst = this.regForm.projAsst.split(',')
            this.regForm.fieldSrvy = this.regForm.fieldSrvy.split(',')
          } else {
            this.statusInfo.registerState = res.data.registerState
            this.statusInfo.evalObjState = res.data.evalObjState
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
	
	/* 
	//报告号中文切换
	changeNumShowType(){		
		if(this.reportNumList){
			this.reportNumShowType = !this.reportNumShowType;
		}
	},
	 */
    copy(e) {
      this.$message.success('内容已复制到剪贴板')
    },
	
	//220221 查看子项目安排
	showWorkArrg(subProjId){
		if(subProjId){
			this.projDetail.subProjId = subProjId;
			this.getWorkAssignmentData("show");
		}else{
			this.showWorkArrgVisible = true
		}
	},
	
	createWorkArrgResponse() {
	  console.log('createWorkArrgResponse');
		
	  //211207变动 刷新整页改成局部刷新
	  //220221 非惠正,创建后读取安排
	  if(this.projDetail.subProjId){
		this.getDetail()
	  }else{
	  	this.getWorkAssignmentData()
	  }
	  
	  //211207变动 修改projid刷新操作记录
	  this.opRefresh();
	},
    getWorkAssignmentData(handle) {
	  //211101变动 新增: 多个公司切换
	  const AssignmentData = {
	  	projId: this.projDetail.projId,
		//子项目
		subProjId: this.projDetail.subProjId,
	  } 
      getWorkAssignment(AssignmentData, this.companyId)
        .then(res => {
          if (res.statusCode == 200) {
            if (res.data == null) {
              this.workArrgEdit = false
              this.arrgData = null
              console.log('workArrgEdit', this.workArrgEdit)
              // console.log('arrgData', this.arrgData)
            } else {
              this.workArrgEdit = true
              this.workAssemMethod = res.data.assemMethod
			  
			  //211101变动 新增: 多个公司切换
			  var workName = [];
			  workName['惠正'] = ['前期准备', '现场勘查及收集资料', '市场调查询价记录', '评定估算', '编制出具评估（估价）报告', '内部三级审核', '与委托人沟通', '评估收费', '修正定稿及提交报告', '工作底稿归档'];
			  workName['智明测绘'] = ['收集及整理资料','制定测绘技术路线','外业','内业制图','编制测绘报告','内部审核','与委托方沟通','测绘收费','修正定稿及提交报告','工作底稿归档'];
			  workName['智明咨询'] = ['前期准备、明确需求','制定工作方案','资料收集','现场调研','市场调查与询价','撰写报告','三级审核','与委托方沟通','报告收费','出具正式报告','整理归档'];
			  workName['汇正'] = ['收集及整理资料','制定审计方案','开展审计工作','编制审计报告','内部审核','与委托方沟通','审计收费','修正定稿及提交报告','工作底稿归档'];
			  
			  //console.log('转类型前arrgData', res.data)
			  //复位
			  this.workName = [];
			  this.workPeople = [];
			  this.workDate = [];
			  
			  if(this.companyTabsId == 0){
				//惠正
				this.workName = workName['惠正'];
				this.workPeople.push(res.data.prePreparationPic, res.data.fldSrvyPic, res.data.mktSrvyPic, res.data.assemEstPic, res.data.issueValPic, res.data.internalAuditPic, res.data.commuClientPic, res.data.assemChargePic, res.data.amendFinalPic, res.data.manuArchivePic)
				//this.workDate.push(res.data.prePreparationSche, res.data.fldSrvySche, res.data.mktSrvySche, res.data.assemEstSche, res.data.issueValSche, res.data.internalAuditSche, res.data.commuClientSche, res.data.assemChargeSche, res.data.amendFinalSche, res.data.manuArchiveSche)
				
				this.workDate.push(this.changeSche(res.data.prePreparationSche), this.changeSche(res.data.fldSrvySche), this.changeSche(res.data.mktSrvySche), this.changeSche(res.data.assemEstSche), this.changeSche(res.data.issueValSche), this.changeSche(res.data.internalAuditSche), this.changeSche(res.data.commuClientSche), this.changeSche(res.data.assemChargeSche), this.changeSche(res.data.amendFinalSche), this.changeSche(res.data.manuArchiveSche))
				console.log(this.workDate)
								
				this.arrgData = res.data
				//
				this.transData(0)
			  }else if(this.companyTabsId == 1 && (this.projDetail.projType>=2100 && this.projDetail.projType <2200)){
				//智明测绘  
				this.workName = workName['智明测绘'];
				this.workPeople.push(res.data.prePreparationPic, res.data.workPlanPic, res.data.fldSrvyPic, res.data.drawingPic, res.data.issueValPic, res.data.internalAuditPic, res.data.commuClientPic, res.data.assemChargePic, res.data.amendFinalPic, res.data.manuArchivePic)
				this.workDate.push(res.data.prePreparationSche, res.data.workPlanSche, res.data.fldSrvySche, res.data.drawingSche, res.data.issueValSche, res.data.internalAuditSche, res.data.commuClientSche, res.data.assemChargeSche, res.data.amendFinalSche, res.data.manuArchiveSche)
				this.arrgData = res.data
				//
				this.transData(1)
			  }else if(this.companyTabsId == 1 && (this.projDetail.projType>=2200 && this.projDetail.projType <2300)){
				//智明咨询  
				this.workName = workName['智明咨询'];
				this.workPeople.push(res.data.prePreparationPic, res.data.workPlanPic, res.data.dataCollectionPic, res.data.fldSrvyPic, res.data.mktSrvyPic, res.data.issueValPic, res.data.internalAuditPic, res.data.commuClientPic, res.data.assemChargePic, res.data.amendFinalPic, res.data.manuArchivePic)
				this.workDate.push(res.data.prePreparationSche, res.data.workPlanSche, res.data.dataCollectionSche, res.data.fldSrvySche, res.data.mktSrvySche, res.data.issueValSche, res.data.internalAuditSche, res.data.commuClientSche, res.data.assemChargeSche, res.data.amendFinalSche, res.data.manuArchiveSche)
				this.arrgData = res.data
				//
				this.transData(2)
			  }else if(this.companyTabsId == 2){
				//汇正
				this.workName = workName['汇正']; 
				this.workPeople.push(res.data.dataCollectionPic, res.data.workPlanPic, res.data.fldSrvyPic, res.data.issueValPic, res.data.internalAuditPic, res.data.commuClientPic, res.data.assemChargePic, res.data.amendFinalPic, res.data.manuArchivePic)
				this.workDate.push(res.data.dataCollectionSche, res.data.workPlanSche, res.data.fldSrvySche, res.data.issueValSche, res.data.internalAuditSche, res.data.commuClientSche, res.data.assemChargeSche, res.data.amendFinalSche, res.data.manuArchiveSche)
				this.arrgData = res.data
				//
				this.transData(3) 
			  }
			  
			  //console.log('workName', this.workName);
              
              //后期看看让后端分割出date和people
              // this.workPeople.push(res.data.prePreparationPic, res.data.fldSrvyPic, res.data.mktSrvyPic, res.data.assemEstPic, res.data.issueValPic, res.data.internalAuditPic, res.data.commuClientPic, res.data.assemChargePic, res.data.amendFinalPic, res.data.manuArchivePic)
              // this.workDate.push(res.data.prePreparationSche, res.data.fldSrvySche, res.data.mktSrvySche, res.data.assemEstSche, res.data.issueValSche, res.data.internalAuditSche, res.data.commuClientSche, res.data.assemChargeSche, res.data.amendFinalSche, res.data.manuArchiveSche)
              //console.log('转类型后arrgData', this.arrgData)
              // console.log('workPeople', this.workPeople)
              // console.log('workArrgEdit', this.workArrgEdit)
            
			}
			  
			//220222 新增子项目查看或编辑时, 打开对应对话框
			if(handle == "show"){
				this.showWorkArrgVisible = true
			}else if(handle == "edit"){
				this.workArrgDialogVisible = true
			}
          }
        })
        .catch(err => {
          console.log('获取项目安排信息', err)
        })
    },
    transData(type) {
	  //日期按横线分隔, 其他按逗号分隔成数组
		
	  switch (type) {
	    case 0:
		  //惠正
		  this.arrgData.assemMethod = this.arrgData.assemMethod.split(',')
		  //
		  this.arrgData.prePreparationPic = this.arrgData.prePreparationPic.split(',')
		  this.arrgData.fldSrvyPic = this.arrgData.fldSrvyPic.split(',')
		  this.arrgData.mktSrvyPic = this.arrgData.mktSrvyPic.split(',')
		  this.arrgData.assemEstPic = this.arrgData.assemEstPic.split(',')
		  this.arrgData.issueValPic = this.arrgData.issueValPic.split(',')
		  this.arrgData.internalAuditPic = this.arrgData.internalAuditPic.split(',')
		  this.arrgData.commuClientPic = this.arrgData.commuClientPic.split(',')
		  this.arrgData.assemChargePic = this.arrgData.assemChargePic.split(',')
		  this.arrgData.amendFinalPic = this.arrgData.amendFinalPic.split(',')
		  this.arrgData.manuArchivePic = this.arrgData.manuArchivePic.split(',')
		  //
		  this.arrgData.prePreparationSche = this.arrgData.prePreparationSche.split('-')
		  this.arrgData.fldSrvySche = this.arrgData.fldSrvySche.split('-')
		  this.arrgData.mktSrvySche = this.arrgData.mktSrvySche.split('-')
		  this.arrgData.assemEstSche = this.arrgData.assemEstSche.split('-')
		  this.arrgData.issueValSche = this.arrgData.issueValSche.split('-')
		  this.arrgData.internalAuditSche = this.arrgData.internalAuditSche.split('-')
		  this.arrgData.commuClientSche = this.arrgData.commuClientSche.split('-')
		  //this.arrgData.assemChargeSche = this.arrgData.assemChargeSche.split('-')
		  this.arrgData.amendFinalSche = this.arrgData.amendFinalSche.split('-')
		  //this.arrgData.manuArchiveSche = this.arrgData.manuArchiveSche.split('-')
		  break
		case 1:
		  //智明测绘
		  this.arrgData.assemMethod = this.arrgData.assemMethod.split(',')
		  //
		  this.arrgData.prePreparationPic = this.arrgData.prePreparationPic.split(',')
		  this.arrgData.workPlanPic = this.arrgData.workPlanPic.split(',')//区别
		  this.arrgData.fldSrvyPic = this.arrgData.fldSrvyPic.split(',')
		  this.arrgData.drawingPic = this.arrgData.drawingPic.split(',') //区别
		  this.arrgData.issueValPic = this.arrgData.issueValPic.split(',')
		  this.arrgData.internalAuditPic = this.arrgData.internalAuditPic.split(',')
		  this.arrgData.commuClientPic = this.arrgData.commuClientPic.split(',')
		  this.arrgData.assemChargePic = this.arrgData.assemChargePic.split(',')
		  this.arrgData.amendFinalPic = this.arrgData.amendFinalPic.split(',')
		  this.arrgData.manuArchivePic = this.arrgData.manuArchivePic.split(',')
		  //
		  this.arrgData.prePreparationSche = this.arrgData.prePreparationSche.split('-')
		  this.arrgData.workPlanSche = this.arrgData.workPlanSche.split('-')//区别
		  this.arrgData.fldSrvySche = this.arrgData.fldSrvySche.split('-')
		  this.arrgData.drawingSche = this.arrgData.drawingSche.split('-') //区别
		  this.arrgData.issueValSche = this.arrgData.issueValSche.split('-')
		  this.arrgData.internalAuditSche = this.arrgData.internalAuditSche.split('-')
		  this.arrgData.commuClientSche = this.arrgData.commuClientSche.split('-')
		  //this.arrgData.assemChargeSche = this.arrgData.assemChargeSche.split('-')
		  this.arrgData.amendFinalSche = this.arrgData.amendFinalSche.split('-')
		  //this.arrgData.manuArchiveSche = this.arrgData.manuArchiveSche.split('-')
		  break
		case 2:
		  //智明咨询
		  this.arrgData.assemMethod = this.arrgData.assemMethod.split(',')
		  //
		  this.arrgData.prePreparationPic = this.arrgData.prePreparationPic.split(',')
		  this.arrgData.workPlanPic = this.arrgData.workPlanPic.split(',') 
		  this.arrgData.fldSrvyPic = this.arrgData.fldSrvyPic.split(',')
		  this.arrgData.issueValPic = this.arrgData.issueValPic.split(',')
		  this.arrgData.internalAuditPic = this.arrgData.internalAuditPic.split(',')
		  this.arrgData.commuClientPic = this.arrgData.commuClientPic.split(',')
		  this.arrgData.assemChargePic = this.arrgData.assemChargePic.split(',')
		  this.arrgData.amendFinalPic = this.arrgData.amendFinalPic.split(',')
		  this.arrgData.manuArchivePic = this.arrgData.manuArchivePic.split(',')
		  //
		  this.arrgData.prePreparationSche = this.arrgData.prePreparationSche.split('-')
		  this.arrgData.workPlanSche = this.arrgData.workPlanSche.split('-') 
		  this.arrgData.fldSrvySche = this.arrgData.fldSrvySche.split('-')
		  this.arrgData.issueValSche = this.arrgData.issueValSche.split('-')
		  this.arrgData.internalAuditSche = this.arrgData.internalAuditSche.split('-')
		  this.arrgData.commuClientSche = this.arrgData.commuClientSche.split('-')
		  //this.arrgData.assemChargeSche = this.arrgData.assemChargeSche.split('-')
		  this.arrgData.amendFinalSche = this.arrgData.amendFinalSche.split('-')
		  //this.arrgData.manuArchiveSche = this.arrgData.manuArchiveSche.split('-')
		  break
		case 3:
		  //汇正
		  this.arrgData.assemMethod = this.arrgData.assemMethod?this.arrgData.assemMethod.split(','):'';
		  //
		  this.arrgData.dataCollectionPic = this.arrgData.dataCollectionPic.split(',')
		  this.arrgData.workPlanPic = this.arrgData.workPlanPic.split(',') //区别
		  this.arrgData.fldSrvyPic = this.arrgData.fldSrvyPic.split(',')
		  this.arrgData.issueValPic = this.arrgData.issueValPic.split(',')
		  this.arrgData.internalAuditPic = this.arrgData.internalAuditPic.split(',')
		  this.arrgData.commuClientPic = this.arrgData.commuClientPic.split(',')
		  this.arrgData.assemChargePic = this.arrgData.assemChargePic.split(',')
		  this.arrgData.amendFinalPic = this.arrgData.amendFinalPic.split(',')
		  this.arrgData.manuArchivePic = this.arrgData.manuArchivePic.split(',')
		  //
		  this.arrgData.dataCollectionSche = this.arrgData.dataCollectionSche.split('-')
		  this.arrgData.workPlanSche = this.arrgData.workPlanSche.split('-') //区别
		  this.arrgData.fldSrvySche = this.arrgData.fldSrvySche.split('-')
		  this.arrgData.issueValSche = this.arrgData.issueValSche.split('-')
		  this.arrgData.internalAuditSche = this.arrgData.internalAuditSche.split('-')
		  this.arrgData.commuClientSche = this.arrgData.commuClientSche.split('-')
		  //this.arrgData.assemChargeSche = this.arrgData.assemChargeSche.split('-')
		  this.arrgData.amendFinalSche = this.arrgData.amendFinalSche.split('-')
		  //this.arrgData.manuArchiveSche = this.arrgData.manuArchiveSche.split('-')
		  break
	  }
    },
    // handleWorkArrg() {
    //   //this.$router.push({ path: '/workarrange', query: { data: this.projDetail, projMember: this.projMember, isEdit: this.workArrgEdit } })
    //   this.workArrgVisible = true
    // },
    handleDetail() {		
	  const key = this.newCode(this.projDetail.projId);
      this.$router.push({ path: '/projcheck', query: { data: key } })
    },
    handleEdit() {
	  const key = this.newCode(this.projDetail.projId);
      this.$router.push({ path: '/planform', query: { data: key } })
    },
    handleChangeType() {
      // if (this.statusInfo.registerState == true || this.statusInfo.evalObjState == true) {
      //   this.$message.error('该项目已填写估价对象详情或已登记正评，不可改变类型')
      //   return 0
      // }
      this.changeTypeVisible = true
      this.changeType.projId = this.projDetail.projId
      let selOption = this.typeOptions
      const index = selOption.findIndex((item, index, arr) => {
        console.log('value>>>', item)
        return item.value == this.projDetail.projType
      })
      //selOption.splice(index, 1)
      this.typeOptions = selOption
    },
    changeProjType() {
      if (this.changeType.toType == '') {
        this.$message.info('请选择修改类型');
      } else {
		//211101变动 新增: 多个公司切换
		const changeData = {
			changeType: this.changeType
		} 
        alterProjType(changeData, this.companyId)
          .then(res => {
            console.log(res)
            this.$message.success('修改成功');
            this.changeTypeVisible = false
            //this.getDetail()
            this.$router.go(-1)
          })
          .catch(err => {
            console.log(err)
            this.$message.error('修改失败');
          })
      }
    },
    handleFormalReg() {
      if (this.statusInfo.evalObjState == false) {
        this.$message.warning('请先填写评估（估价）对象详情')
      } else {
		//211101变动 新增: 多个公司切换
		const evalObjData = {
			projId: this.projDetail.projId, 
			subProjNum: '-'
		}
        getEvalObjDetail(evalObjData, this.companyId)
          .then(res => {
            let i = res.data.projTotalValue
            if (i <= 100) {
              this.regForm.standardFee = ((i * 0.005) * 10000).toFixed(0)
            } else if (i <= 1000) {
              this.regForm.standardFee = ((i * 0.0025 + 0.25) * 10000).toFixed(0)
            } else if (i <= 2000) {
              this.regForm.standardFee = ((i * 0.0015 + 1.25) * 10000).toFixed(0)
            } else if (i <= 5000) {
              this.regForm.standardFee = ((i * 0.0008 + 2.65) * 10000).toFixed(0)
            } else if (i <= 8000) {
              this.regForm.standardFee = ((i * 0.0004 + 4.65) * 10000).toFixed(0)
            } else if (i <= 10000) {
              this.regForm.standardFee = ((i * 0.0002 + 6.25) * 10000).toFixed(0)
            } else if (i > 10000) {
              this.regForm.standardFee = ((i * 0.0001 + 7.25) * 10000).toFixed(0)
            }
          })
          .catch(err => {
            this.$message.error('服务器忙，请稍后重试')
          })
        this.formalRegVisible = true
      }
    },
    submitFormalReg() {
      this.$refs.regForm.validate((valid) => {
        if (valid) {
          if (this.statusInfo.registerState == false) {
            this.regForm.projId = this.projDetail.projId
            this.regForm.subProjNum = this.projDetail.subProjNum
            //
            this.regForm.infoVerification = this.regForm.infoVerification.join(',')
            this.regForm.marketEnquiry = this.regForm.marketEnquiry.join(',')
            this.regForm.techExp = this.regForm.techExp.join(',')
            this.regForm.reportDrafter = this.regForm.reportDrafter.join(',')
            this.regForm.feeFollowUp = this.regForm.feeFollowUp.join(',')
            this.regForm.signedAppraiser = this.regForm.signedAppraiser.join(',')
            this.regForm.projAsst = this.regForm.projAsst.join(',')
            this.regForm.fieldSrvy = this.regForm.fieldSrvy.join(',')
            
			//211101变动 新增: 多个公司切换
			console.log(this.regForm)
            submitFaRegister(this.regForm, this.companyId)
              .then(res => {
                this.$message.success('提交成功！')
                this.reload()
              })
              .catch(err => {
                this.$message.error('服务器忙，请稍后重试')
                console.log(err)
              })
          } else {
            this.regForm.infoVerification = this.regForm.infoVerification.join(',')
            this.regForm.marketEnquiry = this.regForm.marketEnquiry.join(',')
            this.regForm.techExp = this.regForm.techExp.join(',')
            this.regForm.reportDrafter = this.regForm.reportDrafter.join(',')
            this.regForm.feeFollowUp = this.regForm.feeFollowUp.join(',')
            this.regForm.signedAppraiser = this.regForm.signedAppraiser.join(',')
            this.regForm.projAsst = this.regForm.projAsst.join(',')
            this.regForm.fieldSrvy = this.regForm.fieldSrvy.join(',')
			
			//211101变动 新增: 多个公司切换
            console.log('正评登记编辑Form', this.regForm)
            editFaRegister(this.regForm, this.companyId)
              .then(res => {
                console.log('editRes', res)
                this.reload()
              })
              .catch(err => {
                this.$message.error('服务器忙，请稍后重试')
                console.log(err)
              })
          }
        } else {
          this.$message.warning('请填写必填信息');
        }
      })
      // if (this.statusInfo.registerState == false) {
      //   this.regForm.projId = this.projDetail.projId
      //   this.regForm.subProjNum = this.projDetail.subProjNum
      //   //
      //   this.regForm.infoVerification = this.regForm.infoVerification.join(',')
      //   this.regForm.marketEnquiry = this.regForm.marketEnquiry.join(',')
      //   this.regForm.techExp = this.regForm.techExp.join(',')
      //   this.regForm.reportDrafter = this.regForm.reportDrafter.join(',')
      //   this.regForm.feeFollowUp = this.regForm.feeFollowUp.join(',')
      //   this.regForm.signedAppraiser = this.regForm.signedAppraiser.join(',')
      //   this.regForm.projAsst = this.regForm.projAsst.join(',')
      //   console.log(this.regForm)
      //   submitFaRegister(this.regForm)
      //     .then(res => {
      //       console.log('addRes', res)
      //       this.reload()
      //     })
      //     .catch(err => {
      //       this.$message.error('服务器忙，请稍后重试')
      //       console.log(err)
      //     })
      // } else {
      //   editFaRegister({ registerId: this.regInfo.registerId })
      //     .then(res => {
      //       console.log('editRes', res)
      //       this.reload()
      //     })
      //     .catch(err => {
      //       this.$message.error('服务器忙，请稍后重试')
      //       console.log(err)
      //     })
      // }
    },

    setQRCode() {
      this.setQRCodeVisible = true
    },

    handleQRCode() {
      if (this.qrcodeForm.assessedValue == '') {
        this.$message.warning('请填写项目评估值')
        return 0
      }
      this.qrcodeForm.projId = this.projDetail.projId
	  
	  //211101变动 新增: 多个公司切换

      createReportQrCode(this.qrcodeForm, this.companyId)
          .then(res => {
			var timestamp=new Date().getTime();  
			  
            this.qrCodeSrc = `${ProManageAPIServer}qrCode/readReportQrCode/`+this.projDetail.projId+"?s="+timestamp;
            this.qrcodeVisible = true
            // this.$nextTick(() => {
            //   this.qrCodeSrc = `${ProManageAPIServer}/qrCode/readReportQrCode/`+this.projDetail.projId
            // })
            console.log(this.qrCodeSrc)
          })
          .catch(err => {
            console.log(err)
            this.$message.error('二维码生成失败');
          });
    },
    creatQRCode(val) {
      console.log(val)
      let qrcode = new QRCode('qrcode', {
        width: '200',
        height: '200',
        //text: this.form.zph + this.form.xmmc + this.form.pgz + this.form.jzr,
        text: '项目报告号：' + this.reportNum.zph + ';' + '项目名称：' + this.projDetail.projName + ';' + ';' + '项目评估值：' + val +'万元 ' + ';' + '基准日：' + this.formatDate(this.projDetail.baseDate)
      })
    },
    closeQRCode() {
      this.$refs.qrcode.innerHTML = ''
      this.qrCodeSrc = ''
    },
    handleCreateContractNum() {

        if (this.projDetail.projContactType === '定点采购' || this.projDetail.projContactType === '中介超市') {
            this.preContractNumDialogVisible = true;
        } else {
            this.createContractNumBasic()
        }

    },
    createContractNumBasic(){
      this.$confirm('即将获取合同号', '提示', { type: 'info' })
          .then(() => {
            if (this.contractNum) {
              this.$message.warning('已存在合同号！');
              return;
            }
			//211101变动 新增: 多个公司切换
			const createData = {
				projId: this.projDetail.projId, 
				externalContractNum: this.preExternalContractNum
			}
            createContractNum(createData, this.companyId)
                .then(res => {
				  
				  //211207变动 刷新整页改成局部刷新
                  //this.reload();
				  this.getDetail()
				  
				  //211207变动 修改projid刷新操作记录
				  this.opRefresh();
                })
                .catch(err => {
                  this.$message.error(err.errorMsg);
                });
          })
          .catch(() => {

          });
    },
    createContractNumWithExternal() {
        if (this.preExternalContractNum === '') {
            this.$message.error('请输入外部合同号')
            return
        }else if (this.externalContractNumValidator(this.preExternalContractNum)) {
          this.$message.error('不能包含中文')
          return
        }

        this.createContractNumBasic();

    },
	
	handleReviewContractNum(){
		//this.$message.warning('弹出查看合同信息')
		this.contractNumReviewDialogVisible = true;
	},
	
    handleDeleteContractNum() {
      // this.$message.warning("请联系管理员进行删除")

      if (this.projDetail.contractNum == null) {
        this.$message.warning('尚未获取合同号')
      } else {
        this.$confirm('即将删除合同号，确定吗？', '提示：即将删除[' + this.contractNum + ']', { type: 'error' })
          .then(() => {
			//211101变动 新增: 多个公司切换
			const deleteData = {
				contractNum: this.contractNum
			}  			  
            deleteContractNum(deleteData, this.companyId)
              .then(res => {
                this.$message.success('合同号已删除！')
				
				//211207变动 刷新整页改成局部刷新
                //this.reload()	
				//清空合同号和外部合同号
				this.contractNum = '';
				this.projDetail.contractNum.externalContractNum = ''
				
				//211207变动 修改projid刷新操作记录
				this.opRefresh();
              })
              .catch(err => {
                this.$message.warning('服务器忙，请稍后重试！')
              })
          })
          .catch(() => {
            { }
          })
      }
    },
    handlePrintProj(val, isSubProj) {
		console.log("打印项目计划", val)
	  if(this.workArrgEdit || isSubProj){
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
		 
		//211101变动 新增: 多个公司切换
		oReq.setRequestHeader('companyId',this.companyId)
		
		oReq.responseType = 'blob'
		oReq.onload = function (oEvent) {
		  //生产环境需要加上前缀/hzms/hzht
		  window.open('/static/pdf/web/viewer.html?file=' + encodeURIComponent(URL.createObjectURL(new Blob([oReq.response]))))
		}
		const fdata = new FormData()
		fdata.append('projId', parseInt(that.queryData.projId))
		fdata.append('subProjNum', val)
		oReq.send(fdata)  
	  }else{
		this.$message.warning('请先安排工作计划, 再打印计划信息表');
	  }
      
    },
    //取号流程
    handleGetNum() {	  
      this.createReportNumDialogVisible = true
    },
    getNewNum(val) {
      if (val == 1) { //初评号
        //房地资才有初评号
        if (this.projDetail.projType == 1010 || this.projDetail.projType == 1020 || this.projDetail.projType == 1030) {
          this.getNumType = this.projDetail.projType + 1
        } else {
          this.$message.warning('非房地资项目请选择正评号')
          return 0
        }
      } else if (val == 2) { //正评号
        if (this.projDetail.projType == 1010 || this.projDetail.projType == 1020 || this.projDetail.projType == 1030) {
          this.getNumType = this.projDetail.projType + 2 //房地资正评
        } else if (this.projDetail.projType == 1041 || this.projDetail.projType == 1042 || this.projDetail.projType == 1043) {
          //*********
          //请不要怀疑这一段代码为什么这么绕口令，因为初期提需求的时候（也就是写下这段代码的本人）没有考虑好projType和ReportNumType的关系，详情参考接口文档
          //*********
          if (this.projDetail.projType == 1041) {
            this.getNumType = 1013 //房咨询正评
          } else if (this.projDetail.projType == 1042) {
            this.getNumType = 1023 //资咨询正评
          } else if (this.projDetail.projType == 1043) {
            this.getNumType = 1033 //土咨询正评
          }
        } else {
          this.getNumType = this.projDetail.projType
        }
      } else if (val == 3) { //回函号
        this.getNumType = 1100
      } else if (val == 4) { //政策项目中的房地产咨询
        this.getNumType = 1013
      } else if (val == 5) { //政策项目中的土地咨询
        this.getNumType = 1023
      } else if (val == 6) { //政策项目中的资产咨询
        this.getNumType = 1033
      }
      //结束判断类型，调取号接口
	  //211101变动 新增: 多个公司切换
	  const createData = {
		projId: this.projDetail.projId, 
		reportNumType: this.getNumType
	  }
      createReportNum(createData, this.companyId)
        .then(res => {
          this.$message.success('取号成功')
          //this.reload()
          this.getNumVisible = false
		  //this.reportNumShowType = false
          this.getDetail()
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
    createReportNumResponse() {
      this.getDetail()
	  
	  //211207变动 修改projid刷新操作记录
	  this.opRefresh()
    },
    handleGetOldNum() {
      this.getOldNumVisible = true
    },
    getOldNum(val) {
      if (val == '') {
        this.$message.warning('请选择时间')
        return 0
      }
      // else if (this.reportNum.zph !== '') {
      //   this.$message.warning('已存在正评号')
      //   return 0
      // } 
      else {
        //takenData格式化
        this.takenDate = this.$moment(val).format('YYYY-MM-DD')
        //reportNumType
        if (this.projDetail.projType == 1010 || this.projDetail.projType == 1020 || this.projDetail.projType == 1030) {
          this.getNumType = this.projDetail.projType + 2 //房地资正评
        } else if (this.projDetail.projType == 1041 || this.projDetail.projType == 1042 || this.projDetail.projType == 1043) {
          //*********
          //请不要怀疑这一段代码为什么这么绕口令，因为初期提需求的时候（也就是写下这段代码的本人）没有考虑好projType和ReportNumType的关系，详情参考接口文档
          //*********
          if (this.projDetail.projType == 1041) {
            this.getNumType = 1013 //房咨询正评
          } else if (this.projDetail.projType == 1042) {
            this.getNumType = 1023 //资咨询正评
          } else if (this.projDetail.projType == 1043) {
            this.getNumType = 1033 //土咨询正评
          }
        } else {
          this.getNumType = this.projDetail.projType
        }
		
		//211101变动 新增: 多个公司切换
		const oldReportData = {
			projId: this.projDetail.projId, 
			reportNumType: this.getNumType, 
			takenDate: this.takenDate
		} 
        getOldReportNum(oldReportData)
          .then(res => {
            console.log('oldReportNum', res.data)
            this.$message.success('获取成功')
            //this.reload()
            this.getDetail()
            this.getOldNumVisible = false
          })
          .catch(err => {
            console.log('取往月号err', err)
            if (err.statusCode == 5001) {
              this.$message.warning('已存在报告号！')
              this.getOldNumVisible = false
            } else {
              this.$message.warning('服务器忙，请稍后再试')
            }
          })
      }

    },
    handleDelNum(obj) {
      if (this.reportNum.cph == '' && this.reportNum.zph == '' && this.reportNum.hhh == '') {
        this.$message.warning('尚未生成报告号')
      } else {
        this.delNumVisible = true
      }
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
		  
		  //211101变动 新增: 多个公司切换
		  const deleteData = {
			reportNum: this.needDelNum
		  }
          deleteReportNum(deleteData, this.companyId)
            .then(res => {
              this.$message.success('删除成功')
              //this.reload()
              this.getDetail()
              this.delNumVisible = false
			  //this.reportNumShowType = false
			  
			  //211206 修复操作记录不刷新的bug
			  this.opRefresh()
            })
            .catch(err => {
              this.$message.warning('删除失败，请稍后再试')
            })
        })
        .catch(() => { })
    },//end of delNum
	
	handleShowSubNum(reportNum, subNum, isCN){
		if(isCN){
			if(subNum){				
				return reportNum.replace("号","")+"-"+subNum+"号";
			}else{
				return reportNum;
			}
		}else{
			if(subNum){
				return reportNum+"-"+subNum;
			}else{
				return reportNum;
			}
		}
	},

    //子项目
    handleAddSubProj(val) {
		//判断第一条子项目号是否为空
		if(this.subTableData[0].subProjNum){
			//报告号projId
			this.subFatherReport = val
					
			this.subProjVisible = true
		}else{
			this.$message.warning('新增项目前, 请先修改第一条项目的子项目号')
			
			const subBasicInfoForm = {
				subProjId:this.subTableData[0].subProjId,
				subProjNum:this.subTableData[0].subProjNum,
				subProjName:this.subTableData[0].subProjName,
				subProjScope:this.subTableData[0].subProjScope,
				subBaseDate:this.formatDate(this.subTableData[0].subBaseDate),
			}
			this.subBasicInfoForm = subBasicInfoForm
			
			this.subBasicInfoDialogVisible = true;
			
			
		}
		
        
	  /* 
      if (val !== '') {
        console.log(val)
        this.subProjVisible = true
        this.subFatherReport = val
      } else {
        this.$message('请先获取的对应初(正)评号')
      }
	  */
	  
    },
	
	//修改子项目
	handleEditSubProj(subData) {
		
		//提取项目组成员		
		const leader = subData.subProjLeader?subData.subProjLeader.split(','):[];
		const reviewer = subData.subProjReviewer?subData.subProjReviewer.split(','):[];
		const projReviewer = subData.subProjProReviewer?subData.subProjProReviewer.split(','):[];
		const asst = subData.subProjAsst?subData.subProjAsst.split(','):[];
		const srvy = subData.subFieldSrvy?subData.subFieldSrvy.split(','):[];
		//var arr = new Array;
		//this.workArrgProjMember = Array.from(new Set(arr.concat(leader, reviewer, projReviewer, asst, srvy)));
		this.workArrgProjMember = this.projMember;
				
		const editSubProjForm = {
			subProjId:subData.subProjId,
			subProjNum:subData.subProjNum,
			subProjName:subData.subProjName,
			subProjScope:subData.subProjScope,
			subBaseDate:this.formatDate(subData.subBaseDate),
			subProjLeader:leader,
			subProjReviewer:reviewer,
			subProjProReviewer:projReviewer,
			subProjAsst:asst,
			subFieldSrvy:srvy,
		}
		this.editSubProjForm = editSubProjForm
		
				
		this.editSubProjVisible = true;
		
	},
	editSubProjSubmit(val){
		this.$refs.editSubProjForm.validate((valid) => {
			if (valid) {
				//console.log('subBasicInfo', this.subBasicInfo);
				
				//远程更新
				var editData = Object.assign({}, this.editSubProjForm);
				editData.subProjLeader = editData.subProjLeader?editData.subProjLeader.join(','):'';
				editData.subProjReviewer = editData.subProjReviewer?editData.subProjReviewer.join(','):'';
				editData.subProjProReviewer = editData.subProjProReviewer?editData.subProjProReviewer.join(','):'';
				editData.subProjAsst = editData.subProjAsst?editData.subProjAsst.join(','):'';
				editData.subFieldSrvy = editData.subFieldSrvy?editData.subFieldSrvy.join(','):'';
				editData['projId'] = val
				
				editSubProject(editData, this.companyId)
				.then(res => {
				    this.$message.success('项目信息修改成功')
					
					//1. 刷新项目组列表
					const projData = {
						projId: val
					}
					getSubProjectInfoList(projData, this.companyId)
					.then(res => {
					  this.subTableData = res.data
					})
					.catch(err => {
					})  
					
					//2. 关闭弹出框
					this.editSubProjVisible = false
				})
				.catch(err => {
				    if (err.statusCode == 5002) {
				      this.$message.warning('该子报告号已存在，请勿重新添加')
				    } else {
				      this.$message.warning('修改失败，请稍后重试')
				    }
				})
				
			}else{
				this.$message('请填写必填信息或格式有误');
			}
		})
	},
	
	
    handleSubProjDetail(val) {
      console.log('subProjDetailval', val)
	  //const key = this.newCode(this.projDetail.projId);
      //this.$router.push({ path: '/subworkhandle', query: { data: JSON.stringify(val) } })
    },
    addSubProj(val) {
      //val传入对应父项目报告号
      this.$refs.subFormRules.validate((valid) => {
        if (valid) {
		  /* 
          this.subProjForm.subProjLeader = this.subProjForm.subProjLeader?this.subProjForm.subProjLeader.join(','):''
          this.subProjForm.subProjReviewer = this.subProjForm.subProjReviewer?this.subProjForm.subProjReviewer.join(','):''
          this.subProjForm.subProjProReviewer = this.subProjForm.subProjProReviewer?this.subProjForm.subProjProReviewer.join(','):''
          this.subProjForm.subProjAsst = this.subProjForm.subProjAsst?this.subProjForm.subProjAsst.join(','):''
          this.subProjForm.subFieldSrvy = this.subProjForm.subFieldSrvy?this.subProjForm.subFieldSrvy.join(','):''
          
		  this.subProjForm.projId = val 
		  */
		  
		  //远程更新
		  var addData = Object.assign({}, this.subProjForm);
		  addData.subProjLeader = addData.subProjLeader?addData.subProjLeader.join(','):'';
		  addData.subProjReviewer = addData.subProjReviewer?addData.subProjReviewer.join(','):'';
		  addData.subProjProReviewer = addData.subProjProReviewer?addData.subProjProReviewer.join(','):'';
		  addData.subProjAsst = addData.subProjAsst?addData.subProjAsst.join(','):'';
		  addData.subFieldSrvy = addData.subFieldSrvy?addData.subFieldSrvy.join(','):'';
		  addData['projId'] = val
		  
		  //211101变动 新增: 多个公司切换
          addSubProject(addData, this.companyId)
            .then(res => {
              this.$message.success('创建子项目成功')
              //this.reload()
			  
			  //1. 刷新项目组列表
			  this.reloadSubTableData() 
			  
			  //2. 关闭弹出框
			  this.subProjVisible = false
			  
            })
            .catch(err => {
              if (err.statusCode == 5002) {
				/*  
				this.subProjForm.subProjLeader = []
				this.subProjForm.subProjReviewer = []
				this.subProjForm.subProjProReviewer = []
				this.subProjForm.subProjAsst = []
				this.subProjForm.subFieldSrvy = []
				 */  
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
	
	subBasicInfoEdit(val){
		this.$refs.subBasicInfoForm.validate((valid) => {
			if (valid) {
				//console.log('subBasicInfo', this.subBasicInfo);
				
				//远程更新
				var editData = Object.assign({}, this.subBasicInfoForm);
				editData['projId'] = val
				
				editSubProject(editData, this.companyId)
				.then(res => {
				    this.$message.success('基本信息修改成功')
					
					//1. 刷新项目组列表
					this.reloadSubTableData();
					
					//2. 关闭弹出框
					this.subBasicInfoDialogVisible = false
				})
				.catch(err => {
				    if (err.statusCode == 5002) {
				      this.$message.warning('该子报告号已存在，请勿重新添加')
				    } else {
				      this.$message.warning('修改失败，请稍后重试')
				    }
				})
				
			}else{
				this.$message('请填写必填信息或格式有误');
			}
		})
	},
	
	reloadSubTableData(){
		//1. 刷新项目组列表
		const projData = {
			projId: this.projDetail.projId
		}
		getSubProjectInfoList(projData, this.companyId)
		.then(res => {
		  this.subTableData = res.data
		})
		.catch(err => {
		})
	},
	
	//220218新增 条状修改项目信息
	editSubProj(projId, val) {
		//this.$router.push({ path: '/worksubregister', query: { projId: projId, data: val } })
		
	},	
	
    delSubProj(row) {
      this.$confirm('确定要删除吗？', '提示', { type: 'warning' })
        .then(() => {
		  //211101变动 新增: 多个公司切换
		  const delSubData = {
		  	subProjId: row.subProjId
		  }
          delSubProject(delSubData, this.companyId)
            .then(res => {
              this.$message.success('删除子项目成功')
			  
              this.reloadSubTableData()
            })
            .catch(err => {
				if(err.statusCode == 500){
					this.$message.warning('删除失败，至少保留一个项目')
				}else{
					this.$message.warning('删除失败，请稍后重试')
				}              
            })
        })
        .catch(() => { })
    },
	
	removeSubProjNum(subProjId) {
	  this.$confirm('确定要删除吗？', '提示', { type: 'warning' })
	    .then(() => {
		  //211101变动 新增: 多个公司切换
		  const removeSubData = {
		  	subProjId: subProjId
		  }
	      removeSubProjNum(removeSubData, this.companyId)
	        .then(res => {
	          this.$message.success('移除子项目报告号成功')
	          this.reloadSubTableData()
	        })
	        .catch(err => {
				if(err.statusCode == 500){
					this.$message.warning('删除失败，至少保留一个项目')
				}else{
					this.$message.warning('删除失败，请稍后重试')
				}              
	        })
	    })
	    .catch(() => { })
	},
	
	handleDelSubReceipt(projId, receiptId){
		console.log(projId, receiptId)
		this.$confirm('确定要删除吗？', '提示', { type: 'warning' })
		.then(() => {
		  //211101变动 新增: 多个公司切换
		  const delSubData = {
			  projId: projId, 
			  receiptId: receiptId, 
		  }
		  delSubProjectReceipt(delSubData, this.companyId)
		    .then(res => {
		      this.$message.success('删除项目凭证成功')
		      
			  //刷新凭证列表
			  this.reflashReceiptList(projId);
			  
		    })
		    .catch(err => {
			  console.log('项目凭证删除失败', err)
		    })
		})  
	},
	
	getSummaries(param) {
		const { columns, data } = param;
		const sums = [];
		columns.forEach((column, index) => {
		  if (index === 0) {
			sums[index] = '合计';
			return;
		  }
		  
		  if(index === 4){
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
		});

		return sums;
	},
	jumpToSubHandle(subData) {
		if(this.projDetail.reportNumList.length > 0){
			if(subData.workAssignment){
				if(this.contractNum){
					this.$router.push({ path: '/worksubregister', query: { projId: subData.projId, data: subData.subProjId } })
				}else{
					this.$message.warning('请先取合同号')
				}
			}else{
				this.$message.warning('请先完成项目安排')
			}
		}else{
				this.$message.warning('请先取报告号')
		}
		
	},
	
	jumpToSubChargeDoc(subData) {
		if(subData.subProjStatus.mainStatus>=1){
			this.$router.push({ path: '/worksubchargedoc', query: { projId: subData.projId, data: subData.subProjId } })
		}else{
			this.$message.warning('请先录入正评')
		}
		
	},
		
	jumpToSubReceipt(projId, receiptId) {
		if(receiptId){
			this.$router.push({ path: '/worksubreceipt', query: { projId: projId, data: receiptId } })
		}else{
			this.$router.push({ path: '/worksubreceipt', query: { projId: projId } })
		}
	},
	
	
	exportSubProj(exportType, projId){
		var formData = new FormData()
		formData.append('projId', projId)
		
		if(exportType == '正评'){
			const path = 'register/batchExportRegisterInfoExcel'
			downloadExcel(formData, path, this.companyId)
		}else{
			const path = 'register/batchExportChargeDocExcel'
			downloadExcel(formData, path, this.companyId)
		}
	},
	
    formatDate(now) {
      const time = new Date(now)
      var year = time.getFullYear();  //取得4位数的年份
      var month = time.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
      var date = time.getDate();      //返回日期月份中的天数（1到31）
      var hour = time.getHours();     //返回日期中的小时数（0到23）
      return year + "-" + month + "-" + date
    },
    // calculate(i, j, id) {
    //   if (i != '' && j != '') {
    //     console.log(i, j, id)
    //     switch (id) {
    //       case 1:
    //         this.form.landTotalValue = (i * j / 10000).toFixed(2)
    //         break
    //       case 2:
    //         this.form.buildingTotalValue = (i * j / 10000).toFixed(2)
    //         break
    //     }
    //     this.form.evalObjTotalAssemValue = (parseFloat(this.form.landTotalValue) + parseFloat(this.form.buildingTotalValue)).toFixed(2)
    //     this.form.projTotalValue = this.form.evalObjTotalAssemValue
    //   }
    // },
    //
    getObjDetail() {
	  //211101变动 新增: 多个公司切换
	  const evalObjData = {
	  	projId: this.projDetail.projId, 
		subProjNum: '-'
	  }
      getEvalObjDetail(evalObjData, this.companyId)
        .then(res => {
          console.log('估价对象详情res', res)
          if (res.data == null) {
            console.log('用添加')
            this.assemObjIsEdit = false
          } else {
            console.log('用编辑')
            this.assemObjIsEdit = true
            this.assemObjForm = res.data
          }
          //this.assemObjForm = res.data
        })
        .catch(err => {
          console.log('估价对象详情err', err)
        })
    },
    isFcDialogVisible() {
      this.getObjDetail()
      this.fcDialogVisible = true
    },
    isZcDialogVisible() {
      this.zcDialogVisible = true
    },
    isWorkArrgDialog(subData) {	
	  //220221 新增子项目 惠正,打开前获取
	  if(subData){
		//有子项目时, 使用子项目成员信息
		this.projDetail.subProjId = subData.subProjId;
		
		//修改 projMember
		//提取项目组成员
		const leader = subData.subProjLeader?subData.subProjLeader.split(','):[];
		const reviewer = subData.subProjReviewer?subData.subProjReviewer.split(','):[];
		const projReviewer = subData.subProjProReviewer?subData.subProjProReviewer.split(','):[];
		const asst = subData.subProjAsst?subData.subProjAsst.split(','):[];
		const srvy = subData.subFieldSrvy?subData.subFieldSrvy.split(','):[];
		//this.workArrgmidMember.push(...leader, ...reviewer, ...projReviewer, ...asst, ...srvy)
		//const mid2 = Array.from(new Set(this.workArrgmidMember))
		//this.workArrgProjMember = mid2.filter(item => item)
		
		//console.log("项目组备选", leader, reviewer, projReviewer, asst, srvy)
		//console.log(subData.baseDate)
		var arr = new Array;
		this.workArrgProjMember = Array.from(new Set(arr.concat(leader, reviewer, projReviewer, asst, srvy)));
		this.workArrgProjMemberInfo={
			//baseDate:this.formatDate(subData.baseDate),
			baseDate:new Date(subData.subBaseDate).getTime(),
			projLeader:subData.subProjLeader,
			projReviewer:subData.subProjReviewer,
			projProReviewer:subData.subProjProReviewer,
			projAsst:subData.subProjAsst,
			fieldSrvy:subData.subFieldSrvy,
		}					
		//console.log("workArrgProjMember", this.workArrgProjMember);
			
		this.getWorkAssignmentData("edit")
	  }else{
		//没子项目时, 使用计划项目组成员信息
		this.workArrgProjMember = this.projMember;
		this.workArrgProjMemberInfo={
			baseDate:this.projDetail.baseDate,
			projLeader:this.projDetail.projLeader,
			projReviewer:this.projDetail.projReviewer,
			projProReviewer:this.projDetail.projProReviewer,
			projAsst:this.projDetail.projAsst,
			fieldSrvy:this.projDetail.fieldSrvy,			
		}
		  
		this.workArrgDialogVisible = true
	  }
	  
    },
    resetArrg(subProjId) {
      this.$confirm('确定要清空工作安排吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
		  const workAssignmentData = {
		  	projId: this.projDetail.projId,
		  	subProjId: subProjId
		  }
          delWorkAssignment(workAssignmentData, this.companyId)
            .then(res => {
			  //211207变动 刷新整页改成局部刷新
			  //this.reload();
			  
			  //220221 非惠正, 删除安排后, 重新获取安排, 惠正, 重新获取子项目列表
			  if(subProjId){
				this.getDetail()
			  }else{
			  	this.getWorkAssignmentData()
			  }
			  
			  //211207变动 修改projid刷新操作记录
			  this.opRefresh();
			  
            })
            .catch(err => {
              this.$message.warning('服务器忙，请稍后重试')
            })
        })
        .catch(() => { })
    },
    changeState(val) {
      let state = ''
      if (val == 1) {
        state = '已完成'
      } else if (val == 0) {
        state = '进行中'
      } else if (val == 2) {
        state = '项目中止'
      }
      this.$confirm('确定要设置为'+ state + '吗？', '提示', {type: 'warning'})
        .then(() => {
		  const projStateData = {
		  	projId: this.projDetail.projId, 
			stateCode: val
		  }
          setProjState(projStateData, this.companyId)
            .then(res => {
              //console.log(res)
              //this.reload()
			  this.getDetail();
			  this.pageInfoDel();
            })
            .catch(err => {
              this.$message.warning('切换项目状态失败，请刷新页面后重试')
            })
          this.$message.success('项目状态设置成功');  
        })
        .catch(() => {})
    },
    goBack() {
      this.$router.back()
    },
    openContractNumDialog(){
        if (this.contractNum != '') {
            this.preExternalContractNum = this.externalContractNum
            this.contractNumDialogVisible = true;
        } else {
            this.preContractNumDialogVisible = true;
        }
    },
    setExternalContractNum() {

      if (this.preExternalContractNum === '') {
        this.$message.error('外部合同号不能为空');
        return;
      }else if(this.externalContractNumValidator(this.preExternalContractNum)) {
        this.$message.error('不能包含中文')
        return
      }
      else if (this.preExternalContractNum === this.externalContractNum) {
        this.$message.warning('请修改后再提交');
        return;
      }

      updateExternalContractNum({
        projId: this.projDetail.projId,
        externalContractNum: this.preExternalContractNum
      }, this.companyId).then(
          res => {
            this.$message.success('修改成功');
			
			//211207变动 刷新整页改成局部刷新
            //this.reload()			
			this.getDetail();
			this.contractNumDialogVisible = false;
			
			//211207变动 修改projid刷新操作记录
			this.opRefresh();
          }
      ).catch(err => {
        this.$message.error('修改失败')
        this.preExternalContractNum = ''
      });

    },

    externalContractNumValidator(str) {
      var reg = /^[\u4e00-\u9fa5]+$/;
      return str.match(reg)
    },

    checkCFSDetail() {

      let baseUrl = 'https://www.gdhzpg.cn/web/#/login?redirect=/survey/survey_infolist' + '&key=' + this.projDetail.projId

      getToken().then(
          res => {
            baseUrl += '&token=' + res.data;
            console.log(baseUrl);
            window.open(baseUrl);
          })
          .catch(err => {
            this.$message.error('获取token错误')
            console.log(err);
          });

    },
	
	handleTabsClick(tab, event) {
	  //console.log("切换到: ", tab.label, tab.name);
	  this.$message.success('切换到: ' + tab.label);
	  
	  //1.companyTabsId, 修改公司数组序号id
	  this.companyTabsId = this.companyRange.indexOf(this.companyId);
	  
	  //2. localStorage 将该公司id存储起来, 其他页面也是显示该公司信息
	  localStorage.setItem('companyId', tab.name);
	  console.log('公司id', localStorage.getItem('companyId'));
	  
	  //3. 
	},
	onProjTypeChangeVisable(){
	  if(this.companyTabsId == 0){
		//处理惠正
		
	  }else if(this.companyTabsId == 1){
		//处理智明业务输入框是否显示
		if(this.projDetail.projType>=2100 && this.projDetail.projType <2200){
			//测绘
			return 1;
		}else if(this.projDetail.projType>=2200 && this.projDetail.projType <2300){
			//咨询
			return 2;  
		}  
	  }else if(this.companyTabsId == 2){
		//处理汇正
		
	  }
	},	
	
	pageInfoEdit(){
		//var workbranch_pageinfo = JSON.parse(sessionStorage.getItem('workbranch_pageinfo'));
		var workbranch_pageinfo = JSON.parse(this.global.workbranch_pageinfo);
		if(workbranch_pageinfo){
		  workbranch_pageinfo.status = 1; //更新状态
		  //sessionStorage.setItem('workbranch_pageinfo', JSON.stringify(workbranch_pageinfo));
		  this.global.workbranch_pageinfo = JSON.stringify(workbranch_pageinfo);
		}	
	},
	pageInfoDel(){
		//sessionStorage.removeItem('workbranch_pageinfo');
		
		this.global.workbranch_pageinfo = null;
	}, 
	
	//211207变动 修改projid刷新操作记录
	opRefresh(){
		const tempProjId = this.projDetail.projId;
		this.projDetail.projId = 0;
		setTimeout(()=>{
			this.projDetail.projId = tempProjId;
		},500)
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
	
	//211210变动 query解密
	newContent(data){
	  if(data){
		const key = CryptoJS.enc.Utf8.parse('65201488');
		const iv = CryptoJS.enc.Utf8.parse('45872411');
		var base64str = "";
		try{
		  base64str = CryptoJS.enc.Base64.parse(data);
		}catch(e){
		  return "";
		}
	
		const decrypted = CryptoJS.TripleDES.decrypt(
		  {
			ciphertext: base64str,
		  },
		  key,
		  {
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
		  },
		);
		return decrypted.toString(CryptoJS.enc.Utf8);
	  }
	},
	  
	//处理安排长日期
	changeSche(str){
		return str.length == 21?str.slice(5,11) + str.slice(16,21):str;
	},
	
	expandChange(row,index,e){
	  this.$refs.receipttable.toggleRowExpansion(row)
	},
	
	reflashReceiptList(projId){
		this.getReceiptListData(projId, (rlData)=>{
			//this.receiptList = rlData
			this.getRegisterListData(projId, (relData)=>{
				this.registerList = relData
				
				console.log('rlData', rlData)
				console.log('relData', relData)
				
				//循环得到项目应收费
				var newList = [];
				var newItem = {};
				rlData.forEach((item, index) =>{
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
							newItem.paymentType = '';
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
				});
				
				this.receiptList = newList;
				
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
	
  },
}
</script>

<style scoped>
.card-header {
  font-size: 20px;
}
.el-tag--medium {
  font-size: 16px;
  height: 30px;
  line-height: 30px;
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
  margin: 30px 0 5px 0;
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
  height: 40px;
  line-height: 40px;
  color: #555555;
}
.report-content {
  text-align: center;
  height: 40px;
  line-height: 40px;
  color: #2f2f2f;
}
.workname-left {
  height: 30px;
  margin-top: 15px;
  line-height: 30px;
}


/*表单*/
  /* 
  >>> .el-dialog__body {
    padding: 0px;
    margin: 0;
  }
 */
/* 
  .dialog_body {
    padding: 0px;
    margin: 0;
    overflow: hidden;
    overflow-y: auto;
    max-height: calc(100VH - 85px);  
  }

  .dialog_havefooter{
    max-height: calc(100VH - 165px);  
  }

  .dialog_content {
    
    margin: 0;
    overflow: hidden;
    overflow-y: auto;
    max-height: 100%;
  }

  .dialog-footer{
    text-align: right;
    margin-top: 6px;
  }
  */
</style>