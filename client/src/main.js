// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// To do:
// 1. Implement HTTPS in production
// 2. Secure LocalStorage
// 3. Secure Cookies
// 4. Implement expiration times on both LocalStorage and Cookies

import Vue from 'vue';
import VueApollo from 'vue-apollo';
import VueRouter from 'vue-router';

import App from './App';
import store from './store/store';
import routes from './routes/routes';
import apolloProvider from './apollo';

import './components/registerComponents';
import './views/registerViews';

// Plugins
Vue.use(VueRouter);
Vue.use(VueApollo);

const router = new VueRouter({ routes, mode: 'history' });

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  apolloProvider,
  render: h => h(App)
});
