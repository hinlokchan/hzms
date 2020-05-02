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
        <el-row :gutter="10">
          <el-col :span="10">
            <el-input
              v-model="searchVal"
              placeholder="请输入项目名称搜索"
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
        border
        ref="multipleTable"
        style="width: 100%"
        :default-sort="{ prop: 'projDate', order: 'descending' }"
      >
        <!-- <el-table-column
          type="expand"
        >
          <template>
            <el-table style="width: calc(100% - 47px)">
              <el-table-column align="center" label="子报告号" width="120">
                
              </el-table-column>
              <el-table-column align="center" label="子项目名称" width="400">
                
              </el-table-column>
              <el-table-column align="center" label="项目负责人" width="120">
                
              </el-table-column>
              <el-table-column align="center" label="项目助理" width="180">
                
              </el-table-column>
              <el-table-column align="center" label="操作">
                
              </el-table-column>
            </el-table>
          </template>
        </el-table-column> -->
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
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="projScope"
          label="项目范围"
          width="160"
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
              @click="handleDetail(scope.row)"
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
              @click="changeProjType(scope.row)"
              size="medium"
              v-if="scope.row.projType == 1010 || scope.row.projType == 1020 || scope.row.projType == 1030 || scope.row.projType == 1041 || scope.row.projType == 1042 || scope.row.projType == 1043"
            >更改项目类型</el-button>
            <el-button
              type="text"
              icon="el-icon-s-order"
              @click="handleWorkArrange(scope.row)"
              size="medium"
            >工作安排</el-button>
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
      <!-- 取号 -->
      <el-dialog
        title="取号"
        :visible.sync="getNumVisible"
        width="50%"
      >
        <!-- 取号确认 -->
        <el-dialog
          width="30%"
          title="提示"
          :visible.sync="innerVisible"
          append-to-body
        >
          <p style="text-align:center">点击确认进行取号</p>
          <p style="text-align:center">咨询号需先与领导沟通后再取</p>
          <el-button
            style="margin: 16px 0 0 40%"
            type="primary"
            @click="getNewNum"
          >确认取号</el-button>
        </el-dialog>
        <!-- 主体 -->
        <div class="crumbs">
          <h2>当前项目名：{{getNumData.projName}}</h2>
        </div>
        <div>
          <div
            class="dialog-item"
            v-if="getNumType == 1"
          >当前项目初评号：
            <span v-if="getNumData.cph !== ''">
              {{changeNum(getNumData.cph,1)}}
              <el-button
                class="right-button"
                @click="deleteReportNum(getNumData.cph)"
                type="danger"
              >取 消</el-button>
            </span>
            <span v-else>
              <el-button
                class="right-button"
                type="primary"
                @click="getNewNummid(1)"
              >取号</el-button>
            </span>
          </div>
          <div class="dialog-item">当前项目正评号：
            <span v-if="getNumData.zph !== ''">
              {{changeNum(getNumData.zph,2)}}
              <el-button
                class="right-button"
                @click="deleteReportNum(getNumData.zph)"
                type="danger"
              >取 消</el-button>
            </span>
            <span v-else>
              <el-button
                class="right-button"
                type="primary"
                @click="getNewNummid(2)"
              >取号</el-button>
            </span>
          </div>
          <div class="dialog-item">当前项目回函号：
            <span v-if="getNumData.hhh !== ''">
              {{changeNum(getNumData.hhh,4)}}<el-button
                @click="deleteReportNum(getNumData.hhh)"
                class="right-button"
                type="danger"
              >取 消</el-button>
            </span>
            <span v-else>
              <el-button
                class="right-button"
                type="primary"
                @click="getNewNummid(4)"
              >取号</el-button>
            </span>
          </div>
        </div>
      </el-dialog>
      <!-- 更改报告号 -->
      <el-dialog
        title="更改项目类型"
        :visible.sync="changeNumVisible"
      >
        <el-form>
          <el-form-item
            label="选择需要更改的类型"
            label-width="200"
          >
            <el-select
              v-model="changeType.toType"
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
          <!-- <el-form-item
            label="请选择更改的原因"
            label-width="200"
          >
            <el-select>
              <el-option label="项目工作需要"></el-option>
              <el-option label="个人误操作"></el-option>
              <el-option></el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
        <div style="color: red">Tips:更改后原报告号及计划编号将改变</div>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="changeNumVisible = false">取 消</el-button>
          <el-button
            @click="alterProjType"
            type="primary"
          >确认更改</el-button>
        </div>
      </el-dialog>
      <!-- 分配任务end -->
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
      pageSize: 10, // 每页的数据条数
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
      searchVal: '',
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
    deleteReportNum(reportNum) {
      deleteReportNum({ reportNum: reportNum }).then(res => {
        this.$message.success('删除成功');
        this.getNumVisible = false
        this.getData();
      }).catch(err => {
        this.$message.error('删除失败');
      })
    },
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
      searchMyProject({ projName: this.searchVal })
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
      this.searchVal = ''
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
    handleWorkArrange(val) {
      this.$router.push({ path: '/workarrange', query: { data: val } })
    },
    //取号流程 getNum -> getNewNumId -> getNewNum
    getNum(num) {
      console.log(num.row)
      this.getNumVisible = true
      this.getNumData = num.row.reportNum
      this.getNumData.projType = num.row.projType
      this.getNumData.projId = num.row.projId
      this.getNumData.projName = num.row.projName
      //////
      this.getSubNum = num.row.reportNum.cph
      console.log('getSubNum >>>', this.getSubNum)
      getSubReportNum({ reportNumList: this.getSubNum })
        .then(res => {
          console.log('xxx', res.data);

        })
      console.log('getNum -> getNumData>>>', this.getNumData)
      if (num.row.projType == 1010 || num.row.projType == 1020 || num.row.projType == 1030) {
        this.getNumType = 1 //房地资项目类型才有初评正评
        // } else if(num.row.projType == 1041 || num.row.projType == 1042 || num.row.projType == 1043){
        //   this.getNumType = 3
      } else {
        this.getNumType = 2 //其他仅有正评
      }
    },
    getNewNummid(num) {
      //传入 1, 2, 4代表初评、正评、回函
      this.midNum = num
      //显示取号确认dialog
      this.innerVisible = true
    },
    getNewNum() {
      this.innerVisible = false
      let type = this.midNum
      console.log('type', type)
      console.log('>>>', this.getNumData.projType)
      let reportNumType = ''
      if (type == 4) {
        reportNumType = 1100
      } else {
        if (this.getNumData.projType == 1041) {
          reportNumType = 1013
        } else if (this.getNumData.projType == 1042) {
          reportNumType = 1023
        } else if (this.getNumData.projType == 1043) {
          reportNumType = 1033
        } else if (this.getNumData.projType == 1010 || this.getNumData.projType == 1020 || this.getNumData.projType == 1030) {
          reportNumType = this.getNumData.projType + type
        } else {
          reportNumType = this.getNumData.projType
        }
      }
      console.log('reportNumType>>>', reportNumType)
      createReportNum({ projId: this.getNumData.projId, reportNumType: reportNumType }).then(res => {
        console.log(res.data.reportNum)
        if (type == 1) {
          this.getNumData.cph = res.data.reportNum
        } else if (type == 2) {
          this.getNumData.zph = res.data.reportNum
        } else if (type == 3) {
          this.getNumData.zxh = res.data.reportNum
        } else {
          this.getNumData.hhh = res.data.reportNum
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //取号end
    getSubNumMethod() {
      addSubReportNum({ reportNum: '2020FG03002', subReportNum: '102' })
        .then(res => {
          console.log(res)
        })
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