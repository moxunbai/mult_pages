import Vue from 'vue'
import Application2 from './application2.vue'
// import router from './router'
import NutUI from '@nutui/nutui';

import "./app2_theme.scss";


NutUI.install(Vue);
Vue.config.productionTip = false

new Vue({
  // router,
  render: h => h(Application2)
}).$mount('#app')