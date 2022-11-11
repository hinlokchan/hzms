<template>
  <div>
    <el-table
      :data="tableData"
      :default-sort="{ prop: 'timestamp', order: 'descending' }"
      max-height="170"
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
        sortable
      ></el-table-column>
      <el-table-column
        prop="timestamp"
        label="操作时间"
        width="200"
        sortable
      ></el-table-column>
      <el-table-column
        prop="detail"
        label="操作"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { chiefRecord } from '@/api/index'
export default {
  name: 'chiefrecord',
  props: {
    subProjId: [String, Number],
  },
  
  watch: {
    subProjId(val) {
	  if(val){
		this.getRecord(val)
	  }
    },
  },
  data() {
    return {
      sId: '',
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
	
	if(this.subProjId){
		this.$nextTick(()=>{
			this.getRecord(this.subProjId)
		})
	}
  },
  methods: {
    getRecord(val) {
	  //console.log('record')
	  
	  this.tableData = [];
	  
	  //211110变动 新增: 多个公司切换
	  const detailData = {
	  	subProjId: val,
	  }
      chiefRecord(detailData, this.companyId)
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