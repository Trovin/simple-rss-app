<template>
  <div class="wrapper statistic">
    <p class="statistic-item">
      All active channels:
      <span class="statistic-item__value">{{feedsLength}}</span>
    </p>
    <p class="statistic-item" v-if="!selectedFeed">
      All posts:
      <span class="statistic-item__value">{{feedsItemsLength}}</span>
    </p>
    <p class="statistic-item" v-if="selectedFeed">
      Selected feed posts:
      <span class="statistic-item__value">{{selectedFeedItemsLength}}</span>
    </p>
    <p class="statistic-item" v-if="selectedFeed">
      Number of authors:
      <span class="statistic-item__value">{{selectedFeedAuthorsLength}}</span>
    </p>

    <template v-if="selectedItem">
      <Chart v-bind:values="getItemInfo.values" v-bind:names="getItemInfo.names"></Chart>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import {
  GET_FEEDS_LENGTH,
  GET_SELECTED_FEED,
  GET_FEEDS_ITEMS_LENGTH,
  GET_SELECTED_FEED_ITEMS_LENGTH,
  GET_SELECTED_FEED_AUTHORS_LENGTH
} from "../../store/getters";

import Chart from '../elements/Chart.vue'

export default {
  name: 'Statistic',
  components: {
    Chart
  },
  props: [],
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      feedsLength: GET_FEEDS_LENGTH,
      selectedFeed: GET_SELECTED_FEED,
      feedsItemsLength: GET_FEEDS_ITEMS_LENGTH,
      selectedFeedItemsLength: GET_SELECTED_FEED_ITEMS_LENGTH,
      selectedFeedAuthorsLength: GET_SELECTED_FEED_AUTHORS_LENGTH
    }),
    ...mapState({
      feedsList: state => state.feedsList,
      selectedItem: state => state.selectedFeedItem,
      selectedCategory: state => state.selectedFeedCategory
    }),
    getItemInfo: function() {
      const stats = {
        names: [],
        values: []
      };

      const names = [];
      const values = [];

      if(this.selectedItem.content) {
        const content = this.selectedItem.content.toLowerCase().replace(/[^a-zA-Z]/g,'');
        const letters_list = new Set(content);
        console.log(letters_list);
        for (let letter of letters_list) {
          let count = content.split(letter).length - 1;
          names.push(letter);
          values.push(count);
        }
        stats.names = names;
        stats.values = values;
      }
      return stats;
    }
  },
  mounted () {},
  methods: {}
}
</script>

<style lang="scss">
  .statistic {
    text-align: center;
    border-left: 2px solid #ccc;
    border-right: 2px solid #ccc;
  }

  .statistic-item {
    color: #929292;
    margin-bottom: 10px;
    font-size: 18px;
  }

  .statistic-item__value {
    color: #ff7546;
  }
</style>
