<template>
  <el-dialog
    :visible.sync="visible"
    :show="show"
    title="工作安排"
	:width="dialogWidth"
    center
    @close="onClose()"
	top="30px"
  >
  
  
<!-- =========================惠正========================= -->  
    <el-form
      :model="arrgForm"
      ref="arrgForm"
      :rules="arrgFormRulesHz"
      label-width="150px"
	  v-if="companyTabsId == 0"
    >
      <el-button @click="defaultArrg">默认安排</el-button>
      <el-form-item label="评估方法" prop="assemMethod">
		<!-- 211027 调整: 多选框宽度 -->
        <el-select
		  class="select-width-50"
          v-if="projType == 1010 || projType == 1041"
          v-model="arrgForm.assemMethod"
          multiple
          filterable
          allow-create
          placeholder="请选择评估方法"
        >
          <el-option
            v-for="item in assemMethodOptionsFc"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <el-select
		  class="select-width-50"
          v-if="projType == 1020 || projType == 1042"
          v-model="arrgForm.assemMethod"
          multiple
          filterable
          allow-create
          placeholder="请选择评估方法"
        >
          <el-option
            v-for="item in assemMethodOptionsZc"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <el-select
		  class="select-width-50"
          v-if="projType == 1030 || projType == 1043"
          v-model="arrgForm.assemMethod"
          multiple
          filterable
          allow-create
          placeholder="请选择评估方法"
        >
          <el-option
            v-for="item in assemMethodOptionsTd"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <el-select
		  class="select-width-50"
          v-if="projType != 1010 && projType != 1020 && projType != 1030 && projType != 1041 && projType != 1042 && projType != 1043 "
          v-model="arrgForm.assemMethod"
          multiple
          filterable
          allow-create
          placeholder="请选择评估方法"
        >
          <el-option
            v-for="item in assemMethodOptionsNr"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <div style="color: red">
          Tips:选项中没有的评估方法可直接在框内输入创建
        </div>
      </el-form-item>
      <el-form-item label="现场勘查内容">
        <el-input
          v-model="arrgForm.fldSrvyContent"
          type="textarea"
          rows="2"
        ></el-input>
      </el-form-item>

      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="前期准备" prop="prePreparationSche">
            <el-date-picker
              style="width: 100%"
              v-model="arrgForm.prePreparationSche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="yyyy/MM/dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item prop="prePreparationPic" label="责任人">
            <el-checkbox-group
              v-model="arrgForm.prePreparationPic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="现场勘查及收集资料" prop="fldSrvySche">
            <el-date-picker
              style="width: 100%"
              v-model="arrgForm.fldSrvySche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="yyyy/MM/dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="责任人" prop="fldSrvyPic">
            <el-checkbox-group
              v-model="arrgForm.fldSrvyPic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="市场调查询价记录" prop="mktSrvySche">
            <el-date-picker
              style="width: 100%"
              v-model="arrgForm.mktSrvySche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="yyyy/MM/dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="责任人" prop="mktSrvyPic">
            <el-checkbox-group
              v-model="arrgForm.mktSrvyPic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="评定估算" prop="assemEstSche">
            <el-date-picker
              style="width: 100%"
              v-model="arrgForm.assemEstSche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="yyyy/MM/dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="责任人" prop="assemEstPic">
            <el-checkbox-group
              v-model="arrgForm.assemEstPic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="编制出具报告" prop="issueValSche">
            <el-date-picker
              style="width: 100%"
              v-model="arrgForm.issueValSche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="yyyy/MM/dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="责任人" prop="issueValPic">
            <el-checkbox-group
              v-model="arrgForm.issueValPic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="内部三级审核" prop="internalAuditSche">
            <el-date-picker
              style="width: 100%"
              v-model="arrgForm.internalAuditSche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="yyyy/MM/dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="责任人" prop="internalAuditPic">
            <el-checkbox-group
              v-model="arrgForm.internalAuditPic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="与委托人沟通" prop="commuClientSche">
            <el-date-picker
              style="width: 100%"
              v-model="arrgForm.commuClientSche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="yyyy/MM/dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="责任人" prop="commuClientPic">
            <el-checkbox-group
              v-model="arrgForm.commuClientPic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="评估收费" prop="assemChargeSche">
            <!-- <el-date-picker
              style="width: 100%"
              v-model="arrgForm.assemChargeSche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="yyyy/MM/dd"
            ></el-date-picker> -->
            <el-input
              v-model="arrgForm.assemChargeSche"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="责任人" prop="assemChargePic">
            <el-checkbox-group
              v-model="arrgForm.assemChargePic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="修正定稿及提交报告" prop="amendFinalSche">
            <el-date-picker
              style="width: 100%"
              v-model="arrgForm.amendFinalSche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="yyyy/MM/dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="责任人" prop="amendFinalPic">
            <el-checkbox-group
              v-model="arrgForm.amendFinalPic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="工作底稿归档" prop="manuArchiveSche">
            <!-- <el-date-picker
              style="width: 100%"
              v-model="arrgForm.manuArchiveSche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="yyyy/MM/dd"
            ></el-date-picker> -->
            <el-input
              v-model="arrgForm.manuArchiveSche"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="责任人" prop="manuArchivePic">
            <el-checkbox-group
              v-model="arrgForm.manuArchivePic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button type="primary" @click="onSubmitWorkArrg()">提交</el-button>
      <el-button type="text" @click="onClose()">取消</el-button>
    </el-form>
	
