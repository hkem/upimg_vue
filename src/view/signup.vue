<template>
    <!-- 注册 -->
    <div class="sigsignup" :style="backgroundDiv">
            <div class="sigsignupdiv">
                <h1 class="sigsignuptitle">登录账号</h1>
                <el-input class="sigusernumber" v-model="user_number" placeholder="请输入账号"></el-input>
                <el-input class="sigpassword" v-model="pass_word" show-password placeholder="请输入密码"></el-input>
                <el-button class="sigsubmitlogin" v-on:click="signupclick" type="primary">登录</el-button>
                <div class="sigoperation">
                    <div class="siglogin" v-on:click="login">没有账号？前往注册</div>
                    <div class="sigretrievepass" v-on:click="retrieveclick">忘记密码？</div>
                </div>
                
            </div>
    </div>
</template>
<script>
    export default{
        name:"signup",
        data(){
            return{
                user_number:"",
                pass_word:"",
                checked:false,
                backgroundDiv: {
                    backgroundImage: 'url(' + require('../assets/img/home_cover_1518289247327_8defbb.png') + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100%',
                }
            }
        },
        methods:{
            signupclick(){
                if(this.user_number == ""){
                    this.$message.error("请填写账号");
                    return;
                }
                if(this.pass_word == ""){
                    this.$message.error("请填写密码");
                    return;
                }
                this.$api.signin(this.user_number,this.pass_word).then(res=>{
                    if(res.code == 1){
                        //保存token
                        let data = res.data;
                        localStorage.setItem("token",data.token);
                        this.$common.setuserdata(data.user_id,data.user_head,data.user_name);
                        //跳到主页
                        this.$router.push({name:"index"});
                    }
                })

            },
            login(){
                this.$router.push({name:"login"});
            },
            retrieveclick(){
                this.$router.push({name:"retrievepass"});
            }
        },
    }

</script>
<style>
    .sigsignup{
        min-height: 100vh;
        display: flex;
        flex-direction:row;
        justify-content: center;
        align-items: center;
        background-position: top;
        background-repeat: no-repeat, repeat;
    }

    .sigsignuptitle{
        width: 100%;
        text-align: center;
    }
    .sigusernumber{
        float: left;
        margin-top: 20px;
    }
    .sigpassword{
        float: left;
        margin-top: 30px;
    }
    .sigsubmitlogin{
        float: left;
        margin-top: 30px !important;
        width: 100%;
    }
    .sigsignupdiv{
        width: 400px;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 20px;
    }
    .sigcheckedxuzhi{
        float: left;
        margin-top: 20px;
    }
    .siglogin{
        float: right;
        cursor:pointer;
    }
    .sigoperation{
        float: left;
        text-align: left;
        width:100%;
        margin-top: 30px;
        cursor:pointer;       
    }
</style>

