<template>
  <div>
    <div class="container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-folder"></i> 云现勘
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
	
	<!-- 211029变动 新增: 云查勘本地搜索功能 -->
	<el-input placeholder="计划编号" v-model.trim="searchContent.projNum" clearable @change="getData" size="small" style="margin-bottom: 20px ; width: 10% ;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-input>
	<el-input placeholder="项目名称" v-model.trim="searchContent.projName" clearable @change="getData" size="small" style="margin-left: 1px;margin-bottom: 20px ; width: 20% ;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-input>
	<el-input placeholder="项目范围" v-model.trim="searchContent.projScope" clearable @change="getData" size="small" style="margin-left: 1px;margin-bottom: 20px ; width: 20% ;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-input>
	<el-button type="primary" icon="el-icon-refresh" @click="resetSearch" style="margin-left: 5px" >重置</el-button>
	
    <el-table
        :data="getData()"
        @expand-change="expandChange"
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        @row-click="rowClick"
        :row-class-name="tableRowClassName"
        ref="refTable"
        style="width: 100%;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form
              label-position="left" inline class="demo-table-expand"
          >
            <el-table :data="evalObj"
                      v-loading="loading"
                      style=" width: 80%; margin-left: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
                      :span-method="arraySpan"
                      id="no-hover"
            >
              <el-table-column
                  label="状态"
                  prop="">
                <template slot-scope="scope">
                  <el-tag type="" v-if="evalObjIsDelivered(scope.row)">已派发</el-tag>
                  <el-tag type="info" v-else>未派发</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                  label="估价对象ID"
                  prop="evalObjId">
                <template slot-scope="scope">
                  <el-tag type="info" >{{scope.row.evalObjId}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                  label="估价对象名称"
                  prop="evalObjName"
                  min-width="400px"
              >
              </el-table-column>
              <el-table-column
                  label="已派发人员"
				  align="center"
				  min-width="150px"
              >
				<template slot-scope="scope">
					{{deliveredFieldSurvey}}
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <el-button type="primary" style="float: right;  margin-right: 20px;" @click="handleDelivery(props.row)">派发计划</el-button>
        </template>
      </el-table-column>
      <el-table-column
          label="计划编号"
          prop="projNum">
      </el-table-column>
      <el-table-column
          label="项目名称"
          prop="projName">
      </el-table-column>
      <el-table-column
          label="项目范围"
          prop="projScope">
      </el-table-column>
<!--      <el-table-column-->
<!--              label="操作"-->
<!--              prop="">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button type="text" @click="handleDelivery(scope.row)">派发计划</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
	</div>
    <el-dialog
            :visible.sync="dialogVisible"
        @closed="closed"
        :title="'派发计划：'+this.deliveryInfo.projNum"
            width="30%">
      <div>
        <span><b>计划现勘人员：</b>{{this.planedFieldSrvy}}</span><br><br>
        <span><b>已派发现勘人员：</b>{{this.deliveredFieldSurvey}}</span><br><br>
        <b>选择现勘人员  </b><el-button type="text" @click="handleClear">清空</el-button>
<!--        <el-checkbox-group v-model="selectedFieldSurveyList">-->
<!--          <el-checkbox-button v-for="staff in fieldSurveyStaffList"-->
<!--                              :label="staff.staffName" :key="staff.staffId">{{staff.staffId}}#{{staff.staffName}}</el-checkbox-button>-->
<!--        </el-checkbox-group>-->
        <el-checkbox-group
            v-model="selectedFieldSurveyList">
          <el-checkbox v-for="staff in fieldSurveyStaffList"
                       :label="staff.staffName" :key="staff.staffId"
                       :disabled="fsDisable(staff.name)"
          >{{staff.staffName}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitDelivery" :disabled="selectedFieldSurveyList.length === 0">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>


<script>
  import { getEvalObjListByProjId, getUserList } from '@/api';
  import { getProjList4CFS, deliverProj, getSurveyList } from '@/api/cfs';

export default {
  data() {
    return {
      getRowKeys(row) {
        return row.projId
      },
      loading : false,
      tableData: [],
      expands: [],
      evalObj: [],
      deliveredFieldSurvey: '无',
      staffList: [],
      fieldSurveyStaffList:[],
      planedFieldSrvy:'',
      dialogVisible: false,
      selectedFieldSurveyList:[],
      surveyDataMap:{},
      deliveryInfo: {
        projId: '',
        projNum: '',
        fieldSrvy: ''
      },
	  
	  //211029变动 新增: 云查勘本地搜索功能
	  searchContent:{
		projNum:'',
		projName:'',
		projScope:'',
	  },
	  
	  //211028变动 新增: 多个公司切换
	  companyId:'',
	  companyRange:['HZ', 'ZM','HZKJ'],
    };
  },
  created() {
	//211028变动 新增: 多个公司切换
	const value = localStorage.getItem('companyId');
	if(value){
		this.companyId = value;
		//this.companyTabsId = this.companyRange.indexOf(this.companyId);
	}else{
		this.companyId = this.companyRange[0];
		//this.companyTabsId = 0;
	}
	//console.log('初始化公司id', this.companyId);  
	  
    getUserList().then(
        res => {
          this.staffList = res.data
          this.sortStaffList()
        }
    );
    this.getListData()
  },
  methods: {
    getListData() {
      getProjList4CFS().then(
          res => {
            this.tableData = res.data
          }
      );
      getSurveyList().then(
          res => {
            console.log(res.data)
            this.surveyDataMap = res.data;
          }
      ).catch(err => {
        console.log(err)
        this.$message.error("获取已派发列表失败")
      });
    },
    tableRowClassName({row, rowIndex}) {
      if (this.surveyDataMap[row.projId] !== undefined) {
        return 'success-row';
      }
    },
    sortStaffList() {
      // for (let i = 0; i < list.length; i++) {
      //   if (list[i].isFieldSurvey === 1) {
      //     this.fieldSurveyStaffLis.push(list[i]);
      //     this.staffList.remove()
      //   }
      // }

      let list = this.staffList
      let fsList = []

      list.forEach(function(item, index) {
        if (item.isFieldSurvey === 1) {
          fsList.push(item)
        }
      });

      this.fieldSurveyStaffList = fsList

    },
    expandChange(row,expandedRows) {
      this.deliveredFieldSurvey = ''
      console.log(row.projId)
      var that = this
      if (expandedRows.length) {
        that.expands = []
        if (row) {
          that.expands.push(row.projId)// 每次push进去的是每行的ID
        }
      } else {
        that.expands = []// 默认不展开
        this.evalObj = []
        return
      }

      this.loading = true

	  
	  const getObjData = {
	  	projId: row.projId
	  }			
	  getEvalObjListByProjId(getObjData, this.companyId).then(
          res => {
            console.log(res.data);
            this.evalObj = res.data
            this.loading = false;
          }
      ).catch(
          err => {
            console.log(err)
            this.$alert("获取估价对象失败")
          }
      );
	  //211029变动, 修复: surveySurveyors未定义的bug
      this.deliveredFieldSurvey = this.surveyDataMap[row.projId]?this.surveyDataMap[row.projId].surveySurveyors:'未派发';
    },
    rowClick(row,index) {
      this.$refs.refTable.toggleRowExpansion(row)
      console.log(row.index)
    },
    submitDelivery() {
      console.log(this.selectedFieldSurveyList)
      let fsList = this.selectedFieldSurveyList
      var fsStr = ''
      console.log(fsList.length)
      fsList.forEach(
              item => {
                fsStr += item;
                if (fsList.indexOf(item) !== fsList.length - 1) {
                  fsStr += ',';
                }
              }
      );
      this.deliveryInfo.fieldSrvy = fsStr

      deliverProj(this.deliveryInfo).then(
              res => {
                console.log(res);
                this.$message.success('派发成功');
                this.getListData();
                this.dialogVisible = false;
              }
      ).catch(
              err => {
                console.log(err);
                this.$message.error('派发失败：'+ err.errorMsg);
              }
      );

    },
    handleDelivery(row) {
      this.deliveryInfo.projId = row.projId
      this.deliveryInfo.projNum = row.projNum
      this.planedFieldSrvy = row.fieldSrvy
      this.dialogVisible = true
    },
    closed() {
      this.handleClear()
    },
    handleClear(){
      this.selectedFieldSurveyList = []
    },
    evalObjIsDelivered(row){
      let survey = this.surveyDataMap[row.projId]
      if (survey === undefined) {
        return false
      }
      let evalObjArr = survey.subid.split(',')

      return evalObjArr.indexOf(row.evalObjId) >= -1;

    },
    fsDisable(staffName) {
      //console.log(this.surveyDataMap[this.deliveryInfo.projId])
      let survey = this.surveyDataMap[this.deliveryInfo.projId]
	  
      if (survey === undefined || survey.surveySurveyors === '') {
        return false;
      }	  
	  //console.log(survey.surveySurveyors)
      let surveyorArray = survey.surveySurveyors.split(',');

      return surveyorArray.indexOf(staffName) > -1;
	  

    },
    arraySpan({ row, column, rowIndex, columnIndex }){
    	if (columnIndex === 3) {
    	  if (rowIndex === 0) {
    	    return {
    	      rowspan: 10,
    	      colspan: 1
    	    };
    	  } else{
    	    return {
    	      rowspan: 0,
    	      colspan: 0
    	    };
    	  }
    	} 
    },
	
	
	//211029变动 新增: 云查勘本地搜索功能
	getData(){
		return this.tableData.filter(item => {
			if (item.projNum.includes(this.searchContent.projNum) 
			&&item.projName.includes(this.searchContent.projName) 
			&&item.projScope.includes(this.searchContent.projScope) ) {
				return item
			}
		})
	},
	resetSearch(){
		this.searchContent = {
			projNum:'',
			projName:'',
			projScope:'',
		};
	}
	
  }
}
</script>

<style scoped>
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
/deep/ .el-table .success-row {
  background: #ecffe0;
}
#no-hover .el-table__row:hover > td {
  background-color: #ffffff !important;

}

#no-hover .el-table__row--striped:hover > td {
  background-color: #ffffff !important;

}
</style>