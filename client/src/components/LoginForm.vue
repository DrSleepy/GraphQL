<template>
  <form class="form" v-on:submit.prevent="loginRequest">

    <div class="form__row form__row--first">
      <label class="row__label" for="email"> Email: </label>
      <input id="email" class="row__input" :class="{ 'error-input': formErrors.email }" type="email" v-model="loginForm.email" required>
      <p class="row__error"> {{ formErrors.email }} </p>
    </div>

    <div class="form__row form__row--last">
      <label class="row__label" for="password"> Password: </label>
      <input id="password" class="row__input" :class="{ 'error-input': formErrors.password }" type="password" v-model="loginForm.password" required>
      <p class="row__error"> {{ formErrors.password }} </p>
    </div>

    <p class="forgot">forgot you password?</p>

    <footer class="footer">
      <button class="footer__primary" type="submit"> login </button>
      <p class="footer__secondary"> Create new account </p>
    </footer>

  </form>
</template>

<style lang="less" scoped>
@import (reference) '../less/index.less';

// dynamic styles
.error-input {
  border: 1px solid @wrong-color;
}

// normal styles
.form {
  .grid-24;
  grid-template-rows: repeat(3, max-content) 1fr;
  background: #fff;
}

.form__row {
  display: grid;
  grid-column: 2 / span 22;

  &--first {
    .push-down-3;
  }
  &--last {
    .push-down-4;
  }
}

.row {
  &__input {
    &:invalid {
      .error-input;
    }
  }
  &__label {
    .milli;
  }
  &__error {
    .micro;
    .pad-lr-1;
    color: @wrong-color;
  }
}

.forgot {
  .micro;
  grid-column: 1 / span 24;
  justify-self: center;
}

.footer {
  .grid-24;
  .pad-tb-4;
  .row-gap-3--5;
  grid-column: 1 / span 24;
  background-color: #eff4f8;
  align-self: end;

  &__primary {
    .pad-tb-3--5;
    .btn(@primary-color);
    border-radius: 3px;
    grid-column: 3 / span 20;
  }
  &__secondary {
    .micro;
    grid-column: 1 / span 24;
    justify-self: center;
  }
}
</style>

<script>
import { LOGIN_MUTATION } from '../graphql';
import { resetErrors, appendErrors } from '../helpers';

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
      }
    }
  }
};
</script>
