<template>
  <div class="wrapper statistic">
    <p class="statistic-item">
      All active channels: <span class="statistic-value">{{feedsLength}}</span>
    </p>

    <p class="statistic-item" v-if="!selectedFeed">
      All posts: <span class="statistic-value">{{feedsItemsLength}}</span>
    </p>

    <p class="statistic-item" v-if="selectedFeed">
      Selected feed posts: <span class="statistic-value">{{selectedFeedItemsLength}}</span>
    </p>

    <p class="statistic-item statistic-item__author" v-if="selectedFeed">
      Number of authors: <span class="statistic-value">{{selectedFeedAuthorsLength}}</span>
    </p>

    <template v-if="selectedItem">
      <Chart
        v-bind:values="chartData.values"
        v-bind:labels="chartData.labels"
        v-bind:colors="chartData.colors">
      </Chart>
    </template>
  </div>
</template>

<script>
import { randomColor } from 'randomcolor';
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
    chartData: function() {
      const stats = {
        labels: [],
        values: [],
        colors: []
      };

      if(this.selectedItem.content) {
        const content = this.selectedItem.content.toLowerCase().replace(/[^a-zA-Z]/g,'');
        const letters_list = new Set(content);
        for (let letter of letters_list) {
          let count = content.split(letter).length - 1;
          stats.labels.push(letter);
          stats.values.push(count);
          stats.colors.push(randomColor({ luminosity: 'light' }));
        }
      }
      return stats;
    }
  }
}
</script>

<style lang="scss">
  @import '../../assets/styles/variables.scss';

  .statistic {
    text-align: center;
    border-left: 2px solid $border;
    border-right: 2px solid $border;
  }

  .statistic-item {
    font-size: 16px;
    color: $text-color;
    line-height: 120%;
    margin-bottom: 5px;

    &__author {
      margin-bottom: 30px;
    }
  }

  .statistic-value {
    color: $theme-color;
  }
</style>
