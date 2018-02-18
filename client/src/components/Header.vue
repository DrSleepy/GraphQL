<template>
  <div>
    <ul>
      <router-link to="/Home" tag="li">
        <a>Home</a>
      </router-link>

      <router-link to="/Profile" tag="li" v-if="authed">
        <a>My Account</a>
      </router-link>

      <router-link to="/Register" tag="li" v-if="!authed">
        <a>Register</a>
      </router-link>

      <router-link to="/Login" tag="li" v-if="!authed">
        <a>Login</a>
      </router-link>

      <router-link to="/Chatlist" tag="li" v-if="authed">
        <a>Chatlist</a>
      </router-link>

      <li @click="logoutRequest()" v-if="authed">Logout</li>

    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { LOGOUT_MUTATION } from '../graphql';

export default {
  computed: {
    ...mapGetters(['authed'])
  },
  methods: {
    async logoutRequest() {
      const mutation = { mutation: LOGOUT_MUTATION };
      const loggedOut = await this.$apollo.mutate(mutation);
      if (loggedOut) {
        this.$store.dispatch('logoutCurrentUser');
        this.$router.replace('/Home');
      }
    }
  }
};
</script>

<style>

</style>
