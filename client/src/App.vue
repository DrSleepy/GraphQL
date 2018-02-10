<template>
  <div>
    <p v-if="!getAllUsers"> loading...eeeeeeeee (this method can be used for initial page load) </p>
    <p v-for="(user, index) in getAllUsers" :key="index"> {{ user.name }} {{ user.age }} </p>

    <div>
      <p v-for="(user, index) in getAllPrivateChats" :key="index"> {{ user.name }} </p>
      <p v-if="loading"> LLLLLLLLLLLLLLLLLLLLLLLLLLLLL (another way to load) </p>
    </div>
    <button @click="createLink()"> Submit </button>
    <p> {{ createNewUser }} </p>
  </div>
</template>

<script>
import {
  GET_ALL_USERS_QUERY,
  GET_ALL_PRIVATE_CHATS_QUERY,
  CREATE_NEW_USER_QUERY
} from './constants/graphql';

export default {
  data() {
    return {
      getAllUsers: '',
      getAllPrivateChats: '',
      createNewUser: 'test',
      loading: 0
    };
  },
  methods: {
    async createLink() {
      const response = await this.$apollo.mutate({ mutation: CREATE_NEW_USER_QUERY });
      this.createNewUser = response.data;
      console.log(response.data);
    }
  },
  apollo: {
    // 'getAllUsers' HAS to match query name!

    getAllUsers: { query: GET_ALL_USERS_QUERY },
    getAllPrivateChats: { query: GET_ALL_PRIVATE_CHATS_QUERY }
  }
};
</script>

<style>

</style>
