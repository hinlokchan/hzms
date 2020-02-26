<template>
    <div>
        <div class="container">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                        <span>项目计划录入</span>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-plus"
                    class="handle-add mr10"
                    size="medium"
                    @click="handleAdd"
                >新增项目计划</el-button>
                <el-select
                    v-model="query.address"
                    placeholder="项目类型"
                    class="handle-select mr10"
                    size="medium"
                >
                    <el-option key="1" label="房地产" value="房地产"></el-option>
                    <el-option key="2" label="土地" value="土地"></el-option>
                    <el-option key="3" label="资产" value="资产"></el-option>
                </el-select>
                <el-input
                    v-model="query.name"
                    placeholder="计划编号"
                    class="handle-input mr10"
                    size="medium"
                ></el-input>
                <el-button
                    type="primary"
                    icon="el-icon-search"
                    @click="handleSearch"
                    size="medium"
                >搜 索</el-button>
            </div>
            <el-table
                :data="tableData"
                stripe
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="项目类型">
                                <span>{{ props.row.projType }}</span>
                            </el-form-item>
                            <el-form-item label="项目负责人">
                                <span>{{ props.row.projLeader }}</span>
                            </el-form-item>
                            <el-form-item label="项目复核人">
                                <span>{{ props.row.projRev }}</span>
                            </el-form-item>
                            <el-form-item label="专业复核人">
                                <span>{{ props.row.projProRev }}</span>
                            </el-form-item>
                            <el-form-item label="项目助理">
                                <span>{{ props.row.projAsst }}</span>
                            </el-form-item>
                            <el-form-item label="现场勘查">
                                <span>{{ props.row.projSrvy }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="level" label="紧急程度" width="80" align="center">
                  <el-tag
                    type="success"
                    effect="dark">正常</el-tag>
                </el-table-column>
                <el-table-column prop="projDate" label="编制日期"></el-table-column>
                <el-table-column prop="projNum" label="计划编号"></el-table-column>
                <el-table-column prop="projName" label="评估项目名称"></el-table-column>
                <el-table-column prop="projArea" label="评估项目范围"></el-table-column>
                <el-table-column prop="attName" label="委托方名称"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            size="medium"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
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
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
// import { fetchData } from '../../api/index';
export default {
    name: 'plan',
    data() {
        return {
            query: {
                projType: '',
                projNum: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [
                {
                    id: 1,
                    projDate: '2020-02-25',
                    projNum: '房' + '202002001',
                    projName: '国有土地上征拆',
                    projArea: '南国商',
                    projType: '房地产',
                    projLeader: '奇景豪',
                    projRev: '李家乐',
                    projProRev: '张耀',
                    projAsst: '陈轩乐',
                    projSrvy: '陈俊雄',
                    attName: '州市政府'
                },
                {
                    id: 1,
                    projDate: '2020-02-25',
                    projNum: '房' + '202002001',
                    projName: '国有土地上征拆',
                    projArea: '南国商',
                    attName: '州市政府'
                },
                {
                    id: 1,
                    projDate: '2020-02-25',
                    projNum: '房' + '202002001',
                    projName: '国有土地上征拆',
                    projArea: '南国商',
                    attName: '州市政府'
                },
                {
                    id: 1,
                    projDate: '2020-02-25',
                    projNum: '房' + '202002001',
                    projName: '国有土地上征拆',
                    projArea: '南国商',
                    attName: '州市政府'
                },
                {
                    id: 1,
                    projDate: '2020-02-25',
                    projNum: '房' + '202002001',
                    projName: '国有土地上征拆',
                    projArea: '南国商',
                    attName: '州市政府'
                }
            ],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        // this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        // getData() {
        //     fetchData(this.query).then(res => {
        //         console.log(res);
        //         this.tableData = res.list;
        //         this.pageTotal = res.pageTotal || 50;
        //     });
        // },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            // this.getData();
        },
        //新增操作
        handleAdd() {
            console.log('新增项目事件');
        },
        //编辑操作
        handleEdit() {
            console.log('编辑项目事件');
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('删除后将不可恢复，确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            // this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}

.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-left: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>
