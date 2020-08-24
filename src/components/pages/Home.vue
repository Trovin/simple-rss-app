<template>
  <section class="home fade-in">
    <Header></Header>

    <main>
      <FeedForm></FeedForm>
      <FeedTitlesList></FeedTitlesList>

      <div class="content-wrapper">
        <FeedItemsList class="container"></FeedItemsList>
        <Statistic class="container"></Statistic>
        <SinglePost class="container"></SinglePost>
      </div>
    </main>
  </section>
</template>

<script>
import { mapActions } from "vuex";

import { INIT_FEEDS } from '../../store/action-types.js';

import Header from '../base-layers/Header.vue';
import FeedForm from '../items/FeedForm.vue';
import Statistic from '../containers/Statistic.vue';
import SinglePost from '../items/SinglePost.vue';
import FeedItemsList from '../items/FeedItemsList.vue';
import FeedTitlesList from '../items/FeedTitlesList.vue';

export default {
  name: 'home',
  components: {
    Header,
    FeedForm,
    Statistic,
    SinglePost,
    FeedItemsList,
    FeedTitlesList
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
  .content-wrapper {
    display: flex;
  }
</style>
