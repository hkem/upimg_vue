// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
Vue.use(Vuex)


//ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
Vue.use(ElementUI);

import api from './assets/js/api'
Vue.prototype.$api = api

Vue.config.productionTip = false

//引入公共js
import common from './assets/js/common'
Vue.prototype.$common = common


import store from './store'
Vue.prototype.$url_web = "http://159.75.47.58:8080/upimg"

//引入js
import "./assets/js/require_context"
import "./assets/css/index.css";

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
})
