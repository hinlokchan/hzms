<template>
  <div>
    <el-table
      :data="tableData"
      :default-sort="{ prop: 'id', order: 'descending' }"
      max-height="300"
    >
      <el-table-column
        prop="id"
        label="序号"
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
  props: {
    projId: Number
  },
  watch: {
    projId(val) {
      this.pId = val
      this.getRecord(val)
    }
  },
  data() {
    return {
      pId: '',
      tableData: []
    }
  },
  created() {
    //this.getRecord()
  },
  methods: {
    getRecord(val) {
      console.log(val)
      opRecord({ projId: val })
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