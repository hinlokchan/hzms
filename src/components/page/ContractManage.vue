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
<!--            <el-table-->
<!--                :data="tableData"-->
<!--                style="width: 100%"-->
<!--                max-height="500">-->
<!--                <el-table-column-->
<!--                    fixed-->
<!--                    prop="contractNum"-->
<!--                    label="合同号"-->
<!--                    width="100">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    fixed-->
<!--                    prop="projNum"-->
<!--                    label="计划编号"-->
<!--                    width="100">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    prop="takenDate"-->
<!--                    label="取号日期"-->
<!--                    width="100">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    prop="projName"-->
<!--                    label="项目名称"-->
<!--                    width="300">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    prop="clientName"-->
<!--                    label="委托人"-->
<!--                    width="120">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    prop="assemGoal"-->
<!--                    label="评估目的"-->
<!--                    width="100">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    prop="projLeader"-->
<!--                    label="项目负责人"-->
<!--                    width="100">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    prop="signingPic"-->
<!--                    label="签约负责人"-->
<!--                    width="100">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    prop="zip"-->
<!--                    label="已签份数"-->
<!--                    width="100">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    prop="recoverDate"-->
<!--                    label="回收日期"-->
<!--                    width="100">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    prop="archivePic"-->
<!--                    label="归档负责人"-->
<!--                    width="100">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                    prop="notes"-->
<!--                    label="备注"-->
<!--                    width="120">-->
<!--                </el-table-column>-->
<!--            </el-table>-->

          <el-table
              :data="tableData"
              style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label=委托人>
                    <span>{{ props.row.clientName }}</span>
                  </el-form-item>
                  <el-form-item label="评估目的">
                    <span>{{ props.row.assemGoal }}</span>
                  </el-form-item>
                  <el-form-item label="项目负责人">
                    <span>{{ props.row.projLeader }}</span>
                  </el-form-item>
                  <el-form-item label="签约负责人">
                    <span>{{ props.row.signingPic }}</span>
                  </el-form-item>
                  <el-form-item label="已签份数">
                    <span>{{ props.row.signedCopiesCount }}</span>
                  </el-form-item>
                  <el-form-item label="回收日期">
                    <span>{{ props.row.recoverDate }}</span>
                  </el-form-item>
                  <el-form-item label="归档经办人">
                    <span>{{ props.row.archiveOperator }}</span>
                  </el-form-item>
                  <el-form-item label="备注">
                    <span>{{ props.row.notes }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
                prop="contractNum"
                label="合同号"
                width="150">
            </el-table-column>
            <el-table-column
                prop="projNum"
                label="计划编号"
                width="150">
            </el-table-column>
            <el-table-column
                prop="takenDate"
                label="取号日期"
                width="150">
            </el-table-column>
            <el-table-column
                prop="projName"
                label="项目名称"
                width="800">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
<!--                <el-button-->
<!--                    size="mini"-->
<!--                    type="danger"-->
<!--                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
              </template>
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
            tableData:[],
            dialogFormVisible:false,
            editForm:{
              contractNum: '',
              signingPic: '',
              signedCopiesCount: '',
              recoverDate: '',
              archiveOperator: '',
              notes: '',
              signingDate: ''
            }
        };
    },
    methods:{
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
              this.getData()
            }
        ).catch(err => {
          this.$message.error('编辑失败')
        })
        ;
      },
      getData() {
        getContractList().then(
            res => {
              for (let i = 0; i < res.data.length; i++) {
                res.data[i].clientName = res.data[i].clientTypeName + '-' + res.data[i].clientName
              }
              this.tableData = res.data
              console.log("what the fuck")
              console.log(res.data)
            }
        );
      },
      test() {
        console.log(this.editForm.signingDate)
      }
    },
    created() {
        this.getData()
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
</style>