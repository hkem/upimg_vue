import axios from './http';

//接口
const api = {
  //注册
  register(username,user_number,pass,code){
    return axios.post('/upimg/signup/register',{username,user_number,pass,code});
  },
  //登录
  signin(username,pass){
    return axios.post('/upimg/signup/signin',{username,pass});
  },
  //上传图片
  uploadimg(file){
    return axios.post('/upimg/upload/uploadimg',file);
  },
  //获取列表
  imglist(page){
    return axios.post('/upimg/imglog/imglist',{page});
  },
  //删除
  deleteimglog(id){
    return axios.post('/upimg/imglog/deleteimglog',{id});
  },
  //获取公共图片
  imglistpublic(page){
    return axios.post('/upimg/imglog/imglist_public',{page});
  },
  //发送验证码
  setmailcode(user_number){
    return axios.post('/upimg/signup/setmailcode',{user_number});
  },
  //获取用户数据
  userdata(){
    return axios.post('/upimg/user/userdata',{});
  },
  //用户上传头像
  useruploadimg(file){
    return axios.post('/upimg/user/useruploadimg',file);
  },
  //更新用户数据
  edituserdata(user_head,user_name){
    return axios.post('/upimg/user/edituserdata',{user_head,user_name});
  },
  //发送验证码
  getusercode(){
    return axios.post('/upimg/user/getusercode',{});
  },
  //修改密码
  usereditpass(pass,code){
    return axios.post('/upimg/user/usereditpass',{pass,code});
  },
  //找回密码
  updatepass(user_number,pass,code){
    return axios.post('/upimg/signup/updatepass',{user_number,pass,code});
  },
  //浏览加1
  browse(id){
    return axios.post('/upimg/imglog/browse',{id});
  },


  




}

export default api;


