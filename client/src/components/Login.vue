<template>
  <div>
    <input type="email" v-model="loginForm.email">
    <p> {{ formErrors.email }} </p>

    <input type="text" v-model="loginForm.password">
    <p> {{ formErrors.password }} </p>

    <p v-if="formErrors.generic"> {{ formErrors.generic }} </p>

    <button @click="loginRequest()"> login </button>
  </div>
</template>

<script>
import { LOGIN_MUTATION } from '../graphql';
import { resetErrors, appendErrors } from '../helpers';

export default {
  data() {
    return {
      loginForm: {
        email: 'm-subahi@hotmail.com1',
        password: '12345678'
      },
      formErrors: {
        email: '',
        password: '',
        generic: ''
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
      resetErrors(this.formErrors);
      if (errors.length > 0) {
        this.formErrors = appendErrors(errors, this.formErrors);
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
    }
  }
};
</script>

<style scoped>

</style>
