<template>
  <div>

    <input type="email" v-model="email">
    <p> {{ formErrors.email }} </p>

    <input type="text" v-model="password">
    <p> {{ formErrors.password }} </p>

    <button @click="login()"> login </button>
    <button @click="logout()"> logout </button>
  </div>
</template>

<script>
import { LOGIN_MUTATION, LOGOUT_MUTATION } from '../graphql';

export default {
  data() {
    return {
      email: '',
      password: '',
      formErrors: {
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

      // reversed order to get most accurate error first
      const errors = response.data.login.errors.reverse();
      this.resetErrors();
      if (errors) {
        this.errorHanlder(errors);
      }
      this.user = response.data.login.user;
      if (this.user) this.$router.push('/Details');
    },

    logout() {
      this.$apollo.mutate({
        mutation: LOGOUT_MUTATION
      });
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
