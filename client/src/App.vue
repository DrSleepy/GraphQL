<template>
  <div>
    <p v-if="!getAllUsers"> loading...eeeeeeeee (this method can be used for initial page load) </p>
    <p v-for="(user, index) in getAllUsers" :key="index"> {{ user.displayName }} {{ user.age }} </p>

    <div>
      <p v-for="(user, index) in getAllPrivateChats" :key="index"> {{ user.name }} </p>
      <p v-if="loading"> LLLLLLLLLLLLLLLLLLLLLLLLLLLLL (another way to load) </p>
    </div>
    <button @click="getAllUsersList()"> Submit </button>
  </div>
</template>

<script>
import { GET_ALL_USERS_QUERY, GET_ALL_PRIVATE_CHATS_QUERY } from './constants/graphql';

export default {
  data() {
    return {
      getAllUsers: 'x',
      loading: 0
    };
  },
  methods: {
    async getAllUsersList() {
      const response = await this.$apollo.query({ query: GET_ALL_USERS_QUERY });
      this.getAllUsers = response.data.getAllUsers;
    }
  },
  apollo: {
    // queries placed here can be used to load data on page load
    // 'getAllUsers' HAS to match query name!
    getAllPrivateChats: { query: GET_ALL_PRIVATE_CHATS_QUERY }
  }
};
</script>

<style>

</style>
