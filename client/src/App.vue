<template>
  <div>

    <input type="email" v-model="email">
    <p v-if="errors"> {{ errors.email }} </p>

    <input type="text" v-model="password">
    <p> {{ errors.password }} </p>

    <button @click=" login() "> login </button>

  </div>
</template>

<script>
import { LOGIN_MUTATION } from './constants/graphql';

export default {
  data() {
    return {
      email: '',
      password: '',
      errors: {
        email: '',
        password: ''
      }
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

      // reversed in order to get most accurate error first
      const errors = response.data.login.errors.reverse();
      this.resetErrors();
      if (errors) {
        this.errorHander(errors);
      }
    },
    resetErrors() {
      this.errors = { email: '', password: '' };
    },
    errorHander(errors) {
      // append errors to vuejs errors object
      errors.forEach(current => {
        const key = current.path[0];
        const value = current.message.replace(/"/g, '');
        this.errors[key] = value;
      });
    }
  }
};
</script>

<style>

</style>
