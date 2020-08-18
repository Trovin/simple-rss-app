<template>
  <article class="wrapper fade-in box" v-if="postItem">
    <h2 class="post-title">Title: {{postItem.title}}</h2>
    <p v-html="postItem.content" class="post-content"></p>
    <h5 class="post-author">Author: {{postItem.itunes.author || 'Unknown'}}</h5>
  </article>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SinglePost',
  components: {},
  props: [],
  data () {
    return {}
  },
  computed: mapState({
    postItem: state => state.selectedFeedItem
  }),
  mounted () {},
  methods: {}
}
</script>

<style lang="scss">
  .post-title {
    color: #675597;
    font-size: 20px;
    margin-bottom: 30px;
    text-align: center;
  }

  .post-content {
    color: #675597;
    font-size: 16px;
    line-height: 140%;
    margin-bottom: 20px;
    text-align: center;
  }

  .post-author {
    color: #929292;
    font-size: 10px;
    text-align: right;
    font-weight: 700;
    letter-spacing: 1px;
  }
</style>
