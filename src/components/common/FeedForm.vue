<template>
  <v-form
    ref="form"
    v-model="valid"
    @submit.prevent="handleSubmit()"
    class="wrapper form-wrapper">

    <v-text-field
      type="url"
      class="form-input"
      label="ENTER RSS API"
      v-model="api"
      :rules="apiRules"
      clearable
      hide-details="auto">
    </v-text-field>

    <button
      class="btn"
      :disabled="!valid"
      type="submit">
      SUBSCRIBE
    </button>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';

import { ADD_NEW_FEED } from '../../store/types/action-types';

const URL_REGEX = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

export default {
  name: 'FeedForm',
  data () {
    return {
      valid: true,
      api: '',
      apiRules: [
        value => !!value || 'Field data is required',
        value => URL_REGEX.test(value) || 'Invalid url'
      ],
      lazy: false
    }
  },
  methods: {
    ...mapActions({ addNewFeed: ADD_NEW_FEED }),
    handleSubmit() {
      this.addNewFeed({ api: this.api });
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
  }
}
</script>

<style lang="scss">
  @import '../../assets/styles/variables';

  .form-wrapper {
    display: flex;
    align-items: flex-start;
    align-content: flex-start;

    .form-input {
      border: 0;
      margin-right: 20px;
    }
  }

  .form-input {
    width: 100%;
    border: 0;
    border-bottom: 1px solid $border;
    margin-right: 30px;
  }
</style>
