<template>
  <div>
    <ul>
      <router-link to="/Home" tag="li">
        <a>Home</a>
      </router-link>

      <router-link to="/Profile" tag="li" v-if="!this.$store.state.currentUser">
        <a>My Account</a>
      </router-link>

      <router-link to="/Login" tag="li">
        <a>Login</a>
      </router-link>

    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style>

</style>
