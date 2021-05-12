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
          <el-input placeholder="合同号" v-model="searchContent.contractNum" @change="getData" size="small" style="margin-bottom: 20px ; width: 10% ;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-input>
          <el-input placeholder="项目名称" v-model="searchContent.projName" @change="getData" size="small" style="margin-left: 1px;margin-bottom: 20px ; width: 30% ;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="getData" style="margin-left: 5px" >查找</el-button>
          <el-table
              :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
              :row-class-name="tableRowClassName"
              ref="table"
              :height="windowHeight"
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
                    type="text"
                    size="mini"
                    @click.stop="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit-outline"></i>编辑</el-button>
                <br>
                <el-button
                    type="text"
                    size="mini"
                    @click.stop="checkDetail(scope.row)"><i class="el-icon-document"></i>查看</el-button>
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
                align="center"
                width="150">
              <template slot-scope="scope">
                <el-button
                    type="text"
                    size="mini"
                    @click.stop="openContractNumDialog(scope.row)">
                  {{ scope.row.externalContractNum}}<i class="el-icon-edit"></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
              hide-on-single-page
              background
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="pageSize"
              layout="total, prev, pager, next"
              :total="totalCount"
              style="margin: 10px"
          >
          </el-pagination>

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
          <el-dialog
              title="修改外部合同号"
              :visible.sync="contractNumDialogVisible"
              width="30%"
          >
            <el-input
                type="text"
                placeholder="请输入外部合同号（定点采购、中介超市摇珠等）"
                v-model.trim="preExternalContractNum"
            ></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="contractNumDialogVisible = false">取消</el-button>
              <el-button type="primary" @click="setExternalContractNum">保存</el-button>
            </span>
          </el-dialog>
        </div>
    </div>
</template>

<script>
import { getContractList, updateContractInfo, updateExternalContractNum } from '@/api';

export default {
  inject: ['reload'],            //注入App里的reload方法
  data() {
    return {
      windowHeight: document.documentElement.clientHeight*3/5,
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
      searchContent: {
        contractNum: '',
        projName: ''
      },
      filterRecover: true,
      preExternalContractNum: '',
      contractNumDialogVisible: false,
      activeRowData: undefined,
      currentPage: 1,
      totalCount: 0,
      pageSize: 20
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
    },
    tableRowClassName({ row, rowIndex }) {
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
    formatDate(date) {
      if (date == null || date === '') {
        return '';
      }
      return this.$moment(date).format('YYYY-MM-DD');
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    submitEdit() {
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
      getContractList(this.searchContent).then(
          res => {
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].clientName = res.data[i].clientTypeName + '-' + res.data[i].clientName;
            }
            this.tableData = res.data;
            this.totalCount = res.data.length;
          }
      );
    },
    rowClick(row) {
      this.$refs.table.toggleRowExpansion(row);
    },

    setExternalContractNum() {

      if (this.preExternalContractNum === '') {
        this.$message.error('外部合同号不能为空');
        return;
      } else if (this.externalContractNumValidator(this.preExternalContractNum)) {
        this.$message.error('不能包含中文');
        return;
      } else if (this.preExternalContractNum === this.externalContractNum) {
        this.$message.warning('请修改后再提交');
        return;
      }

      updateExternalContractNum({
        projId: this.activeRowData.projId,
        externalContractNum: this.preExternalContractNum
      }).then(
          res => {
            this.$message.success('修改成功');
            this.reload();
          }
      ).catch(err => {
        console.log(err);
        this.$message.error('修改失败');
        this.preExternalContractNum = '';
      });

    },

    openContractNumDialog(row) {
      this.activeRowData = row;
      this.preExternalContractNum = row.externalContractNum;
      this.contractNumDialogVisible = true;
    },
    externalContractNumValidator(str) {
      var reg = /^[\u4e00-\u9fa5]+$/;
      return str.match(reg);
    },
    checkDetail(row) {
      this.$router.push({ path: '/projcheck', query: { data: row.projId } })
    }
  },
  created() {
    this.getData();
  }

};
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