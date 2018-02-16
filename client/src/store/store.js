import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null
  },
  getters: {
    authed: state => state.currentUser
  },
  mutations: {
    setCurrentUser: (state, payload) => {
      state.currentUser = payload;
    }
  },
  actions: {
    setCurrentUser: ({ commit }, payload) => commit('setCurrentUser', payload)
  }
});
