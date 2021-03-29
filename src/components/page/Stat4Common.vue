<template>
  <div class="container">
    <el-page-header @back="goBack"></el-page-header>
    <el-card style="width:50%; margin-top: 20px">
      <div slot="header"
           class="clearfix">
        <span><b>负责人周报表</b></span>
        <el-button
            style="float:right"
            type="button"
            @click="exportProjLeaderReport"
        >导出</el-button>
      </div>
      <div>
        <b>温馨提示：</b>
      </div>
      <div>
        下载后请手动设置自动换行及自动行高。
      </div>
    </el-card>
  </div>
</template>
<script>
import { host } from '@/config';
import {isAuthenticated} from '@/api';

var ProManageAPIServer = `${host.baseUrl}/${host.ProManageAPIServer}`
  export default {
    created() {
      isAuthenticated();
    },
    methods : {
      exportProjLeaderReport() {
        var oReq = new XMLHttpRequest();
        // url参数为拿后台数据的接口
        let pathUrl = ProManageAPIServer + 'statistics/export/exportProjLeaderReport';
        oReq.open('POST', pathUrl, true);
        oReq.responseType = 'blob';
        oReq.onload = function(oEvent) {
          var content = oReq.response;
          var elink = document.createElement('a');
          // name为后台返给前端的文件名，根据下载文件格式加后缀名，后缀名必须加，不然下载在本地不方便打开。
          var headers = oReq.getResponseHeader('content-disposition');
          console.log(headers);
          const headers2 = headers.split(';')[1].split('=')[1].substr(10);
          elink.download = headers2;
          elink.style.display = 'none';
          var blob = new Blob([content]);
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          document.body.removeChild(elink);
        };
        oReq.send()

        const loading = this.$loading({
          lock: true,
          text: '加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 3000);

      }
    }
  }
</script>