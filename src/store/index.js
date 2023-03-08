import Vue from 'vue';
import Vuex from 'vuex';
import Dashboard from './Report';

Vue.use(Vuex);
const state = {
  size: 'mini',
  tooltipOpen: false,
};
export default new Vuex.Store({
  state,
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    Dashboard,
  },
});
