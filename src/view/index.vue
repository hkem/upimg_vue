<template>

<div class="app-content">
<!-- 首页 -->
<Headview v-bind:menuindex="'1'"></Headview>
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
                    </div>
                    <div class="img-li" v-for="item in imglist" :key="item.id">
                        <imagepath v-bind:imgurl="item.imagepath"></imagepath>
                    </div>
                    <div class="dibu"></div>
            </el-col>        
            <el-col :xs="1" :sm="2" :md="4" :lg="4" :xl="8" class="default-clo"></el-col>
        </el-row>
</div>
<!-- 底部 -->
<Footview></Footview>
</div>
</template>
<script>


import imagepath from "../components/individual/ImagePath.vue"

export default {
    name:"index",
    data(){
        return {
            imglistcount:0,
            imglist:[
                // {id:1,imagepath:"http://159.75.47.58:8080/upimg/uploaded/2021/06/27/a4e56677-378b-44f4-b8ac-9ad38aedf126.jpg"},
                // {id:2,imagepath:"http://159.75.47.58:8080/upimg/uploaded/2021/06/27/a4e56677-378b-44f4-b8ac-9ad38aedf126.jpg"},
                // {id:3,imagepath:"http://159.75.47.58:8080/upimg/uploaded/2021/06/27/a4e56677-378b-44f4-b8ac-9ad38aedf126.jpg"},
                // {id:4,imagepath:"http://159.75.47.58:8080/upimg/uploaded/2021/06/27/a4e56677-378b-44f4-b8ac-9ad38aedf126.jpg"}
            ]
        }
        
    },
     components: {
        "imagepath":imagepath
          
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
            this.$api.uploadimg(form).then(res => {
                let resdata = res.data;
                    if(res.code === 1){
                        let data = res.data;
                        //加入列表
                        _this.imglistcount += 1;
                        _this.imglist.unshift({id:_this.imglistcount,imagepath:data.img_url});
                    }else{
                        this.$message({
                            showClose: true,
                            message: resdata.msg,
                            type: 'error'
                        });
                    }
            })  
        }

    }
}
</script>

<style>
    /*  */
    .app-content{
        /* position:relative; */
        min-height: 100vh;
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
    .img-li{
        width: 100%;
        margin-top: 20px;
        float: left;
    }
    .dibu{
        float: left;
        width: 100%;
        height: 200px;
    }
    
</style>