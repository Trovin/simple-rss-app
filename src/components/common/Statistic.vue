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
      <Chart class="statistic-chart" v-bind:chartData="composeChartData"></Chart>
    </template>
  </div>
</template>

<script>
import { randomColor } from 'randomcolor';

import {
  mapState,
  mapGetters
} from 'vuex';

import {
  GET_FEEDS_LENGTH,
  GET_SELECTED_FEED,
  GET_FEEDS_ITEMS_LENGTH,
  GET_SELECTED_FEED_ITEMS_LENGTH,
  GET_SELECTED_FEED_AUTHORS_LENGTH
} from '../../store/getter-types';

import { SET_SELECTED_ITEM } from "../../store/mutation-types";

import {
  SELECTED_FEED_ITEM,
  SELECTED_FEED_CATEGORY
} from '../../store/state-types';

import Chart from './Chart.vue'

export default {
  name: 'Statistic',
  data () {
    return {
      colors: []
    }
  },
  components: {
    Chart
  },
  methods: {
    composeColors() {
      const maxLetters = 26;

      for(let i = 0; i <= maxLetters; i++) {
        this.colors.push(randomColor({ luminosity: 'light' }));
      }
    }
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
        selectedItem: state => state[SELECTED_FEED_ITEM],
        selectedCategory: state => state[SELECTED_FEED_CATEGORY]
    }),
    composeChartData: function () {
      const chartData = {
        labels: [],
        datasets: [{
          data: [],
          borderWidth: 1,
          backgroundColor: []
        }]
      };

      if(this.selectedItem.content) {
        const content = this.selectedItem.content.toLowerCase().replace(/[^a-zA-Z]/g,'');
        const letters_list = new Set(content);
        for (let letter of letters_list) {
          let count = content.split(letter).length - 1;
          chartData.labels.push(letter);
          chartData.datasets[0].data.push(count);
          chartData.datasets[0].backgroundColor = this.colors;
        }
      }

      return chartData;
    }
  },
  mounted() {
    this.composeColors();
    this.unsubscribe = this.$store.subscribe((mutation, state)  => {
      if(mutation.type === SET_SELECTED_ITEM && !!state[SELECTED_FEED_ITEM]) {
        this.composeChartData;
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  }
}
</script>

<style lang="scss">
  @import '../../assets/styles/variables';

  .statistic {
    text-align: center;
    border-left: 2px solid $border;
    border-right: 2px solid $border;
  }

  .statistic-chart {
    width: 400px;
    max-width: 100%;
    margin: 0 auto;
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
