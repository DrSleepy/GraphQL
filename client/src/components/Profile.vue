<template>
  <div>
    <p>Disaplay name: {{ authed.displayName }}</p>

    <h2> Preferences </h2>
    <input type="number" placeholder="minAge" v-model="preferencesForm.minAge">
    <p> {{ formErrors.minAge }}</p>
    <input type="number" placeholder="maxAge" v-model="preferencesForm.maxAge">
    <p> {{ formErrors.maxAge }}</p>
    <input type="text" placeholder="gender" v-model="preferencesForm.gender">
    <p> {{ formErrors.gender }}</p>

    <p> {{ formErrors.generic }} </p>

    <button @click="updatePreferencesRequest()"> update </button>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { MY_PREFERENCES_QUERY, UPDATE_PREFERENCES_MUTATION } from '../graphql';
import { resetErrors, appendErrors } from '../helpers';

export default {
  data() {
    return {
      preferencesForm: {
        minAge: 18,
        maxAge: 70,
        gender: 'Male'
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
      const query = { query: MY_PREFERENCES_QUERY };
      const response = await this.$apollo.query(query);
      const { minAge, maxAge, gender } = response.data.myPreferences;
      this.preferencesForm = { minAge, maxAge, gender };
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

<style>

</style>
