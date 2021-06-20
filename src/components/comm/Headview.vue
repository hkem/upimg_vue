<template>
        <div class="top-external">
        <div class="top-logo">
            <div class="top-img">
                <el-image class="top-logo-img" :src="url" :fit="fit"></el-image>
            </div>
            <div class="top-logo-val">
                Drawing Bed
            </div>
            
            
        </div>
        <div class="top-menu">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">上传</el-menu-item>
            <el-menu-item index="3">免费图片</el-menu-item>
            </el-menu>
            <div class="line"></div>
        </div>
        <div class="top-nickname">
            <div class="top-nickname-val">大家好啊</div>
            <div class="top-out">退出</div>
        </div>
        <div class="top-head">
            <el-image class="top-head-head" :src="url" :fit="fit"></el-image>
        </div>
    </div>
</template>
<script>
  export default{
    name:"Headview",
    data(){
      return{
            activeIndex: '1',
            activeIndex2: '1',
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            fit : "fit",
      }
    },
    methods:{
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>
<style>
    /* 头部 */
    .top-external{
        width: 100%;
        height: 60px;
        margin-top: 20px;
        
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
    }
    .top-nickname-val{
        line-height: 60px;
        padding: 0px 20px;
        width: 80px;
         float: left;
    }
    .top-out{
        width: 80px;
        float: left;
        line-height: 60px;
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