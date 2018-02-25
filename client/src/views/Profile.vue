<template>
  <form class="form" v-on:submit.prevent>

    <!-- <h1 style="visibility: hidden"> My profile </h1> -->

    <section class="section user">
      <img class="user__item user__item--avatar" src="../assets/avatar.jpg" draggable="false">
      <p class="user__item user__item--display-name">Steven James</p>
      <p class="user__item user__item--age">33, Male</p>
    </section>

    <section class="section">
      <h2 class="section__heading"> Search Preferences </h2>

      <section class="subsection">
        <h3 class="subsection__heading"> Interested in: </h3>
        <div class="genders">
          <input id="male" class="genders__checkbox" type="checkbox" value="male" v-model="form.gender">
          <input id="female" class="genders__checkbox" type="checkbox" value="female" v-model="form.gender">
          <label class="genders__item genders__item--male" for="male">Men</label>
          <label class="genders__item genders__item--female" for="female">Women</label>
        </div>
        <p class="error-text" v-if="formErrors.gender"> {{ formErrors.gender }} </p>
      </section>

      <section class="subsection">
        <h3 class="subsection__heading"> Age </h3>
        <label class="subsection__subheading" for="ageFrom"> From:
          <span class="subsection__subheading--age"> {{ form.minAge }} </span>
        </label>
        <input id="ageFrom" class="input-slider" type="range" min="18" max="69" step="1" v-model="form.minAge" required>

        <label class="subsection__subheading" for="ageTo"> To:
          <span class="subsection__subheading--age"> {{ form.maxAge }} </span>
        </label>
        <input id="ageTo" class="input-slider" type="range" min="19" max="70" step="1" v-model="form.maxAge" required>
        <p class="error-text" v-if="formErrors.maxAge"> {{ formErrors.maxAge }} </p>
      </section>
    </section>

    <button class="primary" type="submit" @click="updatePreferencesRequest" :disabled="!validForm"> Update </button>
  </form>
</template>

<script>
import { MY_PROFILE_QUERY, UPDATE_PREFERENCES_MUTATION } from '../graphql';
import { resetErrors, appendErrors } from '../helpers';

export default {
  data() {
    return {
      validForm: true,
      form: {
        minAge: 18,
        maxAge: 70,
        gender: ['female']
      },
      formErrors: {
        minAge: '',
        maxAge: '',
        gender: ''
      }
    };
  },
  watch: {
    form: {
      deep: true,
      handler() {
        this.clientErrorHandling();
      }
    }
  },
  methods: {
    clientErrorHandling() {
      let hasErrors = false;

      // age checking
      if (this.form.minAge >= this.form.maxAge) {
        hasErrors = true;
        this.formErrors.maxAge = `Must be older than ${this.form.minAge}`;
      } else {
        this.formErrors.maxAge = '';
      }

      // gender checking
      if (this.form.gender.length < 1) {
        hasErrors = true;
        this.formErrors.gender = 'Gender must be selected';
      } else {
        this.formErrors.gender = '';
      }

      // no errors
      this.validForm = !hasErrors;
    },
    async loadPreferences() {
      const query = { query: MY_PROFILE_QUERY };
      const response = await this.$apollo.query(query);
      const { minAge, maxAge, gender } = response.data.myProfile.preferences;
      this.form = { minAge, maxAge, gender };
    },
    async updatePreferencesRequest() {
      const mutation = {
        mutation: UPDATE_PREFERENCES_MUTATION,
        variables: {
          preferenceDetails: {
            ...this.form
          }
        }
      };
      const response = await this.$apollo.mutate(mutation);
      this.updatePreferencesResponse(response);
    },
    updatePreferencesResponse(response) {
      const serverErrors = response.data.updatePreferences.errors.reverse();

      // handle errors
      resetErrors(this.formErrors);
      if (serverErrors.length > 0) {
        this.formErrors = appendErrors(serverErrors, this.formErrors);
      }
    }
  },
  created() {
    this.loadPreferences();
  }
};
</script>


<style lang="less" scoped>
@import (reference) '../less/index.less';
.form {
  .grid-24;
  .pad-tb-3;
  grid-template-rows: max-content 1fr;
  font-family: 'main-font-light';
}

.section {
  .pad-lr-4;

  grid-column: 1 / span 24;

  &__heading {
    .push-down-2;
    .kilo;
  }
}

.subsection {
  &__heading {
    .milli;
    .push-down-1;
  }

  &__subheading {
    .push-down-1;
    .milli;
    color: @dark-text-color;

    &--age {
      .micro;
      color: white;
    }
  }
}

.user {
  .col-gap-2--5;
  .push-down-5;
  grid-column: 1 / span 24;
  display: grid;
  grid-template-columns: 1fr 2.5fr;

  &__item {
    &--avatar {
      .box-shadow-8;
      grid-row: 1 / span 2;
      border-radius: 50%;
      width: 100%;
    }
    &--display-name {
      align-self: end;
    }
    &--age {
      .milli;
      color: @dark-text-color;
    }
  }
}

.genders {
  .push-down-3;
  .box-shadow-7;
  @radius: 3px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: @dark-text-color;
  border-radius: @radius;

  #male:checked ~ &__item--male {
    border-radius: @radius 0 0 @radius;
    background-color: @primary-color;
    border-right: solid 1px #72bcfc;
  }
  #female:checked ~ &__item--female {
    background-color: @primary-color;
    border-radius: 0 @radius @radius 0;
  }

  &__item {
    .pad-tb-2;
    .micro;
    display: grid;
    justify-content: center;

    &--male {
      border-right: solid 1px #79aad4;
    }
  }

  &__checkbox {
    display: none;
  }
}

.error-text {
  .micro;
  color: @wrong-color;
}
.input-slider {
  .range-slider;
  &::-webkit-slider-runnable-track {
    .box-shadow-7;
  }
}
.primary {
  .btn(@secondary-color);
  .pad-tb-3;
  .milli;
  border-radius: 0;
  width: 100vw;
  position: fixed;
  left: 0;
  bottom: 0;
  &:disabled {
    background: #9cbad5;
  }
}
</style>
