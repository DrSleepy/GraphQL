<template>
  <div>
    <p v-if="!getAllUsers"> loading...eeeeeeeee (this method can be used for initial page load) </p>
    <p v-for="(user, index) in getAllUsers" :key="index"> {{ user.displayName }} {{ user.age }} </p>

    <div>
      <p v-for="(user, index) in getAllPrivateChats" :key="index"> {{ user.name }} </p>
      <p v-if="loading"> LLLLLLLLLLLLLLLLLLLLLLLLLLLLL (another way to load) </p>
    </div>
    <button @click="getAllUsersList()"> Submit </button>

    <input type="email" v-model="email">
    <input type="text" v-model="password">
    <button @click="login()"> submit </button>

  </div>
</template>

<script>
import {
  GET_ALL_USERS_QUERY,
  GET_ALL_PRIVATE_CHATS_QUERY,
  LOGIN_MUTATION
} from './constants/graphql';

export default {
  data() {
    return {
      getAllUsers: 'x',
      loading: 0,
      email: '',
      password: ''
    };
  },
  methods: {
    async getAllUsersList() {
      const response = await this.$apollo.query({ query: GET_ALL_USERS_QUERY });
      this.getAllUsers = response.data.getAllUsers;
    },
    async login() {
      const email = this.email;
      const password = this.password;

      const response = await this.$apollo.mutate({
        mutation: LOGIN_MUTATION,
        variables: { email, password }
      });

      console.log(response);
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
