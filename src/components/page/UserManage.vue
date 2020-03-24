<template>
  <div class="container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <span style="vertical-align: middle">用户管理</span>
          <el-button
            type="primary"
            icon="el-icon-plus"
            style="height:auto;padding: 0px 8px 8px 8px;margin-left:15px"
            @click="handleAdd()"
          ><span style="font-size:14px;color:#fff;">新增用户</span></el-button>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-drawer
      title="新增用户"
      :visible.sync="showDrawer"
      direction="rtl"
      size="35%"
    >
      <div style="margin: 0 100px 0 10px">
        <el-form :model="form">
          <el-form-item label="工号" label-width="40px">
            <el-input type="number" v-model.number="form.staffId"></el-input>
          </el-form-item>
          <el-form-item label="姓名" label-width="40px">
            <el-input v-model="form.staffName"></el-input>
          </el-form-item>
          <el-form-item label="权限">
            <el-select v-model="form.role">
              <el-option
                v-for="item in roleName"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div>
          <el-button @click="closeDrawer()">取 消</el-button>
          <el-button  type="primary" @click="formSubmit()">提 交</el-button>
        </div>
      </div>
    </el-drawer>
    <div class="main">
      <el-table
        :data="tableData"
        style="100%"
        max-height="420"
        border
      >
        <el-table-column
          prop="staffId"
          label="工号"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="staffName"
          label="姓名"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="role"
          label="身份"
        >
          <template slot-scope="scope">
            <span
              v-for="item in roleName"
              :key="item.value"
            >
              <span v-if="scope.row.role == item.value">{{item.label}}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.role"
              placeholder="请选择"
            >
              <el-option
                v-for="item in roleName"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
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
    </div>
  </div>
</template>

<script>
import { getUserList, addUser, deleteUser, alterUserInfo } from '@/api/index'
export default {
  name: 'usermanage',
  data() {
    return {
      tableData: [],
      roleName: [
        { value: 0, label: '超级管理员' },
        { value: 1, label: '管理层' },
        { value: 2, label: '计划部门' },
        { value: 3, label: '业务部门' }
      ],
      form: {
        staffId: '',
        staffName: '',
        role: ''
      },
      rules: {
        staffId: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        staffName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请选择身份', trigger: 'blur' }
        ]
      },
      showDrawer: false
    }
  },
  created() {
    this.getData()
  },
  mounted() {

  },
  methods: {
    getData() {
      getUserList()
        .then(res => {
          console.log(res);
          this.tableData = res.data
        })
        .catch(err => {
          console.log('failed to get user list');

        })
    },
    handleAdd() {
      this.showDrawer = true

    },
    formSubmit() {
      console.log(this.form);
      
    },
    handleDelete(index, row) {
      console.log('res>>>', row);
      // 二次确认删除
      this.$confirm('删除后将不可恢复，确定要删除吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          deleteUser({ staffId: row.staffId })
            .then(res => {
              console.log(res);
              this.$message.success('删除成功')
              this.getData()
            })
            .catch(err => {
              console.log(err);
              this.$message.warning ('删除失败')
            })
        })
        .catch(() => {})
    },
    closeDrawer() {
    this.showDrawer = false
  }
  }
}
</script>

<style>
</style>