<template>
    <div>
        <div class="container">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                        <i class="el-icon-folder"></i> 合同管理
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
          <el-input placeholder="合同号搜索" v-model="searchContent" @change="getData" size="small" style="margin-bottom: 20px ; width: 30% ;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
            <el-button slot="append" type="primary" icon="el-icon-search" @click="getData" ></el-button>
          </el-input>
          <el-table
              :data="tableData"
              :row-class-name="tableRowClassName"
              ref="table"
              @row-click="rowClick"
              style="width: 100%;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="评估目的">
                    <span>{{ props.row.assemGoal }}</span>
                  </el-form-item>
                  <el-form-item label="项目负责人">
                    <span>{{ props.row.projLeader }}</span>
                  </el-form-item>
                  <el-form-item label="项目助理">
                    <span>{{ props.row.projAsst }}</span>
                  </el-form-item>
                  <el-divider></el-divider>
                  <el-form-item label="签约负责人">
                    <span>{{ props.row.signingPic }}</span>
                  </el-form-item>
                  <el-form-item label="归档经办人">
                    <span>{{ props.row.archiveOperator }}</span>
                  </el-form-item>
                  <el-form-item label="取号日期">
                    <span>{{ props.row.takenDate }}</span>
                  </el-form-item>
                  <el-form-item label="回收日期">
                    <span>{{ props.row.recoverDate }}</span>
                  </el-form-item>
                  <el-form-item label="签约日期">
                    <span>{{ props.row.signingDate }}</span>
                  </el-form-item>
                  <el-form-item label="已签份数">
                    <span>{{ props.row.signedCopiesCount }}</span>
                  </el-form-item>
                  <el-form-item label="备注">
                    <span>{{ props.row.notes }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80" align="center">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <!--                <el-button-->
                <!--                    size="mini"-->
                <!--                    type="danger"-->
                <!--                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
              </template>
            </el-table-column>
            <el-table-column
                prop="contractNum"
                label="公司合同号"
                align="center"
                width="90">
            </el-table-column>
            <el-table-column
                prop="projNum"
                label="计划编号"
                align="center"
                width="100">
            </el-table-column>
            <el-table-column
                prop="reportNum"
                label="报告号"
                align="center"
                width="110">
            </el-table-column>
            <el-table-column
                prop="projName"
                label="项目名称"
                width="">
            </el-table-column>
            <el-table-column
                prop="clientName"
                label="委托人"
                width="150">
            </el-table-column>
            <el-table-column
                prop="externalContractNum"
                label="外部合同号"
                width="150">
            </el-table-column>
          </el-table>

          <el-dialog :title="'合同'+editForm.contractNum+'信息编辑'" :visible.sync="dialogFormVisible">
            <el-form :model="editForm" label-width="100px">
              <el-form-item label="签约日期">
                <el-date-picker
                    v-model="editForm.signingDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="签约负责人">
                <el-input v-model="editForm.signingPic" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="已签份数">
                <el-input-number v-model="editForm.signedCopiesCount" @change="" :min="1" :max="100" label=""></el-input-number>
              </el-form-item>
              <el-form-item label="回收日期">
                <el-date-picker
                    v-model="editForm.recoverDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="归档经办人">
                <el-input v-model="editForm.archiveOperator" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="editForm.notes" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary" @click="submitEdit">修改</el-button>
            </div>
          </el-dialog>
        </div>
    </div>
</template>

<script>
import {getContractList,updateContractInfo} from '@/api';

export default {
    data() {
      return {
        tableData: [],
        dialogFormVisible: false,
        editForm: {
          contractNum: '',
          signingPic: '',
          signedCopiesCount: '',
          recoverDate: '',
          archiveOperator: '',
          notes: '',
          signingDate: ''
        },
        searchContent: '',
        filterRecover: true
      };
    },
    methods:{
      tableRowClassName({row, rowIndex}) {
        if (row.recoverDate != '' && row.recoverDate != null) {
          return 'success-row';
        }
        return 'normal-row';
      },
      handleEdit(index, row) {
        this.dialogFormVisible = true;
        this.editForm.contractNum = row.contractNum;
        this.editForm.signingPic = row.signingPic;
        this.editForm.signedCopiesCount = row.signedCopiesCount;
        this.editForm.recoverDate = this.formatDate(row.recoverDate);
        this.editForm.archiveOperator = row.archiveOperator;
        this.editForm.notes = row.notes;
        this.editForm.signingDate = this.formatDate(row.signingDate);
        console.log(this.editForm);
      },
      formatDate(date){
        if (date == null || date === '') {
          return '';
        }
        return this.$moment(date).format('YYYY-MM-DD')
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      submitEdit(){
        updateContractInfo(this.editForm).then(
            res => {
              this.$message.success('编辑成功');
              this.dialogFormVisible = false;
              this.getData();
            }
        ).catch(
            err => {
              this.$message.error('编辑失败');
            })
        ;
      },
      getData() {
        getContractList({ contractNum: this.searchContent}).then(
            res => {
              for (let i = 0; i < res.data.length; i++) {
                res.data[i].clientName = res.data[i].clientTypeName + '-' + res.data[i].clientName
              }
              this.tableData = res.data
            }
        );
      },
      rowClick(row,index) {
        this.$refs.table.toggleRowExpansion(row)
      },
    },
  created() {
    this.getData();
  }

}
</script>

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
.el-form-item{
  width: 500px;
}

.el-table .normal-row {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

.el-table .success-row {
  background: #ecffe0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>