<template>

<div class="app-content">
<!-- 首页 -->
<Headview></Headview>
<!-- 中间 -->
 <div class="middle-content">
        <el-row class="middle-row">
            <el-col :xs="1" :sm="2" :md="4" :lg="6" :xl="8" class="default-clo"></el-col>
            <el-col :xs="22" :sm="20" :md="16" :lg="12" :xl="8" class="default-clo">
                
                    <div class="middle-upload">
                        <el-upload
                        class="upload-demo"
                        drag
                        :before-upload="BeforeUpload"
                        :http-request="uplfile"
                        action=""
                        :auto-upload="true"
                        :show-file-list="false"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10M</div>
                        </el-upload>
                        <el-row class="submit-row" v-if="showimgbool">
                            <el-image class="show-img" :src="imgurl" :fit="contain"></el-image>
                        </el-row>
                    </div>
                    <div class="middle-url">
                        <div class="url-blade">图片地址：</div>
                        <div class="url-val"><el-input :value="imgurl" placeholder="请输入内容"></el-input></div>
                    </div>    
            </el-col>        
            <el-col :xs="1" :sm="2" :md="4" :lg="4" :xl="8" class="default-clo"></el-col>
        </el-row>
</div>
<!-- 底部 -->
<Footview></Footview>
</div>
</template>
<script>


export default {
    name:"index",
    data(){
        return {
            imgurl:"",
            contain:"contain",
            showimgbool:false
        }
        
    },
     components: {

          
  },
    methods:{
        BeforeUpload(file){
            
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
            this.$axios.post('/upload/uploadimg',form)
            .then(function (response) {
                if(response.status === 200){
                    let resdata = response.data;
                    if(resdata.code === 1){
                        let data = resdata.data;
                        _this.imgurl = data.img_url;
                        _this.showimgbool = true;
                    }else{
                        this.$message({
                            showClose: true,
                            message: resdata.msg,
                            type: 'error'
                        });
                    }


                }else{
                    this.$message({
                        showClose: true,
                        message: '上传失败，请联系管理员',
                        type: 'error'
                    });
                }


                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            
        }

    }
}
</script>

<style>
    /*  */
    .app-content{
        position:relative;
        
    }
    /* 中间 */
    .middle-content{
        width: 100%;
        margin-top: 100px;
    }
    .middle-upload{
        float: left;
        width: 100%;
    }
    .middle-row{
        /* width: 100%; */
        border: 1px solid #ffffff;
    }
    .default-clo{
        border: 1px solid #ffffff;
    }
    .submit-row{
        line-height: 80px;
        text-align: center;
        height: 500px;
        width: 100%;
        margin-top: 20px;
    }
    .show-img{
         height: 500px;
        width: 100%;
    }
    .middle-url{
        float: left;
        width: 100%;
        margin-top: 20px;
    }
   
    .url-blade{
        width: 100%;
        text-align: center;
        float: left;
        line-height: 40px;
        text-align: left;
    }
    .url-val{
        float: left;
        width: 100%;
    }
</style>