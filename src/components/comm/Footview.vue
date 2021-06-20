<template>
     <div class="foot-content">
     <div class="foot-keep">Copyright © 2015-2021 Drawing Bed 保留版权所有. 蜀ICP备88888888号-1</div>
     <div class="foot-keep-my">Theme by Puock</div>
</div>
</template>
<script>
    export default{
        name:"Footview",
        data(){
        return{
               
        }
        },
        methods:{
            
        
        }
    }
</script>
<style>
    /* 底部 */
    .foot-content{
        height: 150px;
        background-color: slategray;
        position: absolute;
        bottom: -250px;
        width: 100%;
    }
   .foot-keep{
       float: left;
       width: 100%;
       height: 20px;
       line-height: 20px;
       text-align: center;
       margin-top: 50px;
   }
   .foot-keep-my{
       float: left;
        width: 100%;
       height: 20px;
       line-height: 20px;
       text-align: center;
       margin-top: 10px;
   }
</style>