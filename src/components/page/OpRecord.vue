<template>
  <div>
    <el-table
      :data="tableData"
      :default-sort="{ prop: 'id', order: 'descending' }"
    >
      <el-table-column
        prop="id"
        label="id"
        width="100"
        sortable
      ></el-table-column>
      <el-table-column
        prop="staffName"
        label="操作者"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="timestamp"
        label="操作时间"
        width="200"
        
      ></el-table-column>
      <el-table-column
        prop="detail"
        label="操作"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { opRecord } from '@/api/index'
export default {
  name: 'oprecord',
  data() {
    return {
      tableData: [
        // { 
        //   id: 1,
        //   staffName: '李家乐'
        // },
        // {
        //   id: 2,
        //   staffName: '陈世达'
        // }
      ]
    }
  },
  created() {
    this.getRecord()
  },
  methods: {
    getRecord() {
      opRecord({ projId: 1010202009003 })
        .then(res => {
          this.tableData = res.data
        })
        .catch(err => {
        })
    }
  }
}
</script>

<style>
</style>