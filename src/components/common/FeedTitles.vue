<template>
  <div class="wrapper">
    <h2 v-if="!items">Feeds is empty ...</h2>
    <v-progress-circular class="mb-1" indeterminate v-visible="!loading"></v-progress-circular>

    <div v-for="item in items" :key="item.key">
      <span
        class="feed-title fade-in"
        v-on:click="setActiveCategory(item.key)"
        v-bind:class="{ 'feed-title_active': selectedCategory === item.key }">
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
} from '../../store/state-types';

import { SET_ACTIVE_CATEGORY } from '../../store/mutation-types';

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
    text-transform: uppercase;

    &_active {
      color: $theme-color;
    }
  }
</style>
