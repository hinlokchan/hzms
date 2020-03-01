<template>
    <div>
        <div class="container">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                        <i class="el-icon-lx-calendar"></i> 项目
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>新增项目计划</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="form-box">
                <el-row :gutter="20">
                    <div class="form-item-title">
                        <h3>项目信息</h3>
                    </div>
                    <el-form ref="form" :model="form" label-width="140px">
                        <el-col :span="6">
                            <el-form-item label="项目类型">
                                <el-select v-model="form.projType">
                                    <el-option label="房地产" value="房地产"></el-option>
                                    <el-option label="土地" value="土地"></el-option>
                                    <el-option label="资产" value="资产"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="轮序/安排">
                                <el-select v-model="form.arrgType" placeholder="请选择">
                                    <el-option label="轮序" value="轮序"></el-option>
                                    <el-option label="安排" value="安排"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="新/重评">
                                <el-select v-model="form.region" placeholder="请选择">
                                    <el-option label="新项目" value="新项目"></el-option>
                                    <el-option label="重评项目" value="重评项目"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="紧急程度">
                                <el-select v-model="form.important" placeholder="请选择">
                                    <el-option label="正常" value="正常"></el-option>
                                    <el-option label="紧急" value="紧急"></el-option>
                                    <el-option label="特急" value="特急"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="项目名称">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="项目范围">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="评估目的">
                                <el-select v-model="form.assemGoal" placeholder="请选择">
                                    <el-option label="转让" value="转让"></el-option>
                                    <el-option label="拆迁" value="拆迁"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="编制时间">
                                <el-date-picker
                                    type="date"
                                    placeholder="选择日期"
                                    v-model="form.projTime"
                                    value-format="yyyy-MM-dd"
                                    style="width: 100%;"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="基准日">
                                <el-date-picker
                                    type="date"
                                    placeholder="选择日期"
                                    v-model="form.baseTime"
                                    value-format="yyyy-MM-dd"
                                    style="width: 100%;"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-row :gutter="20">
                            <el-col>
                                <div class="form-item-title">
                                    <h3>业务来源</h3>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="接洽人">
                                    <el-input></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="委托方">
                                    <el-input></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="委托方联系人">
                                    <el-input></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="委托方联系人电话">
                                    <el-input></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col>
                                <div class="form-item-title">
                                    <h3>项目组成员</h3>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="项目负责人">
                                    <el-input></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <el-form-item label="项目复核人">
                                        <el-input></el-input>
                                        <el-input></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="专业复核人">
                                        <el-input></el-input>
                                        <el-input></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="项目助理">
                                        <el-input></el-input>
                                        <el-input></el-input>
                                        <el-input></el-input>
                                        <el-input></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="现场勘查">
                                        <el-input></el-input>
                                        <el-input></el-input>
                                        <el-input></el-input>
                                        <el-input></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">表单提交</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'planform',
    data() {
        return {
            form: {
                projType: '',
                projName: '',
                projArea: '',
                projDate: '',
                options: [],
                domains: [{
                    value: ''
                }]
            }
        };
    },
    methods: {
        onSubmit() {
            this.$message.success('提交成功！');
        }

    }
};
</script>

<style scoped>
.form-item-title {
    width: 100px;
    text-align: center;
    margin: 20px 0 20px 0;
    border-left: solid 5px #409eff;
}
</style>