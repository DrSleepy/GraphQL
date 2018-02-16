<template>
  <div>
    <input type="email" v-model="loginForm.email">
    <p> {{ formErrors.email }} </p>

    <input type="text" v-model="loginForm.password">
    <p> {{ formErrors.password }} </p>

    <button @click="loginRequest()"> login </button>

    <button @click="logoutRequest()"> logout </button>
  </div>
</template>

<script>
import { LOGIN_MUTATION, LOGOUT_MUTATION } from '../graphql';

export default {
  data() {
    return {
      loginForm: {
        email: 'bob33@hotmail.com',
        password: '12345678'
      },
      formErrors: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async logoutRequest() {
      const mutation = { mutation: LOGOUT_MUTATION };
      const loggedOut = await this.$apollo.mutate(mutation);
      if (loggedOut) {
        this.$store.dispatch('setCurrentUser', null);
        this.$router.replace('/Home');
      }
    },

    async loginRequest() {
      const mutation = {
        mutation: LOGIN_MUTATION,
        variables: {
          loginDetails: {
            ...this.loginForm
          }
        }
      };
      const response = await this.$apollo.mutate(mutation);
      this.loginResponse(response);
    },

    loginResponse(response) {
      // reversed order to get most accurate error first
      const errors = response.data.login.errors.reverse();

      // handle errors
      this.resetErrors();
      if (errors.length > 0) {
        this.errorHanlder(errors);
        return;
      }

      // add user to vuex
      const user = response.data.login.user;
      this.$store.dispatch('setCurrentUser', user);

      // redirect if successful
      if (user) {
        this.$router.push('/Home');
      }
    },

    resetErrors() {
      this.formErrors = {
        email: '',
        password: ''
      };
    },

    errorHanlder(errors) {
      // append errors to vuejs formErrors object
      errors.forEach(current => {
        const key = current.path[0];
        const value = current.message;
        this.formErrors[key] = value;
      });
    }
  }
};
</script>

<style scoped>

</style>
