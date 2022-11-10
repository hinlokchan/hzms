<template>
  <!-- 基本信息对话框 -->
  <el-dialog
    title="修改项目名称和项目范围"
    :visible.sync="editSubProjVisible"
    width="800px"
    top="20px"
    v-if="editSubProjForm"
    :close-on-click-modal = "false"
  >
    <el-form
      ref="editSubProjForm"
      :model="editSubProjForm"
      label-width="auto"
      :rules="editSubProjFormRules"
    >
      <el-form-item
        label="项目名称"
        prop="subProjName"
      >
        <el-input
          v-model="editSubProjForm.subProjName"
  		clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        label="项目范围"
        prop="subProjScope"
      >
        <el-input
          v-model="editSubProjForm.subProjScope"
  		clearable
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        type="text"
        @click="editSubProjVisible = false"
      >取 消</el-button>
      <el-button
        type="primary"
        @click="subProjNameFormSubmit(editSubProjForm.projId)"
      >确认提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { editSubProject} from '@/api/subReport'

export default {
  name: "subProjNameDialog",
  data() {
    return {
      loading:false,

      
      //修改子项目信息
      editSubProjVisible:false,
      editSubProjForm:{},
      editSubProjFormRules:{
      	subProjName: [{ required: true, message: '请输入子项目名称', trigger: 'blur' }],
      	//subProjScope: [{ required: true, message: '请输入子项目范围', trigger: 'blur' }],
      	//subBaseDate: [{ required: true, message: '请输入子项目基准日', trigger: 'blur' }],
      },

		//211101变动 新增: 多个公司切换
		companyRange:['HZ', 'ZM','HZKJ'],
		companyId:'',
		companyTabsId: 0,
    }
  },
  created() {
	  //211028变动 新增: 多个公司切换
	  const value = localStorage.getItem('companyId');
	  if(value){
	  	this.companyId = value;
	  	this.companyTabsId = this.companyRange.indexOf(this.companyId);
	  }else{
	  	this.companyId = this.companyRange[0];
	  	this.companyTabsId = 0;
	  }
  },
  computed:{

  },
  methods: {
    subProjNameFormCallback(editData){
		this.$emit('subProjNameFormCallback', editData);
    },

    //baseInfo相关
    openSubProjNameForm(subdata){
		this.editSubProjForm = {
			subProjId:subdata.subProjId,
			subProjName:subdata.subProjName,
			subProjScope:subdata.subProjScope,
		}
		
		console.log('editSubProjForm', this.editSubProjForm)
		
		this.editSubProjVisible = true;
    },

    subProjNameFormSubmit(){
		this.$refs.editSubProjForm.validate((valid) => {
			if (valid) {
				//远程更新
				var editData = Object.assign({}, this.editSubProjForm);
				
				this.editSubProjectData(editData, (res)=>{
					this.$message.success('项目信息修改成功')
					
					//1. 刷新子项目信息
					this.subProjNameFormCallback(editData)
					
					//2. 关闭弹出框
					this.editSubProjVisible = false
				})
				    
				
			}else{
				this.$message('请填写必填信息或格式有误');
			}
		})
    },
    editSubProjectData(formdata, successc) {
		this.loading = true;
		editSubProject(formdata, this.companyId).then(res => {
			successc(res);
		}).catch(err => {
			if (err.statusCode == 5002) {
				this.$message.warning('该子报告号已存在，请勿重新添加')
			} else {
				this.$message.warning('修改失败，该项目名称可能已存在, 请核对')
			}
			console.log('更新项目信息', err)  
		}).finally((info)=> {
			this.loading = false;
		})
    },
  }
}
</script>

<style scoped>
  .dialog-footer{
    text-align: right;
  }
</style>
