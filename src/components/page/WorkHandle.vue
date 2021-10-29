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
        >初评号{{this.reportNum.cph}}</el-radio>
      </div>
      <div v-if="this.reportNum.zph !== ''">
        <el-radio
          v-model="deleteNumSelectVal"
          :label="2"
        >正评号{{this.reportNum.zph}}</el-radio>
      </div>
      <div v-if="this.reportNum.hhh !== ''">
        <el-radio
          v-model="deleteNumSelectVal"
          :label="3"
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
      title="创建子项目信息"
      :visible.sync="subProjVisible"
      width="60%"
    >
      <h3>父项目报告号:{{subFatherReport}}</h3>
      <el-form
        ref="subFormRules"
        :model="subProjForm"
        label-width="auto"
        :rules="subFormRules"
      >
        <el-form-item
          label="子项目报告号"
          prop="subReportNum"
        >
          <el-input
            placeholder="例:001"
            style="width: 80px"
            v-model="subProjForm.subReportNum"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="子项目项目名称"
          prop="subProjName"
        >
          <el-input
            style="width: 200px"
            v-model="subProjForm.subProjName"
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
        <el-form-item
          label="子项目项目范围"
          prop="subProjScope"
        >
          <el-input
            style="width: 200px"
            v-model="subProjForm.subProjScope"
          ></el-input>
        </el-form-item>
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
      <div slot="footer">
        <el-button
          type="text"
          @click="subProjVisible = false"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="addSubProj(subFatherReport)"
        >确认提交</el-button>
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
    <WorkArrgDialog
      :show.sync="workArrgDialogVisible"
      :projId="projDetail.projId"
      :projType="projDetail.projType"
      :projMember="projMember"
      :arrgEdit="workArrgEdit"
      :arrgData="arrgData"
      :baseDate="projDetail.baseDate"
      :projLeader="projDetail.projLeader"
      :projReviewer="projDetail.projReviewer"
      :projProReviewer="projDetail.projProReviewer"
      :projAsst="projDetail.projAsst"
      :fieldSrvy="projDetail.fieldSrvy"
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
        <span class="work-title-name">项目信息</span>
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
              icon="el-icon-set-up"
              size="medium"
              :disabled="true"
          >更改项目类型（已停用）</el-button>
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
              <div class="item"><span>评估目的：</span>{{this.projDetail.assemGoal}}</div>
              <div class="item"><span>基准日：</span>{{formatDate(this.projDetail.baseDate)}}</div>
              <div class="item"><span>项目名称：</span>{{this.projDetail.projName}}</div>
              <div class="item"><span>项目范围：</span>{{this.projDetail.projScope}}</div>
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
              <div class="item"><span>专业复核人：</span>{{this.projDetail.projProReviewer}}</div>
              <div class="item"><span>项目助理：</span>{{this.projDetail.projAsst}}</div>
              <div class="item"><span>现场勘查：</span>{{this.projDetail.fieldSrvy}}</div>
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
              <span style="margin-left: 30px">
                <el-button
                  type="text"
                  icon="el-icon-info"
                  size="medium"
                  @click="changNumShowType"
                >报告号文字转换</el-button>
              </span>
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
                      <span v-if="reportNumShowType == false">{{reportNum.cph}}
                        <el-button
                          style="right: 0px;"
                          type="text"
                          icon="el-icon-copy-document"
                          size="medium"
                          v-clipboard:copy="reportNum.cph"
                          v-clipboard:success="copy"
                        >复制</el-button>
                      </span>
                      <span
                        v-else
                        style="font-size: 14px;"
                      >{{cnReportNum.cph}}
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
                      <span v-if="reportNumShowType == false">{{reportNum.zph}}
                        <el-button
                          style="right: 0px;"
                          type="text"
                          icon="el-icon-copy-document"
                          size="medium"
                          v-clipboard:copy="reportNum.zph"
                          v-clipboard:success="copy"
                        >复制</el-button>
                      </span>
                      <span
                        v-else
                        style="font-size: 14px;"
                      >{{cnReportNum.zph}}
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
                      <span v-if="reportNumShowType == false">{{reportNum.hhh}}
                        <el-button
                          style="right: 0px;"
                          type="text"
                          icon="el-icon-copy-document"
                          size="medium"
                          v-clipboard:copy="reportNum.hhh"
                          v-clipboard:success="copy"
                        >复制</el-button>
                      </span>
                      <span
                        v-else
                        style="font-size: 14px;"
                      >{{cnReportNum.hhh}}
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
                  plain
                  size="medium"
                  @click="handleCreateContractNum()"
                  :disabled="!!(projDetail.projState == 2 || projDetail.projState == 1 || this.contractNum != '')"
                >获取</el-button>
                <el-button
                  icon="el-icon-suitcase"
                  type="danger"
                  plain
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
      <el-col :span="23">
        <el-card>
          <div slot="header">综合进度安排</div>
          <div v-if="this.workArrgEdit == true">
            <el-row :gutter="20">
              <el-col :span="6">
                <h4>综合进度</h4>
              </el-col>
              <el-col :span="10">
                <h4>时间安排</h4>
              </el-col>
              <el-col :span="8">
                <h4>责任人</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <div
                  class="workname-left"
                  v-for="item in workName"
                  :key="item"
                >
                  {{item}}
                </div>
              </el-col>
              <el-col :span="10">
                <div
                  class="workname-left"
                  v-for="(item, i) in workDate"
                  :key="i"
                >{{item}}</div>
              </el-col>
              <el-col :span="8">
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
        prop="subReportNum"
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
          <!-- <el-button type="text">查看</el-button> -->
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
    <div class="work-title">
      <span class="work-title-name">操作记录</span>
    </div>
    <el-divider></el-divider>
    <el-card style="width: 50%">
      <OpRecord
          :projId="projDetail.projId"
      ></OpRecord>
    </el-card>
    <el-dialog
          title="修改外部合同号"
          :visible.sync="contractNumDialogVisible"
          width="30%"
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
    <createReportNumDialog
    :show.sync="createReportNumDialogVisible" :projType="projDetail.projType" :projId="projDetail.projId" @response="createReportNumResponse"
    :reportNumList="projDetail.reportNumList" v-if="createReportNumDialogVisible"
    ></createReportNumDialog>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import QRCode from 'qrcodejs2'
