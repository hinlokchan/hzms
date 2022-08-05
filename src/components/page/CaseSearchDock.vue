<template>

  <div>
    <div class="container">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-discover"></i>
            案例数据库
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            搜索
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
		<el-form :inline="true" label-width="100px">
		  <el-form-item label="类型">
		    <el-select
		      v-model="projType"
		      placeholder="选择类型"
			  @change="doSearch"
			  size="large"
		    >
		      <el-option
		        v-for="item in projTypeOptions"
		        :key="item.value"
		        :label="item.label"
		        :value="item.value"
		      >
		      </el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="关键字">
		    <el-input placeholder="请输入搜索关键字" v-model="keyword" @change="doSearch" style="width: 400px;" size="large">
		      <el-button slot="append" type="primary" icon="el-icon-search" @click="doSearch" ></el-button>
		    </el-input>
		  </el-form-item>
		</el-form>
        <el-table
            class="main-table"
            :data="tableData.list"
            style="width: 100%"
            v-if="tableData.list.length>0"
            :row-style="{height:'100px'}"
            @row-click="rowClick"
            :show-header="false"
        >
          <el-table-column>
            <template slot-scope="scope">
              <el-card
                  style="min-height: 150px ; cursor: pointer"
                  shadow="hover"
              >
                <el-header>
                  <el-row :gutter="20">
                    <el-col :span="22">
                      <h2><span v-html="scope.row.projName"></span></h2>
                      <br>
                      <span v-html="scope.row.projScope"></span>
                    </el-col>
                    <el-col :span="2">
                      <el-tag v-if="scope.row.hitScore >= 30 && scope.row.hitScore < 50" type="success">匹配度：{{scope.row.hitScore}}</el-tag>
                      <el-tag v-else-if="scope.row.hitScore >= 50 && scope.row.hitScore < 90" type="warning">匹配度：{{scope.row.hitScore}}</el-tag>
                      <el-tag v-else-if="scope.row.hitScore >= 80 " type="danger">匹配度：{{scope.row.hitScore}}</el-tag>
                      <el-tag v-else type="info">匹配度：{{scope.row.hitScore}}</el-tag>
                    </el-col>
                  </el-row>
                </el-header>
                <el-main>
                  <!--                  <el-tag type="info" style="margin-right: 5px">测试类型</el-tag>-->
                  <!--                  <el-tag type="success" style="margin-right: 5px" v-if="scope.row.evalObjCommunity != null">-->
                  <!--                    {{scope.row.evalObjCommunity-->
                  <!--                      .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'')-->
                  <!--                      .replace(/<[^>]+?>/g,'').replace(/\s+/g,' ')-->
                  <!--                      .replace(/ /g,' ').replace(/>/g,' ')}}-->
                  <!--                  </el-tag>-->
                </el-main>
                <el-footer height="20px">
                  <el-tag type="info">基准日：{{scope.row.baseDate}}</el-tag>
                  <el-tag type="info" style="margin-left: 5px">案例ID：{{scope.row.caseId}}</el-tag>
                </el-footer>
              </el-card>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { isAuthenticated } from '@/api/index'
import { caseSearch } from '@/api/hzirdb'
export default {
  data: function() {
    return {
      keyword: '',
      lastKeyword: '',
      tableData: {
        dataSource:null,
        list:[

        ]
      },
	  
	  projType:'',
	  projTypeOptions: [{
		label: '全部',
		value: '',
	  }, {
		label: '房产',
		value: '1010',
	  }, {
		label: '资产',
		value: '1020',
	  }, {
		label: '土地',
		value: '1030',
	  }],
    }
  },  
  created() {
    isAuthenticated().then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error)
    });
  	
  	//211202 处理页面跳转返回
  	this.pageInfoLoad()
  },
  methods: {
    formatDate: function(row, column, cellValue) {
      return this.$moment(row.baseDate).format('YYYY年MM月DD日');
    },
    doSearch() {
      if (this.keyword.length === 0) {
        this.$message.warning('关键词不能为空')
        return;
      }
	  
	  const searchData={
		projType:this.projType,
		keyword: this.keyword
	  }
      caseSearch(searchData).then(res => {
        if (res.data.length === 0) {
          this.$message.warning('未查询到数据');
          return;
        } else {
          //this.tableData.list = res.data;		  
		  //220211 变动 按基准日排序
		  this.tableData.list =  res.data.sort(
			(a, b) => new Date(b['baseDate']) - new Date(a['baseDate'])
		  );		  
		 
		  
          this.$message.success('搜索到 ' + res.data.length + ' 条数据');
        }
      }).catch(error => {
            console.log(error);
          });
    },

    getUnitPrice(row) {
      let evalObjAcreage = row.evalObjAcreage
      let evalObjTotalAssemValue = row.evalObjTotalAssemValue
      let unitPrice = evalObjTotalAssemValue / evalObjAcreage *10000
      return unitPrice.toFixed(2)
    },
	
	/* 
    detailCheck(row) {
      this.$router.push({ path: '/projcheck', query: { data: row.projId } });
    },
	 */

    rowClick(row){
	  //211202 处理页面跳转返回
	  this.pageInfoSave();
	
      this.$router.push({ path: '/casecheck', query: { data: row.caseId } });
    },
		
	//211202 处理页面跳转返回
	pageInfoLoad(){
		//const case_pageinfo = JSON.parse(sessionStorage.getItem('case_pageinfo'));
		const case_pageinfo = JSON.parse(this.global.case_pageinfo);
		if(case_pageinfo){
		  if(case_pageinfo.status){
			//赋值		
			this.tableData.list = case_pageinfo.data;
			  		
			this.keyword = case_pageinfo.searchData;
		  }
		  //删除
		  //sessionStorage.removeItem('case_pageinfo');
		  this.global.case_pageinfo = null;
		  return true;
		}else{
		  return false;
		}
	},
	pageInfoSave(){
	  const case_pageinfo ={
		  searchData: this.keyword,
		
		  data: this.tableData.list,
	    status:0
	  };
	  //sessionStorage.setItem('case_pageinfo', JSON.stringify(case_pageinfo));
	  this.global.case_pageinfo = JSON.stringify(case_pageinfo);
	}

  },
}
</script>

<style scoped>
.input-with-select {
  width: 50%;
  margin-bottom: 5px;
}

.input-with-select-select {
  width: 100px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #1a73d9;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

/* 去掉中间数据的分割线 */
.main-table >>> .el-table__row>td{
  border: none;
}

.el-footer span {
  color: #989898;
}

/deep/ .el-form-item__label {
  color: #000;
  font-size: 16px;
  line-height: 40px;
}
</style>