<template>
  <form>
    <div>
      <label for="email"> Email: </label>
      <input id="email" type="email" v-model="registerForm.email">
      <p> {{ formErrors.email }}</p>
    </div>
    <div>
      <label for="password"> Password: </label>
      <input id="password" type="password" v-model="registerForm.password">
      <p> {{ formErrors.password }}</p>
    </div>
    <div>
      <label for="confirmPassword"> Password: </label>
      <input id="confirmPassword" type="password" v-model="registerForm.confirmPassword">
      <p> {{ formErrors.confirmPassword }}</p>
    </div>
    <div>
      <label for="gender"> Gender: </label>
      <input id="gender" type="text" v-model="registerForm.gender">
      <p> {{ formErrors.gender }}</p>

    </div>
    <p v-if="formErrors.generic"> {{ formErrors.generic }} </p>
    <button type="submit" @click.prevent="registerRequest()"> Register </button>
  </form>
</template>

<script>
import { REGISTER_MUTATION } from '../graphql';
import { resetErrors, appendErrors } from '../helpers';

export default {
  data() {
    return {
      registerForm: {
        email: 'm-subahi@hotmail.com',
        password: '12345678',
        confirmPassword: '12345678',
        gender: 'Male'
      },
      formErrors: {
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        generic: ''
      }
    };
  },
  methods: {
    async registerRequest() {
      const mutation = {
        mutation: REGISTER_MUTATION,
        variables: {
          registerDetails: {
            ...this.registerForm
          }
        }
      };
      const response = await this.$apollo.mutate(mutation);
      this.registerResponse(response);
    },

    registerResponse(response) {
      const errors = response.data.register.errors.reverse();

      // handle errors
      resetErrors(this.formErrors);
      if (errors.length > 0) {
        this.formErrors = appendErrors(errors, this.formErrors);
        return;
      }

      // add user to vuex
      const user = response.data.register.user;
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

<style>

</style>
