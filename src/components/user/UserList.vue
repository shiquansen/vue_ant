<!-- 用户列表页面 -->
<template>
    <div>
        <!-- <h4 style="margin-left: 10px;color: #d6a20f;">用户列表页面</h4> -->
        <a-card>
            <a-row :gutter="20" class="row-style">
                <!-- 搜索框 -->
                <a-col :span="6">
                    <a-input-search v-model="queryParam.username" placeholder="请输入用户名查找" enter-button allowClear
                        @search="getUserList" />
                </a-col>
                <!-- 添加按钮 -->
                <a-col :span="4">
                    <a-button type="primary" @click="addUser()">添加</a-button>
                </a-col>
            </a-row>

            <!-- 用户信息显示表格 -->
            <a-table :columns="columns" rowKey="ID" :pagination="pagination" :data-source="userlist"
                @change="handleTableChange" bordered>
                <!-- 根据角色码显示名称 -->
                <span slot="role" slot-scope="role">{{role == 1 ? '管理员' : '订阅者'}}</span>
                <!-- 操作按钮 -->
                <template slot="action" slot-scope="data">
                    <div class="actionSlot">
                        <a-button type="primary" icon="edit" style="margin: 0 5px;" @click="editUser(data.id)">编辑
                        </a-button>
                        <a-button type="danger" icon="delete" style="margin: 0 5px;" @click="deleteUser(data.id)">删除
                        </a-button>
                        <a-button type="danger" icon="retweet"
                            style="margin: 0 5px;background-color: #8bc34a;border-color: #8bc34a;"
                            @click="changePwd(data.id)">改密
                        </a-button>
                        <a-button type="info" icon="undo"
                            style="margin: 0 5px;background-color: #f3f052;border-color: #f3f052;"
                            @click="resetPwd(data.id)">重置
                        </a-button>
                    </div>
                </template>
            </a-table>

            <!-- 新增用户区域 -->
            <a-modal closable title="新增用户" :visible="addUserVisible" @ok="addUserOk" @cancel="addUserCancel">
                <a-form-model :model="newUserInfo" :rules="addUserRules" ref="addUserRef">
                    <a-form-model-item label="用户名" prop="username">
                        <a-input v-model="newUserInfo.username"></a-input>
                    </a-form-model-item>
                    <a-form-model-item has-feedback label="密码" prop="password">
                        <a-input-password v-model="newUserInfo.password"></a-input-password>
                    </a-form-model-item>
                    <a-form-model-item has-feedback label="确认密码" prop="checkpass">
                        <a-input-password v-model="newUserInfo.checkpass"></a-input-password>
                    </a-form-model-item>
                    <!-- 只能新增普通用户 -->
                    <!-- <a-form-model-item label="是否为管理员" prop="role">
                        <a-select default-value="2" style="width: 120px" @change="adminChange">
                            <a-select-option key="1" value="1">
                                是
                            </a-select-option>
                            <a-select-option key="2" value="2">
                                否
                            </a-select-option>
                        </a-select>
                    </a-form-model-item> -->
                </a-form-model>
            </a-modal>


            <!-- 编辑用户区域 -->
            <a-modal closable title="编辑用户" :visible="editUserVisible" @ok="editUserOk" @cancel="editUserCancel">
                <a-form-model :model="userInfo" :rules="userRules" ref="editUserRef">
                    <a-form-model-item label="用户名" prop="username">
                        <a-input v-model="userInfo.username"></a-input>
                    </a-form-model-item>
                    <a-form-model-item label="是否为管理员" prop="role">
                        <a-switch :checked="IsAdmin" checked-children="是" un-checked-children="否"
                            @change="adminChange" />

                        <!-- <a-select default-value="2" style="width: 120px" @change="adminChange">
                            <a-select-option key="1" value="1">
                                是
                            </a-select-option>
                            <a-select-option key="2" value="2">
                                否
                            </a-select-option>
                        </a-select> -->
                    </a-form-model-item>
                </a-form-model>
            </a-modal>


            <!-- 修改密码区域 -->
            <a-modal closable title="修改密码" :visible="changePwdVisible" @ok="changePwdOk" @cancel="changePwdCancel">
                <a-form-model :model="userInfoChangePwd" :rules="changePwdUserRules" ref="changePwdRef">

                    <a-form-model-item has-feedback label="密码" prop="password">
                        <a-input-password v-model="userInfoChangePwd.password"></a-input-password>
                    </a-form-model-item>
                    <a-form-model-item has-feedback label="确认密码" prop="checkpass">
                        <a-input-password v-model="userInfoChangePwd.checkpass"></a-input-password>
                    </a-form-model-item>

                </a-form-model>
            </a-modal>
        </a-card>
    </div>
