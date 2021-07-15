<template>
  <div class="container">
    <el-page-header @back="goBack" content=""></el-page-header>
    <!--
                  /\    \                  /\    \                  /\    \                  /\    \
                  /::\____\                /::\    \                /::\    \                /::\____\
                /::::|   |               /::::\    \               \:::\    \              /::::|   |
                /:::::|   |              /::::::\    \               \:::\    \            /:::::|   |
              /::::::|   |             /:::/\:::\    \               \:::\    \          /::::::|   |
              /:::/|::|   |            /:::/__\:::\    \               \:::\    \        /:::/|::|   |
            /:::/ |::|   |           /::::\   \:::\    \              /::::\    \      /:::/ |::|   |
            /:::/  |::|___|______    /::::::\   \:::\    \    ____    /::::::\    \    /:::/  |::|   | _____
          /:::/   |::::::::\    \  /:::/\:::\   \:::\    \  /\   \  /:::/\:::\    \  /:::/   |::|   |/\    \
          /:::/    |:::::::::\____\/:::/  \:::\   \:::\____\/::\   \/:::/  \:::\____\/:: /    |::|   /::\____\
          \::/    / ~~~~~/:::/    /\::/    \:::\  /:::/    /\:::\  /:::/    \::/    /\::/    /|::|  /:::/    /
          \/____/      /:::/    /  \/____/ \:::\/:::/    /  \:::\/:::/    / \/____/  \/____/ |::| /:::/    /
                      /:::/    /            \::::::/    /    \::::::/    /                   |::|/:::/    /
                      /:::/    /              \::::/    /      \::::/____/                    |::::::/    /
                    /:::/    /               /:::/    /        \:::\    \                    |:::::/    /
                    /:::/    /               /:::/    /          \:::\    \                   |::::/    /
                  /:::/    /               /:::/    /            \:::\    \                  /:::/    /
                  /:::/    /               /:::/    /              \:::\____\                /:::/    /
                  \::/    /                \::/    /                \::/    /                \::/    /
                  \/____/                  \/____/                  \/____/                  \/____/

    -->
    <div class="work">
      <div class="work-title">
        <span class="work-title-name">查看案例详情</span>
<!--        <span class="work-title-button">-->
<!--          <el-button-->
<!--              icon="el-icon-info"-->
<!--              size="medium"-->
<!--              @click="handleDetail()"-->
<!--          >查看详情</el-button>-->
<!--        </span>-->
      </div>
      <el-divider></el-divider>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-card>
            <div
                slot="header"
                class="card-header"
            >
              基本信息
              <span v-if="caseDetail.projDegree == 1002">
                <el-tag
                    type="danger"
                    size="medium"
                >紧急项目</el-tag>
              </span>
              <span
                  v-for="item in risk"
                  :key="'info1'+item.value"
              >
                <span
                    v-if="caseDetail.riskProfile == item.value"
                    style="margin-left: 10px;"
                >
                  <el-tag
                      :type="item.tag"
                      size="medium"
                  >{{item.label}}风险</el-tag>
                </span>

              </span>
              <span
                  v-for="item in arrgType"
                  :key="'info2'+item.value"
              >
                <span
                    v-if="caseDetail.arrgType == item.value"
                    style="margin-left: 10px;"
                >
                  <el-tag
                      type="primary"
                      size="medium"
                  >{{item.label}}</el-tag>
                </span>
              </span>
              <span
                  v-for="item in newOldType"
                  :key="'info3'+item.value"
              >
                <span
                    v-if="caseDetail.newOldType == item.value"
                    style="margin-left: 10px;"
                >
                  <el-tag
                      :type="item.tag"
                      size="medium"
                  >{{item.label}}</el-tag>
                </span>
              </span>
            </div>
            <div class="text">
              <div class="item"><span>计划编号：</span>{{this.caseDetail.projNum}}</div>
              <div class="item"><span>项目名称：</span>{{this.caseDetail.projName}}</div>
              <div class="item"><span>项目范围：</span>{{this.caseDetail.projScope}}</div>
<!--              <div class="item"><span>项目类型：</span>{{this.transedProjType.projType}}</div>-->
              <div class="item"><span>评估目的：</span>{{this.caseDetail.assemGoal}}</div>
              <div class="item"><span>基准日：</span>{{this.caseDetail.baseDate}}</div>

            </div>
          </el-card>
          <el-card style="margin-top: 10px">
            <div
                slot="header"
                class="card-header"
            >案例项目组成员信息</div>
            <div class="text item">
              <div class="item"><span>项目负责人：</span>{{this.caseDetail.projLeader}}</div>
              <div class="item"><span>项目复核人：</span>{{this.caseDetail.projReviewer}}</div>
              <div class="item"><span>专业复核人：</span>{{this.caseDetail.projProReviewer}}</div>
              <div class="item"><span>项目助理：</span>{{this.caseDetail.projAsst}}</div>
              <div class="item"><span>现场勘查：</span>{{this.caseDetail.fieldSrvy}}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="7">
          <el-card>
            <div
                slot="header"
                class="card-header"
            >案例信息</div>
            <div class="text item">
              <div class="item" v-if="this.caseDetail.unitType !== undefined"><span>房屋类型：</span>{{ this.caseDetail.unitType }}</div>
              <div class="item" v-if="this.caseDetail.unitUsage !== undefined"><span>房屋用途：</span>{{ this.caseDetail.unitUsage }}</div>
              <div class="item" v-if="this.caseDetail.unitProperty !== undefined"><span>房屋性质：</span>{{ this.caseDetail.unitProperty }}</div>
              <div class="item" v-if="this.caseDetail.houseType !== undefined"><span>户型：</span>{{ this.caseDetail.houseType }}</div>
              <div class="item" v-if="this.caseDetail.houseTypeStructure !== undefined"><span>户型结构：</span>{{ this.caseDetail.houseTypeStructure }}</div>
              <div class="item" v-if="this.caseDetail.towards !== undefined"><span>朝向：</span>{{ this.caseDetail.towards }}</div>
              <div class="item" v-if="this.caseDetail.buildingNum !== undefined"><span>所在楼栋：</span>{{ this.caseDetail.buildingNum }}</div>
              <div class="item" v-if="this.caseDetail.decoDegree !== undefined"><span>装修程度：</span>{{ this.caseDetail.decoDegree }}</div>
              <div class="item" v-if="this.caseDetail.remainTerm !== undefined"><span>剩余年限：</span>{{ this.caseDetail.remainTerm }}</div>
              <div class="item" v-if="this.caseDetail.valueType !== undefined"><span>价值类型：</span>{{ this.caseDetail.valueType }}</div>
