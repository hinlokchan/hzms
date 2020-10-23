<template>
  <div style="margin-top: 15px;">
    <el-input placeholder="请输入搜索关键字" v-model="keyword" class="input-with-select">
      <el-button slot="append" type="primary" icon="el-icon-search" @click="doSearch" ></el-button>
    </el-input>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="项目类型">
              <span>{{ props.row.projType }}</span>
            </el-form-item>
            <el-form-item label="项目负责人">
              <span>{{ props.row.projLeader }}</span>
            </el-form-item>
            <el-form-item label="项目复核人">
              <span>{{ props.row.projReviewer }}</span>
            </el-form-item>
            <el-form-item label="专业复核人">
              <span>{{ props.row.projProReviewer }}</span>
            </el-form-item>
            <el-form-item label="项目助理">
              <span>{{ props.row.projAsst }}</span>
            </el-form-item>
            <el-form-item label="现场勘察">
              <span>{{ props.row.fieldSrvy }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
          label="计划编号"
          prop="projNum"
          width="100px"
          align="center"
      >
      </el-table-column>
      <el-table-column
          label="编制日期"
          prop="projDate"
          width="150px"
          align="center"
      >
      </el-table-column>
      <el-table-column
          label="项目名称"
          prop="projName"
      >
      </el-table-column>
      <el-table-column
          label="项目范围"
          prop="projScope"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { caseSearch,isAuthenticated } from '@/api/index'
export default {
  data: function() {
    return {
      keyword: '',
      tableData: []
    }
  },
  methods: {

    doSearch(){
      caseSearch({keyword: this.keyword, showAll: true}).then(res => {
        this.tableData = res.data;
        console.log(res.data);
      }).catch(error => {
        console.log(error)
      });
    }

  },
  created() {
    isAuthenticated()
  }
}
</script>

<style scoped>
.input-with-select {
  width: 800px;
  margin-left: 25%;
  margin-bottom: 15px;
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
</style>