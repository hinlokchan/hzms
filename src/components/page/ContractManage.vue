<template>
    <div>
        <div class="container">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                        <i class="el-icon-folder"></i> 合同管理
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%"
                max-height="500">
                <el-table-column
                    fixed
                    prop="contractNum"
                    label="合同号"
                    width="100">
                </el-table-column>
                <el-table-column
                    fixed
                    prop="projNum"
                    label="计划编号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="takenDate"
                    label="取号日期"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="projName"
                    label="项目名称"
                    width="300">
                </el-table-column>
                <el-table-column
                    prop="clientName"
                    label="委托人"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop=""
                    label="评估目的"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="projLeader"
                    label="项目负责人"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="signingPic"
                    label="签约负责人"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="zip"
                    label="已签份数"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="recoverDate"
                    label="回收日期"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="archivePic"
                    label="归档负责人"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="notes"
                    label="备注"
                    width="120">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import {getContractList} from '@/api';

export default {
    data() {
        return {
            tableData:[]
        };
    },
    methods:{

    },
    created() {
        getContractList().then(
            res => {
                this.tableData = res.data
                console.log("what the fuck")
                console.log(res.data)
            }
        );
    }
}
</script>