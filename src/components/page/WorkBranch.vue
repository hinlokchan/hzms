<template>
  <div>
    <div class="container">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-receiving"></i> 我的项目
          </el-breadcrumb-item>
          <el-breadcrumb-item>工作台</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card
            shadow="hover"
            :body-style="{ padding: '0px' }"
          >
            <div class="grid-content grid-con-1">
              <i class="el-icon-lx-edit grid-con-icon"></i>
              <div class="grid-cont-right">
                <div class="grid-num">1234</div>
                <div>待完成项目数</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card
            shadow="hover"
            :body-style="{ padding: '0px' }"
          >
            <div class="grid-content grid-con-3">
              <i class="el-icon-lx-warn grid-con-icon"></i>
              <div class="grid-cont-right">
                <div class="grid-num">50</div>
                <div>紧急项目数</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card
            shadow="hover"
            :body-style="{ padding: '0px' }"
          >
            <div class="grid-content grid-con-2">
              <i class="el-icon-lx-punch grid-con-icon"></i>
              <div class="grid-cont-right">
                <div class="grid-num">100</div>
                <div>待归档项目数</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="search">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-input placeholder="请输入您想搜索的内容"></el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary">搜 索</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- table -->
      <el-table
        class="table"
        :data="tableData"
        border
        height="500"
        style="width: 100%"
        :default-sort="{ prop: 'projDate', order: 'descending' }"
      >
        <el-table-column
          prop="projDegree"
          label="紧急程度"
          width="80"
          align="center"
        >
          <template slot-scope="props">
            <el-tag
              :type="props.row.projDegree === '正常' ? 'success' : 'danger'"
              disable-transitions
            >{{props.row.projDegree}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="projDate"
          label="编制日期"
          width="120"
          sortable
          :formatter="formatDate"
        >
        </el-table-column>
        <el-table-column
          prop="projNum"
          label="计划编号"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="projName"
          label="项目名称"
          width="250"
        >
        </el-table-column>
        <el-table-column
          prop="projScope"
          label="项目范围"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="projLeader"
          label="项目负责人"
          width="95"
        >
        </el-table-column>
        <el-table-column
          prop="projState"
          label="项目进度"
          width="90"
          align="center"
        >
          <template slot-scope="props">
            <el-tag type="primary">{{ props.row.projState }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-info"
              @click="handleDetail(scope.$index)"
              size="medium"
            >项目详情</el-button>
            <el-button
              type="text"
              icon="el-icon-star-on"
              size="medium"
              @click="getNum(scope)"
            >取号</el-button>
            <el-button
              type="text"
              icon="el-icon-s-operation"
              @click="changeNumVisible = true;"
              size="medium"
            >更改报告号类型</el-button>
            <el-button
              type="text"
              icon="el-icon-s-order"
              @click="arrMemberVisible = true"
              size="medium"
            >分配任务</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 取号 -->
      <el-dialog
        title="取号"
        :visible.sync="getNumVisible"
      >
        <div>
          <div>当前项目名:</div>
          <div>当前项目初评号:</div>
          <div>当前项目正评号:</div>
        </div>
        <el-form :model="creatReportNum">
          <el-form-item
            label="取号类型"
            label-width="200px"
          >
            <el-radio
              v-model="reportNumType"
              label="pa"
            >初评号</el-radio>
            <el-radio
              v-model="reportNumType"
              label="fa"
            >正评号</el-radio>
            <el-radio
              v-model="reportNumType"
              label="ra"
            >回函号</el-radio>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="getNumVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="creatReportNum"
          >取 号</el-button>
        </div>
      </el-dialog>
      <!-- 更改报告号 -->
      <el-dialog
        title="更改报告号"
        :visible.sync="changeNumVisible"
      >
        <el-form>
          <el-form-item
            label="选择需要更改的类型"
            label-width="200"
          >
            <el-select
              v-model="typeOptions.value"
              placeholder="请选择"
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="请选择更改的原因"
            label-width="200"
          >
            <el-select>
              <el-option label="项目工作需要"></el-option>
              <el-option label="个人误操作"></el-option>
              <el-option></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div style="color: red">Tips:更改后原报告号及计划编号将改变</div>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="changeNumVisible = false">取 消</el-button>
          <el-button type="primary">确认更改</el-button>
        </div>
      </el-dialog>
      <!-- 分配任务 -->

    </div>
  </div>
</template>

<script>
import { getAllAbstractProject, searchMyProject, getReportNum } from '@/api/index'
export default {
  name: 'workbranch',
  data() {
    return {
      tableData: [],
      typeOptions: [
        { value: '1010', label: '房地产' },
        { value: '1020', label: '资产' },
        { value: '1030', label: '土地' },
        { value: '1040', label: '房地产咨询' },
        { value: '1050', label: '资产咨询' },
        { value: '1060', label: '土地咨询' },
        { value: '1070', label: 'PPP' },
        { value: '1080', label: 'f' },
        { value: '1090', label: '土地' },
        { value: '1100', label: '土地' },

      ],
      getNumVisible: false,
      changeNumVisible: false,
      arrMemberVisible: false,
      reportNumType: 'pa',
      date1: ''
    }
  },
  created() {
    this.getData();
  },
  mounted() {
  },
  methods: {
    getData() {
      searchMyProject()
        .then(res => {
          console.log(res.data)
          this.tableData = res.data
        })
        .catch(err => {
          console.log('field to search');
        })
    },
    handleDetail(index) {
      console.log(this.tableData[index].projId);
      this.$router.push({ path: '/projcheck', query: { data: this.tableData[index].projId } })
    },
    creatReportNum() {

    },
    getNum(num) {
      console.log(num.row.projId)
      getReportNum({ projId: num.row.projId })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(res)
        })
    },
    formatDate(now) {
      const time = new Date(now.projDate)
      var year = time.getFullYear();  //取得4位数的年份
      var month = time.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
      var date = time.getDate();      //返回日期月份中的天数（1到31）
      var hour = time.getHours();     //返回日期中的小时数（0到23）
      return year + "-" + month + "-" + date
    }
  }
}
</script>

<style scoped>
.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}
.table {
    width: 100%;
    margin-top: 10px;
    font-size: 14px;
}
.search {
    margin-top: 20px;
}
</style>