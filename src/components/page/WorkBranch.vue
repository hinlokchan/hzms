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
          <el-card :body-style="{ padding: '0px' }">
            <div class="grid-content grid-con-1">
              <i class="el-icon-lx-edit grid-con-icon"></i>
              <div class="grid-cont-right">
                <div class="grid-num"></div>
                <div>待完成项目数</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <div class="grid-content grid-con-3">
              <i class="el-icon-lx-warn grid-con-icon"></i>
              <div class="grid-cont-right">
                <div class="grid-num"></div>
                <div>紧急项目数</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <div class="grid-content grid-con-2">
              <i class="el-icon-lx-punch grid-con-icon"></i>
              <div class="grid-cont-right">
                <div class="grid-num"></div>
                <div>待归档项目数</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="search">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-input
              v-model="searchValProjNum"
              placeholder="计划编号"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-input
              v-model="searchValReportNum"
              placeholder="报告号"
            ></el-input>
          </el-col>
          <el-col :span="5">
            <el-input
              v-model="searchValProjName"
              placeholder="项目名称"
            ></el-input>
          </el-col>
          <el-col :span="5">
            <el-input
              v-model="searchValProjScope"
              placeholder="项目范围"
            ></el-input>
          </el-col>
          <el-col :span="3">
            <el-button
              @click="getData"
              type="primary"
            >搜 索</el-button>
            <el-button @click="reset">重 置</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- table -->
      <el-table
        class="table"
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        height="600"
        border
        ref="multipleTable"
        style="width: 100%"
        @row-dblclick="handleHandle"
      >
        <el-table-column
          prop="projDegree"
          label="紧急程度"
          width="80"
          align="center"
        >
          <template slot-scope="props">
            <el-tag
              :type="props.row.projDegree === '1001' ? 'success' : 'danger'"
              disable-transitions
            >
              <span v-if="props.row.projDegree == 1001">正常</span>
              <span v-else>紧急</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="projDate"
          label="编制日期"
          width="120"
          :formatter="this.$formatDate"
          sortable
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
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="projScope"
          label="项目范围"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="projLeader"
          label="项目负责人"
          width="95"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="projState"
          label="项目进度"
          width="90"
          align="center"
        >
          <template slot-scope="props">
            <el-tag type="primary">{{ props.row.projState }}</el-tag>
          </template>
        </el-table-column> -->
        <el-table-column
          label="操作"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <!-- <el-button
              type="text"
              icon="el-icon-info"
              @click="handleDetail(scope.row)"
              size="medium"
            >项目详情</el-button> -->
            <el-button
              type="text"
              icon="el-icon-s-order"
              @click="handleHandle(scope.row)"
              size="medium"
            >处理项目</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          :total="pageTotal"
          :current-page="currentPage"
          :page-size="pageSize"
          @current-change="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getAllAbstractProject, searchMyProject, getReportNum, createReportNum, alterProjType, getSubReportNum, addSubReportNum, deleteReportNum } from '@/api/index'
