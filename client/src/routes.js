import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';

import store from './store/store';
import apolloProvider from './apollo';
import { MY_PROFILE_QUERY } from './graphql';

const apollo = apolloProvider.clients.defaultClient;

// Guards Functions
const profileGuards = {
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

// Routes
export default [
  { path: '/Home', component: Home },
  { path: '/login', component: Login },
  {
    path: '/Profile',
    component: Profile,
    beforeEnter: profileGuards.beforeEnter
  }
];
