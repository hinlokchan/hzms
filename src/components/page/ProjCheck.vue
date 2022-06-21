<template>
  <div>
    <div class="container">
      <el-page-header @back="goBack"></el-page-header>
      <div
        class="crumbs"
        style="margin-top: 15px"
      >
        <el-breadcrumb>
          <el-breadcrumb-item>查看项目详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
	  
<!-- =========================惠正========================= -->	  
      <div
	  v-if="companyTabsId == 0">
        <el-card>
          <div slot="header">
            <!-- <span style="color: #009AD6; font-size: 18px;">项目名称</span> -->
            <span v-if="detailData.projDegree == 1002">
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
                v-if="detailData.riskProfile == item.value"
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
                v-if="detailData.arrgType == item.value"
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
                v-if="detailData.newOldType == item.value"
                style="margin-left: 10px;"
              >
                <el-tag
                  :type="item.tag"
                  size="medium"
                  effect="dark"
                >{{item.label}}</el-tag>
              </span>
            </span>
			
			<!-- 211115 新增, 查看项目计划消息 -->
			<el-button
			  type="primary"
			  size="small"
			  style="margin-left: 20px;"
			  @click="showInfo"
			>查看计划消息</el-button>
			
            <span style="float: right; font-size: 14px;">编制日期:{{this.formatDate(detailData.projDate)}}</span>
          </div>
          <div style="font-size: 20px">{{detailData.projName}}</div>
        </el-card>
        <el-form
          label-position="right"
          label-width="110px"
        >

          <div class="detail">
            <div class="title">惠正项目基本信息</div>

            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="计划编号"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projNum}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="项目类型"
                  class="label"
                >
                  <span class="detail-content">{{transedData.projType}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="评估目的"
                  class="label"
                >
                  <span class="detail-content">{{detailData.assemGoal}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="初评号"
                  class="label"
                >
                  <span class="detail-content">{{reportNum.cph}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="正评号"
                  class="label"
                >
                  <span class="detail-content">{{reportNum.zph}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="回函号"
                  class="label"
                >
                  <span class="detail-content">{{reportNum.hhh}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="基准日"
                  class="label"
                >
                  <span class="detail-content">{{this.formatDate(detailData.baseDate)}}</span>
                </el-form-item>
              </el-col>
			  <el-col :span="8">
			    <el-form-item
			      label="创新类型"
			      class="label"
			    >
			      <span class="detail-content">{{detailData.innovationType}}</span>
			    </el-form-item>
			  </el-col>
			  <el-col :span="8">
			    <el-form-item
			      label="银行业务类型"
			      class="label"
			    >
			      <span class="detail-content">{{detailData.bankBusinessType}}</span>
			    </el-form-item>
			  </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  label="项目范围"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projScope}}</span>
                </el-form-item>
              </el-col>			  
              <el-col :span="24">
                <el-form-item
                  label="补充说明"
                  class="label"
                >
                  <span class="detail-content">{{detailData.supInstruction}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="title">委托信息</div>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="接洽人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projContactType}} {{detailData.projContact}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="委托人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.clientName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="委托人联系人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.clientContact}} {{detailData.clientContactInfo}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="产权持有人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.incumbrancer}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item
                  label="共同委托人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.coClientName}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="引荐人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projReferer}} {{detailData.projRefererInfo}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="计划现勘日"
                  class="label"
                >
                  <span class="detail-content">{{this.formatDate(detailData.fldSrvySchedule)}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="现勘联系人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.fldSrvyContact}} {{detailData.fldSrvyContactInfo}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="title">项目组成员</div>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="项目负责人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projLeader}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="项目复核人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projReviewer}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="专业复核人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projProReviewer}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="项目助理"
                  class="label"
                >
                  <span>{{detailData.projAsst}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="现场勘查"
                  class="label"
                >
                  <span class="detail-content">{{detailData.fieldSrvy}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
	  
<!-- =========================智明========================= -->	  
      <div
	  v-if="companyTabsId == 1">
        <el-card>
          <div slot="header">
            <!-- <span style="color: #009AD6; font-size: 18px;">项目名称</span> -->
            <span v-if="detailData.projDegree == 1002">
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
                v-if="detailData.riskProfile == item.value"
                style="margin-left: 10px;"
              >
                <el-tag
                  :type="item.tag"
                  size="medium"
                >{{item.label}}风险</el-tag>
              </span>
            </span>
			<!-- 无轮序
            <span
              v-for="item in arrgType"
              :key="'info2'+item.value"
            >
              <span
                v-if="detailData.arrgType == item.value"
                style="margin-left: 10px;"
              >
                <el-tag
                  type="primary"
                  size="medium"
                >{{item.label}}</el-tag>
              </span>
            </span>
			 -->
            <span
              v-for="item in newOldType"
              :key="'info3'+item.value"
            >
              <span
                v-if="detailData.newOldType == item.value"
                style="margin-left: 10px;"
              >
                <el-tag
                  :type="item.tag"
                  size="medium"
                  effect="dark"
                >{{item.label}}</el-tag>
              </span>
            </span>
			
			<!-- 211115 新增, 查看项目计划消息 -->
			<el-button
			  type="primary"
			  size="small"
			  style="margin-left: 20px;"
			  @click="showInfo"
			>查看计划消息</el-button>
			
            <span style="float: right; font-size: 14px;">编制日期:{{this.formatDate(detailData.projDate)}}</span>
          </div>
          <div style="font-size: 20px">{{detailData.projName}}</div>
        </el-card>
        <el-form
          label-position="right"
          label-width="110px"
        >

          <div class="detail">
            <div class="title">智明项目基本信息</div>

            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="计划编号"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projNum}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="项目类型"
                  class="label"
                >
                  <span class="detail-content">{{transedData.projType}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="项目目的"
                  class="label"
                >
                  <span class="detail-content">{{detailData.assemGoal}}</span>
                </el-form-item>
              </el-col>
			  <!-- 
              <el-col :span="8">
                <el-form-item
                  label="初评号"
                  class="label"
                >
                  <span class="detail-content">{{reportNum.cph}}</span>
                </el-form-item>
              </el-col>
			  -->
              <el-col :span="8">
                <el-form-item
                  label="正评号"
                  class="label"
                >
                  <span class="detail-content">{{reportNum.zph}}</span>
                </el-form-item>
              </el-col>
			  <!-- 
              <el-col :span="8">
                <el-form-item
                  label="回函号"
                  class="label"
                >
                  <span class="detail-content">{{reportNum.hhh}}</span>
                </el-form-item>
              </el-col>
			  -->
              <el-col :span="8"
			  v-if="onProjTypeChangeVisable() == 1">
                <el-form-item
                  label="进场日期"
                  class="label"
                >
                  <span class="detail-content">{{detailData.fldSrvySchedule}}</span>
                </el-form-item>
              </el-col>
			  
			  <el-col :span="8"
			  v-if="onProjTypeChangeVisable() == 2">
			    <el-form-item
			      label="基准日"
			      class="label"
			    >
			      <span class="detail-content">{{this.formatDate(detailData.baseDate)}}</span>
			    </el-form-item>
			  </el-col>
            </el-row>
			
            <el-row
			v-if="onProjTypeChangeVisable() == 1">
              <el-col :span="12">
                <el-form-item
                  label="项目范围"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projScope}}</span>
                </el-form-item>
              </el-col>
			  <el-col :span="12">
			    <el-form-item
			      label="项目位置"
			      class="label"
			    >
			      <span class="detail-content">{{detailData.mappingObjLocation}}</span>
			    </el-form-item>
			  </el-col>
            </el-row>
			<el-row>
              <el-col :span="24">
                <el-form-item
                  label="补充说明"
                  class="label"
                >
                  <span class="detail-content">{{detailData.supInstruction}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="title">委托信息</div>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="接洽人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projContactType}} {{detailData.projContact}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="委托方"
                  class="label"
                >
                  <span class="detail-content">{{detailData.clientName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="委托方联系人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.clientContact}} {{detailData.clientContactInfo}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
			  <!-- 无产权持有人
              <el-col :span="8">
                <el-form-item
                  label="产权持有人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.incumbrancer}}</span>
                </el-form-item>
              </el-col>
			  -->
              <el-col :span="8">
                <el-form-item
                  :label="onProjTypeChangeVisable() == 1?'计划测绘日':'计划咨询日'"
                  class="label"
                >
                  <span class="detail-content">{{this.formatDate(detailData.fldSrvySchedule)}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  :label="onProjTypeChangeVisable() == 1?'测绘联系人':'咨询联系人'"
                  class="label"
                >
                  <span class="detail-content">{{detailData.fldSrvyContact}} {{detailData.fldSrvyContactInfo}}</span>
                </el-form-item>
              </el-col>
            </el-row>
			<!-- 无推荐人
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="引荐人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projReferer}} {{detailData.projRefererInfo}}</span>
                </el-form-item>
              </el-col>
            </el-row>
			 -->
            <div class="title">项目组成员</div>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="项目负责人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projLeader}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="项目复核人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projReviewer}}</span>
                </el-form-item>
              </el-col>
			  
              <el-col :span="8"
			  v-if="onProjTypeChangeVisable() == 1">
                <el-form-item
                  label="专业复核人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projProReviewer}}</span>
                </el-form-item>
              </el-col>
			 
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="项目助理"
                  class="label"
                >
                  <span>{{detailData.projAsst}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  :label="onProjTypeChangeVisable() == 1?'现场测绘':'现场调研'"
                  class="label"
                >
                  <span class="detail-content">{{detailData.fieldSrvy}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
	  
<!-- =========================汇正========================= -->	  
      <div
	  v-if="companyTabsId == 2">
        <el-card>
          <div slot="header">
            <!-- <span style="color: #009AD6; font-size: 18px;">项目名称</span> -->
            <span v-if="detailData.projDegree == 1002">
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
                v-if="detailData.riskProfile == item.value"
                style="margin-left: 10px;"
              >
                <el-tag
                  :type="item.tag"
                  size="medium"
                >{{item.label}}风险</el-tag>
              </span>
            </span>
			<!-- 无轮序
            <span
              v-for="item in arrgType"
              :key="'info2'+item.value"
            >
              <span
                v-if="detailData.arrgType == item.value"
                style="margin-left: 10px;"
              >
                <el-tag
                  type="primary"
                  size="medium"
                >{{item.label}}</el-tag>
              </span>
            </span>
			 -->
            <span
              v-for="item in newOldType"
              :key="'info3'+item.value"
            >
              <span
                v-if="detailData.newOldType == item.value"
                style="margin-left: 10px;"
              >
                <el-tag
                  :type="item.tag"
                  size="medium"
                  effect="dark"
                >{{item.label}}</el-tag>
              </span>
            </span>
			
			<!-- 211115 新增, 查看项目计划消息 -->
			<el-button
			  type="primary"
			  size="small"
			  style="margin-left: 20px;"
			  @click="showInfo"
			>查看计划消息</el-button>
			
            <span style="float: right; font-size: 14px;">编制日期:{{this.formatDate(detailData.projDate)}}</span>
          </div>
          <div style="font-size: 20px">{{detailData.projName}}</div>
        </el-card>
        <el-form
          label-position="right"
          label-width="110px"
        >

          <div class="detail">
            <div class="title">汇正项目基本信息</div>

            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="计划编号"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projNum}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="项目类型"
                  class="label"
                >
                  <span class="detail-content">{{transedData.projType}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="项目目的"
                  class="label"
                >
                  <span class="detail-content">{{detailData.assemGoal}}</span>
                </el-form-item>
              </el-col>
			  <!-- 
              <el-col :span="8">
                <el-form-item
                  label="初评号"
                  class="label"
                >
                  <span class="detail-content">{{reportNum.cph}}</span>
                </el-form-item>
              </el-col>
			  -->
              <el-col :span="8">
                <el-form-item
                  label="正评号"
                  class="label"
                >
                  <span class="detail-content">{{reportNum.zph}}</span>
                </el-form-item>
              </el-col>
			  <!-- 
              <el-col :span="8">
                <el-form-item
                  label="回函号"
                  class="label"
                >
                  <span class="detail-content">{{reportNum.hhh}}</span>
                </el-form-item>
              </el-col>
			  -->
              <el-col :span="8"
			  v-if="detailData.baseDate">
                <el-form-item
                  label="基准日"
                  class="label"
                >
                  <span class="detail-content">{{this.formatDate(detailData.baseDate)}}</span>
                </el-form-item>
              </el-col>
            </el-row>
			
			<el-row>
			  <el-col :span="8"
			  v-if="detailData.auditPeriodStart">
			    <el-form-item
			      label="审计期间"
			      class="label"
			    >
			      <span class="detail-content">{{formatDate(detailData.auditPeriodStart)}} 至 {{formatDate(detailData.auditPeriodEnd)}}</span>
			    </el-form-item>
			  </el-col>
			</el-row>
			
			<el-row>
              <el-col :span="24">
                <el-form-item
                  label="补充说明"
                  class="label"
                >
                  <span class="detail-content">{{detailData.supInstruction}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="title">委托信息</div>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="接洽人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projContactType}} {{detailData.projContact}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="委托方"
                  class="label"
                >
                  <span class="detail-content">{{detailData.clientName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="委托方联系人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.clientContact}} {{detailData.clientContactInfo}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
			  <!-- 无产权持有人
              <el-col :span="8">
                <el-form-item
                  label="产权持有人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.incumbrancer}}</span>
                </el-form-item>
              </el-col>
			  -->
              <el-col :span="8">
                <el-form-item
                  label="计划审计日"
                  class="label"
                >
                  <span class="detail-content">{{this.formatDate(detailData.fldSrvySchedule)}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="审计联系人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.fldSrvyContact}} {{detailData.fldSrvyContactInfo}}</span>
                </el-form-item>
              </el-col>
            </el-row>
			<!-- 无推荐人
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="引荐人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projReferer}} {{detailData.projRefererInfo}}</span>
                </el-form-item>
              </el-col>
            </el-row>
			 -->
            <div class="title">项目组成员</div>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="项目负责人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projLeader}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="项目复核人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projReviewer}}</span>
                </el-form-item>
              </el-col>
			  <!-- 
              <el-col :span="8">
                <el-form-item
                  label="专业复核人"
                  class="label"
                >
                  <span class="detail-content">{{detailData.projProReviewer}}</span>
                </el-form-item>
              </el-col>
			  -->
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="项目助理"
                  class="label"
                >
                  <span>{{detailData.projAsst}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="现场审计"
                  class="label"
                >
                  <span class="detail-content">{{detailData.fieldSrvy}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>	  
	  
        <div class="title">操作记录</div>
        <OpRecord
          :projId="detailData.projId"
        ></OpRecord>
		
		<!-- 211115变动 新增: 项目计划消息查看 -->
		<el-dialog
		  title="项目计划"
		  :visible.sync="newInfo"
		  width="40%"
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
    </div>
  </div>
</template>

<script>	
import CryptoJS from 'crypto-js'
import { getDetailProjInfo, getReportNum, getProjInfoTable } from '@/api/index'
import OpRecord from './OpRecord'
import projTypeOption from '../../../public/projTypeOption.json'
//import clientOptions from '../../../public/clientName.json'
import { host } from '@/config'
var ProManageAPIServer = `${host.baseUrl}/`
export default {
  name: 'projcheck',
  components: {
    OpRecord
  },
  data() {
    return {
      projId: '',
      cph: '',
      zph: '',
      hhh: '',
      detailData: {},
      reportNum: {},
      //clientOptions: [],
      projTypeOption: [],
      projTypeZH: '',
      transedData: {},
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
        { value: '1001', label: '新项目' ,tag: 'success'}, { value: '1002', label: '重评项目',tag: 'warning' }
      ],
	  	  
	  //211116变动， 新增不同项目类型，使用不用项目消息模板
	  newInfo:false,
	  newInfoData:'',  
	  
	  //211101变动 新增: 多个公司切换
	  companyRange:['HZ', 'ZM','HZKJ'],
	  companyId:'',
	  companyTabsId: 0,
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
	
	//211210变动 处理query解密
    this.projId =  this.newContent(this.$route.query.data);
	
    this.getDetail()
    this.projTypeOption = projTypeOption
    //this.clientOptions = clientOptions
  },
  mounted() {

  },
  methods: {
    formatDate(now) {
      const time = new Date(now)
      var year = time.getFullYear();  //取得4位数的年份
      var month = time.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
      var date = time.getDate();      //返回日期月份中的天数（1到31）
      var hour = time.getHours();     //返回日期中的小时数（0到23）
      return year + "-" + month + "-" + date
    },
    getDetail() {
	  //21110变动 新增: 多个公司切换
	  const detailData = {
		projId: this.projId
	  } 	
		
      getDetailProjInfo(detailData, this.companyId).then(res => {		
        if (JSON.stringify(res.data) === '{}') {
          this.$message.error('计划系统内无该项目数据');

          let that = this
          setTimeout(
              function() {
                that.goBack()
              }
              , 1000);
          return;
		 
        }
        this.detailData = res.data;
        //处理value转为label展示
        for (var i = 0; i < this.projTypeOption[this.companyTabsId].length; i++) {
          if (this.detailData.projType == this.projTypeOption[this.companyTabsId][i].value) {
            this.transedData.projType = this.projTypeOption[this.companyTabsId][i].label
          }
        }
        //this.reportNum = res.data.reportNumList
		//211209变动 reportNumList新格式转换
		const reportNumList = res.data.reportNumList?res.data.reportNumList:[];
		
		Object.keys(this.reportNum).forEach(key => (this.reportNum[key] = ''))
		//Object.keys(this.cnReportNum).forEach(key => (this.cnReportNum[key] = ''))
				
		//const compList = ['惠正', '智明', '汇正'];
		reportNumList.forEach((item, index) =>{
			if(item.reportNum){
				if (item.reportNumLevel == 1) {
				  this.reportNum.cph = item.reportNum;
				} else if (item.reportNumLevel == 2) {
				  this.reportNum.zph = item.reportNum;
				} else if (item.reportNumLevel == 3) {
				  this.reportNum.hhh = item.reportNum;
				}
			}
		})
				
		//共同委托人
		if(this.detailData.coClientList){
			var coClientNameArr = [];
			this.detailData.coClientList.forEach((item, index) =>{
				if(item.clientType<1000){
					coClientNameArr.push(item.clientTypeName + item.clientName)
				}else{
					coClientNameArr.push(item.clientName)
				}
			});
			this.detailData.coClientName = coClientNameArr.join(', ');
		}
		
      }).catch(error =>{
		this.$message.error('计划系统内无该项目数据');
	  })
    },
    goBack() {
      this.$router.back()
    },
	
	//211116变动， 新增不同项目类型，使用不用项目消息模板
	copy(e) {
	  this.$message.success('内容已复制到剪贴板')
	},
	showInfo(){
	  var tempType=0;
		
	  let riskProfile = '';
	  if (this.detailData.riskProfile == '1001') {
	    riskProfile == '低';
	  } else if (this.detailData.riskProfile == '1002') {
	    riskProfile = '中等';
	  } else if (this.detailData.riskProfile == '1003') {
	    riskProfile = '较高';
	  } else {
	    riskProfile = '高';
	  }
	  let newOldType = '';
	  if (this.detailData.newOldType == '1001') {
	    newOldType = '新项目';
	  } else if (this.detailData.newOldType == '1002') {
	    newOldType = '重评项目';
	  }
	  //处理value转为label展示
	  let projLabel = '';
	  let projType = '';
	  for (var i = 0; i < this.projTypeOption[this.companyTabsId].length; i++) {
	    if (this.detailData.projType == this.projTypeOption[this.companyTabsId][i].value) {
	      projLabel = this.projTypeOption[this.companyTabsId][i].label;
	      projType = this.projTypeOption[this.companyTabsId][i].type;
		  
		  //判断模板， 默认1， 绩效2， 复审3, 智明4, 汇正5
		  if(this.companyTabsId == 0){
			//惠正模板
			if(projType == 'JX'){
				tempType = 2;  
			}else if(projType == 'FSF' || projType == 'FSZ' || projType == 'FST'){
				tempType = 3;    
			}else{
				tempType = 1;
			}
		  }else if(this.companyTabsId == 1){
			if(projType == 'ZMC'){
				//智明测绘模板
				tempType = 11;
			}else if(projType == 'ZMZ'){
				//智明咨询模板
				tempType = 12;
			}
		  }else if(this.companyTabsId == 2){
			//汇正模板
			tempType = 21;
		  }
		  
	    }
	  }
	  // ZP项目类型：资；委托 人：(其他):惠州市水务投资集团；项目名称：惠州大道大湖溪段667平方米租金；评估对象及其坐落：同上;；评估目的：物业出租价格；引荐人及其电话：惠州市水务投资集团王总135 0229 7502；现联系单位、人及电话：同上；现勘时间：现勘同事约；报告时间要求：5天；项目风险预测：；评估收费报价：待定；是否曾评估的项目：（若是，原项目组成员：）；项目接洽人""[52]-缨(注师：莎缨;助理：健;专业复核人:远。以下由项目负责人安排 现勘：;资料核查验证：;市场询价调查：;技术报告:；报告编制:; 归档：;对外沟通:
	  if (this.detailData.clientName != '') {
	    var clientName = this.detailData.clientName;
	  } else if (this.detailData.clientId == '0') {
	    var clientName = '委托人待定';
	  } else {
	    var clientName = this.$refs['cascaderAddr'].getCheckedNodes()[0].label;
	  }
	  
	  //格式化时间戳
	  let fldSrvySchedule = '';
	  if(this.detailData.fldSrvySchedule){
		const date = new Date(this.detailData.fldSrvySchedule);
		fldSrvySchedule = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
	  }
	  
	  if(tempType == 1){
		//惠正默认模板 项目编号:${this.detailData.projNum}; 
		this.newInfoData = `${projType}项目类型:${projLabel}; 委托人:${clientName}; 项目名称:${this.detailData.projName}; 评估对象及其坐落:${this.detailData.projScope}; 评估目的:${this.detailData.assemGoal}; 引荐人及其电话:${this.detailData.projReferer}${this.detailData.projRefererInfo}; 现勘联系人及电话：${this.detailData.fldSrvyContact}${this.detailData.fldSrvyContactInfo}; 现勘时间: ; 报告时间要求:${this.detailData.compSchedule?this.detailData.compSchedule:' '}天; 项目风险预测:${riskProfile}; 评估收费报价:${this.detailData.assemFeeQuote?this.detailData.assemFeeQuote:''}; 是否曾评估项目:${newOldType}; 项目接洽人:${this.detailData.projContactType} ${this.detailData.projContact} (注师：；助理：；专业复核人:)。以下由项目负责人安排,现勘:${this.detailData.fieldSrvy}; 资料核查验证: ; 市场询价调查: ; 技术报告: ; 报告编制: ; 归档: ; 对外沟通: 。`;
		  
	  }else if(tempType == 2){
		//惠正绩效模板
		//JX项目类型：绩效评价；委托人：；评价目的：；项目名称： ；引荐人、现勘及资料收集联系电话：；报告时间要求：；收费：。      项目接洽人：(项目组成员： ；总审：；现勘及资料收集和验证：；市场询价调查：；报告编制：；聘请专家：；归档：；对外沟通人：。)
		this.newInfoData = `${projType}项目类型:${projLabel}; 委托人:${clientName}; 评价目的:${this.detailData.assemGoal}; 项目名称:${this.detailData.projName}; 引荐人及其电话:${this.detailData.projReferer} ${this.detailData.projRefererInfo}; 现勘联系人及电话：${this.detailData.fldSrvyContact} ${this.detailData.fldSrvyContactInfo}; 现勘时间: ; 报告时间要求:${this.detailData.compSchedule?this.detailData.compSchedule:' '}天; 收费报价:${this.detailData.assemFeeQuote?this.detailData.assemFeeQuote:''}; 项目接洽人:${this.detailData.projContactType} ${this.detailData.projContact} (项目组成员：；总审：；); 现勘:${this.detailData.fieldSrvy}; 资料核查验证: ; 市场询价调查: ; 报告编制: ; 聘请专家: ; 归档: ; 对外沟通人: 。`;
	  }else if(tempType == 3){
		//惠正复审模板
		//FSZ项目类型：资产复审；委托方：；评估对象范围及其座落：；引荐人、现勘联系单位、人及电话：；现勘时间: ；报告时间要求：2天。评审要求：；  项目接洽人：；(评审师：现勘：助理：   ；对外沟通人：
		this.newInfoData = `${projType}项目类型:${projLabel}; 委托方:${clientName}; 项目名称:${this.detailData.projName}; 引荐人及其电话:${this.detailData.projReferer}${this.detailData.projRefererInfo}; 现勘联系人及电话：${this.detailData.fldSrvyContact}${this.detailData.fldSrvyContactInfo}; 现勘时间: ; 报告时间要求:${this.detailData.compSchedule?this.detailData.compSchedule:' '}天; 评审要求: ; 项目接洽人:${this.detailData.projContactType} ${this.detailData.projContact} (评审师：；助理：；); 现勘:${this.detailData.fieldSrvy}; 对外沟通人: 。`;
	  }else if(tempType == 11){
		//智明测绘模板
		this.newInfoData = `${projType}项目类型:${projLabel}; 委托人:${clientName}; 项目名称:${this.detailData.projName}; 测绘对象及其坐落:${this.detailData.projScope}; 测绘目的:${this.detailData.assemGoal}; 测绘联系人及电话：${this.detailData.fldSrvyContact}${this.detailData.fldSrvyContactInfo}; 测绘时间: ; 报告时间要求:${this.detailData.compSchedule?this.detailData.compSchedule:' '}天; 项目风险预测:${riskProfile}; 测绘收费报价:${this.detailData.assemFeeQuote?this.detailData.assemFeeQuote:''}; 是否曾测绘项目:${newOldType}; 项目接洽人:${this.detailData.projContactType} ${this.detailData.projContact} (注师：；助理：；专业复核人:)。以下由项目负责人安排,测绘:${this.detailData.fieldSrvy}; 资料核查验证: ; 市场询价调查: ; 技术报告: ; 报告编制: ; 归档: ; 对外沟通: 。`;
	  }else if(tempType == 12){
		//智明咨询模板
		this.newInfoData = `${projType}项目类型:${projLabel}; 委托人:${clientName}; 项目名称:${this.detailData.projName}; 咨询目的:${this.detailData.assemGoal}; 咨询联系人及电话：${this.detailData.fldSrvyContact}${this.detailData.fldSrvyContactInfo}; 咨询时间: ; 报告时间要求:${this.detailData.compSchedule?this.detailData.compSchedule:' '}天; 项目风险预测:${riskProfile}; 咨询收费报价:${this.detailData.assemFeeQuote?this.detailData.assemFeeQuote:''}; 是否曾咨询项目:${newOldType}; 项目接洽人:${this.detailData.projContactType} ${this.detailData.projContact} (注师：；助理：；专业复核人:)。以下由项目负责人安排,咨询:${this.detailData.fieldSrvy}; 资料核查验证: ; 市场询价调查: ; 技术报告: ; 报告编制: ; 归档: ; 对外沟通: 。`;
	  }else if(tempType == 21){
		//汇正模板
		this.newInfoData = `${projType}项目类型:${projLabel}; 委托人:${clientName}; 项目名称:${this.detailData.projName}; 审计目的:${this.detailData.assemGoal}; 审计联系人及电话：${this.detailData.fldSrvyContact}${this.detailData.fldSrvyContactInfo}; 审计时间: ; 报告时间要求:${this.detailData.compSchedule?this.detailData.compSchedule:' '}天; 项目风险预测:${riskProfile}; 审计收费报价:${this.detailData.assemFeeQuote?this.detailData.assemFeeQuote:''}; 是否曾审计项目:${newOldType}; 项目接洽人:${this.detailData.projContactType} ${this.detailData.projContact} (注师：；助理：；专业复核人:)。以下由项目负责人安排,审计:${this.detailData.fieldSrvy}; 资料核查验证: ; 市场询价调查: ; 技术报告: ; 报告编制: ; 归档: ; 对外沟通: 。`;
	  }
	  
	  this.newInfo = true;
	},
	
	onProjTypeChangeVisable(){		
	  if(this.companyTabsId == 0){
		//处理惠正
		
	  }else if(this.companyTabsId == 1){
		//处理智明业务输入框是否显示
		if(this.detailData.projType>=2100 && this.detailData.projType <2200){
			//测绘
			return 1;
		}else if(this.detailData.projType>=2200 && this.detailData.projType <2300){
			//咨询
			return 2;  
		}  
	  }else if(this.companyTabsId == 1){
		//处理汇正
		
	  }
	},	
	
	pageInfoEdit(){
		/* 
		var plan_pageinfo = JSON.parse(sessionStorage.getItem('plan_pageinfo'));
		if(plan_pageinfo){
		  plan_pageinfo.status = 1; //更新状态
		  sessionStorage.setItem('plan_pageinfo', JSON.stringify(plan_pageinfo));
		}	
		
		var contract_pageinfo = JSON.parse(sessionStorage.getItem('contract_pageinfo'));
		if(contract_pageinfo){
		  contract_pageinfo.status = 1; //更新状态
		  sessionStorage.setItem('contract_pageinfo', JSON.stringify(contract_pageinfo));
		}
		
		 */
		
		var plan_pageinfo = JSON.parse(this.global.plan_pageinfo);
		if(plan_pageinfo){
		  plan_pageinfo.status = 1; //更新状态
		  this.global.plan_pageinfo = JSON.stringify(plan_pageinfo);
		}	
		
		var contract_pageinfo = JSON.parse(this.global.contract_pageinfo);
		if(contract_pageinfo){
		  contract_pageinfo.status = 1; //更新状态
		  this.global.contract_pageinfo = JSON.stringify(contract_pageinfo);
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
	}
  }
}
</script>

<style scoped>
.detail {
  padding: 10px;
}
.detail-content {
  color: #2f2f2f;
}
.el-tag--medium {
  font-size: 16px;
  height: 30px;
  line-height: 30px;
}
.label span {
  font-size: 16px;
}
/deep/ .label .el-form-item__label {
  color: #009ad6;
  font-size: 16px;
}
.title {
  margin: 10px 0 10px 0;
  font-size: 20px;
}
</style>