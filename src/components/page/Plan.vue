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
              v-model="searchData.projNum"
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
              v-model="searchData.assemScope"
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
              v-model="searchData.clientContact"
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
        :data="tableData"
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
                <span>{{ props.row.typeName }}</span>
              </el-form-item>
              <el-form-item label="项目负责人">
                <span>{{ props.row.projLeader }}</span>
              </el-form-item>
              <el-form-item label="项目复核人">
                <span>{{ props.row.projRev }}</span>
              </el-form-item>
              <el-form-item label="专业复核人">
                <span>{{ props.row.projProRev }}</span>
              </el-form-item>
              <el-form-item label="项目助理">
                <span>{{ props.row.projAsst }}</span>
              </el-form-item>
              <el-form-item label="现场勘查">
                <span>{{ props.row.projSrvy }}</span>
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
          >{{props.row.projDegree}}</el-tag>
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
          prop="assemScope"
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
          :page.sync="query.pagenum"
          :limit.sync="query.pagecount"
          @pagination="changePage"
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
        pagenum: 1,
        pagecount: 10
      },
      proTypeList: [
        {
          label: '全部',
          value: 'all'
        },
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
      ],
      searchData: { projNum: '', projName: '', assemScope: '', clientName: '', clientContact: '' },
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
    // 获取 easy-mock 的模拟数据
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
    changePage(data) {
      this.query.pagenum = data.page
      this.query.pagecount = data.limit
      this.getData()
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
      this.$router.push({ path: '/planform', query: { data: this.tableData[index] } })
    },
    //查看操作
    handleCheck(index) {
      console.log('查看项目详情事件', index);
      //this.$router.push({ path: '/plancheck', query: { data: this.tableData[index] } })
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
