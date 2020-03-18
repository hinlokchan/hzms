<template>
  <div>
    <div class="container">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <span>项目管理</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="handle-box">
        <el-row :gutter="20">
          <el-col :span="3">
            <el-button
              type="primary"
              icon="el-icon-plus"
              class="handle-add mr10"
              size="medium"
              @click="handleAdd"
            >新增项目计划</el-button>
          </el-col>
          <!-- <el-col :span="2.5">
            <el-select
              v-model="searchData.searchType"
              placeholder="项目类型"
              class="handle-select mr10"
              size="medium"
            >
              <el-option
                v-for="item in proTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col> -->
          <el-col :span="2.5">
            <el-input
              v-model="searchData.reportNum"
              placeholder="初、正评号"
              size="medium"
            ></el-input>
          </el-col>
          <el-col :span="2.5">
            <el-input
              v-model="searchData.projName"
              placeholder="项目名称"
              size="medium"
            ></el-input>
          </el-col>
          <el-col :span="2.5">
            <el-input
              v-model="searchData.projScope"
              placeholder="项目范围"
              size="medium"
            ></el-input>
          </el-col>
          <el-col :span="2.5">
            <el-input
              v-model="searchData.clientName"
              placeholder="委托方"
              size="medium"
            ></el-input>
          </el-col>
          <el-col :span="2.5">
            <el-input
              v-model="searchData.projMember"
              placeholder="项目成员"
              size="medium"
            ></el-input>
          </el-col>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearch"
            size="medium"
          >搜 索</el-button>
        </el-row>
      </div>
      <!-- table -->
      <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        stripe
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form
              label-position="left"
              inline
              class="demo-table-expand"
            >
              <el-form-item label="项目类型">
                <div v-for="item in proTypeList" :key="item.value">
                  <span v-if="item.value == props.row.projType">{{ item.label }}</span>
                </div>
              </el-form-item>
              <el-form-item label="项目负责人">
                <span>{{ props.row.projLeader }}</span>
              </el-form-item>
              <el-form-item label="项目复核人">
                <span>{{ props.row.projReviewer }}</span>
              </el-form-item>
              <el-form-item label="专业复核人">
                <span>{{ props.row.projProReviewer }}</span>
              </el-form-item>
              <el-form-item label="项目助理">
                <span>{{ props.row.projAsst }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column> -->
        <el-table-column
          prop="projDegree"
          label="紧急程度"
          width="80"
          align="center"
        >
          <template slot-scope="props">
            <el-tag
              type="success"
              effect="dark"
            >
              <span v-if="props.row.projDegree == 1001">正常</span>
              <span v-else>紧急</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="projStatus"
          label="项目状态"
          width="80"
          align="center"
        >
          <el-tag
            type="warning"
            effect="dark"
          >滞后</el-tag>
        </el-table-column>
        <el-table-column
          prop="projDate"
          :formatter="formatDate"
          label="编制日期"
        ></el-table-column>
        <el-table-column
          prop="projNum"
          label="计划编号"
        ></el-table-column>
        <el-table-column
          prop="projName"
          label="评估项目名称"
        ></el-table-column>
        <el-table-column
          prop="projScope"
          label="评估项目范围"
        ></el-table-column>
        <el-table-column
          prop="clientName"
          label="委托方名称"
        ></el-table-column>
        <el-table-column
          prop="projRate"
          label="项目进度"
          width="90"
          align="center"
        >
          <el-tag effect="dark">编写报告</el-tag>
        </el-table-column>
        <el-table-column
          label="操作"
          width="190"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-info"
              size="meduim"
              @click="handleCheck(scope.$index)"
            >详情</el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              size="medium"
              @click="handleEdit(scope.$index)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              size="medium"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <!-- <el-pagination
          background=""
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination> -->
        <el-pagination
          :total="pageTotal"
          :current-page="currentPage"
          :page-size="pageSize"
          @current-change="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import { fetchData } from '../../api/index';
import { getAllAbstractProject, searchProject, delProject } from '@/api/index';
export default {
  name: 'plan',
  data() {
    return {
      query: {
        startFrom: 1,
        pagecount: 10
      },
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页的数据条数
      proTypeList: [
        {
          label: '房地产',
          value: '1010'
        }, {
          label: '资产',
          value: '1020'
        }, {
          label: '土地',
          value: '1030'
        }, {
          label: '咨询',
          value: '1040'
        }, {
          label: 'ppp',
          value: '1050'
        }, {
          label: '会计',
          value: '1060'
        }, {
          label: '外协',
          value: '1070'
        }, {
          label: '政策修订',
          value: '1080'
        }, {
          label: '绩效',
          value: '1090'
        }, {
          label: '其他',
          value: '1100'
        }
      ],

      searchData: { reportNum: '', projName: '', projScope: '', clientName: '', projMember: '' },
      tableData: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1
    };
  },
  created() {
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getAllAbstractProject()
        .then(res => {
          console.log(res.data);
          this.tableData = res.data;
          this.pageTotal = res.data.length
        })
        .catch(err => {
          console.log(err);
        });
      // fetchData(this.query).then(res => {
      //     console.log(res);
      //     this.tableData = res.list;
      //     this.pageTotal = res.pageTotal || 50;
      // });
    },
    searchProjInfo() {
      searchProject(this.searchData).then(res => {
        console.log(res)
        this.tableData = res.data
        this.pageTotal = res.data.length
      }).catch(err => {
        console.log(err)
      })
    },
    changePage(val) {
      console.log(val)
      this.currentPage = val;
    },
    searchChange() {
    },
    formatDate(now) {
      const time = new Date(now.projDate)
      var year = time.getFullYear();  //取得4位数的年份
      var month = time.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
      var date = time.getDate();      //返回日期月份中的天数（1到31）
      var hour = time.getHours();     //返回日期中的小时数（0到23）
      return year + "-" + month + "-" + date
    },
    // 触发搜索按钮
    handleSearch() {
      // this.$set(this.query, 'pageIndex', 1);
      this.searchProjInfo()
    },
    //新增操作
    handleAdd() {
      console.log('新增项目事件');
      this.$router.push('/planform')
    },
    //编辑操作
    handleEdit(index) {
      console.log('编辑项目事件', index);
      this.$router.push({ path: '/planform', query: { data: this.tableData[index].projId } })
    },
    //查看详情操作
    handleCheck(index) {
      console.log('查看项目详情事件', this.tableData[index].projId);
      this.$router.push({ path: '/projcheck', query: { data: this.tableData[index].projId } })
    },
    // 删除操作
    handleDelete(index, row) {
      console.log('row>>>', row)
      // 二次确认删除
      this.$confirm('删除后将不可恢复，确定要删除吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          delProject({ projId: row.projId }).then(res => {
            this.$message.success('删除成功');
            this.getData()
          }).catch(err => {
            this.$message.warning('删除失败');
          })
        })
        .catch(() => { });
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val);
      // this.getData();
    }
  }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}

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
</style>
