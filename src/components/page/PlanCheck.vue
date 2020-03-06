<template>
  <div>
    <div class="container">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-lx-calendar"></i> 项目管理
          </el-breadcrumb-item>
          <el-breadcrumb-item>查看项目详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="form-box">
        <div class="form-item-title">
          <h3>项目信息</h3>
        </div>
        <div class="project">
          <el-row>
            <el-col :span="2">
              <div class="projTitle">计划编号</div>
            </el-col>
            <el-col :span="6">
              <div class="projContent">房202003001</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">初评号</div>
            </el-col>
            <el-col :span="6">
              <div class="projContent">[2020]F03001</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">正评号</div>
            </el-col>
            <el-col :span="6">
              <div class="projContent">[2020]FG03001</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">项目类型</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">房地产</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">安排/轮序</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">安排项目</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">新/重评项目</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">新项目</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">紧急程度</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">正常</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">项目名称</div>
            </el-col>
            <el-col :span="10">
              <div class="projContent">东湖花园九区</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">项目范围</div>
            </el-col>
            <el-col :span="10">
              <div class="projContent">惠州东平</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">评估目的</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">抵押</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">编制时间</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">2020-03-05</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">基准日</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">2020-03-05</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">计划现勘日期</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">2020-03-05</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">委托方</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">齐静豪</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">权属银行</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">招商银行</div>
            </el-col>
            <el-col :span="4">
              <div class="projTitle">委托方联系人及联系方式</div>
            </el-col>
            <el-col :span="8">
              <div class="projContent">齐静豪 13309098080</div>
            </el-col>
            <el-col :span="4">
              <div class="projTitle">引荐人及联系方式</div>
            </el-col>
            <el-col :span="8">
              <div class="projContent">齐静豪 13309098080</div>
            </el-col>
            <el-col :span="4">
              <div class="projTitle">现勘联系人及联系方式</div>
            </el-col>
            <el-col :span="8">
              <div class="projContent">齐静豪 13309098080</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">接洽人</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">李家乐</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">风险预测</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">中等</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">报价</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">1000</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">收费</div>
            </el-col>
            <el-col :span="4">
              <div class="projContent">3000</div>
            </el-col>
          </el-row>
          <el-row>
            <div class="form-item-title">
              <h3>项目进度</h3>
            </div>
            <el-col :span="12">
              <span>当前状态</span>
              <el-tag type="warning" size="medium">滞后</el-tag>
            </el-col>
            <el-col :span="18">
              <el-steps
                :active="2"
                simple
              >
                <el-step
                  title="计划"
                  icon="el-icon-s-order"
                ></el-step>
                <el-step
                  title="现勘"
                  icon="el-icon-place"
                ></el-step>
                <el-step
                  title="撰写报告"
                  icon="el-icon-edit"
                ></el-step>
                <el-step
                  title="收费、送达"
                  icon="el-icon-s-custom"
                ></el-step>
                <el-step
                  title="归档"
                  icon="el-icon-check"
                ></el-step>
              </el-steps>
            </el-col>
          </el-row>
          <el-row>
            <div class="form-item-title">
              <h3>项目组成员</h3>
            </div>
            <el-col :span="2">
              <div class="projTitle">项目负责人</div>
            </el-col>
            <el-col :span="10">
              <div class="projContent">张小龙</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">项目复核人</div>
            </el-col>
            <el-col :span="10">
              <div class="projContent">张小龙 陈俊雄</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">专业复核人</div>
            </el-col>
            <el-col :span="10">
              <div class="projContent">张小龙 陈俊雄</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">项目助理</div>
            </el-col>
            <el-col :span="10">
              <div class="projContent">张小龙 陈俊雄</div>
            </el-col>
            <el-col :span="2">
              <div class="projTitle">现场勘查</div>
            </el-col>
            <el-col :span="10">
              <div class="projContent">张小龙 陈俊雄</div>
            </el-col>
          </el-row>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getAllProject } from '@/api/index'
export default {
  name: 'plancheck',
  data() {
    return {

    }
  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped>
.project {
    width: 100%;
    height: inherit;
}
.projTitle {
    background-color: #cbe5ff;
    text-align: center;
    height: 50px;
    line-height: 50px;
    border: 1px solid #d3d3d3;
}
.projContent {
    text-align: center;
    height: 50px;
    line-height: 50px;
    border: 1px solid #d3d3d3;
}
.form-item-title {
    width: 100px;
    text-align: center;
    margin: 20px 0 20px 0;
    border-left: solid 5px #409eff;
}
</style>