import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/main.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.prototype.$EventBus = new Vue();
Vue.use(BootstrapVue)

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
