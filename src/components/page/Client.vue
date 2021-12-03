<template>
  <div class="container">
    <el-table
      :data="clientList"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      border
      row-key="value"
    >
      <el-table-column
        prop="label"
        label="label"
      ></el-table-column>
      <el-table-column
        prop="value"
        label="value"
      ></el-table-column>
    </el-table>
    <el-form :model="form">
      <el-form-item label="类型">
        <el-input v-model="form.clientType"></el-input>
      </el-form-item>
      <el-form-item label="名字">
        <el-input v-model="form.clientName"></el-input>
      </el-form-item>
      <el-button @click="addClient">提交</el-button>
    </el-form>
  </div>

</template>

<script>
import { getClientList, addClient } from '@/api/index'
export default {
  name: 'client',
  inject: ['reload'],
  data() {
    return {
      clientList: [],
      form: {
        clientName: '',
        clientType: ''
      },
	  
	  //211028变动 新增: 多个公司切换
	  companyId:'',
	  companyRange:['HZ', 'ZM','HZKJ'],
    }
  },
  created() {
    this.getClientList()
  },
  methods: {
    getClientList() {
      getClientList({}, this.companyId)
        .then(res => {
          console.log('getClientList RES', res)
          this.clientList = res.data
        })
        .catch(err => {
          console.log('getClientList ERROR', err)
        })
    },
    addClient() {
      addClient(this.form, this.companyId)
        .then(res => {
          console.log('addClient RES', res)
          this.getClientList()
        })
        .catch(err => {
          console.log('addClient ERROR', err)
          if (statusCode == 5002) {
            this.$message.warning('委托人已存在')
          }
        })
    }
  }
}
</script>

<style>
</style>