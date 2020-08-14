const URL_REGEX = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

export default {
  name: 'feed-form',
  components: {},
  props: [],
  data () {
    return {
      feedApi: null,
      isFeedTouched: false
    }
  },
  computed: {
    isFeedValid() {
      return URL_REGEX.test(this.feedApi);
    },
    isFeedError() {
      return !this.isFeedValid && this.isFeedTouched;
    },
  },
  mounted () {},
  methods: {
    handleSubmit() {
      this.$store.dispatch('addNewFeed', { api: this.feedApi });
      this.feedApi = '';
      this.isFeedTouched = false;
    }
  }
}


