<template>
  <nav class="wrapper fade-in box">
    <ul class="feed-items" v-if="items">
      <li
        class="feed-item"
        v-for="item in items" :key="item.guid"
        v-on:click="setActiveItem(item)"
        v-bind:class="{ 'feed-item_active': selectedItem.guid === item.guid }">
        <h3 class="feed-item__title">Title: {{item.title}}</h3>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

import { SET_SELECTED_ITEM, SET_ACTIVE_CATEGORY } from '../../store/mutations';

export default {
  name: 'FeedItemsList',
  components: {},
  props: [],
  data () {
    return {}
  },
  computed: {
    ...mapGetters({ items: 'getItems' }),
    ...mapState({
      isLoading: 'loading',
      selectedItem: 'selectedFeedItem',
      activeCategory: 'selectedFeedCategory'
    }),
  },
  mounted () {},
  methods: {
    ...mapMutations({ selectItem: SET_SELECTED_ITEM, setCategory: SET_ACTIVE_CATEGORY }),
    setActiveItem(item) {
      this.setCategory(item.category);
      this.selectItem(item);
    }
  }
}
</script>

<style lang="scss">
  .feed-items {
    list-style: none;
  }

  .feed-item__title {
    font-family: 'Helvetica', 'sans-serif', 'serif';
    position: relative;
    transition: .2s;
    font-size: 16px;
    color: #929292;
    text-align: left;
    line-height: 120%;

    &:hover {
      color: #000;
    }
  }

  .feed-item {
    display: block;
    margin-bottom: 10px;
    cursor: pointer;

    &_active .feed-item__title {
      color: #ff7546;
    }
  }
</style>
