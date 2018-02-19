<template>
  <div>
    <p>Disaplay name: {{ authed.displayName }}</p>

    <h2> Preferences </h2>
    <input type="number" placeholder="minAge" v-model="preferences.minAge">
    <input type="number" placeholder="maxAge" v-model="preferences.maxAge">
    <input type="text" placeholder="gender" v-model="preferences.gender">
    <button @click="updatePreferencesRequest()"> update </button>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { UPDATE_PREFERENCES_MUTATION } from '../graphql';

export default {
  data() {
    return {
      preferences: {
        minAge: 19,
        maxAge: 33,
        gender: 'Female'
      }
    };
  },
  computed: {
    ...mapGetters(['authed'])
  },
  methods: {
    async updatePreferencesRequest() {
      const mutation = {
        mutation: UPDATE_PREFERENCES_MUTATION,
        variables: {
          preferenceDetails: {
            ...this.preferences
          }
        }
      };
      const response = await this.$apollo.mutate(mutation);
      this.updatePreferencesResponse(response);
    },
    updatePreferencesResponse(response) {
      console.log(response);
    }
  }
};
</script>

<style>

</style>