import { host } from '@/config'
//api
import { createReportQrCode,editProject, getDetailProjInfo,
  getWorkAssignment, delWorkAssignment, setWorkAssignment, createReportNum,
  deleteReportNum, alterProjType, getProjInfoTable, getOldReportNum,
  createContractNum, deleteContractNum, setProjState ,updateExternalContractNum} from '@/api/index'
import { addSubProject, getSubProjectInfoList, delSubProject } from '@/api/subReport'
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
      queryData: '',
      arrgData: {},
      projDetail: {},
      projMember: [],
      reportNum: {},
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
      workName: ['前期准备', '现场勘查及收集资料', '市场调查询价记录', '评定估算', '编制出具评估（估价）报告', '内部三级审核', '与委托人沟通', '评估收费', '修正定稿及提交报告', '工作底稿归档'],
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
        reportNum: '',
        subReportNum: '',
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
        subReportNum: [
          { required: true, message: '请输入子项目报告号', trigger: 'blur' }
        ],
        subProjName: [{ required: true, message: '请输入子项目名称', trigger: 'blur' }],
        subProjScope: [{ required: true, message: '请输入子项目范围', trigger: 'blur' }],
        subBaseDate: [{ required: true, message: '请输入子项目基准日', trigger: 'blur' }],
        subProjLeader: [{ required: true, message: '请选择子项目负责人', trigger: 'change' }],
        subProjReviewer: [{ required: true, message: '请选择子项目复核人', trigger: 'change' }],
        subProjProReviewer: [{ required: true, message: '请选择子项目专业复核人', trigger: 'change' }],
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
      reportNumList: '',
      form: {
        projId: '',
        registerType: '',
        registerId: '',
        //基本信息
        paReportNum: '',
        faReportNum: '',
        subReportNum: '',
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
        subReportNum: '',

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
      preContractNumDialogVisible: false
    };
  },
  created() {
    //处理从工作台获取的val -> queryData
    this.queryData = JSON.parse(this.$route.query.data)
    //this.workArrgForm.projId = this.queryData.projId
    this.projTypeOption = projTypeOption
    //处理项目类型value转为label展示
    for (var i = 0; i < this.projTypeOption.length; i++) {
      if (this.queryData.projType == this.projTypeOption[i].value) {
        this.transedProjType.projType = this.projTypeOption[i].label
      }
    }
    //调项目详情接口
    this.getDetail()

    //调工作安排接口

    this.getWorkAssignmentData()
    //子项目信息接口
    //this.check()
  },
  mounted() {
  },
  // ███╗   ███╗███████╗████████╗██╗  ██╗ ██████╗ ██████╗ ███████╗
  // ████╗ ████║██╔════╝╚══██╔══╝██║  ██║██╔═══██╗██╔══██╗██╔════╝
  // ██╔████╔██║█████╗     ██║   ███████║██║   ██║██║  ██║███████╗
  // ██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║   ██║██║  ██║╚════██║
  // ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║╚██████╔╝██████╔╝███████║
  // ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝                                                           
  methods: {
    getDetail() {
      getDetailProjInfo({ projId: this.queryData.projId })
        .then(res => {
          if (res.statusCode == 200) {
            this.projDetail = res.data
            if (res.data.reportNumList != '') {
              this.reportNum = res.data.reportNumList
            }
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
          }
          this.$nextTick(() => {
            //禁用同类型的“更改项目类型”
            for (let i of this.typeOptions) {
              if (this.projDetail.projType == i.value) {
                i.disable = true
              }
            }
            //
            if (this.reportNum.cph != '' && this.reportNum.zph != '') {
              this.reportNumList = this.reportNum.cph + ',' + this.reportNum.zph
            } else if (this.reportNum.cph == '' && this.reportNum.zph == '') {
              this.reportNumList = ''
            } else if (this.reportNum.cph == '' && this.reportNum.zph != '') {
              this.reportNumList = this.reportNum.zph
            } else if (this.reportNum.zph == '' && this.reportNum.cph != '') {
              this.reportNumList = this.reportNum.cph
            }
            getSubProjectInfoList({ projId: this.projDetail.projId })
              .then(res => {
                this.subTableData = res.data
                // this.subTableData = res.data.cph
                // this.subTableData = this.subTableData.concat(res.data.zph)
              })
              .catch(err => {
              })
            //this.check()
          })
        })
        .catch(err => {
          this.$message.error('获取项目详细信息失败')
        })
    },
    check() {
      checkFaRegister({ projId: this.projDetail.projId, subReportNum: '-' })
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
    //文字转换前置判断
    changNumShowType() {

      if (this.reportNum.cph != '') {
        let cph = this.reportNum.cph
        this.changeNumType(cph, 1)
      }
      if (this.reportNum.zph != '') {
        let zph = this.reportNum.zph
        this.changeNumType(zph, 2)
      }
      if (this.reportNum.hhh != '') {
        let hhh = this.reportNum.hhh
        this.changeNumType(hhh, 3)
      }
      this.reportNumShowType = !this.reportNumShowType
    },
    changeNumType(val, type) {
      let num = ''
      let projType = ''
      let numType = ''

      switch (type) {
        case 1:
          num = this.reportNum.cph
          numType = '初评字'
          if (this.projDetail.projType == 1010) {
            projType = '房地'
          } else if (this.projDetail.projType == 1020) {
            projType = '资'
          } else if (this.projDetail.projType == 1030) {
            projType = '土地'
          }
          break
        case 2:
          num = this.reportNum.zph
          if (this.projDetail.projType == 1010) {
            projType = '房地估字'
          } else if (this.projDetail.projType == 1020) {
            projType = '资评报字'
          } else if (this.projDetail.projType == 1030) {
            projType = '土地估字'
          } else if (this.projDetail.projType == 1041) {
            projType = '房地咨字'
          } else if (this.projDetail.projType == 1042) {
            projType = '资咨报字'
          } else if (this.projDetail.projType == 1043) {
            projType = '土地咨字'
          } else if (this.projDetail.projType == 1061 || this.projDetail.projType == 1062 || this.projDetail.projType == 1063) {
            projType = '审报字'
          } else if (this.projDetail.projType == 1050 || this.projDetail.projType == 1080) {
            projType = '咨字'
          } else if (this.projDetail.projType == 1070) {
            projType = '外协'
          } else if (this.projDetail.projType == 1090) {
            projType = '绩效评字'
          }
          break
        case 3:
          num = this.reportNum.hhh
          numType = '函'
          break
      }
      const comp = '惠正'
      const year = '[' + num.substr(0, 4) + ']'
      const lastNum = '第' + num.substr(4) + '号'
      const final = comp + projType + numType + year + lastNum
      if (type == 1) {
        this.cnReportNum.cph = final
      } else if (type == 2) {
        this.cnReportNum.zph = final
      } else if (type == 3) {
        this.cnReportNum.hhh = final
      }
    },
    copy(e) {
      this.$message.success('内容已复制到剪贴板')
    },
    getWorkAssignmentData() {
      getWorkAssignment({ projId: this.queryData.projId })
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
              this.workPeople.push(res.data.prePreparationPic, res.data.fldSrvyPic, res.data.mktSrvyPic, res.data.assemEstPic, res.data.issueValPic, res.data.internalAuditPic, res.data.commuClientPic, res.data.assemChargePic, res.data.amendFinalPic, res.data.manuArchivePic)
              this.workDate.push(res.data.prePreparationSche, res.data.fldSrvySche, res.data.mktSrvySche, res.data.assemEstSche, res.data.issueValSche, res.data.internalAuditSche, res.data.commuClientSche, res.data.assemChargeSche, res.data.amendFinalSche, res.data.manuArchiveSche)
              this.arrgData = res.data
              //
              this.transData()
              //后期看看让后端分割出date和people
              // this.workPeople.push(res.data.prePreparationPic, res.data.fldSrvyPic, res.data.mktSrvyPic, res.data.assemEstPic, res.data.issueValPic, res.data.internalAuditPic, res.data.commuClientPic, res.data.assemChargePic, res.data.amendFinalPic, res.data.manuArchivePic)
              // this.workDate.push(res.data.prePreparationSche, res.data.fldSrvySche, res.data.mktSrvySche, res.data.assemEstSche, res.data.issueValSche, res.data.internalAuditSche, res.data.commuClientSche, res.data.assemChargeSche, res.data.amendFinalSche, res.data.manuArchiveSche)
              console.log('转类型后arrgData', this.arrgData)
              // console.log('workPeople', this.workPeople)
              // console.log('workArrgEdit', this.workArrgEdit)
            }
          }
        })
        .catch(err => {
          console.log('获取项目安排信息', err)
        })
    },
    transData() {
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
    },
    // handleWorkArrg() {
    //   //this.$router.push({ path: '/workarrange', query: { data: this.queryData, projMember: this.projMember, isEdit: this.workArrgEdit } })
    //   this.workArrgVisible = true
    // },
    handleDetail() {
      this.$router.push({ path: '/projcheck', query: { data: this.queryData.projId } })
    },
    handleEdit() {
      this.$router.push({ path: '/planform', query: { data: this.queryData.projId } })
    },
    handleChangeType() {
      // if (this.statusInfo.registerState == true || this.statusInfo.evalObjState == true) {
      //   this.$message.error('该项目已填写估价对象详情或已登记正评，不可改变类型')
      //   return 0
      // }
      this.changeTypeVisible = true
      this.changeType.projId = this.queryData.projId
      let selOption = this.typeOptions
      const index = selOption.findIndex((item, index, arr) => {
        console.log('value>>>', item)
        return item.value == this.queryData.projType
      })
      //selOption.splice(index, 1)
      this.typeOptions = selOption
    },
    changeProjType() {
      if (this.changeType.toType == '') {
        this.$message.info('请选择修改类型');
      } else {
        alterProjType(this.changeType)
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
        getEvalObjDetail({ projId: this.projDetail.projId, subReportNum: '-' })
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
            this.regForm.subReportNum = this.projDetail.subReportNum
            //
            this.regForm.infoVerification = this.regForm.infoVerification.join(',')
            this.regForm.marketEnquiry = this.regForm.marketEnquiry.join(',')
            this.regForm.techExp = this.regForm.techExp.join(',')
            this.regForm.reportDrafter = this.regForm.reportDrafter.join(',')
            this.regForm.feeFollowUp = this.regForm.feeFollowUp.join(',')
            this.regForm.signedAppraiser = this.regForm.signedAppraiser.join(',')
            this.regForm.projAsst = this.regForm.projAsst.join(',')
            this.regForm.fieldSrvy = this.regForm.fieldSrvy.join(',')
            console.log(this.regForm)
            submitFaRegister(this.regForm)
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
            console.log('正评登记编辑Form', this.regForm)
            editFaRegister(this.regForm)
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
      //   this.regForm.subReportNum = this.projDetail.subReportNum
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

      createReportQrCode(this.qrcodeForm)
          .then(res => {
            this.qrCodeSrc = `${ProManageAPIServer}qrCode/readReportQrCode/`+this.projDetail.projId
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
            createContractNum({ projId: this.queryData.projId, externalContractNum: this.preExternalContractNum })
                .then(res => {
                  this.reload();
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
    handleDeleteContractNum() {
      // this.$message.warning("请联系管理员进行删除")

      if (this.projDetail.contractNum == null) {
        this.$message.warning('尚未获取合同号')
      } else {
        this.$confirm('即将删除合同号，确定吗？', '提示：即将删除[' + this.contractNum + ']', { type: 'error' })
          .then(() => {
            deleteContractNum({ contractNum: this.contractNum })
              .then(res => {
                this.$message.success('合同号已删除！')
                this.reload()
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
    handlePrintProj(val) {
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
      oReq.responseType = 'blob'
      oReq.onload = function (oEvent) {
        //生产环境需要加上前缀/hzms/hzht
        window.open('/static/pdf/web/viewer.html?file=' + encodeURIComponent(URL.createObjectURL(new Blob([oReq.response]))))
      }
      const fdata = new FormData()
      fdata.append('projId', parseInt(that.queryData.projId))
      oReq.send(fdata)
    },
    //取号流程
    handleGetNum() {
      this.createReportNumDialogVisible = true
    },
    getNewNum(val) {
      if (val == 1) { //初评号
        //房地资才有初评号
        if (this.queryData.projType == 1010 || this.queryData.projType == 1020 || this.queryData.projType == 1030) {
          this.getNumType = this.queryData.projType + 1
        } else {
          this.$message.warning('非房地资项目请选择正评号')
          return 0
        }
      } else if (val == 2) { //正评号
        if (this.queryData.projType == 1010 || this.queryData.projType == 1020 || this.queryData.projType == 1030) {
          this.getNumType = this.queryData.projType + 2 //房地资正评
        } else if (this.queryData.projType == 1041 || this.queryData.projType == 1042 || this.queryData.projType == 1043) {
          //*********
          //请不要怀疑这一段代码为什么这么绕口令，因为初期提需求的时候（也就是写下这段代码的本人）没有考虑好projType和ReportNumType的关系，详情参考接口文档
          //*********
          if (this.queryData.projType == 1041) {
            this.getNumType = 1013 //房咨询正评
          } else if (this.queryData.projType == 1042) {
            this.getNumType = 1023 //资咨询正评
          } else if (this.queryData.projType == 1043) {
            this.getNumType = 1033 //土咨询正评
          }
        } else {
          this.getNumType = this.queryData.projType
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
      createReportNum({ projId: this.queryData.projId, reportNumType: this.getNumType })
        .then(res => {
          this.$message.success('取号成功')
          //this.reload()
          this.getDetail()
          this.getNumVisible = false
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
        if (this.queryData.projType == 1010 || this.queryData.projType == 1020 || this.queryData.projType == 1030) {
          this.getNumType = this.queryData.projType + 2 //房地资正评
        } else if (this.queryData.projType == 1041 || this.queryData.projType == 1042 || this.queryData.projType == 1043) {
          //*********
          //请不要怀疑这一段代码为什么这么绕口令，因为初期提需求的时候（也就是写下这段代码的本人）没有考虑好projType和ReportNumType的关系，详情参考接口文档
          //*********
          if (this.queryData.projType == 1041) {
            this.getNumType = 1013 //房咨询正评
          } else if (this.queryData.projType == 1042) {
            this.getNumType = 1023 //资咨询正评
          } else if (this.queryData.projType == 1043) {
            this.getNumType = 1033 //土咨询正评
          }
        } else {
          this.getNumType = this.queryData.projType
        }
        getOldReportNum({ projId: this.queryData.projId, reportNumType: this.getNumType, takenDate: this.takenDate })
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
          deleteReportNum({ reportNum: this.needDelNum })
            .then(res => {
              this.$message.success('删除成功')
              //this.reload()
              this.getDetail()
              this.delNumVisible = false
            })
            .catch(err => {
              this.$message.warning('删除失败，请稍后再试')
            })
        })
        .catch(() => { })
    },//end of delNum

    //子项目
    handleAddSubProj(val) {
      if (val !== '') {
        console.log(val)
        this.subProjVisible = true
        this.subFatherReport = val
      } else {
        this.$message('请先获取的对应初(正)评号')
      }
    },
    handleSubProjDetail(val) {
      console.log('subProjDetailval', val)
      this.$router.push({ path: '/subworkhandle', query: { data: JSON.stringify(val) } })
    },
    addSubProj(val) {
      //val传入对应父项目报告号
      this.$refs.subFormRules.validate((valid) => {
        if (valid) {
          this.subProjForm.subProjLeader = this.subProjForm.subProjLeader.join(',')
          this.subProjForm.subProjReviewer = this.subProjForm.subProjReviewer.join(',')
          this.subProjForm.subProjProReviewer = this.subProjForm.subProjProReviewer.join(',')
          this.subProjForm.subProjAsst = this.subProjForm.subProjAsst.join(',')
          this.subProjForm.subFieldSrvy = this.subProjForm.subFieldSrvy.join(',')
          console.log('新增子项目（正评）form', this.subProjForm)
          this.subProjForm.reportNum = val
          addSubProject(this.subProjForm)
            .then(res => {
              this.$message.success('创建子项目成功')
              this.reload()
            })
            .catch(err => {
              if (statusCode == 5002) {
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
    delSubProj(row) {
      this.$confirm('确定要删除吗？', '提示', { type: 'warning' })
        .then(() => {
          delSubProject({ subProjId: row.subProjId })
            .then(res => {
              this.$message.success('删除子项目成功')
              this.reload()
            })
            .catch(err => {
              this.$message.warning('删除失败，请稍后重试')
            })
        })
        .catch(() => { })
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
      getEvalObjDetail({ projId: this.projDetail.projId, subReportNum: '-' })
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
    isWorkArrgDialog() {
      this.workArrgDialogVisible = true
    },
    resetArrg() {
      this.$confirm('确定要清空工作安排吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          delWorkAssignment({ projId: this.projDetail.projId })
            .then(res => {
              console.log(res)
              this.reload()
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
          setProjState({projId: this.projDetail.projId, stateCode: val})
            .then(res => {
              console.log(res)
              this.reload()
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
      }).then(
          res => {
            this.$message.success('修改成功');
            this.reload()
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
</style>