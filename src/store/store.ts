import Vue from "vue";
import Vuex from "vuex";

import board from "./board";
import task from "./task";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    board,
    task
  },
  state: {},
  mutations: {},
  actions: {}
});
