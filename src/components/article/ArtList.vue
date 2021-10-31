<!-- 文章列表页面 -->
<template>
    <div>
        <!-- <h4 style="margin-left: 10px;color: #d6a20f;"文章列表页面</h4> -->
        <a-card>
            <a-row :gutter="20" class="card-row">
                <!-- 搜索框 -->
                <a-col :span="6">
                    <a-input-search v-model="artKeywords.title" placeholder="请输入关键词查找" enter-button allowClear
                        @search="getArtList(pageSize,pageNo)" />
                </a-col>
                
                <a-col :span="6">
                    <a-select defaultValue="请选择分类" style="width: 200px;" @change="cateChange($event)">
                        <a-select-option v-for="cate in cateList" :key="cate.id" :value="cate.id">
                            {{cate.name}}
                        </a-select-option>
                    </a-select>
                </a-col>
                <!-- 添加按钮 -->
                <a-col :span="4">
                    <a-button type="primary" @click="$router.push('/addart')">写文章</a-button>
                </a-col>
            </a-row>

            <!-- 文章信息显示表格 -->
            <a-table :columns="columns" rowKey="id" :pagination="pagination" :data-source="Artlist"
                @change="handleTableChange" bordered>

                <!-- 操作按钮 -->
                <template slot="action" slot-scope="data">
                    <div class="actionSlot">
                        <a-button type="primary" icon="edit" style="margin: 0 5px;"
                            @click="$router.push(`/addart/${data.id}`)">编辑
                        </a-button>
                        <a-button type="danger" icon="delete" style="margin: 0 5px;" @click="deleteArt(data.id)">删除
                        </a-button>

                    </div>
                </template>
            </a-table>


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
        {
            title: '分类',
            dataIndex: 'Category.name',
            width: '10%',
            key: 'name',
            align: 'center',
        },
        {
            title: '文章标题',
            dataIndex: 'title',
            width: '30%',
            key: 'title',
            align: 'center',
        },
        {
            title: '文章描述',
            dataIndex: 'desc',
            width: '30%',
            key: 'desc',
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
                // 文章列表数据
                Artlist: [],
                // 表格列信息（不可少）
                columns,
                // 分页查询参数
                artKeywords:{
                    title:  "",
                    cid:    null
                },
                pageSize: 10,
                pageNo: 1,

                // 分类列表数据
                cateList: [],

            }
        },
        //生命周期 - 创建完成（访问当前this实例）
        created() {
            this.getArtList(this.pageSize,this.pageNo);
            this.getCateList();
        },
        //生命周期 - 挂载完成（访问DOM元素）
        mounted() {

        },
        //方法集
        methods: {
            // 获取文章列表
            async getArtList(pageSize, pageNo) {
                const { data: res } = 
                await this.$axios.post('/article/list?pageSize='+pageSize+'&pageNo='+pageNo, this.artKeywords);
               
                if (res.code != 10000) {
                    return this.$message.error(res.message);
                }
                this.Artlist = res.data.result;
                this.pagination.total = res.data.total;
            },

            // 获取分类列表
            async getCateList() {
                let categoryVO = {
                    name: ""
                }
                const { data: res } = await this.$axios({
                    method: 'post',
                    url:'/category/list?pageSize=10000&pageNo=1',
                    data: categoryVO
                } )
                if (res.code != 10000) {
                    return this.$message.error(res.message);
                }
                this.cateList = res.data.result;
            },


            //分类选择事件
            cateChange(val) {
                this.artKeywords.cid = val,
                this.getArtList(this.pageSize,this.pageNo);
            },


            // 处理表格分页改变事件
            handleTableChange(pagination, filters, sorter) {
                var pager = { ...this.pagination }
                pager.current = pagination.current;
                pager.pageSize = pagination.pageSize;

                if (pagination.pageSize !== this.pagination.pageSize) {
                    pager.current = 1;
                }
                this.pagination = pager;
                this.getArtList(pagination.pageSize, pagination.current);
            },

            // 删除文章
            deleteArt(id) {
                this.$confirm({
                    title: '提示：请再次确认',
                    content: '确定删除此文章吗?一旦删除，不可恢复。',
                    onOk: async () => {
                        const res = await this.$axios.delete(`/article/${id}`);
                        if (res.data.code != 10000) {
                            return this.$message.error(res.message);
                        }
                        this.$message.success('删除成功');
                    },
                    onCancel: () => {
                        this.$message.info('操作已取消');
                    },
                });
            },

       
            //查询分类下的文章
            async getCateArt(id) {
                const { data: res } = await this.$axios.get(`/category/${id}/artlist`);
                if (res.status != 200) {
                    return this.$message.error(res.message);
                }
                this.Artlist = res.data;
                this.pagination.total = res.total;
            }

        }
    }
</script>
<style scoped>
    .actionSlot {
        display: flex;
        justify-content: center;

    }

    .card-row{
        margin-bottom: 10px;
    }
</style>