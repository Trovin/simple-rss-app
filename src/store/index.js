import Vue from 'vue';
import Vuex from 'vuex';

import {
  FEEDS,
  LOADING,
  FEEDS_LIST,
  ITEMS_LIST,
  TITLES_LIST,
  FEEDS_ITEMS_LIST,
  SELECTED_FEED_ITEM,
  SELECTED_FEED_CATEGORY
} from './state-types';

import {
  GET_ITEMS,
  GET_FEEDS_LENGTH,
  GET_SELECTED_FEED,
  GET_FEEDS_ITEMS_LENGTH,
  GET_SELECTED_FEED_ITEMS_LENGTH,
  GET_SELECTED_FEED_AUTHORS_LENGTH
} from './getter-types';

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
} from './mutation-types';

import {
  INIT_FEEDS,
  ADD_NEW_FEED
} from './action-types';

import { getData } from './helper';
import { setItems } from './helper';

import { feedApiValidation } from './validation';
import { feedDataValidation } from './validation';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    [FEEDS]: [],
    [LOADING]: false,
    [ITEMS_LIST]: [],
    [TITLES_LIST]: [],
    [FEEDS_ITEMS_LIST]: [],
    [SELECTED_FEED_ITEM]: '',
    [SELECTED_FEED_CATEGORY]: '',
    [FEEDS_LIST]: [
      'https://www.omnycontent.com/d/playlist/d83f52e4-2455-47f4-982e-ab790120b954/0662f610-d693-473a-b06a-ab86010e979c/8a5860a3-0e13-40eb-93e5-ab86010e97a0/podcast.rss',
      'https://www.omnycontent.com/d/playlist/d83f52e4-2455-47f4-982e-ab790120b954/91ee4c75-d63f-4c31-9357-abdb00d78cf6/12b2443c-b51e-46c5-b23e-abdb00d83f93/podcast.rss'
    ]
  },
  getters: {
    [GET_ITEMS]: state => {
      if(!state[SELECTED_FEED_CATEGORY]) {
        return state[ITEMS_LIST];
      } else {
        return state[ITEMS_LIST].filter(el => el.category === state[SELECTED_FEED_CATEGORY]);
      }
    },
    [GET_FEEDS_LENGTH]: state => state[FEEDS].length,
    [GET_SELECTED_FEED]: state => state[FEEDS].find(feed => feed.title === state[SELECTED_FEED_CATEGORY]),
    [GET_FEEDS_ITEMS_LENGTH]: state => state[ITEMS_LIST].length,
    [GET_SELECTED_FEED_ITEMS_LENGTH]: state => state[FEEDS].find(feed => feed.title === state[SELECTED_FEED_CATEGORY]).items.length,
    [GET_SELECTED_FEED_AUTHORS_LENGTH]: state => {
      const item = state[FEEDS].find(feed => feed.title === state[SELECTED_FEED_CATEGORY]);
      return Array.from(new Set(item.items.map(item => item.itunes.author))).length;
    }
  },
  mutations: {
    [SET_FEEDS] (state, list) {
      this.state[FEEDS].push(list);
    },
    [SET_NEW_FEED] (state, api) {
      this.state[FEEDS_LIST].push(api);
    },
    [SET_ITEMS_LIST] (state, props) {
      setItems(state, props);
    },
    [SET_TITLES_LIST] (state, list) {
      this.state[TITLES_LIST].push(list);
    },
    [SET_LOADING_STATE] (state, isLoading) {
      this.state[LOADING] = isLoading;
    },
    [PARSE_FEED_DATA] (state, data) {
      this.state[FEEDS].push(data.feed);
      this.state[FEEDS_LIST].push(data.api);
      setItems(state, { category: data.feed.feedUrl, items: data.feed.items });
      this.state[TITLES_LIST].push(data.feed.title);
      this.state[LOADING] = false;
    },
    [PARSE_FEEDS_DATA] (state, feeds) {
      feeds.forEach(feed => {
        this.state[FEEDS].push(feed);
        setItems(state, { category: feed.feedUrl, items: feed.items });
        this.state[TITLES_LIST].push({ title: feed.title, key: feed.feedUrl });
      });
      this.state[LOADING] = false;
    },
    [SET_SELECTED_ITEM] (state, item) {
      this.state[SELECTED_FEED_ITEM] = item;
    },
    [SET_ACTIVE_CATEGORY] (state, category) {
      this.state[SELECTED_FEED_ITEM] = '';
      this.state[SELECTED_FEED_CATEGORY] = category;
    }
  },
  actions: {
    async [INIT_FEEDS] (context) {
      const feeds = [];
      this.commit(SET_LOADING_STATE, true);

      async function processArray(apiList) {
        for (let api of apiList) {
          const feed = await getData(context, api);
          feeds.push(feed);
        }
      }

      await processArray(this.state[FEEDS_LIST]);
      this.commit(PARSE_FEEDS_DATA, feeds);
    },
    async [ADD_NEW_FEED] (context, payload) {
      this.commit(SET_LOADING_STATE, true);
      feedApiValidation(context, payload.api);
      const feed = await getData(context, payload.api);
      feedDataValidation(context, feed);
      this.commit(PARSE_FEED_DATA, { feed: feed, api: payload.api });
    }
  },
  modules: {}
})
