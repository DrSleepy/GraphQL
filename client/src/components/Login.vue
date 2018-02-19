<template>
  <div>
    <input type="email" v-model="loginForm.email">
    <p> {{ formErrors.email }} </p>

    <input type="text" v-model="loginForm.password">
    <p> {{ formErrors.password }} </p>

    <button @click="loginRequest()"> login </button>
  </div>
</template>

<script>
import { LOGIN_MUTATION } from '../graphql';

export default {
  data() {
    return {
      loginForm: {
        email: 'm-subahi@hotmail.com',
        password: '12345678'
      },
      formErrors: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
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
        return;
      }

      this.formErrors.generic = 'An error occured. Please try again';
    },

    resetErrors() {
      for (const key in this.formErrors) {
        this.formErrors[key] = '';
      }
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
