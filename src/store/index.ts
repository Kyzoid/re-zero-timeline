import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bottomBarIsMouseDown: false,
  },
  mutations: {
    bottomBarIsMouseDown(state, value) {
      state.bottomBarIsMouseDown = value;
    },
  },
  actions: {
  },
  modules: {
  },
});
