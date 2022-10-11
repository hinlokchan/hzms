<template>
    <div>
        <div class="container">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                        <i class="el-icon-folder"></i> 合同管理
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
			
			<el-tabs v-model="companyId" type="card" @tab-click="handleTabsClick">
			  <el-tab-pane label="惠正公司" name="HZ"></el-tab-pane>
			  <el-tab-pane label="智明公司" name="ZM"></el-tab-pane>
			  <el-tab-pane label="汇正公司" name="HZKJ"></el-tab-pane>
			</el-tabs>
		  
		    <div>
			  <el-row :gutter="4">
				<el-col  :xs="24" :sm="24" :lg="15" >
				  <el-row :gutter="4">
					  <el-col :lg="4" :span="4">
						<el-input
						  v-model.trim="searchData.contractNum"
						  placeholder="合同号"
						  @keyup.enter.native="getLocalData"
						  oninput="value=value.toUpperCase()"
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
						  v-model.trim="searchData.externalContractNum"
						  placeholder="外部合同号"
						  @keyup.enter.native="getLocalData"
						></el-input>
					  </el-col>
					  <el-col :lg="5" :span="5">
						<el-input
						  v-model.trim="searchData.clientName"
						  placeholder="委托方"
						  @keyup.enter.native="getLocalData"
						></el-input>
					  </el-col>
					  <el-col :lg="5" :span="5">
						<el-button-group>
							<el-button type="primary" size="small" @click="getLocalData">查找</el-button>
							<el-button type="warning" size="small" @click="resetSearch">重置</el-button>
						</el-button-group>
					  </el-col>
				  </el-row>
				<!-- 	
				  <el-input placeholder="合同号" v-model.trim="searchData.contractNum" @change="getLocalData" size="small" oninput="value=value.toUpperCase()" style="margin-bottom: 20px ; width: 10% ;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-input>
				  <el-input placeholder="项目名称" v-model.trim="searchData.projName" @change="getLocalData" size="small" style="margin-left: 1px;margin-bottom: 20px ; width: 15% ;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-input>
				  <el-input placeholder="外部合同号" v-model.trim="searchData.externalContractNum" @change="getLocalData" size="small" style="margin-left: 1px;margin-bottom: 20px ; width: 15% ;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-input>
				  <el-input placeholder="委托方" v-model.trim="searchData.clientName" @change="getLocalData" size="small" style="margin-left: 1px;margin-bottom: 20px ; width: 15% ;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-input>
				  <el-button type="primary" icon="el-icon-search" @click="getLocalData" style="margin-left: 5px" >查找</el-button>
				  <el-button type="primary" icon="el-icon-refresh" @click="resetSearch" style="margin-left: 5px" >重置</el-button>
			    -->
				</el-col>
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
								<el-button type="success" style="margin: -1px 0 0 4px; height: 31px;" @click="exportContract()" size="small">导出</el-button>
							</el-button-group>
						</el-form-item>
					</el-form>
				  </div> 
			  
				</el-col>
			  </el-row>
		    </div>
			
			
		    <el-table
		        :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
		        :row-class-name="tableRowClassName"
		        ref="table"
		        :height="windowHeight"
		        @row-click="rowClick"
		        style="width: 100%;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
		      <el-table-column type="expand">
		        <template slot-scope="props">
		          <el-form label-position="left" inline class="demo-table-expand" style="padding: 0 20px;">
		            <el-form-item label="评估目的">
		              <span>{{ props.row.assemGoal }}</span>
		            </el-form-item>
		            <el-form-item label="项目负责人">
		              <span>{{ props.row.projLeader }}</span>
		            </el-form-item>
		            <el-form-item label="项目助理">
		              <span>{{ props.row.projAsst }}</span>
		            </el-form-item>
		            <!-- <el-divider></el-divider> -->
		    				  <div style="border-top: 1px solid #CCC; height: 8px; margin-top: 5px;"></div>
		            <el-form-item label="签约负责人">
		              <span>{{ props.row.signingPic }}</span>
		            </el-form-item>
		            <el-form-item label="归档经办人">
		              <span>{{ props.row.archiveOperator }}</span>
		            </el-form-item>
		            <el-form-item label="取号日期">
		              <span>{{ props.row.takenDate }}</span>
		            </el-form-item>
		            <el-form-item label="回收日期">
		              <span>{{ props.row.recoverDate }}</span>
		            </el-form-item>
		            <el-form-item label="签约日期">
		              <span>{{ props.row.signingDate }}</span>
		            </el-form-item>
		            <el-form-item label="已签份数">
		              <span>{{ props.row.signedCopiesCount }}</span>
		            </el-form-item>
		            <el-form-item label="备注">
		              <span>{{ props.row.notes }}</span>
		            </el-form-item>
		          </el-form>
		        </template>
		      </el-table-column>
		      <el-table-column label="操作" width="80" align="center">
		        <template slot-scope="scope">
		          <el-button
		              type="text"
		              size="mini"
		              @click.stop="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit-outline"></i>编辑</el-button>
		          <br>
		          <el-button
		              type="text"
		              size="mini"
		              @click.stop="checkDetail(scope.row)"><i class="el-icon-document"></i>查看</el-button>
		        </template>
		      </el-table-column>
		      <el-table-column
		          prop="contractNum"
		          label="公司合同号"
		          align="center"
		          width="90">
		      </el-table-column>
		      <el-table-column
		          prop="projNum"
		          label="计划编号"
		          align="center"
		          width="100">
		      </el-table-column>
		      <el-table-column
		          prop="reportNum"
		          label="报告号"
		          align="center"
		          width="110">
		      </el-table-column>
		      <el-table-column
		          prop="projName"
		          label="项目名称"
		          width="">
		      </el-table-column>
		      <el-table-column
		          prop="clientName"
		          label="委托人"
		          width="150">
		      </el-table-column>
		      <el-table-column
		          prop="externalContractNum"
		          label="外部合同号"
		          align="center"
		          width="150">
		        <template slot-scope="scope">
		          <el-button
		              type="text"
		              size="mini"
		              @click.stop="openContractNumDialog(scope.row)">
		            {{ scope.row.externalContractNum}}<i class="el-icon-edit"></i>
		          </el-button>
		        </template>
		      </el-table-column>
			  <el-table-column
			      prop="contractPrice"
			      label="合同金额"
			      width="100">
			  </el-table-column>
		    </el-table>
		    <el-pagination
		        hide-on-single-page
		        background
		        @current-change="handleCurrentChange"
		        :current-page="currentPage"
		        :page-size="pageSize"
		        layout="total, prev, pager, next"
		        :total="pageTotal"
		        style="margin: 10px"
		    >
		    </el-pagination>

            <el-dialog :title="'合同'+editForm.contractNum+'信息编辑'" :visible.sync="dialogFormVisible">
              <el-form :model="editForm" label-width="100px">
                <el-form-item label="签约日期">
                  <el-date-picker
                      v-model="editForm.signingDate"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="签约负责人">
                  <el-input v-model="editForm.signingPic" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="已签份数">
                  <el-input-number v-model="editForm.signedCopiesCount" @change="" :min="1" :max="100" label=""></el-input-number>
                </el-form-item>
                <el-form-item label="回收日期">
                  <el-date-picker
                      v-model="editForm.recoverDate"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="归档经办人">
                  <el-input v-model="editForm.archiveOperator" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="合同金额">
                  <el-input v-model="editForm.contractPrice"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input type="textarea" v-model="editForm.notes" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitEdit">修改</el-button>
              </div>
            </el-dialog>
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
        </div>
    </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import { getContractList, updateContractInfo, updateExternalContractNum } from '@/api';
