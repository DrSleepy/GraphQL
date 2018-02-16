<template>
  <div>
    <div v-if="!authed">
      <p> You must be logged in! </p>
    </div>
    <div v-else>
      <p>Disaplay name: {{ authed.displayName }}</p>
      <p>Age: {{ authed.age }}</p>
    </div>
  </div>
</template>

<script>
// import { MY_PROFILE_QUERY } from '../graphql';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['authed'])
  }
};
</script>

<style>

</style>
