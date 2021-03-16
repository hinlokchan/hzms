<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-folder"></i> 云现勘
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table
        :data="tableData"
        @expand-change="expandChange"
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        @row-dblclick="rowClick"
        :row-class-name="tableRowClassName"
        ref="refTable"
        style="width: 100%;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form
              label-position="left" inline class="demo-table-expand"
          >
            <el-table :data="evalObj"
                      v-loading="loading"
                      style=" width: 50%; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
            >
              <el-table-column
                  label="估价对象ID"
                  prop="evalObjId">
              </el-table-column>
              <el-table-column
                  label="估价对象名称"
                  prop="evalObjName">
              </el-table-column>
            </el-table>
          </el-form>
          <el-button type="primary" style="float: right" @click="handleDelivery(props.row)">派发计划</el-button>
        </template>
      </el-table-column>
      <el-table-column
          label="计划编号"
          prop="projNum">
      </el-table-column>
      <el-table-column
          label="项目名称"
          prop="projName">
      </el-table-column>
      <el-table-column
          label="项目范围"
          prop="projScope">
      </el-table-column>
<!--      <el-table-column-->
<!--              label="操作"-->
<!--              prop="">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button type="text" @click="handleDelivery(scope.row)">派发计划</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
    <el-dialog
            :visible.sync="dialogVisible"
        @closed="closed"
        :title="'派发计划：'+this.deliveryInfo.projNum"
            width="30%">
      <div>
        <span><b>计划现勘人员：</b>{{this.planedFieldSrvy}}</span><br><br>
        <b>选择现勘人员  </b><el-button type="text" @click="handleClear">清空</el-button>
<!--        <el-checkbox-group v-model="selectedFieldSurveyList">-->
<!--          <el-checkbox-button v-for="staff in fieldSurveyStaffList"-->
<!--                              :label="staff.staffName" :key="staff.staffId">{{staff.staffId}}#{{staff.staffName}}</el-checkbox-button>-->
<!--        </el-checkbox-group>-->
        <el-checkbox-group
            v-model="selectedFieldSurveyList">
          <el-checkbox v-for="staff in fieldSurveyStaffList"
                       :label="staff.staffName" :key="staff.staffId">{{staff.staffName}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitDelivery" :disabled="selectedFieldSurveyList.length === 0">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-table .success-row {
  background: #ecffe0;
}
</style>

<script>
  import { getEvalObjListByProjId, getUserList } from '@/api';
  import { getProjList4CFS, deliverProj, getSurveyList } from '@/api/cfs';

export default {
  data() {
    return {
      getRowKeys(row) {
        return row.projId
      },
      loading : false,
      tableData: [],
      expands: [],
      evalObj: [],
      staffList: [],
      fieldSurveyStaffList:[],
      planedFieldSrvy:'',
      dialogVisible: false,
      selectedFieldSurveyList:[],
      surveyList:[],
      deliveryInfo: {
        projId: '',
        projNum: '',
        fieldSrvy: ''
      }
    };
  },
  created() {
    getProjList4CFS().then(
        res => {
          this.tableData = res.data
        }
    );
    getUserList().then(
            res => {
              this.staffList = res.data
              this.sortStaffList()
            }
    );
    getSurveyList().then(
        res => {
          console.log(res.data)
          this.surveyList = res.data;
        }
    ).catch(err => {
      console.log(err)
      this.$message.error("获取已派发列表失败")
    });
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      let list = this.surveyList
      for (let i = 0; i < list.length; i++) {
        if (row.projId == list[i].projid) {
          return 'success-row';
        }
      }
    },
    sortStaffList() {
      // for (let i = 0; i < list.length; i++) {
      //   if (list[i].isFieldSurvey === 1) {
      //     this.fieldSurveyStaffLis.push(list[i]);
      //     this.staffList.remove()
      //   }
      // }

      console.log('called')

      let list = this.staffList
      let fsList = []

      list.forEach(function(item, index) {
        if (item.isFieldSurvey === 1) {
          fsList.push(item)
        }
      });

      this.fieldSurveyStaffList = fsList

    },
    expandChange(row,expandedRows) {
      console.log(row.projId)
      var that = this
      if (expandedRows.length) {
        that.expands = []
        if (row) {
          that.expands.push(row.projId)// 每次push进去的是每行的ID
        }
      } else {
        that.expands = []// 默认不展开
        this.evalObj = []
        return
      }

      this.loading = true

      getEvalObjListByProjId(row.projId).then(
          res => {
            console.log(res.data);
            this.evalObj = res.data
            this.loading = false;
          }
      ).catch(
          err => {
            console.log(err)
            this.$alert("获取估价对象失败")
          }
      );

    },
    rowClick(row,index) {
      this.$refs.refTable.toggleRowExpansion(row)
      console.log(row.index)
    },
    submitDelivery() {
      console.log(this.selectedFieldSurveyList)
      let fsList = this.selectedFieldSurveyList
      var fsStr = ''
      console.log(fsList.length)
      fsList.forEach(
              item => {
                fsStr += item;
                if (fsList.indexOf(item) !== fsList.length - 1) {
                  fsStr += ',';
                }
              }
      );
      this.deliveryInfo.fieldSrvy = fsStr

      deliverProj(this.deliveryInfo).then(
              res => {
                console.log(res);
                this.$message.success('派发成功');
                this.dialogVisible = false;
              }
      ).catch(
              err => {
                console.log(err);
                this.$message.error('派发失败');
              }
      );

    },
    handleDelivery(row) {
      this.deliveryInfo.projId = row.projId
      this.deliveryInfo.projNum = row.projNum
      this.planedFieldSrvy = row.fieldSrvy
      this.dialogVisible = true
    },
    closed() {
      this.handleClear()
    },
    handleClear(){
      this.selectedFieldSurveyList = []
    }
  }
}
</script>