</template>

<script>
    // 表格列配置
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '10%',
            key: 'id',
            align: 'center',
        },
        {
            title: '用户名',
            dataIndex: 'username',
            width: '20%',
            key: 'username',
            align: 'center',
        },
        {
            title: '角色',
            dataIndex: 'role',
            width: '20%',
            key: 'role',
            scopedSlots: { customRender: 'role' },
            align: 'center',
        },
        {
            title: '操作',
            width: '30%',
            key: 'action',
            scopedSlots: { customRender: 'action' },
            align: 'center',
        },
    ]
    export default {
        data() {
            return {
                // 分页配置
                pagination: {
                    pageSizeOptions: ['10', '20'],
                    pageSize: 10,
                    total: 0,
                    showSizeChanger: true,
                    showTotal: (total) => `共${total}条`,
                },
                // 用户列表数据
                userlist: [],
                // 表格列信息（不可少）
                columns,
                // 分页查询参数
                queryParam: {
                    username: '',  // 用户搜索文本
                    pagesize: 10,
                    pagenum: 1,
                },
                visible: false,

                addUserVisible: false,      //新增用户对话框是否显示
                editUserVisible: false,     //编辑用户对话框是否显示
                changePwdVisible: false,    //修改密码对话框是否显示

                //用户信息(新增用户使用)
                newUserInfo: {
                    id: 0,
                    username: '',
                    password: '',
                    checkpass: '',
                    role: 2,
                },
                //用户信息（更新用户使用）
                userInfo: {
                    id: 0,
                    username: '',
                    password: '',
                    checkpass: '',
                    role: 2,
                },

                //用户信息（修改密码使用）
                userInfoChangePwd: {
                    id: 0,
                    username: '',
                    password: '',
                    checkpass: '',
                    role: 2,
                },


                // 新增用户的表单验证
                addUserRules: {
                    // 用户名校验规则
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 4, max: 12, message: '用户名长度在4到12个字符之间', trigger: 'blur' },
                        { pattern: /^[A-Za-z]+[A-Za-z0-9]+$/, message: '用户名为字母后数组组成，首字母不能是数字' }
                    ],
                    // 密码校验规则
                    password: [{
                        validator: (rule, value, callback) => {
                            if (this.newUserInfo.password == '') {
                                callback(new Error('请输入密码'));
                            }
                            if ([...this.newUserInfo.password].length < 6 || [...this.newUserInfo.password].length > 20) {
                                callback(new Error('密码长度在6到20位之间'));
                            } else {
                                callback();
                            }
                        }, trigger: 'blur'
                    }],
                    // 确认密码校验规则
                    checkpass: [{
                        validator: (rule, value, callback) => {
                            if (this.newUserInfo.checkpass == '') {
                                callback(new Error('请输入密码'));
                            }
                            if (this.newUserInfo.checkpass != this.newUserInfo.password) {
                                callback(new Error('密码不一致，请重新输入'));
                            } else {
                                callback();
                            }
                        }, trigger: 'blur'
                    }],
                },

                // 更新用户的表单验证
                userRules: {
                    // 用户名校验规则
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 4, max: 12, message: '用户名长度在4到12个字符之间', trigger: 'blur' },
                        { pattern: /^[A-Za-z]+[A-Za-z0-9]+$/, message: '用户名为字母后数组组成，首字母不能是数字' }
                    ],
                    // 密码校验规则
                    password: [{
                        validator: (rule, value, callback) => {
                            if (this.userInfo.password == '') {
                                callback(new Error('请输入密码'));
                            }
                            if ([...this.userInfo.password].length < 6 || [...this.userInfo.password].length > 20) {
                                callback(new Error('密码长度在6到20位之间'));
                            } else {
                                callback();
                            }
                        }, trigger: 'blur'
                    }],
                    // 确认密码校验规则
                    checkpass: [{
                        validator: (rule, value, callback) => {
                            if (this.userInfo.checkpass == '') {
                                callback(new Error('请输入密码'));
                            }
                            if (this.userInfo.checkpass != this.userInfo.password) {
                                callback(new Error('密码不一致，请重新输入'));
                            } else {
                                callback();
                            }
                        }, trigger: 'blur'
                    }],
                },

                // 修改密码的表单验证
                changePwdUserRules: {
                    // 密码校验规则
                    password: [{
                        validator: (rule, value, callback) => {
                            if (this.userInfoChangePwd.password == '') {
                                callback(new Error('请输入密码'));
                            }
                            if ([...this.userInfoChangePwd.password].length < 6 || [...this.userInfoChangePwd.password].length > 20) {
                                callback(new Error('密码长度在6到20位之间'));
                            } else {
                                callback();
                            }
                        }, trigger: 'blur'
                    }],
                    // 确认密码校验规则
                    checkpass: [{
                        validator: (rule, value, callback) => {
                            if (this.userInfoChangePwd.checkpass == '') {
                                callback(new Error('请输入密码'));
                            }
                            if (this.userInfoChangePwd.checkpass != this.userInfoChangePwd.password) {
                                callback(new Error('密码不一致，请重新输入'));
                            } else {
                                callback();
                            }
                        }, trigger: 'blur'
                    }],
                },

            }
        },
        //生命周期 - 创建完成（访问当前this实例）
        created() {
            this.getUserList();
        },
        //计算属性
        computed: {
            IsAdmin: function () {
                if (this.userInfo.role === 1) {
                    return true
                } else {
                    return false
                }
            },
        },
        //生命周期 - 挂载完成（访问DOM元素）
        mounted() {

        },
        //方法集
        methods: {
            // 获取用户列表
            async getUserList() {
                const { data: res } = await this.$axios.post('/user/list?pageSize='+this.queryParam.pagesize+"&pageNo="+this.queryParam.pagenum, 
                {
                        username: this.queryParam.username
                });
                if (res.code != 10000) {
                    return this.$message.error(res.message);
                }
                this.userlist = res.data.result;
                this.pagination.total = res.data.total;
            },

            // 处理表格分页改变事件
            handleTableChange(pagination, filters, sorter) {
                var pager = { ...this.pagination }
                pager.current = pagination.current;
                pager.pageSize = pagination.pageSize;
                this.queryParam.pagesize = pagination.pageSize;
                this.queryParam.pagenum = pagination.current;

                if (pagination.pageSize !== this.pagination.pageSize) {
                    this.queryParam.pagenum = 1;
                    pager.current = 1;
                }
                this.pagination = pager;
                this.getUserList();
            },

            // 删除用户
            deleteUser(id) {
                this.$confirm({
                    title: '提示：请再次确认',
                    content: '确定删除此用户吗?一旦删除，不可恢复。',
                    onOk: async () => {
                        const res = await this.$axios.delete(`/user/${id}`);
                        console.log(res);
                        if (res.data.code != 10000) {
                            return this.$message.error(res.message);
                        }
                        this.$message.success('删除成功');
                        this.getUserList();
                    },
                    onCancel: () => {
                        this.$message.info('操作已取消');
                    },
                });

            },

            // 显示新增用户对话框
            addUser() {
                this.addUserVisible = true;
            },

            // 新增用户
            addUserOk() {
                this.$refs.addUserRef.validate(async (valid) => {
                    if (!valid) return this.$message.error("参数不符合要求请重新输入");
                    const { data: res } = await this.$axios.post("/user", {
                        username: this.newUserInfo.username,
                        password: this.newUserInfo.password,
                        role: this.newUserInfo.role
                    });
                    if (res.code != 10000) {
                        return this.$message.error(res.message);
                    }
                    this.$refs.addUserRef.resetFields();
                    this.addUserVisible = false;
                    this.$message.success('新增用户成功');
                    this.getUserList();
                });
            },
            // 取消新增用户
            addUserCancel() {
                this.$refs.addUserRef.resetFields();
                this.addUserVisible = false;
                this.$message.info('新增用户取消');
            },

            // 是否管理员选择事件
            adminChange(checked) {
                if (checked) {
                    this.userInfo.role = 1
                } else {
                    this.userInfo.role = 2
                }
            },


            // 显示编辑用户对话框
            async editUser(id) {
                this.editUserVisible = true;
                const { data: res } = await this.$axios.get(`user/${id}`);
                this.userInfo = res.data;
                this.userInfo.id = id;
            },
            // 编辑用户确认
            editUserOk() {
                this.$refs.editUserRef.validate(async (valid) => {
                    if (!valid) return this.$message.error("参数不符合要求请重新输入");

                    const { data: res } = await this.$axios.put(`/user`, {
                        id: this.userInfo.id,
                        username: this.userInfo.username,
                        role: this.userInfo.role
                    });
                    if (res.code != 10000) {
                        return this.$message.error(res.message);
                    }
                    this.$refs.editUserRef.resetFields();
                    this.editUserVisible = false;
                    this.$message.success('编辑用户信息成功');
                    this.getUserList();
                });
            },
            // 编辑用户取消
            editUserCancel() {
                this.$refs.editUserRef.resetFields();
                this.editUserVisible = false;
                this.$message.info('编辑取消');
            },

            // 重置密码
            async resetPwd(id) {
                this.$confirm({
                    title: '提示：请再次确认',
                    content: '确定重置此用户的密码吗?',
                    onOk: async () => {
                        const { data: res } = await this.$axios.put(`/user/reset`, {
                            id: id
                        });
                        if (res.code != 10000) {
                            return this.$message.error(res.message);
                        }
                        this.$message.success('重置密码成功');
                    },
                    onCancel: () => {
                        this.$message.info('操作已取消');
                    },
                });
            },

            // 显示修改密码对话框
            async changePwd(id) {
                this.changePwdVisible = true;
                this.userInfoChangePwd.id = id;
            },

            // 确认修改密码
            changePwdOk() {
                this.$refs.changePwdRef.validate(async (valid) => {
                    if (!valid) return this.$message.error("参数不符合要求请重新输入");

                    const { data: res } = await this.$axios.put(`/user`, {
                        id : this.userInfoChangePwd.id,
                        password: this.userInfoChangePwd.password,
                    });
                    if (res.code != 10000) {
                        return this.$message.error(res.message);
                    }
                    this.$refs.changePwdRef.resetFields();
                    this.changePwdVisible = false;
                    this.$message.success('修改密码成功');
                });

            },

            // 取消修改密码
            changePwdCancel() {
                this.$refs.changePwdRef.resetFields();
                this.changePwdVisible = false;
                this.$message.info('取消修改密码');
            },

        }
    }
</script>
<style scoped>
    .actionSlot {
        display: flex;
        justify-content: center;

    }

    .row-style{
        margin-bottom: 20px;
    }
</style>