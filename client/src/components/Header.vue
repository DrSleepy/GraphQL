<template>
  <div>
    <ul>
      <router-link to="/Home" tag="li">
        <a>Home</a>
      </router-link>

      <router-link to="/Profile" tag="li" v-if="authed">
        <a>My Account</a>
      </router-link>

      <router-link to="/Login" tag="li">
        <a>Login</a>
      </router-link>

    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['authed'])
  }
};
</script>

<style>

</style>