<!--              <div class="item" v-if="this.caseDetail.evalObjCount !== undefined"><span>估价对象数量</span>{{ this.caseDetail.evalObjCount }}</div>-->
              <div class="item" v-if="this.caseDetail.evalObjCity !== undefined"><span>估价对象所在城市：</span>{{ this.caseDetail.evalObjCity }}</div>
              <div class="item" v-if="this.caseDetail.evalObjAdminRegion !== undefined"><span>估价对象所在行政区：</span>{{ this.caseDetail.evalObjAdminRegion }}</div>
              <div class="item" v-if="this.caseDetail.evalObjCommunity !== undefined"><span>估价对象所在小区：</span>{{ this.caseDetail.evalObjCommunity }}</div>
              <div class="item" v-if="this.caseDetail.evalMethod !== undefined"><span>估价方法：</span>{{ this.caseDetail.evalMethod }}</div>
              <div class="item" v-if="this.caseDetail.evalMethodExp !== undefined"><span>估价方法说明：</span>{{ this.caseDetail.evalMethodExp }}</div>
              <div class="item" v-if="this.caseDetail.valueType !== undefined "><span>价值类型：</span>{{ this.caseDetail.valueType }}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="10">
          <el-card>
            <div
                slot="header"
                class="card-header"
            >案例价值信息</div>
            <div class="text item">
              <div class="item" v-if="this.caseDetail.evalObjAcreage !== undefined"><span>估价对象土地面积：</span>{{ this.caseDetail.evalObjAcreage }}&nbsp;㎡</div>
              <div class="item" v-if="this.caseDetail.evalObjArea !== undefined"><span>估价对象建筑面积：</span>{{ this.caseDetail.evalObjArea }}&nbsp;㎡</div>
              <div class="item" v-if="this.caseDetail.projTotalAcreage !== undefined"><span>项目总土地面积：</span>{{ this.caseDetail.projTotalAcreage }}&nbsp;㎡</div>
              <div class="item" v-if="this.caseDetail.projTotalArea !== undefined"><span>项目总建筑面积：</span>{{ this.caseDetail.projTotalArea }}&nbsp;㎡</div>
              <div class="item" v-if="this.caseDetail.projTotalValue !== undefined"><span>项目总价值：</span>{{ this.caseDetail.projTotalValue }}&nbsp;万元</div>
              <div class="item" v-if="this.caseDetail.landTotalValue !== undefined"><span>土地总价值：</span>{{ this.caseDetail.landTotalValue }}&nbsp;万元</div>
              <div class="item" v-if="this.caseDetail.buildingTotalValue !== undefined"><span>建筑总价值：</span>{{ this.caseDetail.buildingTotalValue }}&nbsp;万元</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
//api
import { getDocumentById } from '@/api/hzirdb'

export default {
  name: 'workhandle',
  inject: ['reload'],            //注入App里的reload方法
  data() {
    return {
      caseId: '',
      caseDetail: {}
    }
  },
  created() {
    this.caseId = this.$route.query.data
    this.getDocument()
    console.log(this.caseId)
    console.log(this.caseDetail)
  },
  // ███╗   ███╗███████╗████████╗██╗  ██╗ ██████╗ ██████╗ ███████╗
  // ████╗ ████║██╔════╝╚══██╔══╝██║  ██║██╔═══██╗██╔══██╗██╔════╝
  // ██╔████╔██║█████╗     ██║   ███████║██║   ██║██║  ██║███████╗
  // ██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║   ██║██║  ██║╚════██║
  // ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║╚██████╔╝██████╔╝███████║
  // ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
  methods: {
    getDocument() {
      getDocumentById({
        caseId: this.caseId,
        index: 'cases'
      }).then(
          res => {
            this.caseDetail = res.data
          }
      );
    },
    goBack() {
      this.$router.back()
    }
  },
}
</script>

<style scoped>
.card-header {
  font-size: 20px;
}
.el-tag--medium {
  font-size: 16px;
  height: 30px;
  line-height: 30px;
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
  margin: 30px 0 5px 0;
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
  height: 40px;
  line-height: 40px;
  color: #555555;
}
.report-content {
  text-align: center;
  height: 40px;
  line-height: 40px;
  color: #2f2f2f;
}
.workname-left {
  height: 30px;
  margin-top: 15px;
  line-height: 30px;
}
</style>