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
    <el-drawer
        title="编辑用户"
        :visible.sync="showEditDrawer"
        direction="rtl"
        size="35%"
    >
      <div style="margin: 0 100px 0 10px">
        <el-form :model="editForm">
          <el-form-item label="工号" label-width="40px">
            <el-input type="number" disabled v-model.number="editForm.staffId"></el-input>
          </el-form-item>
          <el-form-item label="姓名" label-width="40px">
            <el-input v-model="editForm.staffName"></el-input>
          </el-form-item>
          <el-form-item label="权限">
            <el-select v-model="editForm.role">
              <el-option
                  v-for="item in roleName"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            项目负责人
            <el-switch
                v-model="editForm.isProjLeader"
                active-color="#13ce66"
                :active-value="1"
                :inactive-value="0">
            </el-switch>
            项目助理
            <el-switch
                v-model="editForm.isProjAsst"
                active-color="#13ce66"
                :active-value="1"
                :inactive-value="0">
            </el-switch>
            现勘人员
            <el-switch
                v-model="editForm.isFieldSurvey"
                active-color="#13ce66"
                :active-value="1"
                :inactive-value="0">
            </el-switch>
          </el-form-item>
          <el-form-item>
            注册会计师
            <el-switch
                v-model="editForm.isCpa"
                active-color="#13ce66"
                :active-value="1"
                :inactive-value="0">
            </el-switch>
            资产评估师
            <el-switch
                v-model="editForm.isCpv"
                active-color="#13ce66"
                :active-value="1"
                :inactive-value="0">
            </el-switch>
            土地估价师
            <el-switch
                v-model="editForm.isCrev"
                active-color="#13ce66"
                :active-value="1"
                :inactive-value="0">
            </el-switch>
            房地产估价师
            <el-switch
                v-model="editForm.isCrea"
                active-color="#13ce66"
                :active-value="1"
                :inactive-value="0">
            </el-switch>
          </el-form-item>
        </el-form>
        <div>
          <el-button @click="closeDrawer()">取 消</el-button>
          <el-button  type="primary" @click="submitEditForm()">提 交</el-button>
        </div>
      </div>
    </el-drawer>
    <div class="main">
      <el-table
        :data="tableData"
        border
      >
        <el-table-column
          prop="staffId"
          label="工号"
          width="100"
          align="center"
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
          align="center"
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
<!--            <el-select-->
<!--              v-model="scope.row.role"-->
<!--              placeholder="请选择"-->
<!--              style="margin-right:20px"-->
<!--              @change="handleChangeRole(scope.row.staffId, scope.row.role)"-->
<!--            >-->
<!--              <el-option-->
<!--                v-for="item in roleName"-->
<!--                :key="item.value"-->
<!--                :label="item.label"-->
<!--                :value="item.value"-->
<!--              >-->
<!--              </el-option>-->
<!--            </el-select>-->
            <el-button
                type="text"
                @click="handleEdit(scope.row)"
            >
            编辑
            </el-button>
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
      showEditDrawer: false,
      tableData: [],
      roleName: [
        { value: 0, label: '超级管理员' },
        { value: 1, label: '管理层' },
        { value: 2, label: '计划部门' },
        { value: 3, label: '业务部门' }
      ],
      proRoles:[
        {label:'项目负责人', key: 'isProjLeader'},
        {label:'项目助理', key: 'isProjAsst'},
        {label:'现勘人员', key: 'isFieldSurvey'},
        {label:'注册会计师', key: 'isCpa'},
        {label:'资产评估师', key: 'isCpv'},
        {label:'土地估价师', key: 'isCrev'},
        {label:'房地产估价师', key: 'isCrea'}
      ],
      form: {
        staffId: '',
        staffName: '',
        role: ''
      },
      editForm:{

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
    };
  },
  created() {
    this.getData()
  },
  mounted() {

  },
  methods: {
    handleChangeRole(staffId, role) {
      console.log('role>>>', role)
      console.log('staffId>>>', staffId)
      alterUserInfo({ staffId: staffId, role: role}).then(res => {
        this.$message.success('修改成功')
      }).catch(err => {
        this.$message.warning ('修改失败')
      })
    },
    getData() {
      getUserList()
        .then(res => {
          console.log(res);
          this.tableData = res.data
          this.editForm = res.data[0]
        })
        .catch(err => {
          console.log('failed to get user list');
        })
    },
    handleAdd() {
      this.showDrawer = true
    },
    formSubmit() {
      addUser(this.form).then(res => {
        this.$message.success('添加成功')
        this.showDrawer = false
        this.getData()
      }).catch(err => {
        this.$message.success('添加失败')
      })
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
      this.showDrawer = false;
    },
    submitEditForm() {
      console.log(this.editForm)

      alterUserInfo(this.editForm).then(res => {
        this.$message.success('修改成功')
        this.showEditDrawer = false
        this.editForm = {}
      }).catch(err => {
        this.$message.warning ('修改失败')
      })

    },
    handleEdit(row) {
      this.showEditDrawer = true
      this.editForm = row
    }

  }
}
</script>

<style>
</style>