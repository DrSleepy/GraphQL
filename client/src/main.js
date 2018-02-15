// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import VueApollo from 'vue-apollo';
import VueRouter from 'vue-router';

import App from './App';
import store from './store/store';
import routes from './routes';
import apolloProvider from './apollo';

// components
import Header from './components/Header';

Vue.component('app-header', Header);

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
