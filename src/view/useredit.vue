<template>
    <!-- 登录 -->
    <div class="user">
    <!-- 首页 -->
    <Headview></Headview>
    
    <!-- 中间 -->
    <el-row>
        <div class="userdata">
            <div class="userli">
                <div class="usertitle">头像：</div>
                <div class="usercenter">
                    <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :http-request="uplfile"
                    :show-file-list="false"

                    >
                    <img v-if="userurl" :src="userurl" class="useravatar">
                    </el-upload>
                </div>
            </div>
            <div class="userli">
                <div class="usertitle">昵称：</div>
                <div class="usercenter">
                    <el-input v-model="username"></el-input>
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
        name:"edituser",
        data(){
            return{
                username:"",
                fit:"fit",
                userurl:"",
                user_head:"",
                user_id:0
            }
        },
        created(){
            //获取数据
            this.$api.userdata().then(res => {
                let data = res.data;
                this.username = data.user_name;
                this.userurl = this.$url_web + data.user_head;
                this.user_head =  data.user_head;
                this.user_id = data.user_id;
            })
        },
        methods:{

            beforeAvatarUpload(file) {
                const isJPG = file.type === "image/jpg" || file.type === "image/jpeg" || file.type === "image/png";
                const issize = file.size / 1024 / 1024 < 2;
                if(!isJPG){
                    this.$message({
                        showClose: true,
                        message: '仅支持上传jpg/png图片',
                        type: 'error'
                    });
                    return false;
                }
                if(!issize){
                    this.$message({
                        showClose: true,
                        message: '仅支持上传2M图片',
                        type: 'error'
                    });
                    return false;
                }
            },
            uplfile(item){
                let _this = this;
                let fileObj = item.file;
                const form = new FormData(); // FormData 对象
                form.append("file", fileObj); // 文件对象  'upload'是后台接收的参数名
                this.$api.useruploadimg(form).then(res => {
                    if(res.code == 1){
                        let resdata = res.data;
                        this.userurl = this.$url_web + resdata.img_url;
                        this.user_head = resdata.img_url;
                    }
                })  
            },
            edituserclick(){
                if(this.username == ""){
                    this.$message.error('昵称不能为空');
                    return;
                }
                if(this.user_head == ""){
                    this.$message.error('头像不能为空');
                    return;
                }
                this.$api.edituserdata(this.user_head,this.username).then(res => {
                    if(res.code == 1){
                        this.$common.setuserdata(this.user_id,this.user_head,this.username);
                        this.$message({
                            message:"更新成功",
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


.avatar-uploader .el-upload {
   width: 100px;
   height: 100px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .useravatar {
    width: 100px;
   height: 100px;
    display: block;
    border-radius: 1000px;

  }

</style>