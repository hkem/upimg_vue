<template>
    <!-- 登录 -->
    <div class="login" :style="backgroundDiv">

            
            <div class="logindiv">
                <h1 class="logintitle">注册账号</h1>
                <el-input class="usernumber" v-model="username" placeholder="请输入昵称"></el-input>
                <el-input class="usernumber" v-model="user_number" placeholder="请输入账号"></el-input>
                <el-input class="password" v-model="pass_word" show-password placeholder="请输入密码"></el-input>
                <el-input class="querypassword" v-model="quer_pass_word" show-password placeholder="请输入确认密码"></el-input>
                <div class="codediv">
                    <el-input class="loginusercode" v-model="user_code" placeholder="输入验证码"></el-input>
                    <el-button class="loginusercodebutton" :disabled="codebuttondisabled" v-on:click="codeclick">{{codecal}}</el-button>
                </div>
                  <el-checkbox class="checkedxuzhi" v-model="checked">注册须知</el-checkbox>
                  <el-button class="submitlogin" type="primary" v-on:click="loginclick">注册</el-button>
                 <div class="signup" v-on:click="signup">已有账号？前往登录</div>
            </div>



    </div>
</template>
<script>
    export default{
        name:"login",
        data(){
            return{
                user_code:"",
                username:"",
                user_number:"",
                pass_word:"",
                quer_pass_word:"",
                checked:false,
                codebuttondisabled:false,
                codetime:60,
                codecal:"发送验证码",
                 backgroundDiv: {
                    backgroundImage: 'url(' + require('../assets/img/home_cover_1518289247327_8defbb.png') + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100%',
                }
            }
        },
        created(){
            
        },
        methods:{
            
            //点击验证码
        codeclick(){
                if(this.user_number == ""){
                    this.$message.error('请填写账号');
                    return;
                }
                let _this = this
                this.codebuttondisabled = true;
                //接口
                this.$api.imglistpublic(this.user_number).then(res => {
                    if(res == 1){
                        this.$message({message:'邮件发送成功，请前往查看',type: 'success'});
                    }
                    
                })

                //时间
                let codett = setInterval(function(){
                    _this.codetime = parseInt(_this.codetime) - 1;
                    _this.codecal = _this.codetime;
                    if(_this.codetime <= 0){
                        _this.codetime = 60;
                        _this.codecal = "发送验证码";
                        _this.codebuttondisabled = false;
                        clearInterval(codett);
                    }
                },1000);
            },
            loginclick(){


                if(this.username == ""){
                    this.$message.error('请填写昵称');
                    return;
                }
                if(this.user_number == ""){
                    this.$message.error('请填写账号');
                    return;
                }
                
                if(this.pass_word == ""){
                    this.$message.error('请填写密码');
                    return;
                }
                if(this.quer_pass_word == ""){
                    this.$message.error('请填写确认密码');
                    return;
                }
                if(this.quer_pass_word != this.pass_word){
                    this.$message.error('确认密码错误');
                    return;
                }
                if(this.user_code == ""){
                    this.$message.error('请填写验证码');
                    return;
                }
                if(!this.checked){
                    this.$message.error('请勾选注册须知');
                    return;
                }
                this.$api.register(this.username,this.user_number,this.pass_word,this.user_code).then(res => {
                    if(res.code == 1){
                        //成功跳到登录界面
                        this.$router.push({name:"signup"});         
                    }
                    
                })
            },
            signup(){
                this.$router.push({name:"signup"});
            }
        }
    }

</script>
<style>
    .login{
        min-height: 100vh;
        display: flex;
        flex-direction:row;
        justify-content:center;
        align-items:center;
    }

    .logintitle{
        width: 100%;
        text-align: center;
    }
    .usernumber{
        float: left;
        margin-top: 20px;
    }
    .password{
        float: left;
        margin-top: 20px;
    }
    .querypassword{
        float: left;
        margin-top: 20px;
    }
    .submitlogin{
        float: left;
        margin-top: 20px !important;
        width: 100%;
    }
    .logindiv{
        width: 400px;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 20px;
        
    }
    .checkedxuzhi{
        float: left;
        margin-top: 20px;
    }
    .signup{
        float: left;
        text-align: right;
        width:100%;
        margin-top: 30px;
        cursor:pointer;
    }
    .loginusercode{
        width: 250px !important;
    }
    .loginusercodebutton{
        width: 120px;
        float: right;
    }
    .codediv{
        width: 400px;
        float: left;
        margin-top: 20px;
    }
</style>


