<template>
    <a-layout-sider theme="light" breakpoint="lg" v-model="collapsed">
        <div class="logo">
            <div v-if="collapsed">
                <img src="https://s1.ax1x.com/2020/10/11/0cZtZ6.jpg" alt=""
                    style="width: 48px;height: 48px;border-radius: 50%;">
            </div>
            <div v-else>
                <span>{{collapsed ? "" : "※江上一夜孤※"}}</span>
            </div>
        </div>

        <a-menu theme="light" mode="inline" @click="goToPage">
            <a-menu-item key="index">
                <a-icon type="dashboard" /><span>仪表盘</span>
            </a-menu-item>
            <!-- 文章管理 -->
            <a-sub-menu>
                <span slot="title">
                    <a-icon type="file" /><span>文章管理</span></span>
                <a-menu-item key="addart">
                    <a-icon type="form" /><span>写文章</span>
                </a-menu-item>
                <a-menu-item key="artlist">
                    <a-icon type="snippets" /><span>文章列表</span>
                </a-menu-item>
            </a-sub-menu>
            <!-- 分类管理 -->
            <a-menu-item key="catelist">
                <a-icon type="unordered-list" /><span>分类列表</span>
            </a-menu-item>


            <!-- 用户管理 -->
            <a-sub-menu>
                <span slot="title">
                    <a-icon type="user" /><span>用户管理</span>
                </span>

                <a-menu-item key="userlist">
                    <a-icon type="contacts" /><span>用户列表</span>
                </a-menu-item>
                <a-menu-item key="infolist">
                    <a-icon type="schedule" /><span>管理员信息</span>
                </a-menu-item>
            </a-sub-menu>
        </a-menu>


    </a-layout-sider>
</template>

<script>
    export default {
        data() {
            return {
                collapsed: false,
            }
        },
        created() {

        },
        mounted() {

        },
        //方法集
        methods: {
            goToPage(item) {
                this.$router.push('/' + item.key).catch((err) => err);
            }
        }
    }
</script>

<style scoped>
    .logo {
        height: 48px;
        margin: 8px;
        /* background-color: white; */
        color: #ffd04b;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
    }
</style>