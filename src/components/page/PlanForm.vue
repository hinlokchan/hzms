<template>
  <div>
    <div class="container">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-lx-calendar"></i> 项目管理
          </el-breadcrumb-item>
          <el-breadcrumb-item>新增项目计划</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="form-box">
        <div class="form-item-title">
          <h3>项目信息</h3>
        </div>
        <el-form
          ref="form"
          :model="form"
          label-width="125px"
          :rules="rules"
        >
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item
                :span="6"
                label="项目类型"
                prop="projType"
              >
                <el-select
                  @change="getNewProjectNum"
                  v-model="form.projType"
                >
                  <el-option
                    v-for="item in proTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="轮序/安排">
                <el-select
                  v-model="form.arrgType"
                  placeholder="请选择"
                >
                  <el-option
                    label="轮序"
                    value="轮序"
                  ></el-option>
                  <el-option
                    label="安排"
                    value="安排"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="新/重评">
                <el-select
                  v-model="form.region"
                  placeholder="请选择"
                >
                  <el-option
                    label="新项目"
                    value="新项目"
                  ></el-option>
                  <el-option
                    label="重评项目"
                    value="重评项目"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="紧急程度">
                <el-select
                  v-model="form.important"
                  placeholder="请选择"
                >
                  <el-option
                    label="正常"
                    value="正常"
                  ></el-option>
                  <el-option
                    label="紧急"
                    value="紧急"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="项目名称"
                prop="projName"
              >
                <el-input v-model="form.projName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目范围">
                <el-input v-model="form.assemScope"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="评估目的">
                <el-select
                  v-model="form.assemGoal"
                  placeholder="请选择"
                >
                  <el-option
                    label="转让"
                    value="转让"
                  ></el-option>
                  <el-option
                    label="拆迁"
                    value="拆迁"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="编制时间">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.projDate"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="基准日">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.baseTime"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="计划现勘日期">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.baseTime"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="计划完成天数">
                <el-input-number
                  v-model="form.planDay"
                  @change="planDayChange"
                  :min="1"
                  :max="10    "
                  label="完成天数"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="其他补充说明">
                <el-input
                  type="textarea"
                  autosize
                  v-model="form.otherIns"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-divider></el-divider>
            <el-col :span="6">
              <el-form-item label="接洽人">
                <el-input v-model="form.projContact"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="委托方">
                <el-input v-model="form.clientName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="委托方联系人">
                <el-input v-model="form.clientContact"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="委托方联系人电话">
                <el-input v-model="form.clientContactInfo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="现勘联系人">
                <el-input v-model="form.fldSrvyInfo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="现勘联系人电话">
                <el-input v-model="form.fldSrvytInfo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="引荐人">
                <el-input v-model="form.reffer"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="引荐人电话">
                <el-input v-model="form.refferInfo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="权属银行">
                <el-cascader
                  :show-all-levels="false"
                  v-model="form.value"
                  :options="bankOptions"
                  :props="{ expandTrigger: 'hover' }"
                >
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="风险预测">
                <el-select v-model="form.projRisk">
                  <el-option
                    label="低"
                    value="low"
                  ></el-option>
                  <el-option
                    label="中等"
                    value="medium"
                  ></el-option>
                  <el-option
                    label="较高"
                    value="high"
                  ></el-option>
                  <el-option
                    label="高"
                    value="highest"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收费报价">
                <el-input v-model="form.fldSrvytInfo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="商定收费">
                <el-input v-model="form.fldSrvytInfo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col>
              <div class="form-item-title">
                <h3>项目组成员</h3>
              </div>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目负责人">
                <el-input v-model="form.projLeader"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="项目复核人">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="专业复核人">
                <el-input></el-input>
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="项目助理">
                <el-input></el-input>
                <el-input></el-input>
                <el-input></el-input>
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="现场勘查">
                <el-input></el-input>
                <el-input></el-input>
                <el-input></el-input>
                <el-input></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
            >表单提交</el-button>
            <el-button @click="goBack">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { addNewProject, getNewProjectNum, updateProject } from '@/api/index'
export default {
  name: 'planform',
  data() {
    return {
      isEdit: false,
      form: {
        projType: '',
        projName: '',
        projContact: '',
        projDate: '',
        arrgType: '',
        assemScope: '',
        assemGoal: '',
        clientName: '',
        clientContact: '',
        clientContactInfo: '',
        projLeader: '',
        projProRev: '',
        projAsst: '',
        projRisk: '',
        fieldSrvy: '',
        planDay: 1,
        value: []
      },
      bankOptions: [{
        value: 'zhongguoyinhang',
        label: '中国银行',
        children: [{
          value: 'zgyhhz',
          label: '中国银行惠州支行'
        },
        {
          value: 'zgyhgz',
          label: '中国银行广州分行'
        }]
      },
      {
        value: 'jianshenyinhang',
        label: '建设银行',
        children: [{
          value: 'jsyhhz',
          label: '建设银行惠州分行'
        }]
      }],
      rules: {
        projType: [
          { required: true, message: '请选择项目类型', trigger: 'blur' }
        ],
        projName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ]
      },
      proTypeList: [
        {
          label: '房地产',
          value: '101'
        }, {
          label: '资产',
          value: '102'
        }, {
          label: '土地',
          value: '103'
        }, {
          label: '咨询',
          value: '104'
        }, {
          label: 'ppp',
          value: '105'
        }, {
          label: '会计',
          value: '106'
        }, {
          label: '外协',
          value: '107'
        }, {
          label: '政策修订',
          value: '108'
        }, {
          label: '绩效',
          value: '109'
        }, {
          label: '其他',
          value: '110'
        }
      ]
    };
  },
  created() {
    console.log('query:', this.$route.query.data)
    if (this.$route.query.data == undefined) {
      console.log(2)
      this.isEdit = false
    } else {
      console.log(1)
      this.form = this.$route.query.data
      this.isEdit = true
    }
  },
  methods: {
    getNewProjectNum() {
      getNewProjectNum({ projType: this.form.projType }).then(res => {
        console.log('>>>res', res)
        this.form.projId = res.data.projId
        this.form.projNum = res.data.projNum
      }).catch(err => {
        console.log('>>>err', err)
      })
    },
    onSubmit() {
      if (this.isEdit) {
        updateProject(this.form).then(res => {
          console.log('add>>>res', res)
          this.$message.success('提交成功！');
          this.goBack()
        }).catch(err => {
          console.log('add>>>err', err)
        })
      } else {
        addNewProject(this.form).then(res => {
          console.log('add>>>res', res)
          this.$message.success('提交成功！');
          this.goBack()
        }).catch(err => {
          console.log('add>>>err', err)
        })
      }
    },
    goBack() {
      this.$router.push('/plan')
    },
    planDayChange(value) {
      console.log(value)
    }

  }
};
</script>

<style scoped>
.form-item-title {
    width: 100px;
    text-align: center;
    margin: 20px 0 20px 0;
    border-left: solid 5px #409eff;
}
</style>