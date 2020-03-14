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
      <el-table
        class="table"
        :data="tableData"
        border
        height="500"
        style="width: 100%"
        :default-sort="{ prop: 'projDate', order: 'descending' }"
      >
        <el-table-column
          prop="projDe"
          label="紧急程度"
          width="80"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.projDe === '正常' ? 'success' : 'danger'"
              disable-transitions
            >{{scope.row.projDe}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="projDate"
          label="编制日期"
          width="120"
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
          prop="projProgress"
          label="项目进度"
          width="90"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag type="primary">{{ scope.row.projProgress }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template>
            <el-button
              type="text"
              icon="el-icon-info"
              @click="handleDetail()"
              size="medium"
            >项目详情</el-button>
            <el-button
              type="text"
              icon="el-icon-star-on"
              @click="getNumVisible = true"
              size="medium"
            >取号</el-button>
            <el-button
              type="text"
              icon="el-icon-s-operation"
              @click="changeNumVisible = true"
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
        <el-form :model="getReportNum">
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
          <el-button type="primary">取 号</el-button>
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
      <el-drawer
        title="分配项目组任务"
        :visible.sync="arrMemberVisible"
        direction="rtl"
        size="55%"
      >
        <div class="arrMemberContainer">
          <el-form>
            <div class="arrMemberTitle">
              <h3>现场勘查及收集资料</h3>
            </div>
            <el-form-item label="时间安排">
              <el-date-picker
                v-model="date1"
                type="daterange"
                range-separator="至"
                start-placeholde="开始日期"
                end-placeholde="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item
              label="责任人"
              label-width="70px"
            >
              <el-input
                placeholder="请输入人员"
                style="width: 200px;"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'workbranch',
  data() {
    return {
      tableData: [
        {
          projId: 101202003001,
          projDe: '正常',
          projDate: '2020-03-09',
          projNum: '房202003001',
          projName: '正佳广场',
          projScope: '广东省广州市天河区',
          projLeader: '吴润波',
          projProgress: '编写报告'
        },
        {
          projId: 102202003001,
          projDe: '紧急',
          projDate: '2020-03-08',
          projNum: '资202003001',
          projName: '螺蛳粉一箱',
          projScope: '广西省柳州市',
          projLeader: '吴润波',
          projProgress: '现勘'
        }
      ],
      typeOptions: [
        { value: '101', label: '房地产' },
        { value: '102', label: '资产' },
        { value: '101', label: '土地' }
      ],
      getReportNum: [],
      getNumVisible: false,
      changeNumVisible: false,
      arrMemberVisible: false,
      reportNumType: 'pa',
      date1: ''
    }
  },
  methods: {
    handleDetail() {
      console.log('跳转到plancheck');

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

.arrMemberContainer {
    margin: 0 10px 0 10px;
}
.arrMemberTitle {
    width: 100%;
    text-align: left;
    margin: 0 0 20px 10px;
    border-left: solid 5px #409eff;
    padding-left: 5px;
}
</style>