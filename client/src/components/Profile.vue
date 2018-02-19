<template>
  <div>
    <div v-if="!authed">
      <p> You must be logged in! </p>
    </div>
    <div v-else>
      <p>Disaplay name: {{ authed.displayName }}</p>
    </div>
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
