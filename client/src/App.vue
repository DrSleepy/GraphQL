
<template>
  <div>
    <p>Main App.vue</p>
    <app-header></app-header>
    <!-- Do NOT remove 'authed' key. Refreshes router cache one logout -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('tryAutoLogin');
  }
};
</script>

<style>

</style>
