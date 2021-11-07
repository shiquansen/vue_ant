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


axios.defaults.baseURL = "http://localhost:8090/admin/";

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';  //配置请求头的内容协商

axios.interceptors.request.use(config => {
  config.headers.Authorization = `${window.sessionStorage.getItem('token')}`;
  return config;
});

// 2. 响应拦截
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if( response.data.code == 10005 || response.data.code == 10006){
    window.sessionStorage.removeItem('token');
  }
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
