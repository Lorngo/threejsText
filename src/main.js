import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'assets/js/rem'
import 'assets/js/wx.config'
import 'assets/css/reset.css'
import 'assets/css/base.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import FastClick from 'fastclick'
FastClick.attach(document.body)
Vue.use(Vant)

export default new Vue({
  router,
  render: h => h(App),
}).$mount('#app')