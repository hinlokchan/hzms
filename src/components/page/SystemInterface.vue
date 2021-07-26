<template>
  <div>
    <el-card class="box-card" style="width:30%;">
      <div slot="header" class="clearfix">
        <span>云查勘</span>
      </div>
      <el-button style="float: right;margin-bottom: 10px" @click="toCFS">
        进入
      </el-button>
    </el-card>
    <el-card class="box-card" style="width:30%;margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>文件管理</span>
      </div>
      <el-button style="float: right;margin-bottom: 10px" @click="toFileManage" >
        进入
      </el-button>
    </el-card>
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

    toFileManage() {
      console.log('called')
      let baseUrl = 'https://www.gdhzpg.cn/web/#/login?redirect=/docs/docs_list';

      getToken().then(
          res => {
            baseUrl += '&token=' + res.data;
            console.log(baseUrl);
            window.open(baseUrl);
          })
          .catch(err => {
            this.$message.error('获取token错误')
            console.log(err);
          });

    },

    toCFS() {
      let baseUrl = 'https://www.gdhzpg.cn/web/#/login?redirect=/survey/survey_infolist';

      getToken().then(
          res => {
            baseUrl += '&token=' + res.data;
            console.log(baseUrl);
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

</style>