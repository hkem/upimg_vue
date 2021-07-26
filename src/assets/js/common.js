


const common = {
    // 判断当前用户是否登录
     islogin(){
       let token = localStorage.getItem("token");
        if(token){
            return true;
        }else{
            return false;
        }
    },
    //保存用户信息
     setuserdata(user_id,user_head,user_name){
        localStorage.setItem("user_id",user_id);
        localStorage.setItem("user_head",user_head);
        localStorage.setItem("user_name",user_name);
    },

    //获取用户信息
    getuserdata(){
        let user_id = localStorage.getItem("user_id");
        let user_head = localStorage.getItem("user_head");
        let user_name = localStorage.getItem("user_name");
        return {"user_id":user_id,"user_head":user_head,"user_name":user_name} 
    },
    //清空用户信息
    emptyuserdata(){
        localStorage.setItem("user_id",0);
        localStorage.setItem("user_head","");
        localStorage.setItem("user_name","");
    }
    
}

    export default common;  