<!-- =========================智明========================= -->  
	<!-- =========================测绘========================= --> 
    <el-form
      :model="arrgForm"
      ref="arrgForm"
      :rules="arrgFormRulesCh"
      label-width="150px"
	  v-if="companyTabsId == 1 && (projType >=2100 && projType <2200)"
    >
      <el-button @click="defaultArrg">默认安排</el-button>
      <el-form-item label="测绘方法" prop="assemMethod">
		<!-- 211027 调整: 多选框宽度 -->
        <el-select
		  class="select-width-50"
          v-model="arrgForm.assemMethod"
          multiple
          filterable
          allow-create
          placeholder="请选择测绘方法"
        >
          <el-option
            v-for="item in assemMethodOptionsCh"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <div style="color: red">
          Tips:选项中没有的测绘方法可直接在框内输入创建
        </div>
      </el-form-item>
	  <!-- 
      <el-form-item label="现场测绘内容">
        <el-input
          v-model="arrgForm.fldSrvyContent"
          type="textarea"
          rows="2"
        ></el-input>
      </el-form-item>
	  -->

      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="收集及整理资料" prop="prePreparationSche">
            <el-date-picker
              style="width: 100%"
              v-model="arrgForm.prePreparationSche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="MM/dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item prop="prePreparationPic" label="责任人">
            <el-checkbox-group
              v-model="arrgForm.prePreparationPic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="制定测绘技术路线" prop="workPlanSche">
            <el-date-picker
              style="width: 100%"
              v-model="arrgForm.workPlanSche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="MM/dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="责任人" prop="workPlanPic">
            <el-checkbox-group
              v-model="arrgForm.workPlanPic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="外业" prop="fldSrvySche">
            <el-date-picker
              style="width: 100%"
              v-model="arrgForm.fldSrvySche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="MM/dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="责任人" prop="fldSrvyPic">
            <el-checkbox-group
              v-model="arrgForm.fldSrvyPic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="内业制图" prop="drawingSche">
            <el-date-picker
              style="width: 100%"
              v-model="arrgForm.drawingSche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="MM/dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="责任人" prop="drawingPic">
            <el-checkbox-group
              v-model="arrgForm.drawingPic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="编制测绘报告" prop="issueValSche">
            <el-date-picker
              style="width: 100%"
              v-model="arrgForm.issueValSche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="MM/dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="责任人" prop="issueValPic">
            <el-checkbox-group
              v-model="arrgForm.issueValPic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="内部审核" prop="internalAuditSche">
            <el-date-picker
              style="width: 100%"
              v-model="arrgForm.internalAuditSche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="MM/dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="责任人" prop="internalAuditPic">
            <el-checkbox-group
              v-model="arrgForm.internalAuditPic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="与委托方沟通" prop="commuClientSche">
            <el-date-picker
              style="width: 100%"
              v-model="arrgForm.commuClientSche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="MM/dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="责任人" prop="commuClientPic">
            <el-checkbox-group
              v-model="arrgForm.commuClientPic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="测绘收费" prop="assemChargeSche">
            <!-- <el-date-picker
              style="width: 100%"
              v-model="arrgForm.assemChargeSche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="MM/dd"
            ></el-date-picker> -->
            <el-input
              v-model="arrgForm.assemChargeSche"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="责任人" prop="assemChargePic">
            <el-checkbox-group
              v-model="arrgForm.assemChargePic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="修正定稿及提交报告" prop="amendFinalSche">
            <el-date-picker
              style="width: 100%"
              v-model="arrgForm.amendFinalSche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="MM/dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="责任人" prop="amendFinalPic">
            <el-checkbox-group
              v-model="arrgForm.amendFinalPic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">
          <el-form-item label="工作底稿归档" prop="manuArchiveSche">
            <!-- <el-date-picker
              style="width: 100%"
              v-model="arrgForm.manuArchiveSche"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              value-format="MM/dd"
            ></el-date-picker> -->
            <el-input
              v-model="arrgForm.manuArchiveSche"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="责任人" prop="manuArchivePic">
            <el-checkbox-group
              v-model="arrgForm.manuArchivePic"
              style="width: 100%"
            >
              <el-checkbox-button
                v-for="item in projMember"
                :key="item"
                :label="item"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button type="primary" @click="onSubmitWorkArrg()">提交</el-button>
      <el-button type="text" @click="onClose()">取消</el-button>
    </el-form>	
	
	<!-- =========================咨询========================= --> 
	<el-form
	  :model="arrgForm"
	  ref="arrgForm"
	  :rules="arrgFormRulesZx"
	  label-width="150px"
	  v-if="companyTabsId == 1 && (projType >=2200 && projType <2300)"
	>
	  <el-button @click="defaultArrg">默认安排</el-button>
	  <!-- 
	  <el-form-item label="咨询方法" prop="assemMethod">
	    <el-select
		  class="select-width-50"
	      v-model="arrgForm.assemMethod"
	      multiple
	      filterable
	      allow-create
	      placeholder="请选择咨询方法"
	    >
	      <el-option
	        v-for="item in assemMethodOptionsZx"
	        :key="item"
	        :label="item"
	        :value="item"
	      ></el-option>
	    </el-select>
	    <div style="color: red">
	      Tips:选项中没有的咨询方法可直接在框内输入创建
	    </div>
	  </el-form-item>
	  <el-form-item label="现场内容">
	    <el-input
	      v-model="arrgForm.fldSrvyContent"
	      type="textarea"
	      rows="2"
	    ></el-input>
	  </el-form-item>
	  -->
	  <el-row :gutter="10">
	    <el-col :span="10">
	      <el-form-item label="前期准备、明确需求" prop="prePreparationSche">
	        <el-date-picker
	          style="width: 100%"
	          v-model="arrgForm.prePreparationSche"
	          type="daterange"
	          range-separator="至"
	          start-placeholde="开始日期"
	          end-placeholde="结束日期"
	          value-format="MM/dd"
	        ></el-date-picker>
	      </el-form-item>
	    </el-col>
	    <el-col :span="14">
	      <el-form-item prop="prePreparationPic" label="责任人">
	        <el-checkbox-group
	          v-model="arrgForm.prePreparationPic"
	          style="width: 100%"
	        >
	          <el-checkbox-button
	            v-for="item in projMember"
	            :key="item"
	            :label="item"
	          ></el-checkbox-button>
	        </el-checkbox-group>
	      </el-form-item>
	    </el-col>
	  </el-row>	
	  <el-row :gutter="10">
	    <el-col :span="10">
	      <el-form-item label="制定工作方案" prop="workPlanSche">
	        <el-date-picker
	          style="width: 100%"
	          v-model="arrgForm.workPlanSche"
	          type="daterange"
	          range-separator="至"
	          start-placeholde="开始日期"
	          end-placeholde="结束日期"
	          value-format="MM/dd"
	        ></el-date-picker>
	      </el-form-item>
	    </el-col>
	    <el-col :span="14">
	      <el-form-item label="责任人" prop="workPlanPic">
	        <el-checkbox-group
	          v-model="arrgForm.workPlanPic"
	          style="width: 100%"
	        >
	          <el-checkbox-button
	            v-for="item in projMember"
	            :key="item"
	            :label="item"
	          ></el-checkbox-button>
	        </el-checkbox-group>
	      </el-form-item>
	    </el-col>
	  </el-row>
	  <el-row :gutter="10">
	    <el-col :span="10">
	      <el-form-item label="资料收集" prop="dataCollectionSche">
	        <el-date-picker
	          style="width: 100%"
	          v-model="arrgForm.dataCollectionSche"
	          type="daterange"
	          range-separator="至"
	          start-placeholde="开始日期"
	          end-placeholde="结束日期"
	          value-format="MM/dd"
	        ></el-date-picker>
	      </el-form-item>
	    </el-col>
	    <el-col :span="14">
	      <el-form-item label="责任人" prop="dataCollectionPic">
	        <el-checkbox-group
	          v-model="arrgForm.dataCollectionPic"
	          style="width: 100%"
	        >
	          <el-checkbox-button
	            v-for="item in projMember"
	            :key="item"
	            :label="item"
	          ></el-checkbox-button>
	        </el-checkbox-group>
	      </el-form-item>
	    </el-col>
	  </el-row>	
	  <el-row :gutter="10">
	    <el-col :span="10">
	      <el-form-item label="现场调研" prop="fldSrvySche">
	        <el-date-picker
	          style="width: 100%"
	          v-model="arrgForm.fldSrvySche"
	          type="daterange"
	          range-separator="至"
	          start-placeholde="开始日期"
	          end-placeholde="结束日期"
	          value-format="MM/dd"
	        ></el-date-picker>
	      </el-form-item>
	    </el-col>
	    <el-col :span="14">
	      <el-form-item label="责任人" prop="fldSrvyPic">
	        <el-checkbox-group
	          v-model="arrgForm.fldSrvyPic"
	          style="width: 100%"
	        >
	          <el-checkbox-button
	            v-for="item in projMember"
	            :key="item"
	            :label="item"
	          ></el-checkbox-button>
	        </el-checkbox-group>
	      </el-form-item>
	    </el-col>
	  </el-row>
	
	  <el-row :gutter="10">
	    <el-col :span="10">
	      <el-form-item label="市场调查询价" prop="mktSrvySche">
	        <el-date-picker
	          style="width: 100%"
	          v-model="arrgForm.mktSrvySche"
	          type="daterange"
	          range-separator="至"
	          start-placeholde="开始日期"
	          end-placeholde="结束日期"
	          value-format="MM/dd"
	        ></el-date-picker>
	      </el-form-item>
	    </el-col>
	    <el-col :span="14">
	      <el-form-item label="责任人" prop="mktSrvyPic">
	        <el-checkbox-group
	          v-model="arrgForm.mktSrvyPic"
	          style="width: 100%"
	        >
	          <el-checkbox-button
	            v-for="item in projMember"
	            :key="item"
	            :label="item"
	          ></el-checkbox-button>
	        </el-checkbox-group>
	      </el-form-item>
	    </el-col>
	  </el-row>		
	  <el-row :gutter="10">
	    <el-col :span="10">
	      <el-form-item label="撰写报告" prop="issueValSche">
	        <el-date-picker
	          style="width: 100%"
	          v-model="arrgForm.issueValSche"
	          type="daterange"
	          range-separator="至"
	          start-placeholde="开始日期"
	          end-placeholde="结束日期"
	          value-format="MM/dd"
	        ></el-date-picker>
	      </el-form-item>
	    </el-col>
	    <el-col :span="14">
	      <el-form-item label="责任人" prop="issueValPic">
	        <el-checkbox-group
	          v-model="arrgForm.issueValPic"
	          style="width: 100%"
	        >
	          <el-checkbox-button
	            v-for="item in projMember"
	            :key="item"
	            :label="item"
	          ></el-checkbox-button>
	        </el-checkbox-group>
	      </el-form-item>
	    </el-col>
	  </el-row>
	
	  <el-row :gutter="10">
	    <el-col :span="10">
	      <el-form-item label="三级审核" prop="internalAuditSche">
	        <el-date-picker
	          style="width: 100%"
	          v-model="arrgForm.internalAuditSche"
	          type="daterange"
	          range-separator="至"
	          start-placeholde="开始日期"
	          end-placeholde="结束日期"
	          value-format="MM/dd"
	        ></el-date-picker>
	      </el-form-item>
	    </el-col>
	    <el-col :span="14">
	      <el-form-item label="责任人" prop="internalAuditPic">
	        <el-checkbox-group
	          v-model="arrgForm.internalAuditPic"
	          style="width: 100%"
	        >
	          <el-checkbox-button
	            v-for="item in projMember"
	            :key="item"
	            :label="item"
	          ></el-checkbox-button>
	        </el-checkbox-group>
	      </el-form-item>
	    </el-col>
	  </el-row>
	
	  <el-row :gutter="10">
	    <el-col :span="10">
	      <el-form-item label="与委托方沟通" prop="commuClientSche">
	        <el-date-picker
	          style="width: 100%"
	          v-model="arrgForm.commuClientSche"
	          type="daterange"
	          range-separator="至"
	          start-placeholde="开始日期"
	          end-placeholde="结束日期"
	          value-format="MM/dd"
	        ></el-date-picker>
	      </el-form-item>
	    </el-col>
	    <el-col :span="14">
	      <el-form-item label="责任人" prop="commuClientPic">
	        <el-checkbox-group
	          v-model="arrgForm.commuClientPic"
	          style="width: 100%"
	        >
	          <el-checkbox-button
	            v-for="item in projMember"
	            :key="item"
	            :label="item"
	          ></el-checkbox-button>
	        </el-checkbox-group>
	      </el-form-item>
	    </el-col>
	  </el-row>
	
	  <el-row :gutter="10">
	    <el-col :span="10">
	      <el-form-item label="报告收费" prop="assemChargeSche">
	        <!-- <el-date-picker
	          style="width: 100%"
	          v-model="arrgForm.assemChargeSche"
	          type="daterange"
	          range-separator="至"
	          start-placeholde="开始日期"
	          end-placeholde="结束日期"
	          value-format="MM/dd"
	        ></el-date-picker> -->
	        <el-input
	          v-model="arrgForm.assemChargeSche"
	          :disabled="true"
	        ></el-input>
	      </el-form-item>
	    </el-col>
	    <el-col :span="14">
	      <el-form-item label="责任人" prop="assemChargePic">
	        <el-checkbox-group
	          v-model="arrgForm.assemChargePic"
	          style="width: 100%"
	        >
	          <el-checkbox-button
	            v-for="item in projMember"
	            :key="item"
	            :label="item"
	          ></el-checkbox-button>
	        </el-checkbox-group>
	      </el-form-item>
	    </el-col>
	  </el-row>
	
	  <el-row :gutter="10">
	    <el-col :span="10">
	      <el-form-item label="出具正式报告" prop="amendFinalSche">
	        <el-date-picker
	          style="width: 100%"
	          v-model="arrgForm.amendFinalSche"
	          type="daterange"
	          range-separator="至"
	          start-placeholde="开始日期"
	          end-placeholde="结束日期"
	          value-format="MM/dd"
	        ></el-date-picker>
	      </el-form-item>
	    </el-col>
	    <el-col :span="14">
	      <el-form-item label="责任人" prop="amendFinalPic">
	        <el-checkbox-group
	          v-model="arrgForm.amendFinalPic"
	          style="width: 100%"
	        >
	          <el-checkbox-button
	            v-for="item in projMember"
	            :key="item"
	            :label="item"
	          ></el-checkbox-button>
	        </el-checkbox-group>
	      </el-form-item>
	    </el-col>
	  </el-row>
	
	  <el-row :gutter="10">
	    <el-col :span="10">
	      <el-form-item label="整理归档" prop="manuArchiveSche">
	        <!-- <el-date-picker
	          style="width: 100%"
	          v-model="arrgForm.manuArchiveSche"
	          type="daterange"
	          range-separator="至"
	          start-placeholde="开始日期"
	          end-placeholde="结束日期"
	          value-format="MM/dd"
	        ></el-date-picker> -->
	        <el-input
	          v-model="arrgForm.manuArchiveSche"
	          :disabled="true"
	        ></el-input>
	      </el-form-item>
	    </el-col>
	    <el-col :span="14">
	      <el-form-item label="责任人" prop="manuArchivePic">
	        <el-checkbox-group
	          v-model="arrgForm.manuArchivePic"
	          style="width: 100%"
	        >
	          <el-checkbox-button
	            v-for="item in projMember"
	            :key="item"
	            :label="item"
	          ></el-checkbox-button>
	        </el-checkbox-group>
	      </el-form-item>
	    </el-col>
	  </el-row>
	  <el-button type="primary" @click="onSubmitWorkArrg()">提交</el-button>
	  <el-button type="text" @click="onClose()">取消</el-button>
	</el-form>
		
		
