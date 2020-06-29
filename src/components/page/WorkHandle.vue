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
    <el-dialog
      title="取号"
      :visible.sync="getNumVisible"
      width="30%"
      prop="reportNumSelectVal"
    >
      <el-radio-group v-model="reportNumSelectVal">
        <el-radio :label="1">初评号</el-radio>
        <el-radio :label="2">正评号</el-radio>
        <el-radio :label="3">回函号</el-radio>
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
        <el-form-item label="子项目基准日">
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
        <el-form-item label="项目负责人">
          <el-checkbox-group v-model="subProjForm.subProjLeader">
            <el-checkbox
              v-for="item in projMember"
              :key="item"
              :label="item"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="项目复核人">
          <el-checkbox-group v-model="subProjForm.subProjReviewer">
            <el-checkbox
              v-for="item in projMember"
              :key="item"
              :label="item"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="专业复核人">
          <el-checkbox-group v-model="subProjForm.subProjProReviewer">
            <el-checkbox
              v-for="item in projMember"
              :key="item"
              :label="item"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="项目助理">
          <el-checkbox-group v-model="subProjForm.subProjAsst">
            <el-checkbox
              v-for="item in projMember"
              :key="item"
              :label="item"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="现场勘查">
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
      width="30%"
      @close="closeQRCode"
      :visible.sync="qrcodeVisible"
      append-to-body
    >
      <div>
        <span style="color: red">Tips: 右键二维码-图片另存为即可保存</span>
      </div>
      <div
        id="qrcode"
        ref="qrcode"
        style="margin-left:27%"
      ></div>
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
      title="评估（估价）对象详情"
      :visible.sync="assemObjDetailVisible"
      width="80%"
    >
      <el-tabs>
        <el-tab-pane label="基本信息">
          <el-form
            :model="form"
            :disabled="this.isReg"
          >
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="估价目的">
                  <el-select
                    v-model="form.evalGoal"
                    style="width: 100%"
                    filterable
                  >
                    <el-option
                      v-for="item in assemGoalOption"
                      :key="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="价值类型">
                  <el-select
                    v-model="form.valueType"
                    style="width: 100%"
                    filterable
                  >
                    <el-option
                      v-for="item in priceTypeOption"
                      :key="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="本报告的估价对象个数">
                  <el-input
                    v-model="form.evalObjCount"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="估价对象所在城市">
                  <el-input v-model="form.evalObjCity"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="估价对象所在行政区">
                  <el-input v-model="form.evalObjAdminRegion"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="估价对象所在小区">
                  <el-input v-model="form.evalObjCommunity"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="项目完成时间">
                  <el-date-picker
                    style="width: 100%"
                    v-model="form.projCompTime"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="估价方法说明">
                  <el-input v-model="form.assemMethodExp"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="估价对象土地面积（平方米）">
                  <el-input
                    v-model="form.evalObjAcreage"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="土地评估单价（元/平方米）">
                  <el-input
                    v-model="form.landAssemUnitPrice"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    @blur="calculate(form.evalObjAcreage, form.landAssemUnitPrice, 1)"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="估价对象建筑面积（平方米）">
                  <el-input
                    v-model="form.evalObjArea"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="建筑评估单价（元/平方米）">
                  <el-input
                    v-model="form.buildingAssemUnitPrice"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                    @blur="calculate(form.evalObjArea, form.buildingAssemUnitPrice, 2)"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <h4>土地总价值：{{this.form.landTotalValue}}万元</h4>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <h4>建筑总价值：{{this.form.buildingTotalValue}}万元</h4>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <h3 style="color: red">估价对象评估总价：{{this.form.evalObjTotalAssemValue}}万元</h3>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <h3 style="color: red">项目总价值：{{this.form.projTotalValue}}万元</h3>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="房屋信息">
          <el-form :model="form">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="房屋用途">
                  <el-select
                    style="width: 100%"
                    v-model="form.unitUsage"
                  >
                    <el-option
                      v-for="item in housePurposeOption"
                      :key="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="房屋类型">
                  <el-select
                    style="width: 100%"
                    v-model="form.unitType"
                  >
                    <el-option
                      v-for="item in houseTypeOption"
                      :key="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="房屋性质">
                  <el-select
                    style="width: 100%"
                    v-model="form.unitProperty"
                  >
                    <el-option
                      v-for="item in houseAttributeOption"
                      :key="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="户型结构">
                  <el-select
                    style="width: 100%"
                    v-model="form.houseTypeStructure"
                  >
                    <el-option
                      v-for="item in houstStructureOption"
                      :key="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="户型">
                  <el-select
                    style="width: 100%"
                    v-model="form.houseType"
                  >
                    <el-option
                      v-for="item in houseModelOption"
                      :key="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="向">
                  <el-select
                    style="width: 100%"
                    v-model="form.towards"
                  >
                    <el-option
                      v-for="item in houseDirectionOption"
                      :key="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="所在楼">
                  <el-input v-model="form.buildingNum"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="装修程度">
                  <el-select
                    style="width: 100%"
                    v-model="form.decoDegree"
                  >
                    <el-option
                      v-for="item in houseDecorationOption"
                      :key="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="剩余年限">
                  <el-input
                    v-model="form.remainTerm"
                    oninput="value=value.replace(/[^\d.]/g,'')"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>

        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </el-tabs>
    </el-dialog> -->
    <el-dialog
      title="正评登记"
      :visible.sync="formalRegVisible"
      width="80%"
    >
      <el-form :model="regForm">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="项目完成时间">
              <el-date-picker
                v-model="regForm.projCompTime"
                value-format="yyyy-MM-dd"
                type="date"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="标准收费（元）">
              <el-input
                v-model="regForm.standardFee"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="应收费（元）">
              <el-input v-model="regForm.actualFee"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="资料收集及验证">
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
            <el-form-item label="市场询价调查">
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
            <el-form-item label="技术说明">
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
            <el-form-item label="报告拟稿">
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
            <el-form-item label="收费跟进">
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
            <el-form-item label="签字评估（估价）师">
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
            <el-form-item label="助理（归档）">
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
    </el-dialog>
    <fc-obj-detail-dialog
      :show.sync="fcDialogVisible"
      :obj="assemObjForm"
      :isEdit="assemObjIsEdit"
      :projId="projDetail.projId"
    />
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
      <div class="work-title">
        <span class="work-title-name">项目信息</span>
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
          >编辑</el-button>
          <el-button
            icon="el-icon-set-up"
            size="medium"
            v-if="this.queryData.projType == 1010 || this.queryData.projType == 1020 || this.queryData.projType == 1030 || this.queryData.projType == 1041 || this.queryData.projType == 1042 || this.queryData.projType == 1043"
            @click="handleChangeType()"
          >更改项目类型</el-button>
          <el-button
            icon="el-icon-lx-qrcode"
            size="medium"
            @click="handleQRCode()"
          >生成二维码</el-button>
          <!-- <el-button
            icon="el-icon-document"
            size="medium"
            @click="isFcDialogVisible()"
          >正评登记</el-button> -->
          <el-button
            icon="el-icon-printer"
            size="medium"
            @click="handlePrintProj(queryData.projId)"
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
              基本信息 - {{queryData.projNum}}
            </div>
            <div class="text">
              <div class="item"><span>项目类型：</span>{{this.transedProjType.projType}}</div>
              <div class="item"><span>评估目的：</span>{{this.projDetail.assemGoal}}</div>
              <div class="item"><span>项目名称：</span>{{this.projDetail.projName}}</div>
              <div class="item"><span>项目范围：</span>{{this.projDetail.projScope}}</div>
              <div class="item"><span>基准日：</span>{{formatDate(this.projDetail.baseDate)}}</div>
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
          <el-card>
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
                >取号</el-button>
                <el-button
                  type="primary"
                  icon="el-icon-circle-plus-outline"
                  @click="handleGetOldNum"
                >取往月报告号</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-circle-close"
                  @click="handleDelNum()"
                >取消报告号</el-button>
              </span>
            </div>
            <div>
              <div class="report-num">
                <el-row>
                  <el-col
                    :span="2"
                    class="report-title"
                  >初评号</el-col>
                  <el-col
                    :span="6"
                    class="report-content"
                  >
                    <span v-if="this.reportNum.cph == ''">未取号</span>
                    <span v-else>{{this.reportNum.cph}}</span>
                  </el-col>
                  <el-col
                    :span="2"
                    class="report-title"
                  >正评号</el-col>
                  <el-col
                    :span="6"
                    class="report-content"
                  >
                    <span v-if="this.reportNum.zph == ''">未取号</span>
                    <span v-else>{{this.reportNum.zph}}</span>
                  </el-col>
                  <el-col
                    :span="2"
                    class="report-title"
                  >回函号</el-col>
                  <el-col
                    :span="6"
                    class="report-content"
                  >
                    <span v-if="this.reportNum.hhh == ''">未取号</span>
                    <span v-else>{{this.reportNum.hhh}}</span>
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
                >获取</el-button>
                <el-button
                  icon="el-icon-suitcase"
                  type="danger"
                  plain
                  size="medium"
                  @click="handleDeleteContractNum()"
                >删除</el-button>
              </span>
            </div>
            <div class="text item">
              <div class="item">
                <span v-if="this.contractNum == ''">未取合同号</span>
                <span v-else>合同号：</span>{{this.contractNum}}
              </div>
            </div>
            <!-- <div class="report-num">
              <el-row>
                <el-col
                  :span="2"
                  class="report-title"
                >合同号</el-col>
                <el-col
                  :span="6"
                  class="report-content"
                >
                  <span v-if="this.contractNum == ''">未取号</span>
                  <span v-else>{{this.contractNum}}</span>
                </el-col>
              </el-row>
            </div> -->
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
              <span>报告登记信息</span>
              <span style="float: right">
                <!-- <el-button
                  icon="el-icon-suitcase"
                  type="warning"
                  plain
                  size="medium"
                >登记初评</el-button> -->
                <el-button
                  v-if="this.projDetail.projType == 1010"
                  icon="el-icon-suitcase"
                  type="success"
                  plain
                  size="medium"
                  @click="handleFormalReg()"
                >登记正评</el-button>
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
        </el-col>
      </el-row>
    </div>
    <div class="work-title">
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
          @click="isFcDialogVisible()"
          type="text"
        >展开详情</el-button>
      </span>
    </div>

    <el-divider></el-divider>
    <div class="work-title">
      <span class="work-title-name">项目工作信息</span>
      <span class="work-title-button">
        <el-button
          icon="el-icon-s-order"
          size="medium"
          type="primary"
          @click="handleWorkArrg"
        >安排</el-button>
      </span>
    </div>
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div v-if="workArrgEdit == false">
            <h3>未安排工作信息，请先安排</h3>
          </div>
          <div v-else>
            <div class="text">
              <div class="item"><span>评估方法：</span>{{arrgData.assemMethod}}</div>
              <div class="item"><span>现场调查内容：</span>{{arrgData.fldSrvyContent}}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
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
        >新增子项目(初评)</el-button>
        <el-button
          icon="el-icon-circle-plus-outline"
          size="medium"
          @click="handleAddSubProj(reportNum.zph)"
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
        label="基准日"
        width="120"
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
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import { editProject, getDetailProjInfo, getWorkAssignment, setWorkAssignment, createReportNum, deleteReportNum, alterProjType, getProjInfoTable, getOldReportNum, createContractNum, deleteContractNum } from '@/api/index'
import { addSubProject, getSubProjectInfoList, delSubProject } from '@/api/subReport'
import { getEvalObjDetail } from '@/api/assemobjdetail'
import { checkFaRegister, submitFaRegister, editFaRegister } from '@/api/formalreg'
import projTypeOption from '../../../public/projTypeOption.json'
import { host } from '@/config'
import FcObjDetailDialog from './AssemObjDetailDialog/FcObjDetailDialog'
var ProManageAPIServer = `${host.baseUrl}/${host.ProManageAPIServer}`

