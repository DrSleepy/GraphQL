<template>
  <div>

    <input type="email" v-model="email">
    <p> {{ errors.email }} </p>

    <input type="text" v-model="password">
    <p> {{ errors.password }} </p>

    <button @click="login()"> submit </button>

  </div>
</template>

<script>
import { LOGIN_MUTATION } from './constants/graphql';

export default {
  data() {
    return {
      email: '',
      password: '',
      errors: {}
    };
  },
  methods: {
    async login() {
      const response = await this.$apollo.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          loginDetails: {
            email: this.email,
            password: this.password
          }
        }
      });

      const errors = response.data.login.errors;
      if (!errors) {
        this.errors = {};
        return;
      }

      const propToAdd = errors.path[0];
      const message = errors.message.replace(/"/g, '');

      this.errors = {
        [propToAdd]: message
      };
    }
  }
};
</script>

<style>

</style>
