import Vue from 'vue'
import Router from 'vue-router'




Vue.use(Router)
//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path:'/',
      name:'index',
      component:()=>import('@/view/index.vue'),
    },
    {
      path:'/signup',
      name:'signup',
      component:()=>import('@/view/signup.vue'),
    },
    {
      path:'/login',
      name:'login',
      component:()=>import('@/view/login.vue'),
    },
    {
      path:'/image_public',
      name:'image_public',
      component:()=>import('@/view/image_public.vue'),
    },
    {
      path:'/image_private',
      name:'image_private',
      component:()=>import('@/view/image_private.vue'),
    },
    {
      path:'/user',
      name:'user',
      component:()=>import('@/view/user.vue'),
    },
    {
      path:'/useredit',
      name:'useredit',
      component:()=>import('@/view/useredit.vue'),
    },
    {
      path:'/editpass',
      name:'editpass',
      component:()=>import('@/view/editpass.vue'),
    },
    {
      path:'/retrievepass',
      name:'retrievepass',
      component:()=>import('@/view/retrievepass.vue'),
    },
    
    
    


    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
  ]
})