<!-- =========================汇正========================= -->
	<el-form
	  :model="arrgForm"
	  ref="arrgForm"
	  :rules="arrgFormRulesKj"
	  label-width="150px"
	  v-if="companyTabsId == 2"
	>
	  <el-button @click="defaultArrg">默认安排</el-button>
	  <!-- 
	  <el-form-item label="审计方法" prop="assemMethod">
	    <el-select
		  class="select-width-50"
	      v-model="arrgForm.assemMethod"
	      multiple
	      filterable
	      allow-create
	      placeholder="请选择审计方法"
	    >
	      <el-option
	        v-for="item in assemMethodOptionsKj"
	        :key="item"
	        :label="item"
	        :value="item"
	      ></el-option>
	    </el-select>
	    <div style="color: red">
	      Tips:选项中没有的审计方法可直接在框内输入创建
	    </div>
	  </el-form-item>
	  <el-form-item label="现场内容">
	    <el-input
	      v-model="arrgForm.fldSrvyContent"
	      type="textarea"
	      rows="2"
	    ></el-input>
	  </el-form-item>
	  -->
	  <el-row :gutter="10">
	    <el-col :span="10">
	      <el-form-item label="收集及整理资料" prop="dataCollectionSche">
	        <el-date-picker
	          style="width: 100%"
	          v-model="arrgForm.dataCollectionSche"
	          type="daterange"
	          range-separator="至"
	          start-placeholde="开始日期"
	          end-placeholde="结束日期"
	          value-format="MM/dd"
	        ></el-date-picker>
	      </el-form-item>
	    </el-col>
	    <el-col :span="14">
	      <el-form-item prop="dataCollectionPic" label="责任人">
	        <el-checkbox-group
	          v-model="arrgForm.dataCollectionPic"
	          style="width: 100%"
	        >
	          <el-checkbox-button
	            v-for="item in projMember"
	            :key="item"
	            :label="item"
	          ></el-checkbox-button>
	        </el-checkbox-group>
	      </el-form-item>
	    </el-col>
	  </el-row>	
	  <el-row :gutter="10">
	    <el-col :span="10">
	      <el-form-item label="制定审计方案" prop="workPlanSche">
	        <el-date-picker
	          style="width: 100%"
	          v-model="arrgForm.workPlanSche"
	          type="daterange"
	          range-separator="至"
	          start-placeholde="开始日期"
	          end-placeholde="结束日期"
	          value-format="MM/dd"
	        ></el-date-picker>
	      </el-form-item>
	    </el-col>
	    <el-col :span="14">
	      <el-form-item label="责任人" prop="workPlanPic">
	        <el-checkbox-group
	          v-model="arrgForm.workPlanPic"
	          style="width: 100%"
	        >
	          <el-checkbox-button
	            v-for="item in projMember"
	            :key="item"
	            :label="item"
	          ></el-checkbox-button>
	        </el-checkbox-group>
	      </el-form-item>
	    </el-col>
	  </el-row>
	  <el-row :gutter="10">
	    <el-col :span="10">
	      <el-form-item label="开展审计工作" prop="fldSrvySche">
	        <el-date-picker
	          style="width: 100%"
	          v-model="arrgForm.fldSrvySche"
	          type="daterange"
	          range-separator="至"
	          start-placeholde="开始日期"
	          end-placeholde="结束日期"
	          value-format="MM/dd"
	        ></el-date-picker>
	      </el-form-item>
	    </el-col>
	    <el-col :span="14">
	      <el-form-item label="责任人" prop="fldSrvyPic">
	        <el-checkbox-group
	          v-model="arrgForm.fldSrvyPic"
	          style="width: 100%"
	        >
	          <el-checkbox-button
	            v-for="item in projMember"
	            :key="item"
	            :label="item"
	          ></el-checkbox-button>
	        </el-checkbox-group>
	      </el-form-item>
	    </el-col>
	  </el-row>	
	  <el-row :gutter="10">
	    <el-col :span="10">
	      <el-form-item label="编制审计报告" prop="issueValSche">
	        <el-date-picker
	          style="width: 100%"
	          v-model="arrgForm.issueValSche"
	          type="daterange"
	          range-separator="至"
	          start-placeholde="开始日期"
	          end-placeholde="结束日期"
	          value-format="MM/dd"
	        ></el-date-picker>
	      </el-form-item>
	    </el-col>
	    <el-col :span="14">
	      <el-form-item label="责任人" prop="issueValPic">
	        <el-checkbox-group
	          v-model="arrgForm.issueValPic"
	          style="width: 100%"
	        >
	          <el-checkbox-button
	            v-for="item in projMember"
	            :key="item"
	            :label="item"
	          ></el-checkbox-button>
	        </el-checkbox-group>
	      </el-form-item>
	    </el-col>
	  </el-row>
	
	  <el-row :gutter="10">
	    <el-col :span="10">
	      <el-form-item label="内部审核" prop="internalAuditSche">
	        <el-date-picker
	          style="width: 100%"
	          v-model="arrgForm.internalAuditSche"
	          type="daterange"
	          range-separator="至"
	          start-placeholde="开始日期"
	          end-placeholde="结束日期"
	          value-format="MM/dd"
	        ></el-date-picker>
	      </el-form-item>
	    </el-col>
	    <el-col :span="14">
	      <el-form-item label="责任人" prop="internalAuditPic">
	        <el-checkbox-group
	          v-model="arrgForm.internalAuditPic"
	          style="width: 100%"
	        >
	          <el-checkbox-button
	            v-for="item in projMember"
	            :key="item"
	            :label="item"
	          ></el-checkbox-button>
	        </el-checkbox-group>
	      </el-form-item>
	    </el-col>
	  </el-row>
	
	  <el-row :gutter="10">
	    <el-col :span="10">
	      <el-form-item label="与委托方沟通" prop="commuClientSche">
	        <el-date-picker
	          style="width: 100%"
	          v-model="arrgForm.commuClientSche"
	          type="daterange"
	          range-separator="至"
	          start-placeholde="开始日期"
	          end-placeholde="结束日期"
	          value-format="MM/dd"
	        ></el-date-picker>
	      </el-form-item>
	    </el-col>
	    <el-col :span="14">
	      <el-form-item label="责任人" prop="commuClientPic">
	        <el-checkbox-group
	          v-model="arrgForm.commuClientPic"
	          style="width: 100%"
	        >
	          <el-checkbox-button
	            v-for="item in projMember"
	            :key="item"
	            :label="item"
	          ></el-checkbox-button>
	        </el-checkbox-group>
	      </el-form-item>
	    </el-col>
	  </el-row>
	
	  <el-row :gutter="10">
	    <el-col :span="10">
	      <el-form-item label="审计收费" prop="assemChargeSche">
	        <!-- <el-date-picker
	          style="width: 100%"
	          v-model="arrgForm.assemChargeSche"
	          type="daterange"
	          range-separator="至"
	          start-placeholde="开始日期"
	          end-placeholde="结束日期"
	          value-format="MM/dd"
	        ></el-date-picker> -->
	        <el-input
	          v-model="arrgForm.assemChargeSche"
	          :disabled="true"
	        ></el-input>
	      </el-form-item>
	    </el-col>
	    <el-col :span="14">
	      <el-form-item label="责任人" prop="assemChargePic">
	        <el-checkbox-group
	          v-model="arrgForm.assemChargePic"
	          style="width: 100%"
	        >
	          <el-checkbox-button
	            v-for="item in projMember"
	            :key="item"
	            :label="item"
	          ></el-checkbox-button>
	        </el-checkbox-group>
	      </el-form-item>
	    </el-col>
	  </el-row>
	
	  <el-row :gutter="10">
	    <el-col :span="10">
	      <el-form-item label="修正定稿及提交报告" prop="amendFinalSche">
	        <el-date-picker
	          style="width: 100%"
	          v-model="arrgForm.amendFinalSche"
	          type="daterange"
	          range-separator="至"
	          start-placeholde="开始日期"
	          end-placeholde="结束日期"
	          value-format="MM/dd"
	        ></el-date-picker>
	      </el-form-item>
	    </el-col>
	    <el-col :span="14">
	      <el-form-item label="责任人" prop="amendFinalPic">
	        <el-checkbox-group
	          v-model="arrgForm.amendFinalPic"
	          style="width: 100%"
	        >
	          <el-checkbox-button
	            v-for="item in projMember"
	            :key="item"
	            :label="item"
	          ></el-checkbox-button>
	        </el-checkbox-group>
	      </el-form-item>
	    </el-col>
	  </el-row>
	
	  <el-row :gutter="10">
	    <el-col :span="10">
	      <el-form-item label="工作底稿归档" prop="manuArchiveSche">
	        <!-- <el-date-picker
	          style="width: 100%"
	          v-model="arrgForm.manuArchiveSche"
	          type="daterange"
	          range-separator="至"
	          start-placeholde="开始日期"
	          end-placeholde="结束日期"
	          value-format="MM/dd"
	        ></el-date-picker> -->
	        <el-input
	          v-model="arrgForm.manuArchiveSche"
	          :disabled="true"
	        ></el-input>
	      </el-form-item>
	    </el-col>
	    <el-col :span="14">
	      <el-form-item label="责任人" prop="manuArchivePic">
	        <el-checkbox-group
	          v-model="arrgForm.manuArchivePic"
	          style="width: 100%"
	        >
	          <el-checkbox-button
	            v-for="item in projMember"
	            :key="item"
	            :label="item"
	          ></el-checkbox-button>
	        </el-checkbox-group>
	      </el-form-item>
	    </el-col>
	  </el-row>
	  <el-button type="primary" @click="onSubmitWorkArrg()">提交</el-button>
	  <el-button type="text" @click="onClose()">取消</el-button>
	</el-form>	
	
  </el-dialog>
