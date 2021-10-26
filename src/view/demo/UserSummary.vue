<template>
    <div>

        <a-table :columns="columns" :data-source="data" bordered>
            <template slot="name" slot-scope="text">
            <a>{{ text }}</a>
            </template>
            <template slot="title">
            Header
            </template>
            <template slot="footer" >
            Footer
            </template>
        </a-table>
    </div>
</template>


<script>
import axios from 'axios'
export default {
    name: 'userSummary',
    data () {
        return {
            columns : [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    scopedSlots: { customRender: 'name' },
                },
                {
                    title: 'Cash Assets',
                    className: 'column-money',
                    dataIndex: 'money',
                },
                {
                    title: 'Address',
                    dataIndex: 'address',
                },
            ],
            data : [
                {
                    key: '1',
                    name: 'John Brown',
                    money: '￥300,000.00',
                    address: 'New York No. 1 Lake Park',
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    money: '￥1,256,000.00',
                    address: 'London No. 1 Lake Park',
                },
                {
                    key: '3',
                    name: 'Joe Black',
                    money: '￥120,000.00',
                    address: 'Sidney No. 1 Lake Park',
                },
            ]
        };
    },
    mounted(){
       this.getUserList();
    },

    methods:{
        getUserList() {
            let _this = this;
           
            this.$axios({
                method:'get',
                url:    'http://localhost:8090/tUser/getUserList'
                // data:this.qs.stringify({    //这里是发送给后台的数据
                //       userId:this.userId,
                //       token:this.token,
                // })
            }).then((response) =>{          //这里使用了ES6的语法
                console.log(response)       //请求成功返回的数据
            }).catch(
                (error) =>console.log(error)
            )     //请求失败返回的数据
            
        },
    }
}
</script>

<style>
    th.column-money,td.column-money {
    text-align: right !important;
    }
</style>


