<template>
  <div class="container">
    <!-- <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-receiving"></i> 我的项目
        </el-breadcrumb-item>
        <el-breadcrumb-item>工作台</el-breadcrumb-item>
        <el-breadcrumb-item>项目工作管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <el-tag>项目状态：已安排人员，已取号，无子项目信息</el-tag>
    <div class="work">
      <div class="work-title">
        <span class="work-title-name">项目信息</span>
        <span class="work-title-button">
          <el-button
            icon="el-icon-info"
            size="medium"
          >查看详情</el-button>
          <el-button
            icon="el-icon-edit"
            size="medium"
          >编辑</el-button>
          <el-button
            icon="el-icon-set-up"
            size="medium"
          >更改项目类型</el-button>
          <el-button
            icon="el-icon-printer"
            size="medium"
          >打印计划信息表</el-button>
        </span>
      </div>
      <el-divider></el-divider>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <div
              slot="header"
              class="card-header"
            >
              基本信息 - 房202004001
            </div>
            <div class="text">
              <div class="item"><span>项目类型：</span>11</div>
              <div class="item"><span>评估目的：</span></div>
              <div class="item"><span>项目名称：</span></div>
              <div class="item"><span>项目范围：</span></div>
              <div class="item"><span>基准日：</span></div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div
              slot="header"
              class="card-header"
            >项目组成员信息</div>
            <div class="text item">
              <div class="item"><span>项目负责人：</span>11</div>
              <div class="item"><span>项目复核人：</span>11</div>
              <div class="item"><span>专业复核人：</span>11</div>
              <div class="item"><span>项目助理：</span>11</div>
              <div class="item"><span>现场勘查：</span>11</div>
            </div>
          </el-card>
        </el-col>
        <el-col
          :span="24"
          style="margin-top: 10px;"
        >
          <el-card>
            <div
              slot="header"
              class="card-header"
            >
              <span>报告号信息</span>
              <span style="float: right">
                <el-button
                  type="primary"
                  size="medium"
                  icon="el-icon-circle-plus-outline"
                >取报告号</el-button>
                <el-button
                  type="danger"
                  size="medium"
                  icon="el-icon-circle-close"
                >取消报告号</el-button>
              </span>
            </div>
            <div>
              <div class="report-num">
                <el-row>
                  <el-col
                    :span="2"
                    class="report-title"
                  >初评号</el-col>
                  <el-col
                    :span="6"
                    class="report-content"
                  >111</el-col>
                  <el-col
                    :span="2"
                    class="report-title"
                  >正评号</el-col>
                  <el-col
                    :span="6"
                    class="report-content"
                  >111</el-col>
                  <el-col
                    :span="2"
                    class="report-title"
                  >回函号</el-col>
                  <el-col
                    :span="6"
                    class="report-content"
                  >111</el-col>
                </el-row>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="work-title">
      <span class="work-title-name">项目安排信息</span>
    </div>
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card>

        </el-card>
      </el-col>
    </el-row>
    <div class="work-title">
      <span class="work-title-name">子项目信息</span>
      <span class="work-title-button">
        <el-button
          icon="el-icon-circle-plus-outline"
          size="medium"
        >新增子项目</el-button>
      </span>
    </div>
    <el-divider></el-divider>
    <el-table :data="tableData" border>
      <el-table-column label="子项目报告号" width="120" prop="a"></el-table-column>
      <el-table-column label="子项目名称"></el-table-column>
      <el-table-column label="子项目范围"></el-table-column>
      <el-table-column label="基准日" width="120"></el-table-column>
      <el-table-column label="操作" width="200">
        <template>
          <el-button type="text">查看</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'workhandle',
  data() {
    return {
      tableData: [
        {
          a: '1'
        }
      ],
      activeTab: 'reportNum',
      assemArrg: true
    }
  }
}
</script>

<style scoped>
.card-header {
  font-size: 20px;
}
.text {
  line-height: 40px;
}
.text span {
  color: #707781;
}
.item {
  border-bottom: solid 1px #ebe8e8;
}
.work {
  width: 100%;
}
.work-title {
  width: 100%;
  text-align: left;
  padding-left: 10px;
  margin: 50px 0 5px 0;
  border-left: solid 5px #409eff;
}
.work-title-name {
  font-size: 24px;
}
.work-title-button {
  float: right;
  padding-right: 25px;
}
.tabs {
  margin-top: 20px;
}
.report-num {
  margin-top: 5px;
}
.report-title {
  text-align: center;
  border: 1px solid #d3d3d3;
  height: 40px;
  line-height: 40px;
  background-color: #cbe5ff;
}
.report-content {
  text-align: center;
  border: 1px solid #d3d3d3;
  height: 40px;
  line-height: 40px;
}
</style>