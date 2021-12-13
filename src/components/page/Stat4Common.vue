<template>
  <div class="container">
    <el-page-header @back="goBack"></el-page-header>
    <el-card style="width:50%; min-width: 600px; margin-top: 20px">
      <div slot="header"
           class="clearfix">
        <span><b>项目周报表</b></span>
        <el-button
            style="float:right"
            type="button"
            @click="dialogVisible = true"
        >导出</el-button>
      </div>
      <div>
        <b>温馨提示：</b>
      </div>
      <div>
        下载后请手动设置自动换行及自动行高。
      </div>
    </el-card>
    <el-dialog
        title="选择报表类型"
        :visible.sync="dialogVisible"
        width="30%"
    >
      <el-select v-model="selected" placeholder="请选择">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" :disabled="selected === '' " @click="exportProjLeaderReport">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { host } from '@/config';
import {isAuthenticated} from '@/api';
import { downloadExcel } from '../../utils/download';

var ProManageAPIServer = `${host.baseUrl}/${host.ProManageAPIServer}`
  export default {
    data(){
      return {
        dialogVisible : false,
        selected: '',
        options: [{
          value: '0',
          label: '负责人'
        }, {
          value: '1',
          label: '助理人员'
        }],
				
		//211028变动 新增: 多个公司切换
		companyId:'',
		companyRange:['HZ', 'ZM','HZKJ'],
      }
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
	  
      isAuthenticated();	  
	  
    },
    methods : {
      exportProjLeaderReport() {

        var oReq = new XMLHttpRequest();
        // url参数为拿后台数据的接口
        let path = 'statistics/export/';

        if (this.selected == 0) {
          path += 'exportProjLeaderReport';
        }else if (this.selected == '1') {
          path += 'exportProjAsstReport';
        } else {
          return;
        }

        downloadExcel(null, path, this.companyId);

      },
	  
	  goBack() {
	    this.$router.go(-1)
	  },
    }
  }
</script>