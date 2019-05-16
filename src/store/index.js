import Vue from "vue";
import Vuex from "vuex";
import addresses from "./modules/addresses";
import authenicate from "./modules/authenicate";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    addresses,
    authenicate
  }
});
