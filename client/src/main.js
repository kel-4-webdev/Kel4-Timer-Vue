import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
// this one is for icons 
// https://stackoverflow.com/questions/57053728/vuetify-icon-not-showing
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
