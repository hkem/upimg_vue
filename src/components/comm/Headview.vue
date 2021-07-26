<template>
        <div class="top-external">
        <div class="top-logo">
            <div class="top-img">
                <el-image class="top-logo-img" :src="logourl" :fit="fit"></el-image>
            </div>
            <div class="top-logo-val">
                Drawing Bed
            </div>
        </div>
        <div class="top-menu">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1" v-on:click="imageupoulclick">上传</el-menu-item>
            <el-menu-item index="2" v-on:click="imagepublicclick">免费图片</el-menu-item>
            <el-menu-item index="3" v-if="privatetrue" v-on:click="imageprivateclick">我的图片</el-menu-item>
            </el-menu>
            <div class="line"></div>
        </div>
        <div v-if="!loginshow">
            <div class="top-nickname" >
                <div class="top-nickname-val divcenter" v-on:click="user">{{ username }}</div>
                <div class="top-out" v-on:click="outlogin">退出</div>
            </div>
            <div class="top-head">
                <el-image class="top-head-head" :src="user_head_url" :fit="fit"></el-image>
            </div>
        </div>
        <div class="top-nickname" v-if="loginshow">
            <router-link to="/signup">
                <div class="top-login">登录</div>
            </router-link>
        </div>

    </div>
</template>
<script>
  export default{
    name:"Headview",
    props:[
        'menuindex'
    ],
    data(){
      return{
            activeIndex: this.menuindex,
            logourl: require('@/assets/img/logo.jpg'),
            fit : "scale-down",
            user_head_url:"",
            loginshow:true,
            username:"",
            privatetrue:false
      }
    },
    created(){
        //获取userdata内容
        let loginbool = this.$common.islogin();
        if(loginbool){
            this.username = this.$common.getuserdata().user_name;
            this.user_head_url = this.$url_web + this.$common.getuserdata().user_head;
            this.privatetrue = true;
        }
        this.loginshow = loginbool === true ? false : true;
    },
    methods:{
        login(){
            this.$router.push({name:"signup"});
        },
        outlogin(){
            this.$confirm('此操作会退出登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                localStorage.setItem("token","");
            this.$common.emptyuserdata();
             this.$message({
                message: '退出成功',
                type: 'success'
            });
            this.$router.push({name:"index"});

            }).catch(() => {

            });
        },
        imagepublicclick(){
            this.$router.push({name:"image_public"});
        },
        imageprivateclick(){
            this.$router.push({name:"image_private"});
        },
        imageupoulclick(){
            this.$router.push({name:"index"});
        },
        user(){
            this.$router.push({name:"user"});
        }
    }
  }
</script>
<style>
    /* 头部 */
    .top-external{
        width: 100%;
        height: 60px;
        padding-top: 20px;
        
    }
    .top-head{
        float: right;
    }
    .top-head-head{
        width: 40px;
        height: 40px;
        border-radius: 1000px;
        margin-top: 10px;
    }
    .top-nickname{
        float: right;
        cursor:pointer;
    }
    .top-nickname-val{
        line-height: 60px;
        padding: 0px 20px;
        width: 80px;
        float: left;

    }
    .top-login{
        width: 80px;
        float: left;
        line-height: 40px;
        text-align: center;
        background-color: #66CCFF;
        border-radius: 10px;
        margin-right: 20px;
        color: #ffffff;
        margin-top: 10px;
    }
    .top-out{
        width: 80px;
        float: left;
        line-height: 40px;
        text-align: center;
        background-color: #FF6666;
        border-radius: 10px;
        margin-right: 20px;
        color: #ffffff;
        margin-top: 10px;
        cursor:pointer;
    }
    .top-menu{
        float: left;
        margin-left: 50px;
    }
    .top-logo{
         float: left;
         width: 100px;
    }
     .top-img{
        width: 100px;
        float: left;
        height: 40px;
    }
    .top-logo-img{
        width: 40px;
        height: 40px;
        border-radius: 1000px;
        margin-left: 30px;
    }
   .top-logo-val{
        width: 100px;
        float: left;
        height: 20px;
        text-align: center;
        font-size: 12px;
        line-height: 20px;
   }
</style>