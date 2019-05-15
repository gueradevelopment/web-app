import Vue from 'vue';
import Vuex from 'vuex';

import board from './board';
import task from './task';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    board,
    task,
  },
  state: {
    userId: '',
  },
  mutations: {
    setUserId: function(state: any, userId: string) {
      state.userId = userId;
    },
  },
  actions: {
    updateUserId: function({ commit }: { commit: any }, userId: string) {
      commit('setUserId', userId);
    },
  },
  getters: {
    userId: function(state: any) {
      return state.userId;
    },
  },
});
