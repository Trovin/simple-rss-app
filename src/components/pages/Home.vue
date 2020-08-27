<template>
  <section class="home fade-in">
    <Header></Header>

    <main>
      <FeedForm></FeedForm>
      <FeedTitles></FeedTitles>

      <div class="home-wrapper">
        <PostTitles class="home-container"></PostTitles>
        <Statistic class="home-container"></Statistic>
        <SinglePost class="home-container"></SinglePost>
      </div>
    </main>
  </section>
</template>

<script>
import { mapActions } from "vuex";

import { INIT_FEEDS } from '../../store/action-types.js';

import Header from '../base-layers/Header.vue';
import FeedForm from '../common/FeedForm.vue';
import Statistic from '../common/Statistic.vue';
import PostTitles from '../common/PostTitles.vue';
import FeedTitles from '../common/FeedTitles.vue';
import SinglePost from '../common/SinglePost.vue';

export default {
  name: 'home',
  components: {
    Header,
    FeedForm,
    Statistic,
    PostTitles,
    FeedTitles,
    SinglePost
  },
  methods: {
    ...mapActions({ initApp: INIT_FEEDS })
  },
  mounted () {
    this.initApp();
  }
}
</script>

<style lang="scss">
  .home-wrapper {
    display: flex;
  }
</style>
