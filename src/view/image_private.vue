<template>
    <!-- 登录 -->
    <div class="image_public">

        <!-- 首页 -->
    <Headview v-bind:menuindex="'3'"></Headview>
    <el-row class="imagepublicgeli">
 
    </el-row>
    <el-row>
  <el-col :span="4"><div class="moren"></div></el-col>
  <el-col :span="16">
      <div class="publiccenter">
        <div class="imagelistli" v-for="(item , indexa) in list" :key="indexa">
            <div class="iamgeimg">
                <el-image class="iamgeimgimg" :src="item.img_path" :fit="fit" :preview-src-list="srcList"></el-image>
            </div>
            <div class="imageuser">
                <div class="username">{{item.created_at}}</div>
                <div class="rowsediv">
                    <el-image class="browseimg" :src="delete_url" :fit="fit" v-on:click="deletecilck(item.imglog_id,indexa)"></el-image>
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
        name:"image_private",
        data(){
            return{
                currentchange:1,
                pagecount: 0,
                fit:"scale-down",
                
                delete_url:require('@/assets/img/delete.png'),
                srcList:[
                    
                ],
                list:[
                    // {
                    //     "imglog_id": 4,
                    //     "u_id": 10,
                    //     "img_path": "/uploaded/2021/06/27/36528a4f-d2a0-4399-8fed-03ea7114db1b.jpg",
                    //     "created_at": "2021-06-27 15:29:13",
                    //     "updated_at": "2021-06-27 15:29:13",
                    //     "page": 0,
                    //     "pagecount": 0,
                    //     "listcount": 0
                    // }
                ]
            }
        },
        created(){
            //获取数据
            this.getlist(this.currentchange);
        },
        methods:{
            deletecilck(imglog_id,indexa){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$api.deleteimglog(imglog_id).then(res => {
                        if(res.code == 1){
                            this.list.splice(indexa,1);
                            this.list.srcList(indexa,1);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });          
                });
            },
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
                this.$api.imglist(page).then(res => {
                    if(res.code == 1){
                        //成功跳到登录界面
                        let data = res.data;
                        this.pagecount = data.page_count;

                        //处理list数据
                        let list = data.list;
                        let srcList = [];
                        for (let index = 0; index < list.length; index++) {
                            list[index].img_path = this.$url_web+list[index].img_path;
                            srcList.push(list[index].img_path);
                        }
                        this.list = list;
                        this.srcList = srcList;
                    }
                })
            },
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
        width: 30px;
       height: 30px;
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
       cursor:pointer;
   }
   .browseval{
       float: left;
       font-size: 12px;
       line-height: 30px;
   }
</style>


