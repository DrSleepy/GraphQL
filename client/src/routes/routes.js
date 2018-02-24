// View components
import Login from '../views/Login';
import Home from '../views/Home';
import Profile from '../views/Profile';

import Chatlist from '../components/Chatlist';
import Register from '../components/Register';

import { redirect, loginAndRegisterGuards } from './guards';

// Routes
export default [
  { path: '/Home', component: Home },
  {
    path: '/Login',
    component: Login,
    beforeEnter: loginAndRegisterGuards.beforeEnter
  },
  {
    path: '/Chatlist',
    component: Chatlist,
    beforeEnter: redirect.beforeEnter({ authed: true, redirectTo: '/Login' })
  },
  {
    path: '/Register',
    component: Register,
    beforeEnter: loginAndRegisterGuards.beforeEnter
  },
  {
    path: '/Profile',
    component: Profile,
    beforeEnter: redirect.beforeEnter({ authed: true, redirectTo: '/Login' })
  }
];
