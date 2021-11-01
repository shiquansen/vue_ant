// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import mavonEditor from 'mavon-editor'

import axios from 'axios'
Vue.prototype.$axios = axios;

Vue.use(Antd)
Vue.use(mavonEditor)


axios.defaults.baseURL = "http://localhost:8090/";

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';  //配置请求头的内容协商

// axios.interceptors.request.use(config => {
//   config.headers.Authorization = `Bearer ${window.sessionStorage.getItem('token')}`;
//   return config;
// });

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
