<template>
  <form class="wrapper" @submit.prevent="handleSubmit()">
    <div class="form-container">
      <input
        class="form-input"
        v-model="feedApi"
        type="url"
        @blur="isFeedTouched = true"
        :class="{ error: isFeedError }"
        placeholder="ENTER RSS API">
      <button class="btn" :disabled="!isFeedValid" type="submit">Subscribe</button>
    </div>

    <div class="fade-in error-message" v-if="isFeedError">Enter a valid RSS URL</div>
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
      isFeedTouched: false
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
  @import '../../assets/styles/variables.scss';

  .form-container {
    display: flex;
  }

  .form-input {
    width: 100%;
    border: 0;
    border-bottom: 1px solid $border;
    margin-right: 30px;
  }
</style>
