import chart from '../../containers/chart/index.vue'

export default {
  name: 'statistic',
  components: {
    chart
  },
  props: [],
  data () {
    return {}
   },
  computed: {
    selectedItem: function() {
      return this.$store.state.selectedFeedItem;
    },
    getItemInfo: function() {
      const stats = {
        names: [],
        values: []
      };

      const NAMES = [];
      const VALUES = [];

      if(this.selectedItem.content) {
        const CONTENT = this.selectedItem.content.toLowerCase().replace(/[\s.,'%]/g, '');
        const LETTERS_LIST = new Set(CONTENT);
        for (let letter of LETTERS_LIST) {
          let count = CONTENT.split(letter).length - 1;
          NAMES.push(letter);
          VALUES.push(count);
        }
        stats.names = NAMES;
        stats.values = VALUES;
      }
      return stats;
    },
    selectedFeed: function() {
      return this.$store.state.feeds.find(feed => feed.title === this.selectedCategory);
    },
    channelsLength: function() {
      return this.$store.state.feedsList.length;
    },
    selectedCategory: function() {
      return this.$store.state.selectedFeedCategory;
    },
    selectedFeedLength: function() {
      return this.selectedFeed.items.length;
    },
    selectedAuthorLength: function() {
      return Array.from(new Set(this.selectedFeed.items.map(item => item.itunes.author))).length;
    }
  },
  mounted () {
    this.$store.subscribe(mutation => {
      if (mutation.type === 'setSelectedItem') {
        this.getItemInfo();
      }
    });
  },
  methods: {}
}


