<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-folder"></i> 云现勘
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table
        :data="tableData"
        @expand-change="expandChange"
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        style="width: 100%;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form
              label-position="left" inline class="demo-table-expand"
          >
            <el-table :data="evalObj"
                      v-loading="loading"
                      style=" width: 50%; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
            >
              <el-table-column
                  label="估价对象ID"
                  prop="evalObjId">
              </el-table-column>
              <el-table-column
                  label="估价对象名称"
                  prop="evalObjName">
              </el-table-column>
            </el-table>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
          label="计划编号"
          prop="projNum">
      </el-table-column>
      <el-table-column
          label="项目名称"
          prop="projName">
      </el-table-column>
      <el-table-column
          label="项目范围"
          prop="projScope">
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
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
.el-table .success-row {
  background: #f0f9eb;
}
</style>

<script>
import {getEvalObjListByProjId} from '@/api';
import {getProjList4CFS} from '@/api/cfs';

export default {
  data() {
    return {
      getRowKeys(row) {
        return row.projId
      },
      loading : false,
      tableData: [],
      expands: [],
      evalObj: []
    };
  },
  created() {
    getProjList4CFS().then(
        res => {
          this.tableData = res.data
        }
    );
  },
  methods: {
    expandChange(row,expandedRows) {
      console.log(row.projId)
      var that = this
      if (expandedRows.length) {
        that.expands = []
        if (row) {
          that.expands.push(row.projId)// 每次push进去的是每行的ID
        }
      } else {
        that.expands = []// 默认不展开
        this.evalObj = []
        return
      }

      this.loading = true

      getEvalObjListByProjId(row.projId).then(
          res => {
            console.log(res.data);
            this.evalObj = res.data
            this.loading = false;
          }
      ).catch(
          err => {
            console.log(err)
            this.$alert("获取估价对象失败")
          }
      );

    }
  }
}
</script>