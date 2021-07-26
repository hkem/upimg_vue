<template>
    <!-- 登录 -->
    <div class="image_public">

        <!-- 首页 -->
    <Headview v-bind:menuindex="'2'"></Headview>
    <el-row class="imagepublicgeli">
 
    </el-row>
    <el-row>
  <el-col :span="4"><div class="moren"></div></el-col>
  <el-col :span="16">
      <div class="publiccenter" >
        <div class="imagelistli" v-for="(item,index) in list" :key="index">
            <div class="iamgeimg">
                <el-image class="iamgeimgimg" v-on:click="browseclick(item.imglog_id,index)" :src="item.img_path" :fit="fit" :preview-src-list="srcList"></el-image>
            </div>
            <div class="imageuser">
                <div class="imageuserimag">
                    <el-avatar class="imageuserimgii" :fit="headfit" :src="item.user_head" ></el-avatar>
                </div>
                <div class="username">{{item.user_name}}</div>
                <div class="rowsediv">
                    <el-image class="browseimg" :src="browse_url" :fit="fit"></el-image>
                    <div class="browseval">{{item.browse}}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="pagediv">
         <el-pagination
        background
        layout="prev, pager, next"
        :page-size="30"
        :total="pagecount"
        v-on:prev-click="prevclick"
        v-on:next-click="nextclick"
        v-on:current-change="currentchangeclick"
        >
        </el-pagination>
    </div>
    
  </el-col>
  <el-col :span="4"><div class="moren"></div></el-col>
</el-row>
    
        <!-- 底部 -->
    <Footview></Footview>
    </div>

</template>
<script>
    export default{
        name:"image_public",
        data(){
            return{
                currentchange:1,
                pagecount: 0,
                fit:"scale-down",
                browse_url:require('@/assets/img/browse.png'),
                srcList:[],
                headfit:"scale-down",
                url_web:this.$url_web,
                list:[
                    // {
                    //     "imglog_id": 20,
                    //     "u_id": 10,
                    //     "img_path": "/uploaded/2021/06/27/b2798a86-7256-49f3-ba46-252d81ca443a.jpg",
                    //     "created_at": "2021-06-27 15:29:24",
                    //     "updated_at": "2021-06-27 15:29:24",
                    //     "browse": 0,
                    //     "page": 0,
                    //     "pagecount": 0,
                    //     "listcount": 0,
                    //     "user_head": "https://z3.ax1x.com/2021/06/23/Ru4Yad.jpg",
                    //     "user_name": "453453"
                    // },
                ]
            }
        },
        created(){
            //获取数据
            this.getlist(this.currentchange);
        },
        methods:{
            //上一页
            prevclick(){
                this.currentchange -= 1;
                this.getlist(this.currentchange);
            },
            //下一页
            nextclick(){
                this.currentchange += 1;
                this.getlist(this.currentchange);           
            },
            //点击页数
            currentchangeclick(currentpage){
                this.currentchange = currentpage;
                this.getlist(this.currentchange);
            },
            getlist(page){
                this.$api.imglistpublic(page).then(res => {
                    if(res.code == 1){
                        //成功跳到登录界面
                        let data = res.data;
                        this.pagecount = data.page_count;

                        let srcListarr = [];

                        //处理list数据
                        let list = data.list;
                        for (let index = 0; index < list.length; index++) {
                            list[index].img_path = this.url_web+list[index].img_path;
                            list[index].user_head = this.url_web+list[index].user_head;
                            srcListarr.push(list[index].img_path);
                        }
                        this.srcList = srcListarr;
                        this.list = list;
                    }
                })
            },
            browseclick(imglog_id,aindex){
                console.log(5555);
                this.$api.browse(imglog_id).then(res => {
                    if(res.code == 1){
                        this.list[aindex].browse += 1;
                    }
                })
            }

        }
    }

</script>
<style>
    .moren{
        width: 1px;
        height: 1px;

    }
    .image_public{
        min-height: 100vh;
        width: 100%;
        /* position:relative; */
    }
    .imagepublicgeli{
        height: 30px;
    }
    .infinite-list-item{

    }
    .infinite-list{
        width: 100%;
        text-align: center;
    }
   .publiccenter{
       width: 100%;
       float: left;
       min-height: 100px;
   }
   .pagediv{
       height: 50px;
       width: 100%;
       float: left;
       margin-bottom: 50px;
   }
   .imagelistli{
       width: 250px;
       height: 250px;
       float: left;
       padding: 10px;
   }

   .iamgeimg{
        width: 250px;
        height: 200px;
        float: left;
   }
      .iamgeimgimg{
       width: 250px;
        height: 200px;
   }
   .imageuser{
       width: 250px;
       height: 30px;
       float: left;
       margin-top: 10px;
   }
   .imageuserimag{
       width: 30px;
       height: 30px;
       float: left;
   }
   .imageuserimgii{
        width: 100% !important;
        height: 30px !important;
   }
   .imageuserimgii img{
        width: 100%;
   }
   .username{
       float: left;
       line-height: 30px;
       padding-left: 10px;
       font-size: 12px;
   }
   .rowsediv{
       float: left;
       float: right;
   }
   .browseimg{
       width: 15px;
       height: 15px;
       float: left;
       margin-top: 7.5px;
   }
   .browseval{
       float: left;
       font-size: 12px;
       line-height: 30px;
   }
</style>


