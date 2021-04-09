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
        <el-input placeholder="请输入搜索关键字" v-model="keyword" @change="doSearch" class="input-with-select" size="large">
          <el-button slot="append" type="primary" icon="el-icon-search" @click="doSearch" ></el-button>
        </el-input>

        <el-card shadow="never" style="margin-top: 20px" v-if="tableData.list.length > 0">
          <el-table
              :data="tableData.list"
              style="width: 100%"
              v-if="tableData.list.length>0"
              :row-style="{height:'100px'}"
              ref="refTable"
              @row-click="rowClick"
              cell-style="font-weight:500"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form
                    label-position="left"
                    inline class="demo-table-expand"
                    label-suffix="："
                    label-width="auto"
                >
                  <el-form-item label="装修程度">
                    <el-tag v-if="props.row.decoDegree !== '其他' && props.row.decoDegree !== '' " type="primary">{{ props.row.decoDegree }}</el-tag>
                    <el-tag v-else type="info">其他</el-tag>
                  </el-form-item>
                  <el-form-item label="朝向">
                    <el-tag v-if="props.row.towards !== '其他' && props.row.towards !== '' " type="primary">{{ props.row.towards }}</el-tag>
                    <el-tag v-else type="info">其他</el-tag>
                  </el-form-item>
                  <el-form-item label="户型结构">
                    <el-tag v-if="props.row.houseTypeStructure !== '其他' && props.row.houseTypeStructure !== '' " type="primary">{{ props.row.houseTypeStructure }}</el-tag>
                    <el-tag v-else type="info">其他</el-tag>
                  </el-form-item>
                  <el-form-item label="房屋用途">
                    <el-tag v-if="props.row.unitUsage !== '其他' && props.row.unitUsage !== '' " type="primary">{{ props.row.unitUsage }}</el-tag>
                    <el-tag v-else type="info">其他</el-tag>
                  </el-form-item>
                  <el-form-item label="房屋类型">
                    <el-tag v-if="props.row.unitType !== '其他' && props.row.unitType !== '' " type="primary">{{ props.row.unitType }}</el-tag>
                    <el-tag v-else type="info">其他</el-tag>
                  </el-form-item>
                  <el-form-item label="房屋属性">
                    <el-tag v-if="props.row.unitType !== '其他' && props.row.unitType !== '' " type="primary">{{ props.row.unitType }}</el-tag>
                    <el-tag v-else type="info">其他</el-tag>
                  </el-form-item>
                  <el-form-item label="所在楼栋">
                    <el-tag v-if="props.row.buildingNum !== '其他' && props.row.buildingNum !== '' " type="primary">#{{ props.row.buildingNum }}</el-tag>
                    <el-tag v-else type="info">其他</el-tag>
                  </el-form-item>
                  <br>
                  <el-form-item label="价值类型">
                    <el-tag v-if="props.row.valueType !== '其他' && props.row.valueType !== '' " type="warning">{{ props.row.valueType}}</el-tag>
                    <el-tag v-else type="info">其他</el-tag>
                  </el-form-item>
                  <br>
                  <el-form-item label="评估方法">
                    <el-tag v-if="props.row.evalMethod !== '其他' && props.row.evalMethod !== '' " type="warning">{{ props.row.evalMethod }}</el-tag>
                    <el-tag v-else type="info">其他</el-tag>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
                label="小区名称"
                prop="evalObjCommunity"
                width="200px"
            >
            </el-table-column>
            <el-table-column
                label="所在市"
                prop="evalObjCity"
                width="100px"
            >
            </el-table-column>
            <el-table-column
                label="所在行政区/县"
                prop="evalObjAdminRegion"
                width="100px"
            >
            </el-table-column>
            <el-table-column
                label="户型"
                prop="houseType"
                width="150px"
            >
            </el-table-column>
            <el-table-column
                label="建筑面积（平方米）"
                prop="evalObjAcreage"
                width="150px"
            >
            </el-table-column>
            <el-table-column
                label="单价（元/平方米）"
                prop="unitPrice"
                width="150px"
            >
              <template slot-scope="scope">
                {{getUnitPrice(scope.row)}}
              </template>
            </el-table-column>
            <el-table-column
                label="总价（万元）"
                prop="evalObjTotalAssemValue"
                width="150px"
            >
            </el-table-column>
            <el-table-column
                label="基准日"
                :formatter="formatDate"
                prop="baseDate"
                width="150px"
            >
            </el-table-column>
            <el-table-column
                label="操作"
                align="center"
            >
              <template slot-scope="scope">
                <el-button type="primary" @click.stop="detailCheck(scope.row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>

        </el-card>

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
      tableData: {
        dataSource:null,
        list:[]
      },
    }
  },
  methods: {
    formatDate: function(row, column, cellValue) {
      return this.$moment(row.baseDate).format('YYYY年MM月DD日');
    },
    doSearch() {
      if (this.keyword.length === 0) {
        return;
      }
      caseSearch({ keyword: this.keyword}).then(res => {
        this.tableData.list = res.data;
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

    detailCheck(row) {
      this.$router.push({ path: '/projcheck', query: { data: row.projId } });
    },

    rowClick(row){
      this.$refs.refTable.toggleRowExpansion(row)
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

</style>