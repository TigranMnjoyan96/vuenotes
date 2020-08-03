import Vue from "vue";
import App from "./App.vue";
import Material from 'material-design-icons-iconfont'


Vue.use(Material)
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