</template>

<script>
import { setWorkAssignment, getWorkAssignment } from '@/api/index';
import { Form } from 'element-ui';
export default {
  name: 'WorkArrgDialog',
  inject: ['reload'],
  props: {
    show: { type: Boolean, default: false },
    arrgEdit: { type: Boolean, default: false },
    arrgData: { type: Object },
    projId: { type: Number },
    subProjId: { type: String },
    projType: { type: Number },
    projMember: { type: Array },
    baseDate: { type: Number },
    auditPeriodStart: { type: Number },
    auditPeriodEnd: { type: Number },
    projLeader: { type: String },
    projReviewer: { type: String },
    projProReviewer: { type: String },
    projAsst: { type: String },
    fieldSrvy: { type: String }
  },
  watch: {
    show: {
      immediate: true,
      handler(show) {
        this.visible = this.show;
        //this.arrgForm.projId = this.projId;
        if (show == true) {
          this.checkData();
        }
      }
    }
    // arrgEdit: {
    //   immediate: true,
    //   handler(arrgEdit) {
    //     console.log('成！！！！', arrgEdit)
    //     console.log('施恩', this.arrgData)
    //   }
    // }
  },
  data() {
    return {
      visible: this.show,
	  arrgForm: {}, //公共表单
	  dialogWidth: '1100px',
	  
	  //211101变动 新增: 多个公司切换
	  companyRange:['HZ', 'ZM','HZKJ'],
	  companyId:'',
	  companyTabsId: 0,
	  
	  tabsDisable:true,	 
	  
	  //惠正
	  arrgFormHZ: {
	    projId: '',
		subProjId: '',
	    assemMethod: '',
	    fldSrvyContent: '',
	    //人员
	    prePreparationPic: [], //前期准备
	    fldSrvyPic: [], //现场勘查及收集资料
	    mktSrvyPic: [], //市场调查询价记录
	    assemEstPic: [], //评定估算
	    issueValPic: [], //编制出具报告
	    internalAuditPic: [], //内部三级审核
	    commuClientPic: [], //与委托人沟通
	    assemChargePic: [], //评估收费
	    amendFinalPic: [], //修正定稿及提交报告
	    manuArchivePic: [], //工作底稿归档
	    //日期
	    prePreparationSche: [],
	    fldSrvySche: [],
	    mktSrvySche: [],
	    assemEstSche: [],
	    issueValSche: [],
	    internalAuditSche: [],
	    commuClientSche: [],
	    assemChargeSche: '出具正式报告时',
	    amendFinalSche: [],
	    manuArchiveSche: '出正评后3个月内'
	  },
	  
	  assemMethodOptionsNr: ['成本法', '收益法', '市场法'],
	  assemMethodOptionsZc: ['成本法', '收益法', '市场法', '实物期权法'],
	  assemMethodOptionsFc: [
	    '成本法',
	    '剩余法',
	    '市场比较法',
	    '收益法',
	    '假设开发法',
	    '公示地价系数修正法'
	  ],
	  assemMethodOptionsTd: [
	    '市场比较法',
	    '收益还原法',
	    '剩余法',
	    '成本逼近法',
	    '基准地价系数修正法'
	  ],
	  arrgFormRulesHz: {
	    assemMethod: [
	      { required: true, message: '请填写评估方法', trigger: 'change' }
	    ],
	    prePreparationSche: [
	      { required: true, message: '请选择日期', trigger: 'change' }
	    ],
	    fldSrvySche: [
	      { required: true, message: '请选择日期', trigger: 'change' }
	    ],
	    mktSrvySche: [
	      { required: true, message: '请选择日期', trigger: 'change' }
	    ],
	    assemEstSche: [
	      { required: true, message: '请选择日期', trigger: 'change' }
	    ],
	    issueValSche: [
	      { required: true, message: '请选择日期', trigger: 'change' }
	    ],
	    internalAuditSche: [
	      { required: true, message: '请选择日期', trigger: 'change' }
	    ],
	    commuClientSche: [
	      { required: true, message: '请选择日期', trigger: 'change' }
	    ],
	    amendFinalSche: [
	      { required: true, message: '请选择日期', trigger: 'change' }
	    ],
	    //
	    prePreparationPic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ],
	    fldSrvyPic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ],
	    mktSrvyPic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ],
	    assemEstPic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ],
	    issueValPic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ],
	    internalAuditPic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ],
	    commuClientPic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ],
	    assemChargePic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ],
	    amendFinalPic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ],
	    manuArchivePic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ]
	  },
	  	  
	  //智明
	  arrgFormZMCH: {
	    projId: '',
		subProjId: '',
	    assemMethod: '',
	    fldSrvyContent: '',
	    //人员
	    prePreparationPic: [], //收集及整理资料
		workPlanPic: [], //制定测绘技术路线
	    fldSrvyPic: [], //外业
		drawingPic: [], //内业制图
	    //mktSrvyPic: [], //市场调查询价记录
	    //assemEstPic: [], //评定估算
	    issueValPic: [], //编制测绘报告
	    internalAuditPic: [], //内部审核
	    commuClientPic: [], //与委托人沟通
	    assemChargePic: [], //评估收费
	    amendFinalPic: [], //修正定稿及提交报告
	    manuArchivePic: [], //工作底稿归档
	    //日期
	    prePreparationSche: [],
		workPlanSche: [], //制定测绘技术路线
	    fldSrvySche: [],
		drawingSche: [], //内业制图
	    //mktSrvySche: [],
	    //assemEstSche: [],
	    issueValSche: [],
	    internalAuditSche: [],
	    commuClientSche: [],
	    assemChargeSche: '出具正式报告时',
	    amendFinalSche: [],
	    manuArchiveSche: '出正评后3个月内'
	  },
	  arrgFormZMZX: {
	    projId: '',
		subProjId: '',
	    assemMethod: '',
	    fldSrvyContent: '',
	    //人员
	    prePreparationPic: [], //前期准备、明确需求
		workPlanPic: [], //制定工作方案
		dataCollectionPic: [], //资料收集
	    fldSrvyPic: [], //现场调研
	    mktSrvyPic: [], //市场调查询价
	    //assemEstPic: [], //评定估算
	    issueValPic: [], //撰写报告
	    internalAuditPic: [], //三级审核
	    commuClientPic: [], //与委托方沟通
	    assemChargePic: [], //报告收费
	    amendFinalPic: [], //出具正式报告
	    manuArchivePic: [], //整理归档
	    //日期
	    prePreparationSche: [],
		workPlanSche: [], 
		dataCollectionSche: [],
	    fldSrvySche: [],
	    mktSrvySche: [],
	    //assemEstSche: [],
	    issueValSche: [],
	    internalAuditSche: [],
	    commuClientSche: [],
	    assemChargeSche: '出具正式报告时',
	    amendFinalSche: [],
	    manuArchiveSche: '出正评后3个月内'
	  },
	  assemMethodOptionsCh: ['方法1', '方法2', '方法3'],
	  assemMethodOptionsZx: ['方法1', '方法2', '方法3', '方法4'],
	  
	  arrgFormRulesCh: {
	    assemMethod: [
	      { required: true, message: '请填写测绘方法', trigger: 'change' }
	    ],
	    prePreparationSche: [
	      { required: true, message: '请选择日期', trigger: 'change' }
	    ],
	    workPlanSche: [
	      { required: true, message: '请选择日期', trigger: 'change' }
	    ],
	    fldSrvySche: [
	      { required: true, message: '请选择日期', trigger: 'change' }
	    ],
	    drawingSche: [
	      { required: true, message: '请选择日期', trigger: 'change' }
	    ],
	    issueValSche: [
	      { required: true, message: '请选择日期', trigger: 'change' }
	    ],
	    internalAuditSche: [
	      { required: true, message: '请选择日期', trigger: 'change' }
	    ],
	    commuClientSche: [
	      { required: true, message: '请选择日期', trigger: 'change' }
	    ],
	    amendFinalSche: [
	      { required: true, message: '请选择日期', trigger: 'change' }
	    ],
	    //
	    prePreparationPic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ],
	    workPlanPic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ],
	    fldSrvyPic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ],
	    drawingPic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ],
	    issueValPic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ],
	    internalAuditPic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ],
	    commuClientPic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ],
	    assemChargePic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ],
	    amendFinalPic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ],
	    manuArchivePic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ]
	  },
	  arrgFormRulesZx: {
		/* 
		assemMethod: [
		  { required: true, message: '请填写咨询方法', trigger: 'change' }
		],
		*/
		prePreparationSche: [
		  { required: true, message: '请选择日期', trigger: 'change' }
		],
		workPlanSche: [
		  { required: true, message: '请选择日期', trigger: 'change' }
		],
		dataCollectionSche: [
		  { required: true, message: '请选择日期', trigger: 'change' }
		],
		/* 
		fldSrvySche: [
		  { required: true, message: '请选择日期', trigger: 'change' }
		],
		mktSrvySche: [
		  { required: true, message: '请选择日期', trigger: 'change' }
		],
		*/
		issueValSche: [
		  { required: true, message: '请选择日期', trigger: 'change' }
		],
		internalAuditSche: [
		  { required: true, message: '请选择日期', trigger: 'change' }
		],
		commuClientSche: [
		  { required: true, message: '请选择日期', trigger: 'change' }
		],
		amendFinalSche: [
		  { required: true, message: '请选择日期', trigger: 'change' }
		],
		//
		prePreparationPic: [
		  { required: true, message: '请选择责任人', trigger: 'change' }
		],
		workPlanPic: [
		  { required: true, message: '请选择责任人', trigger: 'change' }
		],
		dataCollectionPic: [
		  { required: true, message: '请选择责任人', trigger: 'change' }
		],
		/* 
		fldSrvyPic: [
		  { required: true, message: '请选择责任人', trigger: 'change' }
		],
		mktSrvyPic: [
		  { required: true, message: '请选择责任人', trigger: 'change' }
		],
		 */
		issueValPic: [
		  { required: true, message: '请选择责任人', trigger: 'change' }
		],
		internalAuditPic: [
		  { required: true, message: '请选择责任人', trigger: 'change' }
		],
		commuClientPic: [
		  { required: true, message: '请选择责任人', trigger: 'change' }
		],
		assemChargePic: [
		  { required: true, message: '请选择责任人', trigger: 'change' }
		],
		amendFinalPic: [
		  { required: true, message: '请选择责任人', trigger: 'change' }
		],
		manuArchivePic: [
		  { required: true, message: '请选择责任人', trigger: 'change' }
		]
	  },
	  
	  //汇正  
	  arrgFormKJ: {
		projId: '',
		subProjId: '',
	    assemMethod: '',
	    fldSrvyContent: '',
	    //人员
	    //prePreparationPic: [], //前期准备、明确需求
		dataCollectionPic: [], //资料收集
		workPlanPic: [], //制定工作方案
	    fldSrvyPic: [], //现场调研
	    mktSrvyPic: [], //市场调查询价
	    //assemEstPic: [], //评定估算
	    issueValPic: [], //撰写报告
	    internalAuditPic: [], //三级审核
	    commuClientPic: [], //与委托方沟通
	    assemChargePic: [], //报告收费
	    amendFinalPic: [], //出具正式报告
	    manuArchivePic: [], //整理归档
	    //日期
	    //prePreparationSche: [],
		dataCollectionSche: [],
		workPlanSche: [], 
	    fldSrvySche: [],
	    mktSrvySche: [],
	    //assemEstSche: [],
	    issueValSche: [],
	    internalAuditSche: [],
	    commuClientSche: [],
	    assemChargeSche: '出具正式报告时',
	    amendFinalSche: [],
	    manuArchiveSche: '出正评后3个月内'
	  },
	  assemMethodOptionsKj: ['KJ方法1', 'KJ方法2'],
	  
	  arrgFormRulesKj: {
	    /* 
	    assemMethod: [
	      { required: true, message: '请填写会计方法', trigger: 'change' }
	    ],
	    */
	    dataCollectionSche: [
	      { required: true, message: '请选择日期', trigger: 'change' }
	    ],
	    workPlanSche: [
	      { required: true, message: '请选择日期', trigger: 'change' }
	    ], 
	    fldSrvySche: [
	      { required: true, message: '请选择日期', trigger: 'change' }
	    ],
	    issueValSche: [
	      { required: true, message: '请选择日期', trigger: 'change' }
	    ],
	    internalAuditSche: [
	      { required: true, message: '请选择日期', trigger: 'change' }
	    ],
	    commuClientSche: [
	      { required: true, message: '请选择日期', trigger: 'change' }
	    ],
	    amendFinalSche: [
	      { required: true, message: '请选择日期', trigger: 'change' }
	    ],
	    //
	    dataCollectionPic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ],
	    workPlanPic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ],	
		fldSrvyPic: [
		  { required: true, message: '请选择责任人', trigger: 'change' }
		],
	    issueValPic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ],
	    internalAuditPic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ],
	    commuClientPic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ],
	    assemChargePic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ],
	    amendFinalPic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ],
	    manuArchivePic: [
	      { required: true, message: '请选择责任人', trigger: 'change' }
	    ]
	  },
    };
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
  	//console.log('dialog初始化公司id', this.companyId);
  },
  
  methods: {
    checkData() {
	  //211101变动 新增: 根据不同公司, 初始化不同arrgForm
      if(this.companyTabsId == 0){
		this.arrgForm = Object.assign({}, this.arrgFormHZ);
      }else if(this.companyTabsId == 1 && (this.projType>=2100 && this.projType <2200)){
        this.arrgForm = Object.assign({}, this.arrgFormZMCH);
      }else if(this.companyTabsId == 1 && (this.projType>=2200 && this.projType <2300)){
        this.arrgForm = Object.assign({}, this.arrgFormZMZX);
      }else if(this.companyTabsId == 2){
        this.arrgForm = Object.assign({}, this.arrgFormKJ);
      }
	  
      if (this.arrgData == null) {
        //this.$message.success('新增安排');
      } else {
        //this.$message.success('编辑安排');	
        this.arrgForm = this.arrgData;	
      }
	  this.arrgForm.projId = this.projId;
	  this.arrgForm.subProjId = this.subProjId;
	  
	  //根据项目组成员多少, 优化对话框宽度
	  this.dialogWidth = this.projMember.length <=6?'1100px':'90%';
    },
    onClose() {
      this.$emit('update:show', false);
    },
    onSubmitWorkArrg() {	  
		if(this.companyTabsId == 0){
		  //惠正	
		  this.$refs.arrgForm.validate(valid => {
			if (valid) {
			  this.arrgForm.assemMethod = this.arrgForm.assemMethod.join(',');
			  //
			  this.arrgForm.prePreparationPic = this.arrgForm.prePreparationPic.join(',');
			  this.arrgForm.fldSrvyPic = this.arrgForm.fldSrvyPic.join(',');
			  this.arrgForm.mktSrvyPic = this.arrgForm.mktSrvyPic.join(',');
			  this.arrgForm.assemEstPic = this.arrgForm.assemEstPic.join(',');
			  this.arrgForm.issueValPic = this.arrgForm.issueValPic.join(',');
			  this.arrgForm.internalAuditPic = this.arrgForm.internalAuditPic.join(',');
			  this.arrgForm.commuClientPic = this.arrgForm.commuClientPic.join(',');
			  this.arrgForm.assemChargePic = this.arrgForm.assemChargePic.join(',');
			  this.arrgForm.amendFinalPic = this.arrgForm.amendFinalPic.join(',');
			  this.arrgForm.manuArchivePic = this.arrgForm.manuArchivePic.join(',');
			  //
			  this.arrgForm.prePreparationSche = this.arrgForm.prePreparationSche.join('-');
			  this.arrgForm.fldSrvySche = this.arrgForm.fldSrvySche.join('-');
			  this.arrgForm.mktSrvySche = this.arrgForm.mktSrvySche.join('-');
			  this.arrgForm.assemEstSche = this.arrgForm.assemEstSche.join('-');
			  this.arrgForm.issueValSche = this.arrgForm.issueValSche.join('-');
			  this.arrgForm.internalAuditSche = this.arrgForm.internalAuditSche.join(
				'-'
			  );
			  this.arrgForm.commuClientSche = this.arrgForm.commuClientSche.join(
				'-'
			  );
			  //this.arrgForm.assemChargeSche = this.arrgForm.assemChargeSche.join('-')
			  this.arrgForm.amendFinalSche = this.arrgForm.amendFinalSche.join('-');
			  //this.arrgForm.manuArchiveSche = this.arrgForm.manuArchiveSche.join('-')
			  //
			  //211101变动 新增: 多个公司切换
			  
			  //console.log('提交arrgForm', this.arrgForm);
			  
			  setWorkAssignment(this.arrgForm, this.companyId)
				.then(res => {
				  this.$message.success('提交成功');
				  //211207变动 刷新整页改成局部刷新
				  this.onClose();
				  this.$emit('response');
				})
				.catch(err => {
				  this.$message.error('提交失败，请稍后重试');
				});
				
				
			} else {
			  this.$message.warning('请填写必填信息');
			}
		  });
		}else if(this.companyTabsId == 1 && (this.projType>=2100 && this.projType <2200)){
		  //智明测绘  
		  this.$refs.arrgForm.validate(valid => {
			if (valid) {
			  this.arrgForm.assemMethod = this.arrgForm.assemMethod.join(',');
			  //人员
			  this.arrgForm.prePreparationPic = this.arrgForm.prePreparationPic.join(',');
			  this.arrgForm.workPlanPic = this.arrgForm.workPlanPic.join(',');
			  this.arrgForm.fldSrvyPic = this.arrgForm.fldSrvyPic.join(',');
			  this.arrgForm.drawingPic = this.arrgForm.drawingPic.join(',');
			  this.arrgForm.issueValPic = this.arrgForm.issueValPic.join(',');
			  this.arrgForm.internalAuditPic = this.arrgForm.internalAuditPic.join(',');
			  this.arrgForm.commuClientPic = this.arrgForm.commuClientPic.join(',');
			  this.arrgForm.assemChargePic = this.arrgForm.assemChargePic.join(',');
			  this.arrgForm.amendFinalPic = this.arrgForm.amendFinalPic.join(',');
			  this.arrgForm.manuArchivePic = this.arrgForm.manuArchivePic.join(',');
			  //日期
			  this.arrgForm.prePreparationSche = this.arrgForm.prePreparationSche.join('-');
			  this.arrgForm.workPlanSche = this.arrgForm.workPlanSche.join('-');
			  this.arrgForm.fldSrvySche = this.arrgForm.fldSrvySche.join('-');
			  this.arrgForm.drawingSche = this.arrgForm.drawingSche.join('-');
			  this.arrgForm.issueValSche = this.arrgForm.issueValSche.join('-');
			  this.arrgForm.internalAuditSche = this.arrgForm.internalAuditSche.join('-');
			  this.arrgForm.commuClientSche = this.arrgForm.commuClientSche.join('-');
			  //this.arrgForm.assemChargeSche = this.arrgForm.assemChargeSche.join('-')
			  this.arrgForm.amendFinalSche = this.arrgForm.amendFinalSche.join('-');
			  //this.arrgForm.manuArchiveSche = this.arrgForm.manuArchiveSche.join('-')
			  //
			  //211101变动 新增: 多个公司切换
			  
			  //console.log('提交arrgForm', this.arrgForm);			  
			  setWorkAssignment(this.arrgForm, this.companyId)
				.then(res => {
				  this.$message.success('提交成功');
				  //211207变动 刷新整页改成局部刷新
				  this.onClose();
				  this.$emit('response');
				})
				.catch(err => {
				  this.$message.error('提交失败，请稍后重试');
				});			 
			} else {
			  this.$message.warning('请填写必填信息');
			}
		  });
		}else if(this.companyTabsId == 1 && (this.projType>=2200 && this.projType <2300)){
		  //智明咨询
		  this.$refs.arrgForm.validate(valid => {
			if (valid) {
			  //this.arrgForm.assemMethod = this.arrgForm.assemMethod.join(',');
			  //人员
			  this.arrgForm.prePreparationPic = this.arrgForm.prePreparationPic.join(',');
			  this.arrgForm.workPlanPic = this.arrgForm.workPlanPic.join(',');
			  this.arrgForm.dataCollectionPic = this.arrgForm.dataCollectionPic.join(',');
			  this.arrgForm.fldSrvyPic = this.arrgForm.fldSrvyPic?this.arrgForm.fldSrvyPic.join(','):'';
			  this.arrgForm.mktSrvyPic = this.arrgForm.mktSrvyPic?this.arrgForm.mktSrvyPic.join(','):'';
			  this.arrgForm.issueValPic = this.arrgForm.issueValPic.join(',');
			  this.arrgForm.internalAuditPic = this.arrgForm.internalAuditPic.join(',');
			  this.arrgForm.commuClientPic = this.arrgForm.commuClientPic.join(',');
			  this.arrgForm.assemChargePic = this.arrgForm.assemChargePic.join(',');
			  this.arrgForm.amendFinalPic = this.arrgForm.amendFinalPic.join(',');
			  this.arrgForm.manuArchivePic = this.arrgForm.manuArchivePic.join(',');
			  //日期
			  this.arrgForm.prePreparationSche = this.arrgForm.prePreparationSche.join('-');
			  this.arrgForm.workPlanSche = this.arrgForm.workPlanSche.join('-');
			  this.arrgForm.dataCollectionSche = this.arrgForm.dataCollectionSche.join('-');
			  this.arrgForm.fldSrvySche = this.arrgForm.fldSrvySche?this.arrgForm.fldSrvySche.join('-'):'';
			  this.arrgForm.mktSrvySche = this.arrgForm.mktSrvySche?this.arrgForm.mktSrvySche.join('-'):'';
			  this.arrgForm.issueValSche = this.arrgForm.issueValSche.join('-');
			  this.arrgForm.internalAuditSche = this.arrgForm.internalAuditSche.join('-');
			  this.arrgForm.commuClientSche = this.arrgForm.commuClientSche.join('-');
			  //this.arrgForm.assemChargeSche = this.arrgForm.assemChargeSche.join('-')
			  this.arrgForm.amendFinalSche = this.arrgForm.amendFinalSche.join('-');
			  //this.arrgForm.manuArchiveSche = this.arrgForm.manuArchiveSche.join('-')
			  //
			  //211101变动 新增: 多个公司切换
			  
			  //console.log('提交arrgForm', this.arrgForm);
			  setWorkAssignment(this.arrgForm, this.companyId)
				.then(res => {
				  this.$message.success('提交成功');
				  //211207变动 刷新整页改成局部刷新
				  this.onClose();
				  this.$emit('response');
				})
				.catch(err => {
				  this.$message.error('提交失败，请稍后重试');
				});
			} else {
			  this.$message.warning('请填写必填信息');
			}
		  });
		}else if(this.companyTabsId == 2){
		  //会计所
		  this.$refs.arrgForm.validate(valid => {
			if (valid) {
			  //this.arrgForm.assemMethod = this.arrgForm.assemMethod.join(',');
			  //人员
			  this.arrgForm.dataCollectionPic = this.arrgForm.dataCollectionPic.join(',');
			  this.arrgForm.workPlanPic = this.arrgForm.workPlanPic.join(',');
			  this.arrgForm.fldSrvyPic = this.arrgForm.fldSrvyPic.join(',');
			  this.arrgForm.issueValPic = this.arrgForm.issueValPic.join(',');
			  this.arrgForm.internalAuditPic = this.arrgForm.internalAuditPic.join(',');
			  this.arrgForm.commuClientPic = this.arrgForm.commuClientPic.join(',');
			  this.arrgForm.assemChargePic = this.arrgForm.assemChargePic.join(',');
			  this.arrgForm.amendFinalPic = this.arrgForm.amendFinalPic.join(',');
			  this.arrgForm.manuArchivePic = this.arrgForm.manuArchivePic.join(',');
			  //日期
			  this.arrgForm.dataCollectionSche = this.arrgForm.dataCollectionSche.join('-');
			  this.arrgForm.workPlanSche = this.arrgForm.workPlanSche.join('-');
			  this.arrgForm.fldSrvySche = this.arrgForm.fldSrvySche.join('-');
			  this.arrgForm.issueValSche = this.arrgForm.issueValSche.join('-');
			  this.arrgForm.internalAuditSche = this.arrgForm.internalAuditSche.join('-');
			  this.arrgForm.commuClientSche = this.arrgForm.commuClientSche.join('-');
			  //this.arrgForm.assemChargeSche = this.arrgForm.assemChargeSche.join('-')
			  this.arrgForm.amendFinalSche = this.arrgForm.amendFinalSche.join('-');
			  //this.arrgForm.manuArchiveSche = this.arrgForm.manuArchiveSche.join('-')
			  //
			  //211101变动 新增: 多个公司切换			  
			  //console.log('提交arrgForm', this.arrgForm);
			  setWorkAssignment(this.arrgForm, this.companyId)
				.then(res => {
				  this.$message.success('提交成功');
				  //211207变动 刷新整页改成局部刷新
				  this.onClose();
				  this.$emit('response');
				})
				.catch(err => {
				  this.$message.error('提交失败，请稍后重试');
				});
			} else {
			  this.$message.warning('请填写必填信息');
			}
		  });
		}
    },
    defaultArrg() {
	  if(this.companyTabsId == 0){
		  //惠正		  
		  //重置空值
		  this.arrgForm.prePreparationPic = [];
		  this.arrgForm.fldSrvyPic = [];
		  this.arrgForm.mktSrvyPic = [];
		  this.arrgForm.assemEstPic = [];
		  this.arrgForm.issueValPic = [];
		  this.arrgForm.internalAuditPic = [];
		  this.arrgForm.commuClientPic = [];
		  this.arrgForm.amendFinalPic = [];
		  
		  this.arrgForm.assemChargePic = [];
		  this.arrgForm.manuArchivePic = [];
		  
		  this.arrgForm.prePreparationSche = [];
		  this.arrgForm.fldSrvySche = [];
		  this.arrgForm.mktSrvySche = [];
		  this.arrgForm.assemEstSche = [];
		  this.arrgForm.issueValSche = [];
		  this.arrgForm.internalAuditSche = [];
		  this.arrgForm.commuClientSche = [];
		  this.arrgForm.amendFinalSche = [];
		  
		  //赋值
		  let day = this.baseDate;
		  let day1 = this.$moment(day).format('YYYY/MM/DD');
		  let day2 = this.$moment(day + 86400000).format('YYYY/MM/DD');
		  let day3 = this.$moment(day + 172800000).format('YYYY/MM/DD');
		  let day4 = this.$moment(day + 259200000).format('YYYY/MM/DD');
		  console.log(day, day1, day2, day3, day4);
		  this.arrgForm.prePreparationSche.push(day1, day1);
		  this.arrgForm.fldSrvySche.push(day1, day1);
		  this.arrgForm.mktSrvySche.push(day1, day1);
		  this.arrgForm.assemEstSche.push(day2, day2);
		  this.arrgForm.issueValSche.push(day2, day2);
		  this.arrgForm.internalAuditSche.push(day3, day3);
		  this.arrgForm.commuClientSche.push(day3, day3);
		  this.arrgForm.amendFinalSche.push(day4, day4);
		  
		  console.log('fldSrvySche', this.arrgForm.fldSrvySche)

		  let leader = this.projLeader.split(',');
		  let reviewer = this.projReviewer.split(',');
		  let proreviewer = this.projProReviewer.split(',');
		  let asst = this.projAsst.split(',');
		  let srvy = this.fieldSrvy.split(',');
		  for (let i of leader) {
			if (i != '') {
			  this.arrgForm.prePreparationPic.push(i);
			  this.arrgForm.internalAuditPic.push(i);
			  this.arrgForm.commuClientPic.push(i);
			  this.arrgForm.assemChargePic.push(i);
			  this.arrgForm.amendFinalPic.push(i);
			}
		  }
		  for (let i of reviewer) {
			if (i != '') {
			  this.arrgForm.internalAuditPic.push(i);
			  this.arrgForm.commuClientPic.push(i);
			}
		  }
		  for (let i of proreviewer) {
			if (i != '') {
			  this.arrgForm.internalAuditPic.push(i);
			  this.arrgForm.commuClientPic.push(i);
			}
		  }
		  for (let i of asst) {
			if (i != '') {
			  this.arrgForm.mktSrvyPic.push(i);
			  this.arrgForm.assemEstPic.push(i);
			  this.arrgForm.issueValPic.push(i);
			  this.arrgForm.internalAuditPic.push(i);
			  this.arrgForm.manuArchivePic.push(i);
			}
		  }
		  for (let i of srvy) {
			if (i != '') {
			  this.arrgForm.fldSrvyPic.push(i);
			}
		  }
		 
	  }else if(this.companyTabsId == 1 && (this.projType>=2100 && this.projType <2200)){
		//智明测绘  
		  //重置空值
		  this.arrgForm.prePreparationPic = [];
		  this.arrgForm.fldSrvyPic = [];
		  this.arrgForm.drawingPic = [];
		  this.arrgForm.workPlanPic = [];
		  this.arrgForm.issueValPic = [];
		  this.arrgForm.internalAuditPic = [];
		  this.arrgForm.commuClientPic = [];
		  this.arrgForm.amendFinalPic = [];
		  
		  this.arrgForm.assemChargePic = [];
		  this.arrgForm.manuArchivePic = [];
		  
		  
		  this.arrgForm.prePreparationSche = [];
		  this.arrgForm.fldSrvySche = [];
		  this.arrgForm.drawingSche = [];
		  this.arrgForm.workPlanSche = [];
		  this.arrgForm.issueValSche = [];
		  this.arrgForm.internalAuditSche = [];
		  this.arrgForm.commuClientSche = [];
		  this.arrgForm.amendFinalSche = [];
		  
		  //this.arrgForm.assemChargeSche = [];
		  //this.arrgForm.manuArchiveSche = [];
		  
		  //赋值
		  let day = this.baseDate;
		  let day1 = this.$moment(day).format('MM/DD');
		  let day2 = this.$moment(day + 86400000).format('MM/DD');
		  let day3 = this.$moment(day + 172800000).format('MM/DD');
		  let day4 = this.$moment(day + 259200000).format('MM/DD');
		  let day5 = this.$moment(day + 345600000).format('MM/DD');
		  let day6 = this.$moment(day + 432000000).format('MM/DD');
		  //console.log(day, day1, day2, day3, day4, day5, day6);
		  this.arrgForm.prePreparationSche.push(day1, day1);
		  this.arrgForm.workPlanSche.push(day1, day1);
		  this.arrgForm.fldSrvySche.push(day2, day2);
		  this.arrgForm.drawingSche.push(day3, day4);
		  this.arrgForm.issueValSche.push(day4, day4);
		  this.arrgForm.internalAuditSche.push(day5, day5);
		  this.arrgForm.commuClientSche.push(day5, day5);
		  this.arrgForm.amendFinalSche.push(day6, day6);
		  
		  let leader = this.projLeader.split(',');
		  let reviewer = this.projReviewer.split(',');
		  let proreviewer = this.projProReviewer.split(',');
		  let asst = this.projAsst.split(',');
		  let srvy = this.fieldSrvy.split(',');
		  for (let i of leader) {
			if (i != '') {
			  this.arrgForm.prePreparationPic.push(i);
			  this.arrgForm.workPlanPic.push(i);
			  this.arrgForm.internalAuditPic.push(i);
			  this.arrgForm.commuClientPic.push(i);
			  this.arrgForm.assemChargePic.push(i);
			  this.arrgForm.amendFinalPic.push(i);
			}
		  }
		  for (let i of reviewer) {
			if (i != '') {
			  this.arrgForm.internalAuditPic.push(i);
			}
		  }
		  for (let i of proreviewer) {
			if (i != '') {
			  this.arrgForm.internalAuditPic.push(i);
			}
		  }
		  for (let i of asst) {
			if (i != '') {
			  this.arrgForm.drawingPic.push(i);
			  this.arrgForm.issueValPic.push(i);
			  this.arrgForm.manuArchivePic.push(i);
			}
		  }
		  for (let i of srvy) {
			if (i != '') {
			  this.arrgForm.fldSrvyPic.push(i);
			}
		  }
		  
	  }else if(this.companyTabsId == 1 && (this.projType>=2200 && this.projType <2300)){
		//智明咨询 
		  //重置空值
		  this.arrgForm.prePreparationPic = [];
		  this.arrgForm.workPlanPic = [];
		  this.arrgForm.dataCollectionPic = [];
		  this.arrgForm.fldSrvyPic = [];
		  this.arrgForm.mktSrvyPic = [];
		  this.arrgForm.issueValPic = [];
		  this.arrgForm.internalAuditPic = [];
		  this.arrgForm.commuClientPic = [];
		  this.arrgForm.amendFinalPic = [];
		  
		  this.arrgForm.assemChargePic = [];
		  this.arrgForm.manuArchivePic = [];
		  
		  this.arrgForm.prePreparationSche = [];
		  this.arrgForm.workPlanSche = [];
		  this.arrgForm.dataCollectionSche = [];
		  this.arrgForm.fldSrvySche = [];
		  this.arrgForm.mktSrvySche = [];
		  this.arrgForm.issueValSche = [];
		  this.arrgForm.internalAuditSche = [];
		  this.arrgForm.commuClientSche = [];
		  this.arrgForm.amendFinalSche = [];
		  
		  //赋值
		  let day = this.baseDate;
		  let day1 = this.$moment(day).format('MM/DD');
		  let day2 = this.$moment(day + 86400000).format('MM/DD');
		  let day3 = this.$moment(day + 172800000).format('MM/DD');
		  let day4 = this.$moment(day + 259200000).format('MM/DD');
		  let day5 = this.$moment(day + 345600000).format('MM/DD');
		  let day6 = this.$moment(day + 432000000).format('MM/DD');
		  //console.log(day, day1, day2, day3, day4, day5, day6);
		  this.arrgForm.prePreparationSche.push(day1, day1);
		  this.arrgForm.workPlanSche.push(day1, day1);
		  this.arrgForm.dataCollectionSche.push(day1, day1);
		  this.arrgForm.fldSrvySche.push(day2, day3);
		  this.arrgForm.mktSrvySche.push(day2, day3);
		  this.arrgForm.issueValSche.push(day4, day4);
		  this.arrgForm.internalAuditSche.push(day5, day5);
		  this.arrgForm.commuClientSche.push(day5, day5);
		  this.arrgForm.amendFinalSche.push(day6, day6);
		  
		  let leader = this.projLeader.split(',');
		  let reviewer = this.projReviewer.split(',');
		  let proreviewer = this.projProReviewer.split(',');
		  let asst = this.projAsst.split(',');
		  let srvy = this.fieldSrvy.split(',');
		  for (let i of leader) {
			if (i != '') {
			  this.arrgForm.prePreparationPic.push(i);
			  this.arrgForm.workPlanPic.push(i);
			  this.arrgForm.internalAuditPic.push(i);
			  this.arrgForm.commuClientPic.push(i);
			  this.arrgForm.assemChargePic.push(i);
			  this.arrgForm.amendFinalPic.push(i);
			}
		  }
		  for (let i of reviewer) {
			if (i != '') {
			  this.arrgForm.internalAuditPic.push(i);
			  this.arrgForm.commuClientPic.push(i);
			}
		  }
		  for (let i of proreviewer) {
			if (i != '') {
			  this.arrgForm.internalAuditPic.push(i);
			  this.arrgForm.commuClientPic.push(i);
			}
		  }
		  for (let i of asst) {
			if (i != '') {
			  this.arrgForm.dataCollectionPic.push(i);
			  this.arrgForm.mktSrvyPic.push(i);
			  this.arrgForm.issueValPic.push(i);
			  this.arrgForm.internalAuditPic.push(i);
			  this.arrgForm.manuArchivePic.push(i);
			}
		  }
		  for (let i of srvy) {
			if (i != '') {
			  this.arrgForm.fldSrvyPic.push(i);
			}
		  }  
	  }else if(this.companyTabsId == 2){
		//汇正
		  //重置空值
		  this.arrgForm.dataCollectionPic = [];
		  this.arrgForm.workPlanPic = [];
		  this.arrgForm.fldSrvyPic = [];
		  this.arrgForm.issueValPic = [];
		  this.arrgForm.internalAuditPic = [];
		  this.arrgForm.commuClientPic = [];
		  this.arrgForm.amendFinalPic = [];
		  
		  this.arrgForm.assemChargePic = [];
		  this.arrgForm.manuArchivePic = [];
		  
		  this.arrgForm.dataCollectionSche = [];
		  this.arrgForm.workPlanSche = [];
		  this.arrgForm.fldSrvySche = [];
		  this.arrgForm.issueValSche = [];
		  this.arrgForm.internalAuditSche = [];
		  this.arrgForm.commuClientSche = [];
		  this.arrgForm.amendFinalSche = [];
		  		  
		  //赋值
		  let day = this.baseDate?this.baseDate:this.auditPeriodStart;
		  let day1 = this.$moment(day).format('MM/DD');
		  let day2 = this.$moment(day + 86400000).format('MM/DD');
		  let day3 = this.$moment(day + 172800000).format('MM/DD');
		  let day4 = this.$moment(day + 259200000).format('MM/DD');
		  let day5 = this.$moment(day + 345600000).format('MM/DD');
		  let day6 = this.$moment(day + 432000000).format('MM/DD');
		  let day7 = this.$moment(day + 518400000).format('MM/DD');
		  let day8 = this.$moment(day + 604800000).format('MM/DD');
		  let day9 = this.$moment(day + 691200000).format('MM/DD');
		  let day10 = this.$moment(day + 777600000).format('MM/DD');
		  let day11 = this.$moment(day + 864000000).format('MM/DD');
		  let day12 = this.$moment(day + 950400000).format('MM/DD');
		  let day13 = this.$moment(day + 1036800000).format('MM/DD');
		  let day14 = this.$moment(day + 1123200000).format('MM/DD');
		  let day15 = this.$moment(day + 1209600000).format('MM/DD');
		  let day16 = this.$moment(day + 1296000000).format('MM/DD');
		  //console.log(day, day1, day2, day3, day4, day5, day6);
		  this.arrgForm.dataCollectionSche.push(day1, day4);
		  this.arrgForm.workPlanSche.push(day4, day4);
		  this.arrgForm.fldSrvySche.push(day5, day12);
		  this.arrgForm.issueValSche.push(day13, day15);
		  this.arrgForm.internalAuditSche.push(day15, day15);
		  this.arrgForm.commuClientSche.push(day15, day15);
		  this.arrgForm.amendFinalSche.push(day16, day16);
		  		  
		  let leader = this.projLeader.split(',');
		  let reviewer = this.projReviewer.split(',');
		  let proreviewer = this.projProReviewer.split(',');
		  let asst = this.projAsst.split(',');
		  let srvy = this.fieldSrvy.split(',');
		  for (let i of leader) {
			if (i != '') {
			  this.arrgForm.dataCollectionPic.push(i);
			  this.arrgForm.workPlanPic.push(i);
			  this.arrgForm.fldSrvyPic.push(i);
			  this.arrgForm.internalAuditPic.push(i);
			  this.arrgForm.commuClientPic.push(i);
			  this.arrgForm.assemChargePic.push(i);
			  this.arrgForm.amendFinalPic.push(i);
			}
		  }
		  for (let i of reviewer) {
			if (i != '') {
			  this.arrgForm.internalAuditPic.push(i);
			  this.arrgForm.commuClientPic.push(i);
			}
		  }
		  for (let i of proreviewer) {
			if (i != '') {
			  this.arrgForm.internalAuditPic.push(i);
			  this.arrgForm.commuClientPic.push(i);
			}
		  }
		  for (let i of asst) {
			if (i != '') {
			  this.arrgForm.dataCollectionPic.push(i);
			  this.arrgForm.fldSrvyPic.push(i);
			  this.arrgForm.issueValPic.push(i);
			  this.arrgForm.manuArchivePic.push(i);
			}
		  }
		  for (let i of srvy) {
			if (i != '') {
			  this.arrgForm.dataCollectionPic.push(i);
			  this.arrgForm.fldSrvyPic.push(i);
			}
		  }  
	  }
	  
	  
    },
	
  }
};
</script>

<style>
.select-width-50{
	min-width: 50%;
}
</style>