export default {
  name: 'workbranch',
  data() {
    return {
      currentPage: 1, // 当前页码
      pageSize: 15, // 每页的数据条数
      pageTotal: 0, // 数据数
      tableData: [],
      typeOptions: [
        { value: '1010', label: '房地产' },
        { value: '1020', label: '资产' },
        { value: '1030', label: '土地' },
        { value: '1041', label: '房地产咨询' },
        { value: '1042', label: '资产咨询' },
        { value: '1043', label: '土地咨询' }
      ],
      getNumVisible: false,
      changeNumVisible: false,
      innerVisible: false,
      arrMemberVisible: false,
      changeType: {
        projId: '',
        toType: ''
      },
      searchValProjNum: '',
      searchValReportNum: '',
      searchValProjName: '',
      searchValProjScope: '',
      midNum: 0,
      date1: '',
      getNumType: 0,
      getNumData: {},
      getSubNum: ''
    }
  },
  created() {
    this.getData()
  },
  mounted() {
  },
  methods: {
    // deleteReportNum(reportNum) {
    //   deleteReportNum({ reportNum: reportNum }).then(res => {
    //     this.$message.success('删除成功');
    //     this.getNumVisible = false
    //     this.getData();
    //   }).catch(err => {
    //     this.$message.error('删除失败');
    //   })
    // },
    alterProjType() {
      console.log('this.changeType', this.changeType)
      if (this.changeType.toType == '') {
        this.$message.info('请选择修改类型');
      } else {
        alterProjType(this.changeType).then(res => {
          this.$message.success('修改成功');
          this.changeNumVisible = false
          this.getData();
        }).catch(err => {
          this.$message.error('修改失败');
        })
      }
    },
    //完整号显示
    changeNum(num, type) {
      if (num) {
        const comp = '惠正'
        const year = '[' + num.substr(0, 4) + ']'
        const lastNum = '第' + num.substr(4) + '号'
        let midType = ''
        let numType = ''
        if (this.getNumData.projType == 1010 || this.getNumData.projType == 1020 || this.getNumData.projType == 1030) {
          if (this.getNumData.projType == 1010) { midType = '房地' } else if (this.getNumData.projType == 1020) { midType = '土地' } else { midType = '资产' }
          if (type == 1) { numType = '初评字' } else if (type == 2) { numType = '估字' } else if (type == 3) { numType = '资字' }
        } else if (this.getNumData.projType == 1061 || this.getNumData.projType == 1062 || this.getNumData.projType == 1063) {
          midType = '申报字'
        } else if (this.getNumData.projType == 1090) {
          midType = '绩效评字'
        } else if (this.getNumData.projType == 1050 || this.getNumData.projType == 1080) {
          midType = '资字'
        } else if (this.getNumData.projType == 1070) { midType = '测绘' } else if (this.getNumData.projType == 1100) { midType = '函' }
        if (type == 4) { midType = '函'; numType = '' }
        return comp + midType + numType + year + lastNum
      } else {
        return ''
      }
    },
    changeProjType(data) {
      console.log('data>>>', data)
      this.changeType.projId = data.projId
      this.changeNumVisible = true
      let selOption = this.typeOptions
      const index = selOption.findIndex((item, index, arr) => {
        console.log('value>>>', item)
        return item.value == data.projType
      })
      //selOption.splice(index, 1)
      this.typeOptions = selOption
    },
    getData() {
      if (sessionStorage.getItem('page')) {
        this.changePage(parseInt(sessionStorage.getItem('page')))
        sessionStorage.removeItem('page')
      }
      searchMyProject({ projName: this.searchValProjName,reportNum: this.searchValReportNum, projNum: this.searchValProjNum, projScope: this.searchValProjScope })
        .then(res => {
          console.log(res.data)
          this.tableData = res.data
          this.pageTotal = res.data.length
        })
        .catch(err => {
          console.log('field to search myproject');
        })
    },
    reset() {
      this.searchValProjName = ''
      this.searchValProjNum = ''
      searchMyProject()
        .then(res => {
          console.log(res.data)
          this.tableData = res.data
          this.pageTotal = res.data.length
        })
        .catch(err => {
          console.log('field to search');
        })
    },
    handleDetail(val) {
      sessionStorage.setItem('page', this.currentPage)
      // const index2 = (this.currentPage - 1)*10 + index
      console.log('当前行信息 >>>', val)
      this.$router.push({ path: '/projcheck', query: { data: val.projId } })
    },
    handleHandle(val) {
      sessionStorage.setItem('page', this.currentPage)
      this.$router.push({ path: '/workhandle', query: { data: JSON.stringify(val) } })
    },
    changePage(val) {
      console.log(val)
      this.currentPage = val;
    },
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
.dialog-item {
  margin-top: 20px;
  width: 90%;
}
.right-button {
  float: right;
}
</style>