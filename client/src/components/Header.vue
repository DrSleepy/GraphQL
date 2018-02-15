<template>
  <div>
    <ul>
      <router-link to="/" tag="li">
        <a>My Account</a>
      </router-link>

      <router-link to="/Login" tag="li">
        <a>Login</a>
      </router-link>

      <a @click="logout()">Logout</a>

    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      console.log('logging out...');
    }
  }
};
</script>

<style>

</style>
