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

import Header from '../base-layers/Header.vue';
import FeedForm from '../elements/FeedForm.vue';
import Statistic from '../containers/Statistic.vue';
import SinglePost from '../elements/SinglePost.vue';
import FeedItemsList from '../elements/FeedItemsList.vue';
import FeedTitlesList from '../elements/FeedTitlesList.vue';

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
  data () {
    return {}
  },
  methods: {
    ...mapActions(['initFeeds'])
  },
  mounted () {
    this.initFeeds();
  }
}
</script>

<style lang="scss">
  .content-wrapper {
    display: flex;
  }
</style>
