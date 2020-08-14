import Vue from 'vue'
import Vuex from 'vuex'

import Parser from 'rss-parser'
const PARSER = new Parser();

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    feeds: [],
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
  mutations: {
    setFeeds (state, list) {
      this.state.feeds.push(list);
    },
    addNewFeed (state, api) {
      this.state.feedsList.push(api);
    },
    setItemsList (state, props) {
      props.items.forEach(item => item.category = props.category);
      this.state.itemsList = [...this.state.itemsList, ...props.items];
    },
    setTitlesList (state, list) {
      this.state.titlesList.push(list);
    },
    setLoadingState (state, isLoading) {
      this.state.loading = isLoading;
    },
    setSelectedItem (state, item) {
      this.state.selectedFeedItem = item;
    },
    setActiveCategory (state, category) {
      this.state.selectedFeedCategory = category;
    },
    parseFeedData (state, feed) {
      this.commit('setFeeds', feed);
      this.commit('setItemsList', { category: feed.title, items: feed.items});
      this.commit('setTitlesList', feed.title);
      this.commit('setLoadingState', false);
    }
  },
  actions: {
    initFeeds () {
      this.commit('setLoadingState', true);
      this.state.feedsList.forEach(api => {
        PARSER.parseURL(CORS_PROXY + api, (err, feed) => {
          if (err) throw err;
          this.commit('parseFeedData', feed);
        })
      });
    },
    addNewFeed (state, payload) {
      this.commit('setLoadingState', true);
      PARSER.parseURL(CORS_PROXY + payload.api, (err, feed) => {
        if (err) throw err;
        this.commit('parseFeedData', feed);
      })
    }
  },
  modules: {}
})
