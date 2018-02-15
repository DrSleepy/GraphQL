<template>
  <div>
    <p>User details: </p>
    <p>{{user}}</p>
    <p>{{getUserDetails}}</p>

  </div>
</template>

<script>
import { PROFILE_QUERY } from '../graphql';

export default {
  data() {
    return {
      profile: ''
    };
  },
  apollo: {
    profile: { query: PROFILE_QUERY }
  }
};
</script>

<style>

</style>
