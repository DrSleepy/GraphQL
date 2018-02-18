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
      localStorage.setItem('userDisplayName', payload.displayName);
      localStorage.setItem('userLoggedIn', true);
      state.currentUser = payload;
    },
    logoutCurrentUser: state => {
      localStorage.removeItem('userDisplayName');
      localStorage.removeItem('userLoggedIn');
      state.currentUser = null;
    }
  },
  actions: {
    setCurrentUser: ({ commit }, payload) => {
      commit('setCurrentUser', payload);
    },
    logoutCurrentUser: ({ commit }) => {
      commit('logoutCurrentUser');
    },
    tryAutoLogin: ({ commit }) => {
      const loggedIn = localStorage.getItem('userLoggedIn');
      if (!loggedIn) {
        commit('logoutCurrentUser');
        return;
      }

      // User is logged in - retrieve localstorage info
      const displayName = localStorage.getItem('userDisplayName');

      // form and set user
      const user = { displayName };
      commit('setCurrentUser', user);
    }
  }
});
