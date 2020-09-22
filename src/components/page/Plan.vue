<template>
  <div>
    <div class="container">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <span style="vertical-align: middle">查看项目</span>
            <el-button
              type="primary"
              icon="el-icon-plus"
              style="height:auto;padding: 0px 8px 7px 8px;margin-left:15px"
              @click="handleAdd"
            ><span style="font-size:14px;color:#fff;">新增项目计划</span></el-button>
            <!-- <el-button @click="setCookie">Cookie</el-button>
            <el-button @click="getCookie('/plan')">get</el-button> -->
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="handle-box">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-input
              v-model="searchData.projNum"
              size="medium"
              placeholder="计划编号"
              @keyup.enter.native="handleSearch"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-input
              v-model="searchData.reportNum"
              placeholder="初、正评号"
              size="medium"
              @keyup.enter.native="handleSearch"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-input
              v-model="searchData.projName"
              placeholder="项目名称"
              size="medium"
              @keyup.enter.native="handleSearch"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-input
              v-model="searchData.projScope"
              placeholder="项目范围"
              size="medium"
              @keyup.enter.native="handleSearch"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-input
              v-model="searchData.clientName"
              placeholder="委托人"
              size="medium"
              @keyup.enter.native="handleSearch"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-input
              v-model="searchData.projMember"
              placeholder="项目成员"
              size="medium"
              @keyup.enter.native="handleSearch"
            ></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-button
              type="text"
              icon="el-icon-search"
              @click="handleSearch"
              size="medium"
            >搜 索</el-button>
            <el-button
              type="text"
              icon="el-icon-refresh-right"
              @click="handleRefresh"
              size="medium"
            >重置搜索条件</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- table -->
      <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        height="550"
        stripe
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <!-- <el-table-column type="expand">
          <template slot-scope="props">
            <el-form
              label-position="left"
              inline
              class="demo-table-expand"
            >
              <el-form-item label="项目类型">
                <div
                  v-for="item in projTypeList"
                  :key="item.value"
                >
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
        </el-table-column> -->

        <!-- <el-table-column
          prop="projDegree"
          label="紧急程度"
          width="80"
          align="center"
        >
          <template slot-scope="props">
            <el-tag
              :type="props.row.projDegree == 1001 ? 'success' : 'danger'"
              effect="dark"
            >
              <span v-if="props.row.projDegree == 1001">正常</span>
              <span v-else>紧急</span>
            </el-tag>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="projType"
          label="项目类型"
          width="90"
          align="center"
          :filters="this.projTypeFilters"
          :filter-method="filterProjType"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="projState"
          label="项目状态"
          width="80"
          align="center"
        >
          <template slot-scope="props">
            <el-tag
              :type="props.row.projState == '正常' ? 'primary' : 'warning'"
              effect="dark"
            >{{ props.row.projState }}</el-tag>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="projDate"
          :formatter="this.$formatDate"
          label="编制日期"
          sortable
          width="105"
        ></el-table-column>
        <el-table-column
          prop="projNum"
          label="计划编号"
          width="115"
        ></el-table-column>
        <el-table-column
          prop="projName"
          label="评估项目名称"
          width="250"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="projScope"
          label="评估项目范围"
          width="250"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="clientName"
          label="委托人名称"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="projLeader"
          label="项目负责人"
          width="95"
        ></el-table-column>
        <el-table-column
          prop="projReviewer"
          label="项目复核人"
          width="95"
        ></el-table-column>
        <el-table-column
          prop="projAsst"
          label="项目助理"
          width="80"
        ></el-table-column>
        <!-- <el-table-column
          prop="projRate"
          label="项目进度"
          width="90"
          align="center"
        >
          <el-tag effect="dark">编写报告</el-tag>
        </el-table-column> -->
        <el-table-column
          label="操作"
          width="190"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-info"
              size="meduim"
              @click="handleCheck(scope.row)"
            >详情</el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              size="medium"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              size="medium"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
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
import { getAllAbstractProject, searchProject, delProject } from '@/api/index';
import { checkFaRegister } from '@/api/formalreg'
import projTypeOption from '../../../public/projTypeOption.json'
export default {
  name: 'plan',
  data() {
    return {
      currentPage: 1, // 当前页码
      pageSize: 20, // 每页的数据条数
      pageTotal: 0,
      projTypeList: [
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
          label: '房地产咨询',
          value: '1041'
        }, {
          label: '资产咨询',
          value: '1042'
        }, {
          label: '土地咨询',
          value: '1043'
        }, {
          label: 'PPP',
          value: '1050'
        }, {
          label: '房地产复审',
          value: '1061'
        }, {
          label: '资产复审',
          value: '1062'
        }, {
          label: '土地复审',
          value: '1063'
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
      searchData: { projNum: '', reportNum: '', projName: '', projScope: '', clientName: '', projMember: '' },
      tableData: [],
      editVisible: false,
      form: {},
      projTypeFilters: [
        { text: '房地产', value: 1010 },
        { text: '资产', value: 1020 },
        { text: '土地', value: 1030 },
        { text: '房地产咨询', value: 1041 },
        { text: '资产咨询', value: 1042 },
        { text: '土地咨询', value: 1043 },
        { text: 'PPP', value: 1050 },
        { text: '房地产复审', value: 1061 },
        { text: '资产复审', value: 1062 },
        { text: '土地复审', value: 1063 },
        { text: '外协', value: 1070 },
        { text: '政策修订', value: 1080 },
        { text: '绩效', value: 1090 },
        { text: '其他', value: 1100 }
      ]
    }
  },
  created() {
    this.getData();
  },
  mounted() {
  },
  methods: {
    getData() {
      if (sessionStorage.getItem('page')) {
        this.changePage(parseInt(sessionStorage.getItem('page')))
        sessionStorage.removeItem('page')
      }
      getAllAbstractProject()
        .then(res => {
          console.log(res.data)
          this.tableData = res.data
          this.pageTotal = res.data.length
        })
        .catch(err => {
          console.log(err);
        })
    },
    searchProjInfo() {
      let newArr = {}
      for (let j in this.searchData) {
        if (this.searchData[j] !== '') {
          newArr[j] = this.searchData[j]
        }
      }
      searchProject(newArr).then(res => {
        console.log(res)
        this.tableData = res.data
        this.pageTotal = res.data.length
      }).catch(err => {
        console.log(err)
      })
    },
    //----feature
    // setCookie() {
    //   let name = this.$route.path
    //   //存入的参数
    //   let value = [this.searchData]
    //   let day = '1'
    //   if (day !== 0) {
    //     var expires = day * 24 * 60 * 60 * 1000
    //     var date = new Date(+new Date() + expires)
    //     document.cookie = name + '=' + escape(JSON.stringify(value)) + ';expires=' + date.toUTCString()
    //   } else {
    //     document.cookie = name + '=' + escape(JSON.stringify(value))
    //   }
    //   console.log(name, JSON.stringify(value))
    // },
    // getCookie(data){
    //   if("/plan" == data){
    //     var arr
    //     var name = this.$route.path
    //     var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    //     if (arr = document.cookie.match(reg)) {
    //       var test = JSON.parse(unescape(arr[4]))
    //       console.log(test)
    //     }
    //     console.log(reg, document.cookie.match(reg))
    //   }  
    // },
    changePage(val) {
      console.log(val)
      this.currentPage = val
    },
    searchChange() {
    },
    // 触发搜索按钮
    handleSearch() {
      // this.$set(this.query, 'pageIndex', 1);
      this.searchProjInfo()
    },
    handleRefresh() {
      Object.keys(this.searchData).forEach(key => (this.searchData[key] = ''))
      console.log(this.searchData)
      this.searchProjInfo()
    },
    //新增操作
    handleAdd() {
      console.log('新增项目事件');
      this.$router.push('/planform')
    },
    //编辑操作
    handleEdit(val) {
      sessionStorage.setItem('page', this.currentPage)
      this.$router.push({ path: '/planform', query: { data: val.projId } })
    },
    //查看详情操作
    handleCheck(val) {
      sessionStorage.setItem('page', this.currentPage)
      // const index2 = (this.currentPage - 1)*10 + index
      console.log('查看项目详情事件', val.projId);
      this.$router.push({ path: '/projcheck', query: { data: val.projId } })
    },
    // 删除操作
    handleDelete(row) {
      if (row.projType == 1010) {
        // 二次确认删除
        checkFaRegister({ projId: row.projId, subReportNum: '-' })
          .then(res => {
            let status1 = res.data.registerState
            let status2 = res.data.evalObjState
            console.log(status1, status2)
            if (status1 == true || status2 == true) {
              this.$message.error('该项目已填写估价对象详情或已登记正评，请联系管理员删除')
              return 0
            } else {
              this.$confirm('删除后将不可恢复，确定要删除吗？', '提示: 即将删除[' + row.projNum + ']', {
                type: 'warning'
              })
                .then(() => {
                  //接口会判断是否有报告号并对应删除
                  // if (status1 == true || status2 == true) {
                  //   this.message.error('该项目已填写估价对象详情或已登记正评，请联系管理员删除')
                  //   return 0
                  // }
                  delProject({ projId: row.projId }).then(res => {
                    this.$message.success('删除成功');
                    this.getData()
                  }).catch(err => {
                    this.$message.warning('删除失败,请稍后重试');
                  })
                })
                .catch(() => { })
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$confirm('删除后将不可恢复，确定要删除吗？', '提示: 即将删除[' + row.projNum + ']', {
          type: 'warning'
        })
          .then(() => {
            //接口会判断是否有报告号并对应删除
            delProject({ projId: row.projId }).then(res => {
              this.$message.success('删除成功');
              this.getData()
            }).catch(err => {
              this.$message.warning('删除失败,请稍后重试');
            })
          })
          .catch(() => { })
      }
    },
    filterProjType(value, row) {
      return row.projType === value
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
