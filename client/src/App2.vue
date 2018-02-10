<template>
  <div>
    <p v-for="(user, index) in getAllUsers" :key="index"> {{ user.name }} {{ user.age }} </p>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  data() {
    return {
      getAllUsers: ''
    };
  },

  apollo: {
    getAllUsers: gql`
      {
        getAllUsers {
          name
          age
        }
      }
    `
  }
};
</script>

<style>

</style>
