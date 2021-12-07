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
    projId: Number,
  },
  watch: {
    projId(val) {
	  if(val != 0){
		this.pId = val
		this.getRecord()
	  }
    },
  },
  data() {
    return {
      pId: '',
      tableData: [],
	  
	  //211101变动 新增: 多个公司切换
	  companyRange:['HZ', 'ZM','HZKJ'],
	  companyId:'',
	  //companyTabsId: 0,
    }
  },
  created() {
    //this.getRecord()
	const value = localStorage.getItem('companyId');
	if(value){
		this.companyId = value;
		//this.companyTabsId = this.companyRange.indexOf(this.companyId);
	}else{
		this.companyId = this.companyRange[0];
		//this.companyTabsId = 0;
	}
  },
  methods: {
    getRecord() {
	  //211110变动 新增: 多个公司切换
	  const detailData = {
	  	projId: this.pId
	  }
      opRecord(detailData, this.companyId)
        .then(res => {
			if(res.data){
				this.tableData = res.data
			}
        })
        .catch(err => {
        })
    }
  }
}
</script>

<style>
</style>