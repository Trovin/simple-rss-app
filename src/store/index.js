import Vue from 'vue';
import Vuex from 'vuex';

import {
  GET_ITEMS,
  GET_FEEDS_LENGTH,
  GET_SELECTED_FEED,
  GET_FEEDS_ITEMS_LENGTH,
  GET_SELECTED_FEED_ITEMS_LENGTH,
  GET_SELECTED_FEED_AUTHORS_LENGTH
} from './getters';

import {
  SET_FEEDS,
  SET_NEW_FEED,
  SET_ITEMS_LIST,
  SET_TITLES_LIST,
  PARSE_FEED_DATA,
  PARSE_FEEDS_DATA,
  SET_LOADING_STATE,
  SET_SELECTED_ITEM,
  SET_ACTIVE_CATEGORY
} from './mutations';

import {
  INIT_FEEDS,
  ADD_NEW_FEED
} from './actions';

import Parser from 'rss-parser';

const PARSER = new Parser();

const getData = (api) => PARSER.parseURL(api);

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    feeds: [],
    loading: false,
    itemsList: [],
    titlesList: [],
    feedsItemsList: [],
    selectedFeedItem: '',
    selectedFeedCategory: '',
    feedsList: [
      'https://www.omnycontent.com/d/playlist/d83f52e4-2455-47f4-982e-ab790120b954/0662f610-d693-473a-b06a-ab86010e979c/8a5860a3-0e13-40eb-93e5-ab86010e97a0/podcast.rss',
      'https://www.omnycontent.com/d/playlist/d83f52e4-2455-47f4-982e-ab790120b954/91ee4c75-d63f-4c31-9357-abdb00d78cf6/12b2443c-b51e-46c5-b23e-abdb00d83f93/podcast.rss'
    ]
  },
  getters: {
    [GET_ITEMS]: state => {
      if(!state.selectedFeedCategory) {
        return state.itemsList;
      } else {
        return state.itemsList.filter(el => el.category === state.selectedFeedCategory);
      }
    },
    [GET_FEEDS_LENGTH]: state => state.feeds.length,
    [GET_SELECTED_FEED]: state => state.feeds.find(feed => feed.title === state.selectedFeedCategory),
    [GET_FEEDS_ITEMS_LENGTH]: state => state.itemsList.length,
    [GET_SELECTED_FEED_ITEMS_LENGTH]: state => state.feeds.find(feed => feed.title === state.selectedFeedCategory).items.length,
    [GET_SELECTED_FEED_AUTHORS_LENGTH]: state => {
      const item = state.feeds.find(feed => feed.title === state.selectedFeedCategory);
      return Array.from(new Set(item.items.map(item => item.itunes.author))).length;
    }
  },
  mutations: {
    [SET_FEEDS] (state, list) {
      this.state.feeds.push(list);
    },
    [SET_NEW_FEED] (state, api) {
      this.state.feedsList.push(api);
    },
    [SET_ITEMS_LIST] (state, props) {
      props.items.forEach(item => item.category = props.category);
      this.state.itemsList = [...this.state.itemsList, ...props.items];
    },
    [SET_TITLES_LIST] (state, list) {
      this.state.titlesList.push(list);
    },
    [SET_LOADING_STATE] (state, isLoading) {
      this.state.loading = isLoading;
    },
    [PARSE_FEED_DATA] (state, feed) {
      this.commit(SET_FEEDS, feed);
      this.commit(SET_ITEMS_LIST, { category: feed.title, items: feed.items});
      this.commit(SET_TITLES_LIST, feed.title);
      this.commit(SET_LOADING_STATE, false);
    },
    [PARSE_FEEDS_DATA] (state, feeds) {
      feeds.forEach(feed => this.commit(PARSE_FEED_DATA, feed))
    },
    [SET_SELECTED_ITEM] (state, item) {
      this.state.selectedFeedItem = item;
    },
    [SET_ACTIVE_CATEGORY] (state, category) {
      this.commit(SET_SELECTED_ITEM, '');
      this.state.selectedFeedCategory = category;
    }
  },
  actions: {
    async [INIT_FEEDS] () {
      const feeds = [];
      this.commit(SET_LOADING_STATE, true);

      async function processArray(apiList) {
        for (let api of apiList) {
          const feed = await getData(api);
          feeds.push(feed);
        }
      }

      await processArray(this.state.feedsList);
      this.commit(PARSE_FEEDS_DATA, feeds);
    },
    async [ADD_NEW_FEED] (state, payload) {
      this.commit(SET_LOADING_STATE, true);
      const feed = await getData(payload.api);
      this.commit(PARSE_FEED_DATA, feed);
    }
  },
  modules: {}
})
