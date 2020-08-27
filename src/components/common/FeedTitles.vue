<template>
  <div class="wrapper">
    <h2 v-if="!items">Feeds is empty ...</h2>
    <v-progress-circular class="mb-1" indeterminate v-visible="!loading"></v-progress-circular>

    <div v-for="item in items" :key="item.categoryId">
      <span
        class="feed-title fade-in"
        v-on:click="setActiveCategory(item.categoryId)"
        v-bind:class="{ 'feed-title_active': selectedCategory === item.categoryId }">
        {{item.title}}
      </span>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations
} from 'vuex';

import {
  LOADING,
  TITLES_LIST,
  SELECTED_FEED_CATEGORY
} from '../../store/types/state-types';

import { SET_ACTIVE_CATEGORY } from '../../store/types/mutation-types';

export default {
  name: 'FeedTitles',
  computed: mapState({
    items: state => state[TITLES_LIST],
    loading: state => state[LOADING],
    selectedCategory: state => state[SELECTED_FEED_CATEGORY]
  }),
  methods: {
    ...mapMutations({ setActiveCategory: SET_ACTIVE_CATEGORY })
  }
}
</script>

<style lang="scss">
  @import '../../assets/styles/mixins';
  @import '../../assets/styles/variables';

  .feed-title {
    @include fonts;
    transition: .4s;
    font-size: 20px;
    cursor: pointer;
    display: inline-block;
    margin-bottom: 10px;
    position: relative;
    text-transform: uppercase;

    &::before {
      content: '';
      width: 0;
      height: 2px;
      display: block;
      position: absolute;
      bottom: -2px;
      left: 0;
      transition: $transition;
      background-color: $theme-color;
    }

    &_active {
      color: $theme-color;

      &::before {
        width: 100%;
      }
    }
  }
</style>
