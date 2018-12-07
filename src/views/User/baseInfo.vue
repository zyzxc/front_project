<template>
    <div id="Body">
        <Searchcard class="is-always-shadow">
            <template slot="uisearchcardbody">
                <el-form ref="baseForm" :model="searchForm" :inline="true" size="small" label-width="80px">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="searchForm.name" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="编码" prop="code">
                        <el-input v-model="searchForm.code" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchUser">查询</el-button>
                    </el-form-item>
                </el-form>
            </template>
        </Searchcard>
        <el-card>
            <template slot="header">
                <h3 class="ui-card-title ui-left"><i class="ui-icon">&#xe655;</i>用户列表</h3>
                <div class="ui-btn-container ui-right">
                    <el-button type="primary" size="mini" plain @click="insertBaseInfo">新增</el-button>
                </div>
            </template>
            <template>
                <el-table :data="tableData" size="mini" border stripe>
                    <el-table-column
                            prop="userId"
                            label="用户编码"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="用户姓名">
                    </el-table-column>
                    <el-table-column
                            prop="sex"
                            label="性别">
                    </el-table-column>
                    <el-table-column
                            prop="tel"
                            label="电话">
                    </el-table-column>
                    <el-table-column
                            prop="qq"
                            label="QQ">
                    </el-table-column>
                    <el-table-column min-width="60" label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="text" @click="editInfo(scope.row)" title="修改"><i
                                    class="ui-icon">&#xe62f;</i></el-button>
                            <el-button type="text" @click="delInfo(scope.row)" title="删除"><i
                                    class="ui-icon">&#xe62e;</i></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <el-pagination class="ui-text-right"
                           :page-sizes="[10,20,30,40,50]"
                           @size-change="currentSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="currentPage"
                           :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="finalTotal">
            </el-pagination>
        </el-card>
        <el-dialog :append-to-body="true" :title="baseTitle" :visible.sync="dialogVisible" width="60%"
                   :before-close="handleClose">
            <el-form ref="baseForm" :model="baseModel" :rules="baseRules" size="small" label-width="80px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="baseModel.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="编码" prop="code">
                    <el-input v-model="baseModel.code" clearable></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="paperTestSceneID">
                    <el-select v-model="baseModel.sex" clearable placeholder="请选择性别">
                        <el-option label="男" :value="0"></el-option>
                        <el-option label="女" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="电话" prop="tel">
                    <el-input v-model="baseModel.tel" clearable></el-input>
                </el-form-item>
                <el-form-item label="QQ" prop="qq">
                    <el-input v-model="baseModel.qq" clearable></el-input>
                </el-form-item>
                <el-form-item label="微信" prop="weixin">
                    <el-input v-model="baseModel.weixin" clearable></el-input>
                </el-form-item>
                <el-form-item label="微博" prop="weibo">
                    <el-input v-model="baseModel.weibo" clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="submitConfirm">确 定</el-button>
                <el-button size="small" @click="handleClose">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import Searchcard from '@/components/common/Searchcard.vue';
    import {getUserList, getUserInfoById, delUserById, updateUserById, addUserInfo} from "@/api/User";

    export default {
        name: 'BaseIndex',
        components: {
            Searchcard
        },
        data() {
            return {
                spanArr: [],
                pos: 0,
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                finalTotal: 0,
                searchForm: {
                    currentPage: 1,
                    pageSize: 10,
                    name: '',
                    code: ''
                },
                baseTitle: '新增用户信息',
                isAdd: true,
                baseModel: {
                    name: '',
                    code: '',
                    sex: 0,
                    tel: '',
                    qq: '',
                    weixin: '',
                    weibo: '',
                    email: ''
                },
                baseRules: {
                    name: [{required: true, message: '请输入名称', trigger: 'blur'}],
                    code: [{required: true, message: '请输入编码', trigger: 'blur'}]
                },
                dialogVisible: false
            }
        },
        mounted() {
            // this.renderData();
            this.getUserList();
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('ToggleSidebar')
            },
            renderData() {
                let data = [{
                    id: '12987122',
                    name: '王小虎',
                    amount1: '234',
                    amount2: '3.2',
                    amount3: 10
                },
                    {
                        id: '12987123',
                        name: '王小虎',
                        amount1: '165',
                        amount2: '4.43',
                        amount3: 12
                    }, {
                        id: '12987124',
                        name: '王小虎',
                        amount1: '324',
                        amount2: '1.9',
                        amount3: 9
                    }, {
                        id: '12987125',
                        name: '王小虎',
                        amount1: '621',
                        amount2: '2.2',
                        amount3: 17
                    }, {
                        id: '12987126',
                        name: '王小虎',
                        amount1: '539',
                        amount2: '4.1',
                        amount3: 15
                    }]

                for (let i = 0; i < data.length; i++) {
                    if (i === 0) {
                        this.spanArr.push(1);
                        this.pos = 0
                    } else {
                        // 判断当前元素与上一个元素是否相同
                        if (data[i].name === data[i - 1].name) {
                            this.spanArr[this.pos] += 1;
                            this.spanArr.push(0);
                        } else {
                            this.spanArr.push(1);
                            this.pos = i;
                        }
                    }
                }
                this.tableData = data
            },
            cellMerge({row, column, rowIndex, columnIndex}) {
                if (columnIndex === 1) {
                    const _row = this.spanArr[rowIndex];
                    const _col = _row > 0 ? 1 : 0;
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                }
            },
            getUserList() {
                getUserList(this.searchForm).then(res => {
                    let $result = JSON.parse(res.data)
                    if ($result.code === 0) {
                        this.tableData = $result.result.rows;
                        this.finalTotal = $result.result.total;
                    }
                })
            },
            searchUser() {
                this.getUserList();
            },
            insertBaseInfo() {
                this.isAdd = true;
                this.baseTitle = '新增用户信息';
                this.dialogVisible = true;
            },
            editInfo(row) {
                this.baseTitle = '编辑用户信息';
                this.isAdd = false;
                getUserInfoById(row.userId).then(res => {
                    let $result = JSON.parse(res.data)
                    if ($result.code === 0) {
                        this.baseModel = $result.result;

                        this.dialogVisible = true;
                    }
                })
                /*updateUserById(row).then(res => {
                    let $result = JSON.parse(res.data)
                    console.log($result)
                })*/
            },
            delInfo(row) {
                delUserById({userId: row.userId}).then(res => {
                    let $result = JSON.parse(res.data)
                    if ($result.code === 0) {
                        this.getUserList();
                    }
                })
            },
            currentSizeChange(val) {
                this.searchForm.pageSize = val;
                this.getUserList();
            },
            handleCurrentChange(val) {
                this.searchForm.currentPage = val
                this.getUserList();
            },
            submitConfirm() {
                let el = this.$refs['baseForm']
                el.validate(valid => {
                    if (valid) {
                        if (this.isAdd) {
                            addUserInfo(this.baseModel).then(res => {
                                let $result = JSON.parse(res.data)
                                if ($result.code === 0) {
                                    this.$message.success($result.msg);
                                    this.dialogVisible = false;
                                    this.getUserList();
                                }
                            })
                        } else {
                            updateUserById(this.baseModel).then(res => {
                                let $result = JSON.parse(res.data)
                                if ($result.code === 0) {
                                    this.$message.success($result.msg);
                                    this.dialogVisible = false;
                                    this.getUserList();
                                }
                            })
                        }
                    }
                })
            },
            handleClose() {
                this.dialogVisible = false;
                this.resetField();
                let el = this.$refs['baseForm']
                if (el) {
                    el.clearValidate();
                }
            },
            resetField() {
                this.baseModel = {
                    name: '',
                    code: '',
                    sex: 0,
                    tel: '',
                    qq: '',
                    weixin: '',
                    weibo: '',
                    email: ''
                }
            }
        }
    }
</script>

<style scoped>

</style>
