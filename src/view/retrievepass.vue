<template>
    <!-- 登录 -->
    <div class="repass" :style="backgroundDiv">

            <div class="repassdiv">
                <h1 class="repasstitle">找回密码</h1>
               
                <el-input class="repassusernumber" v-model="user_number" placeholder="请输入账号"></el-input>
                <el-input class="repasspassword" v-model="pass_word" show-password placeholder="请输入密码"></el-input>
                <el-input class="repassquerypassword" v-model="quer_pass_word" show-password placeholder="请输入确认密码"></el-input>
                <div class="repasscodediv">
                    <el-input class="repassusercode" v-model="user_code" placeholder="输入验证码"></el-input>
                    <el-button class="repassusercodebutton" :disabled="codebuttondisabled" v-on:click="codeclick">{{codecal}}</el-button>
                </div>
                  <el-button class="repasssubmitlogin" type="primary" v-on:click="loginclick">确定</el-button>
            </div>



    </div>
</template>
<script>
    export default{
        name:"retrievepass",
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
                    if(res.code == 1){
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
                
                this.$api.updatepass(this.user_number,this.pass_word,this.user_code).then(res => {
                    if(res.code == 1){
                        //成功跳到登录界面
                        this.$message({
                            message:"找回成功",
                            type:"success"
                        })
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
    .repass{
        min-height: 100vh;
        display: flex;
        flex-direction:row;
        justify-content:center;
        align-items:center;
    }

    .repasstitle{
        width: 100%;
        text-align: center;
    }
    .repassusernumber{
        float: left;
        margin-top: 20px;
    }
    .repasspassword{
        float: left;
        margin-top: 20px;
    }
    .repassquerypassword{
        float: left;
        margin-top: 20px;
    }
    .repasssubmitlogin{
        float: left;
        margin-top: 20px !important;
        width: 100%;
    }
    .repassdiv{
        width: 400px;
        background-color: #ffffff;
        padding: 20px 20px 40px 20px;
        border-radius: 20px;
        
    }
    .repasscheckedxuzhi{
        float: left;
        margin-top: 20px;
    }
    .repasssignup{
        float: left;
        text-align: right;
        width:100%;
        margin-top: 30px;
    }
    .repassusercode{
        width: 250px !important;
    }
    .repassusercodebutton{
        width: 120px;
        float: right;
    }
    .repasscodediv{
        width: 400px;
        float: left;
        margin-top: 20px;
    }
</style>


