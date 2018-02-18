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
      localStorage.setItem('userAge', payload.age);
      localStorage.setItem('loggedIn', true);
      state.currentUser = payload;
    },
    logoutCurrentUser: state => {
      localStorage.removeItem('userDisplayName');
      localStorage.removeItem('userAge');
      localStorage.removeItem('loggedIn');
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
      const loggedIn = localStorage.getItem('loggedIn');
      if (!loggedIn) {
        commit('logoutCurrentUser');
        return;
      }

      // User is logged in - retrieve localstorage info
      const displayName = localStorage.getItem('userDisplayName');
      const age = localStorage.getItem('userAge');

      // form and set user
      const user = { displayName, age };
      commit('setCurrentUser', user);
    }
  }
});
