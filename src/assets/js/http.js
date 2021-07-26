import axios from 'axios'
import ElementUI from 'element-ui';
import qs from 'qs'
import url from './domain'
import { Loading } from 'element-ui';
import router from '../../router';

//请求中状态参数
let loadingStatus = 0; //0正常 1请求中
let loading = null;
let _this = this;
/**
 * toast提示
 */
const toastTip = function(msg){
  ElementUI.Message.error(msg);
}

//配置请求
const instance = axios.create({
  method:"POST",
  baseURL:url,
  timeout:3000,
  headers:{
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})


//请求拦截
instance.interceptors.request.use(config => {
  //请求中弹窗
  if(loadingStatus == 0){
    loading = Loading.service({
      lock: true,
      text: '请求中',
      spinner: 'el-icon-loading',
      background: 'rgba(f, f, f, 0.7)'
    });
  };
  //更改请求状态
  loadingStatus++;
  //获取token
  const token = localStorage.getItem("token");
  if(token){
    config.headers.token = token;
  }

  //序列化请求参数 这里判断data = type=upload 不序列化
  let datatype= config.data instanceof FormData
  if(datatype != true){
    config.data = qs.stringify(config.data);
  }
  return config;
},error=>{
  Promise.reject(error); //异步输出
  loadingStatus--;
  loadingStatus == 0 ? loading.close() : "";
}
)

//响应拦截器
instance.interceptors.response.use(
  response => {
    //关闭提示
    loadingStatus--;
    loadingStatus == 0?loading.close():"";
    //判断响应的状态
    if(response.status === 200){
      //请求通过  判断api接口返回状态
      if(response.data.code == 1){
        return Promise.resolve(response.data);
      }else if(response.data.code == -100){
        router.push({name:"signup"});
        //重新登录页面
        return Promise.resolve(response.data)
      }else{
        //错误提示
        toastTip(response.data.msg);
        return Promise.resolve(response.data)
      }
    }else{
      return Promise.resolve(response.data);
    }
  },error=>{
    loadingStatus--;
    loadingStatus==0?loading.close():''
    if(error.response) {
      //跳转到xx页面
      toastTip(response.data.msg);
      // return Promise.reject(error.response);
    }else{
      toastTip("网络错误");
    }
  }
)

export default instance;







