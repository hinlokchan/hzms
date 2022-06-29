<template>
  <div class="container">
<!-- 助理提交->计划部门审核, 改为助理直接生效
	<el-table
		ref="clientNameTable"
		:data="clientChangeList"
		border
		v-if="clientChangeList"
	>
		<el-table-column label="序号" width="50" 
			type="index" align="center"
		></el-table-column>
		<el-table-column
		  label="委托人"
          prop="clientName"
		>
			<template slot-scope="scope">
			  <el-tag type="primary">{{scope.row.clientId}}</el-tag>
			  {{scope.row.clientName}}
			</template>
		</el-table-column>
		<el-table-column
		  label="委托人全称"
          prop="clientFullName"
		>
		</el-table-column>
		<el-table-column
		  label="委托人新全称"
          prop="toBeAuditName"
		>
		</el-table-column>
		<el-table-column
		  label="申请人"
          prop="staffName"
		  width="100px"
		>
		</el-table-column>
		<el-table-column
		  label="对应项目"
          prop="projId"
		  width="140px"
		>
			<template slot-scope="scope">
				<el-button type="primary" plain size="mini" @click="jumpToReviewProj(scope.row)">
					{{scope.row.projId}}
				</el-button>
			</template>
		</el-table-column>
		<el-table-column
		  label="状态"
		  width="80"
          prop="status"
		  align = "center"
		>
			<template slot-scope="scope">
				<el-tag :type="newStatusType(scope.row.status)">
					{{newStatusValue(scope.row.status)}}
				</el-tag>
			</template>
		</el-table-column>
		<el-table-column
		  label="审核"
		  width="200"
		>
			<template slot="header" slot-scope="scope">
			  <el-switch
			    v-model="clientChangeOption"
			    active-text="显示审核"
			    inactive-text="显示全部"
				@change="handleChangeOption">
			  </el-switch>
			</template>
			<template slot-scope="scope">
			  <el-button
			  	@click="clientNamePass(scope.row)"
			  	type="primary"
			  >审核通过</el-button>
			  <el-button
			  	@click="clientNameFail(scope.row)"
			  	type="warning"
			  >审核不过</el-button>
			</template>
		</el-table-column>
	</el-table>
	<div style="height: 10px;"></div>
 -->

       <!-- :data="rawClientList.slice((currentPage-1)*pageSize,currentPage*pageSize)" -->
    <el-table
        ref="multipleTable"
        :data="rawClientList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        tooltip-effect="dark"
        style="width: 100%"
		border
		@filter-change="clientTypeFilterChange">
      <el-table-column
		prop="clientTypeName"
		column-key="clientType"
          label="委托人类别"
          width="200"
          :filters="clientTypeFilters"
      >
        <template slot-scope="scope">
          <el-tag type="info">{{scope.row.clientType}}-{{scope.row.clientTypeName}}</el-tag>

        </template>
      </el-table-column>
      <el-table-column
          prop="clientName"
          label="委托人">
        <template slot-scope="scope">
          <el-tag type="primary">{{scope.row.clientId}}</el-tag>
          {{scope.row.clientName}}
        </template>
      </el-table-column>
      <el-table-column
          prop="toBeAuditName"
          label="委托人全称">
        <template slot-scope="scope">
          {{scope.row.toBeAuditName}}
        </template>
      </el-table-column>
      <el-table-column
          align="right">
        <template slot="header" slot-scope="scope">
          <el-input
              v-model="searchContent"
              @change="doSearch"
              placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
              @click="openTransferDialog(scope.row)"><i class="el-icon-s-unfold"></i>项目移交</el-button>
          <el-button
              @click="openChangeClientTypeDialog(scope.row)"><i class="el-icon-refresh"></i>更改类别</el-button>
          <el-button
              @click="openEditDialog(scope.row)"><i class="el-icon-edit"></i>编辑委托</el-button>
          <el-button
              type="danger"
              @click="handleDeleteClient(scope.row)"><i class="el-icon-delete"></i>删除委托</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="totalCount">
    </el-pagination>
    <el-dialog
        title="项目移交"
        :visible.sync="transferDialogVisible"
        width="30%"
    >
      <span>将
        <el-tag type="info">{{pickedRow.clientType}}-{{pickedRow.clientTypeName}}</el-tag>
        <b>{{pickedRow.clientName}}</b>的项目移交给
      </span>
      <el-cascader
          ref="cascaderAddr"
          :show-all-levels="true"
          v-model="transferToClient"
          :options="clientList"
          :props="{ expandTrigger: 'hover' }"
          style="width: 80% ; margin-top: 10px"
          placeholder="选择目标委托人"
          filterable
      >
        <template slot-scope="{ node, data }">
          <span>{{ data.label }}</span>
          <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
        </template>
      </el-cascader>
      <span slot="footer" class="dialog-footer">
      <el-button @click="transferDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleTransfer"
                 :disabled="pickedRow === {}
                 || transferToClient === undefined"
      >确认移交</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="更改委托人类别"
      width="20%"
      :visible.sync="changeClientTypeDialogVisible"
    >
      将 <b>{{pickedRow.clientName}}</b> 的类别由 <el-tag type="primary">{{pickedRow.clientType}}{{pickedRow.clientTypeName}}</el-tag>变更为
      <br><br>
      <el-select v-model="pickedClientType" placeholder="请选择">
        <el-option
            v-for="item in clientTypeList"
            :key="item.clientType"
            :label="item.clientTypeName"
            :value="item.clientType">
          <template slot-scope="scope">
            <el-tag type="primary">{{item.clientType}}</el-tag>&nbsp;{{item.clientTypeName}}
          </template>
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
      <el-button @click="changeClientTypeDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleChangeClientType"
                 :disabled="pickedClientType === undefined || pickedClientType === pickedRow.clientType"
      >确认更改</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="编辑委托人"
        width="20%"
        :visible.sync="editDialogVisible"
    >
      <el-input type="text" v-model.trim="editedClientName"></el-input>
      <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleEditClientName"
                 :disabled="editedClientName === '' "
      >保存编辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getClientList,getRawClientList,getClientTypeList,deleteClient,changeClientType,transferProj, editClientName,
		getClientNameChangeList, auditClientNameChange} from '@/api';
