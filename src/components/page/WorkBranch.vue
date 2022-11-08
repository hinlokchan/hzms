<template>
  <div>
    <div class="container">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-receiving"></i> 我的项目
          </el-breadcrumb-item>
          <el-breadcrumb-item>工作台</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
	  
	  
	  <!-- 211028变动 新增: 多个公司切换 -->
	  <el-tabs v-model="companyId" type="card" @tab-click="handleTabsClick">
	    <el-tab-pane label="惠正公司" name="HZ"></el-tab-pane>
	    <el-tab-pane label="智明公司" name="ZM"></el-tab-pane>
	    <el-tab-pane label="汇正公司" name="HZKJ"></el-tab-pane>
	  </el-tabs>
	  
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <div class="grid-content grid-con-1">
              <i class="el-icon-lx-edit grid-con-icon"></i>
              <div class="grid-cont-right" >
                <div class="grid-num">{{missionData.onGoing}}</div>
                <div>待完成项目</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <div class="grid-content grid-con-3">
              <i class="el-icon-lx-warn grid-con-icon"></i>
              <div class="grid-cont-right" >
                <div class="grid-num">{{missionData.urgent}}</div>
                <div>紧急项目</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <div class="grid-content grid-con-2">
              <i class="el-icon-bell grid-con-icon"></i>
              <div class="grid-cont-right" >
                <div class="grid-num">{{missionData.new}}</div>
                <div>本日新项目</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="search">		  
        <el-row :gutter="10">
		  <el-col :span="4">
		  	<el-select
		  	  class="select-width-100"
		  	  v-model.trim="searchData.projState"
		  	  placeholder="请项目状态"
		  	  @change="getLocalData"
		  	  style="width: 100%;"
		  	>
		  	  <el-option
		  		label="项目状态 (不限)"
		  		value=""
		  	  ></el-option>
		  	  <el-option
		  		label="进行中"
		  		value="0"
		  	  ></el-option>
		  	  <el-option
		  		label="已完成"
		  		value="1"
		  	  ></el-option>
		  	  <el-option
		  		label="中止"
		  		value="2"
		  	  ></el-option>
		  	</el-select>
		  </el-col>
          <el-col :span="4">
            <el-input
              v-model.trim="searchData.projNum"
              placeholder="计划编号"
              @keyup.enter.native="getLocalData"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-input
              v-model.trim="searchData.reportNum"
              placeholder="报告号"
			  oninput="value=value.toUpperCase()"
              @keyup.enter.native="getLocalData"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <el-input
              v-model.trim="searchData.projName"
              placeholder="项目名称"
              @keyup.enter.native="getLocalData"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <el-input
              v-model.trim="searchData.projScope"
              placeholder="项目范围"
              @keyup.enter.native="getLocalData"
            ></el-input>
          </el-col>
		</el-row>  
        <el-row :gutter="10" style="margin-top: 10px;">
		  <el-col :span="4">
			<el-select
			  class="select-width-100"
			  v-model.trim="searchData.projDegree"
			  placeholder="请选择紧急程度"
			  @change="getLocalData"
			  style="width: 100%;"
			>
			  <el-option
				label="紧急程度 (不限)"
				value=""
			  ></el-option>
			  <el-option
				label="正常"
				value="1001"
			  ></el-option>
			  <el-option
				label="紧急"
				value="1002"
			  ></el-option>
			</el-select>
		  </el-col>
			  
          <el-col :span="4">
			<el-select
			  class="select-width-100"
			  v-model.trim="searchData.arrgType"
			  placeholder="请选择轮序/安排"
			  @change="getLocalData"
			  style="width: 100%;"
			>
			  <el-option
			    label="轮序/安排 (不限)"
			    value=""
			  ></el-option>
			  <el-option
			    label="轮序"
			    value="1001"
			  ></el-option>
			  <el-option
			    label="安排"
			    value="1002"
			  ></el-option>
			</el-select>
          </el-col>
          <el-col :span="4">
            <el-input
              v-model.trim="searchData.clientName"
              placeholder="委托方"
              @keyup.enter.native="getLocalData"
            ></el-input>
          </el-col>
          <el-col :span="3">
			<el-select
			  class="select-width-100"
			  v-model.trim="searchData.projLeader"
			  placeholder="项目负责人"
			  @change="getLocalData"
			  style="width: 100%;"
			>
			  <el-option
			    label="项目负责人 (不限)"
			    value=""
			  ></el-option>
			  <el-option
			    label="我负责的项目"
			    :value="getUserName()"
			  ></el-option>
			</el-select>
          </el-col>
          <el-col :span="3">
            <el-input
              v-model.trim="searchData.teaminfo"
              placeholder="项目组成员"
              @keyup.enter.native="getLocalData"
            ></el-input>
          </el-col>
		  <el-col :span="3">
			<el-select
			  class="select-width-100"
			  v-model.trim="searchData.needRegister"
			  placeholder="需登记正评"
			  @change="getLocalData"
			  style="width: 100%;"
			>
			  <el-option
				label="登记正评(不限)"
				value=""
			  ></el-option>
			  <el-option
				label="待登记"
				value="1"
			  ></el-option>
			</el-select>
		  </el-col>
		  <el-col :span="3">
			<el-button-group>
				<el-button type="primary" size="small" @click="getLocalData">查找</el-button>
				<el-button type="warning" size="small" @click="reset">重置</el-button>
			</el-button-group>
		  </el-col>
        </el-row>		
      </div>
      <!-- table -->
      <el-table
        class="table"
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        height="600"
        border
        ref="multipleTable"
        style="width: 100%"
        @row-dblclick="handleHandle"
        stripe
		:default-sort = "{prop: 'projDate', order: 'descending'}"
		@sort-change="sortChange"
      >
        <el-table-column
          prop="projState"
          label="项目状态"
          width="90"
          align="center"
        >		
          <template slot-scope="props">
            <el-tag
                  :type="tagType(props.row.projState)"
                  disable-transitions
              >
                <span v-if="props.row.projState == 0">进行中</span>
                <span v-if="props.row.projState == 1">已完成</span>
                <span v-if="props.row.projState == 2">中止</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="projDate"
          label="编制日期"
          width="110"
          :formatter="this.$formatDate"
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
		  prop="reportNum"
		  label="报告号"
		  width="135px"
		>
          <template slot-scope="scope">
			<el-tag type="info"
			v-if="scope.row.paReportNum">{{scope.row.paReportNum}}</el-tag>
			<el-tag type="warning"
			v-if="scope.row.faReportNum">{{scope.row.faReportNum}}</el-tag>
            
          </template>
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
          width="120"
		  sortable="custom"
        >
        </el-table-column>
		
		<el-table-column
		  prop="needRegister"
		  label="待登记"
		  width="90"
		  sortable="custom"
		  align="center"
		  v-if="companyId == 'HZ'"
		>
          <template slot-scope="scope">
			<el-tag :type="needRegisterType(scope.row.needRegister)">{{needRegister(scope.row.needRegister)}}</el-tag>
          </template>
		</el-table-column>
		
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
          width="120"
        >
          <template slot-scope="scope">
            <!-- <el-button
              type="text"
              icon="el-icon-info"
              @click="handleDetail(scope.row)"
              size="medium"
            >项目详情</el-button> -->
            <el-button
              type="text"
              icon="el-icon-s-order"
              @click="handleHandle(scope.row)"
              size="medium"
            >处理项目</el-button>
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
  getAllAbstractProject,
  searchMyProject,
  getReportNum,
  createReportNum,
  alterProjType,
  getSubReportNum,
  addSubReportNum,
  deleteReportNum
} from '@/api/index'
import {getCurrentMission} from '@/api/statistics'
export default {
  name: 'workbranch',
  data() {
    return {
      currentPage: 1, // 当前页码
      pageSize: 50, // 每页的数据条数
      pageTotal: 0, // 数据数
      tableData: [],
      tableFullData: [],
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
      getNumVisible: false,
      changeNumVisible: false,
      innerVisible: false,
      arrMemberVisible: false,
      changeType: {
        projId: '',
        toType: ''
      },
	  searchData:{
		projState: '',
		projNum: '',
		reportNum: '',
		projName: '',
		projScope: '',
		clientName: '', 
		arrgType: '',
		teaminfo:'',
		projLeader:'',
		projDegree:'',
		needRegister:'',
	  },
	  
      midNum: 0,
      date1: '',
      getNumType: 0,
      getNumData: {},
      getSubNum: '',
      timestamp: 0,
	  
	  
	  	  
	  //211028变动 新增: 多个公司切换	  
	  companyRange:['HZ', 'ZM','HZKJ'],
	  companyId:'',
	  companyTabsId: 0,
    };
  },
  computed:{
	  
	needRegisterType(){
		return (data)=>{
			if(data){
				return "warning";			
			}else{
				return "success";
			}
		}
	},
	needRegister(){
		return (data)=>{
			if(data){
				return "待登记: "+data;
			}else{
				return "已登记";
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
	if(!this.pageInfoLoad()){
		this.getData()
	}	
	
    let date = new Date()
    this.timestamp = date.getTime() - date.getHours()*60*60*1000
    console.log(this.timestamp)
  },
  methods: {
	getUserName(){
		return localStorage.getItem('staffName')
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
				return (""+b['projDate']).localeCompare((""+a['projDate']), "zh-Hans-CN", {sensitivity: "accent",})
			});
		}
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
		//项目名称 和 项目范围 和委托人 拆分模糊查询key
		const projNameKey = this.getQuerySearchKey(this.searchData.projName);
		const projScopeKey = this.getQuerySearchKey(this.searchData.projScope);
		const clientNameKey = this.getQuerySearchKey(this.searchData.clientName);
				
		this.tableData = this.tableFullData.filter(item =>{
			return  ( (((item.paReportNum||'').indexOf(this.searchData.reportNum)!=-1 ) || this.searchData.reportNum == '') 
					 || (((item.faReportNum||'').indexOf(this.searchData.reportNum)!=-1 ) || this.searchData.reportNum == '') )
					&& (((item.projNum||'').indexOf(this.searchData.projNum)!=-1 ) || this.searchData.projNum == '')
					&& (((item.arrgType||'').indexOf(this.searchData.arrgType)!=-1 ) || this.searchData.arrgType == '')
					
					&& ( (((item.projLeader||'').indexOf(this.searchData.teaminfo)!=-1 ) || this.searchData.teaminfo == '')
					 ||(((item.projProReviewer||'').indexOf(this.searchData.teaminfo)!=-1 ) || this.searchData.teaminfo == '')
					 ||(((item.projReviewer||'').indexOf(this.searchData.teaminfo)!=-1 ) || this.searchData.teaminfo == '')
					 ||(((item.projAsst||'').indexOf(this.searchData.teaminfo)!=-1 ) || this.searchData.teaminfo == '')
					 ||(((item.fieldSrvy||'').indexOf(this.searchData.teaminfo)!=-1 ) || this.searchData.teaminfo == '') )
					
					&& (((''+item.projState||'').indexOf(this.searchData.projState)!=-1 ) || this.searchData.projState == '')
					&& (((item.projLeader||'').indexOf(this.searchData.projLeader)!=-1 ) || this.searchData.projLeader == '')
					
					&& (((item.projLeader||'').indexOf(this.searchData.projLeader)!=-1 ) || this.searchData.projLeader == '')
					&& (((item.projDegree||'').indexOf(this.searchData.projDegree)!=-1 )  || this.searchData.projDegree == '')
					
					//&& (((''+item.needRegister||'').indexOf(this.searchData.needRegister)!=-1 )  || this.searchData.needRegister == '')
					
					&& (item.needRegister >= this.searchData.needRegister || this.searchData.needRegister == '')
					
										
					//改为模糊查询
					&& ((item.projName||'').match(projNameKey) || this.searchData.projName == '')
					&& ((item.projScope||'').match(projScopeKey) || this.searchData.projScope == '')
					&& ( ((item.clientName||'').match(clientNameKey) || this.searchData.clientName == '')
						|| ((item.clientFullName||'').match(clientNameKey) || this.searchData.clientFullName == '') )
					
		})
		this.currentPage = 1;
		this.pageTotal = this.tableData.length;
		
		//console.log('tableData', this.tableData)
		//console.log('tableFullData', this.tableFullData)
		
		this.$refs.multipleTable.sort('projDate','descending')
	},
		
	
    // deleteReportNum(reportNum) {
    //   deleteReportNum({ reportNum: reportNum }).then(res => {
    //     this.$message.success('删除成功');
    //     this.getNumVisible = false
    //     this.getData();
    //   }).catch(err => {
    //     this.$message.error('删除失败');
    //   })
    // },
	
	/* 
    alterProjType() {
      console.log('this.changeType', this.changeType);
      if (this.changeType.toType == '') {
        this.$message.info('请选择修改类型');
      } else {
        alterProjType(this.changeType)
          .then(res => {
            this.$message.success('修改成功');
            this.changeNumVisible = false;
            this.getData();
          })
          .catch(err => {
            this.$message.error('修改失败');
          });
      }
    },
	 */
	
    //完整号显示
    changeNum(num, type) {
      if (num) {
        const comp = '惠正';
        const year = '[' + num.substr(0, 4) + ']';
        const lastNum = '第' + num.substr(4) + '号';
        let midType = '';
        let numType = '';
        if (
          this.getNumData.projType == 1010 ||
          this.getNumData.projType == 1020 ||
          this.getNumData.projType == 1030
        ) {
          if (this.getNumData.projType == 1010) {
            midType = '房地';
          } else if (this.getNumData.projType == 1020) {
            midType = '土地';
          } else {
            midType = '资产';
          }
          if (type == 1) {
            numType = '初评字';
          } else if (type == 2) {
            numType = '估字';
          } else if (type == 3) {
            numType = '资字';
          }
        } else if (
          this.getNumData.projType == 1061 ||
          this.getNumData.projType == 1062 ||
          this.getNumData.projType == 1063
        ) {
          midType = '申报字';
        } else if (this.getNumData.projType == 1090) {
          midType = '绩效评字';
        } else if (
          this.getNumData.projType == 1050 ||
          this.getNumData.projType == 1080
        ) {
          midType = '资字';
        } else if (this.getNumData.projType == 1070) {
          midType = '测绘';
        } else if (this.getNumData.projType == 1100) {
          midType = '函';
        }
        if (type == 4) {
          midType = '函';
          numType = '';
        }
        return comp + midType + numType + year + lastNum;
      } else {
        return '';
      }
    },
    changeProjType(data) {
      console.log('data>>>', data);
      this.changeType.projId = data.projId;
      this.changeNumVisible = true;
      let selOption = this.typeOptions;
      const index = selOption.findIndex((item, index, arr) => {
        console.log('value>>>', item);
        return item.value == data.projType;
      });
      //selOption.splice(index, 1)
      this.typeOptions = selOption;
    },
    getData() {
	  /* 
      if (sessionStorage.getItem('page')) {
        this.changePage(parseInt(sessionStorage.getItem('page')));
        sessionStorage.removeItem('page');
      }
	  */
	  //211029变动 新增: 多个公司切换
	  
	  this.currentPage = 1;
	  this.tableData=[];
	  this.pageTotal = 0;
	  
	  
      searchMyProject({}, this.companyId)
        .then(res => {
		  (res.data||[]).forEach((item, index) =>{
			res.data[index]['needRegister'] = item.mainStatus0Count + item.mainStatus2Count + item.mainStatus4Count;
		  })
		  console.log('data', res.data)
			
		  if(this.onGoing){
			let arr = []
			for(let i of res.data) {
			  if(i.projState == 0) {
			    arr.push(i)
			  }
			}
			this.tableFullData = arr;
			this.tableData = arr;
			this.pageTotal = arr.length;  
		  }else{
			this.tableFullData = res.data;
			this.tableData = res.data;
			this.pageTotal = res.data.length;  
		  }
		  		  
		  //清除table过滤
		  this.$refs.multipleTable.clearFilter();
		  this.$refs.multipleTable.sort('projDate','descending')
        })
        .catch(err => {
          console.log('failed to search myproject');
        })
		
		//211029变动 新增: 多个公司切换
		const missionData = {
		} 
        getCurrentMission(missionData, this.companyId)
          .then(res => {
            this.missionData = res.data
            console.log(this.missionData)
          })
          .catch(err => {
            console.log('error', err)
          })
    },
	/* 
    getOnGoingProj() {
      if (this.onGoing == true) {
		
		this.currentPage = 1;
		this.tableData=[];
		this.pageTotal = 0;
        searchMyProject(this.searchData, this.companyId)
        .then(res => {
          let arr = []
          for(let i of res.data) {
            if(i.projState == 0) {
              arr.push(i)
            }
          }
          this.tableData = arr;
		  this.pageTotal = arr.length;
        })
        .catch(err => {})
      } else {
        this.reset()
      }
    },
	 */
    showOnlyPl(){
      var list = this.tableData
    },
    reset() {
	  this.currentPage = 1;
	  this.tableData=[];
	  this.pageTotal = 0;
	  this.onGoing = false;
	  
	  this.searchData = {
		projState: '',
		projNum: '',
		reportNum: '',
		projName: '',
		projScope: '',
		clientName: '', 
		arrgType: '',
		teaminfo:'',
		projLeader:'',
		projDegree:'',
		needRegister:'',
		
		// projState: false,
		// projDegree: false,
		// projNew: false,
	  }
	  
      searchMyProject({}, this.companyId)
        .then(res => {
          //console.log(res.data);
		  (res.data||[]).forEach((item, index) =>{
		  	res.data[index]['needRegister'] = item.mainStatus0Count + item.mainStatus2Count + item.mainStatus4Count;
		  })
		  
		  
		  this.tableFullData = res.data
          this.tableData = res.data;
          this.pageTotal = res.data.length;
		  
		  //清除table过滤
		  this.$refs.multipleTable.clearFilter();
		  this.$refs.multipleTable.sort('projDate','descending')
        })
        .catch(err => {
          console.log('failed to search');
        });
    },
	/* 
    handleDetail(val) {
      sessionStorage.setItem('page', this.currentPage);
      // const index2 = (this.currentPage - 1)*10 + index
      console.log('当前行信息 >>>', val);
      this.$router.push({ path: '/projcheck', query: { data: val.projId } });
    },
	 */
    handleHandle(val) {
	  //211202 处理页面跳转返回
	  this.pageInfoSave();			
      //sessionStorage.setItem('page', this.currentPage);
	  
	  const key = this.newCode(val.projId);
	  this.$router.push({ path: '/workhandle', query: { data: key } })
    },
    changePage(val) {
      this.currentPage = val;
    },
    tagType(val) {
      if (val == 0) {
        return 'primary'
      } else if (val == 1) {
        return 'success'
      } else if (val == 2) {
        return 'danger'
      }
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
			
			this.missionData = workbranch_pageinfo.missionData;
			
			this.tableFullData = workbranch_pageinfo.fullData;	
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
		fullData: this.tableFullData,
		
		missionData:this.missionData,
		//filtersitem: this.filtersitem,
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
</style>