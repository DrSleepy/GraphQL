<template>
  <div>
    <p>{{myProfile}}</p>
  </div>
</template>

<script>
// import { MY_PROFILE_QUERY } from '../graphql';

export default {
  data() {
    return {
      myProfile: 'no used saved yet'
    };
  },
  apollo: {
    // myProfile: {
    //   query: MY_PROFILE_QUERY
    // }
  },
  beforeMount() {
    console.log(this.myProfile);
    this.myProfile = this.$store.state.user;
    console.log(this.myProfile);

    // const user = await this.$apollo.query({ query: MY_PROFILE_QUERY });
    // this.myProfile = user;
  }
};
</script>

<style>

</style>
