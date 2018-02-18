<template>
  <div>
    <ul>
      <p> chatlist here </p>
      <button> New random chat </button>
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