export default {
  name: 'workhandle',
  inject: ['reload'],            //注入App里的reload方法
  components: {
    FcObjDetailDialog
  },
  data() {
    return {
      queryData: '',
      arrgData: {},
      projDetail: {},
      projMember: [],
      reportNum: {},
      projTypeOption: [],
      transedProjType: {},
      tableData: [],
      takenDate: '',
      //
      fcDialogVisible: false,
      //
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
      assemObjDetailVisible: false,
      reportNumSelectVal: 2,
      deleteNumSelectVal: 2,
      getNumType: '',
      needDelNum: '',
      subProjVisible: false,
      subFatherReport: '',
      subTableData: [],
      contractNum: '',
      contractNumType: '',
      changeType: {
        projId: '',
        toType: ''
      },
      typeOptions: [
        { value: '1010', label: '房地产' },
        { value: '1020', label: '资产' },
        { value: '1030', label: '土地' },
        { value: '1041', label: '房地产咨询' },
        { value: '1042', label: '资产咨询' },
        { value: '1043', label: '土地咨询' }
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
        subFieldSrvy: [],

      },
      subFormRules: {
        subReportNum: [
          { required: true, message: '请输入子项目报告号', trigger: 'blur' },
          { min: 3, max: 3, message: '请输入长度为3位数字', trigger: 'blur' },
        ],
        subProjName: [
          { required: true, message: '请输入子项目名称', trigger: 'blur' }
        ],
        subProjScope: [
          { required: true, message: '请输入子项目范围', trigger: 'blur' }
        ]
      },
      midMember: [],
      workArrgForm: {
        projId: '',
        assemMethod: '成本法',
        fldSrvyContent: '',
        //人员
        prePreparationPic: [],
        fldSrvyPic: [],
        mktSrvyPic: [],
        assemEstPic: [],
        issueValPic: [],
        internalAuditPic: [],
        commuClientPic: [],
        assemChargePic: [],
        amendFinalPic: [],
        manuArchivePic: [],
        // //日期
        prePreparationSche: '',
        fldSrvySche: '',
        mktSrvySche: '',
        assemEstcSche: '',
        issueValSche: '',
        internalAuditSche: '',
        commuClientSche: '',
        assemChargeSche: '',
        amendFinalSche: '',
        manuArchiveSche: ''
      },
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
        remainTerm: '',
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
        actualFee: '',
        //人员信息
        infoVerification: [],
        marketEnquiry: [],
        techExp: [],
        reportDrafter: [],
        feeFollowUp: [],
        signedAppraiser: [],
        projAsst: []
      },
      assemObjForm: {},
      assemObjIsEdit: false,
      statusInfo: {
        registerState: false,
        evalObjState: false
      },
      regInfo: {}
      // assemGoalOption: ['房地产转让价格评估', '房地产分割、合并评估', '房地产纠纷估价', '房地产保险估价', '土地使用权出让价格评估', '房地产拍卖底价评估', '房地产抵押价值评估', '房地产课税估价', '房地产租赁价格评估', '企业各种经济活动中涉及的房地产估价', '其他目的的房地产估价'],
      // priceTypeOption: ['成交价格', '正常价格', '市场价格', '评估价值', '市场价值', '投资价值', '现状价值', '快速变现价值', '残余价值', '抵押价值', '抵押净值', '法定优先受偿款', '计税价值', '保险价值', '完全产权价值', '无租约限制价值', '出租人权益价值', '承租人权益价值', '建筑物价值', '土地价值', '楼面地价'],
      // housePurposeOption: ['住宅', '宗教', '园林绿化', '工业、交通、仓储', '别墅', '涉外', '医疗卫生', '文化、娱乐、体育', '公共运输', '新闻', '娱乐', '监狱', '集体宿舍', '成套住宅', '商业服务', '旅游', '军事', '体育', '物管用房', '铁路', '非成套住宅', '工业', '文化', '仓储', '电讯信息', '教育', '教育、医疗、卫生、可研', '民航', '高档公寓', '科研', '公共设施', '商业、金融、信息', '航运', '金融保险', '其他', '办公', '经营'],
      // houseTypeOption: ['车库', '别墅、高档公寓', '仓储用房', '住宅', '其他', '办公用房', '商业用房', '工业用房', '房地价值'],
      // houseAttributeOption: ['其他', '经济适用房', '配套商品房', '建筑物价值', '市场化商品房', '动迁房', '公共租赁住房', '廉租住房', '限价普通商品住房', '集资建房', '定销商品房', '福利房'],
      // houstStructureOption: ['错层', '复式楼', '土地价值', '跃层', '平层', '其他'],
      // houseModelOption: ['一居室', '二居室', '三居室', '四居室', '五居室', '其他'],
      // houseDirectionOption: ['东北', '东南', '西北', '西南', '东', '南', '西', '北', '西南双面', '东南双面', '南北通透双面', '其他通透双面', '其他非通透双面', '其他'],
      // houseDecorationOption: ['粗装修', '毛坯', '精装修']

    }
  },
  created() {
    //处理从工作台获取的val -> queryData
    this.queryData = JSON.parse(this.$route.query.data)
    this.workArrgForm.projId = this.queryData.projId
    console.log('queryData', this.queryData)
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
            console.log('projDetail', this.projDetail)
            if (res.data.reportNumList != '') {
              this.reportNum = res.data.reportNumList
              console.log('reportNum', this.reportNum)
            }
            if (res.data.contractNum != null) {
              this.contractNum = res.data.contractNum.contractNum
              console.log('contractNum', this.contractNum)
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
            console.log('projMember', this.projMember)
          }
          this.$nextTick(() => {
            if (this.reportNum.cph != '' && this.reportNum.zph != '') {
              this.reportNumList = this.reportNum.cph + ',' + this.reportNum.zph
            } else if (this.reportNum.cph == '' && this.reportNum.zph == '') {
              this.reportNumList = ''
            } else if (this.reportNum.cph == '' && this.reportNum.zph != '') {
              this.reportNumList = this.reportNum.zph
            } else if (this.reportNum.zph == '' && this.reportNum.cph != '') {
              this.reportNumList = this.reportNum.cph
            }
            // getSubProjectInfoList({ reportNumList: this.reportNumList })
            //   .then(res => {
            //     console.log('subTableData', res)
            //     this.subTableData = res.data.cph
            //     this.subTableData = this.subTableData.concat(res.data.zph)
            //   })
            //   .catch(err => {
            //     console.log('failed to getSubProjectInfoList', err)
            //   })
            this.check()
          })
        })
        .catch(err => {
          this.$message.error('获取项目详细信息失败')
          console.log('获取项目详情信息失败', err)
        })
    },
    check() {
      checkFaRegister({ projId: this.projDetail.projId, subReportNum: '-' })
        .then(res => {
          console.log(res)
          if (res.data.registerState == true && res.data.evalObjState == true) {
            this.statusInfo.registerState = res.data.registerState
            this.statusInfo.evalObjState = res.data.evalObjState
            // this.regForm = res.data.registerInfo
            // this.regForm.infoVerification = this.regForm.infoVerification.split(',')
            // this.regForm.marketEnquiry = this.regForm.marketEnquiry.split(',')
            // this.regForm.techExp = this.regForm.techExp.split(',')
            // this.regForm.reportDrafter = this.regForm.reportDrafter.split(',')
            // this.regForm.feeFollowUp = this.regForm.feeFollowUp.split(',')
            // this.regForm.signedAppraiser = this.regForm.signedAppraiser.split(',')
            // this.regForm.projAsst = this.regForm.projAsst.split(',')
            console.log(res)
          } else {
            this.statusInfo.registerState = res.data.registerState
            this.statusInfo.evalObjState = res.data.evalObjState
          }
        })
        .catch(err => {
          console.log(err)
        })
      console.log('statusInfo', this.statusInfo)
      console.log('regInfo', this.regInfo)
    },
    getWorkAssignmentData() {
      getWorkAssignment({ projId: this.queryData.projId })
        .then(res => {
          if (res.statusCode == 200) {
            if (res.data == null) {
              this.workArrgEdit = false
              console.log('workArrgEdit', this.workArrgEdit)
            } else {
              this.workArrgEdit = true
              this.arrgData = res.data
              //后期看看让后端分割出date和people
              this.workPeople.push(res.data.prePreparationPic, res.data.fldSrvyPic, res.data.mktSrvyPic, res.data.assemEstPic, res.data.issueValPic, res.data.internalAuditPic, res.data.commuClientPic, res.data.assemChargePic, res.data.amendFinalPic, res.data.manuArchivePic)
              this.workDate.push(res.data.prePreparationSche, res.data.fldSrvySche, res.data.mktSrvySche, res.data.assemEstSche, res.data.issueValSche, res.data.internalAuditSche, res.data.commuClientSche, res.data.assemChargeSche, res.data.amendFinalSche, res.data.manuArchiveSche)
              // for (var i = 0; i < this.workPeople.length; i++) {
              //   if (this.workPeople[i] !== '') {
              //     this.workArrgEdit = true
              //     break
              //   } else {
              //     this.workArrgEdit = false
              //   }
              // }
              console.log('arrgData', this.arrgData)
              console.log('workArrgEdit', this.workArrgEdit)
            }
          }
        })
        .catch(err => {

        })
    },
    handleWorkArrg() {
      this.$router.push({ path: '/workarrange', query: { data: this.queryData, projMember: this.projMember, isEdit: this.workArrgEdit } })
    },
    handleDetail() {
      this.$router.push({ path: '/projcheck', query: { data: this.queryData.projId } })
    },
    handleEdit() {
      this.$router.push({ path: '/planform', query: { data: this.queryData.projId } })
    },
    handleChangeType() {
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
              this.regForm.standardFee = (i * 0.005) * 10000
            } else if (i <= 1000) {
              this.regForm.standardFee = (i * 0.0025 + 0.25) * 10000
            } else if (i <= 2000) {
              this.regForm.standardFee = (i * 0.0015 + 1.25) * 10000
            } else if (i <= 5000) {
              this.regForm.standardFee = (i * 0.0008 + 2.65) * 10000
            } else if (i <= 8000) {
              this.regForm.standardFee = (i * 0.0004 + 4.65) * 10000
            } else if (i <= 10000) {
              this.regForm.standardFee = (i * 0.0002 + 6.25) * 10000
            } else if (i > 10000) {
              this.regForm.standardFee = (i * 0.0001 + 7.25) * 10000
            }
          })
        this.formalRegVisible = true
      }
    },
    submitFormalReg() {
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
        console.log(this.regForm)
        submitFaRegister(this.regForm)
          .then(res => {
            console.log('addRes', res)
            this.reload()
          })
          .catch(err => {
            this.$message.error('服务器忙，请稍后重试')
            console.log(err)
          })
      } else {
        editFaRegister({ registerId: this.regInfo.registerId })
          .then(res => {
            console.log('editRes', res)
            this.reload()
          })
          .catch(err => {
            this.$message.error('服务器忙，请稍后重试')
            console.log(err)
          })

      }
    },
    handleAssemObjDetail() {
      this.assemObjDetailVisible = true
    },
    handleQRCode() {
      this.qrcodeVisible = true
      this.$nextTick(() => {
        this.creatQRCode()
      })
    },
    creatQRCode() {
      this.qr = new QRCode('qrcode', {
        width: '150',
        height: '150',
        //text: this.form.zph + this.form.xmmc + this.form.pgz + this.form.jzr,
        text: '项目报告号：' + this.reportNum.zph + ' ' + '项目名称：' + this.projDetail.projName + ' ' + '项目评估值：' + this.projDetail.assemValue + ' ' + '基准日：' + this.formatDate(this.projDetail.projDate)
      })
    },
    closeQRCode() {
      this.$refs.qrcode.innerHTML = ''
    },
    handleCreateContractNum() {
      // if (queryData.projType == 1010)let const
      if (this.contractNum) {
        this.$message.warning('已存在合同号！')
      } else {
        switch (this.queryData.projType) {
          case 1010:
            this.contractNumType = '101'
            break
          case 1020:
            this.contractNumType = '201'
            break
          case 1030:
            this.contractNumType = '301'
            break
          case 1041:
            this.contractNumType = '102'
            break
          case 1042:
            this.contractNumType = '202'
            break
          case 1043:
            this.contractNumType = '302'
            break
          case 1050:
            this.contractNumType = '202'
            break
          case 1070:
            this.contractNumType = '202'
            break
          case 1090:
            this.contractNumType = '202'
            break
          case 1100:
            this.contractNumType = '401'
            break
        }
        console.log(this.contractNumType)
        createContractNum({ projId: this.queryData.projId, contractNumType: this.contractNumType })
          .then(res => {
            console.log('createContractNum.res', res)
            this.reload()
          })
          .catch(err => {
            this.$message.warning('服务器忙，请稍后重试！')
          })
      }
    },
    handleDeleteContractNum() {
      this.$confirm('即将删除合同号，确定吗？', '提示：即将删除[' + this.contractNum + ']')
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
        window.open('/hzms/hzht/static/pdf/web/viewer.html?file=' + encodeURIComponent(URL.createObjectURL(new Blob([oReq.response]))))
      }
      const fdata = new FormData()
      fdata.append('projId', parseInt(that.queryData.projId))
      oReq.send(fdata)
    },
    //取号流程
    handleGetNum() {
      this.getNumVisible = true
    },
    getNewNum(val) {
      if (val == 1) { //初评号
        //房地资才有初评号
        if (this.queryData.projType == 1010 || this.queryData.projType == 1020 || this.queryData.projType == 1030) {
          this.getNumType = this.queryData.projType + 1
        } else {
          this.$message.warning('非房地资项目请选择正评号')
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
      }
      //结束判断类型，调取号接口
      createReportNum({ projId: this.queryData.projId, reportNumType: this.getNumType })
        .then(res => {
          this.$message.success('取号成功')
          this.reload()
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
    handleGetOldNum() {
      this.getOldNumVisible = true
    },
    getOldNum(val) {
      if (val == '') {
        this.$message.warning('请选择时间')
        return 0
      } else if (this.reportNum.zph !== '') {
        this.$message.warning('已存在正评号')
        return 0
      } else {
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
            this.reload()
          })
          .catch(err => {
            console.log('oldReportNum.err', err)
            this.$message.warning('获取失败，请稍后再试')
          })
      }

    },
    handleDelNum(obj) {
      this.delNumVisible = true
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
              this.reload()
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
      this.$refs.subFormRules.validate((valid) => {
        if (valid) {
          console.log(this.subProjForm)
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
      delSubProject({ reportNum: row.reportNum, subReportNum: row.subReportNum })
        .then(res => {
          this.$message.success('删除子项目成功')
          this.reload()
        })
        .catch(err => {
          this.$message.warning('删除失败，请稍后重试')
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
    isFcDialogVisible() {
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
      this.fcDialogVisible = true
    }
  },
}
</script>

<style scoped>
.card-header {
  font-size: 20px;
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
  margin: 50px 0 5px 0;
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
  border: 1px solid #d3d3d3;
  height: 40px;
  line-height: 40px;
  background-color: #cbe5ff;
}
.report-content {
  text-align: center;
  border: 1px solid #d3d3d3;
  height: 40px;
  line-height: 40px;
}
.workname-left {
  height: 30px;
  margin-top: 15px;
  line-height: 30px;
}
</style>