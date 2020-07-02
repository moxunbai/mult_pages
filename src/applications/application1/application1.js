import Vue from 'vue'
import Application1 from './application1.vue'

import NutUI from '@nutui/nutui';

import "./app1_theme.scss";
// import "@nutui/nutui/dist/nutui.scss";
// import "./app1_theme.scss";

NutUI.install(Vue);
Vue.config.productionTip = false

new Vue({
  // router,
  render: h => h(Application1)
}).$mount('#app')