<template>
  <form class="form">

    <!-- <h1 style="visibility: hidden"> My profile </h1> -->

    <section class="top">
      <img class="avatar" src="../assets/avatar.jpg" alt="">
      <p>NAME</p>
      <p>age</p>
    </section>

    <section class="section">
      <h2 class="section__heading"> Search Preferences</h2>
      <div>
        <h3 class="section__subheadings">Interested in:</h3>
        <p>Men</p>
        <p>Women</p>
      </div>

      <div>
        <h3 class="section__subheadings">Age - From: 'age'</h3>
        <input type="range" min="18" max="69" step="1" v-model="ageFrom">
        <p>{{ ageFrom }}</p>
      </div>

      <div>
        <h3 class="section__subheadings">Age - To: 'age'</h3>
        <input type="range" min="18" max="70" step="1" v-model="ageTo">
        <p>{{ ageTo }}</p>
      </div>
    </section>

    <section>
      <input type="range">
    </section>

    <!-- <div class="wrapperTest">

      <p>Disaplay name: {{ authed.displayName }}</p>

      <h2> Preferences </h2>
      <input type="number" placeholder="minAge" v-model="preferencesForm.minAge">
      <p> {{ formErrors.minAge }}</p>
      <input type="number" placeholder="maxAge" v-model="preferencesForm.maxAge">
      <p> {{ formErrors.maxAge }}</p>

      <label for="male"> Male </label>
      <input id="male" type="checkbox" value="male" v-model="preferencesForm.gender">

      <label for="female"> Female </label>
      <input id="female" type="checkbox" value="female" v-model="preferencesForm.gender">

      <p :class="{ 'error-input': formErrors.gender }"> {{ preferencesForm.gender }} </p>
      <p> {{ formErrors.gender }} </p>

      <p> {{ formErrors.generic }} </p>

      <button @click="updatePreferencesRequest()"> update </button>

    </div> -->
  </form>
</template>

<style lang="less" scoped>
@import (reference) '../less/index.less';
.form {
  .grid-24;
  grid-template-rows: 1fr 3fr;
}
.top {
  grid-column: 1 / span 24;
  display: grid;
  grid-template-columns: 1fr 2fr;
  background-color: red;
}
.avatar {
  grid-row: 1/ span 2;
  background-color: blue;
  border-radius: 50%;
  width: 100%;
}

.wrapperTest {
  grid-column: 1 / span 24;
}
.section {
  grid-column: 1 / span 24;
  background-color: #063764;
  color: white;
}
.section__heading {
  .kilo;
  font-family: 'main-font-normal';
  color: white;
}
.section__subheadings {
  .milli;
  font-family: 'main-font-normal';
  color: #9cbad5;
}
</style>

<script>
import { mapGetters } from 'vuex';
import { MY_PROFILE_QUERY, UPDATE_PREFERENCES_MUTATION } from '../graphql';
import { resetErrors, appendErrors } from '../helpers';

export default {
  data() {
    return {
      ageFrom: 30,
      ageTo: 60,
      preferencesForm: {
        minAge: 18,
        maxAge: 70,
        gender: []
      },
      formErrors: {
        minAge: '',
        maxAge: '',
        gender: ''
      }
    };
  },
  computed: {
    ...mapGetters(['authed'])
  },
  methods: {
    async loadPreferences() {
      const query = { query: MY_PROFILE_QUERY };
      const response = await this.$apollo.query(query);
      console.log(response);

      // const { minAge, maxAge, gender } = response.data.myPreferences;
      // this.preferencesForm = { minAge, maxAge, gender };
    },
    async updatePreferencesRequest() {
      const mutation = {
        mutation: UPDATE_PREFERENCES_MUTATION,
        variables: {
          preferenceDetails: {
            ...this.preferencesForm
          }
        }
      };
      const response = await this.$apollo.mutate(mutation);
      this.updatePreferencesResponse(response);
    },
    updatePreferencesResponse(response) {
      const errors = response.data.updatePreferences.errors.reverse();

      // handle errors
      resetErrors(this.formErrors);
      if (errors.length > 0) {
        this.formErrors = appendErrors(errors, this.formErrors);
      }
    }
  },
  created() {
    this.loadPreferences();
  }
};
</script>
