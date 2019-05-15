import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import store from "./store";
import routes from "./routes.js";
import firebase from "firebase";
import variables from "./variables";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({ routes });

firebase.initializeApp(variables.firebaseConfig);

new Vue({
  store,
  render: h => h(App),
  router
}).$mount("#app");
