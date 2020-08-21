<template>
  <div class="wrapper">
    <h2 v-if="!titles">Feeds is empty ...</h2>
    <h2 v-if="loading" class="theme">Loading ...</h2>

    <div v-for="title in titles" :key="title">
      <span
        class="feed-title fade-in"
        v-on:click="setActiveCategory(title)"
        v-bind:class="{ 'feed-title_active': selectedCategory === title }">
        {{title}}
    </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations  } from 'vuex';

import { SET_ACTIVE_CATEGORY } from '../../store/mutations';

export default {
  name: 'FeedTitlesList',
  computed: mapState({
    titles: state => state.titlesList,
    loading: state => state.isLoading,
    selectedCategory: state => state.selectedFeedCategory
  }),
  methods: {
    ...mapMutations({ setActiveCategory: SET_ACTIVE_CATEGORY })
  }
}
</script>

<style lang="scss">
  @import '../../assets/styles/mixins.scss';
  @import '../../assets/styles/variables.scss';

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
