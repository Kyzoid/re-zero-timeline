import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    zIndex: 9,
  },
  mutations: {
    addZIndex(state) {
      state.zIndex += 1;
    },
    removeZIndex(state) {
      state.zIndex -= 1;
    },
  },
  actions: {},
  modules: {},
});
