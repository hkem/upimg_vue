
<template>
    <!-- 登录 -->
    <div class="user">
    <!-- 首页 -->
    <Headview></Headview>
    
    <!-- 中间 -->
    <el-row>
        <div class="userdata">
            <el-row>
            <div class="useriamge">
                <el-avatar class="useriamgesrc" :src="userurl"></el-avatar>
            </div>
            <div class="usernamediv">
                <div class="editusername">
                    <h1>{{user_name}}</h1>
                </div>
                <P>{{created_at}}</P>
            </div>
            <div class="useriamgedata">
                <el-image class="imagedataimg" :src="imageurl" fit="fit"></el-image>
                <h2>{{imgcount}}</h2>
            </div>
            </el-row>
            <el-row>
                <div class="userseitl">
                    <el-button type="primary" v-on:click="usereditclick">更改信息</el-button>
                    <el-button type="primary" v-on:click="editpassclick">更改密码</el-button>
                </div>
            </el-row>
        </div>
        
    </el-row>
    
    <!-- 底部 -->
    <Footview></Footview>
    </div>
</template>
<script>
    export default{
        name:"user",
        data(){
            return{
                user_name:'',
                user_id:0,
                created_at:'',
                imgcount:0,
                imageurl:require("@/assets/img/image.png"),
                fit:"fit",
                userurl:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            }
        },
        created(){
            //获取数据
            this.$api.userdata().then(res => {
                if(res.code == 1){
                    let data = res.data;
                    this.user_name = data.user_name;
                    this.created_at = data.created_at;
                    this.imgcount = data.imgcount;
                    this.userurl = this.$url_web + data.user_head;
                }
            })
        },
        methods:{
            usereditclick(){
                this.$router.push({name:"useredit"});
            },
            editpassclick(){
                this.$router.push({name:"editpass"});
            }
        }
    }

</script>
<style>

    .user{
        min-height: 100vh;
        width: 100%;
        /* position:relative; */
    }
    .userdata{
        width: 600px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 100px;
    }
    .useriamge{
        width: 100px;
        height: 100px;
        float: left;
    }
    .useriamgesrc{
        width: 100px !important;
        height: 100px !important;
    }
    .usernamediv{
        width: 300px;
        float: left;
        margin-left: 20px;
    }
    .editusername{
        width: 100%;
        float: left;
    }
    .editusername h1{
        float: left;
        margin: 0px;
        line-height: 60px;
    }
    .editdiv{
        float: left;
        line-height: 60px;
        margin-left: 20px;
    }
    .usernamediv p{
        margin: 0px;
        line-height: 40px;
    }
    .useriamgedata{
        float: left;
        height: 100px;
        width: 100px;
    }
    .imagedataimg{
        width: 50px;
        height: 50px;
        margin-left: 25px;
    }
    .useriamgedata h2{
        margin: 0px;
        text-align: center;
        line-height: 50px;
    }
    .userseitl{
        margin-top: 50px;
    }
</style>

























