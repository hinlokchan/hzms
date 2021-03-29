<template>
  <div class="container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>估价对象详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- <el-card style="width: 50%">
      <div slot="header">
        <span>房地产</span>
      </div>
      
    </el-card> -->
    <el-table
      :data="tableData"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
      >
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template>
        <el-button  type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { searchMyProject } from '@/api/index'
export default {
  name: 'formalreg',
  data() {
    return {
      tableData: [
        
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      searchMyProject()
        .then(res => {
          this.tableData = res.data
          console.log('tableData', this.tableData)
        })
        .catch(err => {
          this.$message.error('服务器忙')
        })
    }
  }
}
</script>

<style scoped>
</style>