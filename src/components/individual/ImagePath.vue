<template>
    <div>
        
            <el-row class="submit-row" v-if="showimgbool">
                <el-image class="show-img" :src="imgurl" :fit="contain"></el-image>
            </el-row>
            <div class="middle-url">
                <div class="url-blade">图片地址：</div>
                <div class="url-val"><el-input :value="imgurl" placeholder="请输入内容"></el-input></div>
            </div>
        
    </div>
</template>
<script>
export default{
    name:"ImagePath",
    props:{
        "imgurl":String
    },
    data:function(){
        return {
            showimgbool:true,
            contain:"contain"
        }
    },
    methods:{
        
    },
    mounted:function(){
            
    }

    
}

</script>
<style>

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
</style>