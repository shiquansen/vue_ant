<!-- 管理员信息列表页面 -->
<template>
    <div>
        <!-- <h4 style="margin-left: 10px;color: #d6a20f;">管理员信息列表页面</h4> -->
        <a-card>
            <a-row :gutter="20">

                <!-- 添加按钮 -->
                <a-col :span="4" class="row-style">
                    <a-button type="primary" @click="addAdminUserInfo()">添加</a-button>
                </a-col>
            </a-row>

            <!-- 信息显示表格 -->
            <a-table :columns="columns" rowKey="id" :data-source="adminUserInfolist" bordered>

                <!-- 操作按钮 -->
                <template slot="action" slot-scope="data">
                    <div class="actionSlot">
                        <a-button type="primary" icon="edit" style="margin: 0 5px;"
                            @click="showEditAdminUserInfo(data.id)">
                            编辑
                        </a-button>
                        <a-button type="danger" icon="delete" style="margin: 0 5px;"
                            @click="deleteAdminUserInfo(data.id)">
                            删除
                        </a-button>

                    </div>
                </template>
            </a-table>


            <!-- 新增管理员信息区域 -->
            <a-modal closable title="新增管理员信息" :visible="addAdminUserInfoVisible" @ok="addAdminUserInfoOk"
                @cancel="addAdminUserInfoCancel">
                <a-form-model :model="newAdminUserInfo" :rules="addAdminUserInfoRules" ref="addAdminUserInfoRef">

                    <a-form-model-item label="用户名称" prop="usrId">
                        <a-select defaultValue="请选择用户" v-model="newAdminUserInfo.usrId">
                            <!--- @change="userChange"-->
                            <a-select-option v-for="user in userlist" :key="user.id" :value="user.id">
                                {{user.username}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>

                    <a-form-model-item label="昵称" prop="nickname">
                        <a-input v-model="newAdminUserInfo.nickname"></a-input>
                    </a-form-model-item>
                    <a-form-model-item label="座右铭" prop="motto">
                        <a-input v-model="newAdminUserInfo.motto"></a-input>
                    </a-form-model-item>
                    <a-form-model-item label="地址" prop="address">
                        <a-input v-model="newAdminUserInfo.address"></a-input>
                    </a-form-model-item>
                    <a-form-model-item label="个人信息" prop="personalInfo">
                        <a-textarea v-model="newAdminUserInfo.personalInfo"></a-textarea>
                    </a-form-model-item>
                    <a-form-model-item label="个人介绍" prop="personalIntroduction">
                        <a-textarea v-model="newAdminUserInfo.personalIntroduction"></a-textarea>
                    </a-form-model-item>

                </a-form-model>
            </a-modal>

            <!-- 编辑管理员信息区域 -->
            <a-modal closable title="编辑管理员信息" :visible="editAdminUserInfoVisible" @ok="editAdminUserInfoOk"
                @cancel="editAdminUserInfoCancel">
                <a-form-model :model="editAdminUserInfoObj" :rules="editAdminUserInfoRules" ref="editAdminUserInfoRef">

                    <a-form-model-item label="用户名称" prop="usrId">
                        <a-select defaultValue="请选择用户" v-model="newAdminUserInfo.usrId">
                            <!--- @change="userChange2"-->
                            <a-select-option v-for="user in userlist" :key="user.id" :value="user.id">
                                {{user.username}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>

                    <a-form-model-item label="昵称" prop="nickname">
                        <a-input v-model="editAdminUserInfoObj.nickname"></a-input>
                    </a-form-model-item>
                    <a-form-model-item label="座右铭" prop="motto">
                        <a-input v-model="editAdminUserInfoObj.motto"></a-input>
                    </a-form-model-item>
                    <a-form-model-item label="地址" prop="address">
                        <a-input v-model="editAdminUserInfoObj.address"></a-input>
                    </a-form-model-item>
                    <a-form-model-item label="个人信息" prop="personalInfo">
                        <a-textarea v-model="editAdminUserInfoObj.personalInfo"></a-textarea>
                    </a-form-model-item>
                    <a-form-model-item label="个人介绍" prop="personalIntroduction">
                        <a-textarea v-model="editAdminUserInfoObj.personalIntroduction"></a-textarea>
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
            title: 'id',
            dataIndex: 'id',
            width: '5%',
            key: 'id',
            align: 'center',
        },
        // {
        //     title: '用户名',
        //     dataIndex: 'User.username',
        //     width: '10%',
        //     key: 'username',
        //     align: 'center',
        // },
        {
            title: 'usrId',
            dataIndex: 'usrId',
            width: '8%',
            key: 'usrId',
            align: 'center',
        },
        {
            title: '昵称',
            dataIndex: 'nickname',
            width: '10%',
            key: 'nickname',
            align: 'center',
        },
        {
            title: '座右铭',
            dataIndex: 'motto',
            width: '20%',
            key: 'motto',
            align: 'center',
        },
        {
            title: '地址',
            dataIndex: 'address',
            width: '8%',
            key: 'address',
            align: 'center',
        },
        {
            title: '个人信息',
            dataIndex: 'personalInfo',
            width: '18%',
            key: 'personalInfo',
            align: 'center',
        },
        {
            title: '个人介绍',
            dataIndex: 'personalIntroduction',
            width: '20%',
            key: 'personalIntroduction',
            align: 'center',
        },
        {
            title: '操作',
            width: '25%',
            key: 'action',
            scopedSlots: { customRender: 'action' },
            align: 'center',
        },
    ]
    export default {
        data() {
            return {
                // 表格列信息（不可少）
                columns,

                // 管理员信息列表数据
                adminUserInfolist: [],
                // 用户列表
                userlist: [],


                addAdminUserInfoVisible: false,
                editAdminUserInfoVisible: false,    //编辑框显示

                //新增管理员信息
                newAdminUserInfo: {
                    usrId: null,
                    nickname: null,
                    motto: '',
                    address: '',
                    personalInfo: '',
                    personalIntroduction: '一个没有故事的男同学，没什么介绍......'
                },
                //编辑管理员信息
                editAdminUserInfoObj: {
                    id: null,
                    usrId: null,
                    nickname: '',
                    motto: '',
                    address: '',
                    personalInfo: '',
                    personalIntroduction: '一个没有故事的男同学，没什么介绍......'
                },


                // 新增管理员信息的表单验证
                addAdminUserInfoRules: {
                    nickname: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                        { min: 2, max: 12, message: '昵称长度在2到12个字符之间', trigger: 'blur' },
                    ],
                    usrId: [{ required: true, message: '请选择用户', trigger: 'change' }],
                    motto: [
                        { required: true, message: '请输入座右铭', trigger: 'blur' },
                        { min: 2, max: 50, message: '昵称长度在2到50个字符之间', trigger: 'blur' },
                    ],
                    address: [
                        { required: true, message: '请输入地址', trigger: 'blur' },
                    ],

                },
                // 编辑管理员信息的表单验证
                editAdminUserInfoRules: {
                    nickname: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                        { min: 2, max: 12, message: '昵称长度在2到12个字符之间', trigger: 'blur' },
                    ],
                    usrId: [{ required: true, message: '请选择用户', trigger: 'change' }],
                    motto: [
                        { required: true, message: '请输入座右铭', trigger: 'blur' },
                        { min: 2, max: 50, message: '昵称长度在2到50个字符之间', trigger: 'blur' },
                    ],
                    address: [
                        { required: true, message: '请输入地址', trigger: 'blur' },
                    ],

                },

            }
        },
        //生命周期 - 创建完成（访问当前this实例）
        created() {
            this.getAdminUserInfoList();
            this.getUserList()
        },
        //计算属性
        computed: {

        },
        //生命周期 - 挂载完成（访问DOM元素）
        mounted() {

        },
        //方法集
        methods: {
            // 获取所有管理员信息
            async getAdminUserInfoList() {
                const { data: res } = await this.$axios.post('/adminUsrInfo/list?pageSize=10000&pageNo=1', {nickname:""});
                if (res.code != 10000) {
                    return this.$message.error(res.message);
                }
                this.adminUserInfolist = res.data.result;
            },

            // 获取用户列表
            async getUserList() {
                const { data: res } = await this.$axios.post('/user/list?pageSize=10000&pageNo=1', 
                {
                        username: ''
                });
                if (res.code != 10000) {
                    return this.$message.error(res.message);
                }
                this.userlist = res.data.result;
            },


            //// 选择用户
            // userChange(val) {
            //     this.newAdminUserInfo.usrId = val
            // },
            //// 编辑时选择用户
            // userChange2(val) {
            //     this.editAdminUserInfoObj.usrId = val
            // },

            // 显示添加对话框
            addAdminUserInfo() {
                this.addAdminUserInfoVisible = true;
            },

            // 取消添加
            addAdminUserInfoCancel() {
                this.$refs.addAdminUserInfoRef.resetFields();
                this.addAdminUserInfoVisible = false;
                this.$message.info('新增管理员信息取消');
            },
            // 确认添加
            addAdminUserInfoOk() {
                this.$refs.addAdminUserInfoRef.validate(async (valid) => {
                    if (!valid) return this.$message.error("参数不符合要求请重新输入");
                    const { data: res } = await this.$axios.post("/adminUsrInfo", this.newAdminUserInfo);
                    if (res.code != 10000) {
                        return this.$message.error(res.message);
                    }
                    this.$refs.addAdminUserInfoRef.resetFields();
                    this.addAdminUserInfoVisible = false;
                    this.$message.success('新增管理员信息成功');
                    this.getAdminUserInfoList();
                });
            },

            // 删除管理员信息
            deleteAdminUserInfo(id) {
                this.$confirm({
                    title: '提示：请再次确认',
                    content: '确定删除此条信息吗?一旦删除，不可恢复。',
                    onOk: async () => {
                        const res = await this.$axios.delete(`/adminUsrInfo/${id}`);
                        console.log(res);
                        if (res.data.code != 10000) {
                            return this.$message.error(res.message);
                        }
                        this.$message.success('删除成功');
                        this.getAdminUserInfoList();
                    },
                    onCancel: () => {
                        this.$message.info('操作已取消');
                    },
                });
            },

            //显示编辑管理员信息对话框
            async showEditAdminUserInfo(id) {
                this.editAdminUserInfoVisible = true;
                const { data: res } = await this.$axios.get(`/adminUsrInfo/${id}`);
                this.editAdminUserInfoObj = res.data;
                this.editAdminUserInfoObj.id = id;
            },
            //编辑管理员信息确认
            editAdminUserInfoOk() {
                this.$refs.editAdminUserInfoRef.validate(async (valid) => {
                    if (!valid) return this.$message.error("参数不符合要求请重新输入");

                    const { data: res } = await this.$axios.put(`/adminUsrInfo`, {
                        id : this.editAdminUserInfoObj.id,
                        usrId: this.editAdminUserInfoObj.usrId,
                        nickname: this.editAdminUserInfoObj.nickname,
                        motto: this.editAdminUserInfoObj.motto,
                        address: this.editAdminUserInfoObj.address,
                        personalInfo: this.editAdminUserInfoObj.personalInfo,
                        personalIntroduction: this.editAdminUserInfoObj.personalIntroduction
                    });
                    if (res.code != 10000) {
                        return this.$message.error(res.message);
                    }
                    this.$refs.editAdminUserInfoRef.resetFields();
                    this.editAdminUserInfoVisible = false;
                    this.$message.success('编辑信息成功');
                    this.getAdminUserInfoList();
                });
            },

            // 编辑用户取消
            editAdminUserInfoCancel() {
                this.$refs.editAdminUserInfoRef.resetFields();
                this.editAdminUserInfoVisible = false;
                this.$message.info('编辑取消');
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