// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import VueApollo from 'vue-apollo';
import VueRouter from 'vue-router';

import apolloProvider from './apollo';
import App from './App';
import routes from './routes';

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
  apolloProvider,
  router,
  render: h => h(App)
});
