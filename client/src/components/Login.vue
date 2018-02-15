<template>
  <div>

    <input type="email" v-model="loginForm.email">
    <p> {{ formErrors.email }} </p>

    <input type="text" v-model="loginForm.password">
    <p> {{ formErrors.password }} </p>

    <button @click="loginRequest()"> login </button>

    <button @click="logout()"> logout </button>

    <p v-if="loading"> Lolxxxxxxxxxxxxxxxxxxx </p>

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
      },
      loading: 0
    };
  },
  methods: {
    async logout() {
      const loggedOut = await this.$apollo.mutate({ mutation: LOGOUT_MUTATION });
      if (loggedOut) this.$store.state.currentUser = null;
    },

    async loginRequest() {
      const response = await this.$apollo.mutate({
        mutation: LOGIN_MUTATION,
        variables: { loginDetails: { ...this.loginForm } }
      });
      this.loginResponse(response);
    },

    loginResponse(response) {
      // reversed order to get most accurate error first
      const errors = response.data.login.errors.reverse();

      // handle errors
      this.resetErrors();
      if (errors) {
        this.errorHanlder(errors);
      }

      // handle successful login
      this.user = response.data.login.user;
      this.$store.state.currentUser = response.data.login.user;
      console.log(this.$store.state.currentUser);

      if (this.user) this.$router.push('/Profile');
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
