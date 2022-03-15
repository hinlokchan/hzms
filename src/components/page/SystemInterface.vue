<template>
  <div class="container">
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
  </div>
</template>

<script>
import { touch } from '../../api';
import { getToken } from '../../api/cfs';

export default {
  name: 'SystemInterface',
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