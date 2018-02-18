import store from '../store/store';
import apolloProvider from '../apollo';
import { MY_PROFILE_QUERY } from '../graphql';

const apollo = apolloProvider.clients.defaultClient;

export const redirect = {
  beforeEnter({ authed, redirectTo }) {
    return async (to, from, next) => {
      // await works on full page refresh - setting await to variable does not work
      await store.getters.authed;

      if (!authed) {
        next();
        return;
      }

      if (authed && store.getters.authed) {
        next();
        return;
      }

      next(redirectTo);
    };
  }
};

export const loginAndRegisterGuards = {
  async beforeEnter(to, from, next) {
    // setting await to variable does not work
    await store.getters.authed;
    store.getters.authed ? next('/Profile') : next(); // eslint-disable-line
  }
};

// Guards Functions - Revisit after frontend flow is set in stone
export const profileGuards = {
  // DONT DO THIS! UPDATE VUEX STORE "AFTER" SAVING CHANGES TO MONGO
  beforeEnter: async (to, from, next) => {
    const query = { query: MY_PROFILE_QUERY, fetchPolicy: 'network-only' };
    const response = await apollo.query(query);
    const user = response.data.myProfile;

    if (user) {
      store.dispatch('setCurrentUser', user);
      return next();
    }
    return next('/Login');
  }
};
