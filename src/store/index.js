import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    state:{
        //存放的键值对就是所要管理的状态
        user_id: 0,
        user_head:"",
        user_name:"",
    },
    mutations:{
        setuserdata (state,setdata) {
            state.user_id = setdata.user_id,
            state.user_head = setdata.user_head,
            state.user_name = setdata.user_name
        },
        clearuserdata (state) {
            state.user_id = 0,
            state.user_head = "",
            state.user_name = ""
        }
    },
    getters:{
        getuserdata(state){
            return {user_id:state.user_id,user_head:state.user_head,user_name:state.user_name}
        }
    }
})

export default store

  