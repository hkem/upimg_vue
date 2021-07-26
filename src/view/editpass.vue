<template>
    <!-- 登录 -->
    <div class="user">
    <!-- 首页 -->
    <Headview></Headview>
    
    <!-- 中间 -->
    <el-row>
        <div class="userdata">
            <div class="userli">
                <div class="usertitle">新密码：</div>
                <div class="usercenter">
                    <el-input v-model="pass" show-password></el-input>
                </div>
            </div>
            <div class="userli">
                <div class="usertitle">确认密码：</div>
                <div class="usercenter">
                    <el-input v-model="query_pass" show-password></el-input>
                </div>
            </div>
            <div class="userli">
                <div class="usertitle">验证码：</div>
                <div class="usercenter">
                    <el-input class="usercode" v-model="user_code" placeholder="输入验证码"></el-input>
                    <el-button class="usercodebutton" :disabled="codebuttondisabled" v-on:click="codeclick">{{codecal}}</el-button>
                </div>
            </div>
            <div class="userli">
                <div class="usertitle"></div>
                <div class="usercenter" style="margin-left: 100px;">
                    <el-button type="primary" v-on:click="edituserclick">更改信息</el-button>
                </div>
            </div>

        </div>
    </el-row>
    
    <!-- 底部 -->
    <Footview></Footview>
    </div>
</template>
<script>
    export default{
        name:"editpass",
        data(){
            return{
                pass:"",
                query_pass:"",
                user_code:'',
                codebuttondisabled:false,
                codecal:"发送验证码",
                codetime:60,
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
                this.$api.getusercode().then(res => {
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
            edituserclick(){
               if(this.pass == ""){
                   this.$message.error("新密码不能为空");
                   return;
               }
               if(this.query_pass == ""){
                   this.$message.error("确认密码不能为空");
                   return;
               }
               if(this.pass != this.query_pass){
                   this.$message.error("确认密码与新密码不一致");
                   return;
               }
                if(this.user_code == ""){
                   this.$message.error("验证码不能为空");
                   return;
               }
               this.$api.usereditpass(this.pass,this.user_code).then(res => {
                   if(res.code == 1){
                        this.$message({
                            message:"修改成功",
                            type:"success"
                        })
                   }
                })
            },
            
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
    .userli{
        float: left;
        width: 100%;
        margin-bottom: 30px;
    }
    .usertitle{
        float: left;
        width: 100px;
        line-height: 40px;
        
    }
    .usercenter{
        float: left;
        width: 450px;
    }
    .useriamgesrc{
        width: 100px;
        height: 100px;
    }
    .usercode{
        width: 300px !important;
    }
    .usercodebutton{
        width: 120px;
        float: right;
    }

</style>