import {downloadExcel} from '../../utils/download';

export default {
  inject: ['reload'],            //注入App里的reload方法
  data() {
    return {
      windowHeight: document.documentElement.clientHeight*3/5,
      tableData: [],
      tableFullData: [],
      dialogFormVisible: false,
      editForm: {
        contractNum: '',
        signingPic: '',
        signedCopiesCount: '',
        recoverDate: '',
        archiveOperator: '',
        notes: '',
        signingDate: '',
        contractPrice: ''
      },
      searchData: {
        contractNum: '',
        projName: '',
        externalContractNum: '',
		clientName:'',
      },
      filterRecover: true,
      preExternalContractNum: '',
      contractNumDialogVisible: false,
      activeRowData: undefined,
      currentPage: 1,
      pageTotal: 0,
      pageSize: 20,
	  
	  //导出表单
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
	
  },
  
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.recoverDate != '' && row.recoverDate != null) {
        return 'success-row';
      }
      return 'normal-row';
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.editForm.contractNum = row.contractNum;
      this.editForm.signingPic = row.signingPic;
      this.editForm.signedCopiesCount = row.signedCopiesCount;
      this.editForm.recoverDate = this.formatDate(row.recoverDate);
      this.editForm.archiveOperator = row.archiveOperator;
      this.editForm.notes = row.notes;
      this.editForm.signingDate = this.formatDate(row.signingDate);
      this.editForm.contractPrice = row.contractPrice;
      console.log(this.editForm);
    },
    formatDate(date) {
      if (date == null || date === '') {
        return '';
      }
      return this.$moment(date).format('YYYY-MM-DD');
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    submitEdit() {
      updateContractInfo(this.editForm, this.companyId).then(
          res => {
            this.$message.success('编辑成功');
            this.dialogFormVisible = false;
            this.getData();
          }
      ).catch(
          err => {
            this.$message.error('编辑失败');
          })
      ;
    },
    getData() {
	  getContractList({}, this.companyId).then(
	      res => {
	        for (let i = 0; i < res.data.length; i++) {
	          res.data[i].clientName = res.data[i].clientTypeName + '-' + res.data[i].clientName;
	        }
			this.tableFullData = res.data;
	        this.tableData = res.data;
	        this.pageTotal = res.data.length;
	      }
	  );
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
		const clientNameKey = this.getQuerySearchKey(this.searchData.clientName);
						
		this.tableData = this.tableFullData.filter(item =>{
			return  (((item.contractNum||'').indexOf(this.searchData.contractNum)!=-1 ) || this.searchData.contractNum == '')
					&& (((item.externalContractNum||'').indexOf(this.searchData.externalContractNum)!=-1 ) || this.searchData.externalContractNum == '')
															
					//改为模糊查询
					&& (item.projName.match(projNameKey) || this.searchData.projName == '')
					&& ( (item.clientName.match(clientNameKey) || this.searchData.clientName == '')
						|| (item.clientFullName.match(clientNameKey) || this.searchData.clientFullName == '') )
					
		})
		this.currentPage = 1;
		this.pageTotal = this.tableData.length;
		
		//console.log('tableData', this.tableData)
		//console.log('tableFullData', this.tableFullData)
		
		//this.$refs.table.sort('projDate','descending')
	},
	
    rowClick(row) {
      this.$refs.table.toggleRowExpansion(row);
    },

    setExternalContractNum() {

      if (this.preExternalContractNum === '') {
        this.$message.error('外部合同号不能为空');
        return;
      } else if (this.externalContractNumValidator(this.preExternalContractNum)) {
        this.$message.error('不能包含中文');
        return;
      } else if (this.preExternalContractNum === this.externalContractNum) {
        this.$message.warning('请修改后再提交');
        return;
      }

      updateExternalContractNum({
        projId: this.activeRowData.projId,
        externalContractNum: this.preExternalContractNum
      }, this.companyId).then(
          res => {
            this.$message.success('修改成功');
			
            //this.reload();
			this.contractNumDialogVisible = false;
			this.getData();
          }
      ).catch(err => {
        console.log(err);
        this.$message.error('修改失败');
        this.preExternalContractNum = '';
      });

    },

    openContractNumDialog(row) {
      this.activeRowData = row;
      this.preExternalContractNum = row.externalContractNum;
      this.contractNumDialogVisible = true;
    },
    externalContractNumValidator(str) {
      var reg = /^[\u4e00-\u9fa5]+$/;
      return str.match(reg);
    },
    checkDetail(row) {
	  //211202 处理页面跳转返回
	  this.pageInfoSave();
	  
	  const key = this.newCode(row.projId);
	  this.$router.push({ path: '/projcheck', query: { data: key } })
    },
    resetSearch() {
	  //重置
      this.searchData.projName = ''
      this.searchData.externalContractNum = ''
      this.searchData.contractNum = ''
	  
	  this.currentPage = 1
	  this.pageTotal = 0;
	  this.tableData = [];
		
      this.getData()
    },	
		
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
	  this.resetSearch();
	 
	}, 
	
	//211202 处理页面跳转返回
	pageInfoLoad(){
		//const contract_pageinfo = JSON.parse(sessionStorage.getItem('contract_pageinfo'));
		const contract_pageinfo = JSON.parse(this.global.contract_pageinfo);
		if(contract_pageinfo){
		  if(contract_pageinfo.status){
			//赋值		
			this.tableData = contract_pageinfo.data;
			this.tableFullData = contract_pageinfo.fulldata;
			
			this.pageTotal = contract_pageinfo.pageData.pageTotal;
			this.currentPage = contract_pageinfo.pageData.currentPage;
			this.pageSize = contract_pageinfo.pageData.pageSize;
			
			this.searchData = contract_pageinfo.searchData;
		  }
		  //删除
		  //sessionStorage.removeItem('contract_pageinfo');
		  this.global.contract_pageinfo = null;
		  return true;
		}else{
		  return false;
		}
	},
	
	pageInfoSave(){
	  const contract_pageinfo ={
		searchData: this.searchData,
		pageData: {
			pageTotal: this.pageTotal,
			currentPage: this.currentPage,
			pageSize: this.pageSize,
		},
		data: this.tableData,
		fulldata: this.tableFullData,
	    status:0
	  };
	  //sessionStorage.setItem('contract_pageinfo', JSON.stringify(contract_pageinfo));
	  this.global.contract_pageinfo = JSON.stringify(contract_pageinfo);
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
	
	exportContract(){
		var formData = new FormData()
		if(this.exportSubListForm.multiDate){
			const startData = this.exportSubListForm.multiDate[0] + ' 00:00:00';
			const endDate = this.exportSubListForm.multiDate[1] + ' 23:59:59';
			formData.append('startDate', startData);
			formData.append('endDate', endDate);
			
			const path = 'statistics/export/exportContractInfo'
			downloadExcel(formData, path, this.companyId)
		}else{
			this.$message.warning('请选择导出的日期范围');
		}
	},
  },
  
  

};
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

/deep/ .el-table .normal-row {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

/deep/ .el-table .success-row {
  background: #ecffe0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>