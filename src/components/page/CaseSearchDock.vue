<template>

  <div>
    <div class="container">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-folder"></i> 案例查询（Demo）
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入搜索关键字" v-model="keyword" @change="doSearch" class="input-with-select">
<!--          <el-select v-model="searchType" slot="prepend" placeholder="请选择" class="input-with-select-select">-->
<!--            <el-option label="模糊查询" value="0"></el-option>-->
<!--            <el-option label="精确查询" value="1"></el-option>-->
<!--          </el-select>-->
          <el-button slot="append" type="primary" icon="el-icon-search" @click="doSearch" ></el-button>
        </el-input>
        <br>
        <div class="useDbRadio">
          <el-radio v-model="radio" label="0" >内部数据</el-radio>
          <el-radio v-model="radio" label="1" >公网数据（二手房）</el-radio>
        </div>
        <el-table
            :data="tableData.list"
            style="width: 100%"
            v-if="tableData.list.length>0&&tableData.dataSource==='0'"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="项目类型">
                  <span>{{ props.row.typeName }}</span>
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
<!--          <el-table-column-->
<!--              label="编制日期"-->
<!--              prop="projDate"-->
<!--              width="150px"-->
<!--              align="center"-->
<!--          >-->
<!--          </el-table-column>-->
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
          <el-table-column
              label="委托人"
              prop="clientName"
              width="200px"
          >
          </el-table-column>
        </el-table>
        <el-table
            :data="tableData.list"
            style="width: 100%"
            v-if="tableData.list.length>0&&tableData.dataSource==='1'"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
<!--                <el-form-item label="简介">-->
<!--                  <span>{{ props.row.profile }}</span>-->
<!--                </el-form-item>-->
                <br>
                <el-form-item label="装修程度">
                  <span>{{ props.row.decorationDegree }}</span>
                </el-form-item>
                <el-form-item label="朝向">
                  <span>{{ props.row.toward }}</span>
                </el-form-item>
                <el-form-item label="建筑年份">
                  <span>{{ props.row.yearBuilt }}年</span>
                </el-form-item>
                <el-form-item label="信息来源">
                  <span>{{ props.row.sourceFrom }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
              label="小区名称"
              prop="communityName"
          >
          </el-table-column>
          <el-table-column
              label="所在区域"
              prop="locationDistrict"
          >
          </el-table-column>
          <el-table-column
              label="户型"
              prop="houseType"
              width="150px"
          >
          </el-table-column>
          <el-table-column
              label="楼层"
              prop="floor"
              width="150px"
          >
          </el-table-column>
          <el-table-column
              label="建筑面积（平方米）"
              prop="buildingArea"
              width="150px"
          >
          </el-table-column>
          <el-table-column
              label="单价（元/平方米）"
              prop="unitPrice"
              width="150px"
          >
          </el-table-column>
          <el-table-column
              label="总价（万元）"
              prop="totalPrice"
              width="150px"
          >
          </el-table-column>
          <el-table-column
              label="数据来源"
              prop="sourceFrom"
              width="150px"
          >
          </el-table-column>
        </el-table>
        <el-button class="loadMoreBtn" type="text" @click="loadMore" v-show="loadMoreBoolean && tableData.list.length>0" style="float:right">加载更多</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { caseSearch,isAuthenticated } from '@/api/index'
export default {
  data: function() {
    return {
      keyword: '',
      lastKeyword: '',
      showAll: false,
      tableData0: [],
      tableData1: [],
      tableData: {
        dataSource:null,
        list:[]
      },
      loadMoreBoolean: true,
      searchType: '0',
      useDb: '0',
      radio: '0',
      useDbBoolean: true,
      tableKey: 0
    }
  },
  methods: {

    doSearch() {
      if (this.keyword.length === 0) {
        return;
      }
      // if (this.keyword === this.lastKeyword) {
      //   return;
      // } else {
      //   this.lastKeyword = this.keyword;
      // }
      this.tableData.dataSource = this.radio;
      caseSearch({ keyword: this.keyword, showAll: false ,dataSource: this.radio}).then(res => {
        this.tableData.list = res.data;
        this.loadMoreBoolean = true;
      }).catch(error => {
        console.log(error);
      });
    },

    loadMore() {
      caseSearch({ keyword: this.keyword, showAll: true ,dataSource: this.radio}).then(res => {
        this.tableData.list = res.data;
        this.loadMoreBoolean = false;
      }).catch(error => {
        console.log(error);
      });
    }

  },
  created() {
    isAuthenticated().then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error)
    });
  }
}
</script>

<style scoped>
.input-with-select {
  width: 50%;
  margin-left: 25%;
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

.useDbRadio {
  margin-left: 25%;
  margin-bottom: 15px;
}



</style>