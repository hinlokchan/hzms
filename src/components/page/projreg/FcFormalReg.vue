<template>
  <div class="container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>房地产正评登记</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="form-header">
      <h3>计划编号：房202001001</h3>
      <h3>项目名称：保利花园A1栋808房</h3>
    </div>
    <div class="form-body">
      <el-tabs v-model="activeTab">
        <el-tab-pane
          label="计划信息"
          name="planInfo"
        >
          <el-form :v-model="form1">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="计划编号">
                  <el-input :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="项目类型">
                  <el-input :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="价值时点">
                  <el-input :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同号">
                  <el-input :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="估价项目">
                  <el-input :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="估价对象详细地址">
                  <el-input :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="估价委托人（产权持有人）">
                  <el-input :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="委托人">
                  <el-input :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="委托人联系人">
                  <el-input :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="委托人联系人电话">
                  <el-input :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="项目信息"
          name="projInfo"
        >
          <el-form :model="form2">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="初评号">
                  <el-input :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="正评号">
                  <el-input :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="估价目的">
                  <el-select v-model="form2.assemGoal" style="width: 100%">
                    <el-option
                      v-for="item in assemGoalOption"
                      :key="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="价值类型">
                  <el-select v-model="form2.priceType" style="width: 100%">
                    <el-option
                      v-for="item in priceTypeOption"
                      :key="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="本报告的估价对象个数">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="估价对象所在行政区">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="估价对象所在城市">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="估价对象所在小区">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="项目完成时间">
                  <el-date-picker style="width: 100%"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="估价方法">
                  <el-input :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="估价方法说明">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="估价对象土地面积（平方米）">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="土地评估单价（元/平方米）">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="估价对象建筑面积（平方米）">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="建筑评估单价（元/平方米）">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="房地产估价机构">
                  <el-input :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="房屋信息"
          name="houseInfo"
        >
          <el-form :model="form3">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="房屋用途">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="房屋类型">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="房屋性质">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="户型结构">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="户型">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="向">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="所在楼">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="装修年限">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="剩余年限">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="人员信息"
          name="memberInfo"
        >
          <el-form :model="form4">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="接洽人">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="项目负责人">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="专业复核人">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="现勘">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="资料收集及验证">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="市场询价调查">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="技术说明">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="报告拟稿">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="收费跟进">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-button type="primary">提交</el-button>
        <el-button>取消</el-button>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getDetailProjInfo, getWorkAssignment, } from '@/api/index'
export default {
  name: 'fcformalreg',
  data() {
    return {
      activeTab: 'projInfo',
      //计划信息
      form1: {},
      //项目信息
      form2: {
        assemGoal: '',
        priceType: ''
      },
      //房屋信息
      form3: {},
      //人员信息
      form4: {},
      //select option
      assemGoalOption: ['房地产转让价格评估', '房地产分割、合并评估', '房地产纠纷估价', '房地产保险估价', '土地使用权出让价格评估', '房地产拍卖底价评估', '房地产抵押价值评估', '房地产课税估价', '房地产租赁价格评估', '企业各种经济活动中涉及的房地产估价', '其他目的的房地产估价'],
      priceTypeOption: ['成交价格', '正常价格', '市场价格', '评估价值', '市场价值', '投资价值', '现状价值', '快速变现价值', '残余价值', '抵押价值', '抵押净值', '法定优先受偿款', '计税价值', '保险价值', '完全产权价值', '无租约限制价值', '出租人权益价值', '承租人权益价值', '建筑物价值', '土地价值', '楼面地价'],
      housePurposeOption: ['住宅', '宗教', '园林绿化', '工业、交通、仓储', '别墅', '涉外', '医疗卫生', '文化、娱乐、体育', '公共运输', '新闻', '娱乐', '监狱', '集体宿舍', '成套住宅', '商业服务', '旅游', '军事', '体育', '物管用房', '铁路', '非成套住宅', '工业', '文化', '仓储', '电讯信息', '教育', '教育、医疗、卫生、可研', '民航', '高档公寓', '科研', '公共设施', '商业、金融、信息', '航运', '金融保险', '其他', '办公', '经营']
    }
  },
  methods: {

  }
}
</script>

<style>
</style>