import CryptoJS from 'crypto-js'

export default {
  name: 'ClientManagement',
  inject: ['reload'],
  data() {
    return {
      transferDialogVisible: false,
      changeClientTypeDialogVisible: false,
      editDialogVisible: false,
      clientTypeFilters: [
        {
          text: '银行',
          value: 0
        },
        {
          value: 101,
          text: '中国银行'
        },
        {
          value: 102,
          text: '建设银行'
        },
        {
          value: 103,
          text: '农业银行'
        },
        {
          value: 104,
          text: '工商银行'
        },
        {
          value: 105,
          text: '交通银行'
        },
        {
          value: 106,
          text: '广发银行'
        },
        {
          value: 107,
          text: '浦发银行'
        },
        {
          value: 108,
          text: '民生银行'
        },
        {
          value: 109,
          text: '兴业银行'
        },
        {
          value: 110,
          text: '中信银行'
        },
        {
          value: 111,
          text: '平安银行'
        },
        {
          value: 112,
          text: '南粤银行'
        },
        {
          value: 113,
          text: '邮政储蓄银行'
        },
        {
          value: 114,
          text: '光大银行'
        },
        {
          value: 115,
          text: '广州银行'
        },
        {
          value: 116,
          text: '华润银行'
        },
        {
          value: 117,
          text: '东莞农商银行'
        },
        {
          value: 118,
          text: '惠州东盈村镇银行'
        },
        {
          value: 119,
          text: '惠民村镇银行'
        },
        {
          value: 120,
          text: '广东华兴银行'
        },
        {
          value: 121,
          text: '农商银行'
        },
        {
          value: 122,
          text: '招商银行'
        },
        {
          value: 123,
          text: '东莞银行'
        },
        {
          value: 124,
          text: '华夏银行'
        },
        {
          value: 1001,
          text: '自然资源局'
        },
        {
          value: 1002,
          text: '法院'
        },
        {
          value: 1003,
          text: '国资委'
        },
        {
          value: 1004,
          text: '财政局'
        },
        {
          value: 1005,
          text: '政府部门'
        },
        {
          value: 1006,
          text: '担保公司'
        },
        {
          value: 1100,
          text: '其他'
        }
      ],
      clientList: [],
      rawClientList: [],	  
	  
	  rawClientFullList: [],
	  
      form: {
        clientName: '',
        clientType: ''
      },
      activeName: '1',
      searchContent: '',
      searchResult: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 0,
      pageSize: 50,
      transferToClient: undefined,
      pickedRow: {},
      clientTypeList: [],
      pickedClientType: undefined,
      editedClientName: '',
	  
	  /* 
	  //委托人修改
	  clientChangeList:[],
	  clientChangeFullList:[],
	  clientChangeOption:true,
	  */
	  
	  //211028变动 新增: 多个公司切换
	  companyId:'',
	  companyRange:['HZ', 'ZM','HZKJ'],
    };
  },
  computed:{
  	newStatusType(){
  		return (data)=>{
  			if(data == 0){
  				return "primary";
  			}else if(data == 1){
  				return "success";
  			}else if(data == 2){
  				return "warning";
  			}else{
  				return "info";
  			}				
  		}
  	},
  	newStatusValue(){
  		return (data)=>{
  			if(data == 0){
  				return "待审核";
  			}else if(data == 1){
  				return "已通过";
  			}else if(data == 2){
  				return "未通过";
  			}else{
  				return "info";
  			}				
  		}
  	},
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
	
    this.getClientList()
    this.getClientTypeList()
	
	//this.getClientChangeList()
  },
  methods: {
	/* 委托人相关
	//委托人修改列表
	getClientChangeList(){
		this.getClientNameChangeListData(this.projId, (clData)=>{			
			
			//完整列表
			//this.clientChangeFullList = alist; //clData;
			this.clientChangeFullList = clData;
			
			//待审核列表
			this.clientChangeList = this.clientChangeFullList.filter(item => {
				//条件匹配
				return item.status == "0";
			}); 
			
			//console.log('full', this.clientChangeFullList);
			//console.log('short', this.clientChangeList);
		});
	},
	getClientNameChangeListData(projId, successc) {
		const listData = {
			projId: projId,
		}
		getClientNameChangeList(listData, this.companyId)
		.then(res => {
			if (res.statusCode == 200) {
				successc(res.data);
			}
		})
		.catch(err => {
		  console.log('委托人修改列表', err)
		})
	},  
	clientNamePass(subData){
		if(subData.status > 0){
			this.$message.warning('当前申请已审批')
		}else{
			this.$confirm('确认通过该申请?', '提示', { type: 'success' })
			.then(() => {
				const passData = {
					id: subData.id,
					status: 1,
				};				
				
				auditClientNameChange(passData, this.companyId)
				.then(res => {
					this.$message.success('修改委托方审核通过');
					
					//刷新列表
					this.getClientChangeList()
					this.clientChangeOption = true
				})
				.catch(err => {
				})
			})
		}
	},
	clientNameFail(subData){
		if(subData.status > 0){
			this.$message.warning('当前申请已审批')
		}else{
			this.$confirm('确认该申请不通过?', '提示', { type: 'warning' })
			.then(() => {
				const failData = {
					id: subData.id,
					status: 2,
				};	
				auditClientNameChange(failData, this.companyId)
				.then(res => {
					this.$message.success('修改委托方审核不过');
					
					//刷新列表
					this.getClientChangeList()
					this.clientChangeOption = true
				})
				.catch(err => {
				})
			})
		}
	},
	
	
	
	handleChangeOption(val){
		if(val == true){			
			//待审核列表			
			this.clientChangeList = this.clientChangeFullList.filter(item => {
				//条件匹配
				return item.status == "0";
			}); 
			
		}else{
			//完整列表
			this.clientChangeList = this.clientChangeFullList
		}
	},
	
	jumpToReviewProj(val){
		const key = this.newCode(val.projId);
		this.$router.push({ path: '/projcheck', query: { data: key } })
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
	  
	  
    getClientTypeList() {
      getClientTypeList({}, this.companyId)
          .then(res => {
            this.clientTypeList = res.data
          });
    },
    doSearch(){
      if (this.searchContent !== '') {
        getRawClientList({ searchContent: this.searchContent}, this.companyId)
            .then(
                res => {
				  this.rawClientFullList = res.data;
				  
                  this.rawClientList = res.data;
                  this.totalCount = this.rawClientList.length
                }
            )
            .catch(err => {
              console.log('getClientList ERROR', err);
            })
      }
    },
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage=val
    },
    getClientList() {
      getClientList({}, this.companyId)
          .then(res => {
            console.log('getClientList RES', res)
            this.clientList = res.data
          })
          .catch(err => {
            console.log('getClientList ERROR', err)
          })

      getRawClientList({ searchContent: this.searchContent}, this.companyId)
          .then(
              res => {
                console.log(res)
				this.rawClientFullList = res.data;			
				
                this.rawClientList = res.data;
                this.totalCount = this.rawClientList.length
              }
          )
          .catch(err => {
            console.log('getRawClientList', err);
          })
    },
	/* 
    clientTypeFilterMethod(value, row, column) {
      if (value === 0) {
        return row.clientType < 1000
      } else {
		console.log('筛选', value)
        return row.clientType === value;
      }
    },
	 */
	clientTypeFilterChange(filters){
		if(filters['clientType'].length>0){
			//过滤			
			var isBank = false;
			//是否为"银行"
			if(filters['clientType'].length==1){
				if(filters['clientType'][0] == 0){
					isBank = true;
				}
			}	
			
			var newList = [];
			if(isBank){
				this.rawClientFullList.forEach((item, index) =>{
					if(item.clientType < 1000){
						newList.push(item);
					}
				});
			}else{
				this.rawClientFullList.forEach((item, index) =>{
					if(filters['clientType'].indexOf(item.clientType) != -1){
						newList.push(item);
					}
				});
			}
			this.rawClientList = newList;			
		}else{
			//重置
			this.rawClientList = this.rawClientFullList;
		}
		this.currentPage = 1;
		this.totalCount = this.rawClientList.length;
		
	},
	
    handleTransfer(){
      this.$confirm('确认移交', '提示', { confirmButtonText: '确认提交', cancelButtonText: '取消', type: 'error' })
          .then(
              () => {
                let transferToClientId = this.transferToClient[this.transferToClient.length - 1].valueOf();
                if (typeof transferToClientId !== 'number') {
                  this.$message.error('委托人数值错误！')
                  return
                }
                transferProj({ clientId: this.pickedRow.clientId, transferToClientId: transferToClientId }, this.companyId).then(
                    res => {
                      this.$message.success('移交成功');
                      this.getClientList()
                      this.transferDialogVisible = false
                    }
                )
                    .catch(
                        err => {
                          if (err.statusCode.valueOf() > 999) {
                            this.$message.error('原委托人无关联项目。');
                          } else {
                            this.$message.error('移交失败');
                          }
                        }
                    );
              }
          );
    },
    handleChangeClientType() {
      this.$confirm('确认修改', '提示', { confirmButtonText: '确认提交', cancelButtonText: '取消', type: 'warning' })
          .then(
              () => {
                if (typeof this.pickedClientType !== 'number') {
                  this.$message.error('委托人类别数值错误')
                  return
                }
                changeClientType({ clientId: this.pickedRow.clientId, toClientType: this.pickedClientType }, this.companyId).then(
                    res => {
                      this.$message.success('更改委托人类别成功');
                      this.getClientList()
                      this.changeClientTypeDialogVisible = false
                    }
                ).catch(
                    err => {
                      this.$message.error('更改委托人类别失败')
                    }
                );
              }
          );
    },
    handleEditClientName() {
      this.$confirm('确认编辑', '提示', { confirmButtonText: '确认提交', cancelButtonText: '取消', type: 'warning' })
          .then(
              () => {
                editClientName({ clientId: this.pickedRow.clientId, editedClientName: this.editedClientName }, this.companyId).then(
                    res => {
                      this.$message.success('编辑保存成功')
                      this.getClientList()
                      this.editDialogVisible = false
                    }
                );

              }
          );
    },
    openChangeClientTypeDialog(row) {
      this.pickedClientType = undefined
      this.pickedRow = {}

      this.changeClientTypeDialogVisible = true
      this.pickedRow = row
    },
    openTransferDialog(row){
      this.transferToClient = undefined
      this.pickedRow = {}

      this.transferDialogVisible = true ;
      this.pickedRow = row;
    },
    openEditDialog(row) {
      if (row.clientType < 1000) {
        this.editedClientName = row.clientName.substr(row.clientName.indexOf('-') + 1);
      } else {
        this.editedClientName = row.clientName
      }
      this.pickedRow = {};

      this.editDialogVisible = true;
      this.pickedRow = row;
    },
    handleDeleteClient(row) {
      this.$confirm('确认删除【' + row.clientId + row.clientName + '】吗？', '删除委托人',
          { confirmButtonText: '确定', cancelButtonText: '取消', type: 'error' })
          .then(
              () => {
                deleteClient({ clientId: row.clientId }, this.companyId).then(
                    res => {
                      this.$message.success('删除成功');
                      this.reload();
                    }
                ).catch(
                    err => {
                      if (err.statusCode.valueOf() > 999) {
                        this.$message.error('该委托人有未移交项目，无法删除。');
                      } else {
                        this.$message.error('删除失败!')
                      }
                    });
              }
          )
      ;
    }
  }
}
</script>

<style scoped>

</style>