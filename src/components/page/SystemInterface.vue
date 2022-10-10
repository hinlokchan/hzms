<template>
  <div class="container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
		  <i class="el-icon-attract"></i>
		  其他系统入口管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
	<div class="main">
	  <el-table :data="tableData" border style="font-size: 18px">
		<el-table-column label="标题" width="200px" align="center" prop="title"/>
		<el-table-column label="内容" align="center" prop="content"/>
		<el-table-column label="操作" width="150px" align="center">
		  <template slot-scope="scope">
			<el-button type="primary" @click="jumpToUrl(scope.row.url)">进 入</el-button>
		  </template>
		</el-table-column>		
	  </el-table>
	</div>
	
	<!-- 
	<el-row :gutter="20">
		<el-col :span="8">
			<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span>查勘管理</span>
			  </div>
			  <el-button type="primary" size="medium" style="float: right;margin-bottom: 10px" @click="jumpToUrl('survey/survey_infolist')">
			    进入
			  </el-button>
			</el-card>
		</el-col>
		<el-col :span="8">			
			<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span>文件管理</span>
			  </div>
			  <el-button type="primary" size="medium" style="float: right;margin-bottom: 10px" @click="jumpToUrl('docs/docs_list')" >
			    进入
			  </el-button>
			</el-card>
		</el-col>
		<el-col :span="8">			
			<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span>发票管理</span>
			  </div>
			  <el-button type="primary" size="medium" style="float: right;margin-bottom: 10px" @click="jumpToUrl('bill/bill_list')" >
			    进入
			  </el-button>
			</el-card>
		</el-col>
		<el-col :span="8">			
			<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span>抓取管理</span>
			  </div>
			  <el-button type="primary" size="medium" style="float: right;margin-bottom: 10px" @click="jumpToUrl('crawl')" >
			    进入
			  </el-button>
			</el-card>
		</el-col>
	</el-row> 
	 -->
  </div>
</template>

<script>
import { touch } from '../../api';
import { getToken } from '../../api/cfs';

export default {
  name: 'SystemInterface',
  
  data() {
	return {
	  tableData:[
		{
		  title: '文件管理',
		  content: '针对所有人员开放, 各位员工可以将最新文件上传上去, 方便查阅',
		  url: 'docs/docs_list'
		}, 
		{
		  title: '数据管理',
		  content: '针对所有人员开放, 方便查看网上搜集的成交、采购等相关数据',
		  url: 'crawl'
		}, 
		{
		  title: '考核管理',
		  content: '针对所有人员开放, 月度考核评分人员评分，所有人员查看当月考核得分',
		  url: 'staffkpi/staff_kpiscore'
		}, 
		{
		  title: '查勘管理',
		  content: '针对房产查勘相关人员开放',
		  url: 'survey/survey_infolist'
		},  
		{
		  title: '发票管理',
		  content: '针对财务人员开放, 对发票审核、入账等处理',
		  url: 'bill/bill_list'
		}, 
		{
		  title: '预约管理',
		  content: '针对车辆和工具管理人员开放, 方便查看借出情况',
		  url: 'booking/booking_list'
		}, 
	  ]
	};
  },
  created() {
    touch()
  },
  methods: {
		
	jumpToUrl(url){
		var baseUrl = 'https://www.gdhzpg.cn/web/#/login?redirect=/' + url;
		getToken().then(
		res => {
		  baseUrl += '&token=' + res.data;
		  window.open(baseUrl);
		})
		.catch(err => {
		  this.$message.error('获取token错误')
		  console.log(err);
		});
	}

  }
};
</script>

<style scoped>
	.box-card{
		margin-bottom: 20px;
	}
</style>