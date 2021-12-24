<template>
  <div>
    <div class="container">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <span style="vertical-align: middle">查看项目</span>
            <el-button
              type="primary"
              icon="el-icon-plus"
              style="height:auto;padding: 0px 8px 7px 8px;margin-left:15px"
              @click="handleAdd"
            ><span style="font-size:14px;color:#fff;">新增项目计划</span></el-button>
            <!-- <el-button @click="setCookie">Cookie</el-button>
            <el-button @click="getCookie('/plan')">get</el-button> -->
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-dialog
      title="更改项目类型"
      :visible.sync="changeTypeVisible"
      @close="closeChangeProjType"
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
              v-for="item in projTypeOption[companyTabsId]"
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

	<!-- 211028变动 新增: 多个公司切换 -->
	  <el-tabs v-model="companyId" type="card" @tab-click="handleTabsClick">
	    <el-tab-pane label="惠正公司" name="HZ"></el-tab-pane>
	    <el-tab-pane label="智明公司" name="ZM"></el-tab-pane>
	    <el-tab-pane label="汇正公司" name="HZKJ"></el-tab-pane>
	  </el-tabs>
      <div class="handle-box">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-input
              v-model="searchData.projNum"
              size="medium"
              placeholder="计划编号"
              @keyup.enter.native="handleSearch"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-input
              v-model="searchData.reportNum"
              placeholder="初、正评号"
              size="medium"
              @keyup.enter.native="handleSearch"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-input
              v-model="searchData.projName"
              placeholder="项目名称"
              size="medium"
              @keyup.enter.native="handleSearch"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-input
              v-model="searchData.projScope"
              placeholder="项目范围"
              size="medium"
              @keyup.enter.native="handleSearch"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-input
              v-model="searchData.clientName"
              placeholder="委托人"
              size="medium"
              @keyup.enter.native="handleSearch"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-input
              v-model="searchData.projMember"
              placeholder="项目成员"
              size="medium"
              @keyup.enter.native="handleSearch"
            ></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-button
              type="text"
              icon="el-icon-search"
              @click="handleSearch"
              size="medium"
            >搜 索</el-button>
            <el-button
              type="text"
              icon="el-icon-refresh-right"
              @click="handleRefresh"
              size="medium"
            >重置</el-button>
          </el-col>
        </el-row>
      </div>
	  
	  <!-- 211109变动 新增: 多个公司切换 -->
