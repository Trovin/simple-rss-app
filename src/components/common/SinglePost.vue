<template>
  <article class="wrapper fade-in post-box" v-if="postItem">
    <h2 class="post-title">Title: {{postItem.title}}</h2>
    <p v-html="postItem.content" class="post-content"></p>
    <h5 class="post-author">Author: {{postItem.itunes.author || 'Unknown'}}</h5>
  </article>
</template>

<script>
import { mapState } from 'vuex';

import { SELECTED_FEED_ITEM } from '../../store/types/state-types';

export default {
  name: 'SinglePost',
  computed: mapState({
    postItem: state => state[SELECTED_FEED_ITEM]
  })
}
</script>

<style lang="scss">
  @import '../../assets/styles/mixins';
  @import '../../assets/styles/variables';

  .post-box {
    @include box;
  }

  .post-title {
    color: $text-color;
    font-size: 16px;
    margin-bottom: 20px;
  }

  .post-content {
    font-size: 14px;
    line-height: 180%;
    color: $text-color;
    margin-bottom: 20px;
  }

  .post-author {
    color: $text-color;
    font-size: 16px;
    text-align: right;
  }
</style>
