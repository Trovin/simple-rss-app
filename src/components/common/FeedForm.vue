<template>
  <form class="wrapper form-wrapper" @submit.prevent="handleSubmit()">
    <v-text-field
      type="url"
      class="form-input"
      :rules="rules"
      @blur="isFeedTouched = true"
      v-model="feedApi"
      label="ENTER RSS API"
      clearable
      hide-details="auto">
    </v-text-field>

    <button class="btn" :disabled="!isFeedValid" title="Add RSS url" type="submit">SUBSCRIBE</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

import { ADD_NEW_FEED } from '../../store/action-types';

const URL_REGEX = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

export default {
  name: 'FeedForm',
  data () {
    return {
      feedApi: null,
      isFeedTouched: false,
      rules: [
        value => !!value || 'Field data is required',
        value => {
          const pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
          return pattern.test(value) || 'Invalid url'
        },
      ]
    }
  },
  computed: {
    isFeedValid() {
      return URL_REGEX.test(this.feedApi);
    },
    isFeedError() {
      return !this.isFeedValid && this.isFeedTouched;
    },
  },
  methods: {
    ...mapActions({ addNewFeed: ADD_NEW_FEED }),
    handleSubmit() {
      this.addNewFeed({ api: this.feedApi });
      this.feedApi = '';
      this.isFeedTouched = false;
    }
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