<!-- =========================惠正========================= -->
	  
      <!-- table -->
      <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        height="550"
        stripe
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
		v-if="companyTabsId == 0"
      >
        <!-- <el-table-column type="expand">
          <template slot-scope="props">
            <el-form
              label-position="left"
              inline
              class="demo-table-expand"
            >
              <el-form-item label="项目类型">
                <div
                  v-for="item in projTypeList"
                  :key="item.value"
                >
                  <span v-if="item.value == props.row.projType">{{ item.label }}</span>
                </div>
              </el-form-item>
              <el-form-item label="项目负责人">
                <span>{{ props.row.projLeader }}</span>
              </el-form-item>
              <el-form-item label="项目复核人">
                <span>{{ props.row.projReviewer }}</span>
              </el-form-item>
              <el-form-item label="专业复核人">
                <span>{{ props.row.projProReviewer }}</span>
              </el-form-item>
              <el-form-item label="项目助理">
                <span>{{ props.row.projAsst }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column> -->

        <!-- <el-table-column
          prop="projDegree"
          label="紧急程度"
          width="80"
          align="center"
        >
          <template slot-scope="props">
            <el-tag
              :type="props.row.projDegree == 1001 ? 'success' : 'danger'"
              effect="dark"
            >
              <span v-if="props.row.projDegree == 1001">正常</span>
              <span v-else>紧急</span>
            </el-tag>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="projType"
          label="项目类型"
          width="90"
          align="center"
          :filters="projTypeFilters[companyTabsId]"
          :filter-method="filterProjType"
        >
          <template slot-scope="scope">
<!--            <span>{{scope.row.projType}}</span>-->
            <span>{{projTypes[companyTabsId][scope.row.projType]}}</span>
            <el-button type="text" icon="el-icon-refresh" size="mini" @click="handleProjType(scope.row)"></el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="projState"
          label="项目状态"
          width="80"
          align="center"
        >
          <template slot-scope="props">
            <el-tag
              :type="props.row.projState == '正常' ? 'primary' : 'warning'"
              effect="dark"
            >{{ props.row.projState }}</el-tag>
          </template>
        </el-table-column> -->

        <el-table-column
          prop="projDate"
          :formatter="this.$formatDate"
          label="编制日期"
          sortable
          width="105"
        ></el-table-column>
        <el-table-column
          prop="projNum"
          label="计划编号"
          width="115"
        ></el-table-column>
        <el-table-column
          prop="projName"
          label="评估项目名称"
          width="250"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="projScope"
          label="评估项目范围"
          width="250"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="clientName"
          label="委托人名称"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="projLeader"
          label="项目负责人"
          width="95"
        ></el-table-column>
        <el-table-column
          prop="projReviewer"
          label="项目复核人"
          width="95"
        ></el-table-column>
        <el-table-column
          prop="projAsst"
          label="项目助理"
          width="80"
        ></el-table-column>
        <!-- <el-table-column
          prop="projRate"
          label="项目进度"
          width="90"
          align="center"
        >
          <el-tag effect="dark">编写报告</el-tag>
        </el-table-column> -->
        <el-table-column
          label="操作"
          width="300"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-info"
              size="meduim"
              @click="handleCheck(scope.row)"
            >详情</el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              size="medium"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
<!--            <el-button-->
<!--              type="text"-->
<!--              icon="el-icon-edit"-->
<!--              size="medium"-->
<!--              @click="handleProjType(scope.row)"-->
<!--            >更改项目类型</el-button>-->
            <el-button
                slot="reference"
                type="text"
                icon="el-icon-s-home"
                size="medium"
                :disabled="scope.row.projType !== 1010"
                @click="evalObjDialogOpen(scope.row)"
            >估价对象</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              size="medium"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
	  

<!-- =========================智明========================= -->
	  
      <!-- table -->
      <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        height="550"
        stripe
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
		v-if="companyTabsId == 1"
      >
        <!-- <el-table-column type="expand">
          <template slot-scope="props">
            <el-form
              label-position="left"
              inline
              class="demo-table-expand"
            >
              <el-form-item label="项目类型">
                <div
                  v-for="item in projTypeList"
                  :key="item.value"
                >
                  <span v-if="item.value == props.row.projType">{{ item.label }}</span>
                </div>
              </el-form-item>
              <el-form-item label="项目负责人">
                <span>{{ props.row.projLeader }}</span>
              </el-form-item>
              <el-form-item label="项目复核人">
                <span>{{ props.row.projReviewer }}</span>
              </el-form-item>
              <el-form-item label="专业复核人">
                <span>{{ props.row.projProReviewer }}</span>
              </el-form-item>
              <el-form-item label="项目助理">
                <span>{{ props.row.projAsst }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column> -->

        <!-- <el-table-column
          prop="projDegree"
          label="紧急程度"
          width="80"
          align="center"
        >
          <template slot-scope="props">
            <el-tag
              :type="props.row.projDegree == 1001 ? 'success' : 'danger'"
              effect="dark"
            >
              <span v-if="props.row.projDegree == 1001">正常</span>
              <span v-else>紧急</span>
            </el-tag>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="projType"
          label="项目类型"
          width="90"
          align="center"
          :filters="projTypeFilters[companyTabsId]"
          :filter-method="filterProjType"
        >
          <template slot-scope="scope">
<!--            <span>{{scope.row.projType}}</span>-->
            <span>{{projTypes[companyTabsId][scope.row.projType]}}</span>
            <el-button type="text" icon="el-icon-refresh" size="mini" @click="handleProjType(scope.row)"></el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="projState"
          label="项目状态"
          width="80"
          align="center"
        >
          <template slot-scope="props">
            <el-tag
              :type="props.row.projState == '正常' ? 'primary' : 'warning'"
              effect="dark"
            >{{ props.row.projState }}</el-tag>
          </template>
        </el-table-column> -->

        <el-table-column
          prop="projDate"
          :formatter="this.$formatDate"
          label="编制日期"
          sortable
          width="105"
        ></el-table-column>
        <el-table-column
          prop="projNum"
          label="计划编号"
          width="115"
        ></el-table-column>
        <el-table-column
          prop="projName"
          label="项目名称"
          width="250"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="projScope"
          label="项目范围"
          min-width="250"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="clientName"
          label="委托人名称"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="projLeader"
          label="项目负责人"
          width="95"
        ></el-table-column>
        <el-table-column
          prop="projReviewer"
          label="项目复核人"
          width="95"
        ></el-table-column>
        <el-table-column
          prop="projAsst"
          label="项目助理"
          width="80"
        ></el-table-column>
        <!-- <el-table-column
          prop="projRate"
          label="项目进度"
          width="90"
          align="center"
        >
          <el-tag effect="dark">编写报告</el-tag>
        </el-table-column> -->
        <el-table-column
          label="操作"
          width="200"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-info"
              size="meduim"
              @click="handleCheck(scope.row)"
            >详情</el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              size="medium"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
<!--            <el-button-->
<!--              type="text"-->
<!--              icon="el-icon-edit"-->
<!--              size="medium"-->
<!--              @click="handleProjType(scope.row)"-->
<!--            >更改项目类型</el-button>-->
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              size="medium"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

<!-- =========================汇正========================= -->
	  
      <!-- table -->
      <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        height="550"
        stripe
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
		v-if="companyTabsId == 2"
      >
        <!-- <el-table-column type="expand">
          <template slot-scope="props">
            <el-form
              label-position="left"
              inline
              class="demo-table-expand"
            >
              <el-form-item label="项目类型">
                <div
                  v-for="item in projTypeList"
                  :key="item.value"
                >
                  <span v-if="item.value == props.row.projType">{{ item.label }}</span>
                </div>
              </el-form-item>
              <el-form-item label="项目负责人">
                <span>{{ props.row.projLeader }}</span>
              </el-form-item>
              <el-form-item label="项目复核人">
                <span>{{ props.row.projReviewer }}</span>
              </el-form-item>
              <el-form-item label="专业复核人">
                <span>{{ props.row.projProReviewer }}</span>
              </el-form-item>
              <el-form-item label="项目助理">
                <span>{{ props.row.projAsst }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column> -->

        <!-- <el-table-column
          prop="projDegree"
          label="紧急程度"
          width="80"
          align="center"
        >
          <template slot-scope="props">
            <el-tag
              :type="props.row.projDegree == 1001 ? 'success' : 'danger'"
              effect="dark"
            >
              <span v-if="props.row.projDegree == 1001">正常</span>
              <span v-else>紧急</span>
            </el-tag>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="projType"
          label="项目类型"
          width="90"
          align="center"
          :filters="projTypeFilters[companyTabsId]"
          :filter-method="filterProjType"
        >
          <template slot-scope="scope">
<!--            <span>{{scope.row.projType}}</span>-->
            <span>{{projTypes[companyTabsId][scope.row.projType]}}</span>
            <el-button type="text" icon="el-icon-refresh" size="mini" @click="handleProjType(scope.row)"></el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="projState"
          label="项目状态"
          width="80"
          align="center"
        >
          <template slot-scope="props">
            <el-tag
              :type="props.row.projState == '正常' ? 'primary' : 'warning'"
              effect="dark"
            >{{ props.row.projState }}</el-tag>
          </template>
        </el-table-column> -->

        <el-table-column
          prop="projDate"
          :formatter="this.$formatDate"
          label="编制日期"
          sortable
          width="105"
        ></el-table-column>
        <el-table-column
          prop="projNum"
          label="计划编号"
          width="115"
        ></el-table-column>
        <el-table-column
          prop="projName"
          label="项目名称"
          width="250"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="projScope"
          label="项目范围"
          min-width="250"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="clientName"
          label="委托人名称"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="projLeader"
          label="项目负责人"
          width="95"
        ></el-table-column>
        <el-table-column
          prop="projReviewer"
          label="项目复核人"
          width="95"
        ></el-table-column>
        <el-table-column
          prop="projAsst"
          label="项目助理"
          width="80"
        ></el-table-column>
        <!-- <el-table-column
          prop="projRate"
          label="项目进度"
          width="90"
          align="center"
        >
          <el-tag effect="dark">编写报告</el-tag>
        </el-table-column> -->
        <el-table-column
          label="操作"
          width="200"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-info"
              size="meduim"
              @click="handleCheck(scope.row)"
            >详情</el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              size="medium"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
<!--            <el-button-->
<!--              type="text"-->
<!--              icon="el-icon-edit"-->
<!--              size="medium"-->
<!--              @click="handleProjType(scope.row)"-->
<!--            >更改项目类型</el-button>-->
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              size="medium"
              @click="handleDelete(scope.row)"
            >删除</el-button>
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
    <el-dialog
        :title="'【'+evalObjDrawerData.projInfo.projNum+'】估价对象列表'"
        style=""
        :visible.sync="evalObjDrawerVisible">
      <el-input
          placeholder="请输入新估价对象名"
          prefix-icon="el-icon-s-home"
          style="width: 50%; margin-left: 10%"
          :clearable="true"
          v-model.trim="evalObjDrawerData.newEvalObj">
      </el-input>
      <el-button type="primary" icon="el-icon-check" style="margin-left: 5px"
      :disabled="evalObjDrawerData.newEvalObj === ''"
                 @click="createEvalObj"
                 :loading="evalObjSubmitBtnLoading"
      >添加</el-button>
      <div >
        <el-table
            :data="evalObjDrawerData.evalObjList"
            style="width: 80%;margin-left: 10%;margin-top: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
          <el-table-column
              prop="evalObjId"
              label="估价对象ID"
              align="center"
              width="100px">
          </el-table-column>
          <el-table-column
              prop="evalObjName"
              label="估价对象名称"
              align="center"
              width="300px">
          </el-table-column>
          <el-table-column
              label="操作"
              align="center"
              >
            <template slot-scope="scope">
              <el-button type="text" @click="confirmDelEvalObj(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import {
  getAllAbstractProject,
  searchProject,
  delProject,
  alterProjType,
  getEvalObjListByProjId,
  createSingleEvalObj,
  deleteEvalObjById
} from '@/api/index';
import { checkFaRegister } from '@/api/formalreg'
import projTypeOption from '../../../public/projTypeOption.json'

export default {
  name: 'plan',
  inject: ['reload'],
  data() {
    return {
      currentPage: 1, // 当前页码
      pageSize: 20, // 每页的数据条数
      pageTotal: 0,
	  /* 
      projTypeList: [
        {
          label: '房地产',
          value: '1010'
        }, {
          label: '资产',
          value: '1020'
        }, {
          label: '土地',
          value: '1030'
        }, {
          label: '房地产咨询',
          value: '1041'
        }, {
          label: '资产咨询',
          value: '1042'
        }, {
          label: '土地咨询',
          value: '1043'
        }, {
          label: 'PPP',
          value: '1050'
        }, {
          label: '房地产复审',
          value: '1061'
        }, {
          label: '资产复审',
          value: '1062'
        }, {
          label: '土地复审',
          value: '1063'
        }, {
          label: '外协',
          value: '1070'
        }, {
          label: '协外',
          value: '1071'
        }, {
          label: '政策修订',
          value: '1080'
        }, {
          label: '绩效',
          value: '1090'
        }, {
          label: '其他',
          value: '1100'
        }
      ],
	  */
      searchData: { projNum: '', reportNum: '', projName: '', projScope: '', clientName: '', projMember: '' },
      tableData: [],
      editVisible: false,
      changeTypeVisible: false,
      form: {},
	  
	  //211028变动 新增: 多个公司切换, 通过companyTabsId切换过滤选项
      projTypeFilters: [
		[
			{ text: '房地产', value: 1010 },
			{ text: '资产', value: 1020 },
			{ text: '土地', value: 1030 },
			{ text: '房地产咨询', value: 1041 },
			{ text: '资产咨询', value: 1042 },
			{ text: '土地咨询', value: 1043 },
			{ text: 'PPP', value: 1050 },
			{ text: '房地产复审', value: 1061 },
			{ text: '资产复审', value: 1062 },
			{ text: '土地复审', value: 1063 },
			{ text: '外协', value: 1070 },
			{ text: '协外', value: 1071 },
			{ text: '政策修订', value: 1080 },
			{ text: '绩效', value: 1090 },
			{ text: '其他', value: 1100 },
		],
		[
			{ text: '测绘-测绘航空摄影', value: 2101 },
			{ text: '测绘-工程测量', value: 2102 },
			{ text: '测绘-界线与不动产测绘', value: 2103 },
			{ text: '测绘-地理信息系统工程', value: 2104 },
			{ text: '测绘-其他', value: 2105 },
			{ text: '咨询-税收预测报告', value: 2201 },
			{ text: '咨询-PPP全过程咨询', value: 2202 },
			{ text: '咨询-可行性研究报告', value: 2203 },
			{ text: '咨询-社会稳定风险评估', value: 2204 },
			{ text: '咨询-项目建议书', value: 2205 },
			{ text: '咨询-经济评价报告', value: 2206 },
			{ text: '咨询-方案咨询', value: 2207 },
			{ text: '咨询-其他', value: 2208 },
		],
		[
			{ text: '财报审计', value: 3001 },
			{ text: '专审', value: 3002 },
			{ text: '专项审计', value: 3003 },
			{ text: '汇正咨询', value: 3004 },
			{ text: '发债', value: 3005 },
			{ text: '税务审计', value: 3006 },
		],
      ],
      projTypes: [
		  {
			1010: '房',
			1020: '资',
			1030: '地',
			1041: '房咨',
			1042: '资咨',
			1043: '地咨',
			1050: 'PPP',
			1061: '房复审',
			1062: '资复审',
			1063: '地复审',
			1070: '外协',
			1071: '协外',
			1080: '政策',
			1090: '绩效',
			1100: '其他'
		  },
		  {
			2101: '测-航测',
			2102: '测-工程测量',
			2103: '测-房地产测绘',
			2104: '测-地理信息',
			2105: '测-其他',
			2201: '咨-税收预测',
			2202: '咨-PPP',
			2203: '咨-可研',
			2204: '咨-稳评',
			2205: '咨-建议书',
			2206: '咨-经济评价',
			2207: '咨-方案咨询',
			2208: '咨-其他',
		  },
		  {
			3001: '财报',
			3002: '专项',
			3003: '验资',
			3004: '咨询',
			3005: '发债',
			3006: '税务',
		  },
	  ],
      projTypeOption: [],
      changeType: {
        projId: '',
        toType: ''
      },
      evalObjDrawerVisible: false,
      evalObjSubmitBtnLoading: false,
      evalObjDrawerData: {
        evalObjList: [],
        projInfo : {},
        newEvalObj : ''
      },
      newEvalObj: {
      },
	  
	  
	  //211028变动 新增: 多个公司切换	  
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
	if(!this.pageInfoLoad()){
		this.getData()
	}
	
	this.projTypeOption = projTypeOption
  },
  mounted() {
  },
  methods: {
    getData() {
		
	  /* 
      if (sessionStorage.getItem('page')) {
        this.changePage(parseInt(sessionStorage.getItem('page')))
        sessionStorage.removeItem('page')
      }
	  */
	 
	  //211029变动 新增: 多个公司切换
	
	  this.currentPage = 1;
	  this.tableData = [];
	  this.pageTotal = 0;
      getAllAbstractProject({}, this.companyId)
        .then(res => {
          //console.log("总数:", res.data.length)		  
          this.tableData = res.data
          this.pageTotal = res.data.length
        })
        .catch(err => {
          console.log(err);
        })
    },
    searchProjInfo() {
      let newArr = {}
      for (let j in this.searchData) {
        if (this.searchData[j] !== '') {
          newArr[j] = this.searchData[j]
        }
      }
	  //211029变动 新增: 多个公司切换
	  
	  this.currentPage = 1;
	  this.tableData = [];
	  this.pageTotal = 0;
      searchProject(newArr, this.companyId).then(res => {
        //console.log(res)
        this.tableData = res.data
        this.pageTotal = res.data.length
      }).catch(err => {
        console.log(err)
      })
    },
    //----feature
    // setCookie() {
    //   let name = this.$route.path
    //   //存入的参数
    //   let value = [this.searchData]
    //   let day = '1'
    //   if (day !== 0) {
    //     var expires = day * 24 * 60 * 60 * 1000
    //     var date = new Date(+new Date() + expires)
    //     document.cookie = name + '=' + escape(JSON.stringify(value)) + ';expires=' + date.toUTCString()
    //   } else {
    //     document.cookie = name + '=' + escape(JSON.stringify(value))
    //   }
    //   console.log(name, JSON.stringify(value))
    // },
    // getCookie(data){
    //   if("/plan" == data){
    //     var arr
    //     var name = this.$route.path
    //     var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    //     if (arr = document.cookie.match(reg)) {
    //       var test = JSON.parse(unescape(arr[4]))
    //       console.log(test)
    //     }
    //     console.log(reg, document.cookie.match(reg))
    //   }  
    // },
    changePage(val) {
      //console.log(val)
      this.currentPage = val
    },
    searchChange() {
    },
    // 触发搜索按钮
    handleSearch() {
      // this.$set(this.query, 'pageIndex', 1);
      this.searchProjInfo()
    },
    handleRefresh() {
      Object.keys(this.searchData).forEach(key => (this.searchData[key] = ''))
      //console.log(this.searchData)
      this.searchProjInfo()
    },
    //新增操作
    handleAdd() {
	  //211202 处理页面跳转返回
	  this.pageInfoSave();
		
      //console.log('新增项目事件');
      this.$router.push('/planform')
    },
    //编辑操作
    handleEdit(val) {
	  //211202 处理页面跳转返回
	  this.pageInfoSave();
				  
      //sessionStorage.setItem('page', this.currentPage)
	  const key = this.newCode(val.projId);
      this.$router.push({ path: '/planform', query: { data: key } })
    },
    handleProjType(val) {
		
	  //console.log(val);
		
	  //211029变动 新增: 多个公司切换, 通过数组id区分
	  const projType = this.onProjTypeChangeVisable(val.projType);
	  
	  for (let i of this.projTypeOption[this.companyTabsId]) {
        if(projType == 1 || projType == 2){
			//智明特别处理
			if (val.projType == i.value) {
			  i.disable = true
			}else if(projType == 1 && i.value >=2200 && i.value < 2300){
				//测绘时, 禁用切换成智明
				i.disable = true				
			}else if(projType == 2 && i.value >=2100 && i.value < 2200){
				//智明时, 禁用切换成测绘
				i.disable = true
			}
		}else{
			if (val.projType == i.value) {
			  i.disable = true
			}
		}
		
      }
	 
	  
      this.changeTypeVisible = true
      this.changeType.projId = val.projId
    },
    closeChangeProjType() {
	  //211029变动 新增: 多个公司切换, 通过数组id区分
      for (let i of this.projTypeOption[this.companyTabsId]) {
        i.disable = false
      }
	  //清空
	  Object.keys(this.changeType).forEach(key => (this.changeType[key] = ''))
    },
    changeProjType() {
      if (this.changeType.toType == '') {
        this.$message.info('请选择修改类型');
      } else {
		  
		//211029变动 新增: 多个公司切换
		const changeData = {
			projId: this.changeType.projId,
			toType: this.changeType.toType,
		} 
		  
        alterProjType(changeData, this.companyId)
          .then(res => {
            this.$message.success('修改成功');
            this.changeTypeVisible = false;
			//211028变动 修复:解决增加缓存后, 修改项目需刷新页面但无效的bug
			this.getData();
          })
          .catch(err => {
            this.$message.error('修改失败');
          })
      }
    },
    //查看详情操作
    handleCheck(val) {	  
	  //211202 处理页面跳转返回
	  this.pageInfoSave();
	  
      //sessionStorage.setItem('page', this.currentPage)
      // const index2 = (this.currentPage - 1)*10 + index
	  
      //console.log('查看项目详情事件', val.projId);	  
	  const key = this.newCode(val.projId);
      this.$router.push({ path: '/projcheck', query: { data: key } })
    },
    // 删除操作
    handleDelete(row) {

      this.$confirm('删除后将不可恢复，确定要删除吗？', '提示: 即将删除[' + row.projNum + ']', {
        type: 'warning'
      })
          .then(() => {
			  
			//211028变动 新增: 多个公司删除项目
			const delData = {
				projId: row.projId,
			}
            //接口会判断是否有报告号并对应删除
            delProject(delData, this.companyId).then(res => {
              this.$message.success('删除成功');
              this.getData()
            }).catch(err => {
              this.$message.warning('删除失败,请稍后重试');
            })
          })
          .catch(() => { })

      // if (row.projType == 1010) {
      //   // 二次确认删除
      //   checkFaRegister({ projId: row.projId, subReportNum: '-' })
      //     .then(res => {
      //       let status1 = res.data.registerState
      //       let status2 = res.data.evalObjState
      //       console.log(status1, status2)
      //       if (status1 == true || status2 == true) {
      //         this.$message.error('该项目已填写估价对象详情或已登记正评，请联系管理员删除')
      //         return 0
      //       } else {
      //         this.$confirm('删除后将不可恢复，确定要删除吗？', '提示: 即将删除[' + row.projNum + ']', {
      //           type: 'warning'
      //         })
      //           .then(() => {
      //             //接口会判断是否有报告号并对应删除
      //             // if (status1 == true || status2 == true) {
      //             //   this.message.error('该项目已填写估价对象详情或已登记正评，请联系管理员删除')
      //             //   return 0
      //             // }
      //             delProject({ projId: row.projId }).then(res => {
      //               this.$message.success('删除成功');
      //               this.getData()
      //             }).catch(err => {
      //               this.$message.warning('删除失败,请稍后重试');
      //             })
      //           })
      //           .catch(() => { })
      //       }
      //     })
      //     .catch(err => {
      //       console.log(err)
      //     })
      // } else {
      //   this.$confirm('删除后将不可恢复，确定要删除吗？', '提示: 即将删除[' + row.projNum + ']', {
      //     type: 'warning'
      //   })
      //     .then(() => {
      //       //接口会判断是否有报告号并对应删除
      //       delProject({ projId: row.projId }).then(res => {
      //         this.$message.success('删除成功');
      //         this.getData()
      //       }).catch(err => {
      //         this.$message.warning('删除失败,请稍后重试');
      //       })
      //     })
      //     .catch(() => { })
      // }
    },
    filterProjType(value, row) {
      return row.projType === value
    },
    beforeEvalObjDialogClose() {
      // this.evalObjDrawerData.evalObjList = []
      // this.evalObjDrawerData.projInfo = {}
      // this.evalObjDrawerData.newEvalObj = ''
      // this.evalObjDrawerVisible = false
    },
    evalObjDialogClose() {
      // this.evalObjDrawerData.evalObjList = []
      // this.evalObjDrawerData.projInfo = {}
      // this.evalObjDrawerData.newEvalObj = ''
      this.evalObjDrawerVisible = false
    },
    evalObjDialogOpen(projInfo) {
      this.evalObjDrawerData.evalObjList = []
      this.evalObjDrawerData.projInfo = {}
      this.evalObjDrawerData.newEvalObj = ''
	  
	  //211029变动 新增: 多个公司切换
	  //index.js 写法 url: `${ProManageAPIServer}evalObj/getEvalObjListByProjId?projId=`+data,
	  //projInfo.projId
	  //const getObjData=projInfo.projId + "&companyId='" + this.companyId +"'"; 
	  const getObjData = {
	  		projId: projInfo.projId,
	  };
	  
      getEvalObjListByProjId(getObjData, this.companyId).then(
          res => {
            this.evalObjDrawerData.projInfo = projInfo;
            this.evalObjDrawerData.evalObjList = res.data;
          }
      ).catch(
          err => {
            this.$message.error('加载错误')
          }
      );
      this.evalObjDrawerVisible = true
    },
    delEvalObj(row) {
	  //211029变动 新增: 多个公司切换
	  //'?evalObjId=' + row.evalObjId
	  //const delObjData ="?evalObjId=" + row.evalObjId + "&companyId='" + this.companyId + "'";
	  const delObjData = {
	  		evalObjId: row.evalObjId,
	  };
	  	
	  deleteEvalObjById(delObjData, this.companyId).then(
          res => {
            this.$message.success('删除成功')
			
			const getObjData = {
				projId: this.evalObjDrawerData.projInfo.projId
			}			
            getEvalObjListByProjId(getObjData, this.companyId).then(
                res => {
                  this.evalObjDrawerData.evalObjList = res.data;
                }
            );
          }
      ).catch(
          err => {
            this.$message.error('删除失败')
          }
      );
    },
    createEvalObj() {

      this.evalObjSubmitBtnLoading = true
      this.newEvalObj.projId = this.evalObjDrawerData.projInfo.projId
      this.newEvalObj.evalObjName = this.evalObjDrawerData.newEvalObj
	  
	  //211029变动 新增: 多个公司切换

      createSingleEvalObj(this.newEvalObj, this.companyId).then(
          res => {
            console.log(res.data)
            this.evalObjSubmitBtnLoading = false
            this.evalObjDrawerData.evalObjList.push(res.data)
            this.newEvalObj = {}
            this.evalObjDrawerData.newEvalObj = ''
            this.$message.success('添加成功')
          }
      );
    },
    confirmDelEvalObj(row) {
      this.$confirm('确认删除估价对象', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.delEvalObj(row)
      }).catch(() => {

      });
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
	  //this.getData(tab.name); //根据公司id获取对应项目数据
	  this.handleRefresh();
	 
	}, 
	
	onProjTypeChangeVisable(projType){
	  if(this.companyTabsId == 0){
		//处理惠正
		
	  }else if(this.companyTabsId == 1){
		//处理智明业务输入框是否显示
		if(projType>=2100 && projType <2200){
			//测绘
			return 1;
		}else if(projType>=2200 && projType <2300){
			//咨询
			return 2;  
		}  
	  }else if(this.companyTabsId == 1){
		//处理汇正
		
	  }
	},	
	
	//211202 处理页面跳转返回
	pageInfoLoad(){
		const plan_pageinfo = JSON.parse(sessionStorage.getItem('plan_pageinfo'));
		if(plan_pageinfo){
		  if(plan_pageinfo.status){
			//赋值		
			this.tableData = plan_pageinfo.data;
			
			this.pageTotal = plan_pageinfo.pageData.pageTotal;
			this.currentPage = plan_pageinfo.pageData.currentPage;
			this.pageSize = plan_pageinfo.pageData.pageSize;
			
			this.searchData = plan_pageinfo.searchData;
		  }
		  //删除
		  sessionStorage.removeItem('plan_pageinfo');
		  return true;
		}else{
		  return false;
		}
	},
	
	pageInfoSave(){
	  /* 
	  const plan_pageinfo ={
		searchData: this.searchData,
		pageData: {
			pageTotal: this.pageTotal,
			currentPage: this.currentPage,
			pageSize: this.pageSize,
		},
		data: this.tableData,
	    status:0
	  };
	  sessionStorage.setItem('plan_pageinfo', JSON.stringify(plan_pageinfo));
	  */
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
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.select-display-none{
	display: none;
}
